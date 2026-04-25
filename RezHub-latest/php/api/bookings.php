<?php
/**
 * Get User Bookings API
 * GET /api/bookings.php
 */

require '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Check if user is logged in
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    die(json_encode(['success' => false, 'error' => 'User not authenticated']));
}

$userId = $_SESSION['user_id'];
$status = $_GET['status'] ?? null;

// Build query
$query = "SELECT b.*, h.name as hotel_name, h.city, h.state, r.name as room_name, 
                 pr.path as photo_url, pr.alt as photo_alt
          FROM bookings b
          LEFT JOIN hotels h ON b.hotel_id = h.id
          LEFT JOIN rooms r ON b.room_id = r.id
          LEFT JOIN images pr ON h.id = pr.entity_id AND pr.entity_type = 'hotel'
          WHERE b.user_id = ?";

$params = [$userId];
$types = "i";

if (!empty($status)) {
    $query .= " AND b.status = ?";
    $params[] = $status;
    $types .= "s";
}

$query .= " ORDER BY b.check_in DESC LIMIT 50";

$stmt = $conn->prepare($query);
if (!$stmt) {
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Database error']));
}

$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];
while ($row = $result->fetch_assoc()) {
    // Format dates
    $row['check_in_formatted'] = date('M d, Y', strtotime($row['check_in']));
    $row['check_out_formatted'] = date('M d, Y', strtotime($row['check_out']));
    $row['booked_on'] = date('M d, Y', strtotime($row['created_at']));
    $bookings[] = $row;
}

echo json_encode([
    'success' => true,
    'count' => count($bookings),
    'bookings' => $bookings
]);

$stmt->close();
?>
