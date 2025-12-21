// src/components/brand/NewsletterSection.tsx
"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { HiArrowRight, HiCheckCircle, HiEnvelope } from "react-icons/hi2";
import Image from "next/image";

const SUBSCRIBER_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", 
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", 
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", 
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", 
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-neutral-950 text-white relative overflow-hidden"> 
      {/* TIGHT PADDING */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-10 lg:mb-12" // TIGHT MARGIN
          >
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="w-8 h-px bg-white/10" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-light uppercase">
                Stay Connected
              </span>
              <div className="w-8 h-px bg-white/10" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-4 sm:mb-6 tracking-tight">
              BE THE FIRST
              <br />
              <span className="font-extralight text-white/50">TO KNOW</span>
            </h2>
          </m.div>

          {/* Form Container */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {!isSubmitted ? (
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-4 sm:p-6 md:p-8 rounded-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-8 sm:w-12 h-px bg-white/10" />
                <div className="absolute top-0 left-0 w-px h-8 sm:h-12 bg-white/10" />
                <div className="absolute bottom-0 right-0 w-8 sm:w-12 h-px bg-white/10" />
                <div className="absolute bottom-0 right-0 w-px h-8 sm:h-12 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-4 bg-neutral-900/50 border border-white/10 text-white placeholder-white/30 text-sm tracking-wide focus:outline-none focus:border-white/30 focus:bg-neutral-900/70 transition-all duration-300 rounded-sm"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 sm:px-8 py-4 bg-white text-black text-xs sm:text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-sm group/btn relative overflow-hidden"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="hidden sm:inline">Subscribe</span>
                          <span className="sm:hidden">Join Now</span>
                          <HiArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={14} />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="hidden xs:grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5">
                    <div className="text-center sm:text-left">
                      <p className="text-white/80 font-semibold text-xs sm:text-sm mb-0.5">Early Access</p>
                      <p className="text-white/40 text-[9px] sm:text-[10px] tracking-wider uppercase">New Drops</p>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-white/80 font-semibold text-xs sm:text-sm mb-0.5">Exclusive Offers</p>
                      <p className="text-white/40 text-[9px] sm:text-[10px] tracking-wider uppercase">Members Only</p>
                    </div>
                    <div className="text-center sm:text-left col-span-2 sm:col-span-1">
                      <p className="text-white/80 font-semibold text-xs sm:text-sm mb-0.5">VIP Treatment</p>
                      <p className="text-white/40 text-[9px] sm:text-[10px] tracking-wider uppercase">Premium Support</p>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 p-8 sm:p-10 md:p-12 rounded-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-12 h-px bg-green-500/30" />
                <div className="absolute top-0 left-0 w-px h-12 bg-green-500/30" />
                <div className="absolute bottom-0 right-0 w-12 h-px bg-green-500/30" />
                <div className="absolute bottom-0 right-0 w-px h-12 bg-green-500/30" />

                <div className="text-center">
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <HiCheckCircle className="text-4xl sm:text-5xl text-green-500 mx-auto mb-4 sm:mb-6" />
                  </m.div>
                  
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 sm:mb-3">
                    Welcome to the Family
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 tracking-wide">
                    Check your inbox for exclusive content.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
                    <div>
                      <p className="text-2xl sm:text-3xl font-black text-white/90">10K+</p>
                      <p className="text-[9px] sm:text-[10px] tracking-wider text-white/40 uppercase mt-1">Members</p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-black text-white/90">24/7</p>
                      <p className="text-[9px] sm:text-[10px] tracking-wider text-white/40 uppercase mt-1">Access</p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-black text-white/90">VIP</p>
                      <p className="text-[9px] sm:text-[10px] tracking-wider text-white/40 uppercase mt-1">Status</p>
                    </div>
                  </div>
                </div>
              </m.div>
            )}
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-4 sm:mt-6" // TIGHT MARGIN
          >
            <p className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-white/30 uppercase">
              By subscribing, you agree to our{" "}
              <a 
                href="/privacy" 
                className="text-white/50 hover:text-white/80 transition-colors underline underline-offset-2"
              >
                Privacy Policy
              </a>
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="hidden sm:flex items-center justify-center gap-6 mt-8 lg:mt-10" // TIGHT MARGIN
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {SUBSCRIBER_AVATARS.map((avatar, i) => (
                  <m.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                    className="relative w-8 h-8 rounded-full border-2 border-neutral-950 overflow-hidden bg-neutral-800"
                  >
                    <Image
                      src={avatar}
                      alt={`Subscriber ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </m.div>
                ))}
              </div>
              <p className="text-[10px] text-white/40 tracking-wider">10,000+ subscribers</p>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-3.5 h-3.5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <p className="text-[10px] text-white/40 tracking-wider ml-1">Rated 4.9/5</p>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}