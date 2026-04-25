<?php
/**
 * RezHub Database Initialization Script
 * Create all necessary database tables
 * Run this once to set up the database
 */

// Database connection (without selecting specific DB yet)
$conn = new mysqli(
    'localhost',
    'root',
    '',
    '',
    3306
);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

// Create Database
$sqlCreateDB = "CREATE DATABASE IF NOT EXISTS `rezhub` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
if (!$conn->query($sqlCreateDB)) {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db('rezhub');

// ════════════════════════════════════════════════════════════════════════════
// Create Tables
// ════════════════════════════════════════════════════════════════════════════

// Users Table
$sqlUsers = "CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(100),
    `last_name` VARCHAR(100),
    `phone` VARCHAR(20),
    `profile_pic` VARCHAR(255),
    `loyalty_points` INT DEFAULT 0,
    `loyalty_tier` ENUM('Bronze', 'Silver', 'Gold', 'Platinum') DEFAULT 'Bronze',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `is_active` BOOLEAN DEFAULT TRUE,
    INDEX `idx_email` (`email`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if (!$conn->query($sqlUsers)) {
    die("Error creating users table: " . $conn->error);
}

// Hotels Table
$sqlHotels = "CREATE TABLE IF NOT EXISTS `hotels` (
    `id` VARCHAR(50) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255),
    `city` VARCHAR(100),
    `state` VARCHAR(100),
    `country` VARCHAR(100) DEFAULT 'India',
    `stars` INT,
    `rating` DECIMAL(2,2),
    `reviews_count` INT DEFAULT 0,
    `base_price` INT,
    `description` TEXT,
    `amenities` JSON,
    `nearby_landmarks` JSON,
    `image_url` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_city_state` (`city`, `state`),
    INDEX `idx_base_price` (`base_price`),
    INDEX `idx_rating` (`rating`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if (!$conn->query($sqlHotels)) {
    die("Error creating hotels table: " . $conn->error);
}

// Rooms Table
$sqlRooms = "CREATE TABLE IF NOT EXISTS `rooms` (
    `id` VARCHAR(50) PRIMARY KEY,
    `hotel_id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `room_type` VARCHAR(100),
    `base_price` INT NOT NULL,
    `max_guests` INT,
    `beds` VARCHAR(100),
    `room_size` INT,
    `amenities` JSON,
    `image_url` VARCHAR(255),
    `available_count` INT DEFAULT 10,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE CASCADE,
    INDEX `idx_hotel_id` (`hotel_id`),
    INDEX `idx_base_price` (`base_price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if (!$conn->query($sqlRooms)) {
    die("Error creating rooms table: " . $conn->error);
}

// Bookings Table
$sqlBookings = "CREATE TABLE IF NOT EXISTS `bookings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `booking_code` VARCHAR(20) UNIQUE NOT NULL,
    `user_id` INT NOT NULL,
    `hotel_id` VARCHAR(50) NOT NULL,
    `room_id` VARCHAR(50) NOT NULL,
    `check_in` DATE NOT NULL,
    `check_out` DATE NOT NULL,
    `guests` INT,
    `total_price` INT NOT NULL,
    `nights` INT,
    `status` ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled') DEFAULT 'pending',
    `payment_status` ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    `special_requests` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE,
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_hotel_id` (`hotel_id`),
    INDEX `idx_check_in` (`check_in`),
    INDEX `idx_status` (`status`),
    INDEX `idx_booking_code` (`booking_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if (!$conn->query($sqlBookings)) {
    die("Error creating bookings table: " . $conn->error);
}

// Reviews Table
$sqlReviews = "CREATE TABLE IF NOT EXISTS `reviews` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `booking_id` INT,
    `user_id` INT NOT NULL,
    `hotel_id` VARCHAR(50) NOT NULL,
    `rating` INT CHECK (rating >= 1 AND rating <= 5),
    `title` VARCHAR(255),
    `comment` TEXT,
    `cleanliness` INT,
    `comfort` INT,
    `service` INT,
    `value` INT,
    `helpful_count` INT DEFAULT 0,
    `verified_booking` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE CASCADE,
    INDEX `idx_hotel_id` (`hotel_id`),
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_rating` (`rating`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if (!$conn->query($sqlReviews)) {
    die("Error creating reviews table: " . $conn->error);
}

// Loyalty Programs Table
$sqlLoyalty = "CREATE TABLE IF NOT EXISTS `loyalty_transactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `booking_id` INT,
    `points` INT NOT NULL,
    `transaction_type` ENUM('earn', 'redeem', 'bonus', 'adjustment') DEFAULT 'earn',
    `description` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE SET NULL,
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if (!$conn->query($sqlLoyalty)) {
    die("Error creating loyalty_transactions table: " . $conn->error);
}

// Room Availability Table (for booking availability checks)
$sqlAvailability = "CREATE TABLE IF NOT EXISTS `room_availability` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `room_id` VARCHAR(50) NOT NULL,
    `date` DATE NOT NULL,
    `available` INT DEFAULT 10,
    `booked` INT DEFAULT 0,
    FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_room_date` (`room_id`, `date`),
    INDEX `idx_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if (!$conn->query($sqlAvailability)) {
    die("Error creating room_availability table: " . $conn->error);
}

// Payment Records Table
$sqlPayments = "CREATE TABLE IF NOT EXISTS `payments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `booking_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `amount` INT NOT NULL,
    `currency` VARCHAR(10) DEFAULT 'INR',
    `payment_method` VARCHAR(50),
    `transaction_id` VARCHAR(255) UNIQUE,
    `status` ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    `response` JSON,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_booking_id` (`booking_id`),
    INDEX `idx_transaction_id` (`transaction_id`),
    INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if (!$conn->query($sqlPayments)) {
    die("Error creating payments table: " . $conn->error);
}

$conn->close();

echo "✓ Database 'rezhub' created successfully!\n";
echo "✓ All tables created successfully!\n";
echo "\nDatabase Setup Complete. Your tables are ready to use.\n";
echo "Next: Import the hotel data using sync-hotels.php\n";
?>
