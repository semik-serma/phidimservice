import { useState } from "react";
import { Menu, ChevronDown, ShieldCheck, Wifi, Router, Camera, Tv, Smartphone, Home, ShoppingBag, Wrench, Heart, Sparkles, ExternalLink } from "lucide-react";
import { CATEGORIES } from "../data/products";
import { formatCount } from "../utils/formatCount";
export const Navbar = ({
  activeTab,
  setActiveTab,
  onSelectCategory,
  onOpenTechnicianAuth,
  likeCount = 582,
  onIncrementLikes
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const handleLikeClick = () => {
    setHasLiked(true);
    if (onIncrementLikes) {
      onIncrementLikes();
    }
    setTimeout(() => setHasLiked(false), 800);
  };
  const getIcon = (iconName) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-green-600" />;
      case "Wifi":
        return <Wifi className="w-4 h-4 text-blue-600" />;
      case "Router":
        return <Router className="w-4 h-4 text-purple-600" />;
      case "Camera":
        return <Camera className="w-4 h-4 text-indigo-600" />;
      case "Tv":
        return <Tv className="w-4 h-4 text-red-600" />;
      case "Smartphone":
        return <Smartphone className="w-4 h-4 text-yellow-600" />;
      case "Home":
        return <Home className="w-4 h-4 text-teal-600" />;
      default:
        return <ShoppingBag className="w-4 h-4 text-orange-600" />;
    }
  };
  const navItems = ["HOME", "ALL SERVICES", "LAN NETWORKING", "ABOUT", "CONTACT US"];
  return <nav className="bg-white border-b border-gray-200 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        
        {
    /* Browse Categories Dropdown Button */
  }
        <div className="relative py-2 md:py-0">
          <button
    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
    className="bg-[#8cc63f] hover:bg-[#7db333] text-white font-bold py-3.5 px-6 flex items-center gap-3 transition-colors text-xs uppercase tracking-wider cursor-pointer shadow-xs rounded-sm"
  >
            <Menu className="w-4 h-4" />
            <span>BROWSE CATEGORIES</span>
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
          </button>

          {
    /* Categories Dropdown Menu */
  }
          {isCategoryOpen && <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {CATEGORIES.map((cat) => <button
    key={cat.id}
    onClick={() => {
      onSelectCategory(cat.name);
      setActiveTab("ALL SERVICES");
      setIsCategoryOpen(false);
    }}
    className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 flex items-center justify-between transition-colors border-b border-gray-50 last:border-0 font-medium cursor-pointer"
  >
                  <div className="flex items-center gap-2.5">
                    {getIcon(cat.icon)}
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </button>)}
            </div>}
        </div>

        {
    /* Center Nav Links */
  }
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold tracking-wider">
          {navItems.map((item) => {
    const isActive = activeTab === item;
    return <button
      key={item}
      onClick={() => {
        setActiveTab(item);
        if (item === "HOME" || item === "ALL SERVICES") {
          onSelectCategory("ALL");
        }
      }}
      className={`py-4 transition-colors relative cursor-pointer uppercase ${isActive ? 'text-gray-900 font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600' : "text-gray-600 hover:text-green-600"}`}
    >
                {item}
              </button>;
  })}
        </div>

        {/* Like Button & Technician Login on Right */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-xs">

          {/* Navbar Like Button */}
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer border ${hasLiked ? "bg-red-500 text-white border-red-600 scale-110 shadow-md" : "bg-red-50 hover:bg-red-100 text-red-600 border-red-200"}`}
            title="Click to like Phidim Service!"
          >
            <Heart className={`w-4 h-4 ${hasLiked ? "fill-white animate-ping" : "fill-red-500 text-red-500"}`} />
            <span>{formatCount(likeCount)}</span>
          </button>

          <button
            onClick={onOpenTechnicianAuth}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-3 py-2 rounded-lg text-[11px] shadow-xs transition-colors cursor-pointer tracking-tight"
            title="Technician Login or Register"
          >
            <Wrench className="w-3.5 h-3.5 text-green-400" />
            <span className="hidden sm:inline">Continue as technician</span>
            <span className="sm:hidden">Technician</span>
          </button>
        </div>

      </div>
    </nav>;
};
