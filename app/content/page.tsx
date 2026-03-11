"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Youtube, FileText, Share2, Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContentPage() {
    const [language, setLanguage] = useState<'en' | 'am'>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLanguage = localStorage.getItem('language') as 'en' | 'am';
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const content = {
        en: {
            title: "Easter EvangelisticOutreach",
            subtitle: "Jesus Is All About Life (JAAL)",
            articleTitle: "ተስፈኛው ባለ ርስት",
            articleContent1: "ጴጥሮስ በመጀመሪያ መልእክቱ አጥብቆ የሚናገረው ስለ ሕያው ተስፋ ነው። ይህ ተስፋ የዘላለም ሕይወት ተስፋ ነው፤ ምክንያቱም ኢየሱስ ክርስቶስ ሞቶ አልቀረም፤ አሁን ሕያው ነው።",
            articleContent2: "This outreach isn't just about sharing a message; it's about building a movement of disciples who understand their identity in Christ and their calling to influence society. We believe that when a student's life is changed, the future of our nation is impacted.",
            articleContent3: "Watch the video to learn more about our training programs, mobilization strategies, and how you can be part of this life-changing mission.",
            videoTitle: "Watch Our Mission Documentary",
            tags: ["Outreach", "Campus Ministry", "EvaSUE", "Evangelism"],
            author: "EvaSUE Communications",
            date: "March 2026",
            back: "Back to Home"
        },
        am: {
            title: "የፋሲካ የወንጌል ስርጭት",
            subtitle: "ኢየሱስ ለጥያቄ ሁሉ መልስ ነው (JAAL)",
            articleTitle: "ለካምፓስ ለውጥ ያለን ራዕይ",
            articleContent1: "በኢቫሱ ሁልጊዜም ግባችን በኢትዮጵያ ካምፓሶች ውስጥ የሚገኙ ተማሪዎች በሙሉ በወንጌል ኃይል ተለውጠው ማየት ነው። የትንሳኤን በዓል አስመልክቶ ከአፍሪካ ኢቫንጀልስቲክ ኢንተርፕራይዝ (AEE-Ethiopia) ጋር በመተባበር 'ኢየሱስ ለጥያቄ ሁሉ መልስ ነው' (JAAL) የተሰኘ ታላቅ ዘመቻ ጀምረናል።",
            articleContent2: "ይህ የወንጌል ስርጭት መልእክት ማድረስ ብቻ አይደለም፤ በክርስቶስ ያላቸውን ማንነት የተረዱ እና ማህበረሰቡን ተፅእኖ እንዲፈጥሩ የተጠሩ ደቀመዛሙርትን እንቅስቃሴ መገንባት ነው። በአንድ ተማሪ ሕይወት ውስጥ ለውጥ ሲመጣ፣ የሀገራችን የወደፊት ሁኔታ ላይ ተፅእኖ እንደሚፈጥር እናምናለን።",
            articleContent3: "ስለ ስልጠና ፕሮግራሞቻችን፣ ስለ ንቅናቄ ስልቶቻችን እና የዚህ የለውጥ ጉዞ አካል መሆን ስለሚችሉበት ሁኔታ የበለጠ ለማወቅ ቪዲዮውን ይመልከቱ።",
            videoTitle: "የተልዕኮ ዘጋቢ ፊልማችንን ይመልከቱ",
            tags: ["የወንጌል ስርጭት", "የካምፓስ አገልግሎት", "ኢቫሱ", "ወንጌላዊነት"],
            author: "የኢቫሱ ኮሙኒኬሽን",
            date: "መጋቢት 2018",
            back: "ወደ መነሻ ተመለስ"
        }
    };

    const t = language === 'en' ? content.en : content.am;

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-slate-950 pt-28 pb-20 relative overflow-hidden">
            {/* Background elements to match overall theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/40 to-slate-950 opacity-100 z-0" />
            <motion.div
                className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.15)_0%,transparent_60%)] z-0 pointer-events-none"
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
                    >
                        {t.title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="h-1 w-12 bg-sky-500 rounded-full" />
                        <p className="text-sky-400 font-bold tracking-widest uppercase text-sm sm:text-base">
                            {t.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Main Grid Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Article Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
                            <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-400 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-sky-500" />
                                    <span>{t.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-sky-500" />
                                    <span>{t.date}</span>
                                </div>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                                {t.articleTitle}
                            </h2>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                    {t.articleContent1}
                                </p>
                                <div className="my-8 p-6 bg-sky-500/10 border-l-4 border-sky-500 rounded-r-xl italic text-sky-100 font-medium">
                                    {t.articleContent2}
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    {t.articleContent3}
                                </p>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/10">
                                <div className="flex flex-wrap gap-2">
                                    {t.tags.map((tag, idx) => (
                                        <span key={idx} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-sky-400 uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Newsletter or extra info callout */}
                        <div className="bg-gradient-to-r from-sky-600/20 to-indigo-600/20 backdrop-blur-md border border-sky-400/20 rounded-3xl p-8 flex items-center justify-between group">
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">Stay updated with our missions</h3>
                                <p className="text-slate-400 text-sm italic">Join our telegram channel for real-time impact stories.</p>
                            </div>
                            <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Share2 className="w-6 h-6" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: YouTube Embedded Video */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="sticky top-28">
                            <div className="mb-4 flex items-center gap-3">
                                <Youtube className="w-6 h-6 text-red-500" />
                                <h3 className="text-white font-black uppercase tracking-widest text-sm">Featured Video</h3>
                            </div>

                            <div className="relative group">
                                {/* Glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                                {/* Video Container */}
                                <div className="relative aspect-video bg-slate-900 rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/2eTBvxoR21U?" // Placeholder, I should probably use a relevant one or let the user provide it
                                        title="EvaSUE Campus Outreach"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>

                            <div className="mt-6 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                                <h4 className="text-white font-bold mb-2">{t.videoTitle}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Join our mission leaders as they discuss the implementation of JAAL in major universities across Addis Ababa.
                                </p>
                                <div className="mt-4 flex items-center gap-4 text-xs font-bold text-sky-400 tracking-widest uppercase">
                                    <span>12:45 Duration</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                                    <span>HD Quality</span>
                                </div>
                            </div>

                            {/* Related content links could go here */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                                    <FileText className="w-5 h-5 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold text-slate-300">Strategic Plan</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="w-5 h-5 text-emerald-500 mb-2 group-hover:scale-110 transition-transform font-bold">PDF</div>
                                    <span className="text-xs font-bold text-slate-300">Training Manual</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
