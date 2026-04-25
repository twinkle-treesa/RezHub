// Loyalty page API integration
document.addEventListener('auth-checked', async () => {
  loadLoyaltyInfo();
});

async function loadLoyaltyInfo() {
  try {
    const user = API.getCurrentUser();
    if (user) {
      renderLoyaltyFromAPI(user);
    } else {
      render();
    }
  } catch (e) {
    console.error('Failed to load loyalty info:', e);
    render();
  }
}

function renderLoyaltyFromAPI(user) {
  const loyaltyPoints = user.loyalty_points || 0;
  const loyaltyTier = user.loyalty_tier || 'Bronze';
  
  document.getElementById('loyaltyContent').innerHTML += `
    <div style="background:var(--navy);border-radius:16px;padding:40px;text-align:center;color:#fff;margin-bottom:36px;">
      <h2 style="color:#fff;margin-bottom:8px;">Hello${user.first_name ? ', ' + user.first_name : ''}!</h2>
      <p style="color:rgba(255,255,255,0.6);margin-bottom:20px;">Your current loyalty status</p>
      <div style="font-family:'Cormorant Garamond',serif;font-size:3rem;color:var(--gold);margin:20px 0;">
        ${loyaltyPoints.toLocaleString()}
      </div>
      <div style="font-size:1.2rem;color:rgba(255,255,255,0.9);">${loyaltyTier} Member</div>
    </div>`;
}
