import { SpaRoot } from "@/components/SpaRoot";

export const metadata = {
  title: "Phidim Service | No. 1 Local Services & Home Technicians in Phidim, Panchthar",
  description: "Phidim Service (फिदिम सेवा) is the #1 on-demand local service platform in Phidim, Panchthar, Nepal. Get verified electricians, plumbers, DishHome technicians, CCTV camera installers, FiberNet internet specialists, and computer repair experts at your doorstep in Phidim.",
  keywords: [
    "Phidim",
    "Phidim service",
    "Phidim services",
    "services in Phidim",
    "local services Phidim",
    "Phidim Nepal",
    "Phidim Panchthar",
    "Phidim Bazaar",
    "Phidim Municipality",
    "electrician in Phidim",
    "plumber in Phidim",
    "CCTV installation Phidim",
    "DishHome Phidim",
    "FiberNet Phidim",
    "internet service Phidim",
    "computer repair Phidim",
    "technician Phidim",
    "home services Phidim",
    "फिदिम",
    "फिदिम सेवा",
    "पाँचथर"
  ],
  alternates: {
    canonical: "https://phidimservice.com.np",
  },
  openGraph: {
    title: "Phidim Service | No. 1 Local Services in Phidim, Panchthar, Nepal",
    description: "Connect with certified local technicians for doorstep electrical, plumbing, fiber internet, CCTV, DishHome, and AC repair across Phidim and Panchthar.",
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
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phidim Service | No. 1 Local Services in Phidim, Panchthar",
    description: "On-demand doorstep technicians and home services across Phidim Municipality and Panchthar District, Nepal.",
    images: ["/logo.png"],
  },
  other: {
    "geo.region": "NP-KO",
    "geo.placename": "Phidim, Panchthar, Nepal",
    "geo.position": "27.1485;87.7634",
    "ICBM": "27.1485, 87.7634"
  }
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Phidim Service",
    "alternateName": ["Phidim Services", "PhidimService", "फिदिम सेवा", "Phidim Service Platform"],
    "url": "https://phidimservice.com.np",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://phidimservice.com.np/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://phidimservice.com.np/#localbusiness",
    "name": "Phidim Service",
    "alternateName": "Phidim Service Platform",
    "url": "https://phidimservice.com.np",
    "logo": "https://phidimservice.com.np/logo.png",
    "image": "https://phidimservice.com.np/logo.png",
    "telephone": "+9779862772457",
    "priceRange": "Rs. 300 - Rs. 15,000",
    "currenciesAccepted": "NPR",
    "paymentAccepted": "Cash, Fonepay, eSewa, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Road, Ward No. 1",
      "addressLocality": "Phidim",
      "addressRegion": "Panchthar, Koshi Province",
      "postalCode": "57200",
      "addressCountry": "NP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.1485,
      "longitude": 87.7634
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "07:00",
        "closes": "20:00"
      }
    ],
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Phidim Service Offer Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electrician & House Wiring in Phidim",
            "description": "Certified electrician for residential house wiring, MCB distribution board, and emergency repair in Phidim."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plumbing & Water Pump Repair in Phidim",
            "description": "Expert plumber for PPR/CPVC leak repair, tank switch, and water booster pump service in Phidim."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CCTV Security Camera Installation in Phidim",
            "description": "High-definition Dahua & Hikvision 4/8/16 channel CCTV camera setup with mobile app streaming in Phidim."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "DishHome FiberNet & WiFi in Phidim",
            "description": "High-speed DishHome optical fiber internet packages and dual-band router setup across Phidim."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "DishHome DTH Satellite Service in Phidim",
            "description": "DishHome DTH dish antenna alignment, setup box activation, and HD channel tuning in Phidim."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Computer & Laptop Repair in Phidim",
            "description": "Hardware diagnostics, Windows OS installation, and SSD speed upgrade in Phidim Bazaar."
          }
        }
      ]
    },
    "description": "Phidim Service (फिदिम सेवा) is the #1 on-demand local service platform in Phidim, Panchthar, Nepal. Connect with certified electricians, plumbers, DishHome technicians, CCTV camera installers, FiberNet internet specialists, and computer repair experts."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Phidim Service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phidim Service (फिदिम सेवा) is the premier local on-demand service and technology platform based in Phidim, Panchthar, Nepal, connecting households and businesses with verified electricians, plumbers, DishHome technicians, CCTV installers, fiber internet technicians, and computer repair experts."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can a technician arrive in Phidim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Phidim Bazaar, Ward 1, Ward 2, and Ward 4 (Pragati Chowk), verified technicians typically arrive at your doorstep within 30 to 45 minutes of booking."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book a local service in Phidim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book directly through the Phidim Service website, send a WhatsApp message to our dispatch team, or call our 24/7 hotline at +977 986-2772457."
        }
      }
    ]
  };

  return (
    <>
      {/* Structured Data Scripts for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Semantic Crawl Container for Search Engine Indexation */}
      <div className="sr-only" aria-hidden="true">
        <h1>Phidim Service | No. 1 Local Services & Home Technicians in Phidim, Panchthar, Nepal</h1>
        <p>
          Welcome to Phidim Service (फिदिम सेवा), the leading on-demand service platform in Phidim Municipality, Panchthar, Nepal.
          We provide doorstep certified technicians for electrical repair, house wiring, plumbing, CCTV security camera installations,
          DishHome DTH antenna tuning, FiberNet internet setup, and computer laptop repair across all 14 wards of Phidim.
        </p>
        <h2>Top Local Services in Phidim, Panchthar</h2>
        <ul>
          <li>Electrician & House Wiring in Phidim</li>
          <li>Plumbing & Sanitary Water Pump Repair in Phidim</li>
          <li>DishHome FiberNet & WiFi Setup in Phidim</li>
          <li>CCTV Camera HD Security Installation in Phidim</li>
          <li>DishHome DTH Satellite Dish Alignment in Phidim</li>
          <li>Computer & Laptop Hardware Repair in Phidim</li>
          <li>AC Servicing & Gas Refill in Phidim</li>
        </ul>
        <h2>Phidim Municipal Wards Covered</h2>
        <p>Phidim Ward 1 (Gadhi), Ward 2 (Main Bazaar, Thado Line), Ward 3, Ward 4 (Pragati Chowk), Ward 5, Ward 6, Ward 7 (Salleri, Bharapa), and Wards 8 to 14.</p>
        <p>Hotline: +977 986-2772457 • Main Road, Ward 1, Phidim, Panchthar, Koshi Province, Nepal.</p>
      </div>

      <SpaRoot />
    </>
  );
}
