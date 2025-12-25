"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiXMark, HiArrowLongRight } from "react-icons/hi2";

const HIGHLIGHT_IMAGES = [
  "/landscape.png",
  "/landscape2.png",
  "/landscape3.png",
];

const ProductMarquee = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-950 isolate">
      {/* CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-red-950/10 mix-blend-overlay pointer-events-none" />

      {/* CSS-DRIVEN MARQUEE (GPU ACCELERATED) */}
      <div className="marquee-wrapper w-full flex flex-col will-change-transform">
        {/* We duplicate the array twice to ensure smooth seamless looping */}
        {[...HIGHLIGHT_IMAGES, ...HIGHLIGHT_IMAGES].map((src, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-[4/3] filter saturate-[1.1] flex-shrink-0"
          >
            <Image
              src={src}
              alt="Fear Yah Collection"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={idx < 2} // Prioritize first 2 images for instant LCP
            />
          </div>
        ))}
      </div>

      {/* INLINE STYLES FOR PERFORMANCE 
          Using translate3d forces hardware acceleration on all devices. 
      */}
      <style jsx>{`
        .marquee-wrapper {
          animation: scrollVertical 30s linear infinite;
        }
        @keyframes scrollVertical {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }
      `}</style>
    </div>
  );
};

interface EmailSignupPopupProps {
  forceOpen?: boolean;
}

export function EmailSignupPopup({ forceOpen = false }: EmailSignupPopupProps) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Update internal state if prop changes
  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  useEffect(() => {
    // If it's the main page (forceOpen), we don't use timers or session checks
    if (forceOpen) return;

    const hasSeenPopup = sessionStorage.getItem("fy-popup-seen");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  const handleClose = () => {
    // CRITICAL: If this is the main page, user CANNOT close it.
    if (forceOpen) return;

    setIsOpen(false);
    sessionStorage.setItem("fy-popup-seen", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");

      // CRITICAL: Only auto-close if this is a popup.
      // If it's the main page (forceOpen), stay on the success message forever.
      if (!forceOpen) {
        setTimeout(() => {
          handleClose();
        }, 2500);
      }
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop - OPTIMIZED: Removed backdrop-blur for performance */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/95" 
          />

          {/* Modal Content */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-sm md:max-w-4xl bg-neutral-950 border border-white/[0.08] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[550px]"
          >
            {/* Close Button - Only show if NOT forced open */}
            {!forceOpen && (
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-50 p-2 text-white/40 hover:text-white transition-colors bg-black/50 rounded-full md:bg-transparent"
              >
                <HiXMark size={20} />
              </button>
            )}

            {/* VISUALS SIDE */}
            <div className="relative w-full h-64 md:h-auto md:w-[45%] border-b md:border-b-0 md:border-r border-white/[0.08] flex-shrink-0 bg-neutral-900">
              <ProductMarquee />
              <div className="md:hidden absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-neutral-950 to-transparent z-30" />
            </div>

            {/* CONTENT SIDE */}
            <div className="flex-1 flex flex-col p-6 md:p-12 relative bg-gradient-to-br from-neutral-950 to-black overflow-y-auto md:overflow-visible">
              {/* Subtle Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* ORGANIZED CONTENT CONTAINER */}
              <div className="relative z-10 flex flex-col h-full justify-center gap-6">
                {/* 1. BRAND IDENTITY (CENTERED) */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex justify-center"
                >
                  <div className="relative w-32 h-12 md:w-48 md:h-20">
                    <Image
                      src="/logo2.png"
                      alt="Fear Yah"
                      fill
                      className="object-contain object-center"
                      priority
                    />
                  </div>
                </m.div>

                {/* 2. THE OFFER (CENTERED & BIGGER) */}
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center space-y-2"
                >
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                    Unlock <span className="text-white">15% Off</span>
                  </h2>
                  <p className="text-white/60 text-sm md:text-base font-light max-w-xs mx-auto leading-relaxed">
                    Join the movement. Get your exclusive code and priority
                    access to new drops.
                  </p>
                </m.div>

                {/* 3. THE ACTION (FORM) */}
                <div className="w-full">
                  {status === "success" ? (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white/5 border border-white/10 p-6 text-center rounded-sm"
                    >
                      <span className="text-xl font-bold text-white block mb-1">
                        Welcome Aboard.
                      </span>
                      <span className="text-xs text-white/50 uppercase tracking-widest">
                        {forceOpen
                          ? "Watch your inbox."
                          : "Code sent to your inbox"}
                      </span>
                    </m.div>
                  ) : (
                    <m.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4 max-w-sm mx-auto w-full"
                    >
                      <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-white/20 py-3 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-red-600 transition-colors font-mono text-center"
                      />

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group w-full bg-white text-black py-4 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl mt-2"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-xs font-black tracking-[0.2em] uppercase">
                            {status === "loading"
                              ? "Processing..."
                              : "Unlock Access"}
                          </span>
                          <HiArrowLongRight className="text-lg group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>

                      <p className="text-[9px] md:text-[10px] text-white/30 text-center leading-tight pt-2">
                        By signing up, you agree to receive emails from Fear Yah
                        and accept our{" "}
                        <span className="text-white/50 hover:text-white underline cursor-pointer transition-colors">
                          Privacy Policy
                        </span>
                      </p>
                    </m.form>
                  )}
                </div>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}