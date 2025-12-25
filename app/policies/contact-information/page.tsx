//Volumes/vision/codes/jenara/my-app/app/contact-information/page.tsx
"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/brand/Navbar";

export default function ContactInformation() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20 flex flex-col">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none fixed">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-light block mb-4 uppercase">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              CONTACT <span className="font-extralight text-white/60">INFORMATION</span>
            </h1>
          </motion.div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mx-auto w-full"
          >
            <div className="bg-neutral-900/30 border border-white/5 p-8 sm:p-12 md:p-16 backdrop-blur-sm rounded-sm relative overflow-hidden group">
              
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-px bg-white/20" />
              <div className="absolute top-0 left-0 w-px h-8 bg-white/20" />
              <div className="absolute bottom-0 right-0 w-8 h-px bg-white/20" />
              <div className="absolute bottom-0 right-0 w-px h-8 bg-white/20" />

              <div className="space-y-8 relative z-10">
                
                {/* Trade Name */}
                <div className="text-center">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/40 mb-3">
                    Trade Name
                  </p>
                  <h2 className="text-xl sm:text-2xl font-medium text-white tracking-wide">
                    JENERA
                  </h2>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-white/10 mx-auto" />

                {/* Email */}
                <div className="text-center">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/40 mb-3">
                    Email Support
                  </p>
                  <a 
                    href="mailto:verseandme@gmail.com" 
                    className="text-xl sm:text-2xl md:text-3xl font-light text-white hover:text-white/70 transition-colors duration-300 break-words"
                  >
                    verseandme@gmail.com
                  </a>
                </div>

              </div>

              {/* Subtle Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 blur-[80px] pointer-events-none rounded-full group-hover:bg-white/10 transition-colors duration-700" />
            </div>
          </motion.div>

        </div>

        {/* Footer Accent */}
        <div className="container mx-auto px-4 relative z-10 mt-12 sm:mt-0">
          <div className="border-t border-white/5 pt-8 text-center">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-white/20 uppercase">JENERA &copy; 2025</span>
          </div>
        </div>

      </main>
    </>
  );
}