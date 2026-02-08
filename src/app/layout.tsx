import { about } from "@/data/about";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
});

const siteUrl = "https://munab.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${about.name} | Full-Stack Developer & AI Enthusiast`,
    template: `%s | ${about.name}`,
  },
  description: about.bio,
  keywords: [
    "Ahmad Munab",
    "Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "AI Enthusiast",
    "SaaS Builder",
    "Web Developer",
    "JavaScript",
    "TypeScript",
    "Python",
    "Bangladesh",
  ],
  authors: [{ name: about.name, url: siteUrl }],
  creator: about.name,
  publisher: about.name,

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${about.name} Portfolio`,
    title: `${about.name} | Full-Stack Developer & AI Enthusiast`,
    description: about.bio,
    images: [
      {
        url: "/Picture.png",
        width: 800,
        height: 800,
        alt: `${about.name} - Full-Stack Developer Portfolio`,
        type: "image/png",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: `${about.name} | Full-Stack Developer & AI Enthusiast`,
    description: about.bio,
    creator: "@ahmadmunab",
    images: ["/Picture.png"],
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },

  // Robots
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

  // Verification (add your IDs when available)
  // verification: {
  //   google: "your-google-verification-id",
  // },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: about.name,
  url: siteUrl,
  image: `${siteUrl}/Picture.png`,
  jobTitle: "Full-Stack Developer & AI Enthusiast",
  description: about.bio,
  email: about.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "Bangladesh",
  },
  sameAs: [
    about.social.linkedin,
    about.social.github,
    about.social.x,
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "FastAPI",
    "MongoDB",
    "PostgreSQL",
    "AI/ML",
    "SaaS Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${raleway.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
