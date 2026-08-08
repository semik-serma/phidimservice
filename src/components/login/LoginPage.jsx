'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Shield,
  User,
  Wrench,
  Zap,
  LifeBuoy,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/toast';
import { useAuth, DEMO_ACCOUNTS } from '@/context/AuthContext';
import { FloatingField } from '@/components/login/FloatingField';
import { BrandPanel } from '@/components/login/BrandPanel';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLE_TABS = [
  {
    key: 'USER',
    label: 'Customer',
    icon: User,
    active: 'bg-white text-[#16A34A] shadow-md font-black',
    inactive: 'text-slate-500 hover:text-slate-800',
  },
  {
    key: 'TECHNICIAN',
    label: 'Technician',
    icon: Wrench,
    active: 'bg-slate-900 text-emerald-400 shadow-md font-black',
    inactive: 'text-slate-500 hover:text-slate-800',
  },
  {
    key: 'ADMIN',
    label: 'Admin',
    icon: Shield,
    active: 'bg-emerald-950 text-amber-400 shadow-md font-black',
    inactive: 'text-slate-500 hover:text-slate-800',
  },
];

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
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
  );
}

export default function LoginPage() {
  const { user, isAuthenticated, login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState('USER'); // 'USER' | 'TECHNICIAN' | 'ADMIN'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Surface Google OAuth failures passed back via ?error= in the callback redirect.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get('error');
    if (!oauthError) return;
    const messages = {
      OAuthAccessDenied: 'You cancelled Google sign-in. Please try again.',
      NoCodeProvided: 'Google did not return an authorization code. Please try again.',
      TokenExchangeFailed: 'Google sign-in failed during token exchange. Please try again.',
      ProfileFetchFailed: 'Google sign-in could not load your profile. Please try again.',
      SignupFailed: 'Could not create your account. Please try again.',
      CallbackException: 'Google sign-in hit an unexpected error. Please try again.',
      InvalidOAuthState: 'Google sign-in verification failed. Please try again.',
    };
    setServerError(messages[oauthError] || 'Google sign-in failed. Please try again.');
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  const validate = () => {
    const errors = {};
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      errors.email = 'Email / phone is required.';
    } else if (!trimmed.includes('@') && !/^[+]?[\d\s-]{7,15}$/.test(trimmed)) {
      errors.email = 'Enter a valid email address or phone number.';
    } else if (trimmed.includes('@') && !EMAIL_RE.test(trimmed)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    } else if (password.length > 100) {
      errors.password = 'Password must be at most 100 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const account = await login({
        emailOrPhone: email.trim().toLowerCase(),
        password,
        rememberMe,
        role,
      });
      toast.success(`Welcome back, ${account.name}! Redirecting to dashboard...`);
    } catch (err) {
      const msg = err?.message || 'Login failed. Please check your credentials.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (selectedRole) => {
    setRole(selectedRole);
    const demo = DEMO_ACCOUNTS[selectedRole];
    setEmail(demo.email);
    setPassword('password123');
    setServerError('');
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      const account = await login({ emailOrPhone: demo.email, password: 'password123', rememberMe, role: selectedRole });
      toast.success(`Signed in as ${account.name} (${selectedRole}). Redirecting to ${account.dashboardPath}...`);
    } catch (err) {
      const msg = err?.message || 'Demo login error';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = useCallback(
    (nextRole) => {
      setRole(nextRole);
      // Clean role tab switch — do NOT auto-fill fields
    },
    []
  );

  const emailValid = useMemo(() => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return false;
    return trimmed.includes('@') ? EMAIL_RE.test(trimmed) : /^[+]?[\d\s-]{7,15}$/.test(trimmed);
  }, [email]);

  const passwordValid = useMemo(() => password.length >= 8 && password.length <= 100, [password]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-white">
      {/* LEFT: Brand showcase (desktop only) */}
      <BrandPanel isLoading={isSubmitting} onDemoLogin={handleDemoLogin} />

      {/* RIGHT: Centered authentication card */}
      <main className="w-full lg:flex-1 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-10 bg-gradient-to-br from-white via-[#F8FAF9] to-[#EFFAF3] relative overflow-hidden">
        {/* Ambient light background (mobile + right panel) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#22C55E]/10 blur-[120px]" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-[#14B8A6]/10 blur-[110px]" />
        </div>

        {/* Top navigation */}
        <div className="relative w-full max-w-[460px] flex items-center justify-between mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#16A34A] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/40 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#16A34A] p-0.5 bg-slate-900">
              <img
                src="/logo.png"
                alt="Phidim Service Logo"
                className="w-full h-full object-contain rounded-full"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-black text-[#111827] tracking-tight">PHIDIM SERVICE</span>
          </div>
        </div>

        {/* Auth card */}
        <div className="relative w-full max-w-[460px] bg-white/80 backdrop-blur-xl rounded-[26px] p-6 sm:p-8 border border-white/70 shadow-2xl shadow-emerald-900/[0.06] animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          {/* Card header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#16A34A]/10 to-[#22C55E]/10 border border-[#16A34A]/20 mb-4 shadow-xs">
              <div className="relative w-10 h-10 rounded-full overflow-hidden p-0.5 bg-slate-900 ring-2 ring-[#16A34A]/50">
                <img
                  src="/logo.png"
                  alt="Phidim Service logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <h2 className="text-[26px] sm:text-3xl font-black text-[#111827] tracking-tight">
              Welcome back
            </h2>
            <p className="text-[13px] text-[#6B7280] mt-1.5 font-medium">
              Sign in to continue to your {role.toLowerCase()} dashboard
            </p>
          </div>

          {/* Role selector tabs */}
          <div
            className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100 text-xs font-bold border border-slate-200"
            role="tablist"
            aria-label="Account type"
          >
            {ROLE_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={role === tab.key}
                onClick={() => handleRoleChange(tab.key)}
                className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/50 ${
                  role === tab.key ? tab.active : tab.inactive
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>


          {/* Server error alert */}
          {serverError && (
            <div
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-in fade-in slide-in-from-top-1 duration-200"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <FloatingField
              id="login-email"
              label="Email / Phone"
              name="email"
              icon={Mail}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: undefined }));
              }}
              error={fieldErrors.email}
              valid={emailValid}
              disabled={isSubmitting}
              autoComplete="username"
              inputMode="email"
            />

            <FloatingField
              id="login-password"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: undefined }));
              }}
              error={fieldErrors.password}
              valid={passwordValid}
              disabled={isSubmitting}
              autoComplete="current-password"
              right={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={isSubmitting}
                  className="p-2 rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/40 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              }
            />

            {/* Remember me + forgot password */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  disabled={isSubmitting}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E5E7EB] accent-[#16A34A] focus:ring-[#16A34A] cursor-pointer"
                />
                <span className="text-xs text-[#6B7280] font-medium group-hover:text-[#111827] transition-colors">
                  Remember me on this device
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-[#16A34A] hover:text-[#22C55E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/40 rounded-lg"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Primary submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full h-[54px] rounded-2xl overflow-hidden bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-black text-[15px] uppercase tracking-wider shadow-lg shadow-[#16A34A]/25 hover:shadow-xl hover:shadow-[#16A34A]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#16A34A]/40 disabled:opacity-70 disabled:pointer-events-none group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#22C55E] to-[#16A34A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isSubmitting ? (
                <span className="relative flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="relative flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1 items-center" aria-hidden="true">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Or continue with
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={() => loginWithGoogle(role)}
            disabled={isSubmitting}
            className="w-full h-[54px] rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-[#111827] text-sm font-bold flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 active:translate-y-0 active:scale-[0.99] shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#16A34A]/30 disabled:opacity-50 disabled:pointer-events-none"
          >
            <GoogleIcon className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          {/* Register + support */}
          <div className="text-center text-xs text-[#6B7280] pt-1 space-y-2.5">
            <p>
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-bold text-[#16A34A] hover:text-[#22C55E] transition-colors ml-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/40 rounded-lg"
              >
                Create Account
              </Link>
            </p>
            <a
              href="https://wa.me/9779862772457"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#16A34A] font-semibold transition-colors"
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              Having trouble signing in? Contact support
            </a>
          </div>
        </div>

        <p className="relative mt-8 text-center text-[11px] text-slate-400">
          &copy; {new Date().getFullYear()} Phidim Service • Panchthar, Koshi, Nepal
        </p>
      </main>
    </div>
  );
}