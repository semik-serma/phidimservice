import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Eye, Facebook, Youtube, Linkedin, Globe, ExternalLink, LayoutDashboard, LogOut } from "lucide-react";
import { CATEGORIES } from "../data/products";
import { formatCount } from "../utils/formatCount";
import { useAuth } from "@/context/AuthContext";

export const Header = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  cartTotal,
  wishlistCount,
  visitorCount = 1285,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onSearchSubmit
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <header className="hidden md:block bg-white py-3.5 px-4 md:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-6">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none shrink-0" onClick={() => setSelectedCategory("ALL")}>
          <div className="relative w-12 h-12 md:w-13 md:h-13 rounded-full overflow-hidden border-2 border-green-500/80 shadow-md hover:scale-105 transition-transform bg-slate-950 p-0.5 shrink-0">
            <img
              src="/logo.png"
              alt="Phidim Service Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-none flex items-center gap-1">
              <span>PHIDIM SERVICE</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-0.5">
              Panchthar • Koshi • Nepal
            </p>
          </div>
        </div>

        {/* Search Bar with Category Select - Bigger & Wider */}
        <div className="flex-1 max-w-3xl lg:max-w-4xl w-full">
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20 transition-all bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search for products & services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-gray-800 focus:outline-hidden font-medium"
            />
            <div className="border-l border-gray-200 bg-gray-50 px-2 sm:px-3 py-1.5">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-gray-700 font-bold focus:outline-hidden cursor-pointer py-1 uppercase"
              >
                <option value="ALL">SELECT CATEGORY</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={onSearchSubmit}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-bold transition-colors flex items-center justify-center cursor-pointer gap-2 shrink-0"
              title="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">Search</span>
            </button>
          </div>
        </div>

        {/* User Controls & Social Links */}
        <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto justify-between md:justify-end shrink-0">
          
          {/* Authentication Actions: Hide LOGIN / REGISTER when logged in */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                href={user.dashboardPath || "/dashboard/user"}
                className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors shadow-2xs"
                title="Go to Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden xl:inline">Dashboard ({user.role})</span>
                <span className="xl:hidden">Dashboard</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span>LOGOUT</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-gray-500" />
              <span>LOGIN / REGISTER</span>
            </Link>
          )}

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative flex items-center text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          </button>

          {/* Shopping Cart */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 text-gray-800 hover:text-green-600 transition-colors cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="text-xs font-bold text-gray-900">
              Rs {cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </button>

          {/* Social Media Icons & Developer Portfolio */}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-3 ml-1">
            <div className="flex items-center gap-1.5">
              <a
                href="https://www.facebook.com/dhanraj.serma.14"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 hover:opacity-90 transition-all shadow-xs"
                title="Facebook: Dhanraj Serma"
              >
                <Facebook className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href="https://www.youtube.com/@semikserma"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:scale-110 hover:opacity-90 transition-all shadow-xs"
                title="YouTube: @semikserma"
              >
                <Youtube className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href="https://www.linkedin.com/in/semik-serma-8263a3391/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:scale-110 hover:opacity-90 transition-all shadow-xs"
                title="LinkedIn: Semik Serma"
              >
                <Linkedin className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>

            {/* View Counter Badge */}
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-900 px-2.5 py-1 rounded-full text-xs font-black shadow-2xs" title="Total Visitor Count">
              <Eye className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
              <span>{formatCount(visitorCount)} Views</span>
            </div>

            {/* Developer Portfolio Link */}
            <a
              href="https://portfolio.phidimservice.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black px-3 py-1 rounded-full text-xs shadow-2xs transition-all hover:scale-105"
              title="Visit Semik Serma's Portfolio Website"
            >
              <Globe className="w-3.5 h-3.5 text-slate-950" />
              <span>Developed by Semik Serma</span>
              <ExternalLink className="w-3 h-3 text-slate-950" />
            </a>
          </div>

        </div>

      </div>
    </header>
  );
};
