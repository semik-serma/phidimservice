import { SpaRoot } from "@/components/SpaRoot";

export const metadata = {
  title: "Phidim Service | Local Services in Phidim, Panchthar, Nepal",
  description: "Phidim Service is the premier local on-demand service platform in Phidim & Panchthar, Nepal. Connect with certified local electricians, plumbers, CCTV security installers, optical fiber technicians, DishHome specialists, and computer repair experts.",
  alternates: {
    canonical: "https://phidimservice.com.np",
  },
  openGraph: {
    title: "Phidim Service | Local Services in Phidim, Panchthar, Nepal",
    description: "Connect with certified local technicians for doorstep electrical, plumbing, fiber internet, CCTV, and DishHome services in Phidim and Panchthar District, Nepal.",
    url: "https://phidimservice.com.np",
    siteName: "Phidim Service",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Phidim Service - Local Services in Phidim, Panchthar",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phidim Service | Local Services in Phidim, Panchthar, Nepal",
    description: "On-demand doorstep technicians and home services across Phidim Municipality and Panchthar District, Nepal.",
    images: ["/logo.png"],
  },
};

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Phidim Service",
    "url": "https://phidimservice.com.np",
    "logo": "https://phidimservice.com.np/logo.png",
    "image": "https://phidimservice.com.np/logo.png",
    "telephone": "+9779862772457",
    "priceRange": "Rs. 300 - Rs. 15,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Road, Ward No. 1",
      "addressLocality": "Phidim",
      "addressRegion": "Panchthar, Koshi Province",
      "postalCode": "57200",
      "addressCountry": "NP"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Phidim Municipality"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Panchthar District"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Koshi Province"
      }
    ],
    "description": "Phidim Service is the primary local on-demand service platform connecting households and businesses with verified field technicians across Phidim Municipality and Panchthar District, Nepal."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <SpaRoot />
    </>
  );
}
