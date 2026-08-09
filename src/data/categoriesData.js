export const INITIAL_CATEGORIES = [
  {
    id: "cat-cctv",
    name: "CCTV & Security Systems",
    icon: "ShieldCheck",
    description: "Outdoor IP cameras, DVR recorders, and surveillance accessories.",
    count: 42,
    subCategories: [
      { id: "sub-ip-cam", name: "IP & Smart Cameras", count: 18 },
      { id: "sub-analog-cam", name: "Analog HD Cameras", count: 14 },
      { id: "sub-dvr-nvr", name: "DVR / NVR Recorders", count: 6 },
      { id: "sub-cctv-acc", name: "Surveillance Cables & Power Supplies", count: 4 },
    ],
  },
  {
    id: "cat-networking",
    name: "Networking & Routers",
    icon: "Wifi",
    description: "High-speed dual band WiFi routers, fiber ONUs, and network switches.",
    count: 24,
    subCategories: [
      { id: "sub-wifi-routers", name: "Dual-Band WiFi Routers", count: 12 },
      { id: "sub-onu", name: "Fiber ONU & ONT Terminal", count: 8 },
      { id: "sub-switches", name: "Gigabit Network Switches", count: 4 },
    ],
  },
  {
    id: "cat-dishhome",
    name: "DishHome DTH & Fiber",
    icon: "Tv",
    description: "Official DishHome fiber subscriptions, setup boxes, and dish antennas.",
    count: 16,
    subCategories: [
      { id: "sub-fiber-pkg", name: "Fiber Internet Packages", count: 6 },
      { id: "sub-dth-box", name: "HD Setup Boxes", count: 5 },
      { id: "sub-dth-dish", name: "Dish Antennas & LNB", count: 5 },
    ],
  },
  {
    id: "cat-ac",
    name: "AC & Cooling Services",
    icon: "Sparkles",
    description: "Split AC pressure washing, gas refill, and compressor repair.",
    count: 19,
    subCategories: [], // No sub-categories (optional!)
  },
  {
    id: "cat-electric",
    name: "Electrical & House Wiring",
    icon: "Zap",
    description: "Residential electrical wiring, circuit breakers, and inverter backup.",
    count: 35,
    subCategories: [
      { id: "sub-wiring", name: "Residential Wiring", count: 20 },
      { id: "sub-invertor", name: "Inverters & Battery Backup", count: 15 },
    ],
  },
  {
    id: "cat-plumb",
    name: "Plumbing & Water Systems",
    icon: "Wrench",
    description: "Water tank installation, pipe fitting, and pump repair.",
    count: 22,
    subCategories: [],
  },
];
