"use client";

import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, AnimatePresence, m } from "framer-motion";
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

import { EmailSignupPopup } from "@/components/brand/EmailSignupPopup"; 

export default function HomePage() {
  const [showDropSquare, setShowDropSquare] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem("dropSquareActive");
    if (savedState !== null) {
      setShowDropSquare(JSON.parse(savedState));
    }
    setIsLoading(false);

    const handleToggle = () => {
      const savedState = localStorage.getItem("dropSquareActive");
      setShowDropSquare(savedState === "true");
    };

    window.addEventListener("dropSquareToggle", handleToggle);
    window.addEventListener("storage", (e) => {
      if (e.key === "dropSquareActive" && e.newValue !== null) {
        setShowDropSquare(JSON.parse(e.newValue));
      }
    });

    return () => {
      window.removeEventListener("dropSquareToggle", handleToggle);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
        />
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Global background for safety */}
      <div className="fixed inset-0 bg-black -z-20" />
      
      <AnimatePresence mode="wait">
        {showDropSquare ? (
          <m.div
            key="drop-square-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen"
          >
             {/* DROP MODE:
                Only the EmailSignupPopup is rendered. 
                forceOpen={true} makes it permanent and removes the close button.
             */}
             <EmailSignupPopup forceOpen={true} />
          </m.div>
        ) : (
          <m.div
            key="main-homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen text-white selection:bg-white/20 selection:text-white antialiased"
          >
            {/* NORMAL MODE: Full Website */}
            <ScrollProgress />
            <Navbar />
            
            {/* Standard Popup behavior (Timer based, closable) */}
            <EmailSignupPopup forceOpen={false} />

            <main id="main-content">
              <HeroSection />
              <MustHaveProducts />
              <ShopByCategories />
              <FeaturedCollection />
              <TrustedBy />
              <BrandStory />
              
              <div className="hidden lg:block">
                <ProductShowcase />
              </div>
              
              <div className="hidden lg:block">
                <LookbookSection />
              </div>
              
              <TestimonialsSection />
              <NewsletterSection />
            </main>

            <Footer />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}