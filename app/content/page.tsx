"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Youtube, FileText, Share2, Calendar, User, ArrowLeft, Download } from "lucide-react";
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
            title: "Easter Evangelistic Outreach",
            subtitle: "Jesus Is All About Life (JAAL)",
            articleTitle: "A Living Hope",
            articleContent1: "A Perfect Future: It is a perfect future where we live with God forever. In that place, there is no sorrow, tears, suffering, or crying. While we live in a world where light and darkness alternate, a life of never-fading light awaits us where Christ Himself shines. There is no pain from the loss of loved ones, no regret, and no fear.",
            articleContent2: "Lord Jesus, I believe that You died for my sins and rose from the dead to cleanse me. I give my life to You, and today I lean on Your hope. Amen.",
            articles: [
                { title: "Resurrection: Religious Myth or Historical Fact?", link: "/content/Resurrection.docx" },
                { title: "A Living Hope", link: "/content/The Hopeful Heir.docx" }
            ],
            downloadText: "Download Document",
            videoTitle: "Watch Our Mission Documentary",
            videoDescription: "Watch more videos in our EvaSUE Youtube channel and subscribe to get updated videos",
            back: "Back to Home"
        },
        am: {
            title: "የፋሲካ የወንጌል ስርጭት",
            subtitle: "ኢየሱስ ለጥያቄ ሁሉ መልስ ነው (JAAL)",
            articleTitle: "በክርስቶስ ያለው ርስት — ምንድን ነው?",
            articleContent1: "በመጀመሪያ፣ ይህ ተስፋ የተገባልን ርስት ለዘላለም ከእግዚአብሔር ጋር የምንኖረው ፍጹም የኾነ የወደፊት ሕይወት ነው። በዚያ ሐዘን፣ እንባ፣ መከራ እና ልቅሶ የለም። ጨለማ እና ብርሃን በሚቆራረጥበት በዚህ ዓለም፥ ክርስቶስ ራሱ የሚያበራበት ፈጽሞ የማይጠፋ የብርሃን ሕይወት ይጠብቀናል። ከምንወዳቸው እና ከሚወዱን ሰዎች መለየታችን የሚፈጥርብን ሕመም በዚያ ሥፍራ የለም። ሕመም፣ ጸጸት እና ፍርሃት የማይኖርበት ሥፍራ ነው።",
            articleContent2: "ጌታ ኢየሱስ ሆይ፣ ስለኀጢአቴ እንደሞትክ እኔንም ከኀጢአቴ ለማንጻት ከሞት እንደተነሳህ አምናለሁ፤ ሕይወቴን ለአንተ እሰጣለሁ፣ ዛሬም በተስፋህ እደገፋለሁ። አሜን!",
            articles: [
                { title: "ትንሳኤ፡ ኃይማኖታዊ ተረት ወይስ ታሪካዊ እውነታ?", link: "/content/ትንሳኤ_ኃይማኖታዊ_ተረት_ወይስ_ታሪካዊ_እውነታ.docx" },
                { title: "ተስፈኛው ባለ ርስት", link: "/content/ተስፈኛው ባለርስት.docx" }
            ],
            downloadText: "ሰነዱን ያውርዱ",
            videoTitle: "የተልዕኮ ዘጋቢ ፊልማችንን ይመልከቱ",
            videoDescription: "ተጨማሪ ቪዲዮዎችን በኢቫሱ የዩቲዩብ ቻናላችን ይመልከቱ፤ አዳዲስ ቪዲዮዎችን ለማግኘት ሰብስክራይብ ያድርጉ።",
            tags: ["የወንጌል ስርጭት", "የካምፓስ አገልግሎት", "ኢቫሱ", "ወንጌላዊነት", "ጽሑፎች"],
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
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                                {t.articleTitle}
                            </h2>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                    {t.articleContent1}
                                </p>

                                {/* Document Downloads Area */}
                                <div className="space-y-4 my-8">
                                    {t.articles?.map((article, idx) => (
                                        <div key={idx} className="p-6 bg-sky-500/10 border-l-4 border-sky-500 rounded-r-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-sky-500/20 transition-colors">
                                            <h3 className="text-sky-100 font-bold text-lg m-0">{article.title}</h3>
                                            <a href={article.link} download className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-sky-500/30 text-sm whitespace-nowrap">
                                                <Download className="w-4 h-4" />
                                                {t.downloadText}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="my-8 p-6 bg-white/5 border border-white/10 rounded-2xl italic text-sky-100 font-medium text-lg leading-relaxed">
                                    {t.articleContent2}
                                </div>
                            </div>
                        </div>

                        {/* Newsletter or extra info callout */}
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
                                        src="https://www.youtube.com/embed/1vdYw0VzReU?" // Placeholder, I should probably use a relevant one or let the user provide it
                                        title="EvaSUE Campus Outreach"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>

                            <div className="mt-6 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                                <h4 className="text-white font-bold mb-2">{t.videoTitle}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {t.videoDescription}
                                </p>

                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
