"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">⛪</span>
            </div>
            <span className="font-bold text-xl text-gray-800">Campus Outreach</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-sky-600 transition">Home</Link>
            <Link href="#mission" className="text-gray-600 hover:text-sky-600 transition">Mission</Link>
            <Link href="#impact" className="text-gray-600 hover:text-sky-600 transition">Impact</Link>
            <Link href="#contact" className="text-gray-600 hover:text-sky-600 transition">Contact</Link>
            <Link 
              href="/admin/login" 
              className="px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-600 hover:text-sky-600">Home</Link>
              <Link href="#mission" className="text-gray-600 hover:text-sky-600">Mission</Link>
              <Link href="#impact" className="text-gray-600 hover:text-sky-600">Impact</Link>
              <Link href="#contact" className="text-gray-600 hover:text-sky-600">Contact</Link>
              <Link 
                href="/admin/login" 
                className="px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg text-center"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}