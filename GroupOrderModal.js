// CampusBite Group Ordering Feature (Hostel Room / Study Group Ordering)

function renderGroupOrderModal() {
  const isOpen = appStore.state.isGroupOrderOpen;
  if (!isOpen) return '';

  const group = appStore.state.groupOrder;

  return `
    <div class="modal-overlay open" id="group-order-modal" onclick="if(event.target === this) appStore.setGroupOrderOpen(false)">
      <div class="modal-card" style="max-width: 600px;">
        <button class="modal-close-btn" onclick="appStore.setGroupOrderOpen(false)">✕</button>

        <div style="padding: 24px;">
          <!-- Header -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
            <div style="width: 50px; height: 50px; border-radius: 14px; background: #FFF7ED; color: #EA580C; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: var(--shadow-sm);">
              👥
            </div>
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: #1F2937;">Group Ordering</h2>
              <p style="font-size: 0.82rem; color: #6B7280;">Hostel Roommates & Study Squad Orders</p>
            </div>
          </div>

          ${!group.isActive ? `
            <!-- Create New Group State -->
            <div style="background: #FDFBF7; border: 1px solid #E5E7EB; border-radius: var(--radius-lg); padding: 20px; margin-bottom: 24px;">
              <h3 style="font-size: 1.05rem; font-weight: 700; color: #1F2937; margin-bottom: 8px;">
                Start a New Group Order 🍕
              </h3>
              <p style="font-size: 0.85rem; color: #6B7280; line-height: 1.5; margin-bottom: 16px;">
                Create a shared room for your hostel wing, lab session, or project team. Everyone adds their own items, and CampusBite calculates the split automatically!
              </p>

              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #374151; margin-bottom: 6px;">
                  Group / Occasion Name:
                </label>
                <input 
                  type="text" 
                  id="group-room-name-input" 
                  placeholder="e.g. Hostel Room 204 Dinner or CS Lab Study Group"
                  value="Hostel Room 204 Dinner"
                  style="width: 100%; border: 1.5px solid #E5E7EB; border-radius: var(--radius-md); padding: 10px 14px; font-family: inherit; font-size: 0.9rem;"
                >
              </div>

              <button class="btn-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="handleCreateGroupOrder()">
                <span>Create Group Order Room</span>
                <span>✨</span>
              </button>
            </div>

            <!-- Join with code -->
            <div style="background: white; border: 1.5px dashed #D1D5DB; border-radius: var(--radius-lg); padding: 18px; text-align: center;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: #374151; margin-bottom: 8px;">Have a room code from a friend?</h4>
              <div style="display: flex; gap: 8px; max-width: 340px; margin: 0 auto;">
                <input 
                  type="text" 
                  id="group-join-code-input"
                  placeholder="e.g. CB-8492"
                  style="flex: 1; border: 1px solid #D1D5DB; border-radius: var(--radius-sm); padding: 8px 12px; font-family: monospace; text-transform: uppercase;"
                >
                <button class="btn-secondary" style="padding: 8px 16px;" onclick="handleJoinGroupCode()">
                  Join
                </button>
              </div>
            </div>
          ` : `
            <!-- Active Group State -->
            <div style="background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border: 1.5px solid #FDBA74; border-radius: var(--radius-lg); padding: 18px; margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                <div>
                  <span style="background: #EA580C; color: white; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-full); text-transform: uppercase;">ACTIVE ROOM</span>
                  <h3 style="font-size: 1.2rem; font-weight: 800; color: #1F2937; margin-top: 4px;">${escapeHtml(group.roomName)}</h3>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 0.72rem; color: #9A3412; font-weight: 600;">ROOM CODE</span>
                  <div style="font-size: 1.25rem; font-family: monospace; font-weight: 800; color: #C2410C;">${group.roomCode}</div>
                </div>
              </div>

              <div style="display: flex; gap: 8px; margin-top: 10px;">
                <button class="portfolio-action-btn" style="background: white; color: #1F2937; border-color: #FDBA74;" onclick="copyRoomCode('${group.roomCode}')">
                  📋 Copy Invite Code
                </button>
                <button class="portfolio-action-btn" style="background: #059669; color: white; border: none;" onclick="simulateFriendJoining()">
                  + Simulate Friend Joining
                </button>
              </div>
            </div>

            <!-- Members & Items List -->
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: #1F2937;">
                  Room Members (${group.members.length} Joined):
                </h4>
                <span style="font-size: 0.78rem; color: #059669; font-weight: 600;">● Live synchronized</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${group.members.map(m => `
                  <div style="background: white; border: 1px solid #E5E7EB; border-radius: var(--radius-md); padding: 12px 14px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 1.3rem;">${m.avatar}</span>
                      <div>
                        <div style="font-weight: 700; font-size: 0.88rem; color: #1F2937;">${escapeHtml(m.name)}</div>
                        <div style="font-size: 0.75rem; color: #6B7280;">${m.itemsCount} meal item${m.itemsCount === 1 ? '' : 's'} added</div>
                      </div>
                    </div>

                    <div style="text-align: right;">
                      <div style="font-size: 0.95rem; font-weight: 800; color: #1F2937;">₹${m.total}</div>
                      <span style="font-size: 0.7rem; color: #059669; font-weight: 600;">Share</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Combined Group Total & Bill Split -->
            <div style="background: #FDFBF7; border: 1px solid #E5E7EB; border-radius: var(--radius-md); padding: 14px; margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
                <span>Combined Subtotal:</span>
                <span>₹${group.members.reduce((sum, m) => sum + m.total, 0)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px; color: #059669; font-weight: 600;">
                <span>Roommate Group Discount (STUDENT50):</span>
                <span>−₹50</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 8px;">
                <span>Campus Delivery Fee:</span>
                <span style="color: #059669; font-weight: 700;">FREE (Shared)</span>
              </div>

              <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; border-top: 1px dashed #D1D5DB; padding-top: 8px;">
                <span>Group Order Total:</span>
                <span style="color: #F97316;">₹${Math.max(0, group.members.reduce((sum, m) => sum + m.total, 0) - 50)}</span>
              </div>
            </div>

            <div style="display: flex; gap: 10px;">
              <button class="btn-outline" style="flex: 1; justify-content: center;" onclick="handleResetGroup()">
                Leave Room
              </button>
              <button class="btn-primary" style="flex: 2; justify-content: center; padding: 12px;" onclick="handlePlaceGroupOrder()">
                <span>Place Group Order 👥</span>
              </button>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

function handleCreateGroupOrder() {
  const roomInput = document.getElementById('group-room-name-input');
  const name = roomInput ? roomInput.value.trim() : 'Hostel Room 204 Dinner';
  appStore.createGroupOrder(name);
  renderApp();
}

function handleJoinGroupCode() {
  const codeInput = document.getElementById('group-join-code-input');
  if (!codeInput || !codeInput.value.trim()) {
    appStore.showToast('Please enter a 6-digit room code', 'warning');
    return;
  }
  appStore.createGroupOrder(`Joined Room (${codeInput.value.toUpperCase()})`);
  renderApp();
}

function copyRoomCode(code) {
  navigator.clipboard?.writeText(code);
  appStore.showToast(`Room Code ${code} copied to clipboard! Share with roommates 📲`, 'success');
}

function simulateFriendJoining() {
  const names = ['Kavita R.', 'Siddharth V.', 'Ananya P.', 'Tanmay K.'];
  const avatars = ['👩‍🎓', '🧑‍🎓', '👩‍🦰', '🧑‍💻'];
  const picked = names[Math.floor(Math.random() * names.length)];
  const av = avatars[Math.floor(Math.random() * avatars.length)];
  const mockPrice = Math.floor(65 + Math.random() * 85);

  appStore.state.groupOrder.members.push({
    id: `m-${Date.now()}`,
    name: picked,
    avatar: av,
    itemsCount: 1,
    total: mockPrice
  });

  appStore.showToast(`${picked} just joined the group room and added an item! 🎉`, 'info');
  renderApp();
}

function handlePlaceGroupOrder() {
  // Pre-load items into cart for seamless checkout
  if (appStore.state.cart.length === 0) {
    appStore.addToCart(window.MOCK_DATA.foods[0], 2);
    appStore.addToCart(window.MOCK_DATA.foods[2], 1);
  }
  appStore.applyOffer('STUDENT50');
  appStore.setGroupOrderOpen(false);
  appStore.setCheckoutOpen(true);
}

function handleResetGroup() {
  appStore.state.groupOrder.isActive = false;
  appStore.showToast('Left group ordering room', 'info');
  renderApp();
}
