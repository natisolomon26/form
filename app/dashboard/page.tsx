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
    <div className="flex h-screen bg-gradient-to-br from-sky-50 to-white">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-sky-100 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-sky-900">Dashboard Overview</h1>
              <p className="text-sm text-sky-700/70 mt-1">
                {loading ? "Loading data..." : 
                  `Based on ${stats.totalStudents} registered students across ${stats.totalCampuses} campuses`}
              </p>
            </div>
            
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
              <button 
                onClick={fetchData}
                className="p-2 hover:bg-sky-50 rounded-lg transition text-sky-700"
                disabled={loading}
                title="Refresh data"
              >
                <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
              </button>
              <button className="p-2 hover:bg-sky-50 rounded-lg transition relative">
                <Bell size={20} className="text-sky-700" />
                {stats.recentRegistrations > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-sky-900 rounded-full" />
                )}
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

          {/* Quick Stats Row */}
          {!loading && stats.totalStudents > 0 && (
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-sky-100 text-sm">
              <div className="flex items-center gap-2">
                <Church className="w-4 h-4 text-sky-600" />
                <span className="text-sky-700">
                  <span className="font-semibold text-sky-900">{stats.totalStudents}</span> Total Students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserCog className="w-4 h-4 text-sky-600" />
                <span className="text-sky-700">
                  <span className="font-semibold text-sky-900">{stats.totalMainLeaders}</span> Main Leaders
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600" />
                <span className="text-sky-700">
                  <span className="font-semibold text-sky-900">{stats.totalEvangelists}</span> Evangelists
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
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-sky-200 rounded-xl" />
                    <div className="w-16 h-6 bg-sky-100 rounded-full" />
                  </div>
                  <div className="h-8 w-20 bg-sky-200 rounded mb-2" />
                  <div className="h-4 w-24 bg-sky-100 rounded" />
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