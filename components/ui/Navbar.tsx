// components/ui/Navbar.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Home, LayoutGrid, Compass, User, Leaf, Menu } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#46675B] flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          LISTO
        </Link>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <ul
          className={`lg:flex gap-8 items-center font-medium text-sm ${
            open ? "block mt-4" : "hidden lg:flex"
          }`}
        >
          <li><Link href="/vision-board" className="hover:text-green-700 flex items-center gap-1"><LayoutGrid size={18} /> Vision Board</Link></li>
          <li><Link href="/explore" className="hover:text-green-700 flex items-center gap-1"><Compass size={18} /> Explore</Link></li>
          <li><Link href="/impact-projects" className="hover:text-green-700 flex items-center gap-1"><Leaf size={18} /> Impact Projects</Link></li>
          <li><Link href="/profile" className="hover:text-green-700 flex items-center gap-1"><User size={18} /> My Space</Link></li>
        </ul>
      </div>
    </nav>
  );
}
