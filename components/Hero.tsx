"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import Link from "next/link";

interface HeroProps {
  backgroundImage?: string;
}

// Generate random positions outside of render
const generateParticlePositions = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
};

export default function Hero({ backgroundImage = "/images/back3.JPG" }: HeroProps) {
  // Generate particle positions once using useMemo
  const particlePositions = useMemo(() => generateParticlePositions(6), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with gradient overlay */}
      <div className="absolute inset-0">
        {/* Background Image with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Dark sky gradient overlay with animated opacity */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-sky-900/95 via-sky-800/95 to-sky-900/95"
          animate={{
            opacity: [0.9, 0.95, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles effect (mobile-friendly) */}
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              animate={{
                y: [0, -30],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Admin Login Link - Bottom Right Corner */}
      <div className="absolute bottom-4 right-4 z-20">
        <Link href="/admin/signin">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="inline-block text-xs sm:text-sm text-white/40 hover:text-white/80 transition-colors duration-300 cursor-pointer"
          >
            Admin Login
          </motion.span>
        </Link>
      </div>

      {/* Content - Mobile First Approach */}
      <div className="relative z-10 w-full px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Title - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-white">
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 text-sky-200/90">
                Welcome to
              </span>
              <span className="block text-sky-100">
                Eastern Evangelistic
              </span>
              <span className="block text-sky-100">
                Outreach
              </span>
            </h1>
          </motion.div>

          {/* Subtitle - JAAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-sky-300 mt-3 sm:mt-4">
              Jesus Is All About Life
              <span className="block text-base sm:text-lg md:text-xl text-sky-400/80 mt-1">
                (JAAL)
              </span>
            </h2>
          </motion.div>

          {/* Decorative Line - Mobile Optimized */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-20 sm:w-24 md:w-32 h-0.5 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto my-4 sm:my-6 rounded-full"
          />

          {/* Description - Mobile First Text Sizing */}
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="block mb-2 text-sky-200 font-medium text-xs sm:text-sm uppercase tracking-wider">
              EvaSUE Campus Impact Platform
            </span>
            A centralized outreach data platform to track, analyze, 
            and grow campus impact across Ethiopia.
          </motion.p>

          {/* CTA Button - Mobile Optimized */}
          <motion.div 
            className="mt-6 sm:mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-sky-900 font-semibold rounded-full sm:rounded-3xl text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Register Now!
                  <motion.svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sky-100 to-white"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient for Mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sky-900/50 to-transparent pointer-events-none" />
    </section>
  );
}