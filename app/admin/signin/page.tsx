"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Redirect to dashboard on success
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-sky-50 to-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-900 to-sky-700 rounded-2xl mb-4 shadow-lg mx-auto"
            >
              <span className="text-white font-bold text-2xl">⛪</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-sky-900 mb-2">Welcome Back</h1>
            <p className="text-sky-700/70">Sign in to access your admin dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 group-focus-within:text-sky-600 transition-colors w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/60 focus:bg-white border border-sky-100/80 hover:border-sky-200 rounded-xl text-sm font-medium text-sky-950 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                  placeholder="admin@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-1.5">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 group-focus-within:text-sky-600 transition-colors w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/60 focus:bg-white border border-sky-100/80 hover:border-sky-200 rounded-xl text-sm font-medium text-sky-950 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400 hover:text-sky-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-sky-300 text-sky-600 focus:ring-sky-500 focus:ring-offset-0 transition" 
                />
                <span className="text-sm text-sky-700 group-hover:text-sky-900 transition">Remember me</span>
              </label>
              <Link 
                href="/admin/forgot-password" 
                className="text-sm text-sky-600 hover:text-sky-700 font-medium transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-900 to-sky-700 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            {/* Register Link */}
            <p className="text-center text-sky-700/70 text-sm">
              Don't have an account?{" "}
              <Link href="/admin/signup" className="text-sky-600 hover:text-sky-700 font-semibold transition">
                Register here
              </Link>
            </p>
          </form>

          {/* Footer */}
          <p className="text-xs text-sky-900/40 text-center mt-8">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-sky-600 hover:text-sky-800 transition underline decoration-sky-600/30 underline-offset-2">Terms</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-sky-600 hover:text-sky-800 transition underline decoration-sky-600/30 underline-offset-2">Privacy Policy</Link>
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20"
          >
            <span className="text-4xl">⛪</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Admin Dashboard
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-white/80 mb-8"
          >
            Manage and monitor campus outreach data with powerful analytics and insights
          </motion.p>
          
          {/* Feature List */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 text-left bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            {[
              "Track outreach metrics across all campuses",
              "Manage user access and permissions",
              "Generate detailed impact reports",
              "Real-time data visualization"
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-sky-400 rounded-full" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}