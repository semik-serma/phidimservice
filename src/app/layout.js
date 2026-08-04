import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" }
    ],
    shortcut: ["/logo.png"],
    apple: [
      { url: "/apple-icon.png", type: "image/png" }
    ]
  },
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
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}