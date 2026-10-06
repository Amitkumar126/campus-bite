// CampusBite Master Application Orchestrator & Router

function renderApp() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const currentView = appStore.state.currentView;
  let viewContent = '';

  switch (currentView) {
    case 'home':
      viewContent = `
        ${renderHero()}
        ${renderSearchBar()}
        ${renderCategories()}
        ${renderFoodGrid(getFilteredFoods(), "Popular Near You 🔥")}
        ${renderRestaurantsGrid()}
        ${renderStudentPerksSection()}
      `;
      break;

    case 'menu':
      viewContent = `
        <div style="padding-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800; color: #1F2937; margin-bottom: 6px;">Campus Food Menu</h1>
          <p style="color: #6B7280; font-size: 0.95rem; margin-bottom: 20px;">Discover meals, snacks, and beverages across all campus outlets</p>
          ${renderSearchBar()}
          ${renderCategories()}
          ${renderFoodGrid(getFilteredFoods(), "All Available Dishes")}
        </div>
      `;
      break;

    case 'restaurants':
      viewContent = `
        <div style="padding-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800; color: #1F2937; margin-bottom: 6px;">Campus Food Outlets</h1>
          <p style="color: #6B7280; font-size: 0.95rem; margin-bottom: 24px;">Explore student cafes, mess canteens, and bakeries inside the university</p>
          ${renderRestaurantsGrid()}
        </div>
      `;
      break;

    case 'restaurant-detail':
      viewContent = renderRestaurantDetailView(appStore.state.activeRestaurantDetailId);
      break;

    case 'offers':
      viewContent = renderOffersView();
      break;

    case 'about':
      viewContent = renderAboutView();
      break;

    case 'contact':
      viewContent = renderContactView();
      break;

    case 'profile':
      viewContent = renderProfileView();
      break;

    case 'admin':
      viewContent = renderAdminDashboard();
      break;

    case 'vendor':
      viewContent = renderVendorDashboard();
      break;

    default:
      viewContent = renderHero();
  }

  // Compose Full Layout
  root.innerHTML = `
    <!-- Sticky Navigation -->
    ${renderNavbar()}

    <!-- Main Content Container -->
    <main class="main-wrapper">
      ${viewContent}
    </main>

    <!-- Global Modals & Drawers -->
    ${renderFoodModal()}
    ${renderCartDrawer()}
    ${renderCheckoutModal()}
    ${renderOrderTrackerModal()}
    ${renderGroupOrderModal()}
    ${renderShowcaseModal()}
    ${renderAuthModal()}

    <!-- Floating AI Assistant -->
    ${renderFloatingChatbot()}

    <!-- Professional Footer -->
    ${renderFooter()}

    <!-- Toast Notification Host -->
    <div id="toast-container"></div>
  `;
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Subscribe reactive store
  appStore.subscribe((state, event, payload) => {
    renderApp();
  });

  // Initial render
  renderApp();

  // Welcome toast
  setTimeout(() => {
    appStore.showToast('Welcome to CampusBite! 🍔 Order food or check out the portfolio docs above.', 'info');
  }, 1000);
});
