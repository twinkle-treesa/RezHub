<?php
// =============================================================================
//  RezHub — Database Configuration
//  Place this project in: C:\xampp\htdocs\RezHub-latest\
//  Access via:            http://localhost/RezHub-latest/
// =============================================================================

define('DB_HOST', 'localhost');
define('DB_USER', 'root');        // XAMPP default — change in production
define('DB_PASS', '');            // XAMPP default — change in production
define('DB_NAME', 'rezhub');
define('DB_PORT', 3306);          // XAMPP default MySQL port

// ── Timezone ─────────────────────────────────────────────────────────────────
date_default_timezone_set('Asia/Kolkata');

// ── Connect & return PDO instance ────────────────────────────────────────────
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
            DB_HOST, DB_PORT, DB_NAME
        );
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Database connection failed. Make sure XAMPP MySQL is running and the database "rezhub" exists.',
                'error'   => $e->getMessage()
            ]);
            exit;
        }
    }
    return $pdo;
}

// ── CORS & JSON headers (call at top of every API file) ──────────────────────
function apiHeaders(): void {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');          // tighten in production
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ── Read JSON body helper ─────────────────────────────────────────────────────
function jsonBody(): array {
    $raw = file_get_contents('php://input');
    return $raw ? (json_decode($raw, true) ?? []) : [];
}

// ── Session-based auth helpers ────────────────────────────────────────────────
function startSession(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'lifetime' => 0,
            'path'     => '/',
            'secure'   => false,   // set true when using HTTPS
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

function currentUser(): ?array {
    startSession();
    return $_SESSION['user'] ?? null;
}

function requireAuth(): array {
    $u = currentUser();
    if (!$u) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Not authenticated. Please log in.']);
        exit;
    }
    return $u;
}

function requireAdmin(): array {
    startSession();
    $a = $_SESSION['admin'] ?? null;
    if (!$a) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Admin access required.']);
        exit;
    }
    return $a;
}

function respond(bool $success, mixed $data = null, string $message = '', int $code = 200): void {
    http_response_code($code);
    $payload = ['success' => $success];
    if ($message)        $payload['message'] = $message;
    if ($data !== null)  $payload['data']    = $data;
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
