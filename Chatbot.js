// CampusBite AI Assistant Floating Chatbot Component

function renderFloatingChatbot() {
  const isOpen = appStore.state.isChatOpen;
  const messages = appStore.state.chatMessages;

  return `
    <!-- Floating Circular Trigger Button -->
    <button 
      class="floating-chatbot-btn" 
      title="Open CampusBite AI Assistant"
      onclick="appStore.setChatOpen(!appStore.state.isChatOpen)"
    >
      ${isOpen ? '✕' : '🤖'}
      <span class="chat-online-pulse"></span>
    </button>

    <!-- Chatbot Window -->
    <div class="chatbot-window ${isOpen ? 'open' : ''}">
      <!-- Header -->
      <div class="chat-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: #F97316; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
            🤖
          </div>
          <div>
            <div style="font-weight: 800; font-size: 0.95rem; line-height: 1.1;">CampusBite AI</div>
            <div style="font-size: 0.72rem; opacity: 0.8; display: flex; align-items: center; gap: 4px;">
              <span style="width: 6px; height: 6px; background: #10B981; border-radius: 50%;"></span>
              Online • Campus Dining Guide
            </div>
          </div>
        </div>
        <button style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;" onclick="appStore.setChatOpen(false)">
          ✕
        </button>
      </div>

      <!-- Messages Thread -->
      <div class="chat-messages-wrap" id="chat-messages-container">
        ${messages.map(msg => `
          <div class="chat-bubble ${msg.sender}">
            <div style="white-space: pre-line;">${formatChatMessage(msg.text)}</div>

            <!-- In-chat food recommendations -->
            ${msg.foodItems && msg.foodItems.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
                ${msg.foodItems.map(item => `
                  <div style="background: #FDFBF7; border: 1px solid #E5E7EB; border-radius: 10px; padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <img src="${item.image}" alt="${escapeHtml(item.name)}" style="width: 38px; height: 38px; border-radius: 8px; object-fit: cover;">
                      <div>
                        <div style="font-size: 0.8rem; font-weight: 700; color: #1F2937;">${escapeHtml(item.name)}</div>
                        <div style="font-size: 0.72rem; color: #059669; font-weight: 700;">₹${item.price} • ${item.prepTime}</div>
                      </div>
                    </div>
                    <button class="add-btn" style="padding: 4px 10px; font-size: 0.75rem;" onclick="appStore.addToCart(window.MOCK_DATA.foods.find(f => f.id === '${item.id}'))">
                      Add +
                    </button>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- In-chat action button (e.g. open live tracker) -->
            ${msg.actionType === 'OPEN_TRACKER' ? `
              <div style="margin-top: 8px;">
                <button class="btn-primary" style="padding: 6px 12px; font-size: 0.75rem;" onclick="appStore.setTrackerOpen(true)">
                  Open Live Order Tracker 🚴
                </button>
              </div>
            ` : ''}

            <!-- Prompt chips -->
            ${msg.suggestions && msg.suggestions.length > 0 ? `
              <div class="chat-chips-wrap">
                ${msg.suggestions.map(sug => `
                  <button class="chat-chip" onclick="handleSendChatChip('${escapeQuotes(sug)}')">
                    ${sug}
                  </button>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Quick prompts row -->
      <div style="background: white; border-top: 1px solid #F3F4F6; padding: 6px 10px; display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none;">
        <button class="chat-chip" onclick="handleSendChatChip('I want something under ₹100')">🏷️ Under ₹100</button>
        <button class="chat-chip" onclick="handleSendChatChip('Where is my order?')">📍 Track Order</button>
        <button class="chat-chip" onclick="handleSendChatChip('Suggest a healthy meal')">🥗 Healthy</button>
        <button class="chat-chip" onclick="handleSendChatChip('Quick food under 15 min')">⚡ Quick Meal</button>
      </div>

      <!-- Chat Input Field -->
      <form class="chat-input-row" onsubmit="event.preventDefault(); handleSendChatMessage();">
        <input 
          type="text" 
          id="chat-user-input"
          class="chat-input" 
          placeholder="Ask about cheap meals, healthy food, tracking..."
          autocomplete="off"
        >
        <button type="submit" class="icon-btn" style="width: 36px; height: 36px; background: #F97316; color: white; border: none; font-size: 0.95rem;">
          ➤
        </button>
      </form>
    </div>
  `;
}

function handleSendChatMessage() {
  const input = document.getElementById('chat-user-input');
  if (!input || !input.value.trim()) return;
  const text = input.value.trim();
  input.value = '';
  appStore.sendChatMessage(text);
  scrollChatToBottom();
}

function handleSendChatChip(text) {
  appStore.sendChatMessage(text);
  scrollChatToBottom();
}

function scrollChatToBottom() {
  setTimeout(() => {
    const box = document.getElementById('chat-messages-container');
    if (box) box.scrollTop = box.scrollHeight;
  }, 100);
}

function formatChatMessage(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function escapeQuotes(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'");
}
