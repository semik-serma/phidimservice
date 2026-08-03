import { ShieldCheck, Wifi, Router, Camera, Tv, Smartphone, Home, ShoppingBag } from "lucide-react";
import { CATEGORIES } from "../data/products";
export const PopularCategories = ({ onSelectCategory }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-7 h-7 text-[#d81b6a]" />;
      case "Wifi":
        return <Wifi className="w-7 h-7 text-blue-600" />;
      case "Router":
        return <Router className="w-7 h-7 text-purple-600" />;
      case "Camera":
        return <Camera className="w-7 h-7 text-indigo-600" />;
      case "Tv":
        return <Tv className="w-7 h-7 text-red-600" />;
      case "Smartphone":
        return <Smartphone className="w-7 h-7 text-amber-600" />;
      case "Home":
        return <Home className="w-7 h-7 text-teal-600" />;
      default:
        return <ShoppingBag className="w-7 h-7 text-emerald-600" />;
    }
  };
  return <section className="bg-slate-100/80 py-10 px-4 md:px-8 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        
        {
    /* Category Header in Pink / Magenta as shown in screenshot */
  }
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#e02b6a] tracking-tight lowercase">
            popular categories
          </h3>
          <div className="w-16 h-1 bg-[#e02b6a] mx-auto mt-2 rounded-full" />
        </div>

        {
    /* Category Grid */
  }
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => <div
    key={cat.id}
    onClick={() => onSelectCategory(cat.name)}
    className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#e02b6a]/40 transition-all cursor-pointer flex flex-col items-center text-center group transform hover:-translate-y-1"
  >
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-pink-50 flex items-center justify-center mb-3 transition-colors">
                {getIcon(cat.icon)}
              </div>
              <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#e02b6a] transition-colors line-clamp-2 leading-tight">
                {cat.name}
              </h4>
              <span className="text-[10px] text-gray-400 font-medium mt-1">
                {cat.count} Items
              </span>
            </div>)}
        </div>

      </div>
    </section>;
};
