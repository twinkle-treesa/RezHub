# RezHub DATABASE SETUP - QUICK START GUIDE

## 🚀 SETUP IN 3 STEPS

### Step 1: Start Your Local Server
- **XAMPP**: Start Apache & MySQL from XAMPP Control Panel
- **WAMP**: Start from system tray
- **MAMP**: Start from Applications

### Step 2: Initialize Database
Open your browser and visit:
```
http://localhost/RezHub-latest/RezHub-latest/php/setup.html
```

Click **"Initialize Database"** button to create tables.

### Step 3: Import Hotel Data
On the same setup page, click **"Import Hotel Data"** to populate hotels and rooms.

---

## ✅ VERIFY SETUP

All systems go when you can access:
```
✓ Setup Interface: http://localhost/RezHub-latest/RezHub-latest/php/setup.html
✓ Search Test: http://localhost/RezHub-latest/RezHub-latest/php/api/search.php?city=Mumbai
✓ User Check: http://localhost/RezHub-latest/RezHub-latest/php/api/user.php
```

---

## 📦 FILES CREATED

```
php/
├── config.php                 # Database connection config
├── db-init.php               # Database initialization
├── setup.html                # Setup interface & testing
├── README.md                 # Full documentation
└── api/
    ├── register.php          # User registration
    ├── login.php             # User login
    ├── logout.php            # User logout
    ├── user.php              # Current user info
    ├── search.php            # Hotel search
    ├── book.php              # Create booking
    ├── bookings.php          # Get user bookings
    ├── review.php            # Submit review
    └── sync-hotels.php       # Import hotels

js/
└── api-helper.js             # JavaScript helper library
```

---

## 🔌 API QUICK REFERENCE

### In Your HTML/JavaScript:
```html
<!-- Include helper -->
<script src="js/api-helper.js"></script>

<script>
  // Wait for API to initialize
  document.addEventListener('auth-checked', async () => {
    
    // Search hotels
    const results = await API.searchHotels({
      city: 'Mumbai',
      checkIn: '2026-03-20',
      checkOut: '2026-03-25',
      guests: 2
    });
    console.log(results.hotels);
    
    // Register user
    await API.register({
      email: 'user@example.com',
      password: 'secure123',
      first_name: 'John',
      last_name: 'Doe'
    });
    
    // Login
    await API.login('user@example.com', 'secure123');
    
    // Create booking
    const booking = await API.createBooking({
      hotel_id: 'mh1',
      room_id: 'mh1-1',
      check_in: '2026-03-20',
      check_out: '2026-03-25',
      guests: 2,
      total_price: 140000
    });
    
    // Get bookings
    const myBookings = await API.getBookings('confirmed');
    
    // Submit review
    await API.submitReview({
      hotel_id: 'mh1',
      booking_id: 42,
      rating: 5,
      title: 'Excellent!',
      comment: 'Amazing experience'
    });
    
    // Utilities
    console.log(API.isLoggedIn());
    console.log(API.formatPrice(50000));
    console.log(API.formatDate('2026-03-20'));
    
    // Logout
    await API.logout();
  });
</script>
```

---

## 🗄️ DATABASE STRUCTURE (Overview)

| Table | Purpose |
|-------|---------|
| **users** | User accounts, login credentials, loyalty points |
| **hotels** | Hotel information with ratings and prices |
| **rooms** | Room types, prices, amenities for each hotel |
| **bookings** | Reservation records with dates and status |
| **reviews** | Guest reviews and ratings |
| **loyalty_transactions** | Track points earned/redeemed |
| **payments** | Payment records and transactions |
| **room_availability** | Room availability for date ranges |

---

## 🔑 DEFAULT CREDENTIALS

**MySQL Default (XAMPP/WAMP/MAMP):**
```
Host: localhost
User: root
Password: (empty)
Database: rezhub
Port: 3306
```

To modify, edit: `php/config.php`

---

## 🧪 TESTING ENDPOINTS

Use the setup interface to test:
- **Register**: Create test user
- **Search**: Find hotels in Mumbai
- **Check DB**: Verify database connection

Or use terminal:
```bash
# Search hotels
curl "http://localhost/RezHub-latest/RezHub-latest/php/api/search.php?city=Mumbai"

# Test register
curl -X POST http://localhost/RezHub-latest/RezHub-latest/php/api/register.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","first_name":"Test","last_name":"User"}'
```

---

## ⚠️ TROUBLESHOOTING

### "Cannot connect to database"
→ Check MySQL is running → Verify credentials in config.php → Run db-init.php

### "Table already exists"
→ Normal on re-run → Safe to ignore

### "Hotels not found"
→ Run "Import Hotel Data" from setup page

### "Not authenticated for booking"
→ User must login first

---

## 📖 FOR MORE DETAILS

See: `php/README.md` - Complete API documentation

---

## ✨ NEXT STEPS

1. ✓ Database setup complete
2. ✓ Include `api-helper.js` in your HTML pages
3. ✓ Replace frontend data calls with API.searchHotels()
4. ✓ Update login/register forms to use API.login() & API.register()
5. ✓ Connect booking forms to API.createBooking()

**Your backend is ready to power the frontend! 🎉**
