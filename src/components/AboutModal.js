import { useState } from "react";
import {
  X,
  Wrench,
  ShieldCheck,
  Zap,
  Camera,
  Monitor,
  Wifi,
  Tv,
  Wind,
  Droplet,
  ShoppingBag,
  CheckCircle2,
  MapPin,
  Phone,
  ExternalLink,
  Globe,
  Code2,
  Sparkles,
  Heart,
  Check,
  PhoneCall
} from "lucide-react";
export const AboutModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("ALL");
  if (!isOpen) return null;
  const electricalServices = [
    "House Wiring (\u0928\u092F\u093E\u0901 \u0918\u0930\u0915\u094B Wiring)",
    "Electrical Trouble Shooting (\u092C\u093F\u0926\u094D\u092F\u0941\u0924 \u0938\u092E\u0938\u094D\u092F\u093E \u092A\u0924\u094D\u0924\u093E \u0932\u0917\u093E\u0909\u0928\u0947)",
    "Electrical Maintenance (\u092E\u0930\u094D\u092E\u0924 \u0924\u0925\u093E Maintenance)",
    "LED Light Installation & Repair",
    "Ceiling Fan Installation & Repair",
    "Wall Fan Installation & Repair",
    "Switch Board & Socket Installation",
    "Inverter Installation & Repair",
    "General Electrical Repair"
  ];
  const cctvServices = [
    "CCTV Camera Installation",
    "CCTV Repair & Maintenance",
    "Remote Mobile Viewing Setup",
    "DVR/NVR Configuration",
    "Office & Home Security Solutions"
  ];
  const computerServices = [
    "Computer Installation",
    "Computer Repair",
    "Maintenance & Upgrades",
    "Printer Setup",
    "Local Area Networking (LAN)",
    "Wi-Fi Setup",
    "Router Configuration",
    "Software Installation",
    "Virus Removal & Security"
  ];
  const internetTvServices = [
    "DishHome Installation",
    "DishHome Maintenance",
    "Local Network Setup",
    "Internet Networking",
    "Router & Switch Configuration"
  ];
  const acServices = [
    "AC Installation",
    "AC Repair",
    "AC Cleaning",
    "AC Maintenance",
    "Cooling Performance Check"
  ];
  const tvServices = [
    "LED TV Installation",
    "LED TV Repair",
    "TV Wall Mount Installation",
    "TV Maintenance"
  ];
  const plumbingServices = [
    "Plumbing Installation",
    "Pipe Leakage Repair",
    "Water Line Repair",
    "Bathroom Fitting",
    "Plumbing Maintenance",
    "Plumbing Trouble Shooting"
  ];
  const productsList = [
    "\u{1F4A1} LED Bulbs",
    "\u{1F4F7} CCTV Cameras",
    "\u{1F4BB} Computers & Accessories",
    "\u{1F310} Networking Devices",
    "\u{1F4FA} LED TVs",
    "\u{1F50C} Switches & Sockets",
    "\u{1F32C}\uFE0F Ceiling & Wall Fans",
    "\u{1F50B} Inverters",
    "\u26A1 Electrical Accessories",
    "\u{1F5A8}\uFE0F Computer Accessories",
    "\u{1F4E1} Networking Equipment",
    "\u{1F3E0} Home Appliances"
  ];
  const whyChooseUsList = [
    { title: "Experienced Technicians", desc: "Skilled certified field experts for all home & IT jobs." },
    { title: "Affordable Price", desc: "Transparent & budget-friendly local pricing in Panchthar." },
    { title: "Fast Response", desc: "Quick on-site service dispatch across Phidim Municipality." },
    { title: "Genuine Products", desc: "100% original electrical & electronics items with warranty." },
    { title: "Professional Service", desc: "Reliable, clean, and polite service guaranteed every time." },
    { title: "Home Service Available", desc: "Doorstep technical assistance for home, shop, or office." },
    { title: "Customer Satisfaction First", desc: "Your peace of mind and satisfaction is our top priority." }
  ];
  const devSkills = [
    "JavaScript",
    "Node.js",
    "Next.js",
    "Django",
    "Python",
    "HTML5",
    "CSS3",
    "C Programming"
  ];
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {
    /* Backdrop */
  }
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-xs animate-in fade-in" />

      {
    /* Modal Dialog */
  }
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-gray-200 flex flex-col max-h-[92vh]">
        
        {
    /* Header Banner */
  }
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest bg-green-500/20 border border-green-500/30 px-2.5 py-0.5 rounded-full">
                  OFFICIAL ABOUT PORTAL
                </span>
                <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full">
                  PHIDIM, PANCHTHAR
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>🔧 Welcome to Phidim Service</span>
              </h3>
              <p className="text-xs sm:text-sm text-green-300 font-semibold mt-1">
                &quot;One Stop Solution for Home, Office & Business Services!&quot; 🏠⚡💻
              </p>
            </div>
            <button
    onClick={onClose}
    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 transition-colors cursor-pointer shrink-0"
  >
              <X className="w-5 h-5" />
            </button>
          </div>

          {
    /* Quick Sub-tagline */
  }
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-300">
            <p className="font-medium text-gray-200 italic">
              Need a trusted technician? Phidim Service is always ready to help with fast, reliable, & professional service!
            </p>
            <span className="bg-green-500 text-slate-950 font-black px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider">
              💙 Happy Customers First
            </span>
          </div>
        </div>

        {
    /* Tab Selector */
  }
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <button
    onClick={() => setActiveTab("ALL")}
    className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "ALL" ? "bg-slate-900 text-white shadow-xs" : "bg-white text-gray-700 hover:bg-gray-200"}`}
  >
            📋 All Overview
          </button>
          <button
    onClick={() => setActiveTab("SERVICES")}
    className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "SERVICES" ? "bg-slate-900 text-white shadow-xs" : "bg-white text-gray-700 hover:bg-gray-200"}`}
  >
            ⚡ Technical Services
          </button>
          <button
    onClick={() => setActiveTab("PRODUCTS")}
    className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "PRODUCTS" ? "bg-slate-900 text-white shadow-xs" : "bg-white text-gray-700 hover:bg-gray-200"}`}
  >
            🛒 Products We Sell
          </button>
          <button
    onClick={() => setActiveTab("WHY_US")}
    className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "WHY_US" ? "bg-slate-900 text-white shadow-xs" : "bg-white text-gray-700 hover:bg-gray-200"}`}
  >
            🤝 Why Choose Us
          </button>
          <button
    onClick={() => setActiveTab("DEVELOPER")}
    className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${activeTab === "DEVELOPER" ? "bg-slate-900 text-white shadow-xs" : "bg-white text-gray-700 hover:bg-gray-200"}`}
  >
            👨‍💻 About Developer
          </button>
        </div>

        {
    /* Scrollable Modal Content */
  }
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs text-gray-700 leading-relaxed grow">

          {
    /* SECTION: SERVICES */
  }
          {(activeTab === "ALL" || activeTab === "SERVICES") && <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-green-600" />
                  <span>Our Professional On-Site Services</span>
                </h4>
                <span className="text-[11px] font-bold text-gray-500">Phidim & Panchthar Region</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {
    /* Electrical Services */
  }
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-amber-900 text-sm">
                    <Zap className="w-5 h-5 text-amber-600" />
                    <span>⚡ Electrical Services (बिद्युत सम्बन्धी सेवा)</span>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-gray-700 font-medium">
                    {electricalServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>

                {
    /* CCTV & Security Services */
  }
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-blue-900 text-sm">
                    <Camera className="w-5 h-5 text-blue-600" />
                    <span>📹 CCTV & Security Services</span>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-gray-700 font-medium">
                    {cctvServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>

                {
    /* Computer & IT Services */
  }
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                    <Monitor className="w-5 h-5 text-slate-700" />
                    <span>💻 Computer & IT Services</span>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-gray-700 font-medium">
                    {computerServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-700 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>

                {
    /* Internet & TV Services */
  }
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-emerald-900 text-sm">
                    <Wifi className="w-5 h-5 text-emerald-600" />
                    <span>📡 Internet & TV Services</span>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-gray-700 font-medium">
                    {internetTvServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>

                {
    /* Air Conditioner Services */
  }
                <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-cyan-900 text-sm">
                    <Wind className="w-5 h-5 text-cyan-600" />
                    <span>❄️ Air Conditioner Services</span>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-gray-700 font-medium">
                    {acServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>

                {
    /* LED TV Services */
  }
                <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-indigo-900 text-sm">
                    <Tv className="w-5 h-5 text-indigo-600" />
                    <span>📺 LED TV Services</span>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-gray-700 font-medium">
                    {tvServices.map((item, i) => <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>

                {
    /* Plumbing Services */
  }
                <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-4 space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 font-extrabold text-teal-900 text-sm">
                    <Droplet className="w-5 h-5 text-teal-600" />
                    <span>🚰 Plumbing Services</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {plumbingServices.map((item, i) => <div key={i} className="flex items-start gap-2 text-gray-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>)}
                  </div>
                </div>

              </div>
            </div>}

          {
    /* SECTION: PRODUCTS WE SELL */
  }
          {(activeTab === "ALL" || activeTab === "PRODUCTS") && <div className="bg-gradient-to-br from-green-50 via-white to-green-50/50 border border-green-200 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-green-200/60 pb-3">
                <div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-green-600" />
                    <span>🛒 Products We Sell at Genuine Prices</span>
                  </h4>
                  <p className="text-gray-600 text-xs mt-0.5">
                    Need quality electrical and electronic products? We sell genuine products with warranty!
                  </p>
                </div>
                <a
    href="https://phidimservice.com.np"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 self-start sm:self-auto transition-all shadow-xs cursor-pointer"
  >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Online Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {productsList.map((prod, i) => <div key={i} className="bg-white border border-green-100 hover:border-green-300 rounded-xl p-2.5 font-bold text-gray-800 text-xs flex items-center gap-1.5 shadow-2xs transition-colors">
                    <span>{prod}</span>
                  </div>)}
              </div>

              <div className="bg-white/90 p-3 rounded-xl border border-green-200/80 flex items-center justify-between text-xs">
                <span className="font-extrabold text-green-900">🌐 Official Online Hub:</span>
                <a
    href="https://phidimservice.com.np"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-700 font-black hover:underline underline-offset-2 flex items-center gap-1"
  >
                  <span>https://phidimservice.com.np</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>}

          {
    /* SECTION: WHY CHOOSE US */
  }
          {(activeTab === "ALL" || activeTab === "WHY_US") && <div className="space-y-3">
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 pb-2">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>🤝 Why Choose Phidim Service?</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {whyChooseUsList.map((item, i) => <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-xs transition-shadow space-y-1">
                    <div className="flex items-center gap-1.5 font-extrabold text-gray-900 text-xs text-green-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 pl-5 font-medium">
                      {item.desc}
                    </p>
                  </div>)}
              </div>
            </div>}

          {
    /* SECTION: ABOUT THE DEVELOPER */
  }
          {(activeTab === "ALL" || activeTab === "DEVELOPER") && <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-lg border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-green-400 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-sm">
                        FULL STACK WEB DEVELOPER
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-white mt-0.5 flex items-center gap-2">
                      <span>Semik Serma</span>
                      <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                    </h4>
                  </div>
                </div>

                <div className="text-right text-xs text-gray-300">
                  <p className="font-semibold">Developed with ❤️ for Panchthar</p>
                  <p className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Nepal Digital Solutions</p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                  TECHNICAL SKILLS & STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {devSkills.map((skill, i) => <span key={i} className="bg-white/10 hover:bg-white/20 text-green-300 font-bold px-3 py-1 rounded-lg text-xs border border-white/10 transition-colors">
                      {skill}
                    </span>)}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-green-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Continuous Learning & Engineering Pursuit</span>
                </div>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">
                  📚 Currently learning advanced <strong className="text-white">Software Engineering, System Design, Cyber Security, and Artificial Intelligence</strong> to build even better, faster, and resilient digital solutions for Nepal.
                </p>
              </div>
            </div>}

          {
    /* SECTION: CONTACT US FOOTER BANNER */
  }
          <div className="bg-gray-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-800">
            <div className="space-y-1">
              <h5 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-green-400" />
                <span>📞 Contact & Phidim Support Center</span>
              </h5>
              <div className="text-xs text-gray-300 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  Phidim, Panchthar, Nepal
                </span>
                <span>• Hotline: +977 986-2772457</span>
              </div>
              <p className="text-[11px] text-green-400 font-bold pt-1">
                &quot;Professional Service, Genuine Products, Happy Customers!&quot; 🙏
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
    href="https://wa.me/9779862772457"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
  >
                <Phone className="w-4 h-4" />
                <span>Call +977 986-2772457</span>
              </a>
              <button
    onClick={onClose}
    className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
  >
                Close Portal
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>;
};
