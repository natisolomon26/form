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
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sky-900 text-white p-3 rounded-lg shadow-lg border border-sky-700">
        <p className="text-sm font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-sky-200">
            {entry.name}: {entry.value} {entry.name === "growth" ? "%" : "students"}
          </p>
        ))}
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
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <p className="text-center text-sky-700/70 py-20">No campus data available</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <p className="text-center text-sky-700/70 py-20">No data available</p>
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
        transition={{ delay: 0.1 }}
        className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-900 to-sky-700 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sky-900">Campus Engagement</h2>
              <p className="text-xs text-sky-700/70">Students per campus</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-sky-50 rounded-full">
              <span className="text-xs font-medium text-sky-900">Top {campusData.length} Campuses</span>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 12 }} />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#64748B" 
                tick={{ fill: '#64748B', fontSize: 12 }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="students" 
                radius={[0, 8, 8, 0]}
                barSize={20}
              >
                {campusData.slice(0, 8).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`rgba(12, 74, 110, ${0.6 + (index * 0.05)})`}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Growth indicators for top 3 campuses */}
        {topCampuses.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            {topCampuses.map((campus) => (
              <div key={campus.name} className="text-center">
                <p className="text-xs text-sky-700/70 mb-1 truncate px-1">{campus.name}</p>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3 text-sky-700" />
                  <span className="text-sm font-semibold text-sky-900">
                    {campus.growth > 0 ? '+' : ''}{campus.growth}%
                  </span>
                </div>
                <p className="text-[10px] text-sky-500 mt-1">{campus.students} students</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Radar Chart & Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-900 to-sky-700 rounded-xl flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-sky-900">Campus Comparison</h2>
            <p className="text-xs text-sky-700/70">Top 3 campuses by metrics</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={metricData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: '#0C4A6E', fontSize: 10 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#64748B', fontSize: 8 }} />
              {topCampuses.map((campus, index) => (
                <Radar
                  key={campus.name}
                  name={campus.name}
                  dataKey={campus.name}
                  stroke={index === 0 ? "#0C4A6E" : index === 1 ? "#0284C7" : "#38BDF8"}
                  fill={index === 0 ? "#0C4A6E" : index === 1 ? "#0284C7" : "#38BDF8"}
                  fillOpacity={0.2}
                />
              ))}
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 space-y-3 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-700" />
              <span className="text-sm text-sky-700/70">Total Students</span>
            </div>
            <span className="font-bold text-sky-900">{stats.totalStudents}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-700" />
              <span className="text-sm text-sky-700/70">Active Campuses</span>
            </div>
            <span className="font-bold text-sky-900">{stats.activeCampuses}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCog className="w-4 h-4 text-sky-700" />
              <span className="text-sm text-sky-700/70">Main Leaders</span>
            </div>
            <span className="font-bold text-sky-900">
              {students.filter(s => s.role === 'main-leader').length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-700" />
              <span className="text-sm text-sky-700/70">Evangelists</span>
            </div>
            <span className="font-bold text-sky-900">
              {students.filter(s => s.role === 'evangelism-mobilizer').length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-700" />
              <span className="text-sm text-sky-700/70">Avg. Growth</span>
            </div>
            <span className="font-bold text-sky-900">{stats.avgGrowth}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}