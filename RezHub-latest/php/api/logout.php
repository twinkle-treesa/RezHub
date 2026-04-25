<?php
/**
 * User Logout API
 * POST /api/logout.php
 */

require '../config.php';

// Clear session
session_destroy();

echo json_encode([
    'success' => true,
    'message' => 'Logout successful'
]);
?>
