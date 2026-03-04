"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { 
  User, 
  Phone, 
  MapPin, 
  Briefcase,
  CheckCircle,
  Send,
  Church,
  Heart,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function StudentRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    campus: "",
    role: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: "main-leader", label: "Main Leader", icon: Heart },
    { value: "evangelism-mobilizer", label: "Evangelism Mobilizer", icon: Globe },
    { value: "member", label: "General Member", icon: User }
  ];

  const bibleVerses = [
    { verse: "Go therefore and make disciples of all nations", reference: "Matthew 28:19" },
    { verse: "How beautiful are the feet of those who bring good news", reference: "Romans 10:15" },
    { verse: "You will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth", reference: "Acts 1:8" }
  ];

  // Fix: Move Math.random outside of useState initializer
  const getRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * bibleVerses.length);
    return bibleVerses[randomIndex];
  };

  const [currentVerse] = useState(getRandomVerse);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Registration data:", formData);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-900 to-sky-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-sky-900 to-sky-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-sky-900 mb-2 text-center">Registration Successful!</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Thank you for registering, {formData.fullName}!
          </p>
          
          <div className="bg-sky-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-sky-800 font-medium mb-2">Registration Summary:</p>
            <p className="text-sm text-gray-600">📋 Role: {roles.find(r => r.value === formData.role)?.label}</p>
            <p className="text-sm text-gray-600">🏫 Campus: {formData.campus}</p>
          </div>

          {/* Bible Verse */}
          <div className="bg-gradient-to-r from-sky-900 to-sky-700 rounded-xl p-4 text-white mb-6">
            <p className="text-sm italic mb-2">&quot;{currentVerse.verse}&quot;</p>
            <p className="text-xs text-sky-200">— {currentVerse.reference}</p>
          </div>

          <Link
            href="/"
            className="block w-full text-center px-4 py-3 bg-gradient-to-r from-sky-900 to-sky-700 text-white rounded-xl font-medium text-sm"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Mobile-First Layout */}
      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          {/* Logos */}
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-900 to-sky-700 rounded-xl flex items-center justify-center shadow-lg">
              <Church className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-sky-800 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Organizations */}
          <h1 className="text-2xl font-bold text-sky-900 mb-1">
            Eastern Evangelistic Outreach
          </h1>
          <p className="text-lg font-semibold text-sky-700 mb-3">
            Jesus Is All About Life (JAAL)
          </p>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4">
            A centralized outreach data platform for EvaSUE to track, analyze, and grow campus impact.
          </p>

          {/* Bible Verse */}
          <div className="bg-sky-100 rounded-xl p-4 mb-2">
            <p className="text-sm text-sky-900 italic">&quot;{currentVerse.verse}&quot;</p>
            <p className="text-xs text-sky-700 mt-1">— {currentVerse.reference}</p>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-5 border border-sky-100"
        >
          <h2 className="text-xl font-bold text-sky-900 mb-4">Student Registration</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent outline-none transition bg-gray-50/50"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent outline-none transition bg-gray-50/50"
                  placeholder="+251 91 234 5678"
                />
              </div>
            </div>

            {/* Campus - Now a text input instead of dropdown */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Campus <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="campus"
                  value={formData.campus}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Addis Ababa University"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent outline-none transition bg-gray-50/50"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Enter your campus/university name</p>
            </div>

            {/* Role Dropdown with placeholder */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Role in Fellowship <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:border-transparent outline-none transition appearance-none bg-gray-50/50 text-gray-900"
                >
                  <option value="" disabled className="text-gray-400">-- Select your role --</option>
                  {roles.map(role => (
                    <option key={role.value} value={role.value} className="text-sm">{role.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Role Description */}
            {formData.role && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-sky-50 rounded-xl p-3"
              >
                <p className="text-xs text-sky-800">
                  {formData.role === "main-leader" && "Lead and coordinate fellowship activities across campus"}
                  {formData.role === "evangelism-mobilizer" && "Organize outreach events and evangelism programs"}
                  {formData.role === "member" && "Active participant in fellowship and outreach activities"}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-sky-900 to-sky-700 text-white py-3 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Register Now</span>
                </>
              )}
            </motion.button>

            {/* Privacy Note */}
            <p className="text-xs text-center text-gray-400 mt-4">
              By registering, you agree to our{" "}
              <Link href="/terms" className="text-sky-600 hover:underline">Terms</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-sky-600 hover:underline">Privacy Policy</Link>
            </p>
          </form>
        </motion.div>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-400 mt-4">
          Part of EvaSUE&apos;s campus outreach initiative
        </p>
      </div>
    </div>
  );
}