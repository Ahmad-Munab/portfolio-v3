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
      <body className={`${inconsolota.className} antialiased`}>
        {children}
        <script
          src="https://b360-one.vercel.app/widget.js"
          data-widget-id="fa5f5528-2f91-440a-895d-7c1e4e53777b"
          defer
        ></script>
      </body>
    </html>
  );
}
