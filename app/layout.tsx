import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { SITE_URL, personal } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jacopo Parretti — AI Engineer & Developer",
    template: "%s | Jacopo Parretti",
  },
  description:
    "Portfolio of Jacopo Parretti — AI researcher and software engineer pursuing an MSc in Artificial Intelligence at the University of Verona. Specialising in LLMs, deep learning, and NLP.",
  keywords: [
    "Jacopo Parretti",
    "AI Engineer",
    "Machine Learning Engineer",
    "NLP",
    "LLM",
    "Deep Learning",
    "Bioinformatics",
    "University of Verona",
    "MSc Artificial Intelligence",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Jacopo Parretti", url: SITE_URL }],
  creator: "Jacopo Parretti",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Jacopo Parretti",
    title: "Jacopo Parretti — AI Engineer & Developer",
    description:
      "AI researcher and software engineer pursuing an MSc in Artificial Intelligence at the University of Verona. Specialising in LLMs, deep learning, and NLP.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jacopo Parretti — AI Engineer & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacopo Parretti — AI Engineer & Developer",
    description:
      "AI researcher and software engineer pursuing an MSc in Artificial Intelligence at the University of Verona.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: SITE_URL,
  jobTitle: personal.title,
  description:
    "AI researcher and software engineer pursuing an MSc in Artificial Intelligence at the University of Verona. Specialising in LLMs, deep learning, and NLP.",
  email: personal.email,
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Università degli Studi di Verona",
      url: "https://www.univr.it",
    },
  ],
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Large Language Models",
    "Bioinformatics",
    "Reinforcement Learning",
  ],
  sameAs: [personal.github, personal.linkedin, personal.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {/* SVG filter definitions for liquid glass distortion */}
        <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
          <defs>
            {/* Liquid merge — adjacent glass elements blend at edges */}
            <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
            {/* Glass refraction — subtle warp of content seen through glass */}
            <filter id="glass-refract" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="8" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
