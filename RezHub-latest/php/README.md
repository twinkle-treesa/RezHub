# RezHub Database Setup & API Documentation

## 📋 Quick Start

### Prerequisites
- **PHP 7.4+** with MySQLi extension
- **MySQL 5.7+** or compatible database
- **Local development**: XAMPP, WAMP, or MAMP

### Installation Steps

1. **Navigate to database initialization:**
   - Open your browser and go to: `http://localhost/RezHub-latest/RezHub-latest/php/setup.html`
   - OR manually run: `http://localhost/RezHub-latest/RezHub-latest/php/db-init.php`

2. **Verify MySQL connection:**
   - Edit `php/config.php` if you use non-default MySQL credentials
   - Default: `host=localhost`, `user=root`, `password=` (empty)

3. **Import hotel data:**
   - Use the setup interface to import hotel data from `js/data.js`
   - This will populate the `hotels` and `rooms` tables

---

## 📁 File Structure

```
RezHub-latest/
├── php/
│   ├── config.php              # Database configuration & connection
│   ├── db-init.php             # Database initialization script
│   ├── setup.html              # Setup & management interface
│   └── api/
│       ├── register.php        # User registration
│       ├── login.php           # User authentication
│       ├── logout.php          # User logout
│       ├── user.php            # Get current user
│       ├── search.php          # Search hotels
│       ├── book.php            # Create booking
│       ├── bookings.php        # Get user bookings
│       ├── review.php          # Submit review
│       └── sync-hotels.php     # Import hotel data
└── js/
    └── data.js                 # Frontend hotel data
```

---

## 🗄️ Database Schema

### Tables

#### **users**
Stores user account information and loyalty data
```sql
- id (Primary Key)
- email (Unique)
- password (hashed)
- first_name, last_name
- phone
- loyalty_points
- loyalty_tier (Bronze, Silver, Gold, Platinum)
- created_at, updated_at
- is_active
```

#### **hotels**
Hotel information and details
```sql
- id (Primary Key)
- name, location, city, state
- stars, rating, reviews_count
- base_price
- description
- amenities (JSON)
- nearby_landmarks (JSON)
- image_url
```

#### **rooms**
Room details for each hotel
```sql
- id (Primary Key)
- hotel_id (Foreign Key)
- name, room_type
- base_price, max_guests
- beds, room_size
- amenities (JSON)
- available_count
```

#### **bookings**
Stores booking records
```sql
- id (Primary Key)
- booking_code (Unique)
- user_id, hotel_id, room_id
- check_in, check_out
- guests, nights
- total_price
- status (pending, confirmed, checked_in, checked_out, cancelled)
- payment_status
- special_requests
- created_at, updated_at
```

#### **reviews**
User reviews and ratings
```sql
- id (Primary Key)
- booking_id, user_id, hotel_id
- rating (1-5)
- title, comment
- cleanliness, comfort, service, value
- verified_booking
- created_at, updated_at
```

#### **loyalty_transactions**
Track loyalty points
```sql
- id (Primary Key)
- user_id, booking_id
- points
- transaction_type (earn, redeem, bonus, adjustment)
- description
- created_at
```

#### **payments**
Payment records
```sql
- id (Primary Key)
- booking_id, user_id
- amount, currency
- payment_method
- transaction_id (Unique)
- status (pending, completed, failed, refunded)
- response (JSON)
- created_at, updated_at
```

#### **room_availability**
Track room availability for each date
```sql
- id (Primary Key)
- room_id, date
- available, booked
```

---

## 🔌 API Endpoints

### Authentication

#### **Register User**
```
POST /php/api/register.php
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+91-9876543210"
}

Response:
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "loyalty_points": 0,
    "loyalty_tier": "Bronze"
  }
}
```

#### **Login User**
```
POST /php/api/login.php
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure123"
}

Response:
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "loyalty_points": 500,
    "loyalty_tier": "Silver"
  }
}
```

#### **Get Current User**
```
GET /php/api/user.php

Response:
{
  "success": true,
  "authenticated": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "loyalty_points": 500
  }
}
```

#### **Logout User**
```
POST /php/api/logout.php

Response:
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Hotels & Search

#### **Search Hotels**
```
GET /php/api/search.php?city=Mumbai&checkIn=2026-03-20&checkOut=2026-03-25&guests=2&minPrice=1000&maxPrice=50000&minRating=4&minStars=3

Query Parameters:
- city (required): Search city
- checkIn: Check-in date (YYYY-MM-DD)
- checkOut: Check-out date (YYYY-MM-DD)
- guests: Number of guests (default: 2)
- minPrice: Minimum price (default: 0)
- maxPrice: Maximum price (default: 999999)
- minRating: Minimum rating (default: 0)
- minStars: Minimum star rating (default: 0)

Response:
{
  "success": true,
  "count": 15,
  "hotels": [
    {
      "id": "mh1",
      "name": "The Oberoi Mumbai",
      "city": "Mumbai",
      "stars": 5,
      "rating": 4.9,
      "base_price": 28000,
      "amenities": [...],
      "rooms": [...]
    }
  ],
  "filters": {
    "city": "Mumbai",
    "guests": 2,
    "priceRange": [1000, 50000]
  }
}
```

---

### Bookings

#### **Create Booking**
```
POST /php/api/book.php
Content-Type: application/json
(User must be authenticated - requires session)

{
  "hotel_id": "mh1",
  "room_id": "mh1-1",
  "check_in": "2026-03-20",
  "check_out": "2026-03-25",
  "guests": 2,
  "total_price": 140000,
  "special_requests": "High floor preferred"
}

Response:
{
  "success": true,
  "booking": {
    "id": 42,
    "booking_code": "RZ1A2B3C",
    "hotel_name": "The Oberoi Mumbai",
    "room_name": "Premier Sea View Room",
    "check_in": "2026-03-20",
    "check_out": "2026-03-25",
    "total_price": 140000,
    "status": "confirmed"
  },
  "loyalty": {
    "points_earned": 1400,
    "total_points": 1500
  }
}
```

#### **Get User Bookings**
```
GET /php/api/bookings.php?status=confirmed
(User must be authenticated)

Query Parameters:
- status (optional): Filter by status (confirmed, pending, cancelled, etc.)

Response:
{
  "success": true,
  "count": 3,
  "bookings": [
    {
      "id": 42,
      "booking_code": "RZ1A2B3C",
      "hotel_name": "The Oberoi Mumbai",
      "room_name": "Premier Sea View Room",
      "check_in": "2026-03-20",
      "check_out": "2026-03-25",
      "status": "confirmed",
      "total_price": 140000
    }
  ]
}
```

---

### Reviews

#### **Submit Review**
```
POST /php/api/review.php
Content-Type: application/json
(User must be authenticated)

{
  "hotel_id": "mh1",
  "booking_id": 42,
  "rating": 5,
  "title": "Fantastic Experience!",
  "comment": "Amazing service and beautiful rooms",
  "cleanliness": 5,
  "comfort": 5,
  "service": 5,
  "value": 4
}

Response:
{
  "success": true,
  "message": "Review submitted successfully",
  "review_id": 156
}
```

---

## 🛠️ Configuration

### config.php

```php
// Database Credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'rezhub');
define('DB_PORT', 3306);

// Session Configuration
define('SESSION_TIMEOUT', 3600);  // 1 hour

// Application Configuration
define('APP_URL', 'http://localhost/RezHub-latest/RezHub-latest');
```

**To modify database credentials:**
1. Open `php/config.php`
2. Update the database constants with your MySQL credentials
3. Save the file

---

## 💻 Frontend Integration

### Using API Helper (Recommended)

Include the API helper in your HTML:
```html
<script src="js/api-helper.js"></script>
```

Then use the helper functions:
```javascript
// Search hotels
API.searchHotels('Mumbai', '2026-03-20', '2026-03-25', 2)
    .then(hotels => console.log(hotels));

// Register user
API.register({
    email: 'user@example.com',
    password: 'pass123',
    first_name: 'John',
    last_name: 'Doe'
}).then(user => console.log(user));

// Create booking
API.createBooking({
    hotel_id: 'mh1',
    room_id: 'mh1-1',
    check_in: '2026-03-20',
    check_out: '2026-03-25',
    guests: 2,
    total_price: 140000
}).then(booking => console.log(booking));
```

### Manual API Calls

```javascript
// Search Example
fetch('/php/api/search.php?city=Mumbai&guests=2')
    .then(r => r.json())
    .then(data => console.log(data));

// Login Example
fetch('/php/api/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'user@example.com',
        password: 'password123'
    })
})
.then(r => r.json())
.then(data => console.log(data));
```

---

## 🧪 Testing

### Using the Setup Interface
1. Navigate to: `http://localhost/RezHub-latest/RezHub-latest/php/setup.html`
2. Click "Check Status" to verify database connection
3. Click "Test" buttons for individual endpoints

### Using cURL (Command Line)

```bash
# Search hotels
curl "http://localhost/RezHub-latest/RezHub-latest/php/api/search.php?city=Mumbai"

# Register user
curl -X POST http://localhost/RezHub-latest/RezHub-latest/php/api/register.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","first_name":"Test","last_name":"User"}'

# Create booking
curl -X POST http://localhost/RezHub-latest/RezHub-latest/php/api/book.php \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"hotel_id":"mh1","room_id":"mh1-1",...}'
```

---

## 🔒 Security Best Practices

1. **Passwords**: Always hashed using `password_hash()` with BCRYPT
2. **Sessions**: Used for user authentication, timeout set to 1 hour
3. **SQL Injection**: All queries use prepared statements with parameterized binding
4. **CORS**: Enabled for localhost development (update for production)
5. **Environment Variables**: Consider moving database credentials to `.env` file for production

---

## 🐛 Troubleshooting

### "Cannot connect to database"
- Verify MySQL is running
- Check database credentials in `php/config.php`
- Ensure database `rezhub` exists (run `db-init.php`)

### "Table already exists"
- This is normal if running `db-init.php` multiple times
- Use `DROP DATABASE rezhub;` then re-run initialization

### Session errors
- Verify PHP sessions are enabled in `php.ini`
- Check `/tmp` or Windows temp directory has write permissions

### CORS errors
- Update `config.php` CORS headers for your domain
- In production, set specific allowed origins

---

## 📞 Support Files

- **Setup Interface**: `/php/setup.html` - Easy-to-use database setup and testing
- **Database Creation**: `/php/db-init.php` - Run to initialize tables
- **Configuration**: `/php/config.php` - Adjust database credentials here
- **API Helper**: `/js/api-helper.js` - JavaScript helper functions

---

## ✅ Next Steps

1. ✓ Run `db-init.php` to create database
2. ✓ Import hotel data using setup interface
3. ✓ Test API endpoints using setup interface
4. ✓ Include `api-helper.js` in your frontend pages
5. ✓ Update HTML forms to call API endpoints
6. ✓ Test with sample data before going live

---

**Happy coding! 🚀**
