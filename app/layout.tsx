import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Italiana } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { SITE_URL, personal } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jacopo Parretti — AI Engineer & Developer",
    template: "%s | Jacopo Parretti",
  },
  description:
    "Jacopo Parretti — AI engineer and software developer. MSc in Artificial Intelligence at the University of Verona; focus on language models, deep learning, and NLP.",
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
      "AI engineer and software developer. MSc in Artificial Intelligence at the University of Verona; focus on language models, deep learning, and NLP.",
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
      "AI engineer. MSc in Artificial Intelligence at the University of Verona — language models, deep learning, NLP.",
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
  verification: {
    google: "F2WMI5xhsaPSDFpQeuSF19DyDwsLeHW-pRyQ_xfl9kQ",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: SITE_URL,
  jobTitle: personal.title,
  description:
    "AI engineer and software developer. MSc in Artificial Intelligence at the University of Verona; focus on language models, deep learning, and NLP.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${italiana.variable} antialiased`}
      >
        <a href="#hero" className="skip-link">Skip to content</a>
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
