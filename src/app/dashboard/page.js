"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  ChartBar,
  ShoppingCart,
  Users,
  Package,
  Warehouse,
  FileText,
  Wallet,
  BarChart3,
  Mail,
  Bell,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Search,
  Moon,
  Sun,
  Globe,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  ArrowUpRight,
  ArrowUpDown,
  MoreHorizontal,
  UserPlus,
  Star,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Download,
  FilePlus,
  Send,
  Sparkles,
  ShieldCheck,
  Check,
  Filter,
  RefreshCw,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Analytics", icon: ChartBar },
  { name: "Orders", icon: ShoppingCart },
  { name: "Customers", icon: Users },
  { name: "Products", icon: Package },
  { name: "Inventory", icon: Warehouse },
  { name: "Invoices", icon: FileText },
  { name: "Finance", icon: Wallet },
  { name: "Reports", icon: BarChart3 },
  { name: "Messages", icon: Mail },
  { name: "Notifications", icon: Bell },
  { name: "Calendar", icon: Calendar },
  { name: "Settings", icon: Settings },
  { name: "Support", icon: HelpCircle },
  { name: "Logout", icon: LogOut },
];

const STAT_CARDS = [
  {
    title: "Total Revenue",
    value: 58490,
    prefix: "Rs. ",
    decimals: 0,
    change: "+15.8%",
    icon: DollarSign,
    tint: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    color: "#10B981",
    gradient: "from-emerald-500 to-teal-600",
    data: [35, 48, 42, 65, 58, 76, 72, 88, 82, 98, 92, 105],
  },
  {
    title: "Completed Orders",
    value: 2140,
    prefix: "",
    decimals: 0,
    change: "+12.4%",
    icon: ShoppingCart,
    tint: "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400",
    color: "#14B8A6",
    gradient: "from-teal-500 to-emerald-600",
    data: [22, 35, 30, 48, 42, 55, 48, 62, 58, 70, 65, 78],
  },
  {
    title: "Active Visitors",
    value: 31.5,
    prefix: "",
    suffix: "K",
    decimals: 1,
    change: "+28.4%",
    icon: TrendingUp,
    tint: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    color: "#22C55E",
    gradient: "from-green-500 to-emerald-600",
    data: [55, 70, 60, 88, 78, 98, 92, 110, 102, 122, 115, 132],
  },
  {
    title: "Total Customers",
    value: 4120,
    prefix: "",
    decimals: 0,
    change: "+8.9%",
    icon: Users,
    tint: "bg-lime-500/10 text-lime-600 dark:bg-lime-500/20 dark:text-lime-400",
    color: "#84CC16",
    gradient: "from-lime-500 to-emerald-600",
    data: [12, 18, 15, 24, 21, 28, 25, 34, 31, 40, 36, 46],
  },
  {
    title: "Conversion Rate",
    value: 7.4,
    prefix: "",
    suffix: "%",
    decimals: 1,
    change: "+3.2%",
    icon: ShoppingBag,
    tint: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-300",
    color: "#059669",
    gradient: "from-emerald-600 to-teal-700",
    data: [2.5, 3.5, 3.0, 4.8, 4.2, 5.8, 5.2, 6.8, 6.2, 7.8, 7.2, 8.5],
  },
  {
    title: "Net Profit",
    value: 16890,
    prefix: "Rs. ",
    decimals: 0,
    change: "+21.5%",
    icon: Wallet,
    tint: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/25 dark:text-emerald-300",
    color: "#047857",
    gradient: "from-emerald-700 to-teal-500",
    data: [18, 28, 24, 40, 35, 50, 45, 60, 55, 72, 68, 82],
  },
];

const REVENUE_DATA = {
  "7d": [
    { label: "Mon", revenue: 5200, orders: 140 },
    { label: "Tue", revenue: 6800, orders: 165 },
    { label: "Wed", revenue: 4900, orders: 118 },
    { label: "Thu", revenue: 7400, orders: 182 },
    { label: "Fri", revenue: 8600, orders: 210 },
    { label: "Sat", revenue: 6400, orders: 154 },
    { label: "Sun", revenue: 5900, orders: 138 },
  ],
  "30d": [
    { label: "W1", revenue: 32000, orders: 860 },
    { label: "W2", revenue: 38000, orders: 980 },
    { label: "W3", revenue: 41000, orders: 1050 },
    { label: "W4", revenue: 49000, orders: 1240 },
  ],
  "90d": [
    { label: "Jan", revenue: 115000, orders: 2800 },
    { label: "Feb", revenue: 132000, orders: 3200 },
    { label: "Mar", revenue: 154000, orders: 3700 },
  ],
  "12m": [
    { label: "Jan", revenue: 210000, orders: 4800 },
    { label: "Feb", revenue: 230000, orders: 5100 },
    { label: "Mar", revenue: 255000, orders: 5600 },
    { label: "Apr", revenue: 270000, orders: 5900 },
    { label: "May", revenue: 290000, orders: 6300 },
    { label: "Jun", revenue: 315000, orders: 6700 },
    { label: "Jul", revenue: 330000, orders: 7100 },
    { label: "Aug", revenue: 350000, orders: 7500 },
    { label: "Sep", revenue: 375000, orders: 8000 },
    { label: "Oct", revenue: 395000, orders: 8400 },
    { label: "Nov", revenue: 420000, orders: 8900 },
    { label: "Dec", revenue: 460000, orders: 9500 },
  ],
};

const TRAFFIC_DATA = [
  { name: "Direct", value: 45, color: "#10B981" },
  { name: "Organic", value: 25, color: "#14B8A6" },
  { name: "Social", value: 15, color: "#84CC16" },
  { name: "Referral", value: 10, color: "#059669" },
  { name: "Email", value: 5, color: "#22C55E" },
];

const SALES_DATA = [
  { name: "DTH & Cable", sales: 5200 },
  { name: "CCTV Systems", sales: 4400 },
  { name: "Electrical", sales: 3800 },
  { name: "Computer Tech", sales: 3100 },
  { name: "Plumbing", sales: 2400 },
  { name: "AC Repair", sales: 1800 },
];
const SALES_COLORS = ["#10B981", "#14B8A6", "#059669", "#84CC16", "#22C55E", "#047857"];

const COUNTRY_DATA = [
  { name: "Phidim Bazaar", visitors: 14200, color: "#10B981" },
  { name: "Yashok / Kummayak", visitors: 9400, color: "#14B8A6" },
  { name: "Rarank / Fidim 4", visitors: 6800, color: "#059669" },
  { name: "Ilam Highway", visitors: 5200, color: "#84CC16" },
  { name: "Taplejung Link", visitors: 4100, color: "#22C55E" },
];

const INITIAL_ORDERS = [
  { id: "#ORD-9120", customer: "Ram Shrestha", email: "ram.phidim@gmail.com", status: "Completed", payment: "Paid", amount: "Rs. 2,450", date: "Today, 10:45 AM", service: "DishHome Alignment" },
  { id: "#ORD-9119", customer: "Saraswati Subedi", email: "saraswati.s@yahoo.com", status: "Pending", payment: "Pending", amount: "Rs. 18,900", date: "Today, 09:15 AM", service: "4-Cam CCTV Setup" },
  { id: "#ORD-9118", customer: "Bikash Thapa", email: "bikash.thapa@outlook.com", status: "Completed", payment: "Paid", amount: "Rs. 4,200", date: "Yesterday", service: "House Electrical Rewire" },
  { id: "#ORD-9117", customer: "Anita Gurung", email: "anita.g@gmail.com", status: "Cancelled", payment: "Refunded", amount: "Rs. 1,500", date: "Yesterday", service: "Laptop Format & Cleanup" },
  { id: "#ORD-9116", customer: "Deepak Khadka", email: "deepak.k@phidimnet.np", status: "Completed", payment: "Paid", amount: "Rs. 12,400", date: "Aug 02, 2026", service: "AC Refill & Servicing" },
  { id: "#ORD-9115", customer: "Sunita Rai", email: "sunita.rai@gmail.com", status: "Refunded", payment: "Refunded", amount: "Rs. 850", date: "Aug 01, 2026", service: "Water Pipe Leak Fixing" },
  { id: "#ORD-9114", customer: "Kiran Tamang", email: "kiran.tamang@gmail.com", status: "Pending", payment: "Pending", amount: "Rs. 3,100", date: "Jul 31, 2026", service: "Multi-TV Setup" },
  { id: "#ORD-9113", customer: "Prashant Sharma", email: "prashant@tech.np", status: "Completed", payment: "Paid", amount: "Rs. 6,800", date: "Jul 30, 2026", service: "LAN Office Wiring" },
];

const CUSTOMERS = [
  { name: "Ram Shrestha", company: "Phidim Traders", country: "Phidim Ward 1", status: "Active", email: "ram.phidim@gmail.com", initials: "RS" },
  { name: "Saraswati Subedi", company: "Subedi Pharmacy", country: "Phidim Ward 2", status: "Active", email: "saraswati.s@yahoo.com", initials: "SS" },
  { name: "Bikash Thapa", company: "Highland Lodge", country: "Phidim Ward 4", status: "New", email: "bikash.thapa@outlook.com", initials: "BT" },
  { name: "Anita Gurung", company: "Gurung Hardware", country: "Panchthar Hub", status: "Inactive", email: "anita.g@gmail.com", initials: "AG" },
  { name: "Deepak Khadka", company: "Khadka Cold Store", country: "Phidim Ward 3", status: "Active", email: "deepak.k@phidimnet.np", initials: "DK" },
];

const ACTIVITIES = [
  { icon: ShoppingCart, tint: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400", text: "New service request", detail: "Ram Shrestha booked DishHome Dish Alignment", time: "5 mins ago" },
  { icon: CheckCircle2, tint: "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400", text: "Work Order Completed", detail: "CCTV Field Team closed Ticket #ORD-9118", time: "28 mins ago" },
  { icon: UserPlus, tint: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400", text: "New technician registered", detail: "Niraj Sunuwar joined as CCTV Specialist", time: "1 hour ago" },
  { icon: Star, tint: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400", text: "5-Star Review Received", detail: "Saraswati Subedi rated Electrical Service 5/5", time: "3 hours ago" },
  { icon: AlertCircle, tint: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400", text: "Schedule Rescheduled", detail: "Order #ORD-9117 moved to tomorrow 10:00 AM", time: "5 hours ago" },
];

const QUICK_ACTIONS = [
  { id: "order", title: "New Service Request", detail: "Dispatch tech or create booking", icon: FilePlus, gradient: "from-emerald-500 to-teal-600" },
  { id: "invoice", title: "Generate Invoice", detail: "Create GST/Vat receipt", icon: Send, gradient: "from-teal-500 to-emerald-700" },
  { id: "tech", title: "Assign Technician", detail: "Allocate field staff to ward", icon: UserPlus, gradient: "from-green-600 to-emerald-500" },
  { id: "report", title: "Export Analytics", detail: "Download monthly PDF/CSV", icon: Download, gradient: "from-lime-600 to-emerald-600" },
];

const STATUS_CLASS = {
  Completed: "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800",
  Pending: "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800",
  Cancelled: "bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800",
  Refunded: "bg-teal-100 text-teal-800 border border-teal-300 dark:bg-teal-950/80 dark:text-teal-300 dark:border-teal-800",
  Paid: "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800",
};

const CARD_CLASS = "bg-white dark:bg-slate-900/90 rounded-[24px] border border-emerald-900/10 dark:border-emerald-500/20 shadow-[0_10px_30px_rgba(16,185,129,0.04)] hover:border-emerald-500/30 transition-all p-7";

function CountUp({ value, prefix = "", suffix = "", decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const duration = 1000;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <span>
      {prefix}
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function MiniSparkline({ data, color }) {
  const w = 120;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - 4 - ((v - min) / (max - min || 1)) * (h - 10)}`
    )
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <path
        d={`M${points}`}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={w}
        cy={h - 4 - ((data[data.length - 1] - min) / (max - min || 1)) * (h - 10)}
        r={4}
        fill={color}
        className="animate-pulse"
      />
    </svg>
  );
}

function ChartTooltip({ active, payload, label, formatter }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-500/20 shadow-2xl p-4 min-w-[180px]">
        <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: entry.color || entry.payload?.color }}
              />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{entry.name}:</span>
            </div>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {formatter ? formatter(entry.value, entry.name) : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function Logo({ collapsed }) {
  return (
    <div className="flex items-center gap-3.5">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white font-black text-lg">
        P
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <p className="text-white font-bold text-lg tracking-tight">Phidim</p>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30">
              Pro
            </span>
          </div>
          <p className="text-emerald-400/70 text-[11px] font-medium">Service Dashboard</p>
        </div>
      )}
    </div>
  );
}

function SidebarContent({ active, setActive, collapsed, onNavigate }) {
  return (
    <div className="flex flex-col h-full bg-[#061712] text-slate-300 border-r border-emerald-900/30">
      <div className="flex items-center justify-between px-6 py-6 border-b border-emerald-900/30">
        <Logo collapsed={collapsed} />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.name;
          return (
            <a
              key={item.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActive(item.name);
                if (onNavigate) onNavigate();
              }}
              className={`group relative flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[15px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 font-semibold border border-emerald-500/30 shadow-md shadow-emerald-950/40"
                  : "hover:bg-emerald-950/40 hover:text-emerald-200 text-slate-400"
              }`}
              title={item.name}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-indicator-green"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-emerald-400 rounded-r-full shadow-[0_0_12px_#10B981]"
                />
              )}
              <item.icon size={20} className={`flex-shrink-0 transition-colors ${isActive ? "text-emerald-400" : "group-hover:text-emerald-300"}`} />
              {!collapsed && <span>{item.name}</span>}
            </a>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="px-5 py-5 border-t border-emerald-900/30 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Field Storage</span>
              <span className="text-[11px] text-slate-400 font-mono">3.8 GB / 10 GB</span>
            </div>
            <div className="h-2 rounded-full bg-emerald-950 overflow-hidden border border-emerald-800/40">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "38%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_#10B981]"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-950/40 p-2.5 rounded-2xl border border-emerald-900/40">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-black shadow-md shadow-emerald-900/50">
              PA
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">Phidim Admin</p>
              <p className="text-xs text-emerald-400/80 truncate">admin@phidim.np</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TopBar({ onMenuOpen, dark, toggleDark, onQuickCreate, unreadCount, toggleNotifications }) {
  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 h-[76px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-emerald-900/10 dark:border-emerald-500/20 transition-colors">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuOpen}
            className="lg:hidden p-2.5 rounded-2xl hover:bg-emerald-500/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} className="text-slate-700 dark:text-slate-200" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight">
                Phidim Dashboard
              </h1>
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Node 01
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 hidden sm:block font-medium">{dateStr}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
            <input
              type="text"
              placeholder="Search services, orders, customers..."
              className="h-[46px] w-64 lg:w-80 pl-11 pr-14 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 rounded-lg">
              ⌘K
            </kbd>
          </div>

          <button
            onClick={toggleNotifications}
            className="relative p-2.5 rounded-2xl hover:bg-emerald-500/10 transition-colors text-slate-700 dark:text-slate-200"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping" />
            )}
          </button>

          <button
            onClick={toggleDark}
            className="p-2.5 rounded-2xl hover:bg-emerald-500/10 transition-colors text-slate-700 dark:text-slate-200"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-emerald-600" />}
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={onQuickCreate}
            className="flex items-center gap-2 h-[46px] px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all border border-emerald-400/30"
          >
            <Plus size={18} className="stroke-[3]" />
            <span className="hidden sm:inline">Create Booking</span>
          </motion.button>

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-black shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/30 cursor-pointer">
            P
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900/90 rounded-[24px] border border-emerald-900/10 dark:border-emerald-500/20 shadow-[0_10px_30px_rgba(16,185,129,0.04)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)] hover:border-emerald-500/40 transition-all p-6 relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">{stat.title}</p>
          <p className="text-[32px] font-black text-slate-900 dark:text-white tracking-tight leading-none">
            <CountUp value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} decimals={stat.decimals || 0} />
          </p>
        </div>
        <div className={`w-12 h-12 rounded-2xl ${stat.tint} flex items-center justify-center shadow-inner border border-emerald-500/20`}>
          <stat.icon size={22} className="stroke-[2.5]" />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <ArrowUpRight size={14} />
          {stat.change}
        </span>
        <span className="text-xs text-slate-400 font-medium">vs last month</span>
      </div>
      <MiniSparkline data={stat.data} color={stat.color} />
    </motion.div>
  );
}

function RevenueChartSection() {
  const [filter, setFilter] = useState("7d");
  const filters = [
    { key: "7d", label: "7 Days" },
    { key: "30d", label: "30 Days" },
    { key: "90d", label: "90 Days" },
    { key: "12m", label: "1 Year" },
  ];
  const data = REVENUE_DATA[filter];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
      className={CARD_CLASS}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Revenue Overview</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/20">
              Live Flow
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Real-time revenue tracking across all Panchthar services</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-1.5 self-start border border-emerald-900/10 dark:border-emerald-500/20">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === f.key
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="emeraldRevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tealOrdGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.1)" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12, fontWeight: 600 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12, fontWeight: 600 }}
              tickFormatter={(v) => (v >= 1000 ? `Rs.${(v / 1000).toFixed(0)}K` : `Rs.${v}`)}
            />
            <Tooltip content={<ChartTooltip formatter={(v) => `Rs. ${Number(v).toLocaleString()}`} />} />
            <Legend wrapperStyle={{ paddingTop: 12 }} iconType="circle" iconSize={10} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={3.5}
              fill="url(#emeraldRevGrad)"
              name="Revenue (NPR)"
              dot={false}
              activeDot={{ r: 7, strokeWidth: 3, stroke: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#14B8A6"
              strokeWidth={2.5}
              fill="url(#tealOrdGrad)"
              name="Service Orders"
              dot={false}
              activeDot={{ r: 6, strokeWidth: 3, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function TrafficChartSection() {
  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="800">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.18 }}
      className={CARD_CLASS}
    >
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">Customer Acquisition</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Channel breakdown for Phidim bookings</p>
      <div className="h-[280px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={TRAFFIC_DATA}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              label={renderLabel}
            >
              {TRAFFIC_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip formatter={(v) => `${v}% Share`} />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {TRAFFIC_DATA.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{item.name} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SalesChartSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.22 }}
      className={CARD_CLASS}
    >
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">Category Demand</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Top requested technical service verticals</p>
      <div className="h-[290px] mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SALES_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.1)" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 11, fontWeight: 600 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12, fontWeight: 600 }}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v)}
            />
            <Tooltip content={<ChartTooltip formatter={(v) => `${Number(v).toLocaleString()} Jobs`} />} />
            <Bar dataKey="sales" radius={[10, 10, 0, 0]} maxBarSize={44}>
              {SALES_DATA.map((entry, i) => (
                <Cell key={i} fill={SALES_COLORS[i % SALES_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function CountryChartSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.26 }}
      className={CARD_CLASS}
    >
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">Regional Coverage</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Active technician dispatches by Panchthar ward</p>
      <div className="h-[290px] mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={COUNTRY_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.1)" horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12, fontWeight: 600 }}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v)}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12, fontWeight: 600 }}
              width={120}
            />
            <Tooltip content={<ChartTooltip formatter={(v) => `${Number(v).toLocaleString()} Bookings`} />} />
            <Bar dataKey="visitors" radius={[0, 10, 10, 0]} maxBarSize={24}>
              {COUNTRY_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function OrdersSection({ orders, setOrders }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        const q = query.toLowerCase();
        const matchQ =
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q) ||
          (o.service && o.service.toLowerCase().includes(q));
        const matchS = status === "All" || o.status === status;
        return matchQ && matchS;
      }),
    [orders, query, status]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-slate-900/90 rounded-[24px] border border-emerald-900/10 dark:border-emerald-500/20 shadow-[0_10px_30px_rgba(16,185,129,0.04)] overflow-hidden"
    >
      <div className="p-7 pb-5 border-b border-emerald-900/10 dark:border-emerald-500/20">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Recent Work Orders</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                {orders.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Service tickets dispatched & billed</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 h-[42px] px-4 rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/40 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/15 transition-all">
            <Download size={15} />
            Export CSV
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
            <input
              type="text"
              placeholder="Search order ID, customer, service..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-[44px] w-full pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="h-[44px] pl-4 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold"
            >
              {["All", "Completed", "Pending", "Cancelled", "Refunded"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            <tr>
              {["Order ID", "Customer", "Service Type", "Status", "Payment", "Amount", "Date", ""].map((col, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {rows.map((o) => (
              <tr key={o.id} className="transition-colors hover:bg-emerald-500/5">
                <td className="px-6 py-4 font-extrabold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{o.id}</td>
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">{o.customer}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">{o.service || "General Technical"}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${STATUS_CLASS[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${STATUS_CLASS[o.payment]}`}>
                    {o.payment}
                  </span>
                </td>
                <td className="px-6 py-4 font-black text-slate-900 dark:text-white whitespace-nowrap">{o.amount}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">{o.date}</td>
                <td className="px-6 py-4">
                  <button className="p-2 rounded-xl hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-600 transition-colors" aria-label="Actions">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-slate-400 text-sm font-medium">
                  No service tickets match your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-7 py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Showing <span className="font-bold text-slate-900 dark:text-white">{(safePage - 1) * perPage + 1}</span> to{" "}
          <span className="font-bold text-slate-900 dark:text-white">{Math.min(safePage * perPage, filtered.length)}</span> of{" "}
          <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> tickets
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, safePage - 1))}
            disabled={safePage === 1}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={15} />
            Previous
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                safePage === p
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30"
                  : "border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(pages, safePage + 1))}
            disabled={safePage === pages}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CustomersSection() {
  const statusTint = {
    Active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800",
    New: "bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-300 dark:border-teal-800",
    Inactive: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.34 }}
      className={CARD_CLASS}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Key Clients</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Recent Panchthar business accounts</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">View All</span>
      </div>
      <div className="space-y-3">
        {CUSTOMERS.map((c) => (
          <div key={c.email} className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-emerald-500/5 border border-transparent hover:border-emerald-500/20 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-black shadow-md shadow-emerald-500/20 flex-shrink-0">
              {c.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{c.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">{c.company}</p>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <MapPin size={12} className="text-emerald-500" />
              <span className="truncate max-w-[100px]">{c.country}</span>
            </div>
            <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${statusTint[c.status]}`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ActivitySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.38 }}
      className={CARD_CLASS}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Field Activity</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Real-time technician updates</p>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
      </div>
      <div className="mt-5 space-y-1">
        {ACTIVITIES.map((a, i) => (
          <div key={i} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-2xl ${a.tint} flex items-center justify-center flex-shrink-0 border border-emerald-500/20`}>
                <a.icon size={17} className="stroke-[2.5]" />
              </div>
              {i < ACTIVITIES.length - 1 && <div className="w-0.5 flex-1 bg-emerald-500/20 my-1.5" />}
            </div>
            <div className="pb-5 pt-0.5">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{a.text}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">{a.detail}</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function QuickActionsSection({ onActionClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.42 }}
      className={CARD_CLASS}
    >
      <h3 className="text-2xl font-black text-slate-900 dark:text-white">Quick Field Actions</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Launch core operations in one click</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {QUICK_ACTIONS.map((action) => (
          <motion.button
            key={action.title}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onActionClick(action.id)}
            className="flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all text-left bg-slate-50/50 dark:bg-slate-800/50"
          >
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-emerald-500/20`}
            >
              <action.icon size={22} className="stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">{action.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate font-medium">{action.detail}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function QuickCreateModal({ isOpen, onClose, onCreateOrder }) {
  const [customer, setCustomer] = useState("");
  const [service, setService] = useState("DishHome DTH Alignment");
  const [amount, setAmount] = useState("2500");
  const [ward, setWard] = useState("Phidim Ward 1");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer) return;
    onCreateOrder({
      id: `#ORD-${Math.floor(8000 + Math.random() * 2000)}`,
      customer,
      email: `${customer.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      status: "Pending",
      payment: "Pending",
      amount: `Rs. ${Number(amount).toLocaleString()}`,
      date: "Just Now",
      service,
    });
    setCustomer("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-[28px] border border-emerald-500/30 shadow-2xl p-7 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
              <Plus size={20} className="stroke-[3]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">New Service Ticket</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Book field service technician</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Customer Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Subash Rai"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Service Type</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            >
              <option>DishHome DTH Alignment</option>
              <option>CCTV Camera Installation</option>
              <option>House Electrical Wiring</option>
              <option>Computer Repair & Format</option>
              <option>AC Repair & Gas Refill</option>
              <option>Plumbing & Pipe Fixing</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Estimated Cost (NPR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location Ward</label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              >
                <option>Phidim Ward 1</option>
                <option>Phidim Ward 2</option>
                <option>Phidim Ward 3</option>
                <option>Phidim Ward 4</option>
                <option>Kummayak Rural</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 h-11 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all"
            >
              Dispatch Ticket
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function NotificationPopover({ isOpen, onClose, notifications, onClear }) {
  if (!isOpen) return null;
  return (
    <div className="absolute right-4 sm:right-24 top-20 z-50 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl border border-emerald-500/30 shadow-2xl p-5">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-emerald-500" />
          <h4 className="text-sm font-black text-slate-900 dark:text-white">Live System Alerts</h4>
        </div>
        <button onClick={onClear} className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
          Mark All Read
        </button>
      </div>
      <div className="space-y-2.5 max-h-72 overflow-y-auto">
        {notifications.map((n, i) => (
          <div key={i} className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
            <p className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.desc}</p>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 inline-block">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterBar() {
  return (
    <footer className="mt-12 border-t border-emerald-900/10 dark:border-emerald-500/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/30">
            <span className="text-white font-black text-xs">P</span>
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Phidim Service Operations Portal</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            v3.2 Green Upgrade
          </span>
          <a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Dispatch Logs</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Support Node</a>
        </div>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} Phidim Service. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const notifications = [
    { title: "DishHome Reconnection Request", desc: "Ward 2 client requested urgent technician", time: "3 mins ago" },
    { title: "Invoice Generated #INV-4920", desc: "Rs. 18,900 CCTV installation billed", time: "25 mins ago" },
    { title: "Field Team Dispatched", desc: "Niraj Sunuwar en route to Phidim Ward 4", time: "1 hour ago" },
  ];

  const handleCreateOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
    setToast(`Service ticket ${newOrder.id} dispatched successfully!`);
    setTimeout(() => setToast(null), 4000);
  };

  const handleQuickAction = (actionId) => {
    if (actionId === "order" || actionId === "invoice" || actionId === "tech") {
      setQuickCreateOpen(true);
    } else {
      setToast("Analytics report exported to CSV successfully!");
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className={`min-h-screen ${dark ? "dark bg-[#0A110F] text-slate-100" : "bg-[#F4F7F6] text-slate-900"} transition-colors duration-300 font-sans`}>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-2xl border border-emerald-400/40"
          >
            <CheckCircle2 size={18} />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-y-0 left-0 w-[280px]"
            >
              <SidebarContent
                active={activeNav}
                setActive={setActiveNav}
                collapsed={false}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.div>
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 left-[296px] p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-emerald-500/20"
              aria-label="Close menu"
            >
              <X size={18} className="text-slate-700 dark:text-slate-200" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden lg:block transition-all duration-300 ease-in-out ${
          collapsed ? "w-[80px]" : "w-[280px]"
        }`}
      >
        <SidebarContent active={activeNav} setActive={setActiveNav} collapsed={collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-6 -right-3.5 p-1.5 rounded-xl bg-emerald-600 text-white shadow-lg border border-emerald-400/40 hover:bg-emerald-500 transition-all"
          aria-label="Collapse sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      <div className={`transition-all duration-300 ease-in-out ${collapsed ? "lg:ml-[80px]" : "lg:ml-[280px]"}`}>
        <TopBar
          onMenuOpen={() => setMobileOpen(true)}
          dark={dark}
          toggleDark={() => setDark(!dark)}
          onQuickCreate={() => setQuickCreateOpen(true)}
          unreadCount={notifications.length}
          toggleNotifications={() => setNotifOpen(!notifOpen)}
        />

        <NotificationPopover
          isOpen={notifOpen}
          onClose={() => setNotifOpen(false)}
          notifications={notifications}
          onClear={() => setNotifOpen(false)}
        />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-4 sm:px-6 lg:px-8 py-8 max-w-[1600px] mx-auto w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 rounded-[24px] border border-emerald-500/20"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  Phidim Service Console
                </span>
                <span className="text-slate-400">/</span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{activeNav}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome back! <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Green Primary Edition</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuickCreateOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold hover:bg-emerald-500/20 transition-all"
              >
                <RefreshCw size={14} className="animate-spin-slow" />
                Auto-Refresh Data
              </button>
            </div>
          </motion.div>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {STAT_CARDS.map((stat, i) => (
              <StatCard key={stat.title} stat={stat} index={i} />
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <RevenueChartSection />
            </div>
            <TrafficChartSection />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <SalesChartSection />
            <CountryChartSection />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <OrdersSection orders={orders} setOrders={setOrders} />
            </div>
            <div className="space-y-6">
              <CustomersSection />
              <ActivitySection />
            </div>
          </section>

          <QuickActionsSection onActionClick={handleQuickAction} />
        </motion.main>

        <FooterBar />
      </div>

      <QuickCreateModal
        isOpen={quickCreateOpen}
        onClose={() => setQuickCreateOpen(false)}
        onCreateOrder={handleCreateOrder}
      />
    </div>
  );
}