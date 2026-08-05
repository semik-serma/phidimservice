'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login action
    setTimeout(() => {
      setIsLoading(false);
      toast.info('Login functionality submitted for demo');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden font-sans">
      
      {/* LEFT SIDE: Brand Presentation & Minimal CSS Shapes Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 p-12 flex-col justify-between overflow-hidden">
        
        {/* Subtle CSS Shapes Background & Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Green Gradient Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#16A34A]/25 rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#22C55E]/15 rounded-full filter blur-[100px]" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#166534]/30 rounded-full filter blur-[90px]" />

          {/* CSS Geometric Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `radial-gradient(#16A34A 1px, transparent 1px)`, 
              backgroundSize: '24px 24px' 
            }} 
          />

          {/* Floating Blurred Rings & CSS Shapes */}
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
            <span>Welcome Back to Phidim Service</span>
          </div>

          <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Reliable Technical &amp; Digital Solutions at Your Fingertips.
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Access your personalized service portal to manage requests, hire top-rated local technicians, and track your CCTV &amp; networking solutions seamlessly.
          </p>

          {/* Feature Highlights Grid */}
          <div className="space-y-3.5">
            {[
              "Verified local technicians & experts",
              "Real-time service tracking & history",
              "24/7 dedicated support team"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/40 flex items-center justify-center text-[#22C55E] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Floating Subtle Decorative Badge (CSS Shape Card) */}
          <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#166534] flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Trusted Service Guarantee</p>
              <p className="text-[11px] text-gray-400">Panchthar&apos;s #1 Technical Service Hub</p>
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
        <div className="w-full max-w-[430px] flex items-center justify-between mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#16A34A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Mobile Logo View */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#16A34A] p-0.5 bg-slate-900">
              <img src="/logo.png" alt="Phidim Service Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <span className="text-xs font-black text-[#111827] tracking-tight">PHIDIM SERVICE</span>
          </div>
        </div>

        {/* Auth Card Container (Max Width 430px, Rounded, Soft Shadow) */}
        <div className="w-full max-w-[430px] bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xl shadow-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Card Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 border border-green-100 text-[#16A34A] mb-4 shadow-xs">
              <div className="relative w-9 h-9 rounded-full overflow-hidden p-0.5">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-[#6B7280] mt-1.5">
              Please enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input Field */}
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#16A34A] transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[56px] pl-12 pr-4 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); toast.success('Password reset link sent.'); }}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[56px] pl-12 pr-12 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200"
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
              className="w-full h-[56px] rounded-[14px] bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#22C55E] hover:to-[#16A34A] text-white font-bold text-base shadow-md shadow-[#16A34A]/20 hover:shadow-lg hover:shadow-[#16A34A]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-4 items-center my-2">
            <div className="flex-grow border-t border-[#E5E7EB]"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">OR</span>
            <div className="flex-grow border-t border-[#E5E7EB]"></div>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => toast.info('Google login integration')}
              className="w-full h-[56px] rounded-[14px] border border-[#E5E7EB] bg-white hover:bg-gray-50/80 text-[#111827] text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* GitHub Button */}
            <button
              type="button"
              onClick={() => toast.info('GitHub login integration')}
              className="w-full h-[56px] rounded-[14px] border border-[#E5E7EB] bg-white hover:bg-gray-50/80 text-[#111827] text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs cursor-pointer"
            >
              <svg className="w-5 h-5 fill-[#111827]" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Bottom Navigation Switch */}
          <div className="mt-8 text-center text-xs text-[#6B7280]">
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
