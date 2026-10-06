// CampusBite Hero Section Component

function renderHero() {
  return `
    <section class="hero-section">
      <!-- Left Column: Copy & CTAs -->
      <div class="hero-content">
        <div class="hero-tag">
          <span>🎓</span>
          <span>Exclusive for College & Hostel Students</span>
        </div>

        <h1 class="hero-heading">
          Healthy Meals.<br>
          <span class="gradient-text">Happy Students.</span>
        </h1>

        <p class="hero-subtext">
          Delicious, affordable meals delivered right to your campus room, library desk, or academic block. Skip the canteen queues and fuel your study sessions with zero hassle.
        </p>

        <div class="hero-cta-group">
          <button class="btn-primary" style="padding: 14px 28px; font-size: 1rem;" onclick="appStore.setView('menu')">
            <span>Order Now</span>
            <span style="font-size: 1.1rem;">⚡</span>
          </button>

          <button class="btn-secondary" style="padding: 14px 26px; font-size: 1rem;" onclick="appStore.setView('restaurants')">
            <span>Campus Outlets</span>
            <span>🏪</span>
          </button>

          <button class="btn-outline" style="padding: 13px 22px; font-size: 0.95rem;" onclick="appStore.setGroupOrderOpen(true)">
            <span>Order Together 👥</span>
          </button>
        </div>

        <!-- Student Statistics -->
        <div class="hero-stats-row">
          <div class="hero-stat-item">
            <h3>50+</h3>
            <p>Pocket-Friendly Meals</p>
          </div>
          <div class="hero-stat-item">
            <h3 style="color: var(--secondary-light);">10+</h3>
            <p>Campus Outlets</p>
          </div>
          <div class="hero-stat-item">
            <h3 style="color: var(--primary);">15m</h3>
            <p>Avg Delivery Speed</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Visual Collage with Floating Interactive Cards -->
      <div class="hero-visual-card">
        <div class="hero-image-wrap">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80" 
            alt="Delicious campus food meals"
            loading="lazy"
          >
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%);"></div>
          
          <div style="position: absolute; bottom: 20px; right: 20px; background: rgba(0,0,0,0.65); backdrop-filter: blur(8px); padding: 8px 14px; border-radius: var(--radius-full); color: white; font-size: 0.8rem; font-weight: 600;">
            📍 Verified Campus Kitchens
          </div>
        </div>

        <!-- Floating Card 1: Fast Delivery -->
        <div class="floating-chip chip-delivery">
          <div class="chip-icon" style="background: #ECFDF5; color: #059669;">
            🚴
          </div>
          <div>
            <div style="font-size: 0.88rem; font-weight: 700; color: #1F2937;">Fast Campus Delivery</div>
            <div style="font-size: 0.75rem; color: #6B7280;">Straight to your Hostel / Dept</div>
          </div>
        </div>

        <!-- Floating Card 2: Student Discount -->
        <div class="floating-chip chip-discount">
          <div class="chip-icon" style="background: #FFF7ED; color: #EA580C;">
            🏷️
          </div>
          <div>
            <div style="font-size: 0.88rem; font-weight: 700; color: #1F2937;">20% Student Discount</div>
            <div style="font-size: 0.75rem; color: #6B7280;">Use code <strong>CAMPUS20</strong></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Filter Badges -->
    <div class="quick-pills-row">
      <span style="font-size: 0.82rem; font-weight: 700; color: #6B7280; text-transform: uppercase; margin-right: 4px;">Quick Picks:</span>
      
      <button class="pill-btn ${appStore.state.under100Only ? 'active' : ''}" onclick="appStore.toggleUnder100Only()">
        <span>🏷️</span>
        <span>Under ₹100 Only</span>
      </button>

      <button class="pill-btn ${appStore.state.quickOnly ? 'active' : ''}" onclick="appStore.toggleQuickOnly()">
        <span>⚡</span>
        <span>Quick Prep (<15m)</span>
      </button>

      <button class="pill-btn ${appStore.state.vegOnly ? 'active' : ''}" onclick="appStore.toggleVegOnly()">
        <span>🥬</span>
        <span>Pure Veg</span>
      </button>

      <button class="pill-btn ${appStore.state.healthyOnly ? 'active' : ''}" onclick="appStore.toggleHealthyOnly()">
        <span>🥗</span>
        <span>Healthy & Protein</span>
      </button>

      <button class="pill-btn" onclick="appStore.setCategory('noodles'); appStore.setView('menu')">
        <span>🌙</span>
        <span>Midnight Maggi & Canteen</span>
      </button>

      <button class="pill-btn" onclick="appStore.resetFilters(); appStore.setView('menu')">
        <span>🔄</span>
        <span>Reset Filters</span>
      </button>
    </div>
  `;
}
