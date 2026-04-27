<?php
// =============================================================================
//  RezHub — Reviews API
//  POST /api/reviews.php?action=submit       — submit a review (auth required)
//  GET  /api/reviews.php?action=hotel&id=mh1 — reviews for a hotel
//  GET  /api/reviews.php?action=mine         — user's own reviews
// =============================================================================

require_once __DIR__ . '/config.php';
apiHeaders();

$action = $_GET['action'] ?? '';
$db     = getDB();

// ── Submit review ─────────────────────────────────────────────────────────────
if ($action === 'submit') {
    $user = requireAuth();
    $b    = jsonBody();

    $bookingId  = $b['booking_id']    ?? '';
    $rating     = (int)($b['overall_rating'] ?? 0);
    $text       = trim($b['review_text'] ?? '');

    if (!$bookingId || $rating < 1 || $rating > 5)
        respond(false, null, 'booking_id and rating (1-5) are required.', 422);

    // Verify booking belongs to user & is completed
    $bk = $db->prepare(
        'SELECT hotel_id, user_id, status FROM bookings WHERE booking_id = ?'
    );
    $bk->execute([$bookingId]);
    $booking = $bk->fetch();

    if (!$booking)
        respond(false, null, 'Booking not found.', 404);
    if ((int)$booking['user_id'] !== (int)$user['user_id'])
        respond(false, null, 'Access denied.', 403);
    if ($booking['status'] !== 'completed')
        respond(false, null, 'You can only review completed stays.', 422);

    // Check for duplicate
    $dup = $db->prepare('SELECT review_id FROM reviews WHERE booking_id = ?');
    $dup->execute([$bookingId]);
    if ($dup->fetch())
        respond(false, null, 'You have already reviewed this booking.', 409);

    $ins = $db->prepare(
        'INSERT INTO reviews (booking_id, user_id, hotel_id, overall_rating, review_text)
         VALUES (?,?,?,?,?)'
    );
    $ins->execute([
        $bookingId,
        $user['user_id'],
        $booking['hotel_id'],
        $rating,
        $text ?: null,
    ]);

    // Update hotel average rating & review count
    $avg = $db->prepare(
        'SELECT COUNT(*) AS cnt, ROUND(AVG(overall_rating),2) AS avg_r
         FROM reviews WHERE hotel_id = ?'
    );
    $avg->execute([$booking['hotel_id']]);
    $stats = $avg->fetch();
    $db->prepare('UPDATE hotels SET rating = ?, review_count = ? WHERE hotel_id = ?')
       ->execute([$stats['avg_r'], $stats['cnt'], $booking['hotel_id']]);

    respond(true, null, 'Review submitted successfully.', 201);
}

// ── Hotel reviews ─────────────────────────────────────────────────────────────
if ($action === 'hotel') {
    $hotelId = $_GET['id'] ?? '';
    if (!$hotelId) respond(false, null, 'Hotel ID required.', 422);

    $stmt = $db->prepare(
        'SELECT rv.review_id, rv.overall_rating, rv.review_text, rv.created_at,
                u.full_name AS reviewer_name
         FROM   reviews rv
         JOIN   users u ON u.user_id = rv.user_id
         WHERE  rv.hotel_id = ?
         ORDER  BY rv.created_at DESC'
    );
    $stmt->execute([$hotelId]);
    respond(true, $stmt->fetchAll());
}

// ── My reviews ────────────────────────────────────────────────────────────────
if ($action === 'mine') {
    $user = requireAuth();
    $stmt = $db->prepare(
        'SELECT rv.review_id, rv.overall_rating, rv.review_text, rv.created_at,
                rv.booking_id, h.name AS hotel_name, h.hotel_id
         FROM   reviews rv
         JOIN   hotels h ON h.hotel_id = rv.hotel_id
         WHERE  rv.user_id = ?
         ORDER  BY rv.created_at DESC'
    );
    $stmt->execute([$user['user_id']]);
    respond(true, $stmt->fetchAll());
}

respond(false, null, 'Unknown action.', 400);
