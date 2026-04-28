// =============================================================================
//  RezHub — PHP Backend API Client
//  Include this BEFORE data.js so frontend can use RezAPI.* methods.
//  All methods return Promise<{success, data, message}>.
// =============================================================================

const RezAPI = (() => {

  // Base URL auto-detects whether we're at /RezHub-latest/ or /
  const BASE = (() => {
    const parts = window.location.pathname.split('/');
    const idx   = parts.indexOf('RezHub-latest');
    const root  = idx !== -1 ? '/' + parts.slice(0, idx + 1).join('/').replace(/^\//, '') : '';
    return root + '/api';
  })();

  async function req(path, options = {}) {
    try {
      const res = await fetch(BASE + path, {
        credentials: 'include',   // send session cookie
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });
      const json = await res.json();
      return json;
    } catch (err) {
      return { success: false, message: 'Network error: ' + err.message };
    }
  }

  const get  = (path)        => req(path);
  const post = (path, body)  => req(path, { method: 'POST', body: JSON.stringify(body) });

  // ── Auth ──────────────────────────────────────────────────────────────────
  const Auth = {
    register:   (data)       => post('/auth.php?action=register', data),
    login:      (email, pwd) => post('/auth.php?action=login',    { email, password: pwd }),
    adminLogin: (user, pwd)  => post('/auth.php?action=admin_login', { username: user, password: pwd }),
    logout:     ()           => post('/auth.php?action=logout',   {}),
    me:         ()           => get('/auth.php?action=me'),
  };

  // ── Hotels ────────────────────────────────────────────────────────────────
  const Hotels = {
    list:   (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return get('/hotels.php' + (qs ? '?' + qs : ''));
    },
    detail: (hotelId)     => get(`/hotels.php?id=${hotelId}`),
    cities: ()            => get('/hotels.php?action=cities'),
    states: ()            => get('/hotels.php?action=states'),
  };

  // ── Bookings ──────────────────────────────────────────────────────────────
  const Bookings = {
    create: (data)        => post('/bookings.php?action=create',  data),
    mine:   ()            => get('/bookings.php?action=mine'),
    detail: (id)          => get(`/bookings.php?action=detail&id=${id}`),
    cancel: (bookingId)   => post('/bookings.php?action=cancel',  { booking_id: bookingId }),
  };

  // ── Reviews ───────────────────────────────────────────────────────────────
  const Reviews = {
    submit: (data)        => post('/reviews.php?action=submit',   data),
    hotel:  (hotelId)     => get(`/reviews.php?action=hotel&id=${hotelId}`),
    mine:   ()            => get('/reviews.php?action=mine'),
  };

  // ── User / Loyalty ────────────────────────────────────────────────────────
  const User = {
    profile:        ()     => get('/user.php?action=profile'),
    updateProfile:  (data) => post('/user.php?action=update_profile',  data),
    changePassword: (data) => post('/user.php?action=change_password', data),
    loyalty:        ()     => get('/user.php?action=loyalty'),
    tiers:          ()     => get('/user.php?action=tiers'),
    dashboard:      ()     => get('/user.php?action=dashboard'),
  };

  // ── Admin ─────────────────────────────────────────────────────────────────
  const Admin = {
    stats:         ()      => get('/admin.php?action=stats'),
    hotels:        ()      => get('/admin.php?action=hotels'),
    hotelUpdate:   (data)  => post('/admin.php?action=hotel_update',    data),
    users:         ()      => get('/admin.php?action=users'),
    toggleUser:    (id)    => post('/admin.php?action=toggle_user',     { user_id: id }),
    bookings:      (p={})  => {
      const qs = new URLSearchParams(p).toString();
      return get('/admin.php?action=bookings' + (qs ? '&' + qs : ''));
    },
    bookingStatus: (data)  => post('/admin.php?action=booking_status',  data),
    reviews:       ()      => get('/admin.php?action=reviews'),
  };

  // ── Session helpers (replaces localStorage sb_user / sb_admin) ────────────
  // These keep a small in-memory cache so you don't hit the server on every call.
  let _userCache  = null;
  let _adminCache = null;

  const Session = {
    /** Returns cached user or fetches from PHP session. */
    getUser: async () => {
      if (_userCache !== null) return _userCache;
      const r = await Auth.me();
      _userCache = r.success ? r.data : null;
      return _userCache;
    },
    setUser:   (u)  => { _userCache  = u; },
    clearUser: ()   => { _userCache  = null; },

    isAdmin: () => _adminCache !== null,
    setAdmin:(a)=> { _adminCache = a; },
    clearAll:() => { _userCache = null; _adminCache = null; },
  };

  return { Auth, Hotels, Bookings, Reviews, User, Admin, Session };
})();

// =============================================================================
//  Session is fully managed via PHP sessions + in-memory RezAPI.Session cache.
//  No localStorage fallbacks for user or booking data.
// =============================================================================