"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt", { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-900 to-sky-700 rounded-2xl mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">⛪</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your admin dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent outline-none transition"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link 
                href="/admin/forgot-password" 
                className="text-sm text-sky-600 hover:text-sky-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-sky-900 to-sky-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/admin/signup" className="text-sky-600 hover:text-sky-700 font-semibold">
                Register here
              </Link>
            </p>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-8">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-sky-600">Terms</Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-sky-600">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image with Dark Sky Gradient */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/back5.JPG')"
          }}
        />
        {/* Dark Sky Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/95 via-sky-800/95 to-sky-900/95" />
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-full flex flex-col items-center justify-center text-white p-12 text-center"
        >
          <div className="max-w-lg">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
              <span className="text-4xl">⛪</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Admin Dashboard</h2>
            <p className="text-xl text-white/80 mb-8">
              Manage and monitor campus outreach data with powerful analytics and insights
            </p>
            
            {/* Feature List */}
            <div className="space-y-4 text-left bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sky-400 rounded-full" />
                <span>Track outreach metrics across all campuses</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sky-400 rounded-full" />
                <span>Manage user access and permissions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sky-400 rounded-full" />
                <span>Generate detailed impact reports</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sky-400 rounded-full" />
                <span>Real-time data visualization</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}