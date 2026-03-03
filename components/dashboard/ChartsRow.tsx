"use client";

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
  Radar
} from 'recharts';
import { Users, MapPin, Award, TrendingUp } from "lucide-react";

// Define types
interface CampusData {
  name: string;
  students: number;
  fellowships: number;
  growth: number;
}

interface RadarData {
  metric: string;
  AAU: number;
  Adama: number;
  BahirDar: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload?: any;
  }>;
  label?: string;
}

const campusData: CampusData[] = [
  { name: "AAU", students: 850, fellowships: 12, growth: 15 },
  { name: "Adama", students: 620, fellowships: 8, growth: 12 },
  { name: "Bahir Dar", students: 540, fellowships: 7, growth: 18 },
  { name: "Mekelle", students: 480, fellowships: 6, growth: 8 },
  { name: "Hawassa", students: 390, fellowships: 5, growth: 22 },
  { name: "Jimma", students: 320, fellowships: 4, growth: 10 }
];

const radarData: RadarData[] = [
  { metric: "Outreach", AAU: 90, Adama: 85, BahirDar: 88 },
  { metric: "Follow-up", AAU: 75, Adama: 70, BahirDar: 82 },
  { metric: "Discipleship", AAU: 85, Adama: 78, BahirDar: 80 },
  { metric: "Training", AAU: 70, Adama: 75, BahirDar: 78 },
  { metric: "Community", AAU: 88, Adama: 82, BahirDar: 85 }
];

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sky-900 text-white p-3 rounded-lg shadow-lg border border-sky-700">
        <p className="text-sm font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-sky-200">
            {entry.name}: {entry.value} {entry.name === "growth" ? "%" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Distributions() {
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
              <span className="text-xs font-medium text-sky-900">Top 6 Campuses</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campusData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 12 }} />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#64748B" 
                tick={{ fill: '#64748B', fontSize: 12 }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="students" 
                radius={[0, 8, 8, 0]}
                barSize={20}
              >
                {campusData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`rgba(12, 74, 110, ${0.6 + (index * 0.07)})`}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Growth indicators */}
        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          {campusData.slice(0, 3).map((campus) => (
            <div key={campus.name} className="text-center">
              <p className="text-xs text-sky-700/70 mb-1">{campus.name}</p>
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3 text-sky-700" />
                <span className="text-sm font-semibold text-sky-900">+{campus.growth}%</span>
              </div>
            </div>
          ))}
        </div>
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
            <h2 className="font-semibold text-sky-900">Performance Metrics</h2>
            <p className="text-xs text-sky-700/70">Multi-campus comparison</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: '#0C4A6E', fontSize: 11 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
              <Radar
                name="AAU"
                dataKey="AAU"
                stroke="#0C4A6E"
                fill="#0C4A6E"
                fillOpacity={0.3}
              />
              <Radar
                name="Adama"
                dataKey="Adama"
                stroke="#0284C7"
                fill="#0284C7"
                fillOpacity={0.3}
              />
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
            <span className="font-bold text-sky-900">3,200</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-700" />
              <span className="text-sm text-sky-700/70">Active Campuses</span>
            </div>
            <span className="font-bold text-sky-900">12</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-700" />
              <span className="text-sm text-sky-700/70">Avg. Growth</span>
            </div>
            <span className="font-bold text-sky-900">14.2%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}