import { useState } from "react";
import { X, UserCheck } from "lucide-react";
export const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("LOGIN");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone || !password) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {
    /* Backdrop */
  }
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in" />

      {
    /* Modal Dialog */
  }
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-gray-100">
        
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-sm">
              PHIDIM SERVICE ACCOUNT
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">
              {mode === "LOGIN" ? "Login to Your Account" : "Register New Account"}
            </h3>
          </div>
          <button
    onClick={onClose}
    className="p-1 rounded-full hover:bg-white/20 text-gray-300 transition-colors cursor-pointer"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-bounce">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Welcome Back!</h4>
            <p className="text-xs text-gray-500">Successfully authenticated. Welcome to Phidim Service!</p>
          </div> : <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Mobile Number or Email Address
              </label>
              <div className="relative">
                <input
    type="text"
    required
    placeholder="e.g. 9800000000 or ram@gmail.com"
    value={emailOrPhone}
    onChange={(e) => setEmailOrPhone(e.target.value)}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600 font-medium"
  />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password
              </label>
              <input
    type="password"
    required
    placeholder="••••••••"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600"
  />
            </div>

            <button
    type="submit"
    className="w-full py-3 bg-[#8cc63f] hover:bg-[#7db333] text-gray-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer mt-2"
  >
              {mode === "LOGIN" ? "LOG IN" : "CREATE ACCOUNT"}
            </button>

            <div className="text-center pt-2 text-xs text-gray-600">
              {mode === "LOGIN" ? <p>
                  Don&apos;t have an account?{" "}
                  <button
    type="button"
    onClick={() => setMode("REGISTER")}
    className="text-green-600 font-bold hover:underline cursor-pointer"
  >
                    Register Here
                  </button>
                </p> : <p>
                  Already registered?{" "}
                  <button
    type="button"
    onClick={() => setMode("LOGIN")}
    className="text-green-600 font-bold hover:underline cursor-pointer"
  >
                    Login Here
                  </button>
                </p>}
            </div>

          </form>}

      </div>
    </div>;
};
