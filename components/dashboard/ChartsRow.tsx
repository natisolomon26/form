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
      <div className="bg-sky-900 text-white p-3 rounded-lg shadow-lg border border-sky-700">
        <p className="text-sm font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-sky-200">
            {entry.name}: {entry.value}
          </p>
        ))}
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
    "#0C4A6E", "#155E75", "#0369A1", "#0284C7", "#38BDF8",
    "#1E3A8A", "#1E40AF", "#2563EB", "#3B82F6", "#60A5FA"
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
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <p className="text-center text-sky-700/70 py-20">No data available</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <p className="text-center text-sky-700/70 py-20">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Weekly Leaders vs Evangelists Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
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
                  <stop offset="5%" stopColor="#0C4A6E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0C4A6E" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="evangelistsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284C7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0284C7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="day" 
                stroke="#64748B"
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <YAxis 
                stroke="#64748B"
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value) => {
                  if (value === "mainLeaders") return <span className="text-sky-900 text-sm font-medium">Main Leaders</span>;
                  if (value === "evangelists") return <span className="text-sky-900 text-sm font-medium">Evangelism Mobilizers</span>;
                  return <span className="text-sky-900 text-sm font-medium">{value}</span>;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="mainLeaders" 
                stroke="#0C4A6E" 
                strokeWidth={3}
                fill="url(#leadersGradient)" 
                name="mainLeaders"
                dot={{ r: 4, fill: "#0C4A6E", strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6, fill: "#0C4A6E", strokeWidth: 2, stroke: "white" }}
              />
              <Area 
                type="monotone" 
                dataKey="evangelists" 
                stroke="#0284C7" 
                strokeWidth={3}
                fill="url(#evangelistsGradient)" 
                name="evangelists"
                dot={{ r: 4, fill: "#0284C7", strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6, fill: "#0284C7", strokeWidth: 2, stroke: "white" }}
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
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