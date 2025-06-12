import { about } from "@/data/about";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const inconsolota = Raleway({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${about.name} || Portfolio`,
  description: about.title,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inconsolota.className} antialiased`}>{children}</body>
    </html>
  );
}
