"use client";

import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
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
import { TrendingUp, Calendar, Download, MoreVertical } from "lucide-react";

const weeklyData = [
  { day: "Mon", outreach: 120, followups: 80, impact: 200 },
  { day: "Tue", outreach: 145, followups: 95, impact: 240 },
  { day: "Wed", outreach: 180, followups: 120, impact: 300 },
  { day: "Thu", outreach: 165, followups: 110, impact: 275 },
  { day: "Fri", outreach: 200, followups: 140, impact: 340 },
  { day: "Sat", outreach: 240, followups: 170, impact: 410 },
  { day: "Sun", outreach: 190, followups: 130, impact: 320 }
];

const campusPieData = [
  { name: "AAU", value: 850, color: "#0C4A6E" },
  { name: "Adama", value: 620, color: "#155E75" },
  { name: "Bahir Dar", value: 540, color: "#0369A1" },
  { name: "Mekelle", value: 480, color: "#0284C7" },
  { name: "Others", value: 390, color: "#38BDF8" }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sky-900 text-white p-3 rounded-lg shadow-lg border border-sky-700">
        <p className="text-sm font-semibold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-sky-200">
            {entry.name}: {entry.value} students
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartsRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Weekly Outreach Chart */}
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
              <h2 className="font-semibold text-sky-900">Weekly Outreach</h2>
              <p className="text-xs text-sky-700/70">Last 7 days activity</p>
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
                <linearGradient id="outreachGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0C4A6E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0C4A6E" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
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
                formatter={(value) => <span className="text-sky-900 text-sm font-medium">{value}</span>}
              />
              <Area 
                type="monotone" 
                dataKey="impact" 
                stroke="#0C4A6E" 
                strokeWidth={3}
                fill="url(#impactGradient)" 
                name="Total Impact"
                dot={{ r: 4, fill: "#0C4A6E", strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6, fill: "#0C4A6E", strokeWidth: 2, stroke: "white" }}
              />
              <Area 
                type="monotone" 
                dataKey="outreach" 
                stroke="#0284C7" 
                strokeWidth={2}
                fill="url(#outreachGradient)" 
                name="Outreach"
                dot={{ r: 3, fill: "#0284C7", strokeWidth: 2, stroke: "white" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Summary */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-sky-700" />
            <span className="text-sm text-sky-700/70">+24% growth this week</span>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-sky-900" />
              <span className="text-xs text-sky-700/70">Impact</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-xs text-sky-700/70">Outreach</span>
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
              <p className="text-xs text-sky-700/70">Student engagement by campus</p>
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
                data={campusPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#0C4A6E', strokeWidth: 1 }}
              >
                {campusPieData.map((entry, index) => (
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
          {campusPieData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-sky-700/70">{item.name}</span>
              <span className="text-xs font-medium text-sky-900 ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}