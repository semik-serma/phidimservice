import { useState } from "react";
import { X, CheckCircle2, MapPin, CreditCard, ArrowRight } from "lucide-react";
export const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart
}) => {
  const [step, setStep] = useState("FORM");
  const [paymentMethod, setPaymentMethod] = useState("ESEWA");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "Phidim Bazar, Ward No. 1, Panchthar",
    notes: ""
  });
  if (!isOpen) return null;
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setStep("SUCCESS");
    onClearCart();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {
    /* Backdrop */
  }
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in" />

      {
    /* Modal Dialog */
  }
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-gray-100">
        
        {
    /* Header */
  }
        <div className="p-4 md:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-sm">
              PHIDIM SERVICE EXPRESS CHECKOUT
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">
              {step === "FORM" ? "Order Details & Payment" : "Order Placed Successfully!"}
            </h3>
          </div>
          <button
    onClick={onClose}
    className="p-1.5 rounded-full hover:bg-white/20 text-gray-300 transition-colors cursor-pointer"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "FORM" ? <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {
    /* Customer Information */
  }
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 pb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Delivery Address (Panchthar District)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
    type="text"
    required
    placeholder="e.g. Ram Bahadur Shrestha"
    value={formData.fullName}
    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nepali Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-gray-400 font-bold">+977</span>
                    <input
    type="tel"
    required
    placeholder="98XXXXXXXX"
    value={formData.phone}
    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    className="w-full pl-14 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600 font-medium"
  />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Delivery Location / Ward
                </label>
                <input
    type="text"
    required
    value={formData.address}
    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600"
  />
              </div>
            </div>

            {
    /* Payment Gateway Options */
  }
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 pb-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>Select Payment Method</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {
    /* eSewa Option */
  }
                <div
    onClick={() => setPaymentMethod("ESEWA")}
    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === "ESEWA" ? "border-green-600 bg-green-50 shadow-xs" : "border-gray-200 hover:border-gray-300 bg-white"}`}
  >
                  <div className="w-7 h-7 rounded-full bg-green-600 text-white font-black text-xs flex items-center justify-center mb-1">
                    e
                  </div>
                  <span className="text-xs font-bold text-gray-800">eSewa Wallet</span>
                </div>

                {
    /* Khalti Option */
  }
                <div
    onClick={() => setPaymentMethod("KHALTI")}
    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === "KHALTI" ? "border-purple-600 bg-purple-50 shadow-xs" : "border-gray-200 hover:border-gray-300 bg-white"}`}
  >
                  <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center mb-1">
                    K
                  </div>
                  <span className="text-xs font-bold text-gray-800">Khalti Pay</span>
                </div>

                {
    /* Cash on Delivery Option */
  }
                <div
    onClick={() => setPaymentMethod("COD")}
    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === "COD" ? "border-amber-600 bg-amber-50 shadow-xs" : "border-gray-200 hover:border-gray-300 bg-white"}`}
  >
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center mb-1">
                    Rs
                  </div>
                  <span className="text-xs font-bold text-gray-800">Cash on Delivery</span>
                </div>

                {
    /* Direct Bank Option */
  }
                <div
    onClick={() => setPaymentMethod("BANK")}
    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === "BANK" ? "border-blue-600 bg-blue-50 shadow-xs" : "border-gray-200 hover:border-gray-300 bg-white"}`}
  >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-1">
                    🏛️
                  </div>
                  <span className="text-xs font-bold text-gray-800">Bank Transfer</span>
                </div>
              </div>
            </div>

            {
    /* Total Order Summary Box */
  }
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 font-semibold block">Total Amount Payable</span>
                <span className="text-xl font-black text-green-700">
                  Rs. {totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <button
    type="submit"
    className="bg-[#8cc63f] hover:bg-[#7db333] text-gray-950 font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
  >
                <span>CONFIRM ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form> : <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-gray-900">
              Dhanyabad! Order Confirmed
            </h4>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              Your order reference <span className="font-extrabold text-gray-900">#PS-9824{Math.floor(100 + Math.random() * 900)}</span> has been received. Our Phidim delivery team will call <span className="font-bold text-gray-900">+977 {formData.phone}</span> shortly to confirm delivery.
            </p>
            <div className="pt-4">
              <button
    onClick={() => {
      setStep("FORM");
      onClose();
    }}
    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
  >
                Back to Shopping
              </button>
            </div>
          </div>}

      </div>
    </div>;
};
