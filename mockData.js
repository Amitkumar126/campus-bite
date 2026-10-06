// CampusBite Mock Data & Master Catalog
// Designed for realistic student campus food delivery portfolio showcase

const MOCK_DATA = {
  categories: [
    { id: 'all', name: 'All Meals', icon: '🍽️', count: 28 },
    { id: 'burgers', name: 'Burgers', icon: '🍔', count: 5 },
    { id: 'pizza', name: 'Pizza', icon: '🍕', count: 4 },
    { id: 'noodles', name: 'Noodles & Momos', icon: '🍜', count: 4 },
    { id: 'sandwiches', name: 'Sandwiches', icon: '🥪', count: 4 },
    { id: 'indian', name: 'Indian Meals', icon: '🍛', count: 5 },
    { id: 'healthy', name: 'Healthy Bowls', icon: '🥗', count: 4 },
    { id: 'beverages', name: 'Beverages & Brews', icon: '☕', count: 5 },
    { id: 'desserts', name: 'Desserts & Bakes', icon: '🍰', count: 4 },
    { id: 'snacks', name: 'Quick Snacks', icon: '🍟', count: 5 }
  ],

  restaurants: [
    {
      id: 'rest-1',
      name: 'Campus Cafe',
      tagline: 'The student hub for rolls, chai & burgers',
      rating: 4.8,
      reviewsCount: 320,
      deliveryTime: '15–20 min',
      prepTimeAvg: '12 min',
      distance: '200m from Library',
      location: 'Academic Block 1, Ground Floor',
      categories: ['Indian', 'Snacks', 'Beverages', 'Burgers'],
      isOpen: true,
      minOrder: 49,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      logo: '☕',
      featured: true,
      badge: 'Most Popular',
      description: 'Campus Cafe has been the heart of student life since 2018. Famous for pocket-friendly snack combos, quick grilled sandwiches, and ice-cold brews between lectures.'
    },
    {
      id: 'rest-2',
      name: 'Student Kitchen',
      tagline: 'Homestyle wholesome thalis & curries',
      rating: 4.7,
      reviewsCount: 245,
      deliveryTime: '20–25 min',
      prepTimeAvg: '18 min',
      distance: '350m from Hostel Quad',
      location: 'Central Mess Quad, Gate 3',
      categories: ['Indian', 'Meals', 'Healthy'],
      isOpen: true,
      minOrder: 80,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      logo: '🍛',
      featured: true,
      badge: 'Best Thalis',
      description: 'Run by certified student-friendly caterers providing fresh home-cooked taste with low oil and high nutrition. Perfect for daily lunch and dinner.'
    },
    {
      id: 'rest-3',
      name: 'Green Bites',
      tagline: 'Clean eating, high protein & fitness bowls',
      rating: 4.9,
      reviewsCount: 180,
      deliveryTime: '15–20 min',
      prepTimeAvg: '10 min',
      distance: '150m from Sports Complex',
      location: 'Indoor Sports Complex & Gym Court',
      categories: ['Healthy', 'Vegetarian', 'Beverages'],
      isOpen: true,
      minOrder: 60,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      logo: '🥗',
      featured: true,
      badge: 'Fitness Favorite',
      description: 'Guilt-free student fuel! Packed with fresh sprouts, paneer, tofu, quinoa, and cold-pressed fruit juices tailored for athletes and health-conscious learners.'
    },
    {
      id: 'rest-4',
      name: 'Campus Bakery & Brews',
      tagline: 'Fresh bakes, cookies, brownies & espresso',
      rating: 4.8,
      reviewsCount: 290,
      deliveryTime: '10–15 min',
      prepTimeAvg: '8 min',
      distance: '50m from Central Library',
      location: 'Library Arcade, South Wing',
      categories: ['Bakery', 'Desserts', 'Beverages'],
      isOpen: true,
      minOrder: 40,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      logo: '🥐',
      featured: false,
      badge: 'Quick Pickup',
      description: 'Your late-night study companion. Freshly baked muffins, gooey walnut brownies, garlic puffs, and artisanal hazelnut cold coffees.'
    },
    {
      id: 'rest-5',
      name: 'Night Canteen & Maggi Point',
      tagline: 'Midnight munchies, spicy rolls & cheese maggi',
      rating: 4.6,
      reviewsCount: 410,
      deliveryTime: '15–20 min',
      prepTimeAvg: '10 min',
      distance: 'Hostel Block B Underpass',
      location: 'Hostel Block B Courtyard',
      categories: ['Snacks', 'Noodles', 'Beverages'],
      isOpen: true,
      minOrder: 40,
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
      logo: '🌙',
      featured: true,
      badge: 'Open Till 2 AM',
      description: 'The legendary night canteen catering to exam preps and late project coding marathons. Famous for Peri Peri Maggi, cheese burst toast, and cutting chai.'
    },
    {
      id: 'rest-6',
      name: 'Spice Junction & Pizzeria',
      tagline: 'Woodfire style student pizzas & biryanis',
      rating: 4.6,
      reviewsCount: 195,
      deliveryTime: '20–25 min',
      prepTimeAvg: '16 min',
      distance: '400m from Main Gate',
      location: 'Student Activity Center Food Court',
      categories: ['Pizza', 'Indian', 'Burgers'],
      isOpen: true,
      minOrder: 99,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      logo: '🍕',
      featured: false,
      badge: 'Combo Deals',
      description: 'Crispy thin crust personal pizzas, hyderabadi biryani bowls, and loaded cheesy garlic bread made for roommate sharing sessions.'
    }
  ],

  foods: [
    {
      id: 'food-1',
      name: 'Campus Special Veg Burger',
      restaurantId: 'rest-1',
      restaurantName: 'Campus Cafe',
      category: 'burgers',
      price: 99,
      originalPrice: 129,
      rating: 4.8,
      reviewsCount: 142,
      prepTime: '15–20 min',
      prepMinutes: 15,
      isVeg: true,
      isBestseller: true,
      isBudget: true,
      isQuick: false,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      description: 'Crispy herb-infused vegetable patty, sliced crunchy tomatoes, lettuce, caramelized onions and signature house sauce on a toasted sesame bun.',
      ingredients: ['Sesame Bun', 'Potato-Pea Herb Patty', 'Crisp Iceberg Lettuce', 'Fresh Sliced Tomatoes', 'Signature Garlic Mayo'],
      nutrition: { calories: '380 kcal', protein: '9g', carbs: '46g', fats: '14g' },
      customization: {
        sizes: [
          { name: 'Standard Single', price: 0 },
          { name: 'Double Patty Monster', price: 35 }
        ],
        addOns: [
          { name: 'Extra Cheddar Cheese Slice', price: 20 },
          { name: 'Smoky Peri-Peri Dip', price: 10 },
          { name: 'Grilled Jalapeños', price: 15 }
        ]
      }
    },
    {
      id: 'food-2',
      name: 'Paneer Tikka Loaded Pizza',
      restaurantId: 'rest-6',
      restaurantName: 'Spice Junction & Pizzeria',
      category: 'pizza',
      price: 189,
      originalPrice: 229,
      rating: 4.7,
      reviewsCount: 98,
      prepTime: '20–25 min',
      prepMinutes: 20,
      isVeg: true,
      isBestseller: true,
      isBudget: false,
      isQuick: false,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-tossed 8-inch personal pizza loaded with tandoori spiced paneer cubes, crisp capsicum, diced red onions and 100% mozzarella blend.',
      ingredients: ['Semolina Crust', 'Tandoori Paneer', 'Mozzarella & Cheddar', 'Bell Peppers', 'Makhani Sauce Base'],
      nutrition: { calories: '560 kcal', protein: '18g', carbs: '64g', fats: '22g' },
      customization: {
        sizes: [
          { name: 'Regular (8 inch)', price: 0 },
          { name: 'Large Roommate Size (10 inch)', price: 60 }
        ],
        addOns: [
          { name: 'Cheese Burst Crust', price: 39 },
          { name: 'Extra Tandoori Dip', price: 15 },
          { name: 'Red Paprika & Olives', price: 20 }
        ]
      }
    },
    {
      id: 'food-3',
      name: 'Peri Peri Double Cheese Maggi',
      restaurantId: 'rest-5',
      restaurantName: 'Night Canteen & Maggi Point',
      category: 'noodles',
      price: 69,
      originalPrice: 85,
      rating: 4.9,
      reviewsCount: 215,
      prepTime: '10–12 min',
      prepMinutes: 10,
      isVeg: true,
      isBestseller: true,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
      description: 'Hostel favorite 2-minute Maggi elevated with sautéed butter onions, sweet corn, spicy peri-peri dust and double melted cheese.',
      ingredients: ['Noodles', 'Peri-Peri Masala', 'Sweet Corn', 'Processed Cheddar', 'Coriander Garnish'],
      nutrition: { calories: '310 kcal', protein: '7g', carbs: '42g', fats: '12g' },
      customization: {
        sizes: [
          { name: 'Single Bowl', price: 0 },
          { name: 'Double Maggi Bowl', price: 30 }
        ],
        addOns: [
          { name: 'Extra Grated Cheese', price: 20 },
          { name: 'Chopped Green Chillies', price: 5 },
          { name: 'Buttered Toast Slices (2)', price: 15 }
        ]
      }
    },
    {
      id: 'food-4',
      name: 'Paneer Makhani Student Thali',
      restaurantId: 'rest-2',
      restaurantName: 'Student Kitchen',
      category: 'indian',
      price: 139,
      originalPrice: 169,
      rating: 4.8,
      reviewsCount: 164,
      prepTime: '15–20 min',
      prepMinutes: 15,
      isVeg: true,
      isBestseller: true,
      isBudget: false,
      isQuick: false,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      description: 'Rich creamy paneer butter masala, yellow dal tadka, jeera rice, 3 butter chapatis, fresh cucumber salad and sweet gulab jamun.',
      ingredients: ['Cottage Cheese', 'Cashew Makhani Gravy', 'Toor Dal', 'Basmati Jeera Rice', 'Whole Wheat Rotis'],
      nutrition: { calories: '640 kcal', protein: '22g', carbs: '78g', fats: '24g' },
      customization: {
        sizes: [
          { name: 'Standard Thali', price: 0 },
          { name: 'Deluxe Special (Extra Roti + Raita)', price: 30 }
        ],
        addOns: [
          { name: 'Extra Butter Roti', price: 10 },
          { name: 'Boondi Raita Cup', price: 20 },
          { name: 'Roasted Masala Papad', price: 10 }
        ]
      }
    },
    {
      id: 'food-5',
      name: 'Avocado & Sprout Protein Salad',
      restaurantId: 'rest-3',
      restaurantName: 'Green Bites',
      category: 'healthy',
      price: 110,
      originalPrice: 140,
      rating: 4.9,
      reviewsCount: 88,
      prepTime: '10–15 min',
      prepMinutes: 12,
      isVeg: true,
      isBestseller: false,
      isBudget: false,
      isQuick: true,
      isHealthy: true,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      description: 'High-protein fitness bowl with mixed moong sprouts, diced Hass avocado, cucumber, cherry tomatoes, pumpkin seeds and lemon-herb vinaigrette.',
      ingredients: ['Organic Sprouts', 'Fresh Avocado', 'Cherry Tomatoes', 'Chia & Pumpkin Seeds', 'Olive Oil & Lime'],
      nutrition: { calories: '260 kcal', protein: '14g', carbs: '28g', fats: '10g' },
      customization: {
        sizes: [
          { name: 'Regular 300g', price: 0 },
          { name: 'Athlete Big Bowl 450g', price: 35 }
        ],
        addOns: [
          { name: 'Grilled Tofu Cubes (60g)', price: 25 },
          { name: 'Extra Roasted Almonds', price: 20 },
          { name: 'Greek Honey Mustard Dressing', price: 15 }
        ]
      }
    },
    {
      id: 'food-6',
      name: 'Grilled Bombay Club Sandwich',
      restaurantId: 'rest-1',
      restaurantName: 'Campus Cafe',
      category: 'sandwiches',
      price: 79,
      originalPrice: 99,
      rating: 4.7,
      reviewsCount: 130,
      prepTime: '12–15 min',
      prepMinutes: 12,
      isVeg: true,
      isBestseller: true,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
      description: 'Triple-layered grilled sandwich packed with mint chutney, sliced boiled potatoes, beetroots, cucumber, spiced chaat masala and melted cheese.',
      ingredients: ['Brown or White Bread', 'Mint-Coriander Chutney', 'Potato & Cucumber slices', 'Processed Cheese', 'Chaat Masala'],
      nutrition: { calories: '340 kcal', protein: '8g', carbs: '45g', fats: '11g' },
      customization: {
        sizes: [
          { name: '2 Big Wedges', price: 0 },
          { name: '4 Jumbo Wedges', price: 30 }
        ],
        addOns: [
          { name: 'Extra Cheese Layer', price: 20 },
          { name: 'Peri Peri Fries on Side', price: 30 },
          { name: 'Extra Mint Dip', price: 10 }
        ]
      }
    },
    {
      id: 'food-7',
      name: 'Thick Belgian Chocolate Cold Coffee',
      restaurantId: 'rest-4',
      restaurantName: 'Campus Bakery & Brews',
      category: 'beverages',
      price: 65,
      originalPrice: 85,
      rating: 4.9,
      reviewsCount: 310,
      prepTime: '8–10 min',
      prepMinutes: 8,
      isVeg: true,
      isBestseller: true,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
      description: 'Double shot espresso blended with chilled milk, rich Belgian dark cocoa, vanillin syrup and crowned with chocolate drizzle.',
      ingredients: ['Arabica Espresso', 'Chilled Full Cream Milk', 'Belgian Cocoa', 'Vanilla Cream', 'Dark Chocolate Sauce'],
      nutrition: { calories: '210 kcal', protein: '5g', carbs: '28g', fats: '6g' },
      customization: {
        sizes: [
          { name: 'Regular (300ml)', price: 0 },
          { name: 'Large Mug (450ml)', price: 25 }
        ],
        addOns: [
          { name: 'Vanilla Ice Cream Scoop', price: 20 },
          { name: 'Extra Espresso Shot', price: 15 },
          { name: 'Hazelnut Flavor Shot', price: 15 }
        ]
      }
    },
    {
      id: 'food-8',
      name: 'Warm Walnut Choco-Fudge Brownie',
      restaurantId: 'rest-4',
      restaurantName: 'Campus Bakery & Brews',
      category: 'desserts',
      price: 75,
      originalPrice: 95,
      rating: 4.9,
      reviewsCount: 175,
      prepTime: '5–8 min',
      prepMinutes: 6,
      isVeg: true,
      isBestseller: true,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      description: 'Decadent, melt-in-mouth dark fudge brownie loaded with roasted California walnuts and served warm with hot chocolate sauce.',
      ingredients: ['Dark Chocolate', 'Dutch Cocoa', 'Crushed Walnuts', 'Butter', 'Brown Sugar'],
      nutrition: { calories: '290 kcal', protein: '4g', carbs: '36g', fats: '15g' },
      customization: {
        sizes: [
          { name: 'Single Square (90g)', price: 0 },
          { name: 'Double Piece Box', price: 45 }
        ],
        addOns: [
          { name: 'Vanilla Soft Scoop', price: 20 },
          { name: 'Extra Hot Fudge Drizzle', price: 15 }
        ]
      }
    },
    {
      id: 'food-9',
      name: 'Crispy Steamed Veg Momos (8 Pcs)',
      restaurantId: 'rest-5',
      restaurantName: 'Night Canteen & Maggi Point',
      category: 'noodles',
      price: 79,
      originalPrice: 99,
      rating: 4.8,
      reviewsCount: 198,
      prepTime: '12–15 min',
      prepMinutes: 12,
      isVeg: true,
      isBestseller: true,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80',
      description: 'Authentic Tibetan style steamed dumplings filled with finely chopped cabbage, carrots, spring onions, served with fiery garlic red chutney and mayo.',
      ingredients: ['Refined Flour Dough', 'Crunchy Vegetables', 'Garlic Ginger Blend', 'Spicy Himalayan Chutney'],
      nutrition: { calories: '240 kcal', protein: '6g', carbs: '38g', fats: '4g' },
      customization: {
        sizes: [
          { name: 'Classic Steamed (8 pcs)', price: 0 },
          { name: 'Pan-Fried Crispy (8 pcs)', price: 20 },
          { name: 'Kurkure Crunchy (8 pcs)', price: 30 }
        ],
        addOns: [
          { name: 'Extra Fiery Red Chutney', price: 10 },
          { name: 'Garlic Cream Mayo', price: 10 },
          { name: 'Cheese Dip Cup', price: 20 }
        ]
      }
    },
    {
      id: 'food-10',
      name: 'Chole Bhature Executive Bowl',
      restaurantId: 'rest-2',
      restaurantName: 'Student Kitchen',
      category: 'indian',
      price: 89,
      originalPrice: 110,
      rating: 4.7,
      reviewsCount: 220,
      prepTime: '15–20 min',
      prepMinutes: 15,
      isVeg: true,
      isBestseller: true,
      isBudget: true,
      isQuick: false,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      description: 'Spicy Amritsari pindi chole cooked in aromatic spices, served with 2 puffed golden bhaturas, pickled onions, and green chili mint dip.',
      ingredients: ['Kabuli Chana', 'Anardana & Garam Masala', 'Golden Bhature', 'Pickled Shallots'],
      nutrition: { calories: '580 kcal', protein: '15g', carbs: '65g', fats: '22g' },
      customization: {
        sizes: [
          { name: '2 Bhature Combo', price: 0 },
          { name: '3 Bhature Extra Hungry', price: 25 }
        ],
        addOns: [
          { name: 'Extra Chole Bowl', price: 30 },
          { name: 'Sweet Lassi Glass', price: 35 },
          { name: 'Mango Pickle & Chilies', price: 5 }
        ]
      }
    },
    {
      id: 'food-11',
      name: 'Paneer Crispy Tikka Wrap',
      restaurantId: 'rest-1',
      restaurantName: 'Campus Cafe',
      category: 'sandwiches',
      price: 119,
      originalPrice: 149,
      rating: 4.8,
      reviewsCount: 165,
      prepTime: '12–15 min',
      prepMinutes: 12,
      isVeg: true,
      isBestseller: true,
      isBudget: false,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
      description: 'Char-grilled cottage cheese cubes seasoned in Kashmiri spices, rolled in a flaky paratha with sliced capsicum, onions, and mint mayo.',
      ingredients: ['Malabari Paratha', 'Marinated Paneer', 'Mint Aioli', 'Crunchy Onions', 'Chaat Spices'],
      nutrition: { calories: '410 kcal', protein: '16g', carbs: '42g', fats: '18g' },
      customization: {
        sizes: [
          { name: 'Single Jumbo Roll', price: 0 },
          { name: 'Meal with Thums Up (250ml)', price: 30 }
        ],
        addOns: [
          { name: 'Extra Paneer Cubes', price: 25 },
          { name: 'Melted Mozzarella Inside', price: 20 },
          { name: 'Extra Mint Dip', price: 10 }
        ]
      }
    },
    {
      id: 'food-12',
      name: 'Peri Peri Seasoned Golden Fries',
      restaurantId: 'rest-1',
      restaurantName: 'Campus Cafe',
      category: 'snacks',
      price: 69,
      originalPrice: 89,
      rating: 4.7,
      reviewsCount: 185,
      prepTime: '10–12 min',
      prepMinutes: 10,
      isVeg: true,
      isBestseller: false,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
      description: 'Crispy skin-on potato fries tossed in a zesty African bird’s eye chili seasoning. Served hot with creamy cheese jalapeño dip.',
      ingredients: ['Selected Russet Potatoes', 'Peri Peri Spice Blend', 'Vegetable Oil', 'Creamy Dip'],
      nutrition: { calories: '320 kcal', protein: '4g', carbs: '45g', fats: '14g' },
      customization: {
        sizes: [
          { name: 'Medium Bowl', price: 0 },
          { name: 'Large Sharing Tub', price: 30 }
        ],
        addOns: [
          { name: 'Liquid Cheesy Lava Pour', price: 25 },
          { name: 'Chipotle Mayo Dip', price: 12 }
        ]
      }
    },
    {
      id: 'food-13',
      name: 'Kolkata Masala Egg & Chicken Roll',
      restaurantId: 'rest-5',
      restaurantName: 'Night Canteen & Maggi Point',
      category: 'sandwiches',
      price: 99,
      originalPrice: 120,
      rating: 4.8,
      reviewsCount: 230,
      prepTime: '12–15 min',
      prepMinutes: 12,
      isVeg: false,
      isBestseller: true,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80',
      description: 'Double egg layered paratha stuffed with juicy spiced chicken chunks, thin sliced rings of red onion, green chilies, and tangy kasundi mustard.',
      ingredients: ['Egg Layered Paratha', 'Spiced Chicken', 'Lime & Onion rings', 'Mustard & Green Chutney'],
      nutrition: { calories: '440 kcal', protein: '24g', carbs: '38g', fats: '17g' },
      customization: {
        sizes: [
          { name: 'Single Egg Double Chicken', price: 0 },
          { name: 'Double Egg Double Chicken', price: 25 }
        ],
        addOns: [
          { name: 'Melted Cheese Slice', price: 20 },
          { name: 'Extra Chicken Chunks', price: 30 }
        ]
      }
    },
    {
      id: 'food-14',
      name: 'Grilled Chicken Breasts & Brown Rice',
      restaurantId: 'rest-3',
      restaurantName: 'Green Bites',
      category: 'healthy',
      price: 159,
      originalPrice: 199,
      rating: 4.9,
      reviewsCount: 112,
      prepTime: '15–20 min',
      prepMinutes: 15,
      isVeg: false,
      isBestseller: true,
      isBudget: false,
      isQuick: false,
      isHealthy: true,
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
      description: 'Lean tender chicken breast fillet seasoned with rosemary and garlic, served over fragrant brown basmati rice and steamed broccoli florets.',
      ingredients: ['Skinless Chicken Breast', 'Organic Brown Rice', 'Steamed Broccoli', 'Carrots', 'Olive Herb Glaze'],
      nutrition: { calories: '420 kcal', protein: '38g', carbs: '44g', fats: '8g' },
      customization: {
        sizes: [
          { name: 'Standard 150g Chicken', price: 0 },
          { name: 'Bulking Athlete 220g Chicken', price: 45 }
        ],
        addOns: [
          { name: 'Boiled Egg Whites (2)', price: 20 },
          { name: 'Greek Yogurt Herb Dip', price: 20 }
        ]
      }
    },
    {
      id: 'food-15',
      name: 'Smoky Crispy Chicken Burger',
      restaurantId: 'rest-1',
      restaurantName: 'Campus Cafe',
      category: 'burgers',
      price: 119,
      originalPrice: 149,
      rating: 4.8,
      reviewsCount: 204,
      prepTime: '15–20 min',
      prepMinutes: 16,
      isVeg: false,
      isBestseller: true,
      isBudget: false,
      isQuick: false,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      description: 'Golden fried crispy chicken patty drenched in smoky barbecue sauce, crunchy purple cabbage slaw, and spicy mayonnaise in a brioche bun.',
      ingredients: ['Brioche Bun', 'Crispy Chicken Breast Patty', 'BBQ Dressing', 'Slaw', 'Pickles'],
      nutrition: { calories: '490 kcal', protein: '26g', carbs: '45g', fats: '19g' },
      customization: {
        sizes: [
          { name: 'Standard', price: 0 },
          { name: 'Double Crispy Patty', price: 45 }
        ],
        addOns: [
          { name: 'Smoked Bacon Strips (Chicken)', price: 30 },
          { name: 'Yellow Cheddar Slice', price: 20 }
        ]
      }
    },
    {
      id: 'food-16',
      name: 'Adrak Elaichi Cutting Chai (2 Glasses)',
      restaurantId: 'rest-5',
      restaurantName: 'Night Canteen & Maggi Point',
      category: 'beverages',
      price: 35,
      originalPrice: 45,
      rating: 4.9,
      reviewsCount: 390,
      prepTime: '5–8 min',
      prepMinutes: 5,
      isVeg: true,
      isBestseller: true,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      description: 'Piping hot traditional Indian tea simmered with fresh crushed ginger and green cardamom. The ultimate companion for group assignments.',
      ingredients: ['Assam CTC Tea', 'Fresh Ginger', 'Cardamom', 'Milk', 'Raw Sugar'],
      nutrition: { calories: '95 kcal', protein: '3g', carbs: '14g', fats: '3g' },
      customization: {
        sizes: [
          { name: '2 Glasses Set', price: 0 },
          { name: 'Hostel Kettle Pack (4 Glasses)', price: 30 }
        ],
        addOns: [
          { name: 'Sugar-free Preparation', price: 0 },
          { name: 'Butter Toast (2 Pcs)', price: 15 },
          { name: 'Osmania Biscuits (4 Pcs)', price: 15 }
        ]
      }
    },
    {
      id: 'food-17',
      name: 'Masala Dosa with Sambhar & Chutneys',
      restaurantId: 'rest-6',
      restaurantName: 'Spice Junction & Pizzeria',
      category: 'indian',
      price: 85,
      originalPrice: 105,
      rating: 4.7,
      reviewsCount: 140,
      prepTime: '12–15 min',
      prepMinutes: 12,
      isVeg: true,
      isBestseller: false,
      isBudget: true,
      isQuick: true,
      isHealthy: true,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      description: 'Crispy fermented rice-lentil crepe filled with spiced potato onion masala. Served with hot lentil sambhar, fresh coconut chutney and tomato relish.',
      ingredients: ['Dosa Batter', 'Potato Mash Masala', 'Lentil Sambhar', 'Coconut Chutney'],
      nutrition: { calories: '320 kcal', protein: '8g', carbs: '52g', fats: '7g' },
      customization: {
        sizes: [
          { name: 'Classic Crispy', price: 0 },
          { name: 'Butter Mysore Masala Dosa', price: 25 }
        ],
        addOns: [
          { name: 'Extra Sambhar Bowl', price: 15 },
          { name: 'Extra Coconut Chutney Cup', price: 10 }
        ]
      }
    },
    {
      id: 'food-18',
      name: 'Blueberry Cheesecake Slice',
      restaurantId: 'rest-4',
      restaurantName: 'Campus Bakery & Brews',
      category: 'desserts',
      price: 110,
      originalPrice: 135,
      rating: 4.8,
      reviewsCount: 120,
      prepTime: '5–8 min',
      prepMinutes: 5,
      isVeg: true,
      isBestseller: false,
      isBudget: false,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
      description: 'Velvety smooth New York style baked cheesecake layer on a crushed digestive biscuit base, topped with whole wild blueberry compote.',
      ingredients: ['Cream Cheese', 'Graham Crust', 'Blueberry Puree', 'Sweet Cream'],
      nutrition: { calories: '350 kcal', protein: '6g', carbs: '38g', fats: '18g' },
      customization: {
        sizes: [
          { name: 'Single Generous Slice', price: 0 }
        ],
        addOns: [
          { name: 'Extra Blueberry Glaze', price: 15 }
        ]
      }
    },
    {
      id: 'food-19',
      name: 'Fresh Watermelon & Mint Cold Press Juice',
      restaurantId: 'rest-3',
      restaurantName: 'Green Bites',
      category: 'beverages',
      price: 55,
      originalPrice: 70,
      rating: 4.8,
      reviewsCount: 95,
      prepTime: '5–8 min',
      prepMinutes: 6,
      isVeg: true,
      isBestseller: false,
      isBudget: true,
      isQuick: true,
      isHealthy: true,
      image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80',
      description: '100% pure fresh watermelon juice cold-pressed with garden mint and a hint of Himalayan pink salt. Zero added sugar or preservatives.',
      ingredients: ['Watermelon', 'Fresh Mint', 'Pink Rock Salt', 'Lime Juice'],
      nutrition: { calories: '85 kcal', protein: '1.5g', carbs: '19g', fats: '0.2g' },
      customization: {
        sizes: [
          { name: 'Bottle (350ml)', price: 0 },
          { name: 'Big Energy Flask (500ml)', price: 20 }
        ],
        addOns: [
          { name: 'Chia Seeds Boost', price: 10 }
        ]
      }
    },
    {
      id: 'food-20',
      name: 'Paneer Makhani Cheese Pizza (8 inch)',
      restaurantId: 'rest-6',
      restaurantName: 'Spice Junction & Pizzeria',
      category: 'pizza',
      price: 179,
      originalPrice: 219,
      rating: 4.7,
      reviewsCount: 110,
      prepTime: '18–22 min',
      prepMinutes: 18,
      isVeg: true,
      isBestseller: false,
      isBudget: false,
      isQuick: false,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
      description: 'Fusion pizza with rich tomato makhani sauce base, marinated paneer tikka cubes, red paprika, sliced capsicum and gooey mozzarella.',
      ingredients: ['Hand Tossed Dough', 'Makhani Sauce', 'Paneer', 'Mozzarella', 'Oregano'],
      nutrition: { calories: '540 kcal', protein: '17g', carbs: '60g', fats: '22g' },
      customization: {
        sizes: [
          { name: 'Regular 8 inch', price: 0 },
          { name: 'Medium 10 inch', price: 65 }
        ],
        addOns: [
          { name: 'Garlic Butter Crust Brush', price: 15 },
          { name: 'Cheese Dip', price: 20 }
        ]
      }
    },
    {
      id: 'food-21',
      name: 'Chili Garlic Hakka Noodles',
      restaurantId: 'rest-5',
      restaurantName: 'Night Canteen & Maggi Point',
      category: 'noodles',
      price: 89,
      originalPrice: 110,
      rating: 4.8,
      reviewsCount: 170,
      prepTime: '12–15 min',
      prepMinutes: 12,
      isVeg: true,
      isBestseller: true,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
      description: 'Wok-tossed noodles with shredded cabbage, bell peppers, carrots, fiery red chili paste, toasted garlic and dark soy.',
      ingredients: ['Eggless Wheat Noodles', 'Crunchy Veggies', 'Chili Garlic Sauce', 'Soy & Vinegar'],
      nutrition: { calories: '390 kcal', protein: '8g', carbs: '58g', fats: '12g' },
      customization: {
        sizes: [
          { name: 'Regular Box', price: 0 },
          { name: 'Jumbo Hostel Box', price: 30 }
        ],
        addOns: [
          { name: 'Fried Egg on Top', price: 15 },
          { name: 'Paneer Chunks', price: 25 },
          { name: 'Schezwan Sauce Cup', price: 10 }
        ]
      }
    },
    {
      id: 'food-22',
      name: 'Crispy Veg Spring Rolls (4 Pcs)',
      restaurantId: 'rest-1',
      restaurantName: 'Campus Cafe',
      category: 'snacks',
      price: 70,
      originalPrice: 90,
      rating: 4.6,
      reviewsCount: 88,
      prepTime: '10–12 min',
      prepMinutes: 10,
      isVeg: true,
      isBestseller: false,
      isBudget: true,
      isQuick: true,
      isHealthy: false,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: 'Thin crispy golden rolls stuffed with seasoned wok-tossed cabbage, carrots, glass noodles, served with sweet chili sauce.',
      ingredients: ['Roll Sheet', 'Julienned Vegetables', 'White Pepper', 'Sweet Chili Dip'],
      nutrition: { calories: '260 kcal', protein: '5g', carbs: '32g', fats: '11g' },
      customization: {
        sizes: [
          { name: '4 Pieces', price: 0 },
          { name: '8 Pieces Sharing', price: 50 }
        ],
        addOns: [
          { name: 'Extra Sweet Chili Sauce', price: 10 }
        ]
      }
    }
  ],

  offers: [
    {
      id: 'offer-1',
      code: 'CAMPUS20',
      title: 'First Order Offer',
      discountText: '20% OFF',
      description: 'Get 20% off on your first campus order. Maximum discount ₹50.',
      minOrder: 120,
      maxDiscount: 50,
      discountPercent: 20,
      badge: 'POPULAR',
      validTill: 'Ongoing'
    },
    {
      id: 'offer-2',
      code: 'STUDENT50',
      title: 'Hostel Roommate Combo',
      discountText: '₹50 FLAT OFF',
      description: 'Save flat ₹50 on group orders above ₹199. Perfect for dinner with friends!',
      minOrder: 199,
      maxDiscount: 50,
      discountPercent: 0,
      flatDiscount: 50,
      badge: 'GROUP DEAL',
      validTill: 'Weekdays'
    },
    {
      id: 'offer-3',
      code: 'FIRSTBITE',
      title: 'Freshers Welcome Bite',
      discountText: '₹40 OFF',
      description: 'Special welcome offer for new campus students on any order above ₹99.',
      minOrder: 99,
      maxDiscount: 40,
      discountPercent: 0,
      flatDiscount: 40,
      badge: 'NEW STUDENTS',
      validTill: 'Semester 1'
    },
    {
      id: 'offer-4',
      code: 'NIGHTOWL',
      title: 'Late Night Study Fuel',
      discountText: 'FREE DELIVERY',
      description: 'Free delivery on all orders to hostels placed after 9:00 PM.',
      minOrder: 80,
      maxDiscount: 20,
      discountPercent: 0,
      freeDelivery: true,
      badge: 'NIGHT OWL',
      validTill: '9 PM – 2 AM'
    }
  ],

  campusLocations: [
    { id: 'loc-1', name: 'Main Gate & Security Post', zone: 'Entry', icon: '🚪' },
    { id: 'loc-2', name: 'Central Library (Front Steps / Entrance)', zone: 'Academic', icon: '📚' },
    { id: 'loc-3', name: 'Academic Block A (Main Lobby / Reception)', zone: 'Academic', icon: '🏛️' },
    { id: 'loc-4', name: 'Academic Block B (CS & IT Dept Quad)', zone: 'Academic', icon: '💻' },
    { id: 'loc-5', name: 'Hostel A (Boys Hostel - Main Gate)', zone: 'Hostels', icon: '🏢' },
    { id: 'loc-6', name: 'Hostel B (Girls Hostel - Security Counter)', zone: 'Hostels', icon: '🏢' },
    { id: 'loc-7', name: 'Central Cafeteria & Amphitheater', zone: 'Common', icon: '🍽️' },
    { id: 'loc-8', name: 'Indoor Sports Complex & Badminton Arena', zone: 'Sports', icon: '🏸' }
  ],

  initialOrders: [
    {
      id: 'CB-10245',
      restaurantId: 'rest-1',
      restaurantName: 'Campus Cafe',
      items: [
        { name: 'Campus Special Veg Burger', quantity: 1, size: 'Standard', price: 99 },
        { name: 'Thick Belgian Chocolate Cold Coffee', quantity: 1, size: 'Regular', price: 65 }
      ],
      total: 179,
      subtotal: 164,
      deliveryFee: 15,
      status: 'Delivered',
      date: 'Yesterday, 8:15 PM',
      deliveryLocation: 'Hostel A (Boys Hostel - Main Gate)',
      paymentMethod: 'Campus Wallet'
    },
    {
      id: 'CB-10248',
      restaurantId: 'rest-5',
      restaurantName: 'Night Canteen & Maggi Point',
      items: [
        { name: 'Peri Peri Double Cheese Maggi', quantity: 2, size: 'Single Bowl', price: 69 },
        { name: 'Adrak Elaichi Cutting Chai (2 Glasses)', quantity: 1, size: '2 Glasses Set', price: 35 }
      ],
      total: 188,
      subtotal: 173,
      deliveryFee: 15,
      status: 'Out for Delivery',
      date: 'Today, 12:45 PM',
      deliveryLocation: 'Central Library (Front Steps / Entrance)',
      paymentMethod: 'UPI'
    }
  ],

  demoUser: {
    id: 'usr-student-1',
    name: 'Amit Kumar',
    email: 'amit.kumar@apex.edu',
    college: 'Apex Institute of Technology & Engineering',
    studentId: '22BCS1084',
    phone: '+91 98765 43210',
    hostel: 'Hostel B, Room 204',
    walletBalance: 450,
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  },

  vendorUser: {
    id: 'usr-vendor-1',
    name: 'Chef Rajesh Sharma',
    outletName: 'Campus Cafe',
    restaurantId: 'rest-1',
    email: 'cafe@apex.edu',
    phone: '+91 98111 22334',
    role: 'vendor'
  },

  adminUser: {
    id: 'usr-admin-1',
    name: 'Campus Administrator',
    email: 'admin.foodtech@apex.edu',
    phone: '+91 99999 00000',
    role: 'admin'
  },

  faqQuestions: [
    {
      q: 'How fast is campus delivery?',
      a: 'Average delivery takes 15–20 minutes since our delivery partners are based directly within campus using electric bicycles!'
    },
    {
      q: 'Can I pick up my food myself without paying delivery fees?',
      a: 'Yes! Select the "Campus Pickup" option during checkout to skip delivery fees and grab your order straight from the outlet counter when it is ready.'
    },
    {
      q: 'How does Group Order work?',
      a: 'Click "Order Together" to create a room (e.g., "Hostel Room 204"). Share the 6-digit room code with your friends so they can add items to a shared cart and split the bill easily.'
    },
    {
      q: 'Can I pay with my Student ID or Campus Wallet?',
      a: 'Absolutely! Campus Wallet allows 1-tap checkout with your student account balance. You can also pay via UPI, Card, or Cash on Delivery.'
    }
  ]
};

// Export to window for clean global access without module restrictions
window.MOCK_DATA = MOCK_DATA;
