<?php
/**
 * Current User API
 * GET /api/user.php
 */

require '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Check if user is logged in
if (empty($_SESSION['user_id'])) {
    echo json_encode([
        'success' => true,
        'authenticated' => false,
        'user' => null
    ]);
    exit;
}

$userId = $_SESSION['user_id'];

// Get user data
$stmt = $conn->prepare(
    "SELECT id, email, first_name, last_name, phone, loyalty_points, loyalty_tier, created_at 
     FROM users WHERE id = ?"
);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    session_destroy();
    echo json_encode([
        'success' => false,
        'error' => 'User not found'
    ]);
    exit;
}

$user = $result->fetch_assoc();

echo json_encode([
    'success' => true,
    'authenticated' => true,
    'user' => $user
]);

$stmt->close();
?>
