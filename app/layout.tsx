import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import AIChat from "@/components/AIChat";
import SplashCursor from "@/components/SplashCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ravikumar-Portfolio",
  description: "AI-Powered Full Stack Developer portfolio for Ravikumar J.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0B0F19]`}>
        <Navbar />
        {children}
        <AIChat />
        
        <SplashCursor COLOR="#00F5FF" RAINBOW_MODE={false} />
      </body>
    </html>
  );
}
