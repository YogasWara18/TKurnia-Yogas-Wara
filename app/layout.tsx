import type React from "react";
import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { Inter } from "next/font/google";
import ScrollReset from "../components/scrollReset"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "T. Kurnia Yogas Wara | Frontend Developer",
  description:
    "Creative Frontend Web Developer specializing in modern, interactive web experiences with React, Next.js, GSAP, and TailwindCSS.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "GSAP",
    "UI/UX",
    "Portfolio",
    "Web Design",
    "WordPress",
    "Indonesia Developer",
  ],
  openGraph: {
    title: "T. Kurnia Yogas Wara | Frontend Developer",
    description:
      "Modern portfolio showcasing premium UI, animations, and web projects.",
    url: "https://t-kurnia-yogas-wara.vercel.app/",
    siteName: "T. Kurnia Yogas Wara",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio Hero Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "T. Kurnia Yogas Wara | Frontend Developer",
    description:
      "Creative portfolio with modern UI and animations using React, Next.js, and GSAP.",
    images: ["/hero.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollReset /> {/* client component jalan di sini */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}