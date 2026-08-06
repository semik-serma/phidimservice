'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  User,
  Wrench,
  Shield,
  Zap,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';
import { useAuth, DEMO_ACCOUNTS } from '@/context/AuthContext';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [role, setRole] = useState('USER'); // 'USER' | 'TECHNICIAN' | 'ADMIN'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const account = await login({ emailOrPhone: email, password, role });
      toast.success(`Welcome back, ${account.name}! Redirecting to dashboard...`);
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleDemoLogin = async (selectedRole) => {
    setRole(selectedRole);
    const demo = DEMO_ACCOUNTS[selectedRole];
    setEmail(demo.email);
    setPassword('password123');
    try {
      const account = await login({ emailOrPhone: demo.email, password: 'password123', role: selectedRole });
      toast.success(`Signed in as ${account.name} (${selectedRole}). Redirecting to ${account.dashboardPath}...`);
    } catch (err) {
      toast.error('Demo login error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* LEFT SIDE: Brand Presentation & Minimal CSS Shapes Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 p-12 flex-col justify-between overflow-hidden">
        {/* Subtle CSS Shapes Background & Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#16A34A]/25 rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#22C55E]/15 rounded-full filter blur-[100px]" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#166534]/30 rounded-full filter blur-[90px]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#16A34A 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="absolute top-20 right-20 w-48 h-48 border border-[#16A34A]/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-24 right-24 w-40 h-40 border border-dashed border-[#22C55E]/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute bottom-32 left-16 w-72 h-72 border border-white/5 rounded-full" />
        </div>

        {/* Header Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#16A34A] shadow-lg p-0.5 bg-slate-900 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.png"
                alt="Phidim Service Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight leading-none group-hover:text-[#22C55E] transition-colors">
                PHIDIM SERVICE
              </h1>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1">
                Panchthar • Koshi • Nepal
              </p>
            </div>
          </Link>
        </div>

        {/* Center Content & Glass Card Showcase */}
        <div className="relative z-10 my-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#22C55E] text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome Back to Phidim Service Portal</span>
          </div>

          <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Reliable Technical & Digital Solutions at Your Fingertips.
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Access your personalized service portal to manage requests, hire top-rated local technicians, track CCTV & networking solutions, or manage field operations.
          </p>

          {/* Quick Demo Login Cards */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              ⚡ 1-Click Instant Demo Login:
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('USER')}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all text-center flex flex-col items-center gap-1 group cursor-pointer"
              >
                <User className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('TECHNICIAN')}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all text-center flex flex-col items-center gap-1 group cursor-pointer"
              >
                <Wrench className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
                <span>Technician</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('ADMIN')}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all text-center flex flex-col items-center gap-1 group cursor-pointer"
              >
                <Shield className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Phidim Service. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: Centered Authentication Card */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-12 bg-white min-h-screen relative">
        {/* Top Back Navigation Link */}
        <div className="w-full max-w-[440px] flex items-center justify-between mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#16A34A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="lg:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#16A34A] p-0.5 bg-slate-900">
              <img src="/logo.png" alt="Phidim Service Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <span className="text-xs font-black text-[#111827] tracking-tight">PHIDIM SERVICE</span>
          </div>
        </div>

        {/* Auth Card Container */}
        <div className="w-full max-w-[440px] bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xl shadow-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
          {/* Card Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 border border-green-100 text-[#16A34A] mb-3 shadow-xs">
              <div className="relative w-9 h-9 rounded-full overflow-hidden p-0.5">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
              Sign In to Phidim Service
            </h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Select your account type and enter credentials
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100 text-xs font-bold border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setRole('USER');
                setEmail(DEMO_ACCOUNTS.USER.email);
              }}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'USER'
                  ? 'bg-white text-[#16A34A] shadow-md font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('TECHNICIAN');
                setEmail(DEMO_ACCOUNTS.TECHNICIAN.email);
              }}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'TECHNICIAN'
                  ? 'bg-slate-900 text-emerald-400 shadow-md font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Tech</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('ADMIN');
                setEmail(DEMO_ACCOUNTS.ADMIN.email);
              }}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'ADMIN'
                  ? 'bg-emerald-950 text-amber-400 shadow-md font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Quick 1-Click Demo Shortcut */}
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span className="font-bold text-emerald-900">1-Click {role} Sign In</span>
            </div>
            <button
              type="button"
              onClick={() => handleDemoLogin(role)}
              className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] shadow-sm transition-all"
            >
              Log In as {role}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input Field */}
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
                Email / Phone ({role})
              </label>
              <div className="relative group">
                <Mail className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#16A34A] transition-colors" />
                <input
                  type="text"
                  required
                  placeholder="name@example.com or mobile phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[52px] pl-12 pr-4 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 font-medium"
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success('Password reset link sent to registered email.');
                  }}
                  className="text-xs font-bold text-[#16A34A] hover:text-[#22C55E] transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <Lock className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#16A34A] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[52px] pl-12 pr-12 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] p-1 focus:outline-none transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#E5E7EB] text-[#16A34A] focus:ring-[#16A34A] accent-[#16A34A] cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2.5 text-xs text-[#6B7280] font-medium cursor-pointer select-none">
                Remember me on this device
              </label>
            </div>

            {/* Green Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[52px] rounded-[14px] bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#22C55E] hover:to-[#16A34A] text-white font-bold text-base shadow-md shadow-[#16A34A]/20 hover:shadow-lg hover:shadow-[#16A34A]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as {role}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Register Navigation Switch */}
          <div className="text-center text-xs text-[#6B7280] pt-2">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-bold text-[#16A34A] hover:text-[#22C55E] transition-colors ml-1"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
