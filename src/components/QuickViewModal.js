import { useState } from "react";
import { X, Star, ShoppingCart, Heart, ShieldCheck, Check } from "lucide-react";
export const QuickViewModal = ({
  product,
  onClose,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  isInCart
}) => {
  const [quantity, setQuantity] = useState(1);
  if (!product) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {
    /* Backdrop */
  }
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in" />

      {
    /* Modal Dialog */
  }
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        <button
    onClick={onClose}
    className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors z-20 cursor-pointer"
  >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {
    /* Image Column */
  }
          <div className="bg-gray-50 p-6 flex items-center justify-center border-r border-gray-100">
            <img
    src={product.image}
    alt={product.name}
    className="w-full max-h-72 object-contain rounded-xl drop-shadow-md"
  />
          </div>

          {
    /* Details Column */
  }
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase bg-green-100 text-green-800 px-2 py-0.5 rounded-xs">
                  {product.category}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase">
                  Brand: {product.brand}
                </span>
              </div>

              <h3 className="text-base md:text-lg font-black text-gray-900 leading-snug mb-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => <Star
    key={i}
    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400" : "text-gray-300"}`}
  />)}
                </div>
                <span className="text-xs font-bold text-gray-600">
                  {product.rating} ({product.reviewCount} customer reviews)
                </span>
              </div>

              {
    /* Price */
  }
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl font-black text-green-700">
                  Rs. {product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && <span className="text-sm text-gray-400 line-through">
                    Rs. {product.originalPrice.toLocaleString("en-IN")}
                  </span>}
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {
    /* Specs List */
  }
              {product.specs && <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs space-y-1 mb-4">
                  <div className="font-bold text-gray-800 mb-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    <span>Technical Specifications</span>
                  </div>
                  {Object.entries(product.specs).map(([k, v]) => <div key={k} className="flex justify-between text-[11px] text-gray-600">
                      <span className="font-semibold">{k}:</span>
                      <span className="text-gray-900 font-bold">{v}</span>
                    </div>)}
                </div>}
            </div>

            {
    /* Actions */
  }
            <div className="pt-2 border-t border-gray-200 flex items-center gap-3">
              <button
    onClick={() => {
      onAddToCart(product, quantity);
      onClose();
    }}
    className={`flex-1 py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${isInCart ? "bg-green-100 text-green-800 border border-green-300" : "bg-[#8cc63f] hover:bg-[#7db333] text-gray-950 shadow-md"}`}
  >
                {isInCart ? <>
                    <Check className="w-4 h-4 text-green-700" />
                    <span>ADDED TO CART</span>
                  </> : <>
                    <ShoppingCart className="w-4 h-4 text-gray-950" />
                    <span>ADD TO CART</span>
                  </>}
              </button>

              <button
    onClick={() => onAddToWishlist(product)}
    className={`p-3 rounded-xl border transition-colors cursor-pointer ${isWishlisted ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-red-600"}`}
    title="Wishlist"
  >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>;
};
