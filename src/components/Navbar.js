import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Wifi,
  Router,
  Camera,
  Tv,
  Smartphone,
  Home,
  ShoppingBag,
  Wrench,
  Heart,
  Search,
  User,
  Eye,
  Facebook,
  Youtube,
  Linkedin
} from "lucide-react";
import { CATEGORIES } from "../data/products";
import { formatCount } from "../utils/formatCount";

export const Navbar = ({
  activeTab,
  setActiveTab,
  onSelectCategory,
  onOpenTechnicianAuth,
  likeCount = 582,
  onIncrementLikes,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  cartCount = 0,
  cartTotal = 0,
  wishlistCount = 0,
  visitorCount = 1285,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onSearchSubmit
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  return (
    <nav className="bg-white border-b border-gray-200 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-8 py-2 md:py-0">
        
        {/* Left Side: Mobile Hamburger & Browse Categories */}
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-green-600 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
            title="Open Mobile Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-900" /> : <Menu className="w-5 h-5 text-gray-900" />}
          </button>

          {/* Browse Categories Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="bg-[#8cc63f] hover:bg-[#7db333] text-white font-bold py-2.5 px-3 sm:px-5 md:py-3.5 md:px-6 flex items-center gap-2 sm:gap-3 transition-colors text-[11px] sm:text-xs uppercase tracking-wider cursor-pointer shadow-xs rounded-sm"
            >
              <Menu className="w-4 h-4 hidden sm:block" />
              <span>CATEGORIES</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Categories Dropdown Menu */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {CATEGORIES.map((cat) => (
                  <button
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
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold tracking-wider">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  if (item === "HOME" || item === "ALL SERVICES") {
                    onSelectCategory("ALL");
                  }
                }}
                className={`py-4 transition-colors relative cursor-pointer uppercase ${
                  isActive
                    ? 'text-gray-900 font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600'
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right Side: Quick Action Icons on Navbar */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          
          {/* Quick Wishlist Icon for Mobile */}
          <button
            onClick={onOpenWishlist}
            className="md:hidden relative p-2 text-gray-700 hover:text-red-500 transition-colors cursor-pointer bg-gray-100 rounded-lg"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Quick Cart Icon for Mobile */}
          <button
            onClick={onOpenCart}
            className="md:hidden relative p-2 text-gray-700 hover:text-green-600 transition-colors cursor-pointer bg-gray-100 rounded-lg"
            title="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Navbar Like Button */}
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer border ${
              hasLiked
                ? "bg-red-500 text-white border-red-600 scale-110 shadow-md"
                : "bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
            }`}
            title="Click to like Phidim Service!"
          >
            <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-white animate-ping" : "fill-red-500 text-red-500"}`} />
            <span>{formatCount(likeCount)}</span>
          </button>

          {/* Technician Login / Portal */}
          <button
            onClick={onOpenTechnicianAuth}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[11px] shadow-xs transition-colors cursor-pointer tracking-tight"
            title="Technician Login or Register"
          >
            <Wrench className="w-3.5 h-3.5 text-green-400" />
            <span className="hidden sm:inline">Continue as technician</span>
            <span className="sm:hidden">Tech</span>
          </button>
        </div>

      </div>

      {/* Mobile Navigation Hamburger Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-250 overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-slate-950 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-green-500 p-0.5 overflow-hidden shrink-0">
                  <img src="/logo.png" alt="Phidim Service Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <h2 className="font-black text-sm tracking-tight text-white leading-none">PHIDIM SERVICE</h2>
                  <p className="text-[9px] text-gray-400 font-semibold uppercase mt-0.5">Panchthar • Koshi • Nepal</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Bar */}
            <div className="p-3.5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-green-600 shadow-2xs">
                <input
                  type="text"
                  placeholder="Search products & services..."
                  value={searchQuery || ""}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && onSearchSubmit) {
                      onSearchSubmit();
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="flex-1 px-3 py-2 text-xs text-gray-800 focus:outline-hidden"
                />
                <button
                  onClick={() => {
                    if (onSearchSubmit) onSearchSubmit();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Buttons Grid (Login, Wishlist, Cart) */}
            <div className="p-3.5 border-b border-gray-100 grid grid-cols-3 gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-200 hover:border-green-300 transition-all font-bold text-gray-700 hover:text-green-700 cursor-pointer"
              >
                <User className="w-4 h-4 text-green-600 mb-1" />
                <span className="text-[10px]">Login</span>
              </Link>

              <button
                onClick={() => {
                  if (onOpenWishlist) onOpenWishlist();
                  setIsMobileMenuOpen(false);
                }}
                className="relative flex flex-col items-center justify-center p-2.5 bg-gray-50 hover:bg-red-50 rounded-xl border border-gray-200 hover:border-red-300 transition-all font-bold text-gray-700 hover:text-red-600 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-red-500 mb-1" />
                <span className="text-[10px]">Wishlist ({wishlistCount || 0})</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenCart) onOpenCart();
                  setIsMobileMenuOpen(false);
                }}
                className="relative flex flex-col items-center justify-center p-2.5 bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-200 hover:border-green-300 transition-all font-bold text-gray-700 hover:text-green-700 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-green-600 mb-1" />
                <span className="text-[10px]">Cart ({cartCount || 0})</span>
              </button>
            </div>

            {/* Main Mobile Navigation Links */}
            <div className="p-3.5 border-b border-gray-100 flex-1">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">Main Navigation</h3>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item;
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveTab(item);
                        if (item === "HOME" || item === "ALL SERVICES") {
                          onSelectCategory("ALL");
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-green-600 text-white shadow-xs"
                          : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
                      }`}
                    >
                      <span>{item}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer inside Mobile Drawer: Social Links & Visitor Counter */}
            <div className="p-3.5 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/dhanraj.serma.14"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
                    title="Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5 fill-current" />
                  </a>
                  <a
                    href="https://www.youtube.com/@semikserma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
                    title="YouTube"
                  >
                    <Youtube className="w-3.5 h-3.5 fill-current" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/semik-serma-8263a3391/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-current" />
                  </a>
                </div>

                <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-900 px-2.5 py-1 rounded-full text-[11px] font-black">
                  <Eye className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
                  <span>{formatCount(visitorCount || 1285)} Views</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};
