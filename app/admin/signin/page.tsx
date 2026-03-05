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
    <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">
      {/* Ambient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[40%] w-[30%] h-[30%] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-white/70 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-white"
        >
          {/* Header */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Sign in to access your admin dashboard</p>
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
              <label className="block text-sm font-bold tracking-wide text-slate-700 mb-2 uppercase">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-sky-700 transition-colors w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-900/10 focus:border-sky-700 transition-all"
                  placeholder="admin@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold tracking-wide text-slate-700 mb-2 uppercase">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-sky-700 transition-colors w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-900/10 focus:border-sky-700 transition-all"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-sky-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-gradient-to-r from-sky-900 to-sky-700 text-white py-4 rounded-2xl font-bold shadow-[0_8px_20px_rgba(12,74,110,0.3)] hover:shadow-[0_12px_25px_rgba(12,74,110,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span className="text-base tracking-wide uppercase">Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Right Side - Image with Dark Sky Gradient */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden m-4 rounded-[3rem]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[20s] ease-out"
          style={{
            backgroundImage: "url('/images/back5.JPG')"
          }}
        />
        {/* Deep Dark Sky Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/95 via-slate-900/90 to-sky-900/95 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-full flex flex-col items-center justify-center text-white p-12 text-center"
        >


          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-4xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
          >
            Easter EvangelisticOutreach
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-white/70 mb-10 max-w-sm font-medium leading-relaxed"
          >
            EvaSUE and African Evangelistic Enterprise (AEE-Ethiopia) are teaming up for the "Jesus is All About Life" (JAAL)
          </motion.p>

          {/* Feature List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 text-left bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl"
          >
            {[
              "Track outreach metrics across all campuses",
              "Generate detailed impact reports",
              "Real-time data visualization"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-sky-600 to-sky-800 shadow-lg shadow-sky-900/30 shrink-0">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <span className="font-medium text-white/90">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}