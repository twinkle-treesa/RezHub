<?php
/**
 * RezHub Database Configuration
 * MySQL Database Connection Settings
 */

// Database Credentials
define('DB_HOST', 'localhost');           // MySQL Host
define('DB_USER', 'root');                // MySQL User
define('DB_PASS', '');                    // MySQL Password (empty for XAMPP default)
define('DB_NAME', 'rezhub');              // Database Name
define('DB_PORT', 3306);                  // MySQL Port (default 3306)

// Session Configuration
define('SESSION_TIMEOUT', 3600);          // Session timeout in seconds (1 hour)
define('SESSION_NAME', 'rezhub_session');

// Application Configuration
define('APP_ROOT', dirname(dirname(__FILE__)));
define('APP_URL', 'http://localhost/RezHub-latest/RezHub-latest');

// Enable error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Create Database Connection
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }
    
    // Set charset to UTF-8
    $conn->set_charset("utf8mb4");
    
} catch (Exception $e) {
    http_response_code(500);
    die(json_encode([
        'success' => false,
        'error' => 'Database connection error: ' . $e->getMessage()
    ]));
}

// Session Configuration
session_name(SESSION_NAME);
session_start();

// CORS Headers for API
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
