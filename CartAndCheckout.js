// CampusBite Cart Drawer, Multi-Step Checkout & Live Order Tracker

function renderCartDrawer() {
  const isOpen = appStore.state.isCartOpen;
  const cart = appStore.state.cart;
  const calc = appStore.getCartCalculations();
  const orderType = appStore.state.orderType;
  const appliedOffer = appStore.state.appliedOffer;

  return `
    <div class="cart-drawer-overlay ${isOpen ? 'open' : ''}" onclick="if(event.target === this) appStore.setCartOpen(false)">
      <div class="cart-drawer">
        <!-- Header -->
        <div class="cart-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.4rem;">🛒</span>
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #1F2937;">Your Campus Cart</h3>
              <p style="font-size: 0.75rem; color: #6B7280;">${cart.length} item${cart.length === 1 ? '' : 's'} added</p>
            </div>
          </div>
          <button style="border: none; background: #F3F4F6; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1rem;" onclick="appStore.setCartOpen(false)">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="cart-body">
          ${cart.length === 0 ? `
            <div style="text-align: center; padding: 60px 10px;">
              <div style="font-size: 4rem; margin-bottom: 16px;">🍽️</div>
              <h4 style="font-size: 1.2rem; font-weight: 700; color: #1F2937; margin-bottom: 6px;">Your cart is empty</h4>
              <p style="color: #6B7280; font-size: 0.88rem; margin-bottom: 24px; line-height: 1.5;">
                Good food is always cooking on campus. Pick your favorite burger, thali or coffee!
              </p>
              <button class="btn-primary" style="margin: 0 auto;" onclick="appStore.setCartOpen(false); appStore.setView('menu');">
                Explore Menu ⚡
              </button>
            </div>
          ` : `
            <!-- Delivery vs Pickup Selector -->
            <div style="background: #F8F5EE; padding: 6px; border-radius: var(--radius-full); display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 18px;">
              <button 
                style="padding: 8px 12px; border-radius: var(--radius-full); border: none; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: var(--transition); ${orderType === 'delivery' ? 'background: #F97316; color: white; box-shadow: var(--shadow-sm);' : 'background: transparent; color: #6B7280;'}"
                onclick="appStore.setOrderType('delivery')"
              >
                🚴 Campus Delivery
              </button>
              <button 
                style="padding: 8px 12px; border-radius: var(--radius-full); border: none; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: var(--transition); ${orderType === 'pickup' ? 'background: #059669; color: white; box-shadow: var(--shadow-sm);' : 'background: transparent; color: #6B7280;'}"
                onclick="appStore.setOrderType('pickup')"
              >
                🏪 Counter Pickup (Free)
              </button>
            </div>

            <!-- Cart Items List -->
            <div style="display: flex; flex-direction: column;">
              ${cart.map(item => `
                <div class="cart-item-row">
                  <img src="${item.image}" alt="${escapeHtml(item.name)}" class="cart-item-img">
                  <div class="cart-item-info">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                      <h4 style="font-size: 0.92rem; font-weight: 700; color: #1F2937;">${escapeHtml(item.name)}</h4>
                      <button style="border: none; background: none; color: #9CA3AF; cursor: pointer; font-size: 0.85rem;" onclick="appStore.removeFromCart('${item.cartItemId}')">✕</button>
                    </div>

                    <div style="font-size: 0.75rem; color: #6B7280; margin: 2px 0;">
                      <span>Size: ${item.size}</span>
                      ${item.addOns && item.addOns.length > 0 ? ` • Extras: ${item.addOns.map(a => a.name).join(', ')}` : ''}
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
                      <span style="font-size: 0.95rem; font-weight: 800; color: #1F2937;">₹${item.unitPrice * item.quantity}</span>
                      
                      <div class="qty-counter">
                        <button class="qty-btn" style="width: 26px; height: 26px;" onclick="appStore.updateCartQuantity('${item.cartItemId}', -1)">−</button>
                        <span class="qty-val" style="padding: 0 8px; font-size: 0.85rem;">${item.quantity}</span>
                        <button class="qty-btn" style="width: 26px; height: 26px;" onclick="appStore.updateCartQuantity('${item.cartItemId}', 1)">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Promo Codes Section -->
            <div style="margin-top: 20px; padding: 14px; background: #FFF7ED; border-radius: var(--radius-md); border: 1px dashed #FDBA74;">
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <input 
                  type="text" 
                  id="cart-coupon-input"
                  placeholder="Enter Student Promo Code"
                  value="${appliedOffer ? appliedOffer.code : ''}"
                  style="flex-grow: 1; border: 1px solid #FDBA74; border-radius: var(--radius-sm); padding: 8px 10px; font-family: monospace; font-size: 0.85rem; text-transform: uppercase;"
                >
                ${appliedOffer ? `
                  <button class="btn-outline" style="padding: 6px 12px; font-size: 0.78rem; border-color: #DC2626; color: #DC2626;" onclick="appStore.removeOffer()">
                    Remove
                  </button>
                ` : `
                  <button class="btn-primary" style="padding: 6px 14px; font-size: 0.82rem;" onclick="applyCartCoupon()">
                    Apply
                  </button>
                `}
              </div>

              <!-- One tap suggestions -->
              ${!appliedOffer ? `
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <span style="font-size: 0.72rem; color: #9A3412; font-weight: 600;">Tap to apply:</span>
                  <button class="pill-btn" style="padding: 2px 8px; font-size: 0.72rem; background: white;" onclick="quickApplyCoupon('CAMPUS20')">
                    CAMPUS20 (20% OFF)
                  </button>
                  <button class="pill-btn" style="padding: 2px 8px; font-size: 0.72rem; background: white;" onclick="quickApplyCoupon('FIRSTBITE')">
                    FIRSTBITE (₹40 OFF)
                  </button>
                </div>
              ` : `
                <div style="font-size: 0.78rem; color: #15803D; font-weight: 600;">
                  ✓ Offer applied! Saving ₹${calc.discount}
                </div>
              `}
            </div>
          `}
        </div>

        <!-- Footer / Checkout trigger -->
        ${cart.length > 0 ? `
          <div class="cart-footer">
            <div class="bill-row">
              <span>Item Subtotal</span>
              <span>₹${calc.subtotal}</span>
            </div>
            ${calc.discount > 0 ? `
              <div class="bill-row" style="color: #059669; font-weight: 600;">
                <span>Student Discount</span>
                <span>−₹${calc.discount}</span>
              </div>
            ` : ''}
            <div class="bill-row">
              <span>Campus Delivery Fee</span>
              <span>${calc.deliveryFee === 0 ? '<strong style="color: #059669;">FREE</strong>' : `₹${calc.deliveryFee}`}</span>
            </div>
            <div class="bill-row">
              <span>Packaging & Eco Container</span>
              <span>₹${calc.packagingFee}</span>
            </div>

            <div class="bill-total-row">
              <span>To Pay</span>
              <span>₹${calc.total}</span>
            </div>

            <button class="btn-primary" style="width: 100%; justify-content: center; padding: 14px;" onclick="appStore.setCartOpen(false); appStore.setCheckoutOpen(true);">
              <span>Proceed to Checkout</span>
              <span>→</span>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function quickApplyCoupon(code) {
  const input = document.getElementById('cart-coupon-input');
  if (input) input.value = code;
  appStore.applyOffer(code);
}

function applyCartCoupon() {
  const input = document.getElementById('cart-coupon-input');
  if (input && input.value) {
    appStore.applyOffer(input.value);
  }
}

// Multi-Step Checkout Modal
let checkoutStep = 1;
let chosenPayment = 'Campus Wallet';

function renderCheckoutModal() {
  const isOpen = appStore.state.isCheckoutOpen;
  if (!isOpen) return '';

  const calc = appStore.getCartCalculations();
  const locations = window.MOCK_DATA.campusLocations;
  const user = appStore.state.currentUser;

  return `
    <div class="modal-overlay open" id="checkout-modal" onclick="if(event.target === this) appStore.setCheckoutOpen(false)">
      <div class="modal-card" style="max-width: 650px;">
        <button class="modal-close-btn" onclick="appStore.setCheckoutOpen(false)">✕</button>

        <div style="padding: 24px;">
          <!-- Stepper Header -->
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #E5E7EB; padding-bottom: 16px; margin-bottom: 20px;">
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: #1F2937;">Checkout</h2>
              <p style="font-size: 0.8rem; color: #6B7280;">Step ${checkoutStep} of 3</p>
            </div>

            <div style="display: flex; gap: 8px;">
              <span style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 700; ${checkoutStep >= 1 ? 'background: #F97316; color: white;' : 'background: #E5E7EB; color: #6B7280;'}">1</span>
              <span style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 700; ${checkoutStep >= 2 ? 'background: #F97316; color: white;' : 'background: #E5E7EB; color: #6B7280;'}">2</span>
              <span style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 700; ${checkoutStep === 3 ? 'background: #F97316; color: white;' : 'background: #E5E7EB; color: #6B7280;'}">3</span>
            </div>
          </div>

          <!-- Step 1: Location & Delivery Time -->
          ${checkoutStep === 1 ? `
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 12px; color: #1F2937;">
                Select Campus Delivery Location 📍
              </h3>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                ${locations.map(loc => `
                  <div 
                    class="custom-option-pill ${appStore.state.selectedLocation === loc.name ? 'selected' : ''}" 
                    style="margin-bottom: 0;"
                    onclick="appStore.setLocation('${loc.name}')"
                  >
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span>${loc.icon}</span>
                      <span style="font-size: 0.82rem; font-weight: 600;">${loc.name}</span>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Custom location entry -->
              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #4B5563; margin-bottom: 6px;">
                  Or enter specific room / bench / desk:
                </label>
                <input 
                  type="text" 
                  id="checkout-custom-loc"
                  placeholder="e.g. Hostel B - Room 204 or Library 2nd Floor Study Table #12"
                  value="${escapeHtml(appStore.state.customLocation)}"
                  oninput="appStore.setLocation(appStore.state.selectedLocation, this.value)"
                  style="width: 100%; border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 10px 14px; font-family: inherit; font-size: 0.88rem; outline: none;"
                >
              </div>

              <!-- Contact & timing -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
                <div>
                  <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #4B5563; margin-bottom: 4px;">
                    Phone for Delivery Call:
                  </label>
                  <input 
                    type="text" 
                    value="${user.phone}" 
                    style="width: 100%; border: 1px solid #E5E7EB; border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.85rem;"
                  >
                </div>
                <div>
                  <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #4B5563; margin-bottom: 4px;">
                    Delivery Timing:
                  </label>
                  <select style="width: 100%; border: 1px solid #E5E7EB; border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.85rem; font-family: inherit;">
                    <option>Deliver Now (15–20 mins)</option>
                    <option>After Next Lecture (1:15 PM)</option>
                    <option>Evening Study Break (5:30 PM)</option>
                  </select>
                </div>
              </div>

              <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="checkoutStep = 2; renderApp();">
                Continue to Payment →
              </button>
            </div>
          ` : ''}

          <!-- Step 2: Payment Method -->
          ${checkoutStep === 2 ? `
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 12px; color: #1F2937;">
                Select Payment Method 💳
              </h3>

              <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
                <!-- Campus Wallet -->
                <div 
                  class="custom-option-pill ${chosenPayment === 'Campus Wallet' ? 'selected' : ''}"
                  onclick="chosenPayment = 'Campus Wallet'; renderApp();"
                >
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 1.4rem;">🎓</span>
                    <div>
                      <div style="font-weight: 700; font-size: 0.92rem;">Campus Student Wallet</div>
                      <div style="font-size: 0.78rem; color: #059669; font-weight: 600;">
                        Available Balance: ₹${appStore.state.walletBalance} (1-tap instant pay)
                      </div>
                    </div>
                  </div>
                  <input type="radio" name="pay_option" ${chosenPayment === 'Campus Wallet' ? 'checked' : ''} style="accent-color: var(--primary);">
                </div>

                <!-- UPI / QR -->
                <div 
                  class="custom-option-pill ${chosenPayment === 'UPI / QR' ? 'selected' : ''}"
                  onclick="chosenPayment = 'UPI / QR'; renderApp();"
                >
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 1.4rem;">⚡</span>
                    <div>
                      <div style="font-weight: 700; font-size: 0.92rem;">Instant UPI / QR Code</div>
                      <div style="font-size: 0.78rem; color: #6B7280;">Google Pay, PhonePe, Paytm, BHIM</div>
                    </div>
                  </div>
                  <input type="radio" name="pay_option" ${chosenPayment === 'UPI / QR' ? 'checked' : ''} style="accent-color: var(--primary);">
                </div>

                <!-- Credit / Debit Card -->
                <div 
                  class="custom-option-pill ${chosenPayment === 'Card' ? 'selected' : ''}"
                  onclick="chosenPayment = 'Card'; renderApp();"
                >
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 1.4rem;">💳</span>
                    <div>
                      <div style="font-weight: 700; font-size: 0.92rem;">Credit / Debit Card</div>
                      <div style="font-size: 0.78rem; color: #6B7280;">Visa, Mastercard, RuPay</div>
                    </div>
                  </div>
                  <input type="radio" name="pay_option" ${chosenPayment === 'Card' ? 'checked' : ''} style="accent-color: var(--primary);">
                </div>

                <!-- Cash on Delivery -->
                <div 
                  class="custom-option-pill ${chosenPayment === 'Cash on Delivery' ? 'selected' : ''}"
                  onclick="chosenPayment = 'Cash on Delivery'; renderApp();"
                >
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 1.4rem;">💵</span>
                    <div>
                      <div style="font-weight: 700; font-size: 0.92rem;">Cash on Delivery (COD)</div>
                      <div style="font-size: 0.78rem; color: #6B7280;">Pay campus delivery runner in cash / UPI scan</div>
                    </div>
                  </div>
                  <input type="radio" name="pay_option" ${chosenPayment === 'Cash on Delivery' ? 'checked' : ''} style="accent-color: var(--primary);">
                </div>
              </div>

              <!-- UPI Simulator preview -->
              ${chosenPayment === 'UPI / QR' ? `
                <div style="background: #F8F5EE; padding: 14px; border-radius: var(--radius-md); text-align: center; margin-bottom: 20px;">
                  <div style="font-size: 0.82rem; font-weight: 700; color: #4B5563; margin-bottom: 6px;">Mock CampusBite UPI ID:</div>
                  <code style="background: white; padding: 4px 10px; border-radius: 4px; border: 1px solid #E5E7EB; font-weight: 700;">campusbite.pay@oksbi</code>
                  <div style="font-size: 0.72rem; color: #059669; margin-top: 6px;">✓ Auto-verified in demo mode</div>
                </div>
              ` : ''}

              <div style="display: flex; gap: 12px;">
                <button class="btn-outline" style="flex: 1; justify-content: center;" onclick="checkoutStep = 1; renderApp();">
                  ← Back
                </button>
                <button class="btn-primary" style="flex: 2; justify-content: center;" onclick="checkoutStep = 3; renderApp();">
                  Review Order →
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Step 3: Review & Place Order -->
          ${checkoutStep === 3 ? `
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 12px; color: #1F2937;">
                Final Order Summary 📝
              </h3>

              <div style="background: #FDFBF7; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 16px; margin-bottom: 20px;">
                <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #E5E7EB;">
                  <div style="font-size: 0.78rem; font-weight: 700; color: #6B7280; text-transform: uppercase;">Delivery Destination:</div>
                  <div style="font-weight: 700; font-size: 0.95rem; color: #1F2937; margin-top: 2px;">
                    📍 ${appStore.state.customLocation || appStore.state.selectedLocation}
                  </div>
                </div>

                <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #E5E7EB;">
                  <div style="font-size: 0.78rem; font-weight: 700; color: #6B7280; text-transform: uppercase;">Payment Choice:</div>
                  <div style="font-weight: 700; font-size: 0.95rem; color: #1F2937; margin-top: 2px;">
                    💳 ${chosenPayment}
                  </div>
                </div>

                <div>
                  <div style="font-size: 0.78rem; font-weight: 700; color: #6B7280; text-transform: uppercase; margin-bottom: 6px;">Items (${appStore.state.cart.length}):</div>
                  ${appStore.state.cart.map(item => `
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                      <span>${item.quantity}× ${escapeHtml(item.name)} (${item.size})</span>
                      <strong style="color: #1F2937;">₹${item.unitPrice * item.quantity}</strong>
                    </div>
                  `).join('')}
                </div>

                <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed #D1D5DB; display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800;">
                  <span>Grand Total:</span>
                  <span style="color: #F97316;">₹${calc.total}</span>
                </div>
              </div>

              <div style="display: flex; gap: 12px;">
                <button class="btn-outline" style="flex: 1; justify-content: center;" onclick="checkoutStep = 2; renderApp();">
                  ← Back
                </button>
                <button class="btn-primary" style="flex: 2; justify-content: center; padding: 14px;" onclick="handleFinalPlaceOrder('${chosenPayment}')">
                  <span>Place Order • ₹${calc.total} 🎉</span>
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function handleFinalPlaceOrder(paymentMethod) {
  const order = appStore.placeOrder(paymentMethod);
  if (order) {
    checkoutStep = 1;
    renderApp();
  }
}

// Live Visual Order Tracker Modal
function renderOrderTrackerModal() {
  const isOpen = appStore.state.isTrackerOpen;
  const order = appStore.state.activeTrackingOrder;
  if (!isOpen || !order) return '';

  const steps = [
    { title: 'Order Placed', desc: 'Received & sent to campus outlet', icon: '📝' },
    { title: 'Restaurant Accepted', desc: 'Kitchen acknowledged order', icon: '👨‍🍳' },
    { title: 'Food Being Prepared', desc: 'Fresh ingredients on the grill', icon: '🍳' },
    { title: 'Out for Delivery', desc: 'Partner en route on campus cycle', icon: '🚴' },
    { title: 'Delivered', desc: 'Enjoy your hot meal!', icon: '📍' }
  ];

  const currentStep = order.stepIndex || 0;

  return `
    <div class="modal-overlay open" id="order-tracker-modal" onclick="if(event.target === this) appStore.setTrackerOpen(false)">
      <div class="modal-card" style="max-width: 620px;">
        <button class="modal-close-btn" onclick="appStore.setTrackerOpen(false)">✕</button>

        <div style="padding: 24px;">
          <!-- Top Celebration Header -->
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 3rem; margin-bottom: 8px;">🎉</div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #1F2937;">
              ${currentStep === 4 ? 'Order Delivered!' : 'Order Placed Successfully!'}
            </h2>
            <p style="font-size: 0.85rem; color: #6B7280;">
              Order ID: <strong style="color: #F97316;">#${order.id}</strong> • ${order.restaurantName}
            </p>
          </div>

          <!-- ETA Banner -->
          <div style="background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border: 1px solid #FDBA74; border-radius: var(--radius-lg); padding: 16px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
            <div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #9A3412; text-transform: uppercase;">Estimated Arrival:</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: #C2410C;">
                ${currentStep === 4 ? 'Arrived!' : '15–20 minutes'}
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.75rem; font-weight: 700; color: #9A3412; text-transform: uppercase;">Destination:</div>
              <div style="font-size: 0.88rem; font-weight: 700; color: #1F2937;">
                ${order.deliveryLocation}
              </div>
            </div>
          </div>

          <!-- Vertical Timeline -->
          <div class="tracker-timeline">
            ${steps.map((st, idx) => {
              const isCompleted = idx < currentStep;
              const isActive = idx === currentStep;

              return `
                <div class="timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
                  <div class="timeline-dot">
                    ${isCompleted ? '✓' : st.icon}
                  </div>
                  <div>
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: ${isActive ? '#F97316' : (isCompleted ? '#059669' : '#9CA3AF')};">
                      ${st.title} ${isActive ? '• IN PROGRESS' : ''}
                    </h4>
                    <p style="font-size: 0.78rem; color: #6B7280;">${st.desc}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Portfolio Simulation Shortcut Button -->
          <div style="background: #F3F4F6; padding: 12px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <div style="font-size: 0.78rem; color: #4B5563;">
              💡 <strong>Reviewer Demo Tool:</strong> Simulate order journey
            </div>
            <button class="portfolio-action-btn" style="background: #1F2937; color: white;" onclick="appStore.manualAdvanceOrderStatus('${order.id}')">
              <span>Simulate Next Step ⏩</span>
            </button>
          </div>

          <!-- Campus Delivery Partner Card -->
          <div style="background: white; border: 1.5px solid #E5E7EB; border-radius: var(--radius-lg); padding: 16px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 46px; height: 46px; border-radius: 50%; background: #ECFDF5; color: #059669; font-size: 1.5rem; display: flex; align-items: center; justify-content: center;">
                🚴
              </div>
              <div>
                <div style="font-size: 0.92rem; font-weight: 700; color: #1F2937;">${order.partner?.name || 'Rahul S. (Campus Runner)'}</div>
                <div style="font-size: 0.75rem; color: #6B7280;">${order.partner?.vehicle || 'Campus E-Bike #08'} • ★ 4.9</div>
              </div>
            </div>

            <button class="btn-outline" style="padding: 6px 14px; font-size: 0.8rem;" onclick="appStore.showToast('Calling Rider Rahul (+91 98765-12345)...', 'info')">
              📞 Call Partner
            </button>
          </div>

          <!-- Order Items Recap -->
          <div style="border-top: 1px solid #E5E7EB; padding-top: 14px; margin-bottom: 20px;">
            <div style="font-size: 0.82rem; font-weight: 700; color: #6B7280; margin-bottom: 8px;">Order Details:</div>
            ${order.items.map(it => `
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                <span>${it.quantity}× ${escapeHtml(it.name)}</span>
                <strong style="color: #1F2937;">₹${it.price * it.quantity}</strong>
              </div>
            `).join('')}
            <div style="display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 800; margin-top: 8px; padding-top: 8px; border-top: 1px dashed #E5E7EB;">
              <span>Total Paid:</span>
              <span style="color: #F97316;">₹${order.total}</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px;">
            <button class="btn-outline" style="flex: 1; justify-content: center;" onclick="appStore.setTrackerOpen(false)">
              Close
            </button>
            <button class="btn-primary" style="flex: 2; justify-content: center;" onclick="appStore.setTrackerOpen(false); appStore.setView('menu');">
              Continue Shopping 🛍️
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
