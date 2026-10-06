// CampusBite Profile, Offers, About, Contact, Portfolio Showcase & Auth Components

let activeProfileTab = 'orders'; // 'orders' | 'favorites' | 'wallet' | 'locations'

function renderProfileView() {
  const user = appStore.state.currentUser;
  const orders = appStore.state.orders;
  const favFoods = window.MOCK_DATA.foods.filter(f => appStore.state.favorites.has(f.id));

  return `
    <div class="profile-view animate-fade-in" style="margin-bottom: 60px;">
      <!-- Student Profile Card Header -->
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-xl); padding: 28px; box-shadow: var(--shadow-sm); margin-bottom: 30px; display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: center;">
        <div style="position: relative;">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}" alt="${user.name}" style="width: 88px; height: 88px; border-radius: 50%; object-fit: cover; border: 3px solid #F97316;">
          <span style="position: absolute; bottom: 0; right: 0; background: #059669; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; border: 2px solid white;">✓</span>
        </div>

        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #1F2937;">${escapeHtml(user.name)}</h2>
            <span style="background: #FFF7ED; color: #EA580C; font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-full); text-transform: uppercase;">
              ${user.role || 'STUDENT'}
            </span>
          </div>

          <p style="font-size: 0.85rem; color: #4B5563; margin-bottom: 6px;">
            🎓 <strong>${user.college || 'Apex Institute of Technology'}</strong> • ID: <code>${user.studentId || '22BCS1084'}</code>
          </p>

          <div style="display: flex; flex-wrap: wrap; gap: 14px; font-size: 0.8rem; color: #6B7280;">
            <span>📧 ${user.email}</span>
            <span>📱 ${user.phone}</span>
            <span>🏢 ${user.hostel || 'Hostel B, Room 204'}</span>
          </div>
        </div>

        <!-- Campus Wallet Quick Box -->
        <div style="background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border: 1.5px solid #FDBA74; border-radius: var(--radius-lg); padding: 18px; text-align: center; min-width: 170px;">
          <div style="font-size: 0.72rem; font-weight: 700; color: #9A3412; text-transform: uppercase;">Campus Wallet</div>
          <div style="font-size: 1.7rem; font-weight: 800; color: #C2410C; margin: 4px 0;">₹${appStore.state.walletBalance}</div>
          <button class="portfolio-action-btn" style="background: #EA580C; color: white; font-size: 0.75rem; width: 100%; justify-content: center;" onclick="appStore.addWalletMoney(200)">
            + Add ₹200 Demo
          </button>
        </div>
      </div>

      <!-- Profile Tabs Bar -->
      <div style="display: flex; gap: 10px; margin-bottom: 24px; border-bottom: 1px solid #E5E7EB; padding-bottom: 12px; overflow-x: auto;">
        <button class="pill-btn ${activeProfileTab === 'orders' ? 'active' : ''}" onclick="activeProfileTab = 'orders'; renderApp();">
          📦 My Orders (${orders.length})
        </button>
        <button class="pill-btn ${activeProfileTab === 'favorites' ? 'active' : ''}" onclick="activeProfileTab = 'favorites'; renderApp();">
          ❤️ Saved Favorites (${favFoods.length})
        </button>
        <button class="pill-btn ${activeProfileTab === 'wallet' ? 'active' : ''}" onclick="activeProfileTab = 'wallet'; renderApp();">
          💳 Campus Wallet
        </button>
        <button class="pill-btn ${activeProfileTab === 'locations' ? 'active' : ''}" onclick="activeProfileTab = 'locations'; renderApp();">
          📍 Saved Spots
        </button>
      </div>

      <!-- Tab Content: Orders -->
      ${activeProfileTab === 'orders' ? `
        <div>
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #1F2937; margin-bottom: 16px;">Order History</h3>
          ${orders.length === 0 ? `
            <div style="text-align: center; padding: 40px; background: white; border-radius: var(--radius-lg); border: 1px dashed #E5E7EB;">
              <p style="color: #6B7280;">No past orders found.</p>
              <button class="btn-primary" style="margin-top: 12px;" onclick="appStore.setView('menu')">Order Now 🍽️</button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${orders.map(order => `
                <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow-sm); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <strong style="font-size: 1.05rem; color: #F97316;">#${order.id}</strong>
                      <span style="font-size: 0.85rem; font-weight: 700; color: #1F2937;">${order.restaurantName}</span>
                      <span style="background: #F3F4F6; color: #6B7280; font-size: 0.75rem; padding: 2px 8px; border-radius: var(--radius-full);">
                        ${order.date || 'Today'}
                      </span>
                      <span style="background: ${order.status === 'Delivered' ? '#ECFDF5' : '#FFF7ED'}; color: ${order.status === 'Delivered' ? '#059669' : '#EA580C'}; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-full);">
                        ${order.status}
                      </span>
                    </div>

                    <div style="margin: 8px 0; font-size: 0.85rem; color: #4B5563;">
                      ${order.items.map(it => `${it.quantity}× ${it.name}`).join(' • ')}
                    </div>

                    <div style="font-size: 0.78rem; color: #6B7280;">
                      📍 Destination: <strong>${order.deliveryLocation}</strong> • Paid via: <strong>${order.paymentMethod || 'Wallet'}</strong>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 1.25rem; font-weight: 800; color: #1F2937;">₹${order.total}</span>
                    <button class="btn-outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="appStore.setTrackerOpen(true, appStore.state.orders.find(o => o.id === '${order.id}'))">
                      View Tracker 🚴
                    </button>
                    <button class="btn-primary" style="padding: 6px 14px; font-size: 0.8rem;" onclick="reorderItems('${order.id}')">
                      Order Again 🔄
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      ` : ''}

      <!-- Tab Content: Favorites -->
      ${activeProfileTab === 'favorites' ? `
        <div>
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #1F2937; margin-bottom: 16px;">Saved Food Items</h3>
          ${favFoods.length === 0 ? `
            <div style="text-align: center; padding: 40px; background: white; border-radius: var(--radius-lg); border: 1px dashed #E5E7EB;">
              <p style="color: #6B7280;">No favorites saved yet. Tap the ❤️ icon on any dish to save it here!</p>
              <button class="btn-primary" style="margin-top: 12px;" onclick="appStore.setView('menu')">Browse Menu</button>
            </div>
          ` : `
            <div class="food-grid">
              ${favFoods.map(f => renderFoodCard(f)).join('')}
            </div>
          `}
        </div>
      ` : ''}

      <!-- Tab Content: Wallet -->
      ${activeProfileTab === 'wallet' ? `
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 24px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #1F2937; margin-bottom: 12px;">Campus Student Wallet Account</h3>
          <p style="color: #6B7280; font-size: 0.88rem; margin-bottom: 20px;">
            Linked to Student ID #22BCS1084. Enjoy cashless 1-tap meals at all verified campus cafeteria counters.
          </p>

          <div style="display: flex; gap: 10px; margin-bottom: 24px;">
            <button class="btn-primary" onclick="appStore.addWalletMoney(100)">+ Add ₹100</button>
            <button class="btn-primary" onclick="appStore.addWalletMoney(200)">+ Add ₹200</button>
            <button class="btn-primary" onclick="appStore.addWalletMoney(500)">+ Add ₹500</button>
          </div>

          <h4 style="font-size: 0.95rem; font-weight: 700; color: #1F2937; margin-bottom: 12px;">Recent Wallet Transactions:</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; padding: 10px; border-radius: 8px; background: #F9FAFB; font-size: 0.85rem;">
              <span>Parents Monthly Campus Top-up</span>
              <strong style="color: #059669;">+₹500.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px; border-radius: 8px; background: #F9FAFB; font-size: 0.85rem;">
              <span>Order #CB-10245 (Campus Cafe)</span>
              <strong style="color: #DC2626;">−₹179.00</strong>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Tab Content: Locations -->
      ${activeProfileTab === 'locations' ? `
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 24px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #1F2937; margin-bottom: 16px;">Saved Campus Delivery Spots</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px;">
            <div style="border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 14px;">
              <div style="font-weight: 700; font-size: 0.95rem;">🏢 Primary: Hostel B Room 204</div>
              <div style="font-size: 0.78rem; color: #6B7280; margin-top: 4px;">Hostel B (Girls & Boys Quad Gate)</div>
            </div>
            <div style="border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 14px;">
              <div style="font-weight: 700; font-size: 0.95rem;">📚 Central Library 2nd Floor Study Desk</div>
              <div style="font-size: 0.78rem; color: #6B7280; margin-top: 4px;">Library Arcade Front Porch</div>
            </div>
            <div style="border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 14px;">
              <div style="font-weight: 700; font-size: 0.95rem;">💻 Academic Block B Lab 4</div>
              <div style="font-size: 0.78rem; color: #6B7280; margin-top: 4px;">Computer Science & Engineering Wing</div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function reorderItems(orderId) {
  const order = appStore.state.orders.find(o => o.id === orderId);
  if (!order) return;
  order.items.forEach(it => {
    const originalFood = window.MOCK_DATA.foods.find(f => f.name === it.name) || window.MOCK_DATA.foods[0];
    appStore.addToCart(originalFood, it.quantity);
  });
  appStore.setCartOpen(true);
}

// Student Offers View
function renderOffersView() {
  const offers = window.MOCK_DATA.offers;

  return `
    <div class="offers-view animate-fade-in" style="margin-bottom: 60px;">
      <div style="text-align: center; max-width: 650px; margin: 0 auto 36px auto;">
        <span style="background: #FFF7ED; color: #EA580C; font-size: 0.8rem; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); text-transform: uppercase;">
          CAMPUS EXCLUSIVE DEALS
        </span>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #1F2937; margin: 10px 0 8px 0;">
          Student Promo Codes & Perks
        </h1>
        <p style="color: #6B7280; font-size: 0.95rem;">
          Verified semester discount coupons created specially for student budgets. Apply directly to your cart with one tap!
        </p>
      </div>

      <div class="offers-grid">
        ${offers.map(offer => `
          <div class="offer-card">
            <span class="offer-badge">${offer.badge}</span>
            <div class="offer-discount">${offer.discountText}</div>
            <h3 class="offer-title">${offer.title}</h3>
            <p class="offer-desc">${offer.description}</p>
            <div style="font-size: 0.75rem; color: #6B7280; margin-bottom: 12px;">
              Min order: ₹${offer.minOrder} • Valid: ${offer.validTill}
            </div>

            <div class="offer-footer">
              <span class="offer-code-tag">${offer.code}</span>
              <button class="btn-primary" style="padding: 6px 14px; font-size: 0.8rem;" onclick="applyOfferFromPage('${offer.code}')">
                Apply Code 🏷️
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function applyOfferFromPage(code) {
  if (appStore.state.cart.length === 0) {
    // Add default popular burger so user can test the code immediately
    appStore.addToCart(window.MOCK_DATA.foods[0], 2);
  }
  appStore.applyOffer(code);
  appStore.setCartOpen(true);
}

// Student Perks & Features Section (rendered on Home page)
function renderStudentPerksSection() {
  return `
    <section class="student-features-section">
      <div style="text-align: center; max-width: 600px; margin: 0 auto;">
        <span style="background: #ECFDF5; color: #059669; font-size: 0.78rem; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); text-transform: uppercase;">
          TAILORED FOR CAMPUS LIFE
        </span>
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #1F2937; margin-top: 8px;">
          Built Different for Students
        </h2>
        <p style="color: #6B7280; font-size: 0.88rem;">
          Unlike commercial food apps, CampusBite is engineered for dorm rooms, lecture halls, and pocket money.
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-box">
          <div class="feature-icon-bubble">🏢</div>
          <h4>Hostel Room Delivery</h4>
          <p>Get food delivered straight to your specific hostel wing and floor security counters, even during midnight exam preps.</p>
        </div>

        <div class="feature-box">
          <div class="feature-icon-bubble">🏪</div>
          <h4>Zero-Fee Campus Pickup</h4>
          <p>Order between lectures and grab hot food directly from the cafeteria counter without waiting in 20-minute student queues.</p>
        </div>

        <div class="feature-box">
          <div class="feature-icon-bubble">🏷️</div>
          <h4>Budget Meals Under ₹100</h4>
          <p>Dedicated category curated for pocket money budgets. Wholesome wraps, burgers, and noodles starting from just ₹49.</p>
        </div>

        <div class="feature-box">
          <div class="feature-icon-bubble">👥</div>
          <h4>Roommate Group Order</h4>
          <p>Create a shared room code with friends, add individual dishes, and calculate exact per-person bill splits effortlessly.</p>
        </div>
      </div>
    </section>
  `;
}

// About View
function renderAboutView() {
  return `
    <div class="about-view animate-fade-in" style="margin-bottom: 60px;">
      <div style="text-align: center; max-width: 700px; margin: 0 auto 40px auto;">
        <span style="background: #FFF7ED; color: #EA580C; font-size: 0.8rem; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); text-transform: uppercase;">
          OUR MISSION & ARCHITECTURE
        </span>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #1F2937; margin: 10px 0 10px 0;">
          About CampusBite
        </h1>
        <p style="color: #6B7280; font-size: 1rem; line-height: 1.6;">
          CampusBite is a college-focused food ordering and delivery web application prototype designed specifically for university students, hostel dwellers, and campus food canteens.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px;">
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-xl); padding: 28px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 2rem; margin-bottom: 12px;">🎯</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #1F2937; margin-bottom: 10px;">The Campus Challenge</h3>
          <p style="color: #4B5563; font-size: 0.92rem; line-height: 1.6;">
            College students often have 10-minute short breaks between classes, tight student budgets, and long queues at university cafeterias. Outside delivery apps have high minimum delivery fees and can never locate specific campus spots like "Academic Block B Room 304".
          </p>
        </div>

        <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-xl); padding: 28px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 2rem; margin-bottom: 12px;">💡</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #1F2937; margin-bottom: 10px;">The CampusBite Solution</h3>
          <p style="color: #4B5563; font-size: 0.92rem; line-height: 1.6;">
            A centralized digital dining ecosystem uniting campus vendors with student buyers. Features designated campus drop-off zones, hostel delivery, group ordering for roommates, real-time preparation tracking, and an integrated AI assistant.
          </p>
        </div>
      </div>

      <!-- Portfolio Tech Stack Summary -->
      <div style="background: #111827; color: white; border-radius: var(--radius-xl); padding: 36px; margin-bottom: 40px;">
        <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 14px;">Technical Highlights Demonstrated in this Project</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; font-size: 0.88rem;">
          <div>
            <strong style="color: #F97316;">Frontend Engineering:</strong>
            <p style="color: #9CA3AF; margin-top: 4px;">Modular JavaScript ES6+, dynamic DOM reconciliation, custom reactive state store with LocalStorage persistence.</p>
          </div>
          <div>
            <strong style="color: #10B981;">UI / UX Design System:</strong>
            <p style="color: #9CA3AF; margin-top: 4px;">Custom CSS design tokens, responsive typography, soft elevation shadows, micro-interactions, accessible contrast.</p>
          </div>
          <div>
            <strong style="color: #60A5FA;">E-Commerce Architecture:</strong>
            <p style="color: #9CA3AF; margin-top: 4px;">Parametric cart calculations, promo code validations, multi-step checkout modal, live visual order progress timeline.</p>
          </div>
          <div>
            <strong style="color: #C084FC;">AI Assistant Integration:</strong>
            <p style="color: #9CA3AF; margin-top: 4px;">Natural language food recommendation engine with in-chat mini card rendering and direct cart interactions.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Contact View
function renderContactView() {
  return `
    <div class="contact-view animate-fade-in" style="margin-bottom: 60px;">
      <div style="text-align: center; max-width: 600px; margin: 0 auto 36px auto;">
        <span style="background: #FFF7ED; color: #EA580C; font-size: 0.8rem; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); text-transform: uppercase;">
          WE'RE LISTENING
        </span>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #1F2937; margin: 10px 0 8px 0;">
          Contact CampusBite Team
        </h1>
        <p style="color: #6B7280; font-size: 0.95rem;">
          Questions, vendor partnership proposals, or student cafeteria feedback? Reach out to our campus desk.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 32px; max-width: 900px; margin: 0 auto;">
        <form style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-xl); padding: 28px; box-shadow: var(--shadow-sm);" onsubmit="event.preventDefault(); appStore.showToast('Demo feedback submitted! Thank you.', 'success'); this.reset();">
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #374151; margin-bottom: 6px;">Your Full Name:</label>
            <input type="text" required placeholder="Amit Kumar" value="${appStore.state.currentUser.name}" style="width: 100%; border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 10px 14px; font-family: inherit; font-size: 0.9rem;">
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #374151; margin-bottom: 6px;">College Student Email:</label>
            <input type="email" required placeholder="amit.kumar@apex.edu" value="${appStore.state.currentUser.email}" style="width: 100%; border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 10px 14px; font-family: inherit; font-size: 0.9rem;">
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #374151; margin-bottom: 6px;">Subject / Category:</label>
            <select style="width: 100%; border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 10px 14px; font-family: inherit; font-size: 0.9rem;">
              <option>Student Food Feedback</option>
              <option>Vendor Partnership / Onboarding</option>
              <option>Student Delivery Runner Job</option>
              <option>Technical Bug Report</option>
            </select>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #374151; margin-bottom: 6px;">Message:</label>
            <textarea rows="4" required placeholder="Write your message or inquiry..." style="width: 100%; border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 10px 14px; font-family: inherit; font-size: 0.9rem;"></textarea>
          </div>

          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;">
            Send Message 📨
          </button>
        </form>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 20px;">
            <h4 style="font-weight: 700; font-size: 1rem; color: #1F2937; margin-bottom: 6px;">📍 Campus HQ Desk</h4>
            <p style="font-size: 0.85rem; color: #6B7280; line-height: 1.5;">
              Student Center Building, 2nd Floor, Room 210, Apex Institute of Technology
            </p>
          </div>

          <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 20px;">
            <h4 style="font-weight: 700; font-size: 1rem; color: #1F2937; margin-bottom: 6px;">📞 Helpline</h4>
            <p style="font-size: 0.85rem; color: #6B7280;">
              +91 (011) 2890-CAMPUS<br>
              support@campusbite.edu
            </p>
          </div>

          <div style="background: #F8F5EE; border-radius: var(--radius-lg); padding: 20px;">
            <h4 style="font-weight: 700; font-size: 0.95rem; color: #1F2937; margin-bottom: 4px;">⏰ Operating Hours</h4>
            <p style="font-size: 0.85rem; color: #6B7280;">
              Breakfast: 7:30 AM – 11:00 AM<br>
              Lunch & Snacks: 11:30 AM – 7:00 PM<br>
              Night Canteen: 8:00 PM – 2:00 AM
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Portfolio Capstone Showcase Modal
function renderShowcaseModal() {
  const isOpen = appStore.state.isShowcaseOpen;
  if (!isOpen) return '';

  return `
    <div class="modal-overlay open" id="showcase-modal" onclick="if(event.target === this) appStore.setShowcaseOpen(false)">
      <div class="modal-card" style="max-width: 740px;">
        <button class="modal-close-btn" onclick="appStore.setShowcaseOpen(false)">✕</button>

        <div style="padding: 28px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
            <span style="background: #1E1B4B; color: #FB923C; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.72rem; font-weight: 800;">
              B.TECH CAPSTONE DOCUMENTATION
            </span>
            <span style="font-size: 0.82rem; color: #6B7280;">Portfolio Project Overview</span>
          </div>

          <h2 style="font-size: 1.6rem; font-weight: 800; color: #1F2937; margin-bottom: 6px;">
            CampusBite — Student Food Delivery Web App
          </h2>
          <p style="font-size: 0.9rem; color: #4B5563; line-height: 1.5; margin-bottom: 24px;">
            A complete, production-caliber web application designed to solve collegiate dining logistics. Created for submission, technical interviews, and portfolio demonstration.
          </p>

          <!-- Problem vs Solution -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: var(--radius-md); padding: 14px;">
              <h4 style="font-weight: 700; font-size: 0.9rem; color: #991B1B; margin-bottom: 4px;">The Problem:</h4>
              <p style="font-size: 0.82rem; color: #7F1D1D; line-height: 1.45;">
                Busy schedules, long lines between lectures, lack of affordable options, and external food apps failing inside locked campus zones.
              </p>
            </div>
            <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--radius-md); padding: 14px;">
              <h4 style="font-weight: 700; font-size: 0.9rem; color: #065F46; margin-bottom: 4px;">The Solution:</h4>
              <p style="font-size: 0.82rem; color: #064E3B; line-height: 1.45;">
                A hyper-local campus food network with zone drop-offs, budget filters (<₹100), roommate group orders, and instant ordering.
              </p>
            </div>
          </div>

          <!-- Key Features Checklist -->
          <h3 style="font-size: 1.05rem; font-weight: 700; color: #1F2937; margin-bottom: 12px;">Implemented Features Checklist:</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.82rem; margin-bottom: 24px;">
            <div>✓ E-commerce Discovery & Menus</div>
            <div>✓ Instant Search & Multi-filter Engine</div>
            <div>✓ Food Customizer (Portions & Add-ons)</div>
            <div>✓ Responsive Cart & Bill Breakdown</div>
            <div>✓ Multi-step Campus Checkout Flow</div>
            <div>✓ Simulated Live Order Tracking Timeline</div>
            <div>✓ Roommate Group Ordering with Bill Split</div>
            <div>✓ CampusBite AI Dining Chatbot</div>
            <div>✓ Admin Metrics & Analytics Dashboard</div>
            <div>✓ Vendor Live Kitchen Queue Terminal</div>
            <div>✓ Student Profile & Campus Wallet</div>
            <div>✓ 100% Mobile & Responsive UI Design</div>
          </div>

          <!-- Technologies Used -->
          <div style="background: #F8F5EE; border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px;">
            <h4 style="font-weight: 700; font-size: 0.9rem; color: #1F2937; margin-bottom: 6px;">Technologies & Architecture:</h4>
            <p style="font-size: 0.82rem; color: #4B5563; line-height: 1.5;">
              <strong>Frontend:</strong> HTML5, CSS3 Custom Properties (Design Tokens), Vanilla ES6+ Reactive Store Pattern, LocalStorage Persistence, SVG Chart Visualizations, Responsive Grid & Flexbox, Lucide & Emoji System.<br>
              <strong>Future Backend Architecture:</strong> Node.js / Express REST API, MongoDB Database, WebSockets for live rider tracking, Razorpay payment gateway integration.
            </p>
          </div>

          <div style="text-align: right;">
            <button class="btn-primary" onclick="appStore.setShowcaseOpen(false)">
              Got it, Close Docs ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Authentication Modal (Student, Vendor, Admin)
function renderAuthModal() {
  const isOpen = appStore.state.isAuthOpen;
  if (!isOpen) return '';

  return `
    <div class="modal-overlay open" id="auth-modal" onclick="if(event.target === this) appStore.setAuthOpen(false)">
      <div class="modal-card" style="max-width: 480px;">
        <button class="modal-close-btn" onclick="appStore.setAuthOpen(false)">✕</button>

        <div style="padding: 24px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 2.2rem; margin-bottom: 6px;">🍔</div>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #1F2937;">Welcome to CampusBite</h2>
            <p style="font-size: 0.82rem; color: #6B7280;">Sign in with your campus student account</p>
          </div>

          <!-- Demo Role One-Click Switch Buttons (For Reviewers) -->
          <div style="background: #FDFBF7; border: 1px solid #E5E7EB; border-radius: var(--radius-md); padding: 14px; margin-bottom: 20px;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #6B7280; text-transform: uppercase; margin-bottom: 8px; text-align: center;">
              ⚡ Quick Demo Login (One-Tap):
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button class="btn-primary" style="justify-content: center; padding: 8px;" onclick="appStore.switchRole('student'); appStore.setAuthOpen(false); appStore.setView('home');">
                🎓 Continue as Student (Amit Kumar)
              </button>
              <button class="btn-secondary" style="justify-content: center; padding: 8px;" onclick="appStore.switchRole('vendor'); appStore.setAuthOpen(false); appStore.setView('vendor');">
                👨‍🍳 Login as Campus Cafe Vendor
              </button>
              <button class="btn-outline" style="justify-content: center; padding: 8px;" onclick="appStore.switchRole('admin'); appStore.setAuthOpen(false); appStore.setView('admin');">
                🛡️ Login as Campus Administrator
              </button>
            </div>
          </div>

          <div style="text-align: center; margin: 12px 0; color: #9CA3AF; font-size: 0.8rem;">— OR SIGN IN WITH CREDENTIALS —</div>

          <form onsubmit="event.preventDefault(); appStore.setAuthOpen(false); appStore.showToast('Logged in successfully!', 'success');">
            <div style="margin-bottom: 12px;">
              <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #374151; margin-bottom: 4px;">College Email:</label>
              <input type="email" required placeholder="student@campus.edu" style="width: 100%; border: 1.5px solid #E5E7EB; border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.88rem;">
            </div>
            <div style="margin-bottom: 16px;">
              <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #374151; margin-bottom: 4px;">Password:</label>
              <input type="password" required placeholder="••••••••" style="width: 100%; border: 1.5px solid #E5E7EB; border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.88rem;">
            </div>

            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 10px;">
              Sign In 🔐
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

// Footer Component
function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-top">
          <!-- Col 1: Brand -->
          <div class="footer-brand">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <span style="font-size: 1.6rem;">🍔</span>
              <h2>Campus<span>Bite</span></h2>
            </div>
            <p>
              Healthy Meals. Happy Students. The smart and affordable food-delivery platform designed exclusively for college campuses.
            </p>
            <div style="margin-top: 14px; display: flex; gap: 12px; font-size: 1.2rem;">
              <a href="https://github.com" target="_blank" style="color: #9CA3AF;">🐙</a>
              <a href="https://linkedin.com" target="_blank" style="color: #9CA3AF;">💼</a>
              <a href="https://instagram.com" target="_blank" style="color: #9CA3AF;">📸</a>
            </div>
          </div>

          <!-- Col 2: Navigation -->
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a onclick="appStore.setView('home')">Home</a></li>
              <li><a onclick="appStore.setView('menu')">Campus Menu</a></li>
              <li><a onclick="appStore.setView('restaurants')">Campus Outlets</a></li>
              <li><a onclick="appStore.setView('offers')">Student Deals</a></li>
              <li><a onclick="appStore.setGroupOrderOpen(true)">Group Orders</a></li>
            </ul>
          </div>

          <!-- Col 3: Student Perks -->
          <div class="footer-col">
            <h4>Features</h4>
            <ul>
              <li><a onclick="appStore.toggleUnder100Only(); appStore.setView('menu');">Meals Under ₹100</a></li>
              <li><a onclick="appStore.toggleQuickOnly(); appStore.setView('menu');">Quick Prep (<15m)</a></li>
              <li><a onclick="appStore.toggleHealthyOnly(); appStore.setView('menu');">Healthy High Protein</a></li>
              <li><a onclick="appStore.setView('about')">About Project</a></li>
              <li><a onclick="appStore.setShowcaseOpen(true)">Capstone Documentation</a></li>
            </ul>
          </div>

          <!-- Col 4: Demo Dashboards -->
          <div class="footer-col">
            <h4>Demo Portals</h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button class="portfolio-action-btn" style="background: #1F2937; color: white;" onclick="appStore.switchRole('admin'); appStore.setView('admin');">
                🛡️ Open Admin Dashboard
              </button>
              <button class="portfolio-action-btn" style="background: #1F2937; color: white;" onclick="appStore.switchRole('vendor'); appStore.setView('vendor');">
                👨‍🍳 Open Vendor Kitchen View
              </button>
              <button class="portfolio-action-btn" style="background: #1F2937; color: white;" onclick="appStore.switchRole('student'); appStore.setView('home');">
                🎓 Student Ordering View
              </button>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>
            © 2026 <strong>CampusBite</strong>. Built as a student portfolio project.
          </div>
          <div style="display: flex; gap: 20px;">
            <a onclick="appStore.setView('about')" style="color: #9CA3AF; text-decoration: none; cursor: pointer;">About</a>
            <a onclick="appStore.setView('contact')" style="color: #9CA3AF; text-decoration: none; cursor: pointer;">Contact</a>
            <a onclick="appStore.setShowcaseOpen(true)" style="color: #9CA3AF; text-decoration: none; cursor: pointer;">Architecture Docs</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
