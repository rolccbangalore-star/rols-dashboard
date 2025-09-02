// src/app/layout.tsx
import { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// Load Urbanist font
const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

// Metadata for the app
export const metadata: Metadata = {
  title: "ROLS Dashboard",
  description: "Login and dashboard system for ROLS Group",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Background Gradient Animation */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_#6EE7B7,_transparent),radial-gradient(circle_at_bottom_right,_#3B82F6,_transparent),radial-gradient(circle_at_center,_#9333EA,_transparent)] animate-gradient" />

        {/* Navigation */}
        <nav className="p-4 text-white font-medium">
          <Link href="/login">Login</Link>
        </nav>

        {/* Page Content */}
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
