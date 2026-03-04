"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

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
  const particlePositions = useMemo(() => generateParticlePositions(20), []);
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityBackground = useTransform(scrollY, [0, 500], [1, 0.3]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-sky-950">
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
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950 via-sky-900 to-sky-950 opacity-90 z-0" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15)_0%,transparent_60%)] z-0"
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

      {/* Admin Login Link */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20"
      >
        <Link
          href="/admin/signin"
          className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300"
        >
          <span className="text-xs font-semibold text-white/70 group-hover:text-white tracking-wide uppercase">Admin</span>
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:animate-pulse" />
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 flex flex-col items-center justify-center text-center mt-12 sm:mt-0 pt-10 sm:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/20 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span className="text-xs sm:text-sm font-bold text-sky-200 tracking-wider uppercase">
                EvaSUE Campus Impact Platform
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={itemVariants} className="text-[11.5vw] sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-2 sm:mb-4 drop-shadow-2xl flex flex-col gap-0.5 sm:gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              Eastern Evangelistic
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-100 to-sky-300">
              Outreach
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mt-3 sm:mt-6 mb-7 sm:mb-8 relative w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-100/90 tracking-wide flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <span className="leading-tight">Jesus Is All About Life</span>
              <span className="hidden sm:inline text-sky-400/50">•</span>
              <span className="relative z-10">JAAL</span>


            </h2>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-[15px] sm:text-base md:text-lg text-sky-100 max-w-2xl font-bold leading-relaxed px-2 sm:px-4 mb-8 sm:mb-10 drop-shadow-lg">
            A centralized data platform to track, analyze, and dramatically grow our campus evangelism impact across Ethiopia.
          </motion.p>

          {/* CTA Box */}
          <motion.div variants={itemVariants}>
            <Link href="/register" className="group relative inline-flex">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-tilt"></div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-center gap-2.5 px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-sky-950 font-black text-xs sm:text-sm rounded-full overflow-hidden shadow-xl transition-all"
              >
                {/* Button Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 tracking-wide uppercase">Register Now !</span>

                <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sky-950 text-white flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.button>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
}