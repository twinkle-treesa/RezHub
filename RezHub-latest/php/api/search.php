<?php
/**
 * Hotel Search API
 * GET /api/search.php?city=Mumbai&checkIn=2026-03-20&checkOut=2026-03-25&guests=2
 */

require '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Get query parameters
$city = $_GET['city'] ?? '';
$checkIn = $_GET['checkIn'] ?? '';
$checkOut = $_GET['checkOut'] ?? '';
$guests = (int)($_GET['guests'] ?? 2);
$minPrice = (int)($_GET['minPrice'] ?? 0);
$maxPrice = (int)($_GET['maxPrice'] ?? 999999);
$minRating = (float)($_GET['minRating'] ?? 0);
$minStars = (int)($_GET['minStars'] ?? 0);

// Validate dates
if (empty($city)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'City is required']));
}

// Build query
$query = "SELECT h.*, GROUP_CONCAT(r.id) as room_ids FROM hotels h 
          LEFT JOIN rooms r ON h.id = r.hotel_id 
          WHERE h.city LIKE ?";
$params = ["%$city%"];
$types = "s";

// Add filters
if ($minStars > 0) {
    $query .= " AND h.stars >= ?";
    $params[] = $minStars;
    $types .= "i";
}

if ($minRating > 0) {
    $query .= " AND h.rating >= ?";
    $params[] = $minRating;
    $types .= "d";
}

$query .= " AND h.base_price BETWEEN ? AND ?";
$params[] = $minPrice;
$params[] = $maxPrice;
$types .= "ii";

// Add grouping and ordering
$query .= " GROUP BY h.id ORDER BY h.rating DESC LIMIT 50";

// Execute query
$stmt = $conn->prepare($query);
if (!$stmt) {
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Database error: ' . $conn->error]));
}

$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$hotels = [];
while ($row = $result->fetch_assoc()) {
    // Parse JSON fields
    if ($row['amenities']) {
        $row['amenities'] = json_decode($row['amenities'], true);
    }
    if ($row['nearby_landmarks']) {
        $row['nearby_landmarks'] = json_decode($row['nearby_landmarks'], true);
    }
    
    // Get rooms for this hotel
    $roomStmt = $conn->prepare(
        "SELECT id, name, room_type, base_price, max_guests, beds, room_size, 
                amenities, available_count FROM rooms 
         WHERE hotel_id = ? AND max_guests >= ? 
         LIMIT 10"
    );
    $roomStmt->bind_param("si", $row['id'], $guests);
    $roomStmt->execute();
    $roomResult = $roomStmt->get_result();
    
    $rooms = [];
    while ($roomRow = $roomResult->fetch_assoc()) {
        if ($roomRow['amenities']) {
            $roomRow['amenities'] = json_decode($roomRow['amenities'], true);
        }
        $rooms[] = $roomRow;
    }
    
    $row['rooms'] = $rooms;
    $row['available_rooms'] = count($rooms);
    
    $hotels[] = $row;
    $roomStmt->close();
}

echo json_encode([
    'success' => true,
    'count' => count($hotels),
    'hotels' => $hotels,
    'filters' => [
        'city' => $city,
        'checkIn' => $checkIn,
        'checkOut' => $checkOut,
        'guests' => $guests,
        'priceRange' => [$minPrice, $maxPrice],
        'minRating' => $minRating,
        'minStars' => $minStars
    ]
]);

$stmt->close();
?>
