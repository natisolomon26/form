"use client";

import { motion } from "framer-motion";

interface HeroProps {
  backgroundImage?: string;
}

export default function Hero({ backgroundImage = "/hero-bg.jpg" }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        {/* Dark sky gradient overlay - sky-900 dark theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/95 via-sky-800/95 to-sky-900/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Measuring Gospel Impact
          <span className="block text-sky-300 mt-2">
            Across Ethiopian Campuses
          </span>
        </motion.h1>

        <motion.p 
          className="mt-6 text-xl text-white/90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A centralized outreach data platform for Christian fellowship
          students and supervisors to track, analyze, and grow
          campus impact.
        </motion.p>

        <motion.div 
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#mission"
            className="px-8 py-4 bg-white text-sky-900 font-semibold rounded-xl hover:bg-sky-50 transition shadow-lg hover:shadow-xl"
          >
            Learn More
          </a>
          <a
            href="/admin/login"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition backdrop-blur-sm"
          >
            Admin Access
          </a>
        </motion.div>
      </div>
    </section>
  );
}