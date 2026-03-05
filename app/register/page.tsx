"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  User,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle,
  Send,
  Church,
  Heart,
  Globe,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function StudentRegister() {
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    campus: "",
    role: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [registeredStudent, setRegisteredStudent] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as 'en' | 'am';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Toggle language function
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'am' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const roles = [
    { value: "main-leader", label: language === 'en' ? "Main Leader" : "ዋና መሪ", icon: Heart },
    { value: "evangelism-mobilizer", label: language === 'en' ? "Evangelism Mobilizer" : "የወንጌል አስተባባሪ", icon: Globe }
  ];

  // Bible verses in both languages
  const bibleVerses = [
    {
      verse: language === 'en' ? "Go therefore and make disciples of all nations" : "እንግዲህ ሂዱና አሕዛብን ሁሉ ደቀ መዛሙርት አድርጉ",
      reference: language === 'en' ? "Matthew 28:19" : "ማቴዎስ 28:19"
    },
    {
      verse: language === 'en' ? "How beautiful are the feet of those who bring good news" : "የሚያስተምሩ እግሮች እንዴት ያማሩ ናቸው",
      reference: language === 'en' ? "Romans 10:15" : "ሮሜ 10:15"
    },
    {
      verse: language === 'en' ? "You will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth" : "ነገር ግን መንፈስ ቅዱስ በእናንተ ላይ በወረደ ጊዜ ኃይልን ትቀበላላችሁ፥ በኢየሩሳሌምም በይሁዳም ሁሉ በሰማርያም እስከ ምድር ዳርም ድረስ ምስክሮቼ ትሆናላችሁ",
      reference: language === 'en' ? "Acts 1:8" : "ሐዋርያት ሥራ 1:8"
    }
  ];

  const [currentVerse, setCurrentVerse] = useState(bibleVerses[0]);

  useEffect(() => {
    setCurrentVerse(bibleVerses[Math.floor(Math.random() * bibleVerses.length)]);
  }, [language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      console.log("Registration successful:", data);
      setRegisteredStudent(data.student);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col justify-center items-center py-10 px-4 sm:px-6">
        {/* Modern High-End Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/40 to-slate-950 opacity-100 z-0" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.15)_0%,transparent_60%)] z-0 pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-slate-900/50 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-sky-900/20 border border-sky-400/20 p-8 sm:p-10 w-full max-w-sm relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200, damping: 20 }}
            className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)] transform rotate-3"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
            {language === 'en' ? "You're All Set!" : "ተመዝግበዋል!"}
          </h2>
          <p className="text-sky-200/80 text-sm font-medium mb-8">
            {language === 'en' ? 'Thank you for stepping up,' : 'እንኳን በደህና ተመዘገቡ,'} <span className="text-sky-300 font-bold">{formData.fullName.split(' ')[0]}</span>
          </p>

          <div className="bg-sky-500/10 rounded-[2rem] p-6 mb-8 text-left border border-sky-400/10 backdrop-blur-md">
            <p className="text-[11px] text-sky-300/60 font-bold mb-5 uppercase tracking-widest text-center">
              {language === 'en' ? 'Registration Details' : 'የምዝገባ ዝርዝሮች'}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 flex items-center justify-center shadow-sm text-sky-400 border border-sky-400/20 group-hover:bg-sky-400/30 transition-colors">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-sky-400/80 uppercase tracking-wider mb-0.5">
                    {language === 'en' ? 'Role' : 'ሚና'}
                  </p>
                  <p className="text-sm font-bold text-white">{roles.find(r => r.value === formData.role)?.label}</p>
                </div>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 flex items-center justify-center shadow-sm text-sky-400 border border-sky-400/20 group-hover:bg-sky-400/30 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-sky-400/80 uppercase tracking-wider mb-0.5">
                    {language === 'en' ? 'Campus' : 'ካምፓስ'}
                  </p>
                  <p className="text-sm font-bold text-white">{formData.campus}</p>
                </div>
              </div>
            </div>
          </div>

          {registeredStudent?.id && (
            <p className="text-[10px] text-sky-400 font-mono mb-4">
              {language === 'en' ? 'Registration ID:' : 'የምዝገባ መለያ:'} {registeredStudent.id.slice(-8)}
            </p>
          )}

          <Link
            href="/"
            className="group relative inline-flex items-center justify-center w-full gap-2 px-6 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-100 to-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">{language === 'en' ? 'Return Home' : 'ወደ መነሻ ተመለስ'}</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center selection:bg-sky-500/30 selection:text-white pb-12">
      {/* Modern High-End Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/40 to-slate-950 opacity-100 z-0" />
      <motion.div
        className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.15)_0%,transparent_60%)] z-0 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Language Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={toggleLanguage}
        className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50 px-4 py-2 bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-xl border border-sky-400/20 hover:border-sky-400/40 rounded-full text-sm font-medium text-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-sky-500/10"
      >
        <span className="text-lg">{language === 'en' ? '🇺🇸' : '🇪🇹'}</span>
        <span className="font-bold tracking-wide">{language === 'en' ? 'አማርኛ' : 'English'}</span>
      </motion.button>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50 pt-safe"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-xl border border-sky-400/20 hover:border-sky-400/40 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-sky-500/10"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-wide hidden sm:block">
            {language === 'en' ? 'Home' : 'መነሻ'}
          </span>
        </Link>
      </motion.div>

      {/* Hero Header Section within Register */}
      <div className="relative w-full z-10 mx-auto mt-20 sm:mt-24 mb-10 text-center px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/10 border border-sky-400/20 rounded-full mb-6">
            <Globe className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">{language === 'en' ? "Join the Mission" : "ተልዕኮውን ይቀላቀሉ"}</span>
          </div>


        </motion.div>
      </div>

      {/* Main Container - Centered Form Only */}
      <div className="relative w-full max-w-md z-10 mx-auto w-full px-4 sm:px-0">
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-2xl border border-sky-400/20 shadow-[0_0_40px_rgba(14,165,233,0.1)] rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-32 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-sky-500/10 transition-colors duration-1000" />

          {/* Daily Verse */}


          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-2xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200 font-medium leading-relaxed">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">

              {/* Full Name */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[12px] font-bold text-sky-200 uppercase tracking-widest ml-1">
                  {language === 'en' ? 'Full Name' : 'ሙሉ ስም'} <span className="text-sky-400">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-500 group-focus-within/input:text-sky-300 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 focus:bg-slate-800/80 border border-sky-400/20 hover:border-sky-400/40 rounded-2xl text-sm font-medium text-white placeholder-sky-200/30 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all shadow-inner"
                    placeholder={language === 'en' ? 'Enter your full name' : 'ሙሉ ስምዎን ያስገቡ'}
                  />
                </div>
              </motion.div>

              {/* Phone Number */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[12px] font-bold text-sky-200 uppercase tracking-widest ml-1">
                  {language === 'en' ? 'Phone Number' : 'ስልክ ቁጥር'} <span className="text-sky-400">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-500 group-focus-within/input:text-sky-300 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 focus:bg-slate-800/80 border border-sky-400/20 hover:border-sky-400/40 rounded-2xl text-sm font-medium text-white placeholder-sky-200/30 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all shadow-inner"
                    placeholder="+251 91 234 5678"
                  />
                </div>
              </motion.div>

              {/* Campus */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[12px] font-bold text-sky-200 uppercase tracking-widest ml-1">
                  {language === 'en' ? 'Campus' : 'ካምፓስ / ግቢ'} <span className="text-sky-400">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-500 group-focus-within/input:text-sky-300 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    required
                    placeholder={language === 'en' ? 'e.g., Addis Ababa University' : 'ለምሳሌ፡ አዲስ አበባ ዩኒቨርሲቲ'}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 focus:bg-slate-800/80 border border-sky-400/20 hover:border-sky-400/40 rounded-2xl text-sm font-medium text-white placeholder-sky-200/30 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all shadow-inner"
                  />
                </div>
              </motion.div>

              {/* Role */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[12px] font-bold text-sky-200 uppercase tracking-widest ml-1">
                  {language === 'en' ? 'Role in Fellowship' : 'በህብረቱ ውስጥ ያለዎት አገልግሎት'} <span className="text-sky-400">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-500 group-focus-within/input:text-sky-300 transition-colors z-10">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className={`w-full pl-12 pr-10 py-4 bg-slate-900/50 focus:bg-slate-800/80 border border-sky-400/20 hover:border-sky-400/40 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all shadow-inner appearance-none cursor-pointer ${formData.role ? 'text-white' : 'text-sky-200/30'}`}
                  >
                    <option value="" disabled className="bg-slate-900 text-sky-200/50">
                      {language === 'en' ? 'Select your role' : 'ሚናዎን ይምረጡ'}
                    </option>
                    {roles.map(role => (
                      <option key={role.value} value={role.value} className="bg-slate-900 text-white py-2">{role.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-sky-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <AnimatePresence>
                  {formData.role && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -5 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -5 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 bg-sky-500/10 border border-sky-400/20 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-[12px] text-sky-200 font-medium leading-relaxed flex items-start gap-2">
                          <span className="text-sky-400 mt-0.5">✨</span>
                          <span>
                            {formData.role === "main-leader" && (language === 'en'
                              ? "Lead and coordinate fellowship activities across campus, guiding other members."
                              : "በካምፓስ ውስጥ የህብረት እንቅስቃሴዎችን መምራት እና ማስተባበር፣ ሌሎች አባላትን መምራት")}
                            {formData.role === "evangelism-mobilizer" && (language === 'en'
                              ? "Organize outreach events, mobilize students, and spread the good news."
                              : "የአገልግሎት ዝግጅቶችን ማደራጀት፣ ተማሪዎችን ማሰባሰብ እና መልካሙን ወንጌል ማሰራጨት")}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                className="w-full relative group overflow-hidden bg-white text-slate-950 py-4 rounded-2xl font-black text-[15px] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-100 to-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-[2.5px] border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                    <span className="relative z-10">{language === 'en' ? 'Registering...' : 'በመመዝገብ ላይ...'}</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 tracking-wide uppercase">{language === 'en' ? 'Complete Registration' : 'ምዝገባን ያጠናቅቁ'}</span>
                    <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Privacy Note */}
              <p className="text-[11px] text-center text-sky-200/40 font-medium mt-6 leading-relaxed max-w-[250px] mx-auto">
                {language === 'en' ? 'By registering, you agree to our' : 'በመመዝገብዎ፣ የኛን'}{" "}
                <Link href="/terms" className="text-sky-400 hover:text-sky-300 transition-colors underline decoration-sky-400/30 underline-offset-2">
                  {language === 'en' ? 'Terms' : 'ውሎች'}
                </Link>
                {" "}{language === 'en' ? 'and' : 'እና'}{" "}
                <Link href="/privacy" className="text-sky-400 hover:text-sky-300 transition-colors underline decoration-sky-400/30 underline-offset-2">
                  {language === 'en' ? 'Privacy Policy' : 'የግላዊነት ፖሊሲ'}
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}