/**
 * RezHub API Helper
 * JavaScript functions for communicating with PHP backend
 * 
 * Usage: <script src="js/api-helper.js"></script>
 */

const API = (() => {
    const BASE_URL = '/php/api';
    const STATE = {
        user: null,
        isAuthenticated: false,
        sessionTimeout: 3600000 // 1 hour
    };

    // Initialize - check authentication on page load
    async function init() {
        await checkAuth();
    }

    // ════════════════════════════════════════════════════════════════════════════
    // AUTHENTICATION
    // ════════════════════════════════════════════════════════════════════════════

    /**
     * Register a new user
     * @param {Object} data - {email, password, first_name, last_name, phone}
     * @returns {Promise}
     */
    async function register(data) {
        try {
            const response = await fetch(`${BASE_URL}/register.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                STATE.user = result.user;
                STATE.isAuthenticated = true;
                document.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: result.user, loggedIn: true } }));
            } else {
                throw new Error(result.error || 'Registration failed');
            }

            return result;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    /**
     * Login user
     * @param {string} email
     * @param {string} password
     * @returns {Promise}
     */
    async function login(email, password) {
        try {
            const response = await fetch(`${BASE_URL}/login.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (result.success) {
                STATE.user = result.user;
                STATE.isAuthenticated = true;
                localStorage.setItem('rezhub_user', JSON.stringify(result.user));
                document.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: result.user, loggedIn: true } }));
            } else {
                throw new Error(result.error || 'Login failed');
            }

            return result;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Logout user
     * @returns {Promise}
     */
    async function logout() {
        try {
            const response = await fetch(`${BASE_URL}/logout.php`, {
                method: 'POST',
                credentials: 'include'
            });

            const result = await response.json();

            STATE.user = null;
            STATE.isAuthenticated = false;
            localStorage.removeItem('rezhub_user');
            document.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: null, loggedIn: false } }));

            return result;
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    /**
     * Check if user is authenticated
     * @returns {Promise}
     */
    async function checkAuth() {
        try {
            const response = await fetch(`${BASE_URL}/user.php`, {
                method: 'GET',
                credentials: 'include'
            });

            const result = await response.json();

            if (result.authenticated) {
                STATE.user = result.user;
                STATE.isAuthenticated = true;
                localStorage.setItem('rezhub_user', JSON.stringify(result.user));
            } else {
                STATE.user = null;
                STATE.isAuthenticated = false;
                localStorage.removeItem('rezhub_user');
            }

            document.dispatchEvent(new CustomEvent('auth-checked', { detail: { authenticated: STATE.isAuthenticated, user: STATE.user } }));
            return result;
        } catch (error) {
            console.error('Auth check error:', error);
            return { authenticated: false, user: null };
        }
    }

    /**
     * Get current user
     * @returns {Object}
     */
    function getCurrentUser() {
        return STATE.user;
    }

    /**
     * Check if user is logged in
     * @returns {boolean}
     */
    function isLoggedIn() {
        return STATE.isAuthenticated;
    }

    // ════════════════════════════════════════════════════════════════════════════
    // HOTELS & SEARCH
    // ════════════════════════════════════════════════════════════════════════════

    /**
     * Search hotels
     * @param {Object} filters - {city, checkIn, checkOut, guests, minPrice, maxPrice, minRating, minStars}
     * @returns {Promise}
     */
    async function searchHotels(filters) {
        try {
            const params = new URLSearchParams();
            
            if (filters.city) params.append('city', filters.city);
            if (filters.checkIn) params.append('checkIn', filters.checkIn);
            if (filters.checkOut) params.append('checkOut', filters.checkOut);
            if (filters.guests) params.append('guests', filters.guests);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.minRating) params.append('minRating', filters.minRating);
            if (filters.minStars) params.append('minStars', filters.minStars);

            const response = await fetch(`${BASE_URL}/search.php?${params}`, {
                method: 'GET',
                credentials: 'include'
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Search failed');
            }

            return result;
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }

    // ════════════════════════════════════════════════════════════════════════════
    // BOOKINGS
    // ════════════════════════════════════════════════════════════════════════════

    /**
     * Create or update booking
     * @param {Object} data - {hotel_id, room_id, check_in, check_out, guests, total_price, special_requests}
     * @returns {Promise}
     */
    async function createBooking(data) {
        try {
            if (!STATE.isAuthenticated) {
                throw new Error('User must be logged in to create booking');
            }

            const response = await fetch(`${BASE_URL}/book.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Booking failed');
            }

            // Update user loyalty points
            if (result.loyalty) {
                STATE.user.loyalty_points = (STATE.user.loyalty_points || 0) + result.loyalty.points_earned;
                localStorage.setItem('rezhub_user', JSON.stringify(STATE.user));
                document.dispatchEvent(new CustomEvent('loyalty-updated', { detail: result.loyalty }));
            }

            return result;
        } catch (error) {
            console.error('Booking error:', error);
            throw error;
        }
    }

    /**
     * Get user's bookings
     * @param {string} status - Optional: filter by status (confirmed, pending, cancelled)
     * @returns {Promise}
     */
    async function getBookings(status = null) {
        try {
            if (!STATE.isAuthenticated) {
                throw new Error('User must be logged in');
            }

            let url = `${BASE_URL}/bookings.php`;
            if (status) {
                url += `?status=${encodeURIComponent(status)}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch bookings');
            }

            return result;
        } catch (error) {
            console.error('Fetch bookings error:', error);
            throw error;
        }
    }

    // ════════════════════════════════════════════════════════════════════════════
    // REVIEWS
    // ════════════════════════════════════════════════════════════════════════════

    /**
     * Submit a review
     * @param {Object} data - {hotel_id, booking_id, rating, title, comment, cleanliness, comfort, service, value}
     * @returns {Promise}
     */
    async function submitReview(data) {
        try {
            if (!STATE.isAuthenticated) {
                throw new Error('User must be logged in to submit review');
            }

            const response = await fetch(`${BASE_URL}/review.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Review submission failed');
            }

            document.dispatchEvent(new CustomEvent('review-submitted', { detail: result }));
            return result;
        } catch (error) {
            console.error('Review error:', error);
            throw error;
        }
    }

    // ════════════════════════════════════════════════════════════════════════════
    // UTILITIES
    // ════════════════════════════════════════════════════════════════════════════

    /**
     * Format price in INR
     * @param {number} amount
     * @returns {string}
     */
    function formatPrice(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    /**
     * Format date for display
     * @param {string} dateStr - YYYY-MM-DD format
     * @returns {string}
     */
    function formatDate(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    /**
     * Calculate stay duration
     * @param {string} checkIn - YYYY-MM-DD
     * @param {string} checkOut - YYYY-MM-DD
     * @returns {number}
     */
    function calculateNights(checkIn, checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }

    /**
     * Generate booking code
     * @returns {string}
     */
    function generateBookingCode() {
        return 'RZ' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }

    /**
     * Show notification
     * @param {string} message
     * @param {string} type - 'success', 'error', 'info', 'warning'
     */
    function notify(message, type = 'info') {
        const event = new CustomEvent('api-notification', {
            detail: { message, type, timestamp: new Date() }
        });
        document.dispatchEvent(event);
        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    // ════════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ════════════════════════════════════════════════════════════════════════════

    return {
        // Authentication
        register,
        login,
        logout,
        checkAuth,
        getCurrentUser,
        isLoggedIn,

        // Hotels
        searchHotels,

        // Bookings
        createBooking,
        getBookings,

        // Reviews
        submitReview,

        // Utilities
        formatPrice,
        formatDate,
        calculateNights,
        generateBookingCode,
        notify,

        // Lifecycle
        init
    };
})();

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => API.init());
} else {
    API.init();
}
