import type React from "react";
import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";


import { Inter } from "next/font/google";
import ScrollReset from "../components/scrollReset";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimasi font loading
});

// Viewport configuration untuk responsive dan mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  // Basic metadata
  metadataBase: new URL("https://t-kurnia-yogas-wara.vercel.app"),
  title: {
    default: "T. Kurnia Yogas Wara | Frontend Developer & UI/UX Enthusiast",
    template: "%s | T. Kurnia Yogas Wara",
  },
  description:
    "Creative Frontend Web Developer specializing in modern, interactive web experiences with React, Next.js, GSAP, and TailwindCSS. Explore my portfolio of responsive and performant web applications.",
  keywords: [
    "Frontend Developer Indonesia",
    "React Developer Medan",
    "Next.js Expert",
    "GSAP Animations",
    "UI/UX Designer",
    "Web Portfolio",
    "Web Design Indonesia",
    "WordPress Developer",
    "TypeScript Developer",
    "TailwindCSS",
    "Frontend Engineer",
    "Web Animation Specialist",
  ],
  authors: [{ name: "T. Kurnia Yogas Wara", url: "https://github.com/YogasWara18" }],
  creator: "T. Kurnia Yogas Wara",
  publisher: "T. Kurnia Yogas Wara",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Robots dan indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: "https://t-kurnia-yogas-wara.vercel.app",
    languages: {
      "en-US": "https://t-kurnia-yogas-wara.vercel.app/en",
      "id-ID": "https://t-kurnia-yogas-wara.vercel.app/id",
    },
  },

  // Open Graph untuk social media
  openGraph: {
    title: "T. Kurnia Yogas Wara | Frontend Developer",
    description:
      "Modern portfolio showcasing premium UI, smooth animations, and innovative web projects built with cutting-edge technologies.",
    url: "https://t-kurnia-yogas-wara.vercel.app",
    siteName: "T. Kurnia Yogas Wara Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "T. Kurnia Yogas Wara - Frontend Developer Portfolio",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 800,
        height: 800,
        alt: "T. Kurnia Yogas Wara Profile",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Indonesia",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "T. Kurnia Yogas Wara | Frontend Developer",
    description:
      "Creative portfolio with modern UI and smooth animations using React, Next.js, and GSAP.",
    images: ["/twitter-image.jpg"],
    creator: "@yogaswara",
    site: "@yogaswara",
  },

  // Icons dan favicon
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-light-32x32.png", type: "image/png", sizes: "32x32", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", type: "image/png", sizes: "32x32", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // Manifest untuk PWA
  manifest: "/manifest.json",

  // App links
  appleWebApp: {
    title: "Yogas Portfolio",
    statusBarStyle: "black-translucent",
    startupImage: ["/apple-splash-2048-2732.png"],
  },

  // Verification untuk search console
  verification: {
    google: "google-site-verification-code", // Ganti dengan code actual
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      "facebook-domain-verification": ["facebook-verification-code"],
    },
  },

  // Category
  category: "technology",
  
  // Classification
  classification: "Portfolio Website",
};

// JSON-LD Structured Data
function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "T. Kurnia Yogas Wara",
    "url": "https://t-kurnia-yogas-wara.vercel.app",
    "image": "https://t-kurnia-yogas-wara.vercel.app/hero.jpg",
    "sameAs": [
      "https://github.com/YogasWara18",
      "https://linkedin.com/in/t-kurnia-yogas-wara-604b64338",
      "https://instagram.com/yogaswara04/",
      "https://web.facebook.com/Yogasswar",
    ],
    "jobTitle": "Frontend Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Creative Frontend Web Developer specializing in modern, interactive web experiences with React, Next.js, GSAP, and TailwindCSS.",
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "GSAP",
      "TailwindCSS",
      "WordPress",
      "UI/UX Design"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Purwadhika Bootcamp"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Medan",
      "addressRegion": "North Sumatra",
      "addressCountry": "Indonesia"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Preconnect untuk domain eksternal */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/hero.jpg" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://vercel.live" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://t-kurnia-yogas-wara.vercel.app" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
        
        {/* Structured Data */}
        <JsonLd />
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        {/* Skip to content link untuk accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-lg">
          Skip to content
        </a>
        
        {/* Scroll reset component */}
        <ScrollReset />
        
        {/* Main content dengan id untuk skip link */}
        <main id="main-content">
          {children}
        </main>
        
        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}