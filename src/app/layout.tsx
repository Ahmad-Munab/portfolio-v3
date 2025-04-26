import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const inconsolota = Raleway({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmad Munab || Portfolio",
  description: "Software Engineer | AI Enthusiast | SaaS Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inconsolota.className} antialiased`}>{children}</body>
    </html>
  );
}
