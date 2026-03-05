"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FormInput,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Church,
  FileText,
  Calendar,
  HelpCircle
} from "lucide-react";
import { useState } from "react";

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Registrants", href: "/dashboard/students" },
    { icon: FormInput, label: "Forms", href: "/dashboard/form" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-screen bg-slate-950 text-slate-50 border-r border-slate-800 shadow-2xl overflow-hidden group/sidebar z-50"
    >
      {/* Subtle ambient glows for premium feel */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl -z-10 transition-transform duration-700 group-hover/sidebar:scale-110" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 transition-transform duration-700 group-hover/sidebar:scale-110" />
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-20 bg-slate-800 text-slate-300 rounded-full p-1.5 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-slate-700 hover:bg-slate-700 hover:text-white hover:scale-110 transition-all z-50 flex items-center justify-center h-7 w-7"
      >
        {collapsed ? <ChevronRight size={16} strokeWidth={2.5} /> : <ChevronLeft size={16} strokeWidth={2.5} />}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} p-6 border-b border-slate-800/60 mb-4 h-[88px]`}>
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.3)] shrink-0">
          <Church className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="ml-3 flex flex-col"
          >
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Campus Outreach
            </span>
            <span className="text-[10px] uppercase font-semibold text-sky-400 tracking-wider">
              Management Portal
            </span>
          </motion.div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden group ${isActive(item.href)
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_20px_rgba(14,165,233,0.1)]'
                  : 'text-slate-400 border border-transparent hover:bg-slate-800/50 hover:text-slate-200'
                }`}
            >
              {isActive(item.href) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sky-500 rounded-r-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                />
              )}
              <item.icon size={20} className={isActive(item.href) ? 'text-sky-400' : 'group-hover:text-slate-200 transition-colors'} />
              {!collapsed && (
                <span className={`ml-3 font-medium transition-colors ${isActive(item.href) ? 'text-white' : 'group-hover:text-white'}`}>
                  {item.label}
                </span>
              )}
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-0 right-0 px-4">
        <div className={`mb-4 w-full h-[1px] bg-gradient-to-r from-transparent ${collapsed ? 'via-slate-800' : 'via-slate-800/60'} to-transparent`} />

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} w-full px-4 py-3 rounded-xl text-slate-400 transition-all duration-300 border border-transparent hover:border-red-500/20`}
        >
          <LogOut size={20} className="group-hover:text-red-400" />
          {!collapsed && <span className="ml-3 font-medium group-hover:text-red-400">Logout</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}