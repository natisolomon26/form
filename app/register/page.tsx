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
      <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden flex flex-col justify-center items-center py-10 px-4 sm:px-6">
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-200/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-white p-8 sm:p-10 w-full max-w-sm relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200, damping: 20 }}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20 transform rotate-3"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-950 mb-2 tracking-tight">
            {language === 'en' ? "You're All Set!" : "ተመዝግበዋል!"}
          </h2>
          <p className="text-sky-700/80 text-sm font-medium mb-8">
            {language === 'en' ? 'Thank you for stepping up,' : 'እንኳን በደህና ተመዘገቡ,'} <span className="text-sky-900 font-bold">{formData.fullName.split(' ')[0]}</span>
          </p>

          <div className="bg-sky-50/80 rounded-[2rem] p-6 mb-8 text-left border border-sky-100/50">
            <p className="text-[11px] text-sky-900/50 font-bold mb-5 uppercase tracking-widest text-center">
              {language === 'en' ? 'Registration Details' : 'የምዝገባ ዝርዝሮች'}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm text-sky-600 border border-sky-50">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-sky-500 uppercase tracking-wider mb-0.5">
                    {language === 'en' ? 'Role' : 'ሚና'}
                  </p>
                  <p className="text-sm font-bold text-sky-950">{roles.find(r => r.value === formData.role)?.label}</p>
                </div>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-200/50 to-transparent" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm text-sky-600 border border-sky-50">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-sky-500 uppercase tracking-wider mb-0.5">
                    {language === 'en' ? 'Campus' : 'ካምፓስ'}
                  </p>
                  <p className="text-sm font-bold text-sky-950">{formData.campus}</p>
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
            className="group relative inline-flex items-center justify-center w-full gap-2 px-6 py-4 bg-gradient-to-r from-sky-900 to-sky-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-sky-900/20 hover:shadow-sky-900/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">{language === 'en' ? 'Return Home' : 'ወደ መነሻ ተመለስ'}</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden px-4 py-8 sm:py-12 flex flex-col items-center selection:bg-sky-200 selection:text-sky-900">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-70" />
      <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] bg-sky-300/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60" />

      {/* Language Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={toggleLanguage}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 px-3 py-1.5 bg-white/40 hover:bg-white/80 backdrop-blur-xl border border-white/50 hover:border-sky-200 rounded-full text-sm font-medium text-sky-900 transition-all duration-300 flex items-center gap-2"
      >
        <span className="text-lg">{language === 'en' ? '🇺🇸' : '🇪🇹'}</span>
        <span>{language === 'en' ? 'አማርኛ' : 'English'}</span>
      </motion.button>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50 pt-safe"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/40 hover:bg-white/80 backdrop-blur-xl border border-white/50 hover:border-sky-200 shadow-sm hover:shadow-md rounded-full transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-sky-800 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold text-sky-900 hidden sm:block">
            {language === 'en' ? 'Home' : 'መነሻ'}
          </span>
        </Link>
      </motion.div>

      {/* Main Container - Centered Form Only */}
      <div className="relative w-full max-w-md z-10 mx-auto mt-16 sm:mt-20">
        {/* Header Section */}

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] p-5 sm:p-8"
        >
          {/* Daily Verse */}
          

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-3 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">

              {/* Full Name */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-[13px] font-bold text-sky-950 ml-1">
                  {language === 'en' ? 'Full Name' : 'ሙሉ ስም'} <span className="text-red-400">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-400 group-focus-within/input:text-sky-600 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-white/60 focus:bg-white border border-sky-100/80 hover:border-sky-200 rounded-2xl text-sm font-medium text-sky-950 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                    placeholder={language === 'en' ? 'Enter your full name' : 'ሙሉ ስምዎን ያስገቡ'}
                  />
                </div>
              </motion.div>

              {/* Phone Number */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-[13px] font-bold text-sky-950 ml-1">
                  {language === 'en' ? 'Phone Number' : 'ስልክ ቁጥር'} <span className="text-red-400">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-400 group-focus-within/input:text-sky-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-white/60 focus:bg-white border border-sky-100/80 hover:border-sky-200 rounded-2xl text-sm font-medium text-sky-950 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                    placeholder="+251 91 234 5678"
                  />
                </div>
              </motion.div>

              {/* Campus */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-[13px] font-bold text-sky-950 ml-1">
                  {language === 'en' ? 'Campus' : 'ካምፓስ / ግቢ'} <span className="text-red-400">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-400 group-focus-within/input:text-sky-600 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    required
                    placeholder={language === 'en' ? 'e.g., Addis Ababa University' : 'ለምሳሌ፡ አዲስ አበባ ዩኒቨርሲቲ'}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/60 focus:bg-white border border-sky-100/80 hover:border-sky-200 rounded-2xl text-sm font-medium text-sky-950 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                  />
                </div>
              </motion.div>

              {/* Role */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-[13px] font-bold text-sky-950 ml-1">
                  {language === 'en' ? 'Role in Fellowship' : 'በህብረቱ ውስጥ ያለዎት አገልግሎት'} <span className="text-red-400">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sky-400 group-focus-within/input:text-sky-600 transition-colors z-10">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-10 py-3.5 bg-white/60 focus:bg-white border border-sky-100/80 hover:border-sky-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm appearance-none cursor-pointer ${formData.role ? 'text-sky-950' : 'text-sky-300'}`}
                  >
                    <option value="" disabled>
                      {language === 'en' ? 'Select your role' : 'ሚናዎን ይምረጡ'}
                    </option>
                    {roles.map(role => (
                      <option key={role.value} value={role.value} className="text-sky-950">{role.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-sky-400">
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
                      <div className="mt-3 bg-gradient-to-r from-sky-50/80 to-white border border-sky-100/50 rounded-2xl p-3.5">
                        <p className="text-[12px] text-sky-800 font-medium leading-relaxed flex items-start gap-2">
                          <span className="text-sky-500 mt-0.5">✨</span>
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
              className="pt-2"
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-sky-900 to-sky-700 text-white py-4 rounded-2xl font-bold text-[15px] shadow-xl shadow-sky-900/15 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="relative z-10">{language === 'en' ? 'Registering...' : 'በመመዝገብ ላይ...'}</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">{language === 'en' ? 'Complete Registration' : 'ምዝገባን ያጠናቅቁ'}</span>
                    <Send size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Privacy Note */}
              <p className="text-[11px] text-center text-sky-900/40 font-medium mt-5 leading-relaxed max-w-[250px] mx-auto">
                {language === 'en' ? 'By registering, you agree to our' : 'በመመዝገብዎ፣ የኛን'}{" "}
                <Link href="/terms" className="text-sky-600 hover:text-sky-800 transition-colors underline decoration-sky-600/30 underline-offset-2">
                  {language === 'en' ? 'Terms' : 'ውሎች'}
                </Link>
                {" "}{language === 'en' ? 'and' : 'እና'}{" "}
                <Link href="/privacy" className="text-sky-600 hover:text-sky-800 transition-colors underline decoration-sky-600/30 underline-offset-2">
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