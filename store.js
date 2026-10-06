// CampusBite Centralized Reactive State Store
// Provides reactive listeners, localStorage synchronization, and state mutations

class Store {
  constructor() {
    this.listeners = new Set();
    this.loadInitialState();
  }

  loadInitialState() {
    // Restore or initialize localStorage
    const savedCart = this.getStorage('campusbite_cart', []);
    const savedFavorites = this.getStorage('campusbite_favorites', ['food-1', 'food-3', 'food-7']);
    const savedOrders = this.getStorage('campusbite_orders', window.MOCK_DATA.initialOrders);
    const savedUser = this.getStorage('campusbite_user', window.MOCK_DATA.demoUser);
    const savedWallet = this.getStorage('campusbite_wallet', 450);

    this.state = {
      // User & Auth
      currentUser: savedUser,
      currentRole: savedUser.role || 'student', // 'student' | 'vendor' | 'admin'
      walletBalance: savedWallet,

      // Cart & Checkout
      cart: savedCart,
      orderType: 'delivery', // 'delivery' | 'pickup'
      selectedLocation: 'Academic Block A (Main Lobby / Reception)',
      customLocation: '',
      appliedOffer: null,
      deliveryNotes: '',

      // Favorites
      favorites: new Set(savedFavorites),

      // Catalog & Filters
      searchQuery: '',
      activeCategory: 'all',
      vegOnly: false,
      under100Only: false,
      quickOnly: false,
      healthyOnly: false,
      selectedRestaurantId: null,
      sortBy: 'popular', // 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'time'

      // Orders
      orders: savedOrders,
      activeTrackingOrder: savedOrders[1] || savedOrders[0] || null,

      // Group Ordering
      groupOrder: {
        isActive: false,
        roomCode: '',
        roomName: '',
        creator: 'Amit Kumar',
        members: [
          { id: 'm1', name: 'Amit Kumar (Host)', avatar: '👨‍🎓', itemsCount: 1, total: 99 },
          { id: 'm2', name: 'Priya S.', avatar: '👩‍🎓', itemsCount: 1, total: 65 },
          { id: 'm3', name: 'Rohan M.', avatar: '🧑‍🎓', itemsCount: 2, total: 138 }
        ]
      },

      // Chatbot
      chatMessages: [
        {
          id: 'msg-1',
          sender: 'bot',
          text: 'Hey Amit! 👋 I am your CampusBite Assistant. Looking for a budget meal under ₹100, quick bite before class, or need help tracking your lunch?',
          timestamp: 'Just now',
          suggestions: ['Budget meals under ₹100', 'Quick food (<15 min)', 'High-protein healthy options', 'Where is my order?']
        }
      ],
      isChatOpen: false,

      // Modals & Drawers
      isCartOpen: false,
      isAuthOpen: false,
      isCheckoutOpen: false,
      isTrackerOpen: false,
      isGroupOrderOpen: false,
      isShowcaseOpen: false,
      selectedFoodForModal: null,

      // Navigation / View
      currentView: 'home', // 'home' | 'menu' | 'restaurants' | 'restaurant-detail' | 'offers' | 'about' | 'contact' | 'profile' | 'admin' | 'vendor'
      activeRestaurantDetailId: null,

      // Dynamic Outlets & Foods (for Admin / Vendor editing)
      restaurants: [...window.MOCK_DATA.restaurants],
      foods: [...window.MOCK_DATA.foods]
    };
  }

  getStorage(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event, payload) {
    this.listeners.forEach(fn => fn(this.state, event, payload));
  }

  // --- ACTIONS ---

  // Navigation
  setView(view, extra = {}) {
    this.state.currentView = view;
    if (extra.restaurantId) {
      this.state.activeRestaurantDetailId = extra.restaurantId;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify('VIEW_CHANGED', view);
  }

  // Filters
  setSearchQuery(q) {
    this.state.searchQuery = q;
    this.notify('FILTER_CHANGED');
  }

  setCategory(catId) {
    this.state.activeCategory = catId;
    this.notify('FILTER_CHANGED');
  }

  toggleVegOnly() {
    this.state.vegOnly = !this.state.vegOnly;
    this.notify('FILTER_CHANGED');
  }

  toggleUnder100Only() {
    this.state.under100Only = !this.state.under100Only;
    this.notify('FILTER_CHANGED');
  }

  toggleQuickOnly() {
    this.state.quickOnly = !this.state.quickOnly;
    this.notify('FILTER_CHANGED');
  }

  toggleHealthyOnly() {
    this.state.healthyOnly = !this.state.healthyOnly;
    this.notify('FILTER_CHANGED');
  }

  setSortBy(sort) {
    this.state.sortBy = sort;
    this.notify('FILTER_CHANGED');
  }

  resetFilters() {
    this.state.searchQuery = '';
    this.state.activeCategory = 'all';
    this.state.vegOnly = false;
    this.state.under100Only = false;
    this.state.quickOnly = false;
    this.state.healthyOnly = false;
    this.state.sortBy = 'popular';
    this.notify('FILTER_CHANGED');
  }

  // Favorites
  toggleFavorite(foodId) {
    if (this.state.favorites.has(foodId)) {
      this.state.favorites.delete(foodId);
      this.showToast('Removed from favorites', 'info');
    } else {
      this.state.favorites.add(foodId);
      this.showToast('Saved to your favorites! ❤️', 'success');
    }
    this.setStorage('campusbite_favorites', Array.from(this.state.favorites));
    this.notify('FAVORITES_UPDATED');
  }

  // Cart Management
  addToCart(food, quantity = 1, selectedSize = null, selectedAddOns = [], instructions = '') {
    const size = selectedSize || (food.customization?.sizes?.[0] ? food.customization.sizes[0].name : 'Standard');
    const sizePrice = food.customization?.sizes?.find(s => s.name === size)?.price || 0;
    const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
    const unitPrice = food.price + sizePrice + addOnsTotal;

    const cartItemId = `${food.id}-${size}-${selectedAddOns.map(a => a.name).sort().join('|')}`;
    const existingIndex = this.state.cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
    } else {
      this.state.cart.push({
        cartItemId,
        id: food.id,
        name: food.name,
        restaurantId: food.restaurantId,
        restaurantName: food.restaurantName,
        basePrice: food.price,
        unitPrice,
        size,
        addOns: selectedAddOns,
        instructions,
        image: food.image,
        isVeg: food.isVeg,
        quantity
      });
    }

    this.setStorage('campusbite_cart', this.state.cart);
    this.showToast(`Added ${quantity}× ${food.name} to cart! 🛒`, 'success');
    this.notify('CART_UPDATED');
  }

  updateCartQuantity(cartItemId, delta) {
    const index = this.state.cart.findIndex(i => i.cartItemId === cartItemId);
    if (index === -1) return;

    const newQty = this.state.cart[index].quantity + delta;
    if (newQty <= 0) {
      const removed = this.state.cart[index].name;
      this.state.cart.splice(index, 1);
      this.showToast(`Removed ${removed} from cart`, 'info');
    } else {
      this.state.cart[index].quantity = newQty;
    }

    this.setStorage('campusbite_cart', this.state.cart);
    this.notify('CART_UPDATED');
  }

  removeFromCart(cartItemId) {
    this.state.cart = this.state.cart.filter(i => i.cartItemId !== cartItemId);
    this.setStorage('campusbite_cart', this.state.cart);
    this.notify('CART_UPDATED');
    this.showToast('Item removed from cart', 'info');
  }

  clearCart() {
    this.state.cart = [];
    this.state.appliedOffer = null;
    this.setStorage('campusbite_cart', []);
    this.notify('CART_UPDATED');
  }

  setOrderType(type) {
    this.state.orderType = type; // 'delivery' | 'pickup'
    this.notify('ORDER_TYPE_CHANGED');
  }

  setLocation(loc, custom = '') {
    this.state.selectedLocation = loc;
    this.state.customLocation = custom;
    this.notify('LOCATION_CHANGED');
  }

  applyOffer(offerCode) {
    const offer = window.MOCK_DATA.offers.find(o => o.code.toUpperCase() === offerCode.trim().toUpperCase());
    if (!offer) {
      this.showToast('Invalid coupon code. Try CAMPUS20 or FIRSTBITE!', 'error');
      return false;
    }

    const subtotal = this.getCartSubtotal();
    if (subtotal < offer.minOrder) {
      this.showToast(`Minimum order ₹${offer.minOrder} required for ${offer.code}`, 'warning');
      return false;
    }

    this.state.appliedOffer = offer;
    this.showToast(`Offer ${offer.code} applied successfully! 🎉`, 'success');
    this.notify('CART_UPDATED');
    return true;
  }

  removeOffer() {
    this.state.appliedOffer = null;
    this.showToast('Offer removed', 'info');
    this.notify('CART_UPDATED');
  }

  // Calculations
  getCartSubtotal() {
    return this.state.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  getCartCount() {
    return this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartCalculations() {
    const subtotal = this.getCartSubtotal();
    let deliveryFee = this.state.orderType === 'pickup' ? 0 : 15;
    const packagingFee = subtotal > 0 ? 5 : 0;
    let discount = 0;

    if (this.state.appliedOffer && subtotal >= this.state.appliedOffer.minOrder) {
      if (this.state.appliedOffer.discountPercent > 0) {
        discount = Math.min((subtotal * this.state.appliedOffer.discountPercent) / 100, this.state.appliedOffer.maxDiscount);
      } else if (this.state.appliedOffer.flatDiscount) {
        discount = this.state.appliedOffer.flatDiscount;
      } else if (this.state.appliedOffer.freeDelivery) {
        deliveryFee = 0;
      }
    }

    // Free delivery on orders > ₹199
    if (subtotal >= 199 && this.state.orderType === 'delivery') {
      deliveryFee = 0;
    }

    const total = Math.max(0, Math.round(subtotal + deliveryFee + packagingFee - discount));

    return {
      subtotal,
      deliveryFee,
      packagingFee,
      discount: Math.round(discount),
      total
    };
  }

  // Place Order
  placeOrder(paymentMethod = 'Campus Wallet') {
    if (this.state.cart.length === 0) {
      this.showToast('Your cart is empty!', 'error');
      return null;
    }

    const calc = this.getCartCalculations();
    const orderId = `CB-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = {
      id: orderId,
      restaurantId: this.state.cart[0].restaurantId,
      restaurantName: this.state.cart[0].restaurantName,
      items: this.state.cart.map(i => ({
        name: i.name,
        quantity: i.quantity,
        size: i.size,
        price: i.unitPrice
      })),
      total: calc.total,
      subtotal: calc.subtotal,
      deliveryFee: calc.deliveryFee,
      discount: calc.discount,
      status: 'Order Placed',
      stepIndex: 0, // 0: Placed, 1: Accepted, 2: Preparing, 3: Out for Delivery, 4: Delivered
      date: 'Just now',
      timestamp: Date.now(),
      deliveryLocation: this.state.orderType === 'pickup' ? 'Campus Counter Pickup' : (this.state.customLocation || this.state.selectedLocation),
      orderType: this.state.orderType,
      paymentMethod,
      partner: {
        name: 'Rahul Sharma',
        phone: '+91 98765 12345',
        vehicle: 'Campus E-Bike #08',
        rating: 4.9
      }
    };

    // Deduct wallet if paid via wallet
    if (paymentMethod === 'Campus Wallet') {
      if (this.state.walletBalance < calc.total) {
        this.showToast('Insufficient wallet balance! Please choose UPI or top-up.', 'error');
        return null;
      }
      this.state.walletBalance -= calc.total;
      this.setStorage('campusbite_wallet', this.state.walletBalance);
    }

    this.state.orders.unshift(newOrder);
    this.setStorage('campusbite_orders', this.state.orders);

    this.state.activeTrackingOrder = newOrder;
    this.clearCart();
    this.state.isCheckoutOpen = false;
    this.state.isTrackerOpen = true;

    this.showToast(`Order ${orderId} placed successfully! 🎉`, 'success');
    this.notify('ORDER_PLACED', newOrder);

    // Auto advance simulation
    this.startOrderSimulation(newOrder.id);
    return newOrder;
  }

  startOrderSimulation(orderId) {
    const statuses = [
      'Order Placed',
      'Restaurant Accepted',
      'Food Being Prepared',
      'Out for Delivery',
      'Delivered'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      const order = this.state.orders.find(o => o.id === orderId);
      if (!order || currentStep >= statuses.length - 1) {
        clearInterval(interval);
        return;
      }
      currentStep++;
      order.status = statuses[currentStep];
      order.stepIndex = currentStep;
      this.setStorage('campusbite_orders', this.state.orders);
      this.notify('ORDER_STATUS_CHANGED', order);
      this.showToast(`Order ${orderId}: ${order.status}! 🔔`, 'info');
    }, 15000); // 15 sec progression
  }

  manualAdvanceOrderStatus(orderId) {
    const statuses = [
      'Order Placed',
      'Restaurant Accepted',
      'Food Being Prepared',
      'Out for Delivery',
      'Delivered'
    ];
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return;

    const nextStep = Math.min(statuses.length - 1, (order.stepIndex || 0) + 1);
    order.stepIndex = nextStep;
    order.status = statuses[nextStep];
    this.setStorage('campusbite_orders', this.state.orders);
    this.notify('ORDER_STATUS_CHANGED', order);
    this.showToast(`Simulated status updated to: ${order.status}`, 'info');
  }

  // Modals
  openFoodModal(food) {
    this.state.selectedFoodForModal = food;
    this.notify('MODAL_STATE_CHANGED');
  }

  closeFoodModal() {
    this.state.selectedFoodForModal = null;
    this.notify('MODAL_STATE_CHANGED');
  }

  setCartOpen(open) {
    this.state.isCartOpen = open;
    this.notify('MODAL_STATE_CHANGED');
  }

  setCheckoutOpen(open) {
    this.state.isCheckoutOpen = open;
    this.notify('MODAL_STATE_CHANGED');
  }

  setTrackerOpen(open, order = null) {
    if (order) this.state.activeTrackingOrder = order;
    this.state.isTrackerOpen = open;
    this.notify('MODAL_STATE_CHANGED');
  }

  setGroupOrderOpen(open) {
    this.state.isGroupOrderOpen = open;
    this.notify('MODAL_STATE_CHANGED');
  }

  setAuthOpen(open) {
    this.state.isAuthOpen = open;
    this.notify('MODAL_STATE_CHANGED');
  }

  setShowcaseOpen(open) {
    this.state.isShowcaseOpen = open;
    this.notify('MODAL_STATE_CHANGED');
  }

  setChatOpen(open) {
    this.state.isChatOpen = open;
    this.notify('MODAL_STATE_CHANGED');
  }

  // Auth / Role Switch
  switchRole(role) {
    this.state.currentRole = role;
    if (role === 'student') {
      this.state.currentUser = window.MOCK_DATA.demoUser;
    } else if (role === 'vendor') {
      this.state.currentUser = window.MOCK_DATA.vendorUser;
    } else if (role === 'admin') {
      this.state.currentUser = window.MOCK_DATA.adminUser;
    }
    this.setStorage('campusbite_user', this.state.currentUser);
    this.showToast(`Switched account to: ${this.state.currentUser.name} (${role.toUpperCase()})`, 'info');
    this.notify('USER_CHANGED');
  }

  addWalletMoney(amount = 200) {
    this.state.walletBalance += amount;
    this.setStorage('campusbite_wallet', this.state.walletBalance);
    this.showToast(`Added ₹${amount} to Campus Wallet! New balance: ₹${this.state.walletBalance}`, 'success');
    this.notify('WALLET_UPDATED');
  }

  // Group Order
  createGroupOrder(roomName) {
    const code = `CB-${Math.floor(1000 + Math.random() * 9000)}`;
    this.state.groupOrder = {
      isActive: true,
      roomCode: code,
      roomName: roomName || 'Hostel Room 204 Dinner',
      creator: this.state.currentUser.name,
      members: [
        { id: 'm1', name: `${this.state.currentUser.name} (Host)`, avatar: '👨‍🎓', itemsCount: 1, total: 99 },
        { id: 'm2', name: 'Priya Sharma', avatar: '👩‍🎓', itemsCount: 1, total: 65 },
        { id: 'm3', name: 'Rohan Verma', avatar: '🧑‍🎓', itemsCount: 2, total: 138 }
      ]
    };
    this.showToast(`Group order room "${this.state.groupOrder.roomName}" created! Room Code: ${code}`, 'success');
    this.notify('GROUP_ORDER_UPDATED');
  }

  // Chatbot message handling
  sendChatMessage(text) {
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };
    this.state.chatMessages.push(userMsg);
    this.notify('CHAT_UPDATED');

    // Simulate smart bot response based on mock data
    setTimeout(() => {
      const response = this.generateBotResponse(text);
      this.state.chatMessages.push(response);
      this.notify('CHAT_UPDATED');
    }, 600);
  }

  generateBotResponse(input) {
    const q = input.toLowerCase();
    const foods = window.MOCK_DATA.foods;

    if (q.includes('100') || q.includes('budget') || q.includes('cheap')) {
      const budgetItems = foods.filter(f => f.price <= 99).slice(0, 3);
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Here are our best student pocket-friendly picks under ₹100! 🏷️`,
        foodItems: budgetItems,
        timestamp: 'Just now',
        suggestions: ['Order Special Veg Burger (₹99)', 'Peri Peri Maggi (₹69)', 'Belgian Cold Coffee (₹65)']
      };
    }

    if (q.includes('healthy') || q.includes('protein') || q.includes('salad') || q.includes('diet')) {
      const healthyItems = foods.filter(f => f.isHealthy).slice(0, 3);
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Looking for clean eating? Check out these high-protein and nutrient-packed bowls from Green Bites:`,
        foodItems: healthyItems,
        timestamp: 'Just now',
        suggestions: ['Avocado Sprout Salad', 'Grilled Chicken Brown Rice', 'Fresh Watermelon Juice']
      };
    }

    if (q.includes('track') || q.includes('where') || q.includes('order status') || q.includes('delivery')) {
      const active = this.state.activeTrackingOrder;
      if (active) {
        return {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Your order **#${active.id}** from **${active.restaurantName}** is currently: **${active.status}**! Estimated delivery to ${active.deliveryLocation} in 12–15 mins. 🚴`,
          actionType: 'OPEN_TRACKER',
          timestamp: 'Just now',
          suggestions: ['Open Live Order Tracker', 'Contact Rider Rahul', 'Explore More Food']
        };
      }
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `You have no active in-transit orders right now. Would you like to check past orders in your profile?`,
        timestamp: 'Just now',
        suggestions: ['Order Now', 'View My Past Orders']
      };
    }

    if (q.includes('quick') || q.includes('fast') || q.includes('15 min') || q.includes('rush')) {
      const quickItems = foods.filter(f => f.prepMinutes <= 12).slice(0, 3);
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Running late for a lecture? These items are prepared in under 12 minutes! ⚡`,
        foodItems: quickItems,
        timestamp: 'Just now',
        suggestions: ['Double Cheese Maggi', 'Bombay Grilled Sandwich', 'Cutting Chai Set']
      };
    }

    if (q.includes('offer') || q.includes('coupon') || q.includes('discount')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Top student codes right now:\n• **CAMPUS20** (20% OFF on first order)\n• **STUDENT50** (Flat ₹50 OFF on roommate orders)\n• **NIGHTOWL** (Free delivery past 9 PM)`,
        timestamp: 'Just now',
        suggestions: ['Apply CAMPUS20 to Cart', 'View All Student Deals']
      };
    }

    // Default search in foods
    const matches = foods.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
    if (matches.length > 0) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Found ${matches.length} matching student meal${matches.length > 1 ? 's' : ''} for "${input}":`,
        foodItems: matches.slice(0, 3),
        timestamp: 'Just now',
        suggestions: ['View full menu', 'Filter by Pure Veg', 'Explore Outlets']
      };
    }

    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `I'm here to make your campus dining smooth! You can ask me to find budget meals under ₹100, suggest healthy protein meals, track your current food order, or check active promo codes.`,
      timestamp: 'Just now',
      suggestions: ['Meals under ₹100 🏷️', 'Healthy protein options 🥗', 'Late night snack 🌙', 'Where is my order? 📍']
    };
  }

  // Toast Notification System
  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `campus-toast toast-${type} animate-slide-up`;

    const iconMap = {
      success: '✓',
      error: '✕',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <span class="toast-icon">${iconMap[type] || 'ℹ️'}</span>
      <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
}

// Global store instance
window.appStore = new Store();
