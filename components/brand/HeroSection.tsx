// src/components/brand/HeroSection.tsx
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  m,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { HiArrowLongRight, HiArrowDown } from "react-icons/hi2";

// --- Types & Data ---

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  cta: string;
  image: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    title: "FEAR YAH",
    subtitle: "GENESIS COLLECTION",
    tagline: "BOW TO NONE BUT ONE",
    cta: "SHOP THE DROP",
    image: "/landscape.png", 
  },
  {
    id: 2,
    title: "ETERNAL",
    subtitle: "WINTER 2025",
    tagline: "PURITY IN DISCIPLINE",
    cta: "VIEW LOOKBOOK",
    image: "/landscape2.png",
  },
  {
    id: 3,
    title: "SILENCE",
    subtitle: "MONOCHROME SERIES",
    tagline: "NOISE CANCELLATION",
    cta: "EXPLORE NOW",
    image: "/landscape3.png",
  },
];

// --- Sub-Components ---

const MagneticButton = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </m.button>
  );
};

const SplitText = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const wordVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: i * 0.1 + delay },
    }),
  };

  const letterVariants: Variants = {
    hidden: { y: 100, opacity: 0, rotateZ: 5 },
    visible: {
      y: 0,
      opacity: 1,
      rotateZ: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <m.h1
      variants={wordVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap overflow-hidden ${className}`}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="inline-block relative">
            {word.split("").map((char, j) => (
              <m.span
                key={j}
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </m.span>
            ))}
          </span>
        </span>
      ))}
    </m.h1>
  );
};

// --- Main Component ---

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- SCROLL PHYSICS (From your reference) ---
  const { scrollY } = useScroll();
  
  // 1. Content fades out quickly (0px to 500px scroll)
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  // 2. Content moves down slowly to create depth
  const contentY = useTransform(scrollY, [0, 500], [0, 150]);
  
  // 3. Background Image zooms in slightly (Scale 1 -> 1.1)
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Mouse interaction (Optimized)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentData = HERO_SLIDES[currentSlide];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      
      {/* 1. BACKGROUND LAYER (With Scroll Scale Effect) */}
      <m.div 
        className="absolute inset-0 z-0 h-full w-full"
        style={{ scale: bgScale }} // Apply the scroll zoom here
      >
        <AnimatePresence initial={false} mode="popLayout">
          <m.div
            key={currentData.id}
            className="absolute inset-0 h-full w-full will-change-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* The Image Itself */}
            <Image
              src={currentData.image}
              alt={currentData.title}
              fill
              className="object-cover"
              priority
              quality={85}
            />
            
            {/* GRADIENT OVERLAYS (Crucial for the "faded" look) */}
            {/* Top gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            {/* General darkening */}
            <div className="absolute inset-0 bg-black/20" />
          </m.div>
        </AnimatePresence>
      </m.div>

      {/* 2. PARALLAX FLOATING TEXT (Background Decor) */}
      <m.div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-[0.1]"
        style={{
          x: useMotionTemplate`${smoothMouseX.get() * -20}px`,
          y: useMotionTemplate`${smoothMouseY.get() * -20}px`,
        }}
      >
         <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden">
          <m.div
            className="whitespace-nowrap text-[20vw] font-black uppercase leading-none will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
             FEAR YAH — BOW TO NONE BUT ONE — FEAR YAH — BOW TO NONE BUT ONE — 
          </m.div>
        </div>
      </m.div>

      {/* 3. MAIN CONTENT LAYER (With Scroll Opacity & Y Axis) */}
      <m.div
        className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4"
        style={{ 
          opacity: contentOpacity, 
          y: contentY 
        }}
      >
        <div className="relative flex flex-col items-center text-center">
          
          {/* Tagline */}
          <div className="overflow-hidden mb-4">
            <AnimatePresence mode="wait">
              <m.div
                key={currentData.tagline}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-mono text-xs sm:text-sm tracking-[0.5em] text-white/70 uppercase">
                  [{currentData.tagline}]
                </p>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Main Title */}
          <div className="relative z-10 my-2 mix-blend-difference">
            <AnimatePresence mode="wait">
              <div key={currentData.title} className="overflow-hidden">
                <SplitText
                  text={currentData.title}
                  className="justify-center text-[15vw] leading-[0.8] font-black tracking-tighter text-white"
                />
              </div>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden mb-12">
             <AnimatePresence mode="wait">
              <m.div
                 key={currentData.subtitle}
                 initial={{ y: 40, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{ y: -40, opacity: 0 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl sm:text-3xl font-light tracking-[0.3em] uppercase text-white">
                  {currentData.subtitle}
                </h3>
              </m.div>
             </AnimatePresence>
          </div>

          {/* CTA Button */}
          <MagneticButton className="group relative z-30 inline-flex items-center gap-4 overflow-hidden rounded-full bg-white px-10 py-5 text-black transition-all hover:bg-gray-200">
            <span className="relative z-10 text-sm font-bold tracking-[0.2em] uppercase">
              {currentData.cta}
            </span>
            <div className="relative z-10 overflow-hidden w-6 h-6">
               <m.div
                className="flex items-center justify-center w-full h-full"
                whileHover={{ x: 5 }}
               >
                 <HiArrowLongRight className="text-xl" />
               </m.div>
            </div>
            {/* Button Hover Fill */}
            <div className="absolute inset-0 -translate-x-full bg-neutral-300 transition-transform duration-500 group-hover:translate-x-0" />
          </MagneticButton>
        </div>
      </m.div>

      {/* 4. BOTTOM FADE OVERLAY (Ensures smooth blend to next section) */}
      <m.div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"
        style={{ opacity: contentOpacity }} 
      />

      {/* 5. FOOTER SCROLL INDICATOR */}
      <m.div 
        className="absolute bottom-12 left-0 right-0 z-30 flex justify-center pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <m.div 
          className="flex flex-col items-center gap-2 opacity-60"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] uppercase tracking-widest writing-vertical">Scroll</span>
          <HiArrowDown />
        </m.div>
      </m.div>

    </section>
  );
}