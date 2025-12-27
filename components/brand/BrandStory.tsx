// src/components/brand/BrandStory.tsx
"use client";

import { useRef, useState } from "react";
import { 
  m, 
  useScroll, 
  useTransform, 
} from "framer-motion";
import { HiArrowLongRight, HiSpeakerXMark, HiSpeakerWave, HiQrCode } from "react-icons/hi2";

// --- SUB-COMPONENT: AUDIO VISUALIZER BARS ---
const AudioBars = () => {
  return (
    <div className="flex items-end gap-[2px] h-3">
      {[...Array(4)].map((_, i) => (
        <m.div
          key={i}
          className="w-[2px] bg-red-500"
          animate={{ height: ["20%", "100%", "40%"] }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- SUB-COMPONENT: DECORATIVE BARCODE ---
const Barcode = () => (
  <div className="flex items-stretch h-8 gap-[2px] opacity-40">
    {[2, 1, 3, 1, 4, 1, 2, 3, 1, 2, 4, 1, 2].map((w, i) => (
      <div key={i} className="bg-white" style={{ width: `${w}px` }} />
    ))}
  </div>
);

// --- SUB-COMPONENT: BACKGROUND MARQUEE ---
const MarqueeText = ({ text, direction = 1, speed = 25 }: { text: string, direction?: number, speed?: number }) => {
  return (
    <div className="flex overflow-hidden select-none opacity-[0.03] pointer-events-none z-0 mix-blend-plus-lighter">
      <m.div
        className="flex whitespace-nowrap"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-[12vh] md:text-[18vw] font-black uppercase leading-none tracking-tighter text-white mr-16">
            {text}
          </span>
        ))}
      </m.div>
    </div>
  );
};

export function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // --- SCROLL PARALLAX ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  // Refined Parallax: Subtle movement to keep them connected
  const yContent = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center py-20 lg:py-0"
    >
      {/* GLOBAL NOISE FILTER */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay">
         <div className="w-full h-full bg-[url('/noise.png')] animate-pulse" />
      </div>

      {/* BACKGROUND TYPOGRAPHY LAYERS */}
      <div className="absolute inset-0 flex flex-col justify-center gap-20 z-0">
        <MarqueeText text="FEAR YAH" speed={50} />
        <MarqueeText text="FAITH OVER FEAR" direction={-1} speed={45} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 lg:gap-0 items-center max-w-7xl mx-auto">
          
          {/* --- RIGHT: THE DIGITAL MONOLITH (Video) --- */}
          {/* Order-1: Video ON TOP for mobile */}
          <m.div 
            style={{ y: yContent }}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-start lg:-ml-12 relative z-10" 
          >
            <div className="relative w-full max-w-[320px] lg:max-w-[420px] aspect-[9/16] bg-neutral-900 group shadow-[0_0_50px_rgba(0,0,0,0.5)] lg:shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              
              {/* Outer Border Frame (Glitch Effect) - Hidden on bottom mobile to prevent line */}
              <div className="absolute top-[-4px] left-[-4px] right-[-4px] bottom-0 lg:-inset-1 border-t border-x lg:border border-white/20 opacity-40 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-500 pointer-events-none" />
              <div className="absolute -inset-1 border border-red-500/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 pointer-events-none mix-blend-screen" />
              
              {/* VIDEO WRAPPER */}
              <div className="relative w-full h-full overflow-hidden bg-black">
                 {/* VIDEO 1: GRAYSCALE (Base State) */}
                 <div className="absolute inset-0 z-0 transition-opacity duration-700 group-hover:opacity-0">
                    <video
                        ref={videoRef}
                        src="/video2.mp4"
                        className="w-full h-full object-cover filter grayscale contrast-[1.3] brightness-[0.8]"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                    <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
                    <div className="absolute w-full h-[2px] bg-white/10 top-1/2 animate-scan" /> 
                 </div>

                 {/* VIDEO 2: COLOR (Hover State) */}
                 <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <video
                        src="/video2.mp4"
                        className="w-full h-full object-cover filter saturate-[1.15]"
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                 </div>

                 {/* MOBILE ONLY: Bottom Fade to connect seamlessly with text */}
                 <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent lg:hidden z-20 pointer-events-none" />

                 {/* HUD OVERLAY */}
                 <div className="absolute inset-0 z-20 p-4 lg:p-5 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                       <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 flex items-center gap-2 rounded-sm">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-[8px] sm:text-[9px] font-mono text-white/90 tracking-widest uppercase">REC • 04:20</span>
                       </div>
                       <button 
                         onClick={toggleAudio} 
                         className="pointer-events-auto w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-black transition-colors backdrop-blur-md border border-white/20 rounded-full"
                       >
                         {isMuted ? <HiSpeakerXMark size={14} /> : <HiSpeakerWave size={14} />}
                       </button>
                    </div>

                    <div className="space-y-3 pb-8 lg:pb-0"> {/* Added padding bottom for mobile fade visibility */}
                       <m.div 
                         initial={{ opacity: 0, y: 10 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         className="flex items-center justify-between"
                       >
                          <span className="text-[10px] font-black italic text-white uppercase mix-blend-difference drop-shadow-md">Fear Yah ©</span>
                          <AudioBars />
                       </m.div>
                       <div className="w-full h-px bg-white/30" />
                       <div className="flex justify-between text-[8px] font-mono text-white/60 uppercase tracking-widest">
                          <span>Coord: 35.6762° N</span>
                          <span>Sector: 7</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </m.div>

          {/* --- LEFT: WRITING PART --- */}
          {/* Order-2: Text BOTTOM for mobile */}
          <m.div 
            style={{ y: yContent }}
            className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-20"
          >
            {/* MOBILE CONNECTION FIX:
               - -mt-24: Pulls text deeply into the video fade area.
               - relative z-20: Ensures text sits ON TOP of the faded video bottom.
            */}
            <div className="-mt-24 lg:mt-0 px-4 lg:px-0 max-w-[320px] lg:max-w-none mx-auto w-full relative">
              
              {/* Overlap Background Gradient - Extended height to hide any seams */}
              <div className="absolute inset-x-0 -top-32 h-64 bg-gradient-to-t from-black via-black to-transparent lg:hidden z-0 pointer-events-none" />

              <div className="relative z-10">
                 {/* Decorative Top Tag */}
                <div className="mb-6 lg:mb-8 flex items-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                  <div className="flex items-center gap-2 border border-white/20 px-3 py-1 bg-white/5 backdrop-blur-sm shadow-xl">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-mono tracking-[0.2em] text-white/80 uppercase">
                      System: Online
                    </span>
                  </div>
                  <div className="hidden sm:block">
                     <Barcode />
                  </div>
                </div>

                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6 lg:mb-8 drop-shadow-2xl">
                  BORN FROM <br />
                  <span className="text-white/30">THE VOID.</span>
                </h2>

                <div className="relative border-l-2 border-white/10 pl-6 space-y-6 max-w-md">
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                    We don't follow trends — we bury them and build our own. Fear Yah exists to equip the modern rebel with armor for the urban battlefield, grounded in faith, not fear.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-1">Fabric</span>
                        <span className="text-xs text-white font-mono">Heavyweight Cotton</span>
                     </div>
                     <div>
                        <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-1">Origin</span>
                        <span className="text-xs text-white font-mono">Los Angeles / United States</span>
                     </div>
                  </div>
                </div>

                <div className="mt-8 lg:mt-10 flex flex-wrap items-center gap-6 lg:gap-8">
                   <a href="/about" className="group inline-flex items-center gap-4 text-white bg-white/5 hover:bg-white/10 px-6 py-3 border border-white/10 transition-all">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-500 group-hover:text-white transition-colors">Manifesto</span>
                      <HiArrowLongRight className="group-hover:translate-x-1 transition-transform duration-300" />
                   </a>
                   <HiQrCode className="text-3xl text-white/20" />
                </div>
              </div>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}