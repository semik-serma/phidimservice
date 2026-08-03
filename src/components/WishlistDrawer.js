import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
export const WishlistDrawer = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex justify-end">
      {
    /* Backdrop */
  }
      <div
    onClick={onClose}
    className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
  />

      {
    /* Slide-over Content */
  }
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        
        {
    /* Header */
  }
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h3 className="font-extrabold text-base text-gray-900">Your Wishlist</h3>
            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {wishlistProducts.length} Saved
            </span>
          </div>
          <button
    onClick={onClose}
    className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Item List */
  }
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {wishlistProducts.length > 0 ? wishlistProducts.map((product) => <div
    key={product.id}
    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200/80"
  >
                <img
    src={product.image}
    alt={product.name}
    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
  />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <div className="text-xs text-green-700 font-extrabold mt-0.5">
                    Rs. {product.price.toLocaleString("en-IN")}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
    onClick={() => onAddToCart(product)}
    className="bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold px-3 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
  >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Cart</span>
                    </button>

                    <button
    onClick={() => onRemoveFromWishlist(product.id)}
    className="text-gray-400 hover:text-red-600 text-xs p-1 cursor-pointer transition-colors"
    title="Remove"
  >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>) : <div className="text-center py-16">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-gray-700">Your wishlist is empty</p>
              <p className="text-xs text-gray-400 mt-1">Save your favorite CCTV cameras or devices for later.</p>
            </div>}
        </div>

      </div>
    </div>;
};
