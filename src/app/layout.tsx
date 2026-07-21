import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SmartCart Prototype",
  description: "Web-based prototype of a Smart Shopping Cart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-slate-50 text-slate-900 antialiased overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
