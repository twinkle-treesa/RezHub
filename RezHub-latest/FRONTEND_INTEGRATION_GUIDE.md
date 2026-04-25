# Frontend Integration Guide - API Helper Usage

## 📋 Overview

The `js/api-helper.js` library provides a simple interface to communicate with your PHP backend. This guide shows how to integrate each frontend page with the database.

---

## 🔌 All Frontend Pages - API Helper Already Included

✅ All pages now include: `<script src="../js/api-helper.js" defer></script>`

The following pages have been updated:
- ✅ `index.html` - Search form integration
- ✅ `pages/login.html` - Login & Register with API
- ✅ `pages/search.html` - Hotel search from API
- ✅ `pages/booking.html` - Script included
- ✅ `pages/mybookings.html` - Script included
- ✅ `pages/review.html` - Script included
- ✅ `pages/hotel.html` - Script included
- ✅ `pages/confirmation.html` - Script included
- ✅ `pages/loyalty.html` - Script included
- ✅ `pages/admin.html` - Script included

---

## 📝 Code Examples by Page

### 1. LOGIN PAGE (`pages/login.html`)

**Status**: ✅ **FULLY INTEGRATED**

Already implemented with:
- ✅ User registration via `API.register()`
- ✅ User login via `API.login()`
- ✅ Form validation
- ✅ Error handling
- ✅ Auto-redirect on success

**Update the text constraint if needed:**
```javascript
// Lines 338-340 in login.html
if(password.length < 6) { // Changed from 8 to 6
  showFieldError('passwordInput','passwordErr','Password must be at least 6 characters.'); 
  valid=false; 
}
```

---

### 2. SEARCH PAGE (`pages/search.html`)

**Status**: ✅ **FULLY INTEGRATED**

Already implemented with:
- ✅ API hotel search via `API.searchHotels()`
- ✅ Filter integration (price, rating, state, stars)
- ✅ Sorting functionality
- ✅ Dynamic hotel display
- ✅ Fallback to data.js if API fails

**Triggers:**
- Loads automatically when page loads
- Reloads when any filter changes

---

### 3. HOTEL DETAIL PAGE (`pages/hotel.html`)

**Status**: Ready for Implementation

**What needs to be done:**
1. Load hotel data from API using hotel ID from URL
2. Display room options fetched from API
3. Show real-time pricing and availability

**Code template to add:**
```javascript
document.addEventListener('auth-checked', async () => {
  const params = new URLSearchParams(window.location.search);
  const hotelId = params.get('id');
  
  if (!hotelId) return;
  
  try {
    // Search with hotel ID to get details
    const result = await API.searchHotels({ });
    const hotel = result.hotels.find(h => h.id === hotelId);
    
    if (hotel) {
      // Display hotel data
      displayHotel(hotel);
    }
  } catch (error) {
    console.error('Failed to load hotel:', error);
  }
});
```

---

### 4. BOOKING PAGE (`pages/booking.html`)

**Status**: Ready for Implementation

**What needs to be done:**
1. Get booking details from URL params/session
2. Verify user is logged in
3. Submit booking via `API.createBooking()`
4. Show confirmation with booking code

**Code template:**
```javascript
document.addEventListener('auth-checked', async () => {
  if (!API.isLoggedIn()) {
    window.location.href = '/pages/login.html?redirect=' + encodeURIComponent(window.location.href);
    return;
  }
  
  const params = new URLSearchParams(window.location.search);
  const hotelId = params.get('hotel_id');
  const roomId = params.get('room_id');
  const checkIn = params.get('checkIn');
  const checkOut = params.get('checkOut');
  const guests = params.get('guests');
  const totalPrice = params.get('total_price');
  
  // Display booking summary
  document.querySelector('[data-hotel]').textContent = hotelId;
  // ... display other details
  
  // Handle form submission
  document.getElementById('confirmBooking').addEventListener('click', async () => {
    try {
      const result = await API.createBooking({
        hotel_id: hotelId,
        room_id: roomId,
        check_in: checkIn,
        check_out: checkOut,
        guests: guests,
        total_price: totalPrice,
        special_requests: document.getElementById('specialRequests').value
      });
      
      if (result.success) {
        // Show booking confirmation
        document.getElementById('bookingCode').textContent = result.booking.booking_code;
        document.getElementById('confirmationPanel').style.display = 'block';
      }
    } catch (error) {
      alert('Booking failed: ' + error.message);
    }
  });
});
```

---

### 5. MY BOOKINGS PAGE (`pages/mybookings.html`)

**Status**: Ready for Implementation

**What needs to be done:**
1. Check if user is logged in
2. Fetch user's bookings via `API.getBookings()`
3. Display bookings with status and details
4. Allow filtering by status

**Code template:**
```javascript
document.addEventListener('auth-checked', async () => {
  if (!API.isLoggedIn()) {
    window.location.href = '/pages/login.html?redirect=' + encodeURIComponent(window.location.href);
    return;
  }
  
  try {
    const result = await API.getBookings();
    
    if (result.success && result.bookings.length > 0) {
      displayBookings(result.bookings);
    } else {
      document.getElementById('bookingsList').innerHTML = `
        <div class="empty-state">
          <p>No bookings yet. <a href="search.html">Search hotels</a></p>
        </div>`;
    }
  } catch (error) {
    console.error('Failed to load bookings:', error);
  }
});

function displayBookings(bookings) {
  document.getElementById('bookingsList').innerHTML = bookings.map(booking => `
    <div class="booking-card">
      <h3>${booking.hotel_name}</h3>
      <p>Booking Code: ${booking.booking_code}</p>
      <p>Check-in: ${API.formatDate(booking.check_in)}</p>
      <p>Check-out: ${API.formatDate(booking.check_out)}</p>
      <p>Status: <span class="status-${booking.status}">${booking.status}</span></p>
      <p>Total: ${API.formatPrice(booking.total_price)}</p>
      <div class="actions">
        <a href="review.html?booking_id=${booking.id}">Write Review</a>
      </div>
    </div>`).join('');
}
```

---

### 6. REVIEW PAGE (`pages/review.html`)

**Status**: Ready for Implementation

**What needs to be done:**
1. Get booking ID from URL
2. Load booking details
3. Allow user to submit review via `API.submitReview()`
4. Show success message

**Code template:**
```javascript
document.addEventListener('auth-checked', async () => {
  if (!API.isLoggedIn()) {
    window.location.href = '/pages/login.html?redirect=' + encodeURIComponent(window.location.href);
    return;
  }
  
  const params = new URLSearchParams(window.location.search);
  const bookingId = params.get('booking_id');
  const hotelId = params.get('hotel_id');
  
  // Handle review form submission
  document.getElementById('submitReview').addEventListener('click', async () => {
    try {
      const result = await API.submitReview({
        hotel_id: hotelId,
        booking_id: bookingId,
        rating: document.getElementById('rating').value,
        title: document.getElementById('title').value,
        comment: document.getElementById('comment').value,
        cleanliness: document.getElementById('cleanliness').value,
        comfort: document.getElementById('comfort').value,
        service: document.getElementById('service').value,
        value: document.getElementById('value').value
      });
      
      if (result.success) {
        document.getElementById('successMessage').style.display = 'block';
        setTimeout(() => {
          window.location.href = 'mybookings.html';
        }, 2000);
      }
    } catch (error) {
      alert('Failed to submit review: ' + error.message);
    }
  });
});
```

---

### 7. ADMIN PAGE (`pages/admin.html`)

**Status**: Can use API for data

**Potential integrations:**
- Fetch statistics from database
- Display all bookings (with auth)
- Manage content
- View user analytics

---

### 8. LOYALTY PAGE (`pages/loyalty.html`)

**Status**: Can display user loyalty info

**Code template:**
```javascript
document.addEventListener('auth-checked', async () => {
  const user = API.getCurrentUser();
  
  if (user) {
    document.getElementById('loyaltyPoints').textContent = user.loyalty_points || 0;
    document.getElementById('loyaltyTier').textContent = user.loyalty_tier || 'Bronze';
  }
});
```

---

### 9. CONFIRMATION PAGE (`pages/confirmation.html`)

**Status**: Can display booking confirmation

**Shows:** Booking code, hotel details, dates, pricing (similar to booking.html redirect)

---

## 🎯 API Available Functions

All functions return Promises and should be used with `async/await`.

```javascript
// Available after API initialization
API.searchHotels(filters)        // Search hotels
API.register(userData)            // Register user
API.login(email, password)        // Login user
API.logout()                      // Logout user
API.isLoggedIn()                  // Check login status
API.getCurrentUser()              // Get current user data
API.createBooking(bookingData)    // Create booking
API.getBookings(status)           // Get user bookings
API.submitReview(reviewData)      // Submit review

// Utility functions
API.formatPrice(amount)           // Format as INR currency
API.formatDate(dateStr)           // Format date nicely
API.calculateNights(checkIn, checkOut) // Calculate nights
API.notify(message, type)         // Show notification
```

---

## 🔐 Authentication Flow

```javascript
// On every page:
document.addEventListener('auth-checked', () => {
  // This fires after API checks authentication
  if (API.isLoggedIn()) {
    // User is logged in, show user-specific content
  } else {
    // User is not logged in, show login prompt or redirect
  }
});

// To check just on demand:
const user = API.getCurrentUser();
if (!user) {
  // Redirect to login
  window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
}
```

---

## ⚠️ Common Patterns

### Getting URL Parameters
```javascript
const params = new URLSearchParams(window.location.search);
const hotelId = params.get('id');
const checkIn = params.get('checkIn');
```

### Protecting Pages - Require Login
```javascript
document.addEventListener('auth-checked', () => {
  if (!API.isLoggedIn()) {
    const redirectUrl = encodeURIComponent(window.location.href);
    window.location.href = `../pages/login.html?redirect=${redirectUrl}`;
  }
});
```

### Error Handling
```javascript
try {
  const result = await API.searchHotels({ city: 'Mumbai' });
  if (result.success) {
    // Use result.hotels
  } else {
    alert(result.error);
  }
} catch (error) {
  console.error('API Error:', error);
  alert('An error occurred: ' + error.message);
}
```

### Loading States
```javascript
const btn = document.getElementById('submitBtn');
btn.disabled = true;
btn.innerHTML = '<span class="spinner">⟳</span> Loading...';

try {
  // API call
} finally {
  btn.disabled = false;
  btn.textContent = 'Submit';
}
```

---

## 📊 Data Formats

### Hotel Object (from API)
```javascript
{
  id: "mh1",
  name: "The Oberoi Mumbai",
  city: "Mumbai",
  state: "Maharashtra",
  stars: 5,
  rating: 4.9,
  reviews_count: 3201,
  base_price: 28000,
  description: "...",
  amenities: [...],  // Array or JSON
  image_url: "...",
  rooms: [
    {
      id: "mh1-1",
      name: "Premier Room",
      base_price: 28000,
      max_guests: 2,
      amenities: [...]
    }
  ]
}
```

### Booking Object (for creating)
```javascript
{
  hotel_id: "mh1",
  room_id: "mh1-1",
  check_in: "2026-03-20",     // YYYY-MM-DD
  check_out: "2026-03-25",    // YYYY-MM-DD
  guests: 2,
  total_price: 140000,
  special_requests: "High floor"
}
```

### User Object (from API)
```javascript
{
  id: 1,
  email: "user@example.com",
  first_name: "John",
  last_name: "Doe",
  loyalty_points: 500,
  loyalty_tier: "Silver",
  created_at: "2026-03-01T10:00:00Z"
}
```

---

## 🧪 Quick Testing

Open browser DevTools Console and try:

```javascript
// Check initialization
console.log(API.isLoggedIn());

// Test search
API.searchHotels({ city: 'Mumbai', guests: 2 })
  .then(r => console.log(r));

// Test current user
API.getCurrentUser();
```

---

## 📱 Next Steps

1. **Test backend is running**: Visit `http://localhost/RezHub-latest/RezHub-latest/php/setup.html`
2. **Database is initialized**: Verify tables exist and hotel data is imported
3. **Use the integration templates** above for pages that need updates
4. **Test each page** after making changes
5. **Check browser console** for errors during development

---

## 🆘 Troubleshooting

- **"API is not defined"** → Ensure `<script src="../js/api-helper.js" defer></script>` is added
- **CORS errors** → API must be on same origin or CORS must be enabled in config.php
- **404 on API calls** → Check that php/api/ files exist and paths are correct
- **User not authenticated** → Make sure login is working before accessing protected pages

---

## ✅ Integration Status Checklist

| Page | Integration | Notes |
|------|-------------|-------|
| index.html | ✅ Search form setup | Working |
| login.html | ✅ Full auth integration | Register & Login working |
| search.html | ✅ API hotel search | Dynamic filtering working |
| hotel.html | 🟠 Template ready | Need to implement |
| booking.html | 🟠 Template ready | Need to implement |
| mybookings.html | 🟠 Template ready | Need to implement |
| review.html | 🟠 Template ready | Need to implement |
| confirmation.html | 🟠 Template ready | Need to implement |
| loyalty.html | 🟠 Can display data | Need to implement |
| admin.html | 🟠 Can use API | Need to implement |

---

**Ready to integrate! Use the templates above to complete each page. 🚀**
