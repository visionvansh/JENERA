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
  align: "center" | "left" | "right";
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    title: "FEAR YAH",
    subtitle: "GENESIS COLLECTION",
    tagline: "BOW TO NONE BUT ONE",
    cta: "SHOP THE DROP",
    image: "/landscape.png", // Ensure these paths exist in your public folder
    align: "center",
  },
  {
    id: 2,
    title: "ETERNAL",
    subtitle: "WINTER 2025",
    tagline: "PURITY IN DISCIPLINE",
    cta: "VIEW LOOKBOOK",
    image: "/landscape2.png",
    align: "center",
  },
  {
    id: 3,
    title: "SILENCE",
    subtitle: "MONOCHROME SERIES",
    tagline: "NOISE CANCELLATION",
    cta: "EXPLORE NOW",
    image: "/landscape3.png",
    align: "center",
  },
];

// --- Sub-Components ---

/**
 * Magnetic Button: Physically pulls the cursor towards the button center
 */
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

/**
 * SplitText: Animates text character by character
 */
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

  const { scrollY } = useScroll();
  
  // ADJUSTED PHYSICS: Matches the "Black Faded" reference
  // 1. Content moves down slightly (Float)
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]); 
  // 2. Content fades out completely by 500px scroll
  const opacityParallax = useTransform(scrollY, [0, 500], [1, 0]); 
  // 3. Background scales UP (Zoom in) as you scroll
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.1]);

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
    <m.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-white selection:text-black"
    >
      {/* 1. BACKGROUND SLIDER 
         Wrapped in m.div with style={{ scale: bgScale }} for the scroll zoom effect 
      */}
      <m.div className="absolute inset-0 z-0" style={{ scale: bgScale }}>
        <AnimatePresence initial={false} mode="popLayout">
          <m.div
            key={currentData.id}
            className="absolute inset-0 will-change-transform"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)", zIndex: 1 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <m.div
              className="relative h-full w-full will-change-transform"
              style={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "linear" }}
            >
              <Image
                src={currentData.image}
                alt={currentData.title}
                fill
                className="object-cover"
                priority
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
              <div className="absolute inset-0 bg-black/20" />
            </m.div>
          </m.div>
        </AnimatePresence>
      </m.div>

      {/* 2. PARALLAX FLOATING ELEMENTS */}
      <m.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          x: useMotionTemplate`${smoothMouseX.get() * -20}px`,
          y: useMotionTemplate`${smoothMouseY.get() * -20}px`,
        }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden opacity-[0.04]">
          <m.div
            className="whitespace-nowrap text-[20vw] font-black uppercase leading-none will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
             FEAR YAH — BOW TO NONE BUT ONE — FEAR YAH — BOW TO NONE BUT ONE — 
          </m.div>
        </div>
      </m.div>

      {/* 3. MAIN CONTENT LAYER */}
      <m.div
        className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4"
        style={{ opacity: opacityParallax, y: yParallax }}
      >
        <div className="relative flex flex-col items-center text-center">
          
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
            <div className="absolute inset-0 -translate-x-full bg-neutral-300 transition-transform duration-500 group-hover:translate-x-0" />
          </MagneticButton>
        </div>
      </m.div>

      {/* 4. FOOTER INFO */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-center p-8 md:p-12 pointer-events-none">
        <m.div 
          className="hidden md:flex flex-col items-center gap-2 opacity-60"
          style={{ opacity: opacityParallax }} // Fade out footer on scroll too
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] uppercase tracking-widest writing-vertical">Scroll</span>
          <HiArrowDown />
        </m.div>
      </div>

    </m.section>
  );
}