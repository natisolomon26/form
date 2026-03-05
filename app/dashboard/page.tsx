"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import StatCard from "@/components/dashboard/StatCard";
import ChartsRow from "@/components/dashboard/ChartsRow";
import Distributions from "@/components/dashboard/Distributions";
import {
  Users,
  UserCog,
  Globe,
  GraduationCap,
  Download,
  Filter,
  Bell,
  Search,
  RefreshCw,
  Church
} from "lucide-react";

interface Student {
  _id: string;
  fullName: string;
  phoneNumber: string;
  campus: string;
  role: string;
  registeredAt: string;
}

interface DashboardStats {
  totalStudents: number;
  totalMainLeaders: number;
  totalEvangelists: number;
  totalCampuses: number;
  recentRegistrations: number;
}

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalMainLeaders: 0,
    totalEvangelists: 0,
    totalCampuses: 0,
    recentRegistrations: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/register');
      const data = await response.json();
      const studentsData = data.students || [];
      setStudents(studentsData);

      // Calculate stats from real data
      calculateStats(studentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (studentsData: Student[]) => {
    const totalStudents = studentsData.length;
    const totalMainLeaders = studentsData.filter(s => s.role === 'main-leader').length;
    const totalEvangelists = studentsData.filter(s => s.role === 'evangelism-mobilizer').length;
    const uniqueCampuses = new Set(studentsData.map(s => s.campus)).size;

    // Recent registrations (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentRegistrations = studentsData.filter(s =>
      new Date(s.registeredAt) >= oneDayAgo
    ).length;

    setStats({
      totalStudents,
      totalMainLeaders,
      totalEvangelists,
      totalCampuses: uniqueCampuses,
      recentRegistrations
    });
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Stats data for StatCard components
  const statsData = [
    {
      title: "Total Students",
      value: formatNumber(stats.totalStudents),
      change: `+${stats.recentRegistrations} today`,
      trend: stats.recentRegistrations > 0 ? "up" as const : "down" as const,
      icon: Users,
    },
    {
      title: "Main Leaders",
      value: formatNumber(stats.totalMainLeaders),
      change: `${((stats.totalMainLeaders / (stats.totalStudents || 1)) * 100).toFixed(1)}%`,
      trend: stats.totalMainLeaders > 0 ? "up" as const : "down" as const,
      icon: UserCog,
    },
    {
      title: "Evangelism Mobilizers",
      value: formatNumber(stats.totalEvangelists),
      change: `${((stats.totalEvangelists / (stats.totalStudents || 1)) * 100).toFixed(1)}%`,
      trend: stats.totalEvangelists > 0 ? "up" as const : "down" as const,
      icon: Globe,
    },
    {
      title: "Total Campuses",
      value: formatNumber(stats.totalCampuses),
      change: `+${Math.floor(stats.totalCampuses * 0.1)} this year`,
      trend: stats.totalCampuses > 0 ? "up" as const : "down" as const,
      icon: GraduationCap,
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 relative overflow-hidden">
      {/* Ambient background glows for the whole page */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none" />

      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto z-10">
        {/* Header */}
        <header className="bg-white/60 backdrop-blur-xl border-b border-white/80 px-8 py-5 sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">Dashboard Overview</h1>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                {loading ? "Loading data..." :
                  `Based on ${stats.totalStudents} registered students across ${stats.totalCampuses} campuses`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchData}
                  className="p-2.5 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 rounded-xl transition-all text-slate-600 hover:text-indigo-600 disabled:opacity-50"
                  disabled={loading}
                  title="Refresh data"
                >
                  <RefreshCw size={18} strokeWidth={2.5} className={loading ? "animate-spin" : ""} />
                </button>
                <div className="h-8 w-px bg-slate-200 mx-1" /> {/* Divider */}

              </div>
            </div>
          </div>

          {/* Quick Stats Row */}
          {!loading && stats.totalStudents > 0 && (
            <div className="flex items-center gap-8 mt-5 pt-4 border-t border-slate-100/50 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center"><Church className="w-3.5 h-3.5 text-indigo-600" /></div>
                <span className="text-slate-500 font-medium">
                  <span className="font-bold text-slate-800 mr-1">{stats.totalStudents}</span> Total Students
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-purple-50 flex items-center justify-center"><UserCog className="w-3.5 h-3.5 text-purple-600" /></div>
                <span className="text-slate-500 font-medium">
                  <span className="font-bold text-slate-800 mr-1">{stats.totalMainLeaders}</span> Main Leaders
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-sky-50 flex items-center justify-center"><Globe className="w-3.5 h-3.5 text-sky-600" /></div>
                <span className="text-slate-500 font-medium">
                  <span className="font-bold text-slate-800 mr-1">{stats.totalEvangelists}</span> Evangelists
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white animate-pulse">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl" />
                    <div className="w-16 h-6 bg-slate-50 rounded-full" />
                  </div>
                  <div className="h-10 w-24 bg-slate-100 rounded-lg mb-2" />
                  <div className="h-4 w-32 bg-slate-50 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <StatCard
                  key={stat.title}
                  {...stat}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}

          {/* Charts Row with Real Data */}
          <ChartsRow students={students} />

          {/* Distributions with Real Data */}
          <Distributions students={students} />
        </div>
      </main>
    </div>
  );
}