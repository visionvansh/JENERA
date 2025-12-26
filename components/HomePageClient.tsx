// components/HomePageClient.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, AnimatePresence, m, useScroll, useTransform, domMax } from "framer-motion";
import Image from "next/image";
import { HiXMark, HiArrowLongRight } from "react-icons/hi2";
import { getDropStatus } from "@/app/actions";
import {
  Navbar,
  HeroSection,
  MustHaveProducts,
  ShopByCategories,
  FeaturedCollection,
  BrandStory,
  TrustedBy,
  ProductShowcase,
  LookbookSection,
  TestimonialsSection,
  NewsletterSection,
  Footer,
  ScrollProgress,
} from "@/components/brand";

// --- NEW COMPONENT: CINEMATIC LOGO VIDEO (Hero-Like Smooth Scroll) ---
const CinematicLogoVideo = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll progress relative to this specific component
  // "start end" = when top of component hits bottom of screen
  // "end start" = when bottom of component hits top of screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 1. SCALE (Zoom In): Mimics HeroSection bgScale [1, 1.1]
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  // 2. PARALLAX (Float): Moves the video slightly within its container
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  // 3. OPACITY: Fades in/out at edges for smoothness
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden bg-neutral-950"
    >
      <m.div 
        style={{ scale, y, opacity }} 
        className="absolute inset-0 w-full h-[120%] -top-[10%]" // Height > 100% to allow parallax movement
      >
        {/* Dark Overlay for cinematic mood */}
        <div className="absolute inset-0 bg-black/10 z-10" />
        
        <video
          className="w-full h-full object-cover"
          src="/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </m.div>
      
      {/* Top and Bottom Gradients to blend seamlessly with the black page background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
};

// --- MERGED POPUP COMPONENTS ---

const HIGHLIGHT_IMAGES = [
  "/landscape.png",
  "/landscape2.png",
  "/landscape3.png",
];

const ProductMarquee = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-red-950/10 mix-blend-overlay pointer-events-none" />
      
      <m.div
        className="flex flex-col gap-0"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...HIGHLIGHT_IMAGES, ...HIGHLIGHT_IMAGES].map((src, idx) => (
          <div key={idx} className="relative w-full aspect-[4/3] filter saturate-[1.1]">
            <Image
              src={src}
              alt="Fear Yah Collection"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </m.div>
    </div>
  );
};

interface HomePageClientProps {
  initialDropState: boolean;
}

export default function HomePageClient({ initialDropState }: HomePageClientProps) {
  // Initialize with Server State (0ms delay on first load)
  const [showDropSquare, setShowDropSquare] = useState(initialDropState);
  
  // Popup States
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // ---------------------------------------------------------
  // LIVE SYNC: Check DB every 3 seconds to update active tabs
  // ---------------------------------------------------------
  useEffect(() => {
    // Set initial popup state based on mode
    if (initialDropState) setIsPopupOpen(true);

    const interval = setInterval(async () => {
      const latestStatus = await getDropStatus();
      setShowDropSquare(latestStatus);
      
      // If mode switched to DROP, force popup open
      if (latestStatus && !showDropSquare) {
        setIsPopupOpen(true);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [initialDropState, showDropSquare]);

  // ---------------------------------------------------------
  // POPUP TIMER (Only for Main Page Mode)
  // ---------------------------------------------------------
  useEffect(() => {
    if (showDropSquare) {
      setIsPopupOpen(true);
      return;
    }

    const hasSeenPopup = sessionStorage.getItem("fy-popup-seen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsPopupOpen(true), 3500);
      return () => clearTimeout(timer);
    } else {
      setIsPopupOpen(false);
    }
  }, [showDropSquare]);

  // ---------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------
  const handleClose = () => {
    if (showDropSquare) return; // Locked in Drop Mode
    setIsPopupOpen(false);
    sessionStorage.setItem("fy-popup-seen", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      if (!showDropSquare) {
        setTimeout(() => handleClose(), 2500);
      }
    }, 1500);
  };

  // ---------------------------------------------------------
  // POPUP UI
  // ---------------------------------------------------------
  const PopupUI = ({ forceOpen }: { forceOpen: boolean }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-sm md:max-w-4xl bg-neutral-950 border border-white/[0.08] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[550px]"
      >
        {!forceOpen && (
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-50 p-2 text-white/40 hover:text-white transition-colors bg-black/50 backdrop-blur-sm rounded-full md:bg-transparent"
          >
            <HiXMark size={20} />
          </button>
        )}
        <div className="relative w-full h-64 md:h-auto md:w-[45%] border-b md:border-b-0 md:border-r border-white/[0.08] flex-shrink-0">
           <ProductMarquee />
           <div className="md:hidden absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-neutral-950 to-transparent z-30" />
        </div>
        <div className="flex-1 flex flex-col p-6 md:p-12 relative bg-gradient-to-br from-neutral-950 to-black overflow-hidden md:overflow-visible">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          <div className="relative z-10 flex flex-col h-full justify-center gap-6">
            <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-center">
              <div className="relative w-32 h-12 md:w-48 md:h-20">
                <Image src="/logo2.png" alt="Fear Yah" fill className="object-contain object-center" priority />
              </div>
            </m.div>
            <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                Unlock <span className="text-white">15% Off</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base font-light max-w-xs mx-auto leading-relaxed">
               Get your exclusive code and priority access to new drops.
              </p>
            </m.div>
            <div className="w-full">
              {status === "success" ? (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 p-6 text-center rounded-sm">
                  <span className="text-xl font-bold text-white block mb-1">Welcome Aboard.</span>
                  <span className="text-xs text-white/50 uppercase tracking-widest">{forceOpen ? "Check your inbox for details." : "Code sent to your inbox"}</span>
                </m.div>
              ) : (
                <m.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto w-full">
                  <input type="email" placeholder="EMAIL ADDRESS" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent border-b border-white/20 py-3 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-red-600 transition-colors font-mono text-center" />
                  <button type="submit" disabled={status === "loading"} className="group w-full bg-white text-black py-4 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl mt-2">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-xs font-black tracking-[0.2em] uppercase">{status === "loading" ? "Processing..." : "Unlock Access"}</span>
                      <HiArrowLongRight className="text-lg group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                  <p className="text-[9px] md:text-[10px] text-white/30 text-center leading-tight pt-2">
                    By signing up, you agree to receive emails from Fear Yah and accept our <span className="text-white/50 hover:text-white underline cursor-pointer transition-colors">Privacy Policy</span>
                  </p>
                </m.form>
              )}
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );

  return (
    <LazyMotion features={domMax} strict>
      <div className="fixed inset-0 bg-black -z-20" />
      <div suppressHydrationWarning className="contents">
        <AnimatePresence mode="wait" initial={false}>
          {showDropSquare ? (
            <m.div key="drop-square-mode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative min-h-screen bg-black">
               <AnimatePresence>{isPopupOpen && <PopupUI forceOpen={true} />}</AnimatePresence>
            </m.div>
          ) : (
            <m.div key="main-homepage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative min-h-screen text-white selection:bg-white/20 selection:text-white antialiased">
              <ScrollProgress />
              <Navbar />
              <AnimatePresence>{isPopupOpen && <PopupUI forceOpen={false} />}</AnimatePresence>
              <main id="main-content">
                <HeroSection />
                
                {/* Section 1: Must Have Products
                   Section 2: Cinematic Logo Video (New)
                */}
                <MustHaveProducts />
                <CinematicLogoVideo />
                
                <ShopByCategories />
                {/* <FeaturedCollection /> */}
                <TrustedBy />
                <BrandStory />
                <TestimonialsSection />
                <NewsletterSection />
              </main>
              <Footer />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}