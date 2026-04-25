<?php
/**
 * Sample Data Generator for Testing
 * POST /php/add-sample-data.php
 * 
 * This file helps populate the database with test data for development
 * Remove in production or secure with authentication
 */

require 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('This endpoint only accepts POST requests');
}

// Generate test users
$testUsers = [
    [
        'email' => 'user1@example.com',
        'password' => password_hash('password123', PASSWORD_BCRYPT),
        'first_name' => 'Rajesh',
        'last_name' => 'Kumar',
        'phone' => '+91-9876543210'
    ],
    [
        'email' => 'user2@example.com',
        'password' => password_hash('password456', PASSWORD_BCRYPT),
        'first_name' => 'Priya',
        'last_name' => 'Singh',
        'phone' => '+91-9876543211'
    ],
    [
        'email' => 'user3@example.com',
        'password' => password_hash('password789', PASSWORD_BCRYPT),
        'first_name' => 'Amit',
        'last_name' => 'Patel',
        'phone' => '+91-9876543212'
    ]
];

$usersInserted = 0;
foreach ($testUsers as $user) {
    $stmt = $conn->prepare(
        "INSERT IGNORE INTO users (email, password, first_name, last_name, phone) 
         VALUES (?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("sssss", $user['email'], $user['password'], $user['first_name'], $user['last_name'], $user['phone']);
    if ($stmt->execute()) {
        $usersInserted++;
    }
    $stmt->close();
}

// Generate sample bookings for demonstration
$stmt = $conn->prepare("LIMIT 1");
$result = $conn->query("SELECT id FROM users WHERE email = 'user1@example.com'");
$row = $result->fetch_assoc();
$testUserId = $row['id'] ?? 1;

$result2 = $conn->query("SELECT id FROM hotels LIMIT 1");
$hotelRow = $result2->fetch_assoc();
$testHotelId = $hotelRow['id'] ?? 'mh1';

$result3 = $conn->query("SELECT id FROM rooms WHERE hotel_id = '{$testHotelId}' LIMIT 1");
$roomRow = $result3->fetch_assoc();
$testRoomId = $roomRow['id'] ?? 'mh1-1';

$bookingsInserted = 0;
$bookingCode = 'RZ' . strtoupper(substr(uniqid(), -8));

$stmt = $conn->prepare(
    "INSERT INTO bookings (booking_code, user_id, hotel_id, room_id, check_in, check_out, guests, total_price, nights, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')"
);

$checkIn = date('Y-m-d', strtotime('+5 days'));
$checkOut = date('Y-m-d', strtotime('+10 days'));
$nights = 5;
$totalPrice = 140000;

$stmt->bind_param("ssisssiii", $bookingCode, $testUserId, $testHotelId, $testRoomId, $checkIn, $checkOut, $guests = 2, $totalPrice, $nights);

if ($stmt->execute()) {
    $bookingsInserted++;
}
$stmt->close();

// Generate sample reviews
$reviewsInserted = 0;
$stmt = $conn->prepare(
    "INSERT INTO reviews (user_id, hotel_id, rating, title, comment, cleanliness, comfort, service, value, verified_booking) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)"
);

$reviews = [
    [$testUserId, $testHotelId, 5, 'Fantastic Experience!', 'Amazing service and beautiful rooms', 5, 5, 5, 5],
    [$testUserId, $testHotelId, 4, 'Good Value for Money', 'Nice hotel, a bit noisy at night', 4, 4, 4, 4]
];

foreach ($reviews as $review) {
    $stmt->bind_param("isisiiiii", $review[0], $review[1], $review[2], $review[3], $review[4], $review[5], $review[6], $review[7], $review[8]);
    if ($stmt->execute()) {
        $reviewsInserted++;
    }
}
$stmt->close();

// Response
$response = [
    'success' => true,
    'message' => 'Sample data generated successfully',
    'stats' => [
        'users_inserted' => $usersInserted,
        'bookings_inserted' => $bookingsInserted,
        'reviews_inserted' => $reviewsInserted
    ],
    'test_credentials' => [
        'email' => 'user1@example.com',
        'password' => 'password123'
    ]
];

header('Content-Type: application/json');
echo json_encode($response);
?>
