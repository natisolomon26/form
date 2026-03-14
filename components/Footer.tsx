"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as 'en' | 'am';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const content = {
    en: {
      partners: "In Partnership With",
      copyright: "© 2026 EvaSUE. All rights reserved."
    },
    am: {
      partners: "በአጋርነት ከ",
      copyright: "© 2018 ኢቫሱ። መብቱ በሕግ የተጠበቀ ነው።"
    }
  };

  const t = language === 'en' ? content.en : content.am;

  if (!mounted) return null;

  return (
    <footer className="bg-slate-950 border-t border-sky-900/30 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-10">

          <h3 className="text-sky-300/80 font-bold tracking-widest uppercase text-sm md:text-base">
            {t.partners}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 items-start justify-items-center opacity-80 hover:opacity-100 transition-opacity duration-500 w-full max-w-4xl mx-auto">
            {/* EvaSUE */}
            <Link href="https://www.evasue.net/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group w-full">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-2xl p-4 flex items-center justify-center border border-white/10 group-hover:border-sky-400/50 group-hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.3)] transition-all duration-300 group-hover:-translate-y-1">
                <Image
                  src="/logo/EvaSUE.svg"
                  alt="EvaSUE Logo"
                  fill
                  className="object-contain p-3"
                />
              </div>
              <span className="text-slate-400 group-hover:text-sky-300 font-medium text-sm text-center transition-colors">
                EvaSUE
              </span>
            </Link>

            {/* African Evangelistic Enterprise */}
            <Link href="https://et.aeint.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group w-full">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-2xl p-4 flex items-center justify-center border border-white/10 group-hover:border-sky-400/50 group-hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.3)] transition-all duration-300 group-hover:-translate-y-1">
                <Image
                  src="/logo/aee.png"
                  alt="AEE Logo"
                  fill
                  className="object-contain p-3"
                />
              </div>
              <span className="text-slate-400 group-hover:text-sky-300 font-medium text-sm text-center transition-colors">
                African Evangelistic Enterprices
              </span>
            </Link>

            {/* Scripture Union Ethiopia */}
            <Link href="https://www.suethiopia.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group w-full">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-2xl p-4 flex items-center justify-center border border-white/10 group-hover:border-sky-400/50 group-hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.3)] transition-all duration-300 group-hover:-translate-y-1">
                <Image
                  src="/logo/SU.png"
                  alt="Scripture Union Logo"
                  fill
                  className="object-contain p-3"
                />
              </div>
              <span className="text-slate-400 group-hover:text-sky-300 font-medium text-sm text-center transition-colors">
                Scripture Union Ethiopia
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
