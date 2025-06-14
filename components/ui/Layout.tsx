import { Roboto_Mono } from "next/font/google";
import React, { ReactNode } from "react";
import "./globals.css";
import Navbar from "./Navbar";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex flex-col min-h-screen bg-[#f8f9f3] text-[#2e423f] ${robotoMono.className}`}>
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} LISTO — All rights reserved
      </footer>
    </div>
  );
}