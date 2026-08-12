import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Wifi, ArrowRight, CheckCircle2, Wind, Wrench, ShieldCheck } from "lucide-react";

export const HeroCarousel = ({ onExploreServices, onFiberSelect, onBookService }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      bgClass: "bg-gradient-to-r from-[#0f4c81] via-[#1b6ca8] to-[#2889cb]",
      subtitle: "AIR CONDITIONER & COOLING",
      title: "Professional AC Installation & Outdoor Unit Mounting",
      description: "Complete split AC copper pipe fitting, outdoor bracket mounting, inverter AC wiring, and routine cooling maintenance by Phidim technicians.",
      buttonText: "BOOK AC SERVICE",
      action: () =>
        onBookService
          ? onBookService({
              id: "srv-ac-service",
              name: "Professional AC Installation & Mounting",
              category: "AC & Refrigeration",
              basePrice: 2500,
              duration: "2-3 hours",
              warranty: "1 Year Support",
            })
          : onFiberSelect(),
      type: "ac_install_graphic"
    },
    {
      id: 2,
      bgClass: "bg-gradient-to-r from-[#1a3854] via-[#26537b] to-[#326e9f]",
      subtitle: "AC GAS REFILL & LEAK FIX",
      title: "Expert AC Gas Charging & Chemical Wash Service",
      description: "On-site gas pressure testing, R32/R410a gas refill, copper tube leak soldering, and deep indoor coil chemical wash across Panchthar.",
      buttonText: "BOOK GAS REFILL",
      action: () =>
        onBookService
          ? onBookService({
              id: "srv-ac-gas",
              name: "Expert AC Gas Charging & Deep Cleaning",
              category: "AC & Refrigeration",
              basePrice: 2200,
              duration: "1.5 hours",
              warranty: "90 Days Warranty",
            })
          : onFiberSelect(),
      type: "ac_gas_graphic"
    },
    {
      id: 3,
      bgClass: "bg-gradient-to-r from-[#1b3044] via-[#234563] to-[#2e5d85]",
      subtitle: "REFRIGERATOR & FREEZER CARE",
      title: "Doorstep Refrigerator Gas Charging & Repair",
      description: "Same-day technician visits for single & double door fridges, deep freezers, compressor replacement, thermostat fixes, and gas charging in Phidim.",
      buttonText: "BOOK FRIDGE REPAIR",
      action: () =>
        onBookService
          ? onBookService({
              id: "srv-fridge-repair",
              name: "Doorstep Refrigerator Gas Charging & Repair",
              category: "AC & Refrigeration",
              basePrice: 1800,
              duration: "1-2 hours",
              warranty: "6 Months Support",
            })
          : onExploreServices
          ? onExploreServices()
          : onFiberSelect(),
      type: "fridge_graphic"
    },
    {
      id: 4,
      bgClass: "bg-gradient-to-r from-[#173a5e] via-[#1e4e7c] to-[#28669e]",
      subtitle: "CEILING FAN & APPLIANCE REPAIR",
      title: "Ceiling Fan Winding & Appliance Maintenance",
      description: "Doorstep ceiling fan repair, capacitor replacement, motor winding, inverter servicing, and home electrical fittings across Phidim Wards 1 to 4.",
      buttonText: "BOOK APPLIANCE REPAIR",
      action: () =>
        onBookService
          ? onBookService({
              id: "srv-fan-repair",
              name: "Ceiling Fan Winding & Appliance Maintenance",
              category: "Electrical & Inverter",
              basePrice: 600,
              duration: "1 hour",
              warranty: "30 Days Guarantee",
            })
          : onExploreServices
          ? onExploreServices()
          : onFiberSelect(),
      type: "fan_graphic"
    },
    {
      id: 5,
      bgClass: "bg-gradient-to-r from-[#0d3b66] via-[#16528e] to-[#1f69b5]",
      subtitle: "DISHHOME DTH & FIBER DP BOX",
      title: "DishHome DTH & Optical Fiber DP Box Connection",
      description: "Authorized DishHome optical fiber DP box splicing, drop wire routing, ONU dual-band WiFi router setup, and HD setup box installation.",
      buttonText: "VIEW DTH PACKAGES",
      action: onFiberSelect,
      type: "dp_graphic"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="hidden md:flex relative overflow-hidden w-full min-h-[500px] md:min-h-[580px] lg:min-h-[620px] items-center shadow-2xl border-b border-slate-800/40">
      {/* Dynamic Slide Background */}
      <div className={`absolute inset-0 transition-all duration-700 ${active.bgClass}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Main Slide Container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full py-12 md:py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="md:col-span-6 text-white space-y-4 animate-in fade-in slide-in-from-left duration-500">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-200 uppercase bg-white/10 px-3 py-1 rounded-sm border border-white/20">
              {active.subtitle}
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              {active.title}
            </h2>

            <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed max-w-lg font-normal">
              {active.description}
            </p>

            <div className="pt-2">
              <button
                onClick={active.action}
                className="inline-flex items-center gap-2 border-2 border-white/80 hover:border-white text-white font-bold text-xs px-6 py-2.5 uppercase tracking-wider rounded-xs hover:bg-white hover:text-blue-900 transition-all cursor-pointer shadow-lg hover:shadow-xl"
              >
                <span>{active.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Service Graphic Column */}
          <div className="md:col-span-6 flex items-center justify-center relative min-h-[280px]">

            {/* 1. AC Installation Graphic (Ac1.jpg + Ac2.jpg) */}
            {active.type === "ac_install_graphic" && (
              <div className="relative w-full max-w-md bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/30 text-white shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-7 h-7 text-cyan-300 animate-pulse" />
                    <div>
                      <h4 className="font-black text-sm text-white">Split AC Mounting & Service</h4>
                      <p className="text-[10px] text-cyan-200 font-semibold">Phidim Doorstep Technician</p>
                    </div>
                  </div>
                  <span className="bg-cyan-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    REAL FIELD WORK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md group">
                    <img
                      src="/Ac1.jpg"
                      alt="AC Servicing Phidim 1"
                      className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] font-black text-cyan-300 drop-shadow-md">
                        🛠️ Indoor Unit Service
                      </span>
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md group">
                    <img
                      src="/Ac2.jpg"
                      alt="AC Servicing Phidim 2"
                      className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] font-black text-cyan-300 drop-shadow-md">
                        ❄️ Outdoor Bracket Mount
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Copper Pipe Fitting</span>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>30-Min On-Site Dispatch</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. AC Gas Release Graphic (Acgasrelease4.jpg + Ac3.jpg) */}
            {active.type === "ac_gas_graphic" && (
              <div className="relative w-full max-w-md bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/30 text-white shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-7 h-7 text-cyan-300 animate-pulse" />
                    <div>
                      <h4 className="font-black text-sm text-white">AC Gas Charging & Pressure Test</h4>
                      <p className="text-[10px] text-cyan-200 font-semibold">Phidim On-Site Technician</p>
                    </div>
                  </div>
                  <span className="bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    GAS CHARGING
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md group">
                    <img
                      src="/Acgasrelease4.jpg"
                      alt="AC Gas Release Service"
                      className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] font-black text-cyan-300 drop-shadow-md">
                        💨 Gas Pressure Release
                      </span>
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-md group">
                    <img
                      src="/Ac3.jpg"
                      alt="AC Technician Servicing"
                      className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] font-black text-cyan-300 drop-shadow-md">
                        🛠️ Coil & Valve Test
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>R32 / R410a Gas Refill</span>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Leak Detection Test</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Refrigerator Gas Charging (frggaschr.jpg) */}
            {active.type === "fridge_graphic" && (
              <div className="relative w-full max-w-sm bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/30 text-white shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-7 h-7 text-cyan-300 animate-pulse" />
                    <div>
                      <h4 className="font-black text-sm text-white">Refrigerator Gas Charging</h4>
                      <p className="text-[10px] text-cyan-200 font-semibold">Phidim Fridge Repair</p>
                    </div>
                  </div>
                  <span className="bg-cyan-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    SAME DAY FIX
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-lg group">
                  <img
                    src="/frggaschr.jpg"
                    alt="Refrigerator Gas Charging Phidim"
                    className="w-full h-44 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-black text-cyan-300 drop-shadow-md">
                      🧊 Fridge Compressor & Gas Refill Service
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Gas Charging & Soldering</span>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Single & Double Door</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Ceiling Fan & Electrical (Ceilingfan1.jpg) */}
            {active.type === "fan_graphic" && (
              <div className="relative w-full max-w-sm bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/30 text-white shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-7 h-7 text-green-400 animate-pulse" />
                    <div>
                      <h4 className="font-black text-sm text-white">Ceiling Fan & Appliance Repair</h4>
                      <p className="text-[10px] text-green-200 font-semibold">Phidim Electrical Technician</p>
                    </div>
                  </div>
                  <span className="bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    ON-SITE FIX
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-lg group">
                  <img
                    src="/Ceilingfan1.jpg"
                    alt="Ceiling Fan Repair Phidim"
                    className="w-full h-44 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-black text-green-300 drop-shadow-md">
                      ⚡ Motor Winding, Capacitor & Wiring
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Capacitor & Regulator Fix</span>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>House Wiring & Breakers</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. DishHome DP Box & Fiber Networking (dp1.jpg) */}
            {active.type === "dp_graphic" && (
              <div className="relative w-full max-w-sm bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/30 text-white shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-7 h-7 text-cyan-300 animate-pulse" />
                    <div>
                      <h4 className="font-black text-sm text-white">DishHome Optical Fiber DP Box</h4>
                      <p className="text-[10px] text-cyan-200 font-semibold">Phidim Broadband Network</p>
                    </div>
                  </div>
                  <span className="bg-cyan-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    DTH & FIBER
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-lg group bg-slate-900/50">
                  <img
                    src="/image.png"
                    alt="DishHome DTH Official Connection Phidim"
                    className="w-full h-44 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-black text-cyan-300 drop-shadow-md">
                      📡 DishHome DTH Official Connection & Fiber Setup
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Fiber Splicing & Drop Wire</span>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>DishHome DTH Connection</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-all z-20 cursor-pointer backdrop-blur-sm border border-white/20 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-all z-20 cursor-pointer backdrop-blur-sm border border-white/20 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
