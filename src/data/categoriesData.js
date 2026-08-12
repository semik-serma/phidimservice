export const INITIAL_CATEGORIES = [
  {
    id: "cat-cctv",
    name: "CCTV & Security Systems",
    icon: "ShieldCheck",
    description: "Doorstep IP camera mounting, NVR cabling, and mobile viewing configuration.",
    count: 42,
    subCategories: [
      { id: "sub-ip-cam", name: "IP Camera Installation & Alignment", count: 18 },
      { id: "sub-analog-cam", name: "Analog HD Camera Wiring & Repair", count: 14 },
      { id: "sub-dvr-nvr", name: "DVR / NVR Network Configuration", count: 6 },
      { id: "sub-cctv-acc", name: "Surveillance Power Supply & Maintenance", count: 4 },
    ],
  },
  {
    id: "cat-networking",
    name: "Fiber & LAN Networking",
    icon: "Wifi",
    description: "Fiber optic fusion splicing, dual-band router setup, and enterprise LAN cabling.",
    count: 24,
    subCategories: [
      { id: "sub-wifi-routers", name: "WiFi Router & AP Setup", count: 12 },
      { id: "sub-onu", name: "Fiber Optic Cable Splicing", count: 8 },
      { id: "sub-switches", name: "Cat6 LAN Switch Deployment", count: 4 },
    ],
  },
  {
    id: "cat-dishhome",
    name: "DishHome DTH & TV",
    icon: "Tv",
    description: "Official DishHome fiber setup, antenna signal tuning, and TV wall mounting.",
    count: 16,
    subCategories: [
      { id: "sub-fiber-pkg", name: "DishHome Fiber Setup & Activation", count: 6 },
      { id: "sub-dth-box", name: "HD Setup Box Installation", count: 5 },
      { id: "sub-dth-dish", name: "Dish Antenna Signal Alignment", count: 5 },
    ],
  },
  {
    id: "cat-ac",
    name: "AC & Cooling Services",
    icon: "Sparkles",
    description: "Split AC deep chemical cleaning, R32/R410A gas refill, and fridge compressor repair.",
    count: 19,
    subCategories: [
      { id: "sub-ac-cleaning", name: "AC Jet Pressure Cleaning", count: 10 },
      { id: "sub-ac-gas", name: "Refrigerant Gas Top-Up", count: 9 },
    ],
  },
  {
    id: "cat-electric",
    name: "Electrical & House Wiring",
    icon: "Zap",
    description: "Residential electrical casing/concealed wiring, circuit breakers, and inverter setup.",
    count: 35,
    subCategories: [
      { id: "sub-wiring", name: "House Wiring & Distribution Board", count: 20 },
      { id: "sub-invertor", name: "Inverter Setup & Battery Diagnostics", count: 15 },
    ],
  },
  {
    id: "cat-plumb",
    name: "Plumbing & Water Systems",
    icon: "Wrench",
    description: "Water tank plumbing, sanitary fittings, pipe leak detection, and water pump overhaul.",
    count: 22,
    subCategories: [
      { id: "sub-plumb-install", name: "Bathroom Sanitary & Pipe Fitting", count: 12 },
      { id: "sub-plumb-repair", name: "Leak Fixing & Water Pump Maintenance", count: 10 },
    ],
  },
];
