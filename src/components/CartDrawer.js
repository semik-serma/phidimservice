import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
export const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout
}) => {
  if (!isOpen) return null;
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
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
            <ShoppingBag className="w-5 h-5 text-green-600" />
            <h3 className="font-extrabold text-base text-gray-900">Your Shopping Cart</h3>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
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
          {cartItems.length > 0 ? cartItems.map(({ product, quantity }) => <div
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

                  {
    /* Quantity Controls */
  }
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-300 rounded-md bg-white">
                      <button
    onClick={() => onUpdateQuantity(product.id, -1)}
    className="p-1 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
  >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-800">
                        {quantity}
                      </span>
                      <button
    onClick={() => onUpdateQuantity(product.id, 1)}
    className="p-1 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
  >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
    onClick={() => onRemoveItem(product.id)}
    className="text-red-500 hover:text-red-700 text-xs p-1 cursor-pointer transition-colors"
    title="Remove Item"
  >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>) : <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-gray-700">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1">Explore our CCTV, Fiber Net and Electronics catalog.</p>
            </div>}
        </div>

        {
    /* Footer Checkout Summary */
  }
        {cartItems.length > 0 && <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">
                Rs. {totalAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
              <span>Phidim Delivery Fee</span>
              <span className="font-bold text-green-600">FREE</span>
            </div>

            <div className="border-t border-gray-200 pt-2 flex items-center justify-between text-sm font-black text-gray-900">
              <span>Total Payable</span>
              <span className="text-base text-green-700">
                Rs. {totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <button
    onClick={() => {
      onClose();
      onProceedCheckout();
    }}
    className="w-full py-3 bg-[#8cc63f] hover:bg-[#7db333] text-gray-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
  >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>}

      </div>
    </div>;
};
