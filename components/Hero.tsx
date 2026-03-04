"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Globe, 
  MapPin, 
  Clock, 
  Heart, 
  Calendar,
  Church,
  Users
} from "lucide-react";

interface HeroProps {
  backgroundImage?: string;
}

const generateParticlePositions = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));
};

export default function Hero({ backgroundImage = "/images/back3.JPG" }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const particlePositions = useMemo(() => generateParticlePositions(20), []);
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityBackground = useTransform(scrollY, [0, 500], [1, 0.3]);

  useEffect(() => {
    setMounted(true);
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as 'en' | 'am';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Toggle language function
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'am' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // Content in both languages
  const content = {
    en: {
      badge: "EvaSUE Campus Impact Platform",
      title: {
        line1: "Eastern Evangelistic",
        line2: "Outreach"
      },
      subtitle: "Jesus Is All About Life • JAAL",
      question: "Are you ready to see lives transformed in Addis Ababa? 🇪🇹✨",
      description: "EvaSUE and African Evangelistic Enterprise (AEE-Ethiopia) are teaming up for the \"Jesus is All About Life\" (JAAL) Easter Outreach this April! Our goal is simple: Reach every campus and beyond with the hope of the Gospel.",
      training: "To get mission-ready, we are hosting a Full Day Training & Consultation on Mar 14, 2026, exclusively for Main Leaders and Evan & Mission Mobilizers Leaders.",
      locations: [
        { name: "Central 1 campuses", location: "Megenagna Full Gospel Church" },
        { name: "Central 2 campuses", location: "Lideta Assemblies of God Church" }
      ],
      time: "8:30 AM – 5:00 PM",
      cost: "FREE (Registration is required!)",
      verse: "\"...In his great mercy he has given us new birth into a living hope...\" (1 Peter 1:3)",
      cta: "Register Now",
      admin: "Admin"
    },
    am: {
      badge: "ኢቫሱ የካምፓስ ተፅእኖ መድረክ",
      title: {
        line1: "የምስራቅ",
        line2: "ወንጌላዊ አገልግሎት"
      },
      subtitle: "ኢየሱስ ስለ ሕይወት ሁሉ ነው • JAAL",
      question: "የወንጌል ጥሪ ለአዲስ አበባ ካምፓሶች! 🇪🇹✨",
      description: "ኢቫሱ (EvaSUE) ከአፍሪካ ኢቫንጀልስቲክ ኢንተርፕራይዝ (AEE) ጋር በመተባበር \"ኢየሱስ ለጥያቄ ሁሉ መልስ ነው\" (JAAL) በሚል መሪ ቃል ታላቅ የትንሳኤ ወንጌል ዘመቻ አዘጋጅቷል።",
      training: "ለዚህ ታላቅ ተልዕኮ ራሳችንን የምናዘጋጅበት የሙሉ ቀን ሥልጠና መጋቢት 07 ቀን 2026 ይጠብቀናል!",
      locations: [
        { name: "ለሴንትራል 1 ተማሪዎች", location: "መገናኛ ሙሉ ወንጌል ቤተክርስቲያን" },
        { name: "ለሴንትራል 2 ተማሪዎች", location: "ልደታ የእግዚአብሔር አምባ ቤተክርስቲያን" }
      ],
      time: "ከጠዋቱ 2፡30 እስከ ቀኑ 11፡00 ሰዓት",
      cost: "በነጻ (ግን አስቀድሞ መመዝገብ አስፈላጊ ነው)",
      verse: "\"...እርሱ ከታላቅ ምሕረቱ የተነሣ በኢየሱስ ክርስቶስ ከሞት መነሣት ምክንያት ለሕያው ተስፋ በሚሆን አዲስ ልደት...\" (1ኛ ጴጥሮስ 1:3)",
      cta: "አሁን ይመዝገቡ",
      admin: "አስተዳዳሪ"
    }
  };

  const t = language === 'en' ? content.en : content.am;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sky-950">
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center origin-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          y: yBackground,
          opacity: opacityBackground
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Animated Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950 via-sky-900/95 to-sky-950 opacity-95 z-0" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15)_0%,transparent_70%)] z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Particles */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${4 * pos.scale}px`,
                height: `${4 * pos.scale}px`,
              }}
              animate={{
                y: [0, -100 - Math.random() * 100],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0, 0.8, 0],
                scale: [0, pos.scale, 0]
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                ease: "linear",
                delay: pos.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Language Toggle & Admin Login */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2"
      >
        <button
          onClick={toggleLanguage}
          className="group flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300"
        >
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-xs font-semibold text-white/70 group-hover:text-white tracking-wide">
            {language === 'en' ? 'አማርኛ' : 'English'}
          </span>
        </button>

      </motion.div>

      {/* Main Content - Scrollable Area */}
      <div className="relative z-10 w-full h-full overflow-y-auto py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-5xl mx-auto"
          >
           

            {/* Title */}
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                  {t.title.line1}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-100 to-sky-300">
                  {t.title.line2}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle with divider */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <Church className="w-4 h-4 text-sky-400" />
                <span className="text-sm sm:text-base font-bold text-sky-200">{t.subtitle}</span>
              </div>
            </motion.div>

            {/* Question */}
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                {t.question}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center mb-8">
              <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            {/* Training Info */}
            <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-10">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-sky-100 font-medium">
                    {t.training}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Locations Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
              {t.locations.map((loc, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white text-sm sm:text-base mb-1">{loc.name}</p>
                      <p className="text-xs sm:text-sm text-sky-200/80">{loc.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Time and Cost */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto mb-8">
              <div className="flex items-center gap-2 bg-sky-500/10 rounded-full px-5 py-2.5 border border-sky-400/20">
                <Clock className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-semibold text-white">⏰ {t.time}</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 rounded-full px-5 py-2.5 border border-green-400/20">
                <Heart className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-white">💰 {t.cost}</span>
              </div>
            </motion.div>

            {/* Bible Verse */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center mb-10">
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-sky-500/20 rounded-full blur-md" />
                <p className="text-xs sm:text-sm text-sky-200/80 italic px-4">
                  {t.verse}
                </p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <Link href="/register" className="group relative inline-flex">
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-tilt"></div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-sky-950 font-black text-sm rounded-full overflow-hidden shadow-xl transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 tracking-wide uppercase">{t.cta}</span>
                  <div className="relative z-10 w-7 h-7 rounded-full bg-sky-950 text-white flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}