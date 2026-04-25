<?php
/**
 * User Login API
 * POST /api/login.php
 */

require '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Get input data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Email and password are required']));
}

// Find user by email
$stmt = $conn->prepare(
    "SELECT id, password, first_name, last_name, email, loyalty_points, loyalty_tier, is_active 
     FROM users WHERE email = ? AND is_active = TRUE"
);
$stmt->bind_param("s", $data['email']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(401);
    die(json_encode(['success' => false, 'error' => 'Invalid email or password']));
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($data['password'], $user['password'])) {
    http_response_code(401);
    die(json_encode(['success' => false, 'error' => 'Invalid email or password']));
}

// Set session
$_SESSION['user_id'] = $user['id'];
$_SESSION['email'] = $user['email'];
$_SESSION['first_name'] = $user['first_name'];
$_SESSION['last_name'] = $user['last_name'];
$_SESSION['login_time'] = time();

// Remove password from response
unset($user['password']);

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'user' => $user
]);

$stmt->close();
?>
