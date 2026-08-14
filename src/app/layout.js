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
                    str.indexOf('hydration-mismatch') !== -1 ||
                    str.indexOf('A tree hydrated but some attributes') !== -1 ||
                    str.indexOf('did not match') !== -1 ||
                    str.indexOf('Extra attributes from the server') !== -1 ||
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
                  if (!event) return;
                  
                  // Suppress resource loading error events (img, script, link, audio, video) from bubbling to overlay
                  if (event.target && (event.target instanceof HTMLImageElement || event.target instanceof HTMLScriptElement || event.target instanceof HTMLLinkElement || event.target instanceof HTMLMediaElement)) {
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    if (event.preventDefault) event.preventDefault();
                    return true;
                  }

                  // Suppress unhandled promise rejections that reject with an Event or empty object
                  if (event.type === 'unhandledrejection') {
                    var reason = event.reason;
                    if (!reason || reason instanceof Event || (typeof reason === 'object' && !reason.message && !reason.stack)) {
                      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                      if (event.preventDefault) event.preventDefault();
                      return true;
                    }
                  }

                  // Suppress generic error events where error object is missing (turns into [object Event])
                  if (event.type === 'error' && !event.error && !event.message) {
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    if (event.preventDefault) event.preventDefault();
                    return true;
                  }

                  var src = '';
                  try {
                    src = (event.filename || '') + ' ' +
                          (event.message || '') + ' ' +
                          (event.error && (event.error.stack || event.error.message || String(event.error))) + ' ' +
                          (event.reason && (event.reason.stack || event.reason.message || String(event.reason))) + ' ' +
                          String(event);
                  } catch(e) {}

                  if (
                    typeof src === 'string' && (
                      src.indexOf('chrome-extension://') !== -1 ||
                      src.indexOf('moz-extension://') !== -1 ||
                      src.indexOf('safari-extension://') !== -1 ||
                      src.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
                      src.indexOf('bis_skin_checked') !== -1 ||
                      src.indexOf('bis_register') !== -1 ||
                      src.indexOf('hydration-mismatch') !== -1 ||
                      src.indexOf('[object Event]') !== -1
                    )
                  ) {
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    if (event.preventDefault) event.preventDefault();
                    return true;
                  }
                }
                window.addEventListener('error', handleErr, true);
                window.addEventListener('unhandledrejection', handleErr, true);

                // Instantly remove extension attributes to avoid React hydration mismatches
                try {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes' && (m.attributeName === 'bis_skin_checked' || m.attributeName === 'bis_register')) {
                        m.target.removeAttribute(m.attributeName);
                      }
                      if (m.addedNodes) {
                        for (var j = 0; j < m.addedNodes.length; j++) {
                          var node = m.addedNodes[j];
                          if (node && node.nodeType === 1) {
                            if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
                            if (node.hasAttribute('bis_register')) node.removeAttribute('bis_register');
                          }
                        }
                      }
                    }
                  });
                  if (document.documentElement) {
                    observer.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['bis_skin_checked', 'bis_register'] });
                  }
                } catch(e) {}
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