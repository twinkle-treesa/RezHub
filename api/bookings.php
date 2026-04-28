<?php
// =============================================================================
//  RezHub — Bookings API
//  POST /api/bookings.php?action=create    — create booking (auth required)
//  GET  /api/bookings.php?action=mine      — user's own bookings (auth required)
//  GET  /api/bookings.php?action=detail&id=BKG-XXX — booking detail
//  POST /api/bookings.php?action=cancel&id=BKG-XXX — cancel booking
//  GET  /api/bookings.php?action=all       — admin: all bookings
//  POST /api/bookings.php?action=status    — admin: update status
// =============================================================================

require_once __DIR__ . '/config.php';
apiHeaders();

$action = $_GET['action'] ?? '';
$db     = getDB();

// ── Create booking ────────────────────────────────────────────────────────────
if ($action === 'create') {
    $user = requireAuth();
    $b    = jsonBody();

    $required = ['hotel_id','room_id','check_in_date','check_out_date',
                 'first_name','last_name','guest_email','guest_phone','guest_count'];
    foreach ($required as $f) {
        if (empty($b[$f])) respond(false, null, "Missing field: $f", 422);
    }

    // Validate dates
    $checkIn  = $b['check_in_date'];
    $checkOut = $b['check_out_date'];
    if ($checkOut <= $checkIn) respond(false, null, 'Check-out must be after check-in.', 422);

    // Verify hotel & room exist and match
    $room = $db->prepare(
        'SELECT r.*, h.name AS hotel_name FROM rooms r
         JOIN hotels h ON h.hotel_id = r.hotel_id
         WHERE r.room_id = ? AND r.hotel_id = ?'
    );
    $room->execute([$b['room_id'], $b['hotel_id']]);
    $roomData = $room->fetch();
    if (!$roomData) respond(false, null, 'Invalid hotel or room selection.', 422);

    // Check room availability — reject if already booked for overlapping dates
    $conflict = $db->prepare(
        'SELECT COUNT(*) FROM bookings
         WHERE room_id = ? AND status != \'cancelled\'
           AND check_in_date < ? AND check_out_date > ?'
    );
    $conflict->execute([$b['room_id'], $checkOut, $checkIn]);
    if ((int)$conflict->fetchColumn() > 0)
        respond(false, null, 'This room is not available for the selected dates. Please choose different dates or another room.', 409);

    // Calculate pricing
    $nights     = (int)((strtotime($checkOut) - strtotime($checkIn)) / 86400);
    $basePrice  = (int)$b['base_price']    ?? ($roomData['price_per_night'] * $nights);
    $taxAmount  = (int)$b['tax_amount']    ?? (int)round($basePrice * 0.12);
    $loyaltySav = (int)($b['loyalty_saving'] ?? 0);
    $grandTotal = $basePrice + $taxAmount - $loyaltySav;

    // Generate booking ID
    $bookingId = 'BKG-' . strtoupper(substr(md5(uniqid('', true)), 0, 8));

    $ins = $db->prepare(
        'INSERT INTO bookings
           (booking_id, user_id, hotel_id, room_id, check_in_date, check_out_date, guest_count,
            first_name, last_name, guest_email, guest_phone, address, guest_city, country, zip_code,
            special_requests, base_price, tax_amount, loyalty_saving, grand_total, status, payment_id)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    );
    $ins->execute([
        $bookingId,
        $user['user_id'],
        $b['hotel_id'],
        $b['room_id'],
        $checkIn,
        $checkOut,
        (int)$b['guest_count'],
        $b['first_name'],
        $b['last_name'],
        $b['guest_email'],
        $b['guest_phone'],
        $b['address']          ?? null,
        $b['guest_city']       ?? null,
        $b['country']          ?? 'India',
        $b['zip_code']         ?? null,
        $b['special_requests'] ?? null,
        $basePrice,
        $taxAmount,
        $loyaltySav,
        $grandTotal,
        'upcoming',
        $b['payment_id']       ?? null,
    ]);

    respond(true, ['booking_id' => $bookingId, 'grand_total' => $grandTotal], 'Booking confirmed!', 201);
}

// ── My bookings (user) ────────────────────────────────────────────────────────
if ($action === 'mine') {
    $user = requireAuth();
    $stmt = $db->prepare(
        'SELECT b.booking_id, b.hotel_id, b.room_id, b.status,
                b.check_in_date, b.check_out_date, b.guest_count,
                b.base_price, b.tax_amount, b.loyalty_saving, b.grand_total,
                b.created_at,
                h.name AS hotel_name, h.image_path,
                c.name AS city_name, s.name AS state_name,
                r.name AS room_name
         FROM   bookings b
         JOIN   hotels h ON h.hotel_id = b.hotel_id
         JOIN   cities c ON c.city_id  = h.city_id
         JOIN   states s ON s.state_id = c.state_id
         JOIN   rooms  r ON r.room_id  = b.room_id
         WHERE  b.user_id = ?
         ORDER  BY b.created_at DESC'
    );
    $stmt->execute([$user['user_id']]);
    respond(true, $stmt->fetchAll());
}

// ── Booking detail ────────────────────────────────────────────────────────────
if ($action === 'detail') {
    $user      = requireAuth();
    $bookingId = $_GET['id'] ?? '';
    if (!$bookingId) respond(false, null, 'Booking ID required.', 422);

    $stmt = $db->prepare(
        'SELECT * FROM vw_bookings_detail WHERE booking_id = ?'
    );
    $stmt->execute([$bookingId]);
    $booking = $stmt->fetch();

    if (!$booking) respond(false, null, 'Booking not found.', 404);

    // Users can only see own bookings (admin sees all)
    $admin = $_SESSION['admin'] ?? null;
    if (!$admin && (int)$booking['user_id'] !== (int)$user['user_id'])
        respond(false, null, 'Access denied.', 403);

    respond(true, $booking);
}

// ── Cancel booking ────────────────────────────────────────────────────────────
if ($action === 'cancel') {
    $user      = requireAuth();
    $bookingId = $_GET['id'] ?? jsonBody()['booking_id'] ?? '';
    if (!$bookingId) respond(false, null, 'Booking ID required.', 422);

    $stmt = $db->prepare('SELECT user_id, status FROM bookings WHERE booking_id = ?');
    $stmt->execute([$bookingId]);
    $bk = $stmt->fetch();

    if (!$bk) respond(false, null, 'Booking not found.', 404);
    if ((int)$bk['user_id'] !== (int)$user['user_id'])
        respond(false, null, 'Access denied.', 403);
    if ($bk['status'] === 'cancelled')
        respond(false, null, 'Booking already cancelled.');
    if ($bk['status'] === 'completed')
        respond(false, null, 'Cannot cancel a completed booking.');

    $db->prepare("UPDATE bookings SET status = 'cancelled' WHERE booking_id = ?")
       ->execute([$bookingId]);

    respond(true, null, 'Booking cancelled successfully.');
}

// ── Admin: all bookings ───────────────────────────────────────────────────────
if ($action === 'all') {
    requireAdmin();
    $status = $_GET['status'] ?? '';
    $sql    = 'SELECT * FROM vw_bookings_detail';
    $params = [];
    if ($status) { $sql .= ' WHERE status = ?'; $params[] = $status; }
    $sql .= ' ORDER BY created_at DESC LIMIT 200';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    respond(true, $stmt->fetchAll());
}

// ── Admin: update status ──────────────────────────────────────────────────────
if ($action === 'status') {
    requireAdmin();
    $b    = jsonBody();
    $bid  = $b['booking_id'] ?? '';
    $stat = $b['status']     ?? '';
    $allowed = ['upcoming','active','completed','cancelled'];
    if (!$bid || !in_array($stat, $allowed, true))
        respond(false, null, 'Invalid booking_id or status.', 422);

    $db->prepare('UPDATE bookings SET status = ? WHERE booking_id = ?')
       ->execute([$stat, $bid]);
    respond(true, null, 'Status updated.');
}

// ── Availability check — GET ?action=availability&hotel_id=X&check_in=Y&check_out=Z ──
if ($action === 'availability') {
    $hotelId  = $_GET['hotel_id']  ?? '';
    $checkIn  = $_GET['check_in']  ?? '';
    $checkOut = $_GET['check_out'] ?? '';
    if (!$hotelId || !$checkIn || !$checkOut)
        respond(false, null, 'hotel_id, check_in and check_out are required.', 422);

    // Return room_ids that are already booked for the given date range
    $stmt = $db->prepare(
        'SELECT DISTINCT room_id FROM bookings
         WHERE hotel_id = ? AND status != \'cancelled\'
           AND check_in_date < ? AND check_out_date > ?'
    );
    $stmt->execute([$hotelId, $checkOut, $checkIn]);
    $bookedRoomIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
    respond(true, ['booked_room_ids' => $bookedRoomIds]);
}

respond(false, null, 'Unknown action.', 400);
