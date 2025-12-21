"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
// FIX 1: Import 'm' instead of 'motion'
import { m, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";

// MOCK DATA
const COMMUNITY_VIDEOS = [
  {
    id: 1,
    username: "sophie.style",
    description: "Absolutely in love with this fit! The quality is insane.",
    videoUrl: "/videos/community1.mp4",
    thumbnail: "/cloth12.png",
    likes: 1247,
    verified: true,
  },
  {
    id: 2,
    username: "alex_trends",
    description: "Best purchase of the year. Fits perfectly.",
    videoUrl: "/videos/community2.mp4",
    thumbnail: "/cloth18.png",
    likes: 892,
    verified: true,
  },
  {
    id: 3,
    username: "jessica_fashion",
    description: "Obsessed with the details! #HausofVeda",
    videoUrl: "/videos/community3.mp4",
    thumbnail: "/cloth20.png",
    likes: 2103,
    verified: false,
  },
  {
    id: 4,
    username: "mike_streetwear",
    description: "Cleanest silhouette I've found. 10/10 recommend.",
    videoUrl: "/videos/community4.mp4",
    thumbnail: "/cloth11.png",
    likes: 1456,
    verified: true,
  },
  {
    id: 5,
    username: "emma_lux",
    description: "Worth every penny. The fabric feels amazing.",
    videoUrl: "/videos/community5.mp4",
    thumbnail: "/cloth22.png",
    likes: 987,
    verified: true,
  },
];

// Optimized Animation Variants for Performance
const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "45%" : "-45%", 
    scale: 0.85,
    opacity: 0,
    rotateY: direction > 0 ? -10 : 10, 
    zIndex: 10,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    rotateY: 0,
    zIndex: 30,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-45%" : "45%", 
    scale: 0.85,
    opacity: 0,
    rotateY: direction > 0 ? 10 : -10,
    zIndex: 10,
  }),
};

// FIX 2: Correct the transition object type error
// cubic-bezier(0.25, 1, 0.5, 1) is represented as a string or 4 numbers
const smoothTransition = {
  duration: 0.5,
  ease: [0.25, 1, 0.5, 1] as const, // Add 'as const' to fix TS error
};

export const CommunityVideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % COMMUNITY_VIDEOS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + COMMUNITY_VIDEOS.length) % COMMUNITY_VIDEOS.length);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();

    touchStart.current = 0;
    touchEnd.current = 0;
  };

  const getPrevIndex = () => (currentIndex - 1 + COMMUNITY_VIDEOS.length) % COMMUNITY_VIDEOS.length;
  const getNextIndex = () => (currentIndex + 1) % COMMUNITY_VIDEOS.length;

  return (
    <section className="py-6 border-t border-neutral-900 relative overflow-hidden bg-black">
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Updated Text */}
        {/* FIX 3: motion.div -> m.div */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
    
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight uppercase mb-3">
            BECOME A PART OF OUR COMMUNITY
          </h2>
     
          <p className="text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed">
            Post a video with your order and tag us and receive a 30% discount on your next order
          </p>
        </m.div>

        {/* Carousel Container */}
        <div
          className="relative h-[650px] w-full max-w-7xl mx-auto flex items-center justify-center overflow-visible mt-[-110]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Custom Navigation Arrows */}
          <button
            onClick={() => { handlePrev(); setIsAutoPlaying(false); }}
            className="absolute left-2 md:left-10 z-50 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white bg-black/50 backdrop-blur-xl hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
            aria-label="Previous"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => { handleNext(); setIsAutoPlaying(false); }}
            className="absolute right-2 md:right-10 z-50 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white bg-black/50 backdrop-blur-xl hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
            aria-label="Next"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          {/* The Stage */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* LEFT CARD (Preview) */}
            {/* FIX 4: motion.div -> m.div */}
            <m.div
              key={`prev-${getPrevIndex()}`}
              className="absolute w-[280px] sm:w-[320px] h-[500px] sm:h-[570px] z-10"
              initial={{ x: "-45%", scale: 0.85, opacity: 0.6 }} 
              animate={{ 
                x: "-45%", 
                scale: 0.85, 
                opacity: 0.4,
                rotateY: 10,
                zIndex: 10
              }} 
              transition={smoothTransition}
              style={{ originX: 0.5, transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            >
               <div className="w-full h-full grayscale brightness-50 pointer-events-none">
                 <VideoCard video={COMMUNITY_VIDEOS[getPrevIndex()]} isActive={false} />
               </div>
            </m.div>

            {/* CENTER CARD (Active) */}
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              {/* FIX 5: motion.div -> m.div */}
              <m.div
                key={currentIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-[280px] sm:w-[320px] h-[500px] sm:h-[570px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
                transition={smoothTransition}
                style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
              >
                <VideoCard video={COMMUNITY_VIDEOS[currentIndex]} isActive={true} />
              </m.div>
            </AnimatePresence>

            {/* RIGHT CARD (Preview) */}
            {/* FIX 6: motion.div -> m.div */}
            <m.div
              key={`next-${getNextIndex()}`}
              className="absolute w-[280px] sm:w-[320px] h-[500px] sm:h-[570px] z-10"
              initial={{ x: "45%", scale: 0.85, opacity: 0.6 }} 
              animate={{ 
                x: "45%", 
                scale: 0.85,
                opacity: 0.4,
                rotateY: -10,
                zIndex: 10
              }}
              transition={smoothTransition}
              style={{ originX: 0.5, transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            >
               <div className="w-full h-full grayscale brightness-50 pointer-events-none">
                 <VideoCard video={COMMUNITY_VIDEOS[getNextIndex()]} isActive={false} />
               </div>
            </m.div>

          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-[-44]">
          {COMMUNITY_VIDEOS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                index === currentIndex ? "w-12 bg-white" : "w-1.5 bg-neutral-800 hover:bg-neutral-600"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Video Card Component (Optimized)
const VideoCard = ({
  video,
  isActive,
}: {
  video: typeof COMMUNITY_VIDEOS[0];
  isActive: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Optimized: Only query DOM if isActive changes
  useEffect(() => {
    if (!isActive && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!isActive) return;
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={`relative w-full h-full bg-neutral-900 overflow-hidden transition-all duration-300 border rounded-[32px] ${
        isActive ? "border-white/20" : "border-transparent"
      }`}
      onClick={togglePlay}
      style={{ willChange: "transform" }}
    >
      {/* Video Content */}
      <div className="absolute inset-0 bg-neutral-900 rounded-[32px] overflow-hidden">
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-105'}`}
          loop
          muted
          playsInline
          poster={video.thumbnail}
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>
        
        {/* Strong Bottom Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Controls & Info Overlay */}
      <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Bottom Area */}
        <div className="flex items-end justify-between gap-4">
            
            {/* Text Information */}
            <div className="flex-1 space-y-3 z-20">
                <div className="flex items-center gap-2">
                    <span className="font-black uppercase tracking-widest text-white text-sm drop-shadow-md">
                        @{video.username}
                    </span>
                    {video.verified && <HiCheckBadge className="text-blue-500 w-5 h-5 drop-shadow-md" />}
                </div>

                <p className="font-bold text-white/90 text-xs leading-relaxed drop-shadow-md line-clamp-2">
                    {video.description}
                </p>
                
                {/* Progress Bar */}
                <div className="h-[2px] w-24 bg-white/20 mt-3 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* FIX 7: motion.div -> m.div */}
                    <m.div 
                        initial={{ width: 0 }}
                        animate={isPlaying ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 10, ease: "linear" }}
                        className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                </div>
            </div>

            {/* Play Button */}
            <button 
                className="group flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-lg z-20"
            >
                {isPlaying ? (
                    <FaPause className="w-3 h-3" />
                ) : (
                    <FaPlay className="w-3 h-3 ml-1" />
                )}
            </button>

        </div>
      </div>
    </div>
  );
};