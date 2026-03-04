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
  AlertCircle,
  Map,
  Clock,
  Calendar
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

  // Event details in both languages
  const eventDetails = {
    en: {
      title: "Are you ready to see lives transformed in Addis Ababa? 🇪🇹✨",
      description: "EvaSUE and African Evangelistic Enterprise (AEE-Ethiopia) are teaming up for the \"Jesus is All About Life\" (JAAL) Easter Outreach this April! Our goal is simple: Reach every campus and beyond with the hope of the Gospel.",
      training: "To get mission-ready, we are hosting a Full Day Training & Consultation on Mar 14, 2026, exclusively for Main Leaders and Evan & Mission Mobilizers Leaders.",
      locations: [
        { name: "Central 1 campuses", location: "Megenagna Full Gospel Church" },
        { name: "Central 2 campuses", location: "Lideta Assemblies of God Church" }
      ],
      time: "8:30 AM – 5:00 PM",
      cost: "FREE (Registration is required!)",
      verse: "\"...In his great mercy he has given us new birth into a living hope...\" (1 Peter 1:3)"
    },
    am: {
      title: "የወንጌል ጥሪ ለአዲስ አበባ ካምፓሶች! 🇪🇹✨",
      description: "ኢቫሱ (EvaSUE) ከአፍሪካ ኢቫንጀልስቲክ ኢንተርፕራይዝ (AEE) ጋር በመተባበር \"ኢየሱስ ለጥያቄ ሁሉ መልስ ነው\" (JAAL) በሚል መሪ ቃል ታላቅ የትንሳኤ ወንጌል ዘመቻ አዘጋጅቷል።",
      training: "ለዚህ ታላቅ ተልዕኮ ራሳችንን የምናዘጋጅበት የሙሉ ቀን ሥልጠና መጋቢት 07 ቀን 2026 ይጠብቀናል!",
      locations: [
        { name: "ለሴንትራል 1 ተማሪዎች", location: "መገናኛ ሙሉ ወንጌል ቤተክርስቲያን" },
        { name: "ለሴንትራል 2 ተማሪዎች", location: "ልደታ የእግዚአብሔር አምባ ቤተክርስቲያን" }
      ],
      time: "ከጠዋቱ 2፡30 እስከ ቀኑ 11፡00 ሰዓት",
      cost: "በነጻ (ግን አስቀድሞ መመዝገብ አስፈላጊ ነው)",
      verse: "\"...እርሱ ከታላቅ ምሕረቱ የተነሣ በኢየሱስ ክርስቶስ ከሞት መነሣት ምክንያት ለሕያው ተስፋ በሚሆን አዲስ ልደት...\" (1ኛ ጴጥሮስ 1:3)"
    }
  };

  const event = language === 'en' ? eventDetails.en : eventDetails.am;

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
        <span>{language === 'en' ? 'Amharic' : 'እንግሊዝኛ'}</span>
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

      {/* Main Container - Flex column with separate sections */}
      <div className="relative w-full max-w-6xl z-10 mx-auto mt-16 sm:mt-20">
        
        {/* Event Details Section - Full width, separate from form */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-sky-900 to-sky-800 rounded-3xl p-6 sm:p-8 mb-10 text-white shadow-2xl w-full"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              {event.title}
            </h1>

            <p className="text-sm sm:text-base text-sky-100 mb-4 leading-relaxed">
              {event.description}
            </p>

            <p className="text-sm sm:text-base text-sky-100 mb-6 font-medium bg-white/10 p-4 rounded-xl">
              {event.training}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {event.locations.map((loc, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm sm:text-base mb-1">{loc.name}</p>
                      <p className="text-xs sm:text-sm text-sky-200 mb-2">{loc.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                <Clock className="w-4 h-4 text-sky-300" />
                <span className="text-sm font-medium">⏰ {event.time}</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 rounded-xl px-4 py-2">
                <Heart className="w-4 h-4 text-green-300" />
                <span className="text-sm font-medium">💰 {event.cost}</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4 mt-4">
              <p className="text-xs sm:text-sm text-sky-200 italic text-center">
                {event.verse}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Registration Form Section - Centered with max-w-md */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* Header Section */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
                className="inline-flex justify-center items-center gap-3 mb-4 p-2 bg-white/40 backdrop-blur-xl rounded-2xl border border-white shadow-sm"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-sky-900 to-sky-700 rounded-[14px] flex items-center justify-center shadow-md transform -rotate-3 transition-transform hover:rotate-0">
                  <Church className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-tr from-sky-600 to-sky-400 rounded-[14px] flex items-center justify-center shadow-md transform rotate-3 transition-transform hover:rotate-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-950 to-sky-700 tracking-tight mb-1">
                  {language === 'en' ? 'Easter Outreach 2026' : 'የትንሳኤ ዘመቻ 2026'}
                </h1>
                <p className="text-xs text-sky-700/70 font-medium max-w-[280px] mx-auto">
                  {language === 'en' ? 'Register for the training event' : 'ለሥልጠና ዝግጅት ይመዝገቡ'}
                </p>
              </motion.div>
            </div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] p-5 sm:p-8"
            >
              {/* Daily Verse */}
              {mounted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8 bg-gradient-to-br from-sky-50/50 to-white rounded-3xl p-5 border border-sky-100/50 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100/40 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                  <p className="text-[13px] text-sky-900 leading-relaxed italic font-medium">"{currentVerse.verse}"</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-px w-6 bg-sky-300" />
                    <p className="text-[10px] text-sky-600 font-bold tracking-widest uppercase">{currentVerse.reference}</p>
                  </div>
                </motion.div>
              )}

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

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[11px] font-bold tracking-widest uppercase text-center text-sky-900/30 mt-8 mb-4"
        >
          EvaSUE & AEE-Ethiopia • {language === 'en' ? 'Easter Outreach 2026' : 'የትንሳኤ ዘመቻ 2026'}
        </motion.p>
      </div>
    </div>
  );
}