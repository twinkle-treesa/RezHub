<?php
// =============================================================================
//  RezHub — Auth API
//  POST /api/auth.php?action=register   — create account
//  POST /api/auth.php?action=login      — sign in (user)
//  POST /api/auth.php?action=logout     — sign out
//  GET  /api/auth.php?action=me         — get logged-in user
//  POST /api/auth.php?action=admin_login — admin sign in
// =============================================================================

require_once __DIR__ . '/config.php';
apiHeaders();

$action = $_GET['action'] ?? '';

switch ($action) {

    // ── Register ──────────────────────────────────────────────────────────────
    case 'register': {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, null, 'POST required', 405);

        $b = jsonBody();
        $name  = trim($b['full_name']  ?? '');
        $email = strtolower(trim($b['email'] ?? ''));
        $pass  = $b['password'] ?? '';
        $phone = trim($b['phone'] ?? '') ?: null;

        if (!$name || !$email || !$pass)
            respond(false, null, 'Name, email and password are required.', 422);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
            respond(false, null, 'Invalid email address.', 422);

        if (strlen($pass) < 6)
            respond(false, null, 'Password must be at least 6 characters.', 422);

        $db = getDB();

        // Check duplicate email
        $chk = $db->prepare('SELECT user_id FROM users WHERE email = ?');
        $chk->execute([$email]);
        if ($chk->fetch())
            respond(false, null, 'An account with this email already exists.', 409);

        $hash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12]);
        $ins  = $db->prepare(
            'INSERT INTO users (full_name, email, password_hash, phone) VALUES (?,?,?,?)'
        );
        $ins->execute([$name, $email, $hash, $phone]);
        $userId = (int)$db->lastInsertId();

        // Auto-login after register
        startSession();
        $_SESSION['user'] = [
            'user_id'   => $userId,
            'name'      => $name,
            'email'     => $email,
            'phone'     => $phone,
        ];

        respond(true, $_SESSION['user'], 'Account created successfully.');
    }

    // ── Login ─────────────────────────────────────────────────────────────────
    case 'login': {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, null, 'POST required', 405);

        $b     = jsonBody();
        $email = strtolower(trim($b['email']    ?? ''));
        $pass  = $b['password'] ?? '';

        if (!$email || !$pass)
            respond(false, null, 'Email and password are required.', 422);

        $db  = getDB();
        $row = $db->prepare(
            'SELECT user_id, full_name, email, phone, password_hash, is_active FROM users WHERE email = ?'
        );
        $row->execute([$email]);
        $user = $row->fetch();

        if (!$user || !password_verify($pass, $user['password_hash']))
            respond(false, null, 'Invalid email or password.', 401);

        if (!$user['is_active'])
            respond(false, null, 'Your account has been deactivated.', 403);

        unset($user['password_hash'], $user['is_active']);

        // Normalise to consistent field names expected by the frontend
        $sessionUser = [
            'user_id' => $user['user_id'] ?? $user['id'],
            'name'    => $user['full_name'] ?? $user['name'] ?? '',
            'email'   => $user['email'],
            'phone'   => $user['phone'] ?? '',
        ];

        startSession();
        session_regenerate_id(true);
        $_SESSION['user'] = $sessionUser;

        respond(true, $sessionUser, 'Login successful.');
    }

    // ── Admin Login ───────────────────────────────────────────────────────────
    case 'admin_login': {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, null, 'POST required', 405);

        $b    = jsonBody();
        $user = trim($b['username'] ?? '');
        $pass = $b['password'] ?? '';

        if (!$user || !$pass)
            respond(false, null, 'Username and password are required.', 422);

        $db  = getDB();
        $row = $db->prepare(
            'SELECT admin_id, username, full_name, password_hash, is_active FROM admin_users WHERE username = ?'
        );
        $row->execute([$user]);
        $admin = $row->fetch();

        if (!$admin || hash('sha256', $pass) !== $admin['password_hash'])
            respond(false, null, 'Invalid admin credentials.', 401);

        if (!$admin['is_active'])
            respond(false, null, 'Admin account is inactive.', 403);

        // Update last_login
        $db->prepare('UPDATE admin_users SET last_login = NOW() WHERE admin_id = ?')
           ->execute([$admin['admin_id']]);

        unset($admin['password_hash'], $admin['is_active']);

        startSession();
        session_regenerate_id(true);
        $_SESSION['admin'] = $admin;

        respond(true, $admin, 'Admin login successful.');
    }

    // ── Me ────────────────────────────────────────────────────────────────────
    case 'me': {
        startSession();
        $user = $_SESSION['user'] ?? null;
        if (!$user) respond(false, null, 'Not logged in.', 401);
        respond(true, $user);
    }

    // ── Logout ────────────────────────────────────────────────────────────────
    case 'logout': {
        startSession();
        $_SESSION = [];
        session_destroy();
        respond(true, null, 'Logged out.');
    }

    default:
        respond(false, null, 'Unknown action.', 400);
}
