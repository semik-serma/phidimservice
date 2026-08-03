import { Star, Heart, Eye, ShoppingCart, Check } from "lucide-react";
export const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  isWishlisted,
  isInCart
}) => {
  return <div className="bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {
    /* Top Image & Badges */
  }
      <div className="relative aspect-4/3 bg-gray-50 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />

        {
    /* Badges */
  }
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.discountPercent && <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-xs shadow-xs">
              -{product.discountPercent}%
            </span>}
          {product.isHot && <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-xs shadow-xs">
              HOT
            </span>}
          {product.isNew && <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-xs shadow-xs">
              NEW
            </span>}
        </div>

        {
    /* Hover Quick Action Buttons */
  }
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
    onClick={(e) => {
      e.stopPropagation();
      onQuickView(product);
    }}
    className="w-9 h-9 rounded-full bg-white text-gray-800 hover:bg-green-600 hover:text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
    title="Quick View"
  >
            <Eye className="w-4 h-4" />
          </button>
          <button
    onClick={(e) => {
      e.stopPropagation();
      onAddToWishlist(product);
    }}
    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer ${isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-800 hover:bg-red-500 hover:text-white"}`}
    title="Add to Wishlist"
  >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {
    /* Product Content */
  }
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {
    /* Category & Brand */
  }
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1 font-semibold">
            <span>{product.category}</span>
            <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-xs font-bold text-[10px]">
              {product.brand}
            </span>
          </div>

          {
    /* Title */
  }
          <h4
    onClick={() => onQuickView(product)}
    className="text-xs md:text-sm font-bold text-gray-900 hover:text-green-600 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
  >
            {product.name}
          </h4>

          {
    /* Rating */
  }
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => <Star
    key={i}
    className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-amber-400" : "text-gray-300"}`}
  />)}
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {
    /* Price & Add to Cart */
  }
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-extrabold text-green-700">
              Rs. {product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && <span className="text-xs text-gray-400 line-through font-medium">
                Rs. {product.originalPrice.toLocaleString("en-IN")}
              </span>}
          </div>

          <button
    onClick={() => onAddToCart(product)}
    className={`w-full py-2 px-3 rounded-md font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${isInCart ? "bg-green-100 text-green-800 border border-green-300" : "bg-[#8cc63f] hover:bg-[#7db333] text-gray-900 shadow-xs"}`}
  >
            {isInCart ? <>
                <Check className="w-4 h-4 text-green-700" />
                <span>ADDED TO CART</span>
              </> : <>
                <ShoppingCart className="w-4 h-4 text-gray-900" />
                <span>ADD TO CART</span>
              </>}
          </button>
        </div>

      </div>

    </div>;
};
