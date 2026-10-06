// CampusBite Admin & Vendor Management Dashboards

// --- ADMIN DASHBOARD ---
function renderAdminDashboard() {
  const orders = appStore.state.orders;
  const restaurants = appStore.state.restaurants;
  const foods = appStore.state.foods;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 142850);
  const totalOrdersCount = 1248 + orders.length;

  return `
    <div class="admin-dashboard-view animate-fade-in" style="margin-bottom: 60px;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #7C3AED; color: white; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.72rem; font-weight: 700;">ADMIN CONTROL CENTER</span>
            <span style="font-size: 0.85rem; color: #6B7280;">Campus Food Operations</span>
          </div>
          <h1 style="font-size: 1.8rem; font-weight: 800; color: #1F2937; margin-top: 4px;">Platform Analytics & Management</h1>
        </div>

        <div style="display: flex; gap: 10px;">
          <button class="btn-primary" style="padding: 8px 16px; font-size: 0.85rem;" onclick="openAddFoodAdminModal()">
            <span>+ Add New Food Item</span>
          </button>
          <button class="btn-outline" style="padding: 8px 16px; font-size: 0.85rem;" onclick="appStore.switchRole('student'); appStore.setView('home');">
            Exit Admin View
          </button>
        </div>
      </div>

      <!-- Stat Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; margin-bottom: 32px;">
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 0.78rem; font-weight: 700; color: #6B7280; text-transform: uppercase;">Total Campus Orders</div>
          <div style="font-size: 1.7rem; font-weight: 800; color: #1F2937; margin: 4px 0;">${totalOrdersCount.toLocaleString()}</div>
          <div style="font-size: 0.75rem; color: #059669; font-weight: 600;">↑ +14.8% this week</div>
        </div>

        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 0.78rem; font-weight: 700; color: #6B7280; text-transform: uppercase;">Total Campus Revenue</div>
          <div style="font-size: 1.7rem; font-weight: 800; color: #059669; margin: 4px 0;">₹${totalRevenue.toLocaleString()}</div>
          <div style="font-size: 0.75rem; color: #059669; font-weight: 600;">Avg order value: ₹142</div>
        </div>

        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 0.78rem; font-weight: 700; color: #6B7280; text-transform: uppercase;">Active Outlets</div>
          <div style="font-size: 1.7rem; font-weight: 800; color: #F97316; margin: 4px 0;">${restaurants.length} Outlets</div>
          <div style="font-size: 0.75rem; color: #6B7280;">100% Health Compliant</div>
        </div>

        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 0.78rem; font-weight: 700; color: #6B7280; text-transform: uppercase;">Registered Students</div>
          <div style="font-size: 1.7rem; font-weight: 800; color: #2563EB; margin: 4px 0;">4,820</div>
          <div style="font-size: 0.75rem; color: #2563EB; font-weight: 600;">Hostels A, B & Day Scholars</div>
        </div>
      </div>

      <!-- Charts Row (SVG rendered responsive charts) -->
      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; margin-bottom: 36px;">
        <!-- Orders Trend Chart -->
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 22px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 1.05rem; font-weight: 700; color: #1F2937;">Peak Campus Dining Hours (Orders / Hour)</h3>
            <span style="font-size: 0.75rem; color: #6B7280;">Lunch & Night Rush</span>
          </div>

          <div style="height: 190px; width: 100%; position: relative;">
            <svg viewBox="0 0 500 180" style="width: 100%; height: 100%;">
              <!-- Grid lines -->
              <line x1="40" y1="30" x2="480" y2="30" stroke="#F3F4F6" stroke-width="1" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="#F3F4F6" stroke-width="1" />
              <line x1="40" y1="130" x2="480" y2="130" stroke="#F3F4F6" stroke-width="1" />
              <line x1="40" y1="160" x2="480" y2="160" stroke="#E5E7EB" stroke-width="1.5" />

              <!-- Peak curve -->
              <path d="M 50 150 Q 100 140 140 110 T 210 40 T 280 130 T 370 50 T 460 140" fill="none" stroke="#F97316" stroke-width="3.5" stroke-linecap="round" />

              <!-- Area fill -->
              <path d="M 50 150 Q 100 140 140 110 T 210 40 T 280 130 T 370 50 T 460 140 L 460 160 L 50 160 Z" fill="rgba(249, 115, 22, 0.12)" />

              <!-- Peak labels -->
              <circle cx="210" cy="40" r="5" fill="#F97316" />
              <text x="210" y="24" font-size="11" font-weight="700" fill="#EA580C" text-anchor="middle">1:00 PM (Lunch Peak: 240)</text>

              <circle cx="370" cy="50" r="5" fill="#7C3AED" />
              <text x="370" y="34" font-size="11" font-weight="700" fill="#7C3AED" text-anchor="middle">8:30 PM (Dinner: 215)</text>

              <!-- X-Axis Labels -->
              <text x="50" y="175" font-size="10" fill="#9CA3AF" text-anchor="middle">9 AM</text>
              <text x="130" y="175" font-size="10" fill="#9CA3AF" text-anchor="middle">11 AM</text>
              <text x="210" y="175" font-size="10" fill="#9CA3AF" text-anchor="middle">1 PM</text>
              <text x="290" y="175" font-size="10" fill="#9CA3AF" text-anchor="middle">4 PM</text>
              <text x="370" y="175" font-size="10" fill="#9CA3AF" text-anchor="middle">8 PM</text>
              <text x="450" y="175" font-size="10" fill="#9CA3AF" text-anchor="middle">11 PM</text>
            </svg>
          </div>
        </div>

        <!-- Top Selling Foods Distribution -->
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 22px; box-shadow: var(--shadow-sm);">
          <h3 style="font-size: 1.05rem; font-weight: 700; color: #1F2937; margin-bottom: 14px;">Top Selling Student Items</h3>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">
                <span>🍔 Campus Special Veg Burger</span>
                <span>38% (420 orders)</span>
              </div>
              <div style="height: 7px; background: #F3F4F6; border-radius: var(--radius-full); overflow: hidden;">
                <div style="height: 100%; width: 38%; background: #F97316; border-radius: var(--radius-full);"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">
                <span>☕ Belgian Cold Coffee</span>
                <span>27% (310 orders)</span>
              </div>
              <div style="height: 7px; background: #F3F4F6; border-radius: var(--radius-full); overflow: hidden;">
                <div style="height: 100%; width: 27%; background: #059669; border-radius: var(--radius-full);"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">
                <span>🍜 Peri Peri Cheese Maggi</span>
                <span>21% (240 orders)</span>
              </div>
              <div style="height: 7px; background: #F3F4F6; border-radius: var(--radius-full); overflow: hidden;">
                <div style="height: 100%; width: 21%; background: #2563EB; border-radius: var(--radius-full);"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">
                <span>🥗 Avocado Sprout Salad</span>
                <span>14% (155 orders)</span>
              </div>
              <div style="height: 7px; background: #F3F4F6; border-radius: var(--radius-full); overflow: hidden;">
                <div style="height: 100%; width: 14%; background: #7C3AED; border-radius: var(--radius-full);"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Order Dispatch Table -->
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 22px; box-shadow: var(--shadow-sm); margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #1F2937;">Live Student Order Stream</h3>
          <span style="font-size: 0.78rem; color: #059669; font-weight: 700;">● Active Dispatch Monitor</span>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
            <thead>
              <tr style="border-bottom: 2px solid #F3F4F6; color: #6B7280;">
                <th style="padding: 10px 12px;">Order ID</th>
                <th style="padding: 10px 12px;">Outlet</th>
                <th style="padding: 10px 12px;">Items</th>
                <th style="padding: 10px 12px;">Location</th>
                <th style="padding: 10px 12px;">Amount</th>
                <th style="padding: 10px 12px;">Live Status</th>
                <th style="padding: 10px 12px;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr style="border-bottom: 1px solid #F3F4F6;">
                  <td style="padding: 12px; font-weight: 700; color: #F97316;">#${o.id}</td>
                  <td style="padding: 12px; font-weight: 600;">${o.restaurantName}</td>
                  <td style="padding: 12px; color: #4B5563;">${o.items.map(i => `${i.quantity}× ${i.name}`).join(', ')}</td>
                  <td style="padding: 12px;">${o.deliveryLocation}</td>
                  <td style="padding: 12px; font-weight: 700;">₹${o.total}</td>
                  <td style="padding: 12px;">
                    <span style="display: inline-block; padding: 3px 8px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; ${o.status === 'Delivered' ? 'background: #ECFDF5; color: #059669;' : 'background: #FFF7ED; color: #EA580C;'}">
                      ${o.status}
                    </span>
                  </td>
                  <td style="padding: 12px;">
                    <button class="portfolio-action-btn" style="background: #1F2937; color: white; padding: 4px 8px;" onclick="appStore.manualAdvanceOrderStatus('${o.id}')">
                      Update ⏩
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Campus Outlets Manager -->
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 22px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #1F2937;">Manage Campus Outlets</h3>
          <span style="font-size: 0.78rem; color: #6B7280;">6 Registered Canteens</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${restaurants.map(r => `
            <div style="border: 1px solid #E5E7EB; border-radius: var(--radius-md); padding: 14px; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <h4 style="font-weight: 700; font-size: 0.95rem; color: #1F2937;">${r.name}</h4>
                <p style="font-size: 0.78rem; color: #6B7280;">${r.location}</p>
                <div style="font-size: 0.75rem; margin-top: 4px; font-weight: 600; color: ${r.isOpen ? '#059669' : '#DC2626'};">
                  ${r.isOpen ? '● Currently Open' : '○ Closed'}
                </div>
              </div>
              <button class="btn-outline" style="padding: 4px 10px; font-size: 0.75rem;" onclick="toggleRestaurantStatus('${r.id}')">
                Toggle Status
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function toggleRestaurantStatus(restId) {
  const rest = appStore.state.restaurants.find(r => r.id === restId);
  if (rest) {
    rest.isOpen = !rest.isOpen;
    appStore.showToast(`${rest.name} is now ${rest.isOpen ? 'OPEN' : 'CLOSED'}!`, 'info');
    renderApp();
  }
}

function openAddFoodAdminModal() {
  const name = prompt('Enter Food Name:', 'Cheesy Corn Grilled Toast');
  if (!name) return;
  const price = parseInt(prompt('Enter Price (₹):', '85')) || 85;

  const newFood = {
    id: `food-${Date.now()}`,
    name,
    restaurantId: 'rest-1',
    restaurantName: 'Campus Cafe',
    category: 'snacks',
    price,
    originalPrice: price + 20,
    rating: 4.8,
    reviewsCount: 1,
    prepTime: '10–12 min',
    prepMinutes: 10,
    isVeg: true,
    isBestseller: false,
    isBudget: price <= 99,
    isQuick: true,
    isHealthy: false,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    description: 'Freshly added student snack from the admin dashboard.',
    customization: { sizes: [{ name: 'Standard', price: 0 }] }
  };

  window.MOCK_DATA.foods.unshift(newFood);
  appStore.state.foods = window.MOCK_DATA.foods;
  appStore.showToast(`Food item "${name}" added to menu catalog! 🍔`, 'success');
  renderApp();
}

// --- VENDOR DASHBOARD ---
function renderVendorDashboard() {
  const rest = appStore.state.restaurants[0]; // Campus Cafe
  const myFoods = window.MOCK_DATA.foods.filter(f => f.restaurantId === rest.id);
  const myOrders = appStore.state.orders.filter(o => o.restaurantId === rest.id || !o.restaurantId);

  return `
    <div class="vendor-dashboard-view animate-fade-in" style="margin-bottom: 60px;">
      <!-- Vendor Header -->
      <div style="background: linear-gradient(135deg, #064E3B 0%, #047857 100%); color: white; border-radius: var(--radius-xl); padding: 28px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="width: 56px; height: 56px; border-radius: 16px; background: white; color: #064E3B; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
            ☕
          </div>
          <div>
            <span style="background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: var(--radius-full); font-size: 0.72rem; font-weight: 700;">CAMPUS OUTLET KITCHEN</span>
            <h1 style="font-size: 1.8rem; font-weight: 800; margin-top: 4px;">${rest.name} — Live Kitchen Terminal</h1>
            <p style="font-size: 0.85rem; opacity: 0.9;">Chef Rajesh Sharma • ${rest.location}</p>
          </div>
        </div>

        <div style="display: flex; gap: 10px;">
          <button class="portfolio-action-btn" style="background: white; color: #064E3B;" onclick="appStore.showToast('Kitchen printer sound simulated 🖨️', 'info')">
            🔔 Test Kitchen Bell
          </button>
          <button class="btn-outline" style="color: white; border-color: rgba(255,255,255,0.4);" onclick="appStore.switchRole('student'); appStore.setView('home');">
            Exit Vendor
          </button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 30px;">
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-md); padding: 16px;">
          <div style="font-size: 0.75rem; color: #6B7280; font-weight: 700;">TODAY'S KITCHEN ORDERS</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #1F2937;">42</div>
        </div>
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-md); padding: 16px;">
          <div style="font-size: 0.75rem; color: #6B7280; font-weight: 700;">TODAY'S OUTLET SALES</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #059669;">₹4,890</div>
        </div>
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-md); padding: 16px;">
          <div style="font-size: 0.75rem; color: #6B7280; font-weight: 700;">AVERAGE PREPARATION</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #F97316;">11 mins</div>
        </div>
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-md); padding: 16px;">
          <div style="font-size: 0.75rem; color: #6B7280; font-weight: 700;">CURRENT OUTLET STATUS</div>
          <div style="font-size: 1.2rem; font-weight: 800; color: #059669; margin-top: 4px;">🟢 Accepting Orders</div>
        </div>
      </div>

      <!-- Live Kitchen Workflow Queue -->
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 22px; margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #1F2937;">Incoming & Active Orders Queue</h3>
          <span style="font-size: 0.78rem; color: #EA580C; font-weight: 700;">Auto-syncing every 10s</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${myOrders.map(ord => `
            <div style="border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <strong style="font-size: 1.1rem; color: #F97316;">#${ord.id}</strong>
                  <span style="background: #F3F4F6; padding: 2px 8px; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 600;">
                    ${ord.date || 'Today'}
                  </span>
                  <span style="background: #ECFDF5; color: #059669; padding: 2px 8px; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700;">
                    ${ord.status}
                  </span>
                </div>

                <div style="margin: 8px 0; font-size: 0.88rem; color: #1F2937; font-weight: 600;">
                  ${ord.items.map(i => `${i.quantity}× ${i.name}`).join(' • ')}
                </div>

                <div style="font-size: 0.78rem; color: #6B7280;">
                  📍 Destination: <strong>${ord.deliveryLocation}</strong> • Total: <strong>₹${ord.total}</strong>
                </div>
              </div>

              <!-- Vendor Workflow Action -->
              <div style="display: flex; gap: 8px;">
                <button class="btn-primary" style="padding: 8px 14px; font-size: 0.8rem;" onclick="appStore.manualAdvanceOrderStatus('${ord.id}')">
                  ${ord.status === 'Order Placed' ? 'Accept & Prep 🍳' : (ord.status === 'Food Being Prepared' ? 'Mark Ready for Pickup 📦' : 'Dispatch 🚴')}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Menu Items Availability Manager -->
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 22px;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #1F2937; margin-bottom: 16px;">
          Menu Item Stock / Availability Control
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
          ${myFoods.map(f => `
            <div style="border: 1px solid #E5E7EB; border-radius: var(--radius-md); padding: 12px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${f.image}" alt="${escapeHtml(f.name)}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;">
                <div>
                  <h4 style="font-size: 0.88rem; font-weight: 700; color: #1F2937;">${escapeHtml(f.name)}</h4>
                  <div style="font-size: 0.75rem; color: #059669; font-weight: 700;">₹${f.price}</div>
                </div>
              </div>

              <button class="pill-btn active" style="padding: 4px 10px; font-size: 0.72rem;" onclick="appStore.showToast('Item stock status updated for ${escapeQuotes(f.name)}', 'success')">
                In Stock ✓
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
