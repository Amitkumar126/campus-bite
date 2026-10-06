// CampusBite Food Discovery, Search, Categories & Food Details Modal

function renderSearchBar() {
  const query = appStore.state.searchQuery;

  return `
    <div class="search-container">
      <div class="search-bar">
        <span style="font-size: 1.25rem; color: #9CA3AF;">🔍</span>
        <input 
          type="text" 
          id="main-food-search"
          class="search-input" 
          placeholder="Search for food, dishes, burgers, maggi, or restaurants..."
          value="${escapeHtml(query)}"
          oninput="appStore.setSearchQuery(this.value)"
        >
        ${query ? `
          <button style="border: none; background: none; font-size: 1.1rem; color: #9CA3AF; cursor: pointer; padding: 4px;" onclick="appStore.setSearchQuery(''); document.getElementById('main-food-search').value = '';">
            ✕
          </button>
        ` : ''}

        <div style="border-left: 1px solid #E5E7EB; padding-left: 12px; display: flex; align-items: center; gap: 8px;">
          <select 
            style="border: none; background: transparent; font-family: inherit; font-size: 0.88rem; font-weight: 600; color: #4B5563; outline: none; cursor: pointer;"
            onchange="appStore.setSortBy(this.value)"
          >
            <option value="popular" ${appStore.state.sortBy === 'popular' ? 'selected' : ''}>Sort: Popular</option>
            <option value="price-asc" ${appStore.state.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
            <option value="price-desc" ${appStore.state.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
            <option value="rating" ${appStore.state.sortBy === 'rating' ? 'selected' : ''}>Top Rated</option>
            <option value="time" ${appStore.state.sortBy === 'time' ? 'selected' : ''}>Fastest Prep</option>
          </select>
        </div>
      </div>
    </div>
  `;
}

function renderCategories() {
  const categories = window.MOCK_DATA.categories;
  const activeId = appStore.state.activeCategory;

  return `
    <section class="categories-section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Food Categories</h2>
          <p class="section-subtitle">Browse through campus student favorites</p>
        </div>
        ${activeId !== 'all' ? `
          <button class="btn-outline" style="padding: 4px 12px; font-size: 0.78rem;" onclick="appStore.setCategory('all')">
            Show All (${window.MOCK_DATA.foods.length})
          </button>
        ` : ''}
      </div>

      <div class="categories-grid">
        ${categories.map(cat => `
          <div 
            class="category-card ${activeId === cat.id ? 'active' : ''}"
            onclick="appStore.setCategory('${cat.id}')"
          >
            <span class="category-icon">${cat.icon}</span>
            <span class="category-name">${cat.name}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function getFilteredFoods() {
  let list = [...window.MOCK_DATA.foods];
  const { searchQuery, activeCategory, vegOnly, under100Only, quickOnly, healthyOnly, selectedRestaurantId, sortBy } = appStore.state;

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.restaurantName.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (activeCategory && activeCategory !== 'all') {
    list = list.filter(item => item.category === activeCategory);
  }

  // Veg filter
  if (vegOnly) {
    list = list.filter(item => item.isVeg);
  }

  // Under ₹100
  if (under100Only) {
    list = list.filter(item => item.price <= 99);
  }

  // Quick (<15m)
  if (quickOnly) {
    list = list.filter(item => item.prepMinutes <= 12);
  }

  // Healthy
  if (healthyOnly) {
    list = list.filter(item => item.isHealthy);
  }

  // Restaurant Filter
  if (selectedRestaurantId) {
    list = list.filter(item => item.restaurantId === selectedRestaurantId);
  }

  // Sort
  if (sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'time') {
    list.sort((a, b) => a.prepMinutes - b.prepMinutes);
  } else {
    // popular
    list.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  return list;
}

function renderFoodCard(food) {
  const isFav = appStore.state.favorites.has(food.id);
  const cartItem = appStore.state.cart.find(c => c.id === food.id);

  return `
    <div class="food-card animate-fade-in" data-food-id="${food.id}">
      <!-- Image wrap -->
      <div class="food-image-wrap" onclick="appStore.openFoodModal(window.MOCK_DATA.foods.find(f => f.id === '${food.id}'))">
        <img 
          src="${food.image}" 
          alt="${escapeHtml(food.name)}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'"
        >
        
        <div class="food-badges-top">
          <div class="${food.isVeg ? 'veg-indicator' : 'nonveg-indicator'}" title="${food.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}"></div>
          
          <button 
            class="fav-btn ${isFav ? 'active' : ''}" 
            title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
            onclick="event.stopPropagation(); appStore.toggleFavorite('${food.id}')"
          >
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        ${food.isBestseller ? `
          <div class="bestseller-badge">★ BESTSELLER</div>
        ` : (food.price <= 99 ? `
          <div class="bestseller-badge" style="color: #6EE7B7;">🏷️ UNDER ₹100</div>
        ` : '')}
      </div>

      <!-- Content -->
      <div class="food-content">
        <div class="food-outlet-meta" onclick="appStore.setView('restaurant-detail', { restaurantId: '${food.restaurantId}' })" style="cursor: pointer;">
          🏪 ${escapeHtml(food.restaurantName)}
        </div>

        <h3 class="food-title" onclick="appStore.openFoodModal(window.MOCK_DATA.foods.find(f => f.id === '${food.id}'))">
          ${escapeHtml(food.name)}
        </h3>

        <p class="food-desc">
          ${escapeHtml(food.description)}
        </p>

        <div class="food-card-meta">
          <div class="meta-rating">
            <span>★</span>
            <span>${food.rating}</span>
            <span style="font-weight: 500; color: #78350F; font-size: 0.72rem;">(${food.reviewsCount})</span>
          </div>

          <div class="meta-time">
            <span>⏱️</span>
            <span>${food.prepTime}</span>
          </div>

          ${food.isHealthy ? `
            <div style="color: #059669; font-weight: 600; font-size: 0.75rem; background: #ECFDF5; padding: 2px 6px; border-radius: 4px;">
              🥗 Healthy
            </div>
          ` : ''}
        </div>

        <div class="food-card-bottom">
          <div class="food-price-wrap">
            <span class="current-price">₹${food.price}</span>
            ${food.originalPrice ? `<span class="original-price">₹${food.originalPrice}</span>` : ''}
          </div>

          ${cartItem ? `
            <div class="qty-counter">
              <button class="qty-btn" onclick="appStore.updateCartQuantity('${cartItem.cartItemId}', -1)">−</button>
              <span class="qty-val">${cartItem.quantity}</span>
              <button class="qty-btn" onclick="appStore.updateCartQuantity('${cartItem.cartItemId}', 1)">+</button>
            </div>
          ` : `
            <button class="add-btn" onclick="appStore.openFoodModal(window.MOCK_DATA.foods.find(f => f.id === '${food.id}'))">
              <span>Add</span>
              <span>+</span>
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

function renderFoodGrid(foods, title = "Popular Near You") {
  if (foods.length === 0) {
    return `
      <div style="text-align: center; padding: 60px 20px; background: white; border-radius: var(--radius-xl); border: 1px dashed var(--border-color); margin: 30px 0;">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">🍽️</div>
        <h3 style="font-size: 1.3rem; font-weight: 700; color: #1F2937; margin-bottom: 6px;">No food found. Try another search.</h3>
        <p style="color: #6B7280; font-size: 0.9rem; max-width: 420px; margin: 0 auto 20px auto;">
          We couldn't find meals matching your current filters. Try searching for "Burger", "Maggi", or reset filters to see all available dishes.
        </p>
        <button class="btn-primary" onclick="appStore.resetFilters()">
          <span>Reset All Filters</span>
          <span>🔄</span>
        </button>
      </div>
    `;
  }

  return `
    <section style="margin-bottom: 50px;">
      <div class="section-header">
        <div>
          <h2 class="section-title">${title}</h2>
          <p class="section-subtitle">Showing ${foods.length} student-approved campus meals</p>
        </div>
      </div>

      <div class="food-grid">
        ${foods.map(f => renderFoodCard(f)).join('')}
      </div>
    </section>
  `;
}

// Food Customization Modal
function renderFoodModal() {
  const food = appStore.state.selectedFoodForModal;
  if (!food) return '';

  const defaultSize = food.customization?.sizes?.[0] ? food.customization.sizes[0].name : 'Standard';

  return `
    <div class="modal-overlay open" id="food-details-modal" onclick="if(event.target === this) appStore.closeFoodModal()">
      <div class="modal-card">
        <button class="modal-close-btn" onclick="appStore.closeFoodModal()">✕</button>

        <img src="${food.image}" alt="${escapeHtml(food.name)}" class="food-modal-img">

        <div class="food-modal-body">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="${food.isVeg ? 'veg-indicator' : 'nonveg-indicator'}"></div>
              <span style="font-size: 0.85rem; font-weight: 700; color: #059669; text-transform: uppercase;">
                ${escapeHtml(food.restaurantName)}
              </span>
            </div>
            
            <div class="meta-rating" style="font-size: 0.85rem;">
              <span>★</span>
              <span>${food.rating}</span>
              <span style="color: #78350F; font-size: 0.75rem;">(${food.reviewsCount} reviews)</span>
            </div>
          </div>

          <h2 style="font-size: 1.5rem; font-weight: 800; color: #1F2937; margin-bottom: 8px;">
            ${escapeHtml(food.name)}
          </h2>

          <p style="color: #4B5563; font-size: 0.92rem; line-height: 1.55; margin-bottom: 16px;">
            ${escapeHtml(food.description)}
          </p>

          <!-- Preparation & Nutrients -->
          <div style="display: flex; gap: 12px; background: #F8F5EE; padding: 12px 16px; border-radius: var(--radius-md); margin-bottom: 20px; font-size: 0.82rem;">
            <div>⏱️ <strong>Prep Time:</strong> ${food.prepTime}</div>
            ${food.nutrition ? `
              <div>🔥 <strong>Calories:</strong> ${food.nutrition.calories}</div>
              <div>💪 <strong>Protein:</strong> ${food.nutrition.protein}</div>
            ` : ''}
          </div>

          <!-- Ingredients tags -->
          ${food.ingredients && food.ingredients.length > 0 ? `
            <div style="margin-bottom: 20px;">
              <h4 style="font-size: 0.85rem; font-weight: 700; color: #374151; margin-bottom: 8px;">Key Ingredients:</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${food.ingredients.map(ing => `
                  <span style="background: #F3F4F6; color: #4B5563; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 500;">
                    ${escapeHtml(ing)}
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Size Customization -->
          ${food.customization?.sizes && food.customization.sizes.length > 0 ? `
            <div class="customization-section">
              <h4 class="customization-title">1. Choose Portion / Size</h4>
              <div id="modal-sizes-group">
                ${food.customization.sizes.map((s, idx) => `
                  <label class="custom-option-pill ${idx === 0 ? 'selected' : ''}" onclick="selectModalSize(this, '${s.name}', ${s.price})">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="radio" name="food_size" value="${s.name}" ${idx === 0 ? 'checked' : ''} style="accent-color: var(--primary);">
                      <span style="font-weight: 600; font-size: 0.9rem;">${s.name}</span>
                    </div>
                    <span style="font-size: 0.85rem; font-weight: 700; color: #F97316;">
                      ${s.price === 0 ? 'Included' : `+₹${s.price}`}
                    </span>
                  </label>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Add-ons Customization -->
          ${food.customization?.addOns && food.customization.addOns.length > 0 ? `
            <div class="customization-section">
              <h4 class="customization-title">2. Add-ons & Extras</h4>
              <div id="modal-addons-group">
                ${food.customization.addOns.map(addon => `
                  <label class="custom-option-pill" onclick="toggleModalAddOn(this, '${addon.name}', ${addon.price})">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="checkbox" name="food_addon" value="${addon.name}" data-price="${addon.price}" style="accent-color: var(--primary);">
                      <span style="font-weight: 500; font-size: 0.88rem;">${addon.name}</span>
                    </div>
                    <span style="font-size: 0.85rem; font-weight: 700; color: #059669;">
                      +₹${addon.price}
                    </span>
                  </label>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Cooking instructions notes -->
          <div style="margin-top: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #374151; margin-bottom: 6px;">
              Special Instructions for the Kitchen (Optional):
            </label>
            <input 
              type="text" 
              id="modal-food-instructions" 
              placeholder="e.g. Less spicy, keep sauce separate, extra tissue"
              style="width: 100%; border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 10px 14px; font-family: inherit; font-size: 0.85rem; outline: none;"
            >
          </div>

          <!-- Bottom Action Bar -->
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: space-between; gap: 16px;">
            <div class="qty-counter">
              <button class="qty-btn" onclick="updateModalQuantity(-1)">−</button>
              <span class="qty-val" id="modal-qty-val">1</span>
              <button class="qty-btn" onclick="updateModalQuantity(1)">+</button>
            </div>

            <button class="btn-primary" style="flex-grow: 1; justify-content: center; padding: 12px 20px;" onclick="confirmAddModalFoodToCart('${food.id}')">
              <span>Add to Cart</span>
              <span id="modal-total-price-btn" style="background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: var(--radius-full); font-size: 0.88rem;">
                ₹${food.price}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Modal helper interaction state
let modalState = {
  qty: 1,
  sizeName: null,
  sizePrice: 0,
  selectedAddOns: []
};

function selectModalSize(el, name, price) {
  modalState.sizeName = name;
  modalState.sizePrice = price;

  const group = document.getElementById('modal-sizes-group');
  if (group) {
    group.querySelectorAll('.custom-option-pill').forEach(pill => pill.classList.remove('selected'));
  }
  el.classList.add('selected');
  const radio = el.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;

  updateModalTotalDisplay();
}

function toggleModalAddOn(el, name, price) {
  const checkbox = el.querySelector('input[type="checkbox"]');
  if (!checkbox) return;

  const idx = modalState.selectedAddOns.findIndex(a => a.name === name);
  if (idx > -1) {
    modalState.selectedAddOns.splice(idx, 1);
    el.classList.remove('selected');
    checkbox.checked = false;
  } else {
    modalState.selectedAddOns.push({ name, price });
    el.classList.add('selected');
    checkbox.checked = true;
  }

  updateModalTotalDisplay();
}

function updateModalQuantity(delta) {
  modalState.qty = Math.max(1, modalState.qty + delta);
  const qtyEl = document.getElementById('modal-qty-val');
  if (qtyEl) qtyEl.innerText = modalState.qty;
  updateModalTotalDisplay();
}

function updateModalTotalDisplay() {
  const food = appStore.state.selectedFoodForModal;
  if (!food) return;

  const addOnsSum = modalState.selectedAddOns.reduce((s, a) => s + a.price, 0);
  const unit = food.price + modalState.sizePrice + addOnsSum;
  const grandTotal = unit * modalState.qty;

  const btnEl = document.getElementById('modal-total-price-btn');
  if (btnEl) btnEl.innerText = `₹${grandTotal}`;
}

function confirmAddModalFoodToCart(foodId) {
  const food = window.MOCK_DATA.foods.find(f => f.id === foodId);
  if (!food) return;

  const instructions = document.getElementById('modal-food-instructions')?.value || '';
  const size = modalState.sizeName || (food.customization?.sizes?.[0] ? food.customization.sizes[0].name : 'Standard');

  appStore.addToCart(food, modalState.qty, size, [...modalState.selectedAddOns], instructions);
  appStore.closeFoodModal();

  // Reset modal state
  modalState = { qty: 1, sizeName: null, sizePrice: 0, selectedAddOns: [] };
}

// Utility HTML escape
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
