"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<'en' | 'am'>('en');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Load language preference
    const savedLanguage = localStorage.getItem('language') as 'en' | 'am';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'am' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    // Reload to apply language change across the site easily
    window.location.reload();
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-white/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-white/40 py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Organization Name */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Image */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
              <Image src="/logo.svg" alt="EvaSUE Logo" fill className="object-cover" />
            </div>

            {/* Organization Names - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block">
              <div className={`text-sm font-black leading-tight group-hover:text-sky-500 transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                የኢትዮጵያ ወንጌላዊያን ተማሪዎችና ምሩቃን ማህበር
              </div>
              <div className={`text-[11px] font-bold leading-tight mt-0.5 tracking-wide ${scrolled ? 'text-slate-500' : 'text-sky-200/80'}`}>
                Evangelical Students' and Graduates' Union of Ethiopia
              </div>
              <div className={`text-[11px] font-black mt-0.5 tracking-widest ${scrolled ? 'text-sky-600' : 'text-sky-300'}`}>
                (EvaSUE)
              </div>
            </div>

            {/* Mobile abbreviated version */}
            <div className="md:hidden">
              <div className={`text-sm font-black group-hover:text-sky-500 transition-colors duration-300 ${scrolled ? 'text-sky-700' : 'text-white'}`}>
                ኢቫሱ
              </div>
              <div className={`text-xs font-bold tracking-wider ${scrolled ? 'text-red-600' : 'text-sky-200/80'}`}>
                EvaSUE
              </div>
            </div>
          </Link>

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border ${scrolled
                  ? 'bg-slate-50/80 border-slate-200 hover:bg-slate-100 text-slate-700 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md shadow-lg shadow-sky-900/20'
                }`}
            >
              <Globe className={`w-4 h-4 ${scrolled ? 'text-sky-600' : 'text-sky-300'}`} />
              <span className="text-sm font-bold tracking-wide">
                {language === 'en' ? 'አማርኛ' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}