// src/components/brand/HeroSection.tsx
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { m, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiArrowDown } from "react-icons/hi2";

const HERO_SLIDES = [
  {
    id: 1,
    title: "AUTUMN",
    subtitle: "COLLECTION",
    year: "2025",
    image: "/landscape.png",
  },
  {
    id: 2,
    title: "PURE",
    subtitle: "ELEGANCE",
    year: "2025",
    image: "/landscape2.png",
  },
  {
    id: 3,
    title: "TIMELESS",
    subtitle: "DESIGN",
    year: "2025",
    image: "/landscape3.png",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
  });
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    let rafId: number;
    let lastX = 0;
    let lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const newX = (e.clientX - rect.left) / rect.width - 0.5;
          const newY = (e.clientY - rect.top) / rect.height - 0.5;
          if (Math.abs(newX - lastX) > 0.01 || Math.abs(newY - lastY) > 0.01) {
            lastX = newX;
            lastY = newY;
            setMousePosition({ x: newX, y: newY });
          }
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isClient]);

  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }));
  }, []);

  const scrollToContent = useCallback(() => {
    const element = document.getElementById("must-have");
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const currentSlideData = HERO_SLIDES[currentSlide];

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {HERO_SLIDES.map((slide, index) => (
        <m.div
          key={slide.id}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <m.div className="absolute inset-0" style={{ scale }}>
            <Image
              src={slide.image}
              alt={`${slide.title} ${slide.subtitle}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={75}
              onLoad={() => handleImageLoad(index)}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </m.div>
        </m.div>
      ))}

      {!imagesLoaded[0] && (
        <div className="absolute inset-0 z-[2] bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black animate-pulse" />
        </div>
      )}

      <m.div className="absolute inset-0 z-10" style={{ opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </m.div>

      {isClient && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
              transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0)`,
              willChange: "transform",
            }}
          />
        </div>
      )}

      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none hidden sm:block">
        {[0, 1, 2].map((i) => (
          <m.div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{
              left: `${25 + i * 25}%`,
              top: `${15 + i * 15}%`,
            }}
            animate={{
              y: [0, 100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <m.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-4"
        style={{ y }}
      >
        {/* Year Badge - Minimal margin */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-2 sm:mb-3"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.4em] text-white/50 font-light">
            COLLECTION {currentSlideData.year}
          </span>
        </m.div>

        {/* Main Title - Tightened height */}
        <div className="relative overflow-hidden text-center min-h-[120px] sm:min-h-[160px] md:min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <m.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            >
              <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-[0.85] tracking-[-0.02em] text-white">
                {currentSlideData.title}
              </h1>
              <h2 className="text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] font-extralight tracking-[0.3em] text-white/80 -mt-2 sm:-mt-4">
                {currentSlideData.subtitle}
              </h2>
            </m.div>
          </AnimatePresence>
        </div>

        {/* CTA Button - Closer to title */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 sm:mt-8"
        >
          <button className="group relative px-8 sm:px-12 py-3 sm:py-4 border border-white/30 hover:border-white text-white text-xs sm:text-sm tracking-[0.3em] uppercase font-medium transition-all duration-500 overflow-hidden">
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Explore Collection
            </span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </m.div>

        {/* Slide Indicators - Closer to button */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-3 mt-8 sm:mt-10"
        >
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-px transition-all duration-500 ${
                currentSlide === index
                  ? "w-12 bg-white"
                  : "w-6 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </m.div>
      </m.div>

      <m.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors group"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiArrowDown size={16} />
        </m.div>
      </m.button>

      {/* Side Elements */}
      <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="writing-vertical text-[10px] tracking-[0.4em] text-white/30"
        >
          PREMIUM QUALITY
        </m.div>
      </div>

      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
        <m.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="writing-vertical text-[10px] tracking-[0.4em] text-white/30"
        >
          HANDCRAFTED
        </m.div>
      </div>
    </section>
  );
}