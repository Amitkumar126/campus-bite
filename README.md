# 🍔 CAMPUSBITE — Student Food Delivery Web App

> **"Healthy Meals. Happy Students."**  
> A college-focused food ordering and delivery web application platform designed specifically for university students, hostel residents, and campus canteens.

---

## 📌 Executive Summary & Project Identity

* **Project Name:** CampusBite
* **Tagline:** Healthy Meals. Happy Students.
* **Target Audience:** College students, hostel roommates, faculty & staff, campus cafeterias, and independent student snack points.
* **Core Problem:** Students have limited break periods between lectures (10–15 mins), limited pocket budgets, and crowded campus canteens. External delivery apps charge high platform fees and cannot deliver to internal campus locations (e.g., *"Academic Block B, Room 304"* or *"Hostel Wing Gate"*).
* **The Solution:** A centralized campus digital dining ecosystem offering:
  1. Designated campus drop-off zones and zero-fee counter pickup.
  2. Pocket-friendly student meals (Under ₹100 category & <15 min fast prep filter).
  3. Roommate group ordering with automatic per-person bill split calculations.
  4. 5-step live visual order tracking with student runner details.
  5. CampusBite AI Dining Assistant for personalized recommendations.
  6. Dedicated Admin & Vendor Kitchen portals for end-to-end operation.

---

## 🚀 Quick Start (Running the Application)

### Option 1: Automatic Local Server (Recommended)
Run the included Python 3 server:
```bash
python3 start.py
```
*Or execute the launcher script:*
```bash
./start.sh
```
*This starts a local development server at `http://localhost:3000` and automatically launches your browser.*

### Option 2: Direct Browser Launch
Open `index.html` directly in any modern web browser (Google Chrome, Safari, Edge, Firefox, Brave):
```bash
open index.html
```

---

## 🎯 Key Features & Modules

### 1. 🍽️ Food Discovery & Smart Search
* **Search Engine:** Real-time search across dish names, descriptions, categories, and campus restaurants.
* **Categories:** 🍔 Burgers, 🍕 Pizza, 🍜 Noodles & Momos, 🥪 Sandwiches, 🍛 Indian Meals, 🥗 Healthy Bowls, ☕ Beverages & Brews, 🍰 Desserts & Bakes, 🍟 Quick Snacks.
* **Quick Filters:**
  * 🏷️ **Under ₹100 Only:** Pocket-friendly student meals.
  * ⚡ **Quick Prep (<15 min):** Meals ready before your next lecture.
  * 🥬 **Pure Veg Toggle:** Instant vegetarian filter.
  * 🥗 **Healthy & Protein:** Fitness bowls and fresh cold-pressed juices.
  * 🌙 **Midnight Maggi:** Late night hostel snacks.

### 2. 🏪 Campus Outlets (Restaurants)
* **Verified Campus Spots:**
  * **Campus Cafe:** Indian, Snacks, Beverages, Burgers (Academic Block 1).
  * **Student Kitchen:** Homestyle thalis and curries (Central Mess Quad).
  * **Green Bites:** Clean eating, fitness bowls, and fresh juices (Sports Complex).
  * **Campus Bakery & Brews:** Muffins, brownies, and cold coffee (Central Library).
  * **Night Canteen & Maggi Point:** Midnight cheese maggi and chai (Hostel Block B).
  * **Spice Junction & Pizzeria:** Thin crust pizzas and biryani bowls (Student Center).
* Dedicated restaurant menu pages with category navigation tabs and open/closed status.

### 3. ⚙️ Food Customization Modal
* Portion / Size Selection (e.g., *Standard Single*, *Double Patty Monster*, *10-inch Roommate Size*).
* Add-ons & Extras with live price additions (e.g., *Extra Cheddar Cheese +₹20*, *Smoky Peri-Peri Dip +₹10*).
* Special kitchen cooking instructions note (e.g., *"Less spicy, extra napkins"*).
* Quantity controls with instant subtotal calculation.

### 4. 🛒 Dynamic Cart & E-Commerce Logic
* Slide-over cart drawer with responsive animations.
* Delivery vs. Counter Pickup mode toggle (*Pickup sets delivery fee to ₹0*).
* Working Student Promo Codes:
  * `CAMPUS20` — 20% OFF (First order offer)
  * `FIRSTBITE` — Flat ₹40 OFF (Welcome deal)
  * `STUDENT50` — Flat ₹50 OFF (Group roommate deal)
  * `NIGHTOWL` — Free Delivery on hostel orders
* Complete bill breakdown: Item Subtotal, Student Discount, Campus Delivery Fee, Eco Packaging Fee, Final Total.

### 5. 💳 Multi-Step Campus Checkout
* **Step 1 — Delivery:** Preset campus spots (*Main Gate, Central Library, Academic Block A/B, Hostel A/B, Cafeteria, Sports Complex*) plus custom room/desk input.
* **Step 2 — Payment:** Campus Student Wallet (1-tap instant pay), Instant UPI / QR code simulation, Credit/Debit card, and Cash on Delivery.
* **Step 3 — Order Review:** Final inspection and celebratory confetti order placement.

### 6. 🚴 Live Visual Order Tracking Timeline
* 5-step visual status progression:
  1. ✓ Order Placed
  2. ✓ Restaurant Accepted
  3. 🍳 Food Being Prepared
  4. 🚴 Out for Delivery (Campus runner on electric bike)
  5. 📍 Delivered
* **Simulate Next Step ⏩ button:** Built directly into the tracker so college evaluators can test the entire lifecycle in seconds.
* Delivery partner profile card (*Ruler Rahul Sharma • Campus E-Bike #08 • 4.9★*).

### 7. 👥 Roommate Group Ordering
* Create custom room names (e.g., *"Hostel Room 204 Dinner"*).
* Generates a 6-digit campus room code (e.g., `CB-8492`) with 1-click clipboard copy.
* Simulated friends joining with their personal food orders.
* Automatic per-person bill split calculation showing how much each roommate owes.
* One-click checkout with group discounts applied.

### 8. 🤖 CampusBite AI Assistant (Floating Chatbot)
* Interactive conversational assistant situated in the bottom-right corner.
* Natural language matching for budget queries (*"Find food under ₹100"*), nutrition (*"Healthy protein meals"*), and order tracking (*"Where is my order?"*).
* Displays interactive mini food cards right inside the chat with direct 1-tap "Add to Cart" buttons.

### 9. 🛡️ Admin & 👨‍🍳 Vendor Dashboards
* **Admin Dashboard:**
  * Metric cards: Total Orders, Platform Revenue, Active Outlets, Registered Students.
  * Responsive SVG data charts: Peak campus dining hours (Lunch & Dinner curves) and top-selling food distribution.
  * Live order dispatch stream with status update controls.
  * Outlet manager & Add New Food item modal.
* **Vendor Kitchen View (Campus Cafe):**
  * Live kitchen order queue with one-click workflow (*Accept -> Preparing -> Ready -> Dispatched*).
  * Menu stock toggle switches to mark items in/out of stock.
  * Sound and kitchen bell simulation.

### 10. 👤 Student Profile & Campus Wallet
* Student digital ID card (*Name, College, Roll Number, Hostel Room*).
* Campus Wallet balance with one-tap "+ Add ₹200 Demo" top-up simulation.
* Order history with "View Tracker" and instant "Order Again" re-ordering.
* Saved favorites grid.

---

## 🎨 UI/UX Design System & Color Palette

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| **Primary (Food Orange)** | `#F97316` / `#EA580C` | Primary buttons, active tabs, price accents, branding |
| **Secondary (Deep Green)** | `#064E3B` / `#059669` | Veg badges, healthy food tags, success status |
| **Cream Canvas** | `#FDFBF7` / `#F8F5EE` | Warm, welcoming background canvas |
| **Text Charcoal** | `#1F2937` / `#4B5563` | Crisp headings and readable body text |
| **Border Neutral** | `#E5E7EB` / `#F3F4F6` | Subtle separators and card borders |
| **Typography** | `Poppins, sans-serif` | Modern, clean geometric sans-serif |

---

## 📂 Project Architecture

```
anti gravity portfolio/
├── index.html                   # Master entry point
├── start.py                     # Python 3 development server & auto-browser launch
├── start.sh                     # Quick execution script
├── README.md                    # Project documentation
│
├── css/
│   └── styles.css               # Comprehensive CSS design system & tokens
│
└── js/
    ├── app.js                   # Master application orchestrator & router
    ├── data/
    │   └── mockData.js          # Master catalog: meals, restaurants, categories, offers, locations
    ├── state/
    │   └── store.js             # Reactive central state store with LocalStorage persistence
    └── components/
        ├── Navbar.js            # Sticky navigation, mobile drawer & capstone banner
        ├── Hero.js              # Hero typography, statistics & quick filter pills
        ├── FoodComponents.js    # Food card, category grid & customization modal
        ├── RestaurantComponents.js # Campus outlets grid & restaurant menu detail view
        ├── CartAndCheckout.js   # Cart drawer, multi-step checkout & live order tracker
        ├── GroupOrderModal.js   # Roommate group ordering & bill split calculator
        ├── Chatbot.js           # CampusBite AI Assistant floating widget
        ├── Dashboards.js        # Admin analytics & Vendor kitchen live queues
        └── ProfileAndStaticViews.js # Profile, Deals, About, Contact & Showcase docs
```

---

## 🧪 Demonstration & Evaluation Walkthrough

Follow these simple steps during an evaluation or demo:

1. **Explore the Landing Page:**
   * Observe the hero typography, statistics, floating guarantee badges, and the capstone banner.
   * Click any quick filter pill (e.g., **"Under ₹100 Only"** or **"Pure Veg"**).
2. **Search for Food:**
   * Type `"maggi"` or `"burger"` in the search bar. Observe instant dynamic matching.
3. **Customize and Add to Cart:**
   * Click any food card to open the **Food Customization Modal**.
   * Change portion size to *Double Patty*, select add-ons (*Extra Cheese*), and click **"Add to Cart"**.
4. **Inspect the Cart:**
   * Click the Cart icon to open the **Slide-Over Drawer**.
   * Tap the **`CAMPUS20`** promo chip to see the 20% student discount applied.
5. **Checkout & Place Order:**
   * Click **"Proceed to Checkout"**.
   * Select a campus destination (e.g., *Central Library*) and choose **Campus Student Wallet**.
   * Click **"Place Order"**.
6. **Simulate Live Delivery Tracking:**
   * The **Live Order Tracker** opens automatically.
   * Click the **"Simulate Next Step ⏩"** button to watch the live status advance from *Accepted* to *Preparing* to *Out for Delivery* to *Delivered*!
7. **Test Group Ordering:**
   * Click **"Group Order 👥"** in the navigation bar.
   * Click **"+ Simulate Friend Joining"** to watch friends join and see the bill split update automatically.
8. **Test the CampusBite AI Bot:**
   * Click the floating robot button in the bottom-right corner.
   * Click the chip **"I want something under ₹100"** to see instant interactive recommendations with direct "Add +" buttons.
9. **Switch Roles (Admin & Vendor):**
   * Click **"Role: STUDENT"** in the top banner or scroll to the footer to open the **Admin Control Center** (charts & live orders) or **Vendor Kitchen Terminal**.

---

## 🎓 Academic Capstone Metadata

* **Project Type:** B.Tech Final Year / Portfolio Capstone Project
* **Author / Developer:** Amit Kumar
* **Specialization:** Full-Stack Web Development, UI/UX Engineering, Human-Computer Interaction
* **Year:** 2026

*© 2026 CampusBite. Developed for student portfolio demonstration.*
