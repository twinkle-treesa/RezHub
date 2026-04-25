<?php
/**
 * Hotel Data Sync API
 * POST /api/sync-hotels.php
 * Imports hotel data from frontend to database
 */

require '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Get hotel data
$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['hotels']) || !is_array($data['hotels'])) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Invalid hotel data']));
}

$imported = 0;
$errors = [];

foreach ($data['hotels'] as $hotel) {
    try {
        // Check if hotel already exists
        $checkStmt = $conn->prepare("SELECT id FROM hotels WHERE id = ?");
        $checkStmt->bind_param("s", $hotel['id']);
        $checkStmt->execute();
        
        if ($checkStmt->get_result()->num_rows > 0) {
            $checkStmt->close();
            continue; // Skip if already exists
        }
        $checkStmt->close();
        
        // Insert hotel
        $amenitiesJson = json_encode($hotel['amenities'] ?? []);
        $nearbyJson = json_encode($hotel['nearby'] ?? []);
        $pricingReasonJson = json_encode($hotel['pricingReason'] ?? []);
        
        $stmt = $conn->prepare(
            "INSERT INTO hotels (id, name, location, city, state, stars, rating, reviews_count, base_price, description, amenities, nearby_landmarks, image_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );
        
        $stmt->bind_param(
            "sssssiidisss",
            $hotel['id'],
            $hotel['name'],
            $hotel['location'],
            $hotel['city'],
            $hotel['state'],
            $hotel['stars'],
            $hotel['rating'],
            $hotel['reviews'],
            $hotel['price'],
            $hotel['description'],
            $amenitiesJson,
            $nearbyJson,
            $hotel['image']
        );
        
        if (!$stmt->execute()) {
            $errors[] = "Failed to insert hotel {$hotel['id']}: " . $stmt->error;
            $stmt->close();
            continue;
        }
        $stmt->close();
        
        // Insert rooms
        if (!empty($hotel['rooms']) && is_array($hotel['rooms'])) {
            foreach ($hotel['rooms'] as $room) {
                $roomAmenitiesJson = json_encode($room['amenities'] ?? []);
                
                $roomStmt = $conn->prepare(
                    "INSERT INTO rooms (id, hotel_id, name, description, base_price, max_guests, beds, room_size, amenities, available_count) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                );
                
                $available = 10;
                $roomStmt->bind_param(
                    "ssssiiissi",
                    $room['id'],
                    $hotel['id'],
                    $room['name'],
                    $room['description'],
                    $room['price'],
                    $room['maxGuests'],
                    $room['beds'],
                    $room['size'],
                    $roomAmenitiesJson,
                    $available
                );
                
                if (!$roomStmt->execute()) {
                    $errors[] = "Failed to insert room {$room['id']}: " . $roomStmt->error;
                }
                $roomStmt->close();
            }
        }
        
        $imported++;
        
    } catch (Exception $e) {
        $errors[] = "Error processing hotel {$hotel['id']}: " . $e->getMessage();
    }
}

echo json_encode([
    'success' => true,
    'imported' => $imported,
    'total' => count($data['hotels']),
    'errors' => $errors
]);
?>
