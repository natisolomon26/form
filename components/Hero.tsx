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
        line1: "Easter Evangelistic",
        line2: "Outreach"
      },
      subtitle: "Jesus Is All About Life • JAAL",
      question: "Are you ready to see lives transformed in Addis Ababa?",
      description: "EvaSUE and African Evangelistic Enterprise (AEE-Ethiopia) are teaming up for the \"Jesus is All About Life\" (JAAL) Easter Outreach this April! Our goal is simple: Reach every campus and beyond with the hope of the Gospel.",
      training: "To get mission-ready, we are hosting a Full Day Training & Consultation on Mar 14, 2026, exclusively for Main Leaders and Evan & Mission Mobilizers Leaders.",
      articles: [
        {
          title: "1. Resurrection: Religious Myth or Historical Fact?",
          description: "Many people view the resurrection of Christ as a religious myth lacking evidence.",
          link: "/content"
        },
        {
          title: "2. A Living Hope",
          description: "In his first letter, Peter speaks urgently about a living hope. This is the hope of eternal life, grounded in the fact that Jesus Christ did not remain dead; He is alive now.",
          link: "/content"
        }
      ],
      readMore: "Read more",
      verse: "\"...In his great mercy he has given us new birth into a living hope...\" (1 Peter 1:3)",
      cta: "Register Now",
      admin: "Admin"
    },
    am: {
      badge: "ኢቫሱ የካምፓስ ተፅእኖ መድረክ",
      title: {
        line1: "የፋሲካ",
        line2: "የወንጌል ስርጭት"
      },
      subtitle: "ኢየሱስ ለጥያቄ ሁሉ መልስ ነው • JAAL",
      question: "የወንጌል ጥሪ ለአዲስ አበባ ካምፓሶች!",
      description: "ኢቫሱ (EvaSUE) ከአፍሪካ ኢቫንጀልስቲክ ኢንተርፕራይዝ (AEE) ጋር በመተባበር \"ኢየሱስ ለጥያቄ ሁሉ መልስ ነው\" (JAAL) በሚል መሪ ቃል ታላቅ የትንሳኤ ወንጌል ዘመቻ አዘጋጅቷል።",
      training: "መጋቢት 05 ቀን 2018 ዓ.ም. ለዋና መሪዎች እና ለወንጌል አስተባባሪዎች የተዘጋጀ፥ ለዚህ ታላቅ ተልዕኮ ራሳችንን የምናዘጋጅበት የሙሉ ቀን ሥልጠና ይጠብቀናል!",
      articles: [
        {
          title: "1. ትንሳኤ፡ ኃይማኖታዊ ተረት ወይስ ታሪካዊ እውነታ?",
          description: "ቊጥራቸው ቀላል ያይደሉ ሰዎች፥ የክርስቶስን ትንሳኤ፥ ማረጋገጫ እንደሌለው የኃይማኖት ተረት አድርገው ይመለከቱታል",
          link: "/content"
        },
        {
          title: "2. ተስፈኛው ባለ ርስት",
          description: "ጴጥሮስ በመጀመሪያ መልእክቱ አጥብቆ የሚናገረው ስለ ሕያው ተስፋ ነው። ይህ ተስፋ የዘላለም ሕይወት ተስፋ ነው፤ ምክንያቱም ኢየሱስ ክርስቶስ ሞቶ አልቀረም፤ አሁን ሕያው ነው።",
          link: "/content"
        }
      ],
      readMore: "ተጨማሪ ያንብቡ",
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with parallax overlay */}
      <motion.div
        className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] bg-cover bg-center origin-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          y: yBackground,
          opacity: opacityBackground
        }}
        initial={{ scale: 1.1, filter: "blur(10px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* Modern High-End Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-sky-950/80 to-slate-950 opacity-100 z-0" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.3)_0%,transparent_60%)] z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 w-full h-[60%] bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.15)_0%,transparent_70%)] z-0"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
            <motion.div variants={itemVariants} className="text-center mb-8 relative">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-sky-500/30 blur-[80px] rounded-full pointer-events-none" />
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 pb-2">
                  {t.title.line1}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-sky-400 animate-pulse-slow">
                  {t.title.line2}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle with divider */}
            <motion.div variants={itemVariants} className="flex justify-center mb-10">
              <div className="relative group inline-flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/20 transition-all duration-500 shadow-[0_0_30px_-5px_rgba(14,165,233,0.3)] hover:shadow-[0_0_40px_0px_rgba(14,165,233,0.5)] cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] duration-1000 transition-transform" />
                <Church className="w-5 h-5 text-sky-400 shadow-sm" />
                <span className="text-sm sm:text-lg font-bold text-sky-50 tracking-wide uppercase">{t.subtitle}</span>
              </div>
            </motion.div>

            {/* Question */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                <span className="relative inline-block">
                  {t.question}
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50 rounded-full" />
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center mb-12">
              <p className="text-base sm:text-lg md:text-xl text-sky-100/90 leading-relaxed font-medium">
                {t.description}
              </p>
            </motion.div>

            {/* Training Info */}
            <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-12">
              <div className="relative group bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-sky-400/20 shadow-2xl hover:border-sky-400/40 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-sky-500/20 transition-colors duration-700" />
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-500/30">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
                      {t.training}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Articles Grid */}
            <motion.div variants={itemVariants} className="max-w-6xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {t.articles.map((article, index) => (
                  <div key={index} className="flex flex-col relative group bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-sky-400/20 shadow-2xl hover:border-sky-400/50 transition-all duration-500 overflow-hidden text-left">
                    <div className="absolute top-0 right-0 p-32 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-sky-500/10 transition-colors duration-700" />
                    <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-sky-300 transition-colors">{article.title}</h3>
                    <p className="relative z-10 text-sky-100/80 mb-6 leading-relaxed flex-grow">
                      {article.description}
                    </p>
                    <div className="relative z-10 mt-auto">
                      <Link href={article.link} className="inline-flex items-center text-sky-400 hover:text-sky-300 font-semibold transition-colors group/link">
                        {t.readMore} <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bible Verse */}
            <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center mb-12">
              <div className="relative inline-block px-10 py-6">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 skew-x-[-5deg]" />
                <div className="absolute -top-4 -left-4 text-6xl text-sky-500/30 font-serif">"</div>
                <div className="absolute -bottom-8 -right-4 text-6xl text-sky-500/30 font-serif">"</div>
                <p className="relative z-10 text-base sm:text-xl text-sky-100/90 italic font-medium">
                  {t.verse}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}