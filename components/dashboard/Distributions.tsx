"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { Users, MapPin, Award, TrendingUp, GraduationCap, UserCog, Globe } from "lucide-react";

interface Student {
  _id: string;
  fullName: string;
  phoneNumber: string;
  campus: string;
  role: string;
  registeredAt: string;
}

interface DistributionsProps {
  students: Student[];
}

interface CampusEngagement {
  name: string;
  students: number;
  mainLeaders: number;
  evangelists: number;
  members: number;
  growth: number;
}

interface MetricData {
  metric: string;
  [key: string]: string | number;
}

interface TooltipPayload {
  name: string;
  value: number;
  unit?: string;
  color?: string;
  fill?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md text-slate-800 p-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100">
        <p className="text-sm font-bold mb-2 text-slate-900">{label}</p>
        <div className="flex flex-col gap-1.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm font-medium">
              <div
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: entry.color || entry.fill || "#0284C7" }}
              />
              <span className="text-slate-500 capitalize">{entry.name}:</span>
              <span className="text-slate-800">{entry.value} {entry.name === "growth" || entry.unit === "%" ? "%" : ""}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function Distributions({ students }: DistributionsProps) {
  // Use useMemo to derive data instead of useState + useEffect
  const { campusData, topCampuses, stats, metricData } = useMemo(() => {
    if (students.length === 0) {
      return {
        campusData: [],
        topCampuses: [],
        stats: {
          totalStudents: 0,
          activeCampuses: 0,
          avgGrowth: 0
        },
        metricData: []
      };
    }

    // Group students by campus
    const campusMap = new Map<string, CampusEngagement>();

    students.forEach(student => {
      const campus = student.campus;
      if (!campusMap.has(campus)) {
        campusMap.set(campus, {
          name: campus,
          students: 0,
          mainLeaders: 0,
          evangelists: 0,
          members: 0,
          growth: 0
        });
      }

      const campusData = campusMap.get(campus)!;
      campusData.students++;

      // Count by role
      if (student.role === 'main-leader') campusData.mainLeaders++;
      else if (student.role === 'evangelism-mobilizer') campusData.evangelists++;
      else if (student.role === 'member') campusData.members++;
    });

    // Calculate growth for each campus (based on registration dates)
    // eslint-disable-next-line react-hooks/purity
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    // eslint-disable-next-line react-hooks/purity
    const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    campusMap.forEach((campus, name) => {
      const campusStudents = students.filter(s => s.campus === name);
      const recentStudents = campusStudents.filter(s => new Date(s.registeredAt) >= oneMonthAgo).length;
      const previousStudents = campusStudents.filter(s => {
        const date = new Date(s.registeredAt);
        return date >= twoMonthsAgo && date < oneMonthAgo;
      }).length;

      // Calculate growth percentage
      if (previousStudents > 0) {
        campus.growth = Math.round(((recentStudents - previousStudents) / previousStudents) * 100);
      } else if (recentStudents > 0) {
        campus.growth = 100;
      } else {
        campus.growth = 0;
      }
    });

    // Convert to array and sort by student count
    const campusArray = Array.from(campusMap.values())
      .sort((a, b) => b.students - a.students);

    const topThreeCampuses = campusArray.slice(0, 3);

    // Calculate stats
    const totalStudents = students.length;
    const activeCampuses = campusArray.length;
    const avgGrowth = campusArray.length > 0
      ? Math.round(campusArray.reduce((sum, c) => sum + c.growth, 0) / campusArray.length)
      : 0;

    // Calculate metrics for radar chart
    const metrics: MetricData[] = topThreeCampuses.length > 0 ? [
      {
        metric: "Student Count",
        [topThreeCampuses[0]?.name || "Campus A"]: topThreeCampuses[0]?.students || 0,
        [topThreeCampuses[1]?.name || "Campus B"]: topThreeCampuses[1]?.students || 0,
        [topThreeCampuses[2]?.name || "Campus C"]: topThreeCampuses[2]?.students || 0,
      },
      {
        metric: "Main Leaders",
        [topThreeCampuses[0]?.name || "Campus A"]: topThreeCampuses[0]?.mainLeaders || 0,
        [topThreeCampuses[1]?.name || "Campus B"]: topThreeCampuses[1]?.mainLeaders || 0,
        [topThreeCampuses[2]?.name || "Campus C"]: topThreeCampuses[2]?.mainLeaders || 0,
      },
      {
        metric: "Evangelists",
        [topThreeCampuses[0]?.name || "Campus A"]: topThreeCampuses[0]?.evangelists || 0,
        [topThreeCampuses[1]?.name || "Campus B"]: topThreeCampuses[1]?.evangelists || 0,
        [topThreeCampuses[2]?.name || "Campus C"]: topThreeCampuses[2]?.evangelists || 0,
      },
      {
        metric: "Growth %",
        [topThreeCampuses[0]?.name || "Campus A"]: topThreeCampuses[0]?.growth || 0,
        [topThreeCampuses[1]?.name || "Campus B"]: topThreeCampuses[1]?.growth || 0,
        [topThreeCampuses[2]?.name || "Campus C"]: topThreeCampuses[2]?.growth || 0,
      },
    ] : [];

    return {
      campusData: campusArray,
      topCampuses: topThreeCampuses,
      stats: {
        totalStudents,
        activeCampuses,
        avgGrowth
      },
      metricData: metrics
    };
  }, [students]);

  if (students.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center justify-center min-h-[400px]">
          <p className="text-center text-slate-400 font-medium">No campus data available</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center justify-center min-h-[400px]">
          <p className="text-center text-slate-400 font-medium">No data available for radar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Campus Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-500 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -z-10 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-500 transform -translate-x-1/2 translate-y-1/2" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_8px_16px_rgba(14,165,233,0.3)]">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Campus Engagement</h2>
              <p className="text-xs text-slate-500">Students per campus</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-sky-50 rounded-full border border-sky-100/50">
              <span className="text-xs font-semibold text-sky-700">Top {campusData.length} Campuses</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={campusData.slice(0, 8)} // Show top 8 campuses for readability
              layout="vertical"
              margin={{ left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#94A3B8"
                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                width={100}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC', opacity: 0.8 }} />
              <Bar
                dataKey="students"
                radius={[0, 8, 8, 0]}
                barSize={20}
              >
                {campusData.slice(0, 8).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#0284C7"
                    fillOpacity={1 - (index * 0.08)}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Growth indicators for top 3 campuses */}
        {topCampuses.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {topCampuses.map((campus) => (
              <div key={campus.name} className="text-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50 transition-colors">
                <p className="text-xs font-semibold text-slate-500 mb-1.5 truncate px-1">{campus.name}</p>
                <div className={`flex items-center justify-center gap-1 ${campus.growth > 0 ? 'text-emerald-600' : 'text-slate-600'}`}>
                  <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span className="text-sm font-bold">
                    {campus.growth > 0 ? '+' : ''}{campus.growth}%
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-sky-600 mt-1.5 bg-sky-50 py-0.5 px-2 rounded-full inline-block">
                  {campus.students} students
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Radar Chart & Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -z-10 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_8px_16px_rgba(99,102,241,0.3)]">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">Campus Comparison</h2>
            <p className="text-xs text-slate-500">Top 3 campuses by metrics</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={metricData}>
              <PolarGrid stroke="#F1F5F9" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickLine={false} />
              {topCampuses.map((campus, index) => (
                <Radar
                  key={campus.name}
                  name={campus.name}
                  dataKey={campus.name}
                  stroke={index === 0 ? "#4F46E5" : index === 1 ? "#0EA5E9" : "#8B5CF6"}
                  strokeWidth={2}
                  fill={index === 0 ? "#4F46E5" : index === 1 ? "#0EA5E9" : "#8B5CF6"}
                  fillOpacity={0.15}
                />
              ))}
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 space-y-3.5 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center"><Users className="w-4 h-4 text-sky-600" /></div>
              <span className="text-sm font-medium text-slate-600">Total Students</span>
            </div>
            <span className="font-bold text-slate-800">{stats.totalStudents}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-indigo-600" /></div>
              <span className="text-sm font-medium text-slate-600">Active Campuses</span>
            </div>
            <span className="font-bold text-slate-800">{stats.activeCampuses}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center"><UserCog className="w-4 h-4 text-purple-600" /></div>
              <span className="text-sm font-medium text-slate-600">Main Leaders</span>
            </div>
            <span className="font-bold text-slate-800">
              {students.filter(s => s.role === 'main-leader').length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center"><Globe className="w-4 h-4 text-blue-600" /></div>
              <span className="text-sm font-medium text-slate-600">Evangelists</span>
            </div>
            <span className="font-bold text-slate-800">
              {students.filter(s => s.role === 'evangelism-mobilizer').length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-emerald-600" /></div>
              <span className="text-sm font-medium text-slate-600">Avg. Growth</span>
            </div>
            <span className="font-bold text-emerald-600">{stats.avgGrowth}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}