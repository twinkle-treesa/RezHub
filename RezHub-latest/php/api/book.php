<?php
/**
 * Create Booking API
 * POST /api/book.php
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
if (empty($data['room_id'])) $errors[] = 'Room ID required';
if (empty($data['check_in'])) $errors[] = 'Check-in date required';
if (empty($data['check_out'])) $errors[] = 'Check-out date required';
if (empty($data['guests'])) $errors[] = 'Number of guests required';
if (empty($data['total_price'])) $errors[] = 'Price information required';

if (!empty($errors)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'errors' => $errors]));
}

// Validate dates
$checkIn = strtotime($data['check_in']);
$checkOut = strtotime($data['check_out']);
if ($checkIn >= $checkOut) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Invalid date range']));
}

// Calculate nights
$nights = ceil(($checkOut - $checkIn) / 86400);

// Generate booking code
$bookingCode = 'RZ' . strtoupper(substr(uniqid(), -8));

// Insert booking
$stmt = $conn->prepare(
    "INSERT INTO bookings 
     (booking_code, user_id, hotel_id, room_id, check_in, check_out, guests, total_price, nights, special_requests, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')"
);

$userId = $_SESSION['user_id'];
$specialRequests = $data['special_requests'] ?? null;
$guests = (int)$data['guests'];
$totalPrice = (int)$data['total_price'];

$stmt->bind_param(
    "ssisssiiis",
    $bookingCode,
    $userId,
    $data['hotel_id'],
    $data['room_id'],
    $data['check_in'],
    $data['check_out'],
    $guests,
    $totalPrice,
    $nights,
    $specialRequests
);

if ($stmt->execute()) {
    $bookingId = $stmt->insert_id;
    
    // Add loyalty points (1 point per ₹100)
    $earnedPoints = floor($totalPrice / 100);
    
    $loyaltyStmt = $conn->prepare(
        "INSERT INTO loyalty_transactions (user_id, booking_id, points, transaction_type, description) 
         VALUES (?, ?, ?, 'earn', 'Points earned from booking')"
    );
    $loyaltyStmt->bind_param("iii", $userId, $bookingId, $earnedPoints);
    $loyaltyStmt->execute();
    
    // Update user loyalty points
    $updateStmt = $conn->prepare(
        "UPDATE users SET loyalty_points = loyalty_points + ? WHERE id = ?"
    );
    $updateStmt->bind_param("ii", $earnedPoints, $userId);
    $updateStmt->execute();
    
    // Get booking details
    $detailStmt = $conn->prepare(
        "SELECT b.*, h.name as hotel_name, r.name as room_name 
         FROM bookings b
         LEFT JOIN hotels h ON b.hotel_id = h.id
         LEFT JOIN rooms r ON b.room_id = r.id
         WHERE b.id = ?"
    );
    $detailStmt->bind_param("i", $bookingId);
    $detailStmt->execute();
    $bookingDetails = $detailStmt->get_result()->fetch_assoc();
    
    echo json_encode([
        'success' => true,
        'message' => 'Booking confirmed',
        'booking' => $bookingDetails,
        'loyalty' => [
            'points_earned' => $earnedPoints,
            'total_points' => $earnedPoints
        ]
    ]);
    
    $detailStmt->close();
    $updateStmt->close();
    $loyaltyStmt->close();
} else {
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Booking failed: ' . $conn->error]));
}

$stmt->close();
?>
