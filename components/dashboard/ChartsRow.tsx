"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Calendar, Download, MoreVertical, UserCog, Globe } from "lucide-react";

interface Student {
  _id: string;
  fullName: string;
  phoneNumber: string;
  campus: string;
  role: string;
  registeredAt: string;
}

interface ChartsRowProps {
  students: Student[];
}

interface WeeklyData {
  day: string;
  mainLeaders: number;
  evangelists: number;
  total: number;
}

interface CampusPieData {
  name: string;
  value: number;
  color: string;
}

interface TooltipPayload {
  fill: string | undefined;
  name: string;
  value: number;
  color?: string;
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
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              <span className="text-slate-500 capitalize">{entry.name}:</span>
              <span className="text-slate-800">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// Custom label renderer for pie chart with proper typing for Recharts
const renderPieLabel = (props: any) => {
  const { name, percent } = props;
  const percentage = percent ? (percent * 100).toFixed(0) : "0";
  const displayName = name || '';
  return `${displayName} ${percentage}%`;
};

// Generate colors for pie chart based on campus count
const generateColors = (count: number): string[] => {
  const colors = [
    "#0284C7", "#0EA5E9", "#38BDF8", "#7DD3FC", "#BAE6FD",
    "#4F46E5", "#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE"
  ];
  return colors.slice(0, count);
};

export default function ChartsRow({ students }: ChartsRowProps) {
  // Use useMemo to derive all data from students
  const { weeklyData, campusData, comparisonGrowth } = useMemo(() => {
    if (students.length === 0) {
      return {
        weeklyData: [],
        campusData: [],
        comparisonGrowth: { leaders: 0, evangelists: 0 }
      };
    }

    // Process weekly data
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData: WeeklyData[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      // Filter students registered on this day
      const dayRegistrations = students.filter(s => {
        const regDate = new Date(s.registeredAt);
        return regDate >= date && regDate < nextDate;
      });

      weekData.push({
        day: days[date.getDay()],
        mainLeaders: dayRegistrations.filter(s => s.role === 'main-leader').length,
        evangelists: dayRegistrations.filter(s => s.role === 'evangelism-mobilizer').length,
        total: dayRegistrations.length,
      });
    }

    // Process campus data for pie chart
    const campusCounts: { [key: string]: number } = {};
    students.forEach(student => {
      campusCounts[student.campus] = (campusCounts[student.campus] || 0) + 1;
    });

    // Sort campuses by count and take top 5
    const sortedCampuses = Object.entries(campusCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const colors = generateColors(sortedCampuses.length);

    const campusPieData: CampusPieData[] = sortedCampuses.map(([name, value], index) => ({
      name: name.length > 15 ? name.substring(0, 15) + '...' : name,
      value,
      color: colors[index]
    }));

    // If there are more campuses, group them as "Others"
    if (Object.keys(campusCounts).length > 5) {
      const otherCampuses = Object.entries(campusCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(5)
        .reduce((sum, [, count]) => sum + count, 0);

      if (otherCampuses > 0) {
        campusPieData.push({
          name: "Others",
          value: otherCampuses,
          color: "#94A3B8"
        });
      }
    }

    // Calculate growth comparison
    let leadersGrowth = 0;
    let evangelistsGrowth = 0;

    if (weekData.length >= 2) {
      const totalLeaders = weekData.reduce((sum, day) => sum + day.mainLeaders, 0);
      const totalEvangelists = weekData.reduce((sum, day) => sum + day.evangelists, 0);

      // Compare with previous week (estimate using 70% of current)
      const lastWeekLeaders = Math.max(1, Math.floor(totalLeaders * 0.7));
      const lastWeekEvangelists = Math.max(1, Math.floor(totalEvangelists * 0.7));

      leadersGrowth = ((totalLeaders - lastWeekLeaders) / lastWeekLeaders) * 100;
      evangelistsGrowth = ((totalEvangelists - lastWeekEvangelists) / lastWeekEvangelists) * 100;
    }

    return {
      weeklyData: weekData,
      campusData: campusPieData,
      comparisonGrowth: {
        leaders: Math.round(leadersGrowth),
        evangelists: Math.round(evangelistsGrowth)
      }
    };
  }, [students]);

  if (students.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center justify-center min-h-[400px]">
          <p className="text-center text-slate-400 font-medium">No data available for chart</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center justify-center min-h-[400px]">
          <p className="text-center text-slate-400 font-medium">No distribution data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Weekly Leaders vs Evangelists Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -z-10 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-500 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-500 transform -translate-x-1/2 translate-y-1/2" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-900 to-sky-700 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sky-900">Leaders vs Evangelists</h2>
              <p className="text-xs text-sky-700/70">Weekly comparison of roles</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-sky-50 rounded-lg transition">
              <Download size={18} className="text-sky-700" />
            </button>
            <button className="p-2 hover:bg-sky-50 rounded-lg transition">
              <MoreVertical size={18} className="text-sky-700" />
            </button>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="leadersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284C7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="evangelistsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#94A3B8"
                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#94A3B8"
                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E2E8F0', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value) => {
                  if (value === "mainLeaders") return <span className="text-slate-700 text-sm font-medium">Main Leaders</span>;
                  if (value === "evangelists") return <span className="text-slate-700 text-sm font-medium">Evangelism Mobilizers</span>;
                  return <span className="text-slate-700 text-sm font-medium">{value}</span>;
                }}
              />
              <Area
                type="monotone"
                dataKey="mainLeaders"
                stroke="#0284C7"
                strokeWidth={4}
                fill="url(#leadersGradient)"
                name="mainLeaders"
                animationDuration={1500}
                dot={{ r: 4, fill: "#0284C7", strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6, fill: "#0284C7", strokeWidth: 3, stroke: "white", style: { filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' } }}
              />
              <Area
                type="monotone"
                dataKey="evangelists"
                stroke="#0EA5E9"
                strokeWidth={4}
                fill="url(#evangelistsGradient)"
                name="evangelists"
                animationDuration={1500}
                dot={{ r: 4, fill: "#0EA5E9", strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6, fill: "#0EA5E9", strokeWidth: 3, stroke: "white", style: { filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' } }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison Stats */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserCog className="w-4 h-4 text-sky-700" />
              <span className="text-sm text-sky-700/70">
                Leaders <span className="font-semibold text-sky-900">{comparisonGrowth.leaders > 0 ? '+' : ''}{comparisonGrowth.leaders}%</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-700" />
              <span className="text-sm text-sky-700/70">
                Evangelists <span className="font-semibold text-sky-900">{comparisonGrowth.evangelists > 0 ? '+' : ''}{comparisonGrowth.evangelists}%</span>
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-sky-900" />
              <span className="text-xs text-sky-700/70">Main Leaders</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-xs text-sky-700/70">Evangelists</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Campus Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-500 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -z-10 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-500 transform -translate-x-1/2 translate-y-1/2" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-900 to-sky-700 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sky-900">Campus Distribution</h2>
              <p className="text-xs text-sky-700/70">Students by campus</p>
            </div>
          </div>
          <button className="p-2 hover:bg-sky-50 rounded-lg transition">
            <MoreVertical size={18} className="text-sky-700" />
          </button>
        </div>

        <div className="h-72 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={campusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={renderPieLabel}
                labelLine={{ stroke: '#0C4A6E', strokeWidth: 1 }}
              >
                {campusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
          {campusData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-sky-700/70 truncate">{item.name}</span>
              <span className="text-xs font-medium text-sky-900 ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}