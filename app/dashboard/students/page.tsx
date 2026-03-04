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
    switch(role) {
      case 'main-leader': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'evangelism-mobilizer': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'main-leader': return UserCog;
      case 'evangelism-mobilizer': return Users;
      default: return User;
    }
  };

  const getRoleLabel = (role: string) => {
    switch(role) {
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
    <div className="flex h-screen bg-gradient-to-br from-sky-50 to-white">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-sky-100 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-sky-900">Student Registrations</h1>
              <p className="text-sm text-sky-700/70">Manage and view all registered students</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchStudents}
                className="p-2 hover:bg-sky-50 rounded-lg transition text-sky-700"
                title="Refresh"
              >
                <RefreshCw size={20} />
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-gradient-to-r from-sky-900 to-sky-700 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2 text-sm"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-sky-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-sky-600 font-medium">Total Students</p>
                  <p className="text-2xl font-bold text-sky-900 mt-1">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-sky-700" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-purple-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-600 font-medium">Main Leaders</p>
                  <p className="text-2xl font-bold text-purple-900 mt-1">{stats.mainLeaders}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserCog className="w-5 h-5 text-purple-700" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-green-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-medium">Evangelism Mobilizers</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">{stats.evangelists}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-700" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-amber-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-600 font-medium">Campuses</p>
                  <p className="text-2xl font-bold text-amber-900 mt-1">{stats.campuses}</p>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-amber-700" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-sky-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, campus..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-sky-100 rounded-lg text-sm focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-white/60 focus:bg-white transition"
                />
              </div>

              {/* Role Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-4 h-4 z-10" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-sky-100 rounded-lg text-sm appearance-none bg-white/60 focus:bg-white focus:ring-2 focus:ring-sky-600 focus:border-transparent transition cursor-pointer"
                >
                  <option value="">All Roles</option>
                  <option value="main-leader">Main Leader</option>
                  <option value="evangelism-mobilizer">Evangelism Mobilizer</option>
                  <option value="member">Member</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Campus Filter */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Filter by campus..."
                  value={campusFilter}
                  onChange={(e) => setCampusFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-sky-100 rounded-lg text-sm focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-white/60 focus:bg-white transition"
                />
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-end px-3">
                <p className="text-sm text-sky-700">
                  Showing <span className="font-semibold text-sky-900">{filteredStudents.length}</span> of{" "}
                  <span className="font-semibold text-sky-900">{students.length}</span> students
                </p>
              </div>
            </div>
          </div>

          {/* Students Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-sky-900 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-sky-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-sky-50 to-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-sky-900 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-sky-900 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-sky-900 uppercase tracking-wider">Campus</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-sky-900 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-sky-900 uppercase tracking-wider">Registered</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-sky-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-50">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <Users className="w-12 h-12 text-sky-300" />
                            <p className="text-sky-900 font-medium">No registrations found</p>
                            <p className="text-sm text-sky-500">Try adjusting your filters</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student, index) => {
                        const RoleIcon = getRoleIcon(student.role);
                        return (
                          <motion.tr
                            key={student._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="hover:bg-sky-50/50 transition group"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-sky-100 to-sky-50 rounded-lg flex items-center justify-center">
                                  <User className="w-4 h-4 text-sky-700" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-sky-900">{student.fullName}</p>
                                  <p className="text-xs text-sky-500">ID: {student._id.slice(-8)}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="text-sm text-sky-700">{student.phoneNumber}</span>
                                <span className="text-xs text-sky-400">Available on WhatsApp</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-sky-400" />
                                <span className="text-sm text-sky-700">{student.campus}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className={`px-3 py-1 text-xs font-medium rounded-full border ${getRoleBadgeColor(student.role)}`}>
                                  <div className="flex items-center gap-1.5">
                                    <RoleIcon className="w-3 h-3" />
                                    {getRoleLabel(student.role)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-sky-400" />
                                <span className="text-sm text-sky-700">
                                  {new Date(student.registeredAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setShowDetailsModal(true);
                                  }}
                                  className="p-1.5 hover:bg-sky-100 rounded-lg transition text-sky-600"
                                >
                                  <Eye size={18} />
                                </button>
                                <button className="p-1.5 hover:bg-sky-100 rounded-lg transition text-sky-600">
                                  <Mail size={18} />
                                </button>
                                <button className="p-1.5 hover:bg-sky-100 rounded-lg transition text-sky-600">
                                  <MoreVertical size={18} />
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-sky-900">Student Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-1 hover:bg-sky-50 rounded-lg transition"
                >
                  <XCircle className="w-5 h-5 text-sky-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-sky-50 to-white rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-900 to-sky-700 rounded-xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-sky-900">{selectedStudent.fullName}</p>
                    <p className="text-sm text-sky-600">ID: {selectedStudent._id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-sky-50 rounded-xl p-3">
                    <p className="text-xs text-sky-500 mb-1">Phone</p>
                    <p className="text-sm font-semibold text-sky-900">{selectedStudent.phoneNumber}</p>
                  </div>
                  <div className="bg-sky-50 rounded-xl p-3">
                    <p className="text-xs text-sky-500 mb-1">Campus</p>
                    <p className="text-sm font-semibold text-sky-900">{selectedStudent.campus}</p>
                  </div>
                </div>

                <div className="bg-sky-50 rounded-xl p-3">
                  <p className="text-xs text-sky-500 mb-1">Role</p>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 text-xs font-medium rounded-full border ${getRoleBadgeColor(selectedStudent.role)}`}>
                      {getRoleLabel(selectedStudent.role)}
                    </div>
                  </div>
                </div>

                <div className="bg-sky-50 rounded-xl p-3">
                  <p className="text-xs text-sky-500 mb-1">Registered On</p>
                  <p className="text-sm font-semibold text-sky-900">
                    {new Date(selectedStudent.registeredAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-900 to-sky-700 text-white rounded-xl font-medium text-sm hover:shadow-lg transition">
                    Send Message
                  </button>
                  <button className="flex-1 px-4 py-2 border border-sky-200 text-sky-700 rounded-xl font-medium text-sm hover:bg-sky-50 transition">
                    Export Data
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}