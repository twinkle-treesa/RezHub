<?php
// =============================================================================
//  RezHub — Admin API  (all routes require admin session)
//  GET  /api/admin.php?action=stats          — dashboard stats
//  GET  /api/admin.php?action=hotels         — all hotels (with overrides)
//  POST /api/admin.php?action=hotel_update   — update hotel base_price / rating
//  GET  /api/admin.php?action=users          — all users
//  POST /api/admin.php?action=toggle_user    — activate/deactivate user
//  GET  /api/admin.php?action=bookings       — all bookings (paginated)
//  POST /api/admin.php?action=booking_status — change booking status
//  GET  /api/admin.php?action=reviews        — all reviews
// =============================================================================

require_once __DIR__ . '/config.php';
apiHeaders();

requireAdmin();   // All admin routes gated here
$action = $_GET['action'] ?? '';
$db     = getDB();

// ── Dashboard stats ───────────────────────────────────────────────────────────
if ($action === 'stats') {
    $stats = [];

    $stats['total_bookings'] = (int)$db->query(
        'SELECT COUNT(*) FROM bookings'
    )->fetchColumn();

    $stats['total_revenue'] = (int)$db->query(
        "SELECT COALESCE(SUM(grand_total),0) FROM bookings WHERE status != 'cancelled'"
    )->fetchColumn();

    $stats['total_users'] = (int)$db->query(
        'SELECT COUNT(*) FROM users WHERE is_active = 1'
    )->fetchColumn();

    $stats['total_hotels'] = (int)$db->query('SELECT COUNT(*) FROM hotels')->fetchColumn();

    $stats['bookings_by_status'] = $db->query(
        'SELECT status, COUNT(*) AS cnt FROM bookings GROUP BY status'
    )->fetchAll();

    $stats['revenue_by_city'] = $db->query(
        "SELECT c.name AS city, COALESCE(SUM(b.grand_total),0) AS revenue
         FROM   bookings b
         JOIN   hotels h ON h.hotel_id = b.hotel_id
         JOIN   cities c ON c.city_id  = h.city_id
         WHERE  b.status != 'cancelled'
         GROUP  BY c.name
         ORDER  BY revenue DESC
         LIMIT  10"
    )->fetchAll();

    $stats['recent_bookings'] = $db->query(
        'SELECT booking_id, status, grand_total, created_at,
                hotel_name, user_name
         FROM   vw_bookings_detail
         ORDER  BY created_at DESC
         LIMIT  10'
    )->fetchAll() ?? [];

    respond(true, $stats);
}

// ── Hotels list (admin) ───────────────────────────────────────────────────────
if ($action === 'hotels') {
    $rows = $db->query(
        'SELECT h.*, c.name AS city_name, s.name AS state_name
         FROM   hotels h
         JOIN   cities c ON c.city_id  = h.city_id
         JOIN   states s ON s.state_id = c.state_id
         ORDER  BY h.hotel_id'
    )->fetchAll();
    respond(true, $rows);
}

// ── Hotel update ──────────────────────────────────────────────────────────────
if ($action === 'hotel_update') {
    $b       = jsonBody();
    $hotelId = $b['hotel_id'] ?? '';
    if (!$hotelId) respond(false, null, 'hotel_id required.', 422);

    $allowed = ['base_price', 'rating', 'name', 'description', 'location'];
    $sets    = [];
    $vals    = [];
    foreach ($allowed as $col) {
        if (isset($b[$col])) { $sets[] = "$col = ?"; $vals[] = $b[$col]; }
    }
    if (!$sets) respond(false, null, 'Nothing to update.', 422);

    $vals[] = $hotelId;
    $db->prepare('UPDATE hotels SET ' . implode(', ', $sets) . ' WHERE hotel_id = ?')
       ->execute($vals);

    respond(true, null, 'Hotel updated.');
}

// ── Users list ────────────────────────────────────────────────────────────────
if ($action === 'users') {
    $rows = $db->query(
        'SELECT u.user_id, u.full_name, u.email, u.phone, u.is_active, u.created_at,
                COUNT(b.booking_id) AS total_bookings,
                COALESCE(SUM(b.grand_total),0) AS total_spent
         FROM   users u
         LEFT JOIN bookings b ON b.user_id = u.user_id AND b.status != "cancelled"
         GROUP  BY u.user_id
         ORDER  BY u.created_at DESC'
    )->fetchAll();
    respond(true, $rows);
}

// ── Toggle user active ────────────────────────────────────────────────────────
if ($action === 'toggle_user') {
    $b      = jsonBody();
    $userId = (int)($b['user_id'] ?? 0);
    if (!$userId) respond(false, null, 'user_id required.', 422);

    $db->prepare('UPDATE users SET is_active = NOT is_active WHERE user_id = ?')
       ->execute([$userId]);
    respond(true, null, 'User status toggled.');
}

// ── All bookings ──────────────────────────────────────────────────────────────
if ($action === 'bookings') {
    $status = $_GET['status'] ?? '';
    $page   = max(1, (int)($_GET['page'] ?? 1));
    $limit  = 50;
    $offset = ($page - 1) * $limit;

    $where  = '1=1';
    $params = [];
    if ($status) { $where = 'status = ?'; $params[] = $status; }

    $total = $db->prepare("SELECT COUNT(*) FROM vw_bookings_detail WHERE $where");
    $total->execute($params);

    $rows = $db->prepare(
        "SELECT * FROM vw_bookings_detail WHERE $where ORDER BY created_at DESC LIMIT $limit OFFSET $offset"
    );
    $rows->execute($params);

    respond(true, [
        'bookings' => $rows->fetchAll(),
        'total'    => (int)$total->fetchColumn(),
        'page'     => $page,
        'limit'    => $limit,
    ]);
}

// ── Update booking status ─────────────────────────────────────────────────────
if ($action === 'booking_status') {
    $b    = jsonBody();
    $bid  = $b['booking_id'] ?? '';
    $stat = $b['status']     ?? '';
    if (!$bid || !$stat) respond(false, null, 'booking_id and status required.', 422);

    $db->prepare("UPDATE bookings SET status = ? WHERE booking_id = ?")
       ->execute([$stat, $bid]);
    respond(true, null, 'Status updated.');
}

// ── Reviews ───────────────────────────────────────────────────────────────────
if ($action === 'reviews') {
    $rows = $db->query(
        'SELECT rv.*, u.full_name AS reviewer_name, h.name AS hotel_name
         FROM   reviews rv
         JOIN   users  u ON u.user_id  = rv.user_id
         JOIN   hotels h ON h.hotel_id = rv.hotel_id
         ORDER  BY rv.created_at DESC
         LIMIT  200'
    )->fetchAll();
    respond(true, $rows);
}

respond(false, null, 'Unknown action.', 400);
