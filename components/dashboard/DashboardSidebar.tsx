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
    { icon: FormInput, label: "Forms", href: "/dashboard/form" },
    { icon: FileText, label: "Outreach Reports", href: "/dashboard/reports" },
    { icon: Users, label: "Fellowships", href: "/dashboard/fellowships" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Calendar, label: "Events", href: "/dashboard/events" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
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
      transition={{ duration: 0.3 }}
      className="relative h-screen bg-gradient-to-b from-sky-900 to-sky-800 text-white shadow-2xl"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white text-sky-900 rounded-full p-1.5 shadow-lg hover:scale-110 transition-transform z-10"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} p-6 border-b border-white/10`}>
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <Church className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-3 font-bold text-xl"
          >
            Campus Outreach
          </motion.span>
        )}
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-xl transition-all cursor-pointer ${
                isActive(item.href)
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} w-full px-4 py-3 rounded-xl text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3 font-medium">Logout</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}