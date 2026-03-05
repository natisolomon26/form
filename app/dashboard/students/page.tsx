"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  User,
  MapPin,
  Phone,
  Calendar,
  ChevronDown,
  Download,
  RefreshCw,
  Users,
  GraduationCap,
  UserCog,
  Eye,
  MoreVertical,
  Mail,
  CheckCircle,
  XCircle
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface Student {
  _id: string;
  fullName: string;
  phoneNumber: string;
  campus: string;
  role: string;
  registeredAt: string;
}

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [campusFilter, setCampusFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    // Apply filters locally for better performance
    let filtered = students;

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(s =>
        s.fullName.toLowerCase().includes(searchLower) ||
        s.campus.toLowerCase().includes(searchLower) ||
        s.phoneNumber.includes(search)
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(s => s.role === roleFilter);
    }

    if (campusFilter) {
      const campusLower = campusFilter.toLowerCase();
      filtered = filtered.filter(s =>
        s.campus.toLowerCase().includes(campusLower)
      );
    }

    setFilteredStudents(filtered);
  }, [search, roleFilter, campusFilter, students]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/register');
      const data = await response.json();
      setStudents(data.students || []);
      setFilteredStudents(data.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'main-leader': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'evangelism-mobilizer': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'main-leader': return UserCog;
      case 'evangelism-mobilizer': return Users;
      default: return User;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'main-leader': return 'Main Leader';
      case 'evangelism-mobilizer': return 'Evangelism Mobilizer';
    }
  };

  const stats = {
    total: students.length,
    mainLeaders: students.filter(s => s.role === 'main-leader').length,
    evangelists: students.filter(s => s.role === 'evangelism-mobilizer').length,
    campuses: new Set(students.map(s => s.campus)).size
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Phone Number', 'Campus', 'Role', 'Registered Date'];
    const csvData = filteredStudents.map(s => [
      s.fullName,
      s.phoneNumber,
      s.campus,
      getRoleLabel(s.role),
      new Date(s.registeredAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

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
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">Student Registrations</h1>
              <p className="text-sm font-medium text-slate-500 mt-0.5">Manage and view all registered students</p>
            </div>

            <div className="flex items-center gap-3.5">
              <button
                onClick={fetchStudents}
                className="p-2.5 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 rounded-xl transition-all text-slate-600 hover:text-indigo-600"
                title="Refresh"
              >
                <RefreshCw size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={exportToCSV}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 font-medium text-sm"
              >
                <Download size={18} strokeWidth={2.5} />
                Export CSV
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-6">
          {/* Stats Cards */}
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-sky-100 rounded-full blur-[20px] opacity-60 group-hover:bg-sky-200 transition-colors duration-500" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Students</p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_4px_12px_rgba(56,189,248,0.3)] rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-100 rounded-full blur-[20px] opacity-60 group-hover:bg-purple-200 transition-colors duration-500" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Main Leaders</p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-1">{stats.mainLeaders}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_4px_12px_rgba(168,85,247,0.3)] rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <UserCog className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-100 rounded-full blur-[20px] opacity-60 group-hover:bg-emerald-200 transition-colors duration-500" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Evangelists</p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-1">{stats.evangelists}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_4px_12px_rgba(52,211,153,0.3)] rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-100 rounded-full blur-[20px] opacity-60 group-hover:bg-amber-200 transition-colors duration-500" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Campuses</p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-1">{stats.campuses}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_4px_12px_rgba(251,191,36,0.3)] rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 mb-8 border border-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              {/* Role Filter */}
              <div className="relative group">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10 group-focus-within:text-indigo-500 transition-colors" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 appearance-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all cursor-pointer"
                >
                  <option value="">All Roles</option>
                  <option value="main-leader">Main Leader</option>
                  <option value="evangelism-mobilizer">Evangelism Mobilizer</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Campus Filter */}
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Filter by campus..."
                  value={campusFilter}
                  onChange={(e) => setCampusFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-end px-3">
                <div className="bg-slate-100/50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-500 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  Showing <span className="font-bold text-slate-800">{filteredStudents.length}</span> / {students.length}
                </div>
              </div>
            </div>
          </div>

          {/* Students Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden p-2">
              <div className="overflow-x-auto rounded-3xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 backdrop-blur-sm sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Student</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Contact</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Campus</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Role</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Registered</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-24 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                              <Users className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-700 font-bold text-lg">No registrations found</p>
                            <p className="text-sm font-medium text-slate-400 text-balance max-w-sm">We couldn't find any students matching your current filter criteria. Try adjusting your search or filters.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student, index) => {
                        const RoleIcon = getRoleIcon(student.role);
                        return (
                          <motion.tr
                            key={student._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02, ease: "easeOut" }}
                            className="hover:bg-slate-50/80 transition-colors group cursor-default"
                          >
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 rounded-xl flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                  <User className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-sm font-bold text-slate-800">{student.fullName}</p>
                                  <p className="text-xs font-medium text-slate-400 mt-0.5 tracking-wide">ID: <span className="text-slate-500">{student._id.slice(-8)}</span></p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-700">{student.phoneNumber}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center">
                                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{student.campus}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className={`px-3 py-1.5 text-xs font-bold tracking-wide rounded-full border shadow-sm ${getRoleBadgeColor(student.role)}`}>
                                  <div className="flex items-center gap-1.5">
                                    <RoleIcon className="w-3.5 h-3.5" />
                                    {getRoleLabel(student.role)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(student.registeredAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-2 outline-none">
                                <button
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setShowDetailsModal(true);
                                  }}
                                  className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                  title="View Details"
                                >
                                  <Eye size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Student Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-white max-w-md w-full p-8 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 bg-opacity-70 transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Student Profile</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors group"
                >
                  <XCircle className="w-5 h-5 text-slate-400 group-hover:text-slate-600" strokeWidth={2.5} />
                </button>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/50">
                  <div className="w-16 h-16 bg-white shadow-sm border border-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                    <User className="w-8 h-8 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-800 tracking-tight">{selectedStudent.fullName}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">ID: <span className="text-indigo-600">{selectedStudent._id.slice(-8)}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 hover:bg-slate-50 transition-colors">
                    <p className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Phone</p>
                    <p className="text-sm font-semibold text-slate-800">{selectedStudent.phoneNumber}</p>
                  </div>
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 hover:bg-slate-50 transition-colors">
                    <p className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Campus</p>
                    <p className="text-sm font-semibold text-slate-800">{selectedStudent.campus}</p>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 hover:bg-slate-50 transition-colors">
                  <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Assigned Role</p>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1.5 text-xs font-bold tracking-wide rounded-full border shadow-sm ${getRoleBadgeColor(selectedStudent.role)}`}>
                      {getRoleLabel(selectedStudent.role)}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 hover:bg-slate-50 transition-colors">
                  <p className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Registration Date</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {new Date(selectedStudent.registeredAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}