import { useState } from "react";
import {
  Zap,
  Camera,
  Monitor,
  Wind,
  Tv,
  Wifi,
  Droplet,
  Wrench,
  Check,
  Phone,
  MessageCircle,
  Home,
  ChevronRight,
  ShieldCheck,
  Clock,
  CheckCircle2
} from "lucide-react";
export const OurServicesPage = ({ onNavigateHome, onNavigateContact }) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const servicesData = [
    {
      id: "electrical",
      title: "\u26A1 Electrical Services (\u0935\u093F\u0926\u094D\u092F\u0941\u0924 \u0938\u0947\u0935\u093E)",
      summaryTitle: "\u26A1 Electrical Services & Inverter Repair",
      icon: Zap,
      color: "amber",
      bgClass: "bg-amber-50/70 border-amber-200/90",
      badgeClass: "bg-amber-500/20 text-amber-900 border-amber-300",
      items: [
        "\u{1F3E0} House Wiring (\u0918\u0930\u0915\u094B \u0935\u093E\u092F\u0930\u093F\u0919)",
        "\u{1F50C} Electrical Trouble Shooting (\u0935\u093F\u0926\u094D\u092F\u0941\u0924 \u0938\u092E\u0938\u094D\u092F\u093E \u0938\u092E\u093E\u0927\u093E\u0928)",
        "\u{1F6E0}\uFE0F Electrical Maintenance (\u0935\u093F\u0926\u094D\u092F\u0941\u0924 \u092E\u0930\u094D\u092E\u0924 \u0924\u0925\u093E Maintenance)",
        "\u{1F4A1} New Electrical Installation (\u0928\u092F\u093E\u0901 Electrical Installation)",
        "\u{1F50B} Inverter Repair (\u0907\u0928\u094D\u092D\u0930\u094D\u091F\u0930 \u092E\u0930\u094D\u092E\u0924)"
      ]
    },
    {
      id: "cctv",
      title: "\u{1F4F9} CCTV Camera Services (CCTV \u0915\u094D\u092F\u093E\u092E\u0947\u0930\u093E \u0938\u0947\u0935\u093E)",
      summaryTitle: "\u{1F4F9} CCTV Services",
      icon: Camera,
      color: "blue",
      bgClass: "bg-blue-50/70 border-blue-200/90",
      badgeClass: "bg-blue-500/20 text-blue-900 border-blue-300",
      items: [
        "\u{1F4F7} CCTV Camera Installation (CCTV \u091C\u0921\u093E\u0928)",
        "\u{1F527} CCTV Repair (CCTV \u092E\u0930\u094D\u092E\u0924)",
        "\u{1F6E0}\uFE0F CCTV Maintenance (CCTV Maintenance)",
        "\u{1F310} Remote Mobile Viewing & NVR Setup"
      ]
    },
    {
      id: "computer",
      title: "\u{1F4BB} Computer Services (\u0915\u092E\u094D\u092A\u094D\u092F\u0941\u091F\u0930 \u0938\u0947\u0935\u093E)",
      summaryTitle: "\u{1F4BB} Computer Services",
      icon: Monitor,
      color: "slate",
      bgClass: "bg-slate-50 border-slate-200/90",
      badgeClass: "bg-slate-900 text-white",
      items: [
        "\u{1F4BB} Computer Installation (\u0915\u092E\u094D\u092A\u094D\u092F\u0941\u091F\u0930 \u091C\u0921\u093E\u0928)",
        "\u{1F527} Computer Repair (\u0915\u092E\u094D\u092A\u094D\u092F\u0941\u091F\u0930 \u092E\u0930\u094D\u092E\u0924)",
        "\u2699\uFE0F Computer Maintenance (\u0915\u092E\u094D\u092A\u094D\u092F\u0941\u091F\u0930 Maintenance)",
        "\u{1F6E1}\uFE0F Software, Virus & Security Removal"
      ]
    },
    {
      id: "fan",
      title: "\u{1F32C}\uFE0F Fan Services (\u092A\u0902\u0916\u093E \u0938\u0947\u0935\u093E)",
      summaryTitle: "\u{1F32C}\uFE0F Fan Services",
      icon: Wind,
      color: "emerald",
      bgClass: "bg-emerald-50/70 border-emerald-200/90",
      badgeClass: "bg-emerald-500/20 text-emerald-900 border-emerald-300",
      items: [
        "\u{1F300} Ceiling Fan Installation & Repair (Ceiling Fan \u091C\u0921\u093E\u0928 \u0924\u0925\u093E \u092E\u0930\u094D\u092E\u0924)",
        "\u{1F32C}\uFE0F Wall Fan Installation & Repair (Wall Fan \u091C\u0921\u093E\u0928 \u0924\u0925\u093E \u092E\u0930\u094D\u092E\u0924)"
      ]
    },
    {
      id: "tv",
      title: "\u{1F4FA} LED TV Services (LED TV \u0938\u0947\u0935\u093E)",
      summaryTitle: "\u{1F4FA} LED TV Services",
      icon: Tv,
      color: "indigo",
      bgClass: "bg-indigo-50/70 border-indigo-200/90",
      badgeClass: "bg-indigo-500/20 text-indigo-900 border-indigo-300",
      items: [
        "\u{1F4FA} LED TV Installation (LED TV \u091C\u0921\u093E\u0928)",
        "\u{1F527} LED TV Repair (LED TV \u092E\u0930\u094D\u092E\u0924)",
        "\u{1F4E1} TV Wall Mount Bracket Installation"
      ]
    },
    {
      id: "networking",
      title: "\u{1F4E1} DishHome & Networking Services",
      summaryTitle: "\u{1F4E1} DishHome & Networking",
      icon: Wifi,
      color: "cyan",
      bgClass: "bg-cyan-50/70 border-cyan-200/90",
      badgeClass: "bg-cyan-500/20 text-cyan-900 border-cyan-300",
      items: [
        "\u{1F4E1} DishHome Installation (DishHome \u091C\u0921\u093E\u0928)",
        "\u{1F6E0}\uFE0F DishHome Maintenance (DishHome Maintenance)",
        "\u{1F310} Local Networking Setup (Local Network Setup)",
        "\u{1F50C} Fiber Drop Wire & Router Configuration"
      ]
    },
    {
      id: "ac",
      title: "\u2744\uFE0F Air Conditioner (AC) Services",
      summaryTitle: "\u2744\uFE0F AC Services",
      icon: Wind,
      color: "teal",
      bgClass: "bg-teal-50/70 border-teal-200/90",
      badgeClass: "bg-teal-500/20 text-teal-900 border-teal-300",
      items: [
        "\u2744\uFE0F AC Installation (AC \u091C\u0921\u093E\u0928)",
        "\u{1F527} AC Repair (AC \u092E\u0930\u094D\u092E\u0924)",
        "\u{1F6E0}\uFE0F AC Maintenance (AC Maintenance)",
        "\u{1F9F9} Jet Cleaning & Cooling Performance Test"
      ]
    },
    {
      id: "plumbing",
      title: "\u{1F6B0} Plumbing Services (\u092A\u094D\u0932\u092E\u094D\u092C\u093F\u0919 \u0938\u0947\u0935\u093E)",
      summaryTitle: "\u{1F6B0} Plumbing Services",
      icon: Droplet,
      color: "sky",
      bgClass: "bg-sky-50/70 border-sky-200/90",
      badgeClass: "bg-sky-500/20 text-sky-900 border-sky-300",
      items: [
        "\u{1F6B0} Plumbing Trouble Shooting (Plumbing \u0938\u092E\u0938\u094D\u092F\u093E \u0938\u092E\u093E\u0927\u093E\u0928)",
        "\u{1F6E0}\uFE0F Plumbing Maintenance (Plumbing Maintenance)",
        "\u{1F6BF} Pipe Leakage Repair & Water Tank Fitting"
      ]
    }
  ];
  const categoriesSummary = [
    "\u26A1 Electrical Services",
    "\u{1F4F9} CCTV Services",
    "\u{1F4BB} Computer Services",
    "\u{1F32C}\uFE0F Fan Services",
    "\u{1F4FA} LED TV Services",
    "\u{1F4E1} DishHome & Networking",
    "\u{1F50B} Inverter Repair",
    "\u2744\uFE0F AC Services",
    "\u{1F6B0} Plumbing Services"
  ];
  const handleBookService = (serviceName) => {
    const text = encodeURIComponent(`Hello Phidim Service! I want to book on-site service for: ${serviceName}. Please dispatch a technician in Phidim.`);
    window.open(`https://wa.me/9779862772457?text=${text}`, "_blank");
  };
  const filteredServices = selectedCategory === "ALL" ? servicesData : servicesData.filter((s) => s.id === selectedCategory);
  return <div className="bg-gray-50 min-h-screen pb-16">
      
      {
    /* Top Breadcrumbs */
  }
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-xs text-gray-600 font-medium">
          <button
    onClick={onNavigateHome}
    className="hover:text-green-600 flex items-center gap-1 cursor-pointer"
  >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Our Services (हाम्रो सेवाहरू)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {
    /* Page Hero Banner */
  }
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest">
              <Wrench className="w-3.5 h-3.5" />
              <span>Phidim Service • Trusted Technician Network</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              🔧 Our Services | हाम्रो सेवाहरू
            </h1>

            <p className="text-sm sm:text-base text-green-300 font-bold">
              Fast, Reliable, and Professional Doorstep Assistance in Phidim & Panchthar! 🏠⚡
            </p>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              Need a certified electrician, computer technician, CCTV installer, AC mechanic, or plumber? Call us or WhatsApp directly at <strong className="text-white">+977 986-2772457</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
    href="https://wa.me/9779862772457?text=Hello%20Phidim%20Service!%20I%20need%20help%20with..."
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
  >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Helpline: +977 986-2772457</span>
              </a>

              <a
    href="https://wa.me/9779862772457"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-colors border border-white/20 cursor-pointer"
  >
                <Phone className="w-4 h-4 text-green-400" />
                <span>Call +977 986-2772457</span>
              </a>
            </div>
          </div>
        </div>

        {
    /* SUMMARY OF AVAILABLE SERVICE CATEGORIES */
  }
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-green-600" />
              <span>📋 Summary of Available Service Categories</span>
            </h2>
            <span className="text-[11px] font-bold text-gray-500">Phidim Municipality</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {categoriesSummary.map((cat, idx) => <div
    key={idx}
    className="bg-gray-50 border border-gray-200 hover:border-green-400 rounded-xl p-3 text-xs font-black text-gray-800 text-center flex items-center justify-center transition-colors shadow-2xs"
  >
                <span>{cat}</span>
              </div>)}
          </div>
        </div>

        {
    /* Category Filter Pills */
  }
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
    onClick={() => setSelectedCategory("ALL")}
    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${selectedCategory === "ALL" ? "bg-slate-900 text-white shadow-xs" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"}`}
  >
            All Technical Services
          </button>
          {servicesData.map((s) => <button
    key={s.id}
    onClick={() => setSelectedCategory(s.id)}
    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${selectedCategory === s.id ? "bg-slate-900 text-white shadow-xs" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"}`}
  >
              {s.summaryTitle}
            </button>)}
        </div>

        {
    /* DETAILED SERVICES GRID */
  }
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => {
    const ServiceIcon = service.icon;
    return <div
      key={service.id}
      className={`border rounded-3xl p-6 space-y-4 shadow-xs transition-all hover:shadow-md ${service.bgClass}`}
    >
                <div className="flex items-start justify-between gap-3 border-b border-black/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center font-black">
                      <ServiceIcon className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-gray-950">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-gray-600 font-semibold mt-0.5">
                        Phidim Doorstep Technician Service
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${service.badgeClass}`}>
                    AVAILABLE
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-800 font-medium">
                  {service.items.map((item, i) => <li key={i} className="flex items-start gap-2.5 bg-white/70 p-2 rounded-xl border border-black/5">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span className="font-semibold text-gray-900">{item}</span>
                    </li>)}
                </ul>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-black/10">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>Quick 30-min Response</span>
                  </div>

                  <button
      onClick={() => handleBookService(service.title)}
      className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
    >
                    <MessageCircle className="w-3.5 h-3.5 text-green-400 fill-current" />
                    <span>Book on WhatsApp</span>
                  </button>
                </div>
              </div>;
  })}
        </div>

        {
    /* BOTTOM CALLOUT / CONTACT HELPLINE */
  }
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>Need Immediate Assistance from Our Service Team?</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              Phidim Service technicians are equipped with genuine spare parts, diagnostic meters, and professional tools for home, office, and business repair.
            </p>
            <p className="text-xs font-bold text-green-400">
              Hotline: +977 986-2772457 • Phidim Municipality, Nepal
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
    href="https://wa.me/9779862772457?text=Hello%20Phidim%20Service!%20I%20need%20a%20technician."
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
  >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp +977 986-2772457</span>
            </a>
          </div>
        </div>

      </div>
    </div>;
};
