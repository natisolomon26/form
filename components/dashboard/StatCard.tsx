"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  delay?: number;
}

export default function StatCard({ title, value, change, trend, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -z-10 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-500 transform translate-x-1/2 -translate-y-1/2" />

      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_8px_16px_rgba(14,165,233,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border ${trend === "up"
            ? "bg-emerald-50 text-emerald-600 border-emerald-100/50"
            : "bg-rose-50 text-rose-600 border-rose-100/50"
          }`}>
          {trend === "up" ? <TrendingUp size={14} strokeWidth={2.5} /> : <TrendingDown size={14} strokeWidth={2.5} />}
          <span>{change}</span>
        </div>
      </div>

      <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 mb-2 tracking-tight">
        {value}
      </h3>
      <p className="text-slate-500 font-medium tracking-wide text-sm">{title}</p>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}