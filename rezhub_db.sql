-- =============================================================================
--  RezHub — MySQL Database Schema
--  Compatible with: XAMPP (MySQL 5.7+ / MariaDB 10.3+)
--  Usage: Import via phpMyAdmin or run: mysql -u root -p < rezhub_db.sql
-- =============================================================================

SET SQL_MODE   = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone  = "+05:30";          -- IST

-- Drop & recreate the database
DROP DATABASE IF EXISTS rezhub;
CREATE DATABASE rezhub
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE rezhub;

-- Disable FK checks during load, re-enable at the end
SET FOREIGN_KEY_CHECKS = 0;


-- =============================================================================
--  1. STATES
-- =============================================================================
CREATE TABLE states (
  state_id   TINYINT UNSIGNED    NOT NULL AUTO_INCREMENT,
  name       VARCHAR(60)         NOT NULL,

  PRIMARY KEY (state_id),
  UNIQUE KEY uq_state_name (name)
) ENGINE=InnoDB COMMENT='Indian states present in the system';

INSERT INTO states (name) VALUES
  ('Maharashtra'),
  ('Rajasthan'),
  ('Delhi'),
  ('Tamil Nadu'),
  ('Karnataka'),
  ('Goa'),
  ('Gujarat'),
  ('Himachal Pradesh'),
  ('West Bengal'),
  ('Uttar Pradesh');


-- =============================================================================
--  2. CITIES
-- =============================================================================
CREATE TABLE cities (
  city_id    SMALLINT UNSIGNED   NOT NULL AUTO_INCREMENT,
  name       VARCHAR(80)         NOT NULL,
  state_id   TINYINT UNSIGNED    NOT NULL,

  PRIMARY KEY (city_id),
  UNIQUE KEY uq_city_state (name, state_id),
  CONSTRAINT fk_city_state
    FOREIGN KEY (state_id) REFERENCES states (state_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Cities mapped to states';

INSERT INTO cities (name, state_id) VALUES
  -- Maharashtra (1)
  ('Mumbai',        1),
  -- Rajasthan (2)
  ('Jaipur',        2),
  ('Udaipur',       2),
  ('Jodhpur',       2),
  -- Delhi (3)
  ('New Delhi',     3),
  -- Tamil Nadu (4)
  ('Chennai',       4),
  -- Karnataka (5)
  ('Bengaluru',     5),
  -- Goa (6)
  ('Panaji',        6),
  -- Gujarat (7)
  ('Ahmedabad',     7),
  -- Himachal Pradesh (8)
  ('Shimla',        8),
  -- West Bengal (9)
  ('Kolkata',       9),
  -- Uttar Pradesh (10)
  ('Agra',         10);


-- =============================================================================
--  3. HOTELS
-- =============================================================================
CREATE TABLE hotels (
  hotel_id        VARCHAR(10)         NOT NULL,   -- e.g. 'mh1', 'rj2'
  name            VARCHAR(120)        NOT NULL,
  location        VARCHAR(120)        NOT NULL,   -- neighbourhood / area
  city_id         SMALLINT UNSIGNED   NOT NULL,
  stars           TINYINT UNSIGNED    NOT NULL,
  rating          DECIMAL(3,2)        NOT NULL,
  review_count    INT UNSIGNED        NOT NULL DEFAULT 0,
  base_price      INT UNSIGNED        NOT NULL,   -- INR per night (pre-surge)
  description     TEXT                NOT NULL,
  image_path      VARCHAR(255)        NOT NULL,

  PRIMARY KEY (hotel_id),
  CONSTRAINT fk_hotel_city
    FOREIGN KEY (city_id) REFERENCES cities (city_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT chk_hotel_stars   CHECK (stars   BETWEEN 1 AND 5),
  CONSTRAINT chk_hotel_rating  CHECK (rating  BETWEEN 0.00 AND 5.00),
  CONSTRAINT chk_hotel_price   CHECK (base_price > 0)
) ENGINE=InnoDB COMMENT='Master hotel catalogue';

INSERT INTO hotels VALUES
-- Maharashtra
('mh1','The Oberoi Mumbai','Nariman Point',1,5,4.90,3201,23728,'Iconic 5-star on Marine Drive with panoramic Arabian Sea views, world-class dining and the celebrated Oberoi Spa.','images/mh1.jpg'),
('mh2','Taj Mahal Palace','Apollo Bunder, Colaba',1,5,4.95,4102,26923,'Mumbai\'s most iconic landmark — a 1903 heritage hotel overlooking the Gateway of India with legendary service and Michelin-starred dining.','images/mh2.jpg'),
('mh3','Trident Nariman Point','Nariman Point',1,4,4.60,1842,10455,'Sophisticated business hotel in the financial district with stunning sea views and excellent conferencing facilities.','images/gj3.jpg'),
('mh4','Hotel Suba Palace','Colaba',1,3,4.10,976,4407,'Well-located 3-star near the Gateway of India offering comfortable rooms and reliable service.','images/mh4.jpg'),
('mh5','Hotel City Point','Dadar',1,2,3.50,412,1780,'Budget-friendly 2-star in central Mumbai with easy access to trains, markets and local eateries.','images/wb6.jpg'),
('mh6','Hotel Decent','CST Area',1,1,3.10,218,720,'No-frills 1-star lodge steps from Chhatrapati Shivaji Terminus — perfect for budget backpackers.','images/gj6.jpg'),
-- Rajasthan
('rj1','Rambagh Palace','Bhawani Singh Road',2,5,4.91,2671,29687,'Once the Maharaja of Jaipur\'s residence, set amidst 47 acres of Mughal gardens — one of the world\'s finest palace hotels.','images/rj1.jpg'),
('rj2','The Oberoi Udaivilas','Haridasji Ki Magri',3,5,4.95,2104,31111,'Perched on Lake Pichola\'s banks — Rajasthan\'s most celebrated resort with private pools and hand-painted domes.','images/rj2.jpg'),
('rj3','Umaid Bhawan Palace','Palace Road',4,5,4.93,1102,46610,'Part of HH Gaj Singh II\'s royal residence — this 1943 Art Deco masterpiece overlooks the Blue City.','images/rj3.jpg'),
('rj4','Dera Rawatsar','Civil Lines',2,4,4.30,589,7203,'Charming heritage haveli converted to a boutique 4-star with courtyard pool and authentic Rajasthani cuisine.','images/rj4.jpg'),
('rj5','Hotel Pearl Palace','Hathroi Fort',2,3,4.40,1203,2712,'A beloved budget-traveller favourite — rooftop café, hand-painted rooms and exceptional value in the Pink City.','images/up5.jpg'),
('rj6','Hotel Atithi','Sindhi Camp',2,2,3.60,387,1441,'Clean 2-star near the bus stand with 24hr reception and easy access to major sights.','images/gj5.jpg'),
-- Delhi
('dl1','The Leela Palace','Chanakyapuri',5,5,4.87,1923,26271,'Crowned with a gilded dome, The Leela Palace is the pinnacle of contemporary Indian luxury in the diplomatic enclave.','images/dl1.jpg'),
('dl2','The Imperial New Delhi','Janpath',5,5,4.85,2340,21311,'A 1931 Art Deco landmark on Janpath — a living heritage hotel with galleries, fine dining and colonial-era charm.','images/up1.jpg'),
('dl3','Hyatt Regency Delhi','Bhikaji Cama Place',5,4,4.50,1456,9375,'Sleek international 4-star in South Delhi\'s business corridor with a stunning rooftop pool.','images/ka4.jpg'),
('dl4','Hotel Broadway','Asaf Ali Road',5,3,4.00,723,4068,'A Delhi institution since 1956 near Old Delhi\'s markets, with the famous Chor Bizarre restaurant on-site.','images/dl4.jpg'),
('dl5','Hotel Tara Palace','Paharganj',5,2,3.40,534,1610,'Budget 2-star in Paharganj backpacker hub — steps from New Delhi Railway Station.','images/dl5.jpg'),
('dl6','Hotel Ajanta','Arakashan Road',5,1,3.20,298,932,'No-frills 1-star lodge near New Delhi station — clean and safe with helpful staff.','images/dl6.jpg');


-- =============================================================================
--  4. HOTEL AMENITIES  (normalised many-values)
-- =============================================================================
CREATE TABLE hotel_amenities (
  amenity_id  INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  hotel_id    VARCHAR(10)     NOT NULL,
  amenity     VARCHAR(60)     NOT NULL,

  PRIMARY KEY (amenity_id),
  UNIQUE KEY uq_hotel_amenity (hotel_id, amenity),
  CONSTRAINT fk_hamen_hotel
    FOREIGN KEY (hotel_id) REFERENCES hotels (hotel_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Amenities offered by each hotel';

INSERT INTO hotel_amenities (hotel_id, amenity) VALUES
('mh1','Free WiFi'),('mh1','Pool'),('mh1','Spa'),('mh1','Gym'),('mh1','Restaurant'),('mh1','Bar'),('mh1','Room Service'),('mh1','Concierge'),
('mh2','Free WiFi'),('mh2','Pool'),('mh2','Spa'),('mh2','Gym'),('mh2','5 Restaurants'),('mh2','Bar'),('mh2','Room Service'),('mh2','Concierge'),
('mh3','Free WiFi'),('mh3','Pool'),('mh3','Gym'),('mh3','Restaurant'),('mh3','Bar'),('mh3','Room Service'),
('mh4','Free WiFi'),('mh4','Restaurant'),('mh4','Room Service'),('mh4','Concierge'),
('mh5','Free WiFi'),('mh5','Room Service'),
('mh6','Free WiFi'),
('rj1','Free WiFi'),('rj1','Pool'),('rj1','Spa'),('rj1','Gym'),('rj1','Restaurant'),('rj1','Bar'),('rj1','Room Service'),('rj1','Concierge'),
('rj2','Free WiFi'),('rj2','Pool'),('rj2','Spa'),('rj2','Gym'),('rj2','3 Restaurants'),('rj2','Bar'),('rj2','Room Service'),('rj2','Concierge'),
('rj3','Free WiFi'),('rj3','Pool'),('rj3','Spa'),('rj3','Gym'),('rj3','Restaurant'),('rj3','Bar'),('rj3','Room Service'),('rj3','Concierge'),
('rj4','Free WiFi'),('rj4','Pool'),('rj4','Restaurant'),('rj4','Bar'),('rj4','Room Service'),
('rj5','Free WiFi'),('rj5','Restaurant'),('rj5','Room Service'),
('rj6','Free WiFi'),('rj6','Room Service'),
('dl1','Free WiFi'),('dl1','Pool'),('dl1','Spa'),('dl1','Gym'),('dl1','3 Restaurants'),('dl1','Bar'),('dl1','Room Service'),('dl1','Concierge'),
('dl2','Free WiFi'),('dl2','Pool'),('dl2','Spa'),('dl2','Gym'),('dl2','Restaurant'),('dl2','Bar'),('dl2','Room Service'),('dl2','Concierge'),
('dl3','Free WiFi'),('dl3','Pool'),('dl3','Spa'),('dl3','Gym'),('dl3','Restaurant'),('dl3','Bar'),('dl3','Room Service'),
('dl4','Free WiFi'),('dl4','Restaurant'),('dl4','Bar'),('dl4','Room Service'),
('dl5','Free WiFi'),('dl5','Room Service'),
('dl6','Free WiFi');


-- =============================================================================
--  5. NEARBY ATTRACTIONS
-- =============================================================================
CREATE TABLE nearby_attractions (
  attraction_id   INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  hotel_id        VARCHAR(10)     NOT NULL,
  icon            VARCHAR(40)     NOT NULL,
  name            VARCHAR(120)    NOT NULL,
  detail          VARCHAR(200)    NOT NULL,
  warning         VARCHAR(255)    NULL DEFAULT NULL,   -- NULL = no warning

  PRIMARY KEY (attraction_id),
  CONSTRAINT fk_attr_hotel
    FOREIGN KEY (hotel_id) REFERENCES hotels (hotel_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Points of interest near each hotel';

INSERT INTO nearby_attractions (hotel_id, icon, name, detail, warning) VALUES
('mh1','place','Gateway of India','2.5 km · 8 min drive',NULL),
('mh1','beach_access','Marine Drive','Right outside',NULL),
('mh1','construction','Coastal Road Project','Near Haji Ali','Expect traffic delays 8am–7pm'),
('mh2','place','Gateway of India','50m · Steps away',NULL),
('mh2','account_balance','Chhatrapati Shivaji Museum','800m',NULL),
('mh3','place','Nariman Point','Walking distance',NULL),
('mh3','subway','Churchgate Station','1.2 km',NULL),
('mh4','place','Gateway of India','600m',NULL),
('mh4','restaurant','Leopold Café','300m',NULL),
('mh5','subway','Dadar Station','400m',NULL),
('mh5','shopping_bag','Dadar Market','200m',NULL),
('mh6','train','CST Railway Station','200m',NULL),
('rj1','account_balance','Hawa Mahal','4 km',NULL),
('rj1','fort','Amber Fort','12 km',NULL),
('rj1','event','Lit Fest Grounds','2 km','Heavy traffic during festival week'),
('rj2','account_balance','City Palace','2.3 km · 8 min boat',NULL),
('rj2','notifications','Jagdish Temple','2.8 km','Morning bells 5am–7am'),
('rj3','fort','Mehrangarh Fort','1.8 km',NULL),
('rj4','shopping_bag','Johari Bazaar','3 km · Gems & jewellery',NULL),
('rj5','account_balance','City Palace','5 km',NULL),
('rj6','directions_bus','Sindhi Camp Bus Stand','200m',NULL),
('dl1','account_balance','India Gate','6.5 km',NULL),
('dl1','construction','Road Work','Sardar Patel Marg','Daytime noise — use back entrance'),
('dl2','shopping_bag','Connaught Place','1 km',NULL),
('dl2','account_balance','Rashtrapati Bhavan','3 km',NULL),
('dl3','subway','Bhikaji Cama Metro','500m',NULL),
('dl4','shopping_bag','Chandni Chowk','1 km',NULL),
('dl4','account_balance','Red Fort','1.5 km',NULL),
('dl5','train','New Delhi Railway Station','400m',NULL),
('dl6','train','New Delhi Station','600m',NULL);


-- =============================================================================
--  6. PRICING EVENTS  (surge / seasonal pricing per hotel)
-- =============================================================================
CREATE TABLE pricing_events (
  pricing_id      INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  hotel_id        VARCHAR(10)     NOT NULL,
  event_name      VARCHAR(100)    NOT NULL,
  surge_percent   TINYINT UNSIGNED NOT NULL DEFAULT 0,
  base_price      INT UNSIGNED    NOT NULL,
  surge_amount    INT UNSIGNED    NOT NULL DEFAULT 0,
  gst_amount      INT UNSIGNED    NOT NULL DEFAULT 0,

  PRIMARY KEY (pricing_id),
  CONSTRAINT fk_price_hotel
    FOREIGN KEY (hotel_id) REFERENCES hotels (hotel_id)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT chk_surge_pct CHECK (surge_percent <= 100)
) ENGINE=InnoDB COMMENT='Current seasonal/event-based pricing applied to each hotel';

INSERT INTO pricing_events (hotel_id, event_name, surge_percent, base_price, surge_amount, gst_amount) VALUES
('mh1','Mumbai Film Festival',18,23728,4272,4250),
('mh2','New Year Premium',30,26923,8077,5250),
('mh3','Weekend Demand',10,10455,1045,1725),
('mh4','Standard Rate',0,4407,0,793),
('mh5','Standard Rate',0,1780,0,320),
('mh6','Standard Rate',0,720,0,130),
('rj1','Jaipur Literature Festival',28,29687,8313,5700),
('rj2','Diwali Season',35,31111,10889,6300),
('rj3','Limited Availability',0,46610,0,8390),
('rj4','Standard Rate',0,7203,0,1297),
('rj5','Standard Rate',0,2712,0,488),
('rj6','Standard Rate',0,1441,0,259),
('dl1','Government Summit',18,26271,4729,4650),
('dl2','Republic Day Season',22,21311,4689,3900),
('dl3','Weekend Surge',12,9375,1125,1575),
('dl4','Standard Rate',0,4068,0,732),
('dl5','Standard Rate',0,1610,0,290),
('dl6','Standard Rate',0,932,0,168);


-- =============================================================================
--  7. ROOMS
-- =============================================================================
CREATE TABLE rooms (
  room_id         VARCHAR(15)     NOT NULL,   -- e.g. 'mh1-1', 'rj2-1'
  hotel_id        VARCHAR(10)     NOT NULL,
  name            VARCHAR(120)    NOT NULL,
  description     TEXT            NOT NULL,
  price_per_night INT UNSIGNED    NOT NULL,
  max_guests      TINYINT UNSIGNED NOT NULL DEFAULT 2,
  bed_type        VARCHAR(80)     NOT NULL,
  size_sqm        TINYINT UNSIGNED NOT NULL,
  image_path      VARCHAR(255)    NOT NULL,

  PRIMARY KEY (room_id),
  CONSTRAINT fk_room_hotel
    FOREIGN KEY (hotel_id) REFERENCES hotels (hotel_id)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT chk_room_price      CHECK (price_per_night > 0),
  CONSTRAINT chk_room_guests     CHECK (max_guests BETWEEN 1 AND 10),
  CONSTRAINT chk_room_size       CHECK (size_sqm > 0)
) ENGINE=InnoDB COMMENT='Room types available in each hotel';

INSERT INTO rooms VALUES
('mh1-1','mh1','Premier Sea View Room','Floor-to-ceiling windows overlooking the Arabian Sea',28000,2,'1 King Bed',42,'images/up4-1.jpg'),
('mh1-2','mh1','Luxury Suite','Expansive suite with butler service and private terrace',65000,3,'1 King Bed + Sitting Room',90,'images/up1-2.jpg'),
('mh2-1','mh2','Heritage Grand Luxury Room','Palace wing room with harbour views and antique furnishings',35000,2,'1 King Bed',48,'images/up1-1.jpg'),
('mh3-1','mh3','Superior Room','Well-appointed room with city or sea views',11500,2,'1 King Bed',35,'images/gj4-1.jpg'),
('mh4-1','mh4','Standard Room','Clean comfortable room with modern amenities',5200,2,'1 Queen Bed',28,'images/hp6-1.jpg'),
('mh5-1','mh5','Standard Room','Simple clean room with AC',2100,2,'1 Double Bed',20,'images/up5-1.jpg'),
('mh6-1','mh6','Budget Room','Basic room with fan',850,2,'1 Single Bed',14,'images/gj6-1.jpg'),
('rj1-1','rj1','Luxury Room','Palace wing room with Mughal garden views',38000,2,'1 King Bed',45,'images/up3-1.jpg'),
('rj1-2','rj1','Royal Suite','Antique-furnished suite with private courtyard',75000,4,'1 King Bed + Study',110,'images/up1-2.jpg'),
('rj2-1','rj2','Premier Room with Pool','Lake view suite with private plunge pool',42000,2,'1 King Bed',55,'images/rj2-1.jpg'),
('rj3-1','rj3','Luxury Room','Art Deco room with desert skyline views',55000,2,'1 King Bed',52,'images/up2-1.jpg'),
('rj4-1','rj4','Heritage Room','Decorated room with traditional Rajput murals',8500,2,'1 Queen Bed',32,'images/gj1-1.jpg'),
('rj5-1','rj5','Deluxe Room','Colourfully painted room with rooftop access',3200,2,'1 Double Bed',22,'images/up4-1.jpg'),
('rj6-1','rj6','Standard Room','Simple clean room with AC',1700,2,'1 Double Bed',18,'images/hp6-1.jpg'),
('dl1-1','dl1','Deluxe Room','Elegant room overlooking heritage gardens',31000,2,'1 King Bed',40,'images/up4-1.jpg'),
('dl1-2','dl1','Grand Deluxe Suite','Suite furnished with fine Indian art and silks',58000,3,'1 King Bed + Sitting Room',72,'images/up1-2.jpg'),
('dl2-1','dl2','Heritage Room','Art Deco room with original 1930s furnishings',26000,2,'1 King Bed',38,'images/up3-1.jpg'),
('dl3-1','dl3','King Room','Modern room with city views',10500,2,'1 King Bed',36,'images/up2-1.jpg'),
('dl4-1','dl4','Superior Room','Spacious heritage-style room',4800,2,'1 Double Bed',28,'images/gj4-1.jpg'),
('dl5-1','dl5','Standard Room','Clean AC room',1900,2,'1 Double Bed',18,'images/up5-1.jpg'),
('dl6-1','dl6','Budget Room','Simple room with hot water and AC',1100,2,'1 Single Bed',13,'images/gj6-1.jpg');


-- =============================================================================
--  8. ROOM AMENITIES
-- =============================================================================
CREATE TABLE room_amenities (
  ram_id      INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  room_id     VARCHAR(15)     NOT NULL,
  amenity     VARCHAR(60)     NOT NULL,

  PRIMARY KEY (ram_id),
  UNIQUE KEY uq_room_amenity (room_id, amenity),
  CONSTRAINT fk_ramen_room
    FOREIGN KEY (room_id) REFERENCES rooms (room_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Amenities in each room type';

INSERT INTO room_amenities (room_id, amenity) VALUES
('mh1-1','Free WiFi'),('mh1-1','TV'),('mh1-1','Mini Bar'),('mh1-1','Safe'),
('mh1-2','Free WiFi'),('mh1-2','TV'),('mh1-2','Butler Service'),('mh1-2','Bathtub'),
('mh2-1','Free WiFi'),('mh2-1','TV'),('mh2-1','Mini Bar'),('mh2-1','Harbour View'),
('mh3-1','Free WiFi'),('mh3-1','TV'),('mh3-1','Mini Bar'),
('mh4-1','Free WiFi'),('mh4-1','TV'),('mh4-1','Safe'),
('mh5-1','Free WiFi'),('mh5-1','TV'),
('mh6-1','Free WiFi'),
('rj1-1','Free WiFi'),('rj1-1','TV'),('rj1-1','Mini Bar'),('rj1-1','Garden View'),
('rj1-2','Free WiFi'),('rj1-2','TV'),('rj1-2','Butler Service'),('rj1-2','Bathtub'),
('rj2-1','Free WiFi'),('rj2-1','Private Pool'),('rj2-1','Lake View'),
('rj3-1','Free WiFi'),('rj3-1','TV'),('rj3-1','Mini Bar'),('rj3-1','City View'),
('rj4-1','Free WiFi'),('rj4-1','TV'),('rj4-1','Garden View'),
('rj5-1','Free WiFi'),('rj5-1','TV'),
('rj6-1','Free WiFi'),('rj6-1','TV'),
('dl1-1','Free WiFi'),('dl1-1','TV'),('dl1-1','Mini Bar'),('dl1-1','Safe'),
('dl1-2','Free WiFi'),('dl1-2','TV'),('dl1-2','Butler Service'),('dl1-2','Bathtub'),
('dl2-1','Free WiFi'),('dl2-1','TV'),('dl2-1','Mini Bar'),
('dl3-1','Free WiFi'),('dl3-1','TV'),('dl3-1','Work Desk'),
('dl4-1','Free WiFi'),('dl4-1','TV'),('dl4-1','Safe'),
('dl5-1','Free WiFi'),('dl5-1','TV'),
('dl6-1','Free WiFi');


-- =============================================================================
--  9. LOYALTY TIERS
-- =============================================================================
CREATE TABLE loyalty_tiers (
  tier_id          TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  tier_key         VARCHAR(20)      NOT NULL,   -- 'bronze','silver','gold','platinum'
  name             VARCHAR(30)      NOT NULL,
  icon             VARCHAR(40)      NOT NULL,
  color_hex        VARCHAR(7)       NOT NULL,
  color_light_hex  VARCHAR(7)       NOT NULL,
  min_bookings     TINYINT UNSIGNED NOT NULL DEFAULT 0,
  min_spend_inr    INT UNSIGNED     NOT NULL DEFAULT 0,
  discount_percent TINYINT UNSIGNED NOT NULL DEFAULT 0,

  PRIMARY KEY (tier_id),
  UNIQUE KEY uq_tier_key (tier_key),

  CONSTRAINT chk_tier_discount CHECK (discount_percent BETWEEN 0 AND 100),
  CONSTRAINT chk_tier_color    CHECK (color_hex LIKE '#%'),
  CONSTRAINT chk_tier_colorl   CHECK (color_light_hex LIKE '#%')
) ENGINE=InnoDB COMMENT='Loyalty programme tiers';

INSERT INTO loyalty_tiers (tier_key, name, icon, color_hex, color_light_hex, min_bookings, min_spend_inr, discount_percent) VALUES
('bronze',  'Bronze',   'military_tech', '#CD7F32', '#FDF0E6',  1,      0, 5),
('silver',  'Silver',   'workspace_premium','#A0A0A0','#F2F2F2',3, 100000,10),
('gold',    'Gold',     'stars',         '#C9A96E', '#F5EDD8',  6, 300000,15),
('platinum','Platinum', 'diamond',       '#5C6BC0', '#EEF0FB', 12, 750000,20);


-- =============================================================================
--  10. LOYALTY TIER PERKS
-- =============================================================================
CREATE TABLE loyalty_tier_perks (
  perk_id   INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  tier_id   TINYINT UNSIGNED NOT NULL,
  perk      VARCHAR(200)     NOT NULL,
  sort_order TINYINT UNSIGNED NOT NULL DEFAULT 0,

  PRIMARY KEY (perk_id),
  CONSTRAINT fk_perk_tier
    FOREIGN KEY (tier_id) REFERENCES loyalty_tiers (tier_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Perks list for each loyalty tier';

INSERT INTO loyalty_tier_perks (tier_id, perk, sort_order) VALUES
(1,'Early check-in request (subject to availability)',1),
(1,'Welcome amenity on arrival',2),
(1,'5% discount on all bookings',3),
(2,'Guaranteed early check-in (12pm)',1),
(2,'Late checkout till 2pm',2),
(2,'Complimentary room upgrade when available',3),
(2,'10% discount on all bookings',4),
(3,'Guaranteed late checkout (4pm)',1),
(3,'Complimentary airport transfer (one-way)',2),
(3,'Complimentary breakfast for two',3),
(3,'Access to exclusive Gold member events',4),
(3,'15% discount on all bookings',5),
(4,'Dedicated personal concierge',1),
(4,'Complimentary suite upgrade when available',2),
(4,'Round-trip airport transfer included',3),
(4,'Full breakfast & evening cocktails',4),
(4,'Priority booking at sold-out properties',5),
(4,'20% discount on all bookings',6);


-- =============================================================================
--  11. USERS
-- =============================================================================
CREATE TABLE users (
  user_id       INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  full_name     VARCHAR(120)    NOT NULL,
  email         VARCHAR(180)    NOT NULL,
  password_hash VARCHAR(255)    NOT NULL,   -- store bcrypt hash, NEVER plain text
  phone         VARCHAR(20)     NULL DEFAULT NULL,
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,
  is_active     TINYINT(1)      NOT NULL DEFAULT 1,

  PRIMARY KEY (user_id),
  UNIQUE KEY uq_user_email (email),

  CONSTRAINT chk_user_email CHECK (email LIKE '%_@_%._%')
) ENGINE=InnoDB COMMENT='Registered guest accounts';

-- Sample user (password: Test@1234  — use PHP password_hash() in production)
INSERT INTO users (full_name, email, password_hash, phone) VALUES
('Rahul Sharma',  'rahul@example.com',  '$2y$12$exampleHashValueHere1','+91 98765 43210'),
('Priya Iyer',    'priya@example.com',  '$2y$12$exampleHashValueHere2','+91 90000 11111'),
('Arjun Mehta',   'arjun@example.com',  '$2y$12$exampleHashValueHere3', NULL);


-- =============================================================================
--  12. BOOKINGS
-- =============================================================================
CREATE TABLE bookings (
  booking_id       VARCHAR(20)      NOT NULL,   -- 'BKG-XXXXXXXX'
  user_id          INT UNSIGNED     NOT NULL,
  hotel_id         VARCHAR(10)      NOT NULL,
  room_id          VARCHAR(15)      NOT NULL,
  check_in_date    DATE             NOT NULL,
  check_out_date   DATE             NOT NULL,
  guest_count      TINYINT UNSIGNED NOT NULL DEFAULT 1,

  -- Guest / contact details captured at booking time
  first_name       VARCHAR(80)      NOT NULL,
  last_name        VARCHAR(80)      NOT NULL,
  guest_email      VARCHAR(180)     NOT NULL,
  guest_phone      VARCHAR(20)      NOT NULL,
  address          VARCHAR(255)     NULL DEFAULT NULL,
  guest_city       VARCHAR(80)      NULL DEFAULT NULL,
  country          VARCHAR(80)      NULL DEFAULT NULL,
  zip_code         VARCHAR(20)      NULL DEFAULT NULL,
  special_requests TEXT             NULL DEFAULT NULL,

  -- Pricing breakdown (all in INR)
  base_price       INT UNSIGNED     NOT NULL,   -- room price × nights
  tax_amount       INT UNSIGNED     NOT NULL DEFAULT 0,
  loyalty_saving   INT UNSIGNED     NOT NULL DEFAULT 0,
  grand_total      INT UNSIGNED     NOT NULL,

  status           ENUM('upcoming','active','completed','cancelled')
                                    NOT NULL DEFAULT 'upcoming',
  payment_id       VARCHAR(80)      NULL DEFAULT NULL,   -- Razorpay payment ID
  created_at       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP
                                    ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (booking_id),
  CONSTRAINT fk_bk_user
    FOREIGN KEY (user_id)  REFERENCES users  (user_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_bk_hotel
    FOREIGN KEY (hotel_id) REFERENCES hotels (hotel_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_bk_room
    FOREIGN KEY (room_id)  REFERENCES rooms  (room_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,

  -- Business rules
  CONSTRAINT chk_bk_dates       CHECK (check_out_date > check_in_date),
  CONSTRAINT chk_bk_guests      CHECK (guest_count BETWEEN 1 AND 10),
  CONSTRAINT chk_bk_price       CHECK (base_price  > 0),
  CONSTRAINT chk_bk_grand       CHECK (grand_total >= 0),
  CONSTRAINT chk_bk_email       CHECK (guest_email LIKE '%_@_%._%'),

  INDEX idx_bk_user   (user_id),
  INDEX idx_bk_hotel  (hotel_id),
  INDEX idx_bk_status (status),
  INDEX idx_bk_dates  (check_in_date, check_out_date)
) ENGINE=InnoDB COMMENT='All hotel booking records';

-- Sample bookings
INSERT INTO bookings VALUES
('BKG-A1B2C3D4',1,'mh1','mh1-1','2026-05-10','2026-05-13',2,'Rahul','Sharma','rahul@example.com','+91 98765 43210','123 MG Road','Mumbai','India','400001',NULL,84000,12750,0,96750,'upcoming','pay_abc123',NOW(),NOW()),
('BKG-E5F6G7H8',1,'rj2','rj2-1','2026-03-01','2026-03-04',2,'Rahul','Sharma','rahul@example.com','+91 98765 43210',NULL,NULL,'India',NULL,NULL,126000,18900,0,144900,'completed','pay_def456',NOW(),NOW()),
('BKG-I9J0K1L2',2,'dl1','dl1-2','2026-04-15','2026-04-18',3,'Priya','Iyer','priya@example.com','+91 90000 11111',NULL,'Chennai','India','600001',NULL,174000,26100,8700,191400,'upcoming','pay_ghi789',NOW(),NOW());


-- =============================================================================
--  13. REVIEWS
-- =============================================================================
CREATE TABLE reviews (
  review_id      INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  booking_id     VARCHAR(20)     NOT NULL,
  user_id        INT UNSIGNED    NOT NULL,
  hotel_id       VARCHAR(10)     NOT NULL,
  overall_rating TINYINT UNSIGNED NOT NULL,
  review_text    TEXT            NULL DEFAULT NULL,
  created_at     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (review_id),
  UNIQUE KEY uq_review_booking (booking_id),   -- one review per booking
  CONSTRAINT fk_rv_booking
    FOREIGN KEY (booking_id) REFERENCES bookings (booking_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_rv_user
    FOREIGN KEY (user_id)    REFERENCES users   (user_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_rv_hotel
    FOREIGN KEY (hotel_id)   REFERENCES hotels  (hotel_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT chk_rv_rating CHECK (overall_rating BETWEEN 1 AND 5),

  INDEX idx_rv_hotel (hotel_id),
  INDEX idx_rv_user  (user_id)
) ENGINE=InnoDB COMMENT='Guest reviews linked to completed bookings';

INSERT INTO reviews (booking_id, user_id, hotel_id, overall_rating, review_text) VALUES
('BKG-E5F6G7H8', 1, 'rj2', 5, 'Absolutely magical stay at Udaivilas. The lake view from our private pool was breathtaking. Impeccable service throughout.');


-- =============================================================================
--  14. ADMIN USERS
-- =============================================================================
CREATE TABLE admin_users (
  admin_id      INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  username      VARCHAR(60)   NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,   -- bcrypt hash
  full_name     VARCHAR(120)  NOT NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login    DATETIME      NULL DEFAULT NULL,
  is_active     TINYINT(1)    NOT NULL DEFAULT 1,

  PRIMARY KEY (admin_id),
  UNIQUE KEY uq_admin_username (username)
) ENGINE=InnoDB COMMENT='Admin panel credentials';

-- Default admin (password: Admin@1234 — change immediately after first login)
INSERT INTO admin_users (username, password_hash, full_name) VALUES
('admin', '$2y$12$exampleAdminHashHere', 'RezHub Administrator');


-- =============================================================================
--  VIEWS  — handy read-only views for the PHP backend
-- =============================================================================

-- Full booking details with hotel & room names
CREATE OR REPLACE VIEW vw_bookings_detail AS
SELECT
  b.booking_id,
  b.status,
  b.check_in_date,
  b.check_out_date,
  DATEDIFF(b.check_out_date, b.check_in_date) AS nights,
  b.guest_count,
  b.first_name,
  b.last_name,
  b.guest_email,
  b.guest_phone,
  b.base_price,
  b.tax_amount,
  b.loyalty_saving,
  b.grand_total,
  b.payment_id,
  b.created_at,
  -- user
  u.user_id,
  u.full_name  AS user_name,
  u.email      AS user_email,
  -- hotel
  h.hotel_id,
  h.name       AS hotel_name,
  c.name       AS hotel_city,
  s.name       AS hotel_state,
  h.stars,
  -- room
  r.room_id,
  r.name       AS room_name,
  r.bed_type,
  r.size_sqm
FROM       bookings b
JOIN       users    u ON u.user_id  = b.user_id
JOIN       hotels   h ON h.hotel_id = b.hotel_id
JOIN       cities   c ON c.city_id  = h.city_id
JOIN       states   s ON s.state_id = c.state_id
JOIN       rooms    r ON r.room_id  = b.room_id;


-- Per-hotel average rating & total reviews from the reviews table
CREATE OR REPLACE VIEW vw_hotel_ratings AS
SELECT
  h.hotel_id,
  h.name,
  COUNT(rv.review_id)            AS total_reviews,
  ROUND(AVG(rv.overall_rating),2) AS avg_rating
FROM hotels h
LEFT JOIN reviews rv ON rv.hotel_id = h.hotel_id
GROUP BY h.hotel_id, h.name;


-- User loyalty summary
CREATE OR REPLACE VIEW vw_user_loyalty AS
SELECT
  u.user_id,
  u.full_name,
  u.email,
  COUNT(b.booking_id)                              AS total_bookings,
  COALESCE(SUM(b.grand_total),0)                   AS total_spend_inr,
  COALESCE(SUM(CASE WHEN b.status='completed'
               THEN b.grand_total END),0)           AS completed_spend
FROM  users u
LEFT JOIN bookings b ON b.user_id = u.user_id
                     AND b.status != 'cancelled'
GROUP BY u.user_id, u.full_name, u.email;


-- =============================================================================
--  Re-enable FK checks
-- =============================================================================
SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
--  Quick sanity check
-- =============================================================================
SELECT 'states'            AS tbl, COUNT(*) AS `rows` FROM states
UNION ALL
SELECT 'cities',                   COUNT(*)          FROM cities
UNION ALL
SELECT 'hotels',                   COUNT(*)          FROM hotels
UNION ALL
SELECT 'hotel_amenities',          COUNT(*)          FROM hotel_amenities
UNION ALL
SELECT 'nearby_attractions',       COUNT(*)          FROM nearby_attractions
UNION ALL
SELECT 'pricing_events',           COUNT(*)          FROM pricing_events
UNION ALL
SELECT 'rooms',                    COUNT(*)          FROM rooms
UNION ALL
SELECT 'room_amenities',           COUNT(*)          FROM room_amenities
UNION ALL
SELECT 'loyalty_tiers',            COUNT(*)          FROM loyalty_tiers
UNION ALL
SELECT 'loyalty_tier_perks',       COUNT(*)          FROM loyalty_tier_perks
UNION ALL
SELECT 'users',                    COUNT(*)          FROM users
UNION ALL
SELECT 'bookings',                 COUNT(*)          FROM bookings
UNION ALL
SELECT 'reviews',                  COUNT(*)          FROM reviews
UNION ALL
SELECT 'admin_users',              COUNT(*)          FROM admin_users;
