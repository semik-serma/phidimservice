import { Search, Heart, ShoppingBag, User, Eye, Facebook, Youtube, Linkedin } from "lucide-react";
import { CATEGORIES } from "../data/products";
import { formatCount } from "../utils/formatCount";
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearchSubmit) {
      onSearchSubmit();
    }
  };
  return <header className="bg-white py-3 px-4 md:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {
    /* Brand Logo */
  }
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setSelectedCategory("ALL")}>
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

        {
    /* Search Bar with Category Select */
  }
        <div className="flex-1 max-w-2xl w-full">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600 transition-all bg-white shadow-xs">
            <input
    type="text"
    placeholder="Search for products & services..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={handleKeyDown}
    className="flex-1 px-4 py-2 text-sm text-gray-800 focus:outline-hidden"
  />
            <div className="border-l border-gray-200 bg-gray-50 px-2 py-1">
              <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="bg-transparent text-xs text-gray-600 font-semibold focus:outline-hidden cursor-pointer py-1 uppercase"
  >
                <option value="ALL">SELECT CATEGORY</option>
                {CATEGORIES.map((cat) => <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>)}
              </select>
            </div>
            <button
    onClick={onSearchSubmit}
    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 border-l border-gray-200 transition-colors flex items-center justify-center cursor-pointer"
    title="Search"
  >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {
    /* User Controls & Social Links */
  }
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
          
          {
    /* Login / Register */
  }
          <button
    onClick={onOpenAuth}
    className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
  >
            <User className="w-4 h-4 text-gray-500" />
            <span>LOGIN / REGISTER</span>
          </button>

          {
    /* Wishlist */
  }
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

          {
    /* Shopping Cart */
  }
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

          {
    /* Social Media Icons (Facebook, YouTube, LinkedIn) & Visitor Count Badge */
  }
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

            {
    /* View Counter Badge on Far Right */
  }
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-900 px-2.5 py-1 rounded-full text-xs font-black shadow-2xs" title="Total Visitor Count (Refreshes count new visitors)">
              <Eye className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
              <span>{formatCount(visitorCount)} Views</span>
            </div>
          </div>

        </div>

      </div>
    </header>;
};
