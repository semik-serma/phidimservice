import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { AuthProvider } from "@/context/AuthContext";

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
  // icons: {
  //   icon: [
  //     { url: "/logo.png", type: "image/png" },
  //     { url: "/icon.png", type: "image/png" }
  //   ],
  //   shortcut: ["/logo.png"],
  //   apple: [
  //     { url: "/apple-icon.png", type: "image/png" }
  //   ]
  // },
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
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`antialiased font-sans ${poppins.variable}`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}