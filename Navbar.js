// CampusBite Navbar & Mobile Navigation Component

function renderPortfolioBanner() {
  return `
    <div class="portfolio-banner">
      <div class="portfolio-banner-content">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="portfolio-badge">CAPSTONE SHOWCASE</span>
          <span style="font-weight: 500;">CampusBite — Student Food Delivery Web App Prototype</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="portfolio-action-btn" onclick="appStore.setShowcaseOpen(true)">
            <span>📌 Project Docs & Architecture</span>
          </button>
          <button class="portfolio-action-btn" onclick="appStore.switchRole(appStore.state.currentRole === 'student' ? 'admin' : (appStore.state.currentRole === 'admin' ? 'vendor' : 'student'))">
            <span>🔄 Role: ${appStore.state.currentRole.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderNavbar() {
  const cartCount = appStore.getCartCount();
  const favCount = appStore.state.favorites.size;
  const currentView = appStore.state.currentView;
  const user = appStore.state.currentUser;

  return `
    ${renderPortfolioBanner()}
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo -->
        <div class="nav-brand" onclick="appStore.setView('home')">
          <div class="brand-icon">🍔</div>
          <div class="brand-text">
            <h1>Campus<span>Bite</span></h1>
            <span class="brand-tagline">Healthy Meals. Happy Students.</span>
          </div>
        </div>

        <!-- Desktop Links -->
        <ul class="nav-links">
          <li class="nav-item ${currentView === 'home' ? 'active' : ''}" onclick="appStore.setView('home')">Home</li>
          <li class="nav-item ${currentView === 'menu' ? 'active' : ''}" onclick="appStore.setView('menu')">Menu</li>
          <li class="nav-item ${currentView === 'restaurants' ? 'active' : ''}" onclick="appStore.setView('restaurants')">Campus Outlets</li>
          <li class="nav-item ${currentView === 'offers' ? 'active' : ''}" onclick="appStore.setView('offers')">Student Deals 🏷️</li>
          <li class="nav-item ${currentView === 'group' ? 'active' : ''}" onclick="appStore.setGroupOrderOpen(true)">Group Order 👥</li>
          <li class="nav-item ${currentView === 'about' ? 'active' : ''}" onclick="appStore.setView('about')">About</li>
          <li class="nav-item ${currentView === 'contact' ? 'active' : ''}" onclick="appStore.setView('contact')">Contact</li>
          ${appStore.state.currentRole === 'admin' ? `<li class="nav-item ${currentView === 'admin' ? 'active' : ''}" style="color: #7C3AED; font-weight:700;" onclick="appStore.setView('admin')">Admin Panel ⚙️</li>` : ''}
          ${appStore.state.currentRole === 'vendor' ? `<li class="nav-item ${currentView === 'vendor' ? 'active' : ''}" style="color: #059669; font-weight:700;" onclick="appStore.setView('vendor')">Vendor Kitchen 👨‍🍳</li>` : ''}
        </ul>

        <!-- Action Buttons -->
        <div class="nav-actions">
          <!-- Search trigger -->
          <button class="icon-btn" title="Search Food" onclick="focusSearchInput()">
            <span>🔍</span>
          </button>

          <!-- Favorites -->
          <button class="icon-btn" title="Saved Favorites" onclick="appStore.setView('profile', { tab: 'favorites' })">
            <span>❤️</span>
            ${favCount > 0 ? `<span class="badge-count">${favCount}</span>` : ''}
          </button>

          <!-- Cart Drawer Button -->
          <button class="icon-btn" title="Cart" onclick="appStore.setCartOpen(true)">
            <span>🛒</span>
            ${cartCount > 0 ? `<span class="badge-count">${cartCount}</span>` : ''}
          </button>

          <!-- User Profile / Auth -->
          <button class="btn-outline" style="padding: 7px 14px;" onclick="handleUserBtnClick()">
            <span>👤</span>
            <span style="max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${user.name.split(' ')[0]}
            </span>
          </button>

          <!-- Primary CTA -->
          <button class="btn-primary" onclick="appStore.setView('menu')">
            <span>Order Now</span>
            <span>⚡</span>
          </button>

          <!-- Mobile Hamburger -->
          <button class="hamburger-btn" onclick="toggleMobileNav()">
            ☰
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <div class="mobile-nav-overlay" id="mobile-nav-overlay" onclick="toggleMobileNav()"></div>
    <div class="mobile-nav-drawer" id="mobile-nav-drawer">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E5E7EB; padding-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.5rem;">🍔</span>
          <h3 style="font-weight: 800; color: #1F2937;">CampusBite</h3>
        </div>
        <button style="border: none; background: none; font-size: 1.5rem; cursor: pointer;" onclick="toggleMobileNav()">✕</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
        <a class="nav-item" onclick="appStore.setView('home'); toggleMobileNav();">🏠 Home</a>
        <a class="nav-item" onclick="appStore.setView('menu'); toggleMobileNav();">🍽️ Explore Menu</a>
        <a class="nav-item" onclick="appStore.setView('restaurants'); toggleMobileNav();">🏪 Campus Outlets</a>
        <a class="nav-item" onclick="appStore.setView('offers'); toggleMobileNav();">🏷️ Student Offers</a>
        <a class="nav-item" onclick="appStore.setGroupOrderOpen(true); toggleMobileNav();">👥 Group Ordering</a>
        <a class="nav-item" onclick="appStore.setView('profile'); toggleMobileNav();">👤 My Profile & Orders</a>
        <a class="nav-item" onclick="appStore.setView('about'); toggleMobileNav();">ℹ️ About CampusBite</a>
        <a class="nav-item" onclick="appStore.setView('contact'); toggleMobileNav();">📞 Contact</a>
        <a class="nav-item" onclick="appStore.setShowcaseOpen(true); toggleMobileNav();" style="color: #7C3AED; font-weight:700;">📌 Portfolio Capstone Docs</a>
      </div>

      <div style="margin-top: auto; padding-top: 20px; border-top: 1px solid #E5E7EB;">
        <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="appStore.setView('menu'); toggleMobileNav();">
          Order Now ⚡
        </button>
      </div>
    </div>

    <!-- Mobile Bottom Navigation Bar -->
    <div class="mobile-bottom-nav">
      <div class="mobile-bottom-item ${currentView === 'home' ? 'active' : ''}" onclick="appStore.setView('home')">
        <span class="icon">🏠</span>
        <span>Home</span>
      </div>
      <div class="mobile-bottom-item ${currentView === 'menu' ? 'active' : ''}" onclick="appStore.setView('menu')">
        <span class="icon">🍽️</span>
        <span>Menu</span>
      </div>
      <div class="mobile-bottom-item" onclick="appStore.setCartOpen(true)">
        <span class="icon">🛒</span>
        <span>Cart ${cartCount > 0 ? `(${cartCount})` : ''}</span>
      </div>
      <div class="mobile-bottom-item ${currentView === 'profile' ? 'active' : ''}" onclick="appStore.setView('profile')">
        <span class="icon">📦</span>
        <span>Orders</span>
      </div>
      <div class="mobile-bottom-item" onclick="appStore.setChatOpen(true)">
        <span class="icon">🤖</span>
        <span>AI Bot</span>
      </div>
    </div>
  `;
}

function handleUserBtnClick() {
  appStore.setView('profile');
}

function focusSearchInput() {
  appStore.setView('menu');
  setTimeout(() => {
    const input = document.getElementById('main-food-search');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}

function toggleMobileNav() {
  const overlay = document.getElementById('mobile-nav-overlay');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (overlay && drawer) {
    overlay.classList.toggle('open');
    drawer.classList.toggle('open');
  }
}
