import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { AuthProvider } from "@/context/AuthContext";
import { CallProvider } from "@/components/calls/CallProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://phidimservice.com.np"),
  title: {
    default: "Phidim Service | On-Site Technical Services in Panchthar",
    template: "%s | Phidim Service",
  },
  description:
    "Professional on-site technical services in Phidim, Panchthar — DTH, CCTV, electrical, computer repair, plumbing and more.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  
  openGraph: {
    title: "Phidim Service | Technical & Digital Services",
    description: "Professional on-site technical services in Phidim, Panchthar — DTH, CCTV, electrical, computer repair, plumbing and more.",
    siteName: "Phidim Service",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Phidim Service Logo"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Phidim Service",
    description: "Professional on-site technical services in Phidim, Panchthar",
    images: ["/logo.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var origError = console.error;
                var origWarn = console.warn;
                function shouldIgnore(args) {
                  var str = '';
                  for (var i = 0; i < args.length; i++) {
                    var item = args[i];
                    if (typeof item === 'string') str += ' ' + item;
                    else if (item && item.message) str += ' ' + item.message;
                    else if (item && item.stack) str += ' ' + item.stack;
                    else {
                      try { str += ' ' + JSON.stringify(item); } catch (e) {}
                    }
                  }
                  return (
                    str.indexOf('bis_skin_checked') !== -1 ||
                    str.indexOf('bis_register') !== -1 ||
                    str.indexOf('__processed_') !== -1 ||
                    str.indexOf('chrome-extension://') !== -1 ||
                    str.indexOf('moz-extension://') !== -1 ||
                    str.indexOf('safari-extension://') !== -1 ||
                    str.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1
                  );
                }
                console.error = function() {
                  if (shouldIgnore(arguments)) return;
                  return origError.apply(console, arguments);
                };
                console.warn = function() {
                  if (shouldIgnore(arguments)) return;
                  return origWarn.apply(console, arguments);
                };
                function handleErr(event) {
                  var src = (event && event.filename) || (event && event.error && event.error.stack) || (event && event.reason && event.reason.stack) || (event && event.message) || '';
                  if (
                    typeof src === 'string' && (
                      src.indexOf('chrome-extension://') !== -1 ||
                      src.indexOf('moz-extension://') !== -1 ||
                      src.indexOf('safari-extension://') !== -1 ||
                      src.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
                      src.indexOf('bis_skin_checked') !== -1
                    )
                  ) {
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    if (event.preventDefault) event.preventDefault();
                    return true;
                  }
                }
                window.addEventListener('error', handleErr, true);
                window.addEventListener('unhandledrejection', handleErr, true);
              })();
            `,
          }}
        />
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`antialiased font-sans ${poppins.variable}`} suppressHydrationWarning>
        <AuthProvider>
          <CallProvider>
            {children}
            <Toaster />
          </CallProvider>
        </AuthProvider>
      </body>
    </html>
  );
}