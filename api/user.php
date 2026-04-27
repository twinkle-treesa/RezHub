<?php
// =============================================================================
//  RezHub — User Profile & Loyalty API
//  GET  /api/user.php?action=profile          — get profile
//  POST /api/user.php?action=update_profile   — update name / phone
//  POST /api/user.php?action=change_password  — change password
//  GET  /api/user.php?action=loyalty          — loyalty tier + progress
//  GET  /api/user.php?action=tiers            — all loyalty tiers info
//  GET  /api/user.php?action=dashboard        — dashboard stats
// =============================================================================

require_once __DIR__ . '/config.php';
apiHeaders();

$action = $_GET['action'] ?? '';
$db     = getDB();

// ── Profile ───────────────────────────────────────────────────────────────────
if ($action === 'profile') {
    $user = requireAuth();
    $stmt = $db->prepare(
        'SELECT user_id, full_name, email, phone, created_at FROM users WHERE user_id = ?'
    );
    $stmt->execute([$user['user_id']]);
    respond(true, $stmt->fetch());
}

// ── Update profile ────────────────────────────────────────────────────────────
if ($action === 'update_profile') {
    $user = requireAuth();
    $b    = jsonBody();

    $name  = trim($b['full_name'] ?? '');
    $phone = trim($b['phone']     ?? '') ?: null;
    if (!$name) respond(false, null, 'Name is required.', 422);

    $db->prepare('UPDATE users SET full_name = ?, phone = ? WHERE user_id = ?')
       ->execute([$name, $phone, $user['user_id']]);

    // Update session
    startSession();
    $_SESSION['user']['full_name'] = $name;
    $_SESSION['user']['phone']     = $phone;

    respond(true, null, 'Profile updated.');
}

// ── Change password ───────────────────────────────────────────────────────────
if ($action === 'change_password') {
    $user = requireAuth();
    $b    = jsonBody();

    $current = $b['current_password'] ?? '';
    $newPass = $b['new_password']     ?? '';

    if (!$current || !$newPass)
        respond(false, null, 'Current and new password required.', 422);
    if (strlen($newPass) < 6)
        respond(false, null, 'New password must be at least 6 characters.', 422);

    $row = $db->prepare('SELECT password_hash FROM users WHERE user_id = ?');
    $row->execute([$user['user_id']]);
    $u = $row->fetch();

    if (!password_verify($current, $u['password_hash']))
        respond(false, null, 'Current password is incorrect.', 401);

    $hash = password_hash($newPass, PASSWORD_BCRYPT, ['cost' => 12]);
    $db->prepare('UPDATE users SET password_hash = ? WHERE user_id = ?')
       ->execute([$hash, $user['user_id']]);

    respond(true, null, 'Password changed successfully.');
}

// ── Loyalty info ──────────────────────────────────────────────────────────────
if ($action === 'loyalty') {
    $user = requireAuth();

    // Pull user stats
    $stats = $db->prepare(
        'SELECT total_bookings, total_spend_inr, completed_spend
         FROM   vw_user_loyalty WHERE user_id = ?'
    );
    $stats->execute([$user['user_id']]);
    $stat = $stats->fetch() ?? ['total_bookings'=>0,'total_spend_inr'=>0,'completed_spend'=>0];

    $bookings = (int)$stat['total_bookings'];
    $spend    = (int)$stat['total_spend_inr'];

    // Find current tier
    $tiers = $db->query(
        'SELECT * FROM loyalty_tiers ORDER BY min_bookings ASC'
    )->fetchAll();

    $current = $tiers[0];
    foreach ($tiers as $t) {
        if ($bookings >= $t['min_bookings'] && $spend >= $t['min_spend_inr']) {
            $current = $t;
        }
    }

    // Perks for current tier
    $perks = $db->prepare(
        'SELECT perk FROM loyalty_tier_perks WHERE tier_id = ? ORDER BY sort_order'
    );
    $perks->execute([$current['tier_id']]);
    $current['perks'] = $perks->fetchAll(PDO::FETCH_COLUMN);

    // Find next tier
    $nextTier = null;
    foreach ($tiers as $t) {
        if ($t['min_bookings'] > $current['min_bookings']) {
            $nextTier = $t;
            break;
        }
    }

    respond(true, [
        'current_tier'       => $current,
        'next_tier'          => $nextTier,
        'total_bookings'     => $bookings,
        'total_spend_inr'    => $spend,
        'bookings_to_next'   => $nextTier ? max(0, $nextTier['min_bookings'] - $bookings) : 0,
        'spend_to_next'      => $nextTier ? max(0, $nextTier['min_spend_inr']  - $spend)  : 0,
    ]);
}

// ── All tiers (for loyalty page display) ─────────────────────────────────────
if ($action === 'tiers') {
    $tiers = $db->query('SELECT * FROM loyalty_tiers ORDER BY tier_id')->fetchAll();
    foreach ($tiers as &$t) {
        $perks = $db->prepare('SELECT perk FROM loyalty_tier_perks WHERE tier_id = ? ORDER BY sort_order');
        $perks->execute([$t['tier_id']]);
        $t['perks'] = $perks->fetchAll(PDO::FETCH_COLUMN);
    }
    respond(true, $tiers);
}

// ── Dashboard stats ───────────────────────────────────────────────────────────
if ($action === 'dashboard') {
    $user = requireAuth();

    $bkStmt = $db->prepare(
        'SELECT b.booking_id, b.status, b.check_in_date, b.check_out_date,
                b.grand_total, b.created_at,
                h.name AS hotel_name, h.image_path,
                c.name AS city_name
         FROM   bookings b
         JOIN   hotels h ON h.hotel_id = b.hotel_id
         JOIN   cities c ON c.city_id  = h.city_id
         WHERE  b.user_id = ?
         ORDER  BY b.created_at DESC
         LIMIT  5'
    );
    $bkStmt->execute([$user['user_id']]);
    $recentBookings = $bkStmt->fetchAll();

    $totals = $db->prepare(
        'SELECT
           COUNT(*)                                           AS total_bookings,
           SUM(grand_total)                                  AS total_spent,
           SUM(CASE WHEN status="upcoming" THEN 1 ELSE 0 END) AS upcoming_count,
           SUM(CASE WHEN status="completed" THEN 1 ELSE 0 END) AS completed_count
         FROM bookings WHERE user_id = ? AND status != "cancelled"'
    );
    $totals->execute([$user['user_id']]);
    $summary = $totals->fetch();

    respond(true, [
        'summary'          => $summary,
        'recent_bookings'  => $recentBookings,
    ]);
}

respond(false, null, 'Unknown action.', 400);
