"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const videos = [
    {
        id: "oM7dH-0LEms",
        title: "EvaSUE Easter Outreach 1",
    },
    {
        id: "xJQGSEtt6f8",
        title: "EvaSUE Easter Outreach 2",
    },
    {
        id: "hekvsuPkd0o",
        title: "EvaSUE Easter Outreach 3",
    },
    {
        id: "ifnNOVN6kGY",
        title: "EvaSUE Easter Outreach 4",
    },
    {
        id: "RozNpgweV7s",
        title: "EvaSUE Easter Outreach 5",
    },
    {
        id: "Dh2wLL00Vb4",
        title: "EvaSUE Easter Outreach 6",
    },
    {
        id: "PMw6Pfa7ydo",
        title: "EvaSUE Easter Outreach 7",
    }
];

export default function VideoSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 10000); // 10 seconds interval

        return () => clearInterval(timer);
    }, [currentIndex, isPaused]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    // Handle potential out-of-bounds index after video list modification
    const safeIndex = currentIndex >= videos.length ? 0 : currentIndex;
    const currentVideo = videos[safeIndex];

    if (!currentVideo) return null;

    return (
        <div
            className="relative group w-full max-w-[800px] mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 rounded-[2rem] blur-xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>

            {/* Video Container */}
            <div className="relative bg-slate-950 rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-video">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={safeIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=0&rel=0`}
                            title={currentVideo.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-sky-500 transition-all z-10 opacity-0 group-hover:opacity-100"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-sky-500 transition-all z-10 opacity-0 group-hover:opacity-100"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {videos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > safeIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${index === safeIndex ? "bg-sky-500 w-6" : "bg-white/30 hover:bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
