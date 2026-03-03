"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import StatCard from "@/components/dashboard/StatCard";
import ChartsRow from "@/components/dashboard/ChartsRow";
import Distributions from "@/components/dashboard/Distributions";
import { 
  Users, 
  Church, 
  Calendar, 
  TrendingUp,
  Download,
  Filter,
  Bell,
  Search
} from "lucide-react";

const statsData = [
  {
    title: "Total Fellowships",
    value: "128",
    change: "+12",
    trend: "up" as const,
    icon: Church,
  },
  {
    title: "Active Students",
    value: "3,549",
    change: "+245",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Outreach Events",
    value: "48",
    change: "+8",
    trend: "up" as const,
    icon: Calendar,
  },
  {
    title: "Gospel Impact",
    value: "12,847",
    change: "+1,234",
    trend: "up" as const,
    icon: TrendingUp,
  }
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 to-white">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-sky-100 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-sky-900">Dashboard Overview</h1>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-sky-50/50 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-transparent text-sm w-64"
                />
              </div>
              
              {/* Actions */}
              <button className="p-2 hover:bg-sky-50 rounded-lg transition relative">
                <Bell size={20} className="text-sky-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-sky-900 rounded-full" />
              </button>
              <button className="p-2 hover:bg-sky-50 rounded-lg transition">
                <Filter size={20} className="text-sky-700" />
              </button>
              <button className="p-2 hover:bg-sky-50 rounded-lg transition">
                <Download size={20} className="text-sky-700" />
              </button>
              
              {/* Profile */}
              <div className="w-10 h-10 bg-gradient-to-r from-sky-900 to-sky-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatCard
                key={stat.title}
                {...stat}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Charts Row */}
          <ChartsRow />

          {/* Distributions */}
          <Distributions />
        </div>
      </main>
    </div>
  );
}