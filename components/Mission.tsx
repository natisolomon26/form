"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section id="mission" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Our Mission
          </h2>
          
          <div className="relative">
            {/* Decorative quote mark */}
            <div className="absolute -top-6 left-0 text-8xl text-sky-200/50 font-serif">"</div>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed relative z-10 px-8">
              To provide accurate, structured, and reliable outreach data that empowers 
              Christian fellowship leaders to understand campus engagement, measure impact, 
              and strategically expand gospel outreach across Ethiopia.
            </p>
            
            <div className="absolute -bottom-12 right-0 text-8xl text-sky-200/50 font-serif">"</div>
          </div>

          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-sky-600 to-sky-400 mx-auto mt-12 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}