<?php
/**
 * User Registration API
 * POST /api/register.php
 */

require '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Get input data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
$errors = [];

if (empty($data['email'])) {
    $errors[] = 'Email is required';
} elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

if (empty($data['password'])) {
    $errors[] = 'Password is required';
} elseif (strlen($data['password']) < 6) {
    $errors[] = 'Password must be at least 6 characters';
}

if (empty($data['first_name'])) {
    $errors[] = 'First name is required';
}

if (empty($data['last_name'])) {
    $errors[] = 'Last name is required';
}

if (!empty($errors)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'errors' => $errors]));
}

// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $data['email']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    http_response_code(409);
    die(json_encode(['success' => false, 'error' => 'Email already registered']));
}

// Hash password
$hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

// Insert new user
$stmt = $conn->prepare(
    "INSERT INTO users (email, password, first_name, last_name, phone) 
     VALUES (?, ?, ?, ?, ?)"
);

$phone = $data['phone'] ?? null;
$stmt->bind_param("sssss", $data['email'], $hashedPassword, $data['first_name'], $data['last_name'], $phone);

if ($stmt->execute()) {
    $userId = $stmt->insert_id;
    
    // Set session
    $_SESSION['user_id'] = $userId;
    $_SESSION['email'] = $data['email'];
    $_SESSION['first_name'] = $data['first_name'];
    $_SESSION['last_name'] = $data['last_name'];
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => [
            'id' => $userId,
            'email' => $data['email'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'loyalty_points' => 0,
            'loyalty_tier' => 'Bronze'
        ]
    ]);
} else {
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Registration failed: ' . $conn->error]));
}

$stmt->close();
?>
