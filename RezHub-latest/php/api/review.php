<?php
/**
 * Submit Review API
 * POST /api/review.php
 */

require '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Check if user is logged in
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    die(json_encode(['success' => false, 'error' => 'User not authenticated']));
}

// Get input data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
$errors = [];
if (empty($data['hotel_id'])) $errors[] = 'Hotel ID required';
if (empty($data['rating']) || $data['rating'] < 1 || $data['rating'] > 5) $errors[] = 'Rating must be 1-5';
if (empty($data['title'])) $errors[] = 'Review title required';
if (empty($data['comment'])) $errors[] = 'Review comment required';

if (!empty($errors)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'errors' => $errors]));
}

$userId = $_SESSION['user_id'];
$bookingId = $data['booking_id'] ?? null;

// Insert review
$stmt = $conn->prepare(
    "INSERT INTO reviews (booking_id, user_id, hotel_id, rating, title, comment, cleanliness, comfort, service, value, verified_booking) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)"
);

$cleanliness = (int)($data['cleanliness'] ?? $data['rating']);
$comfort = (int)($data['comfort'] ?? $data['rating']);
$service = (int)($data['service'] ?? $data['rating']);
$value = (int)($data['value'] ?? $data['rating']);

$stmt->bind_param(
    "isissiiii",
    $bookingId,
    $userId,
    $data['hotel_id'],
    $data['rating'],
    $data['title'],
    $data['comment'],
    $cleanliness,
    $comfort,
    $service,
    $value
);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Review submitted successfully',
        'review_id' => $stmt->insert_id
    ]);
} else {
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Failed to submit review: ' . $conn->error]));
}

$stmt->close();
?>
