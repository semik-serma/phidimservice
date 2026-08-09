export const CATEGORIES = [
  { id: "cctv", name: "CCTV & Security Systems", icon: "ShieldCheck", count: 42 },
  { id: "fiber", name: "DishHome DTH", icon: "Wifi", count: 8 },
  { id: "routers", name: "Networking & Routers", icon: "Router", count: 24 },
  { id: "cameras", name: "Smart Home Cameras", icon: "Camera", count: 18 },
  { id: "electronics", name: "Consumer Electronics", icon: "Tv", count: 35 },
  { id: "mobiles", name: "Mobiles & Accessories", icon: "Smartphone", count: 56 },
  { id: "appliances", name: "Home Appliances", icon: "Home", count: 29 },
  { id: "groceries", name: "Groceries & Local Needs", icon: "ShoppingBag", count: 80 }
];
export const PRODUCTS = [
  {
    id: "p1",
    name: "Dahua 2MP Full HD IR Bullet CCTV Camera (HDCVI)",
    category: "CCTV & Security Systems",
    price: 3850,
    originalPrice: 5500,
    discountPercent: 30,
    rating: 4.8,
    reviewCount: 34,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    description: "High-definition 1080P IR Bullet Camera with 20m Smart IR Night Vision, IP67 Weatherproof rating for outdoor security.",
    brand: "Dahua",
    isHot: true,
    inStock: true,
    specs: {
      "Resolution": "2 Megapixel (1080P)",
      "Night Vision": "20m Smart IR",
      "Weatherproof": "IP67 Metal Casing",
      "Lens": "3.6mm Fixed Lens",
      "Warranty": "2 Years Official"
    }
  },
  {
    id: "p2",
    name: "Uniarch 3MP PTZ Outdoor WiFi Smart Security Camera",
    category: "Smart Home Cameras",
    price: 4900,
    originalPrice: 7e3,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 28,
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    description: "3MP Ultra HD Wireless Smart Camera with 360-degree Auto Pan-Tilt tracking, motion detection alerts, two-way audio talk.",
    brand: "Uniarch",
    isHot: true,
    isNew: true,
    inStock: true,
    specs: {
      "Resolution": "3MP Super HD",
      "Connectivity": "2.4GHz WiFi & LAN",
      "Storage": "MicroSD up to 256GB / Cloud",
      "Audio": "Two-Way Intercom",
      "Warranty": "1 Year"
    }
  },
  {
    id: "p3",
    name: "Dahua 4MP Full-Color Smart Dual-Light Eyeball Camera",
    category: "CCTV & Security Systems",
    price: 5250,
    originalPrice: 7500,
    discountPercent: 30,
    rating: 4.7,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80",
    description: "Full-color night vision camera with built-in mic, AI human detection, and active deterrence warm light.",
    brand: "Dahua",
    inStock: true,
    specs: {
      "Resolution": "4MP Ultra HD",
      "Microphone": "Built-in High Sensitivity Mic",
      "Night Mode": "Smart Dual Light (Warm LED + IR)",
      "Warranty": "2 Years"
    }
  },
  {
    id: "p4",
    name: "Dahua 8 Channel Penta-brid 1080P Mini 1U XVR/DVR Recorder",
    category: "CCTV & Security Systems",
    price: 8400,
    originalPrice: 12e3,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    description: "8-channel smart DVR supporting HDCVI/AHD/TVI/CVBS/IP video inputs, H.265+ AI coding, smart motion search.",
    brand: "Dahua",
    isHot: true,
    inStock: true,
    specs: {
      "Channels": "8 Video + 4 IP Channels",
      "Compression": "H.265+ Dual-stream",
      "Storage Support": "1 SATA Port up to 10TB",
      "Remote Access": "DMSS Mobile App (iOS & Android)",
      "Warranty": "2 Years"
    }
  },
  {
    id: "p5",
    name: "TP-Link Archer C6 AC1200 Wireless Dual Band Gigabit Router",
    category: "Networking & Routers",
    price: 3600,
    originalPrice: 4500,
    discountPercent: 20,
    rating: 4.6,
    reviewCount: 51,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    description: "High-speed AC1200 dual band WiFi with 4 external antennas, MU-MIMO support for seamless streaming and fiber internet.",
    brand: "TP-Link",
    inStock: true,
    specs: {
      "Speed": "867 Mbps at 5 GHz + 300 Mbps at 2.4 GHz",
      "Antennas": "4 External Antennas",
      "Ports": "1 Gigabit WAN + 4 Gigabit LAN",
      "Warranty": "1 Year"
    }
  },
  {
    id: "p6",
    name: "DishHome DTH Dual Band Optical Router ONU (XPON)",
    category: "DishHome DTH",
    price: 2500,
    originalPrice: 3500,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 65,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80",
    description: "Official DishHome DTH XPON Router with high gain 5dBi dual antennas, voice port, and gigabit ethernet.",
    brand: "Dish Home",
    isHot: true,
    inStock: true,
    specs: {
      "Frequency": "2.4GHz & 5GHz Dual Band",
      "Compatibility": "DishHome DTH Network",
      "Warranty": "1 Year Free Replacement"
    }
  },
  {
    id: "p7",
    name: "Dahua 1TB Surveillance Hard Drive (Seagate SkyHawk)",
    category: "CCTV & Security Systems",
    price: 6200,
    originalPrice: 7500,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 15,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    description: "Dedicated 24x7 surveillance storage designed for continuous DVR/NVR recording without frame loss.",
    brand: "Seagate",
    inStock: true
  },
  {
    id: "p8",
    name: "Uniarch 4-Camera Wireless NVR Security Kit",
    category: "CCTV & Security Systems",
    price: 24500,
    originalPrice: 32e3,
    discountPercent: 23,
    rating: 5,
    reviewCount: 12,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    description: "Complete DIY security camera set: 4x 3MP Outdoor Bullet Cameras + 4-Channel WiFi NVR + Power Adapters.",
    brand: "Uniarch",
    isHot: true,
    isNew: true,
    inStock: true
  },
  {
    id: "p9",
    name: "Voltas 1.5 Ton 3 Star Inverter Split Air Conditioner (AC)",
    category: "AC & Cooling Services",
    price: 64500,
    originalPrice: 75000,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    description: "High-efficiency 5-in-1 convertible inverter AC with copper condenser coils and 100% turbo cooling for Phidim summers.",
    brand: "Voltas",
    isHot: true,
    inStock: true,
    specs: {
      "Capacity": "1.5 Ton (18,000 BTU)",
      "Energy Rating": "3 Star Inverter",
      "Condenser": "100% Copper Coil",
      "Warranty": "10 Years Compressor Warranty"
    }
  },
  {
    id: "p10",
    name: "Schneider Electric 32A Double Pole MCB & Distribution Box",
    category: "Electrical & House Wiring",
    price: 1850,
    originalPrice: 2400,
    discountPercent: 23,
    rating: 4.8,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    description: "Heavy-duty electrical protection switch box with surge protection for residential and commercial wiring in Panchthar.",
    brand: "Schneider",
    inStock: true,
    specs: {
      "Current Rating": "32 Amperes",
      "Voltage": "240V / 50Hz",
      "Poles": "2 Pole (DP)",
      "Warranty": "3 Years Replacement"
    }
  },
  {
    id: "p11",
    name: "Crompton 1.0 HP Heavy Duty Automatic Water Pressure Pump",
    category: "Plumbing & Water Systems",
    price: 9200,
    originalPrice: 11500,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "High-lift self-priming automatic water pump for overhead tank filling and residential water pressure boosting.",
    brand: "Crompton",
    isHot: true,
    inStock: true,
    specs: {
      "Power": "1.0 HP (750W)",
      "Flow Rate": "35 Liters/min",
      "Max Head": "36 Meters",
      "Warranty": "2 Years"
    }
  },
  {
    id: "p12",
    name: "Samsung Galaxy A55 5G (8GB RAM / 256GB Storage)",
    category: "Mobiles & Accessories",
    price: 49999,
    originalPrice: 56999,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 74,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    description: "Super AMOLED 120Hz display, 50MP OIS Triple Camera, IP67 dust/water resistance, and 5000mAh long battery life.",
    brand: "Samsung",
    isHot: true,
    isNew: true,
    inStock: true
  },
  {
    id: "p13",
    name: "Sony Bravia 43 Inch 4K Ultra HD Smart Google TV",
    category: "Consumer Electronics",
    price: 68000,
    originalPrice: 78000,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
    description: "X1 4K Processor, Dolby Atmos sound, built-in Chromecast & DishHome iTV app compatibility.",
    brand: "Sony",
    isHot: true,
    inStock: true
  },
  {
    id: "p14",
    name: "Organic Ilam Premium Orthodox Golden Black Tea (500g)",
    category: "Groceries & Local Needs",
    price: 850,
    originalPrice: 1100,
    discountPercent: 23,
    rating: 5,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    description: "100% pure organic high-altitude hand-picked orthodox tea leaves directly from Ilam & Panchthar tea gardens.",
    brand: "Local Organic",
    isHot: true,
    inStock: true
  },
  {
    id: "p15",
    name: "Pure Himalayan Cow Ghee (1 Liter Bottle - Local Panchthar)",
    category: "Groceries & Local Needs",
    price: 1450,
    originalPrice: 1800,
    discountPercent: 19,
    rating: 4.9,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80",
    description: "Traditional Bilona method wood-churned pure cow ghee from local Panchthar dairy farmers.",
    brand: "Panchthar Dairy",
    inStock: true
  }
];
export const FIBER_PACKAGES = [
  {
    id: "dh-50",
    speed: "50 Mbps",
    priceMonthly: 850,
    priceYearly: 8999,
    features: [
      "Unlimited High Speed Internet",
      "Free Dual Band WiFi Router",
      "1 DishHome iTV Setup Box",
      "5000+ Movies & Series VOD",
      "24/7 Dedicated Support in Phidim"
    ],
    channelsCount: 200,
    setupFee: 0
  },
  {
    id: "dh-100",
    speed: "100 Mbps",
    priceMonthly: 1050,
    priceYearly: 10999,
    popular: true,
    features: [
      "Ultra Fast 100 Mbps Bandwidth",
      "Free 5GHz Dual Band Router",
      "2 DishHome iTV Setup Boxes",
      "Free Fiber Drop Wire (100m)",
      "HD Live Channels + Catchup",
      "Free Installation in Phidim / Panchthar"
    ],
    channelsCount: 250,
    setupFee: 0
  },
  {
    id: "dh-150",
    speed: "150 Mbps",
    priceMonthly: 1250,
    priceYearly: 12999,
    features: [
      "High Speed 150 Mbps Fiber",
      "Free Mesh WiFi Router Upgrade",
      "2 DishHome iTV Setup Boxes",
      "Priority Gaming & Streaming Ping",
      "Free Fiber Drop Wire & Installation"
    ],
    channelsCount: 300,
    setupFee: 0
  },
  {
    id: "dh-200",
    speed: "200 Mbps",
    priceMonthly: 1450,
    priceYearly: 14999,
    features: [
      "Ultra Speed 200 Mbps Gigabit Fiber",
      "Free Dual Band Mesh Router",
      "3 DishHome iTV Connections",
      "Dedicated VIP Support Manager",
      "Zero Setup / Installation Fee"
    ],
    channelsCount: 350,
    setupFee: 0
  }
];
