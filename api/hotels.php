<?php
// =============================================================================
//  RezHub — Hotels API
//  GET  /api/hotels.php                   — list / search hotels
//  GET  /api/hotels.php?id=mh1            — single hotel with rooms, amenities etc.
//  GET  /api/hotels.php?action=cities     — list all cities (for search dropdown)
//  GET  /api/hotels.php?action=states     — list all states
// =============================================================================

require_once __DIR__ . '/config.php';
apiHeaders();

$db     = getDB();
$action = $_GET['action'] ?? 'list';
$id     = $_GET['id']     ?? null;

// ── Single hotel detail ───────────────────────────────────────────────────────
if ($id) {
    $stmt = $db->prepare(
        'SELECT h.*, c.name AS city_name, s.name AS state_name
         FROM   hotels h
         JOIN   cities c ON c.city_id  = h.city_id
         JOIN   states s ON s.state_id = c.state_id
         WHERE  h.hotel_id = ?'
    );
    $stmt->execute([$id]);
    $hotel = $stmt->fetch();

    if (!$hotel) respond(false, null, 'Hotel not found.', 404);

    // Amenities
    $amenStmt = $db->prepare('SELECT amenity FROM hotel_amenities WHERE hotel_id = ? ORDER BY amenity_id');
    $amenStmt->execute([$id]);
    $hotel['amenities'] = $amenStmt->fetchAll(PDO::FETCH_COLUMN);

    // Rooms
    $roomStmt = $db->prepare(
        'SELECT r.*,
                GROUP_CONCAT(ra.amenity ORDER BY ra.ram_id SEPARATOR "||") AS amenities_raw
         FROM   rooms r
         LEFT JOIN room_amenities ra ON ra.room_id = r.room_id
         WHERE  r.hotel_id = ?
         GROUP  BY r.room_id
         ORDER  BY r.price_per_night'
    );
    $roomStmt->execute([$id]);
    $rooms = $roomStmt->fetchAll();
    foreach ($rooms as &$room) {
        $room['amenities'] = $room['amenities_raw']
            ? explode('||', $room['amenities_raw'])
            : [];
        unset($room['amenities_raw']);
    }
    $hotel['rooms'] = $rooms;

    // Nearby attractions
    $attrStmt = $db->prepare(
        'SELECT icon, name, detail, warning FROM nearby_attractions WHERE hotel_id = ? ORDER BY attraction_id'
    );
    $attrStmt->execute([$id]);
    $hotel['attractions'] = $attrStmt->fetchAll();

    // Pricing event
    $priceStmt = $db->prepare('SELECT * FROM pricing_events WHERE hotel_id = ?');
    $priceStmt->execute([$id]);
    $hotel['pricing'] = $priceStmt->fetch() ?: null;

    // Reviews
    $rvStmt = $db->prepare(
        'SELECT rv.review_id, rv.overall_rating, rv.review_text, rv.created_at,
                u.full_name AS reviewer_name
         FROM   reviews rv
         JOIN   users u ON u.user_id = rv.user_id
         WHERE  rv.hotel_id = ?
         ORDER  BY rv.created_at DESC
         LIMIT  10'
    );
    $rvStmt->execute([$id]);
    $hotel['reviews'] = $rvStmt->fetchAll();

    respond(true, $hotel);
}

// ── Cities list ───────────────────────────────────────────────────────────────
if ($action === 'cities') {
    $rows = $db->query(
        'SELECT c.city_id, c.name, s.name AS state_name
         FROM   cities c
         JOIN   states s ON s.state_id = c.state_id
         ORDER  BY c.name'
    )->fetchAll();
    respond(true, $rows);
}

// ── States list ───────────────────────────────────────────────────────────────
if ($action === 'states') {
    $rows = $db->query('SELECT * FROM states ORDER BY name')->fetchAll();
    respond(true, $rows);
}

// ── Search / list hotels ──────────────────────────────────────────────────────
$city       = $_GET['city']        ?? '';
$state      = $_GET['state']       ?? '';
$minStars   = (int)($_GET['min_stars']   ?? 0);
$maxPrice   = (int)($_GET['max_price']   ?? 0);
$minRating  = (float)($_GET['min_rating'] ?? 0);
$sortBy     = $_GET['sort']        ?? 'rating';  // rating | price_asc | price_desc

$where  = ['1=1'];
$params = [];

if ($city) {
    $where[]  = 'c.name = ?';
    $params[] = $city;
}
if ($state) {
    $where[]  = 's.name = ?';
    $params[] = $state;
}
if ($minStars > 0) {
    $where[]  = 'h.stars >= ?';
    $params[] = $minStars;
}
if ($maxPrice > 0) {
    $where[]  = 'h.base_price <= ?';
    $params[] = $maxPrice;
}
if ($minRating > 0) {
    $where[]  = 'h.rating >= ?';
    $params[] = $minRating;
}

$orderMap = [
    'rating'     => 'h.rating DESC',
    'price_asc'  => 'h.base_price ASC',
    'price_desc' => 'h.base_price DESC',
    'stars'      => 'h.stars DESC',
];
$order = $orderMap[$sortBy] ?? 'h.rating DESC';

$sql = "SELECT h.hotel_id, h.name, h.location, h.stars, h.rating,
               h.review_count, h.base_price, h.description, h.image_path,
               c.name AS city_name, s.name AS state_name
        FROM   hotels h
        JOIN   cities c ON c.city_id  = h.city_id
        JOIN   states s ON s.state_id = c.state_id
        WHERE  " . implode(' AND ', $where) . "
        ORDER  BY $order";

$stmt = $db->prepare($sql);
$stmt->execute($params);
$hotels = $stmt->fetchAll();

// Attach amenities list to each hotel
$amenAll = $db->query(
    'SELECT hotel_id, amenity FROM hotel_amenities ORDER BY hotel_id, amenity_id'
)->fetchAll();
$amenMap = [];
foreach ($amenAll as $a) $amenMap[$a['hotel_id']][] = $a['amenity'];

foreach ($hotels as &$h) {
    $h['amenities'] = $amenMap[$h['hotel_id']] ?? [];
}

respond(true, $hotels);
