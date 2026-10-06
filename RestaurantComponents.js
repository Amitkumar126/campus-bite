// CampusBite Restaurant Outlets & Restaurant Detail View

function renderRestaurantCard(rest) {
  return `
    <div class="restaurant-card" onclick="appStore.setView('restaurant-detail', { restaurantId: '${rest.id}' })">
      <div class="restaurant-cover">
        <img src="${rest.image}" alt="${escapeHtml(rest.name)}" loading="lazy">
        <div class="outlet-badge">${rest.badge || 'Campus Verified'}</div>
        <div class="outlet-logo-bubble">${rest.logo || '🏪'}</div>
      </div>

      <div class="restaurant-info">
        <div class="restaurant-header-row">
          <h3 class="restaurant-name">${escapeHtml(rest.name)}</h3>
          <div class="meta-rating">
            <span>★</span>
            <span>${rest.rating}</span>
          </div>
        </div>

        <p class="restaurant-tags">${rest.categories.join(' • ')}</p>
        <p style="font-size: 0.8rem; color: #6B7280; margin-bottom: 12px; line-height: 1.4;">${escapeHtml(rest.tagline)}</p>

        <div class="restaurant-meta-row">
          <div>⏱️ <strong>${rest.deliveryTime}</strong></div>
          <div>📍 <strong>${rest.distance}</strong></div>
          <div style="margin-left: auto;">
            <button class="btn-outline" style="padding: 4px 12px; font-size: 0.78rem; font-weight: 700;">
              View Menu →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderRestaurantsGrid() {
  const restaurants = appStore.state.restaurants;

  return `
    <section style="margin-bottom: 50px;">
      <div class="section-header">
        <div>
          <h2 class="section-title">Popular Campus Outlets</h2>
          <p class="section-subtitle">Food joints and canteens operating inside the campus</p>
        </div>
      </div>

      <div class="restaurants-grid">
        ${restaurants.map(r => renderRestaurantCard(r)).join('')}
      </div>
    </section>
  `;
}

// Dedicated Restaurant Page
function renderRestaurantDetailView(restaurantId) {
  const rest = appStore.state.restaurants.find(r => r.id === restaurantId) || appStore.state.restaurants[0];
  const allRestaurantFoods = window.MOCK_DATA.foods.filter(f => f.restaurantId === rest.id);

  // In-restaurant category tabs
  const activeTab = window.restaurantActiveTab || 'all';

  let filtered = allRestaurantFoods;
  if (activeTab === 'veg') filtered = allRestaurantFoods.filter(f => f.isVeg);
  else if (activeTab === 'bestseller') filtered = allRestaurantFoods.filter(f => f.isBestseller);
  else if (activeTab !== 'all') filtered = allRestaurantFoods.filter(f => f.category === activeTab);

  return `
    <div class="restaurant-detail-page animate-fade-in" style="margin-bottom: 60px;">
      <!-- Breadcrumb -->
      <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;">
        <span style="cursor: pointer;" onclick="appStore.setView('home')">Home</span>
        <span>›</span>
        <span style="cursor: pointer;" onclick="appStore.setView('restaurants')">Campus Outlets</span>
        <span>›</span>
        <strong style="color: #1F2937;">${escapeHtml(rest.name)}</strong>
      </div>

      <!-- Restaurant Header Banner -->
      <div style="background: white; border-radius: var(--radius-xl); border: 1px solid var(--border-color); overflow: hidden; box-shadow: var(--shadow-sm); margin-bottom: 32px;">
        <div style="height: 240px; position: relative;">
          <img src="${rest.image}" alt="${escapeHtml(rest.name)}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%);"></div>
          
          <div style="position: absolute; bottom: 20px; left: 24px; color: white;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="font-size: 2rem; background: white; padding: 4px 8px; border-radius: 12px; box-shadow: var(--shadow-sm);">${rest.logo}</span>
              <div>
                <h1 style="font-size: 1.8rem; font-weight: 800; line-height: 1.2;">${escapeHtml(rest.name)}</h1>
                <p style="font-size: 0.88rem; opacity: 0.9;">${rest.categories.join(' • ')}</p>
              </div>
            </div>
          </div>

          <div style="position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.6); backdrop-filter: blur(6px); color: white; padding: 6px 14px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600;">
            ${rest.isOpen ? '🟢 Open Now • Closes 11:30 PM' : '🔴 Currently Closed'}
          </div>
        </div>

        <div style="padding: 24px; display: grid; grid-template-columns: 2fr 1fr; gap: 24px; align-items: center;">
          <div>
            <p style="color: #4B5563; font-size: 0.95rem; line-height: 1.6; margin-bottom: 14px;">
              ${escapeHtml(rest.description)}
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.85rem; color: #374151;">
              <div>📍 <strong>Location:</strong> ${rest.location}</div>
              <div>⏱️ <strong>Delivery / Pickup:</strong> ${rest.deliveryTime}</div>
              <div>💰 <strong>Min Order:</strong> ₹${rest.minOrder}</div>
            </div>
          </div>

          <div style="background: #FDFBF7; padding: 16px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: #1F2937; margin-bottom: 2px;">
              ★ ${rest.rating}
            </div>
            <div style="font-size: 0.8rem; color: #6B7280; margin-bottom: 10px;">
              Based on ${rest.reviewsCount}+ verified student orders
            </div>
            <div style="display: inline-block; background: #ECFDF5; color: #059669; font-weight: 700; font-size: 0.75rem; padding: 4px 10px; border-radius: var(--radius-full);">
              ✓ Campus Hygienic Certified
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Navigation Tabs -->
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px;">
          <button class="pill-btn ${activeTab === 'all' ? 'active' : ''}" onclick="window.restaurantActiveTab = 'all'; renderApp();">
            All Items (${allRestaurantFoods.length})
          </button>
          <button class="pill-btn ${activeTab === 'bestseller' ? 'active' : ''}" onclick="window.restaurantActiveTab = 'bestseller'; renderApp();">
            ⭐ Bestsellers
          </button>
          <button class="pill-btn ${activeTab === 'veg' ? 'active' : ''}" onclick="window.restaurantActiveTab = 'veg'; renderApp();">
            🥬 Pure Veg
          </button>
          <button class="pill-btn ${activeTab === 'beverages' ? 'active' : ''}" onclick="window.restaurantActiveTab = 'beverages'; renderApp();">
            ☕ Beverages
          </button>
          <button class="pill-btn ${activeTab === 'snacks' ? 'active' : ''}" onclick="window.restaurantActiveTab = 'snacks'; renderApp();">
            🍟 Quick Snacks
          </button>
        </div>

        <button class="btn-outline" style="padding: 6px 14px; font-size: 0.85rem;" onclick="appStore.setView('restaurants')">
          ← Back to Outlets
        </button>
      </div>

      <!-- Menu Food Items -->
      <div class="food-grid">
        ${filtered.map(food => renderFoodCard(food)).join('')}
      </div>
    </div>
  `;
}
