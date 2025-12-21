// src/components/brand/TestimonialsSection.tsx
"use client";

import { useRef, useEffect, useMemo, memo } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { HiStar } from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Alexandra Chen",
    location: "New York",
    rating: 5,
    content: "The quality of JENERA pieces is unmatched. Every garment feels like it was made specifically for me. The attention to detail is remarkable.",
    mobileContent: "Unmatched quality. Every piece feels custom-made.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    product: "Wool Coat",
  },
  {
    id: 2,
    name: "Marcus Rivera",
    location: "London",
    rating: 5,
    content: "Finally found a brand that understands minimalist fashion without compromising on quality. The cashmere sweater is my everyday essential now.",
    mobileContent: "Perfect minimalist fashion. My everyday essential.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    product: "Cashmere Sweater",
  },
  {
    id: 3,
    name: "Sophie Laurent",
    location: "Paris",
    rating: 5,
    content: "JENERA has become my go-to for building a timeless wardrobe. The pieces are versatile, elegant, and made to last. Exceptional craftsmanship.",
    mobileContent: "Timeless pieces that last. Exceptional quality.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    product: "Trousers",
  },
  {
    id: 4,
    name: "James Mitchell",
    location: "Melbourne",
    rating: 5,
    content: "The sustainable approach combined with luxury quality is exactly what I was looking for. These pieces are investment-worthy.",
    mobileContent: "Sustainable luxury. Investment-worthy pieces.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    product: "Utility Jacket",
  },
  {
    id: 5,
    name: "Elena Kowalski",
    location: "Berlin",
    rating: 5,
    content: "Impeccable tailoring and sustainable materials. JENERA represents everything modern fashion should be. A true game-changer.",
    mobileContent: "Impeccable tailoring. Modern fashion done right.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    product: "Knit Sweater",
  },
  {
    id: 6,
    name: "David Nakamura",
    location: "Tokyo",
    rating: 5,
    content: "The minimalist aesthetic speaks volumes. Every piece tells a story of quality and thoughtful design. Absolutely love this brand.",
    mobileContent: "Minimalist perfection. Quality in every detail.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    product: "Silk Shirt",
  },
];

const TestimonialCard = memo(function TestimonialCard({ 
  testimonial, 
  index 
}: { 
  testimonial: typeof TESTIMONIALS[0]; 
  index: number;
}) {
  return (
    <div className="flex-shrink-0 w-[240px] sm:w-[340px] md:w-[400px] group">
      <div className="relative bg-neutral-900/50 border border-white/5 p-4 sm:p-6 md:p-8 h-full backdrop-blur-sm hover:border-white/10 transition-colors duration-500">
        <FaQuoteLeft className="hidden sm:block absolute top-6 right-6 text-white/5 text-3xl" />
        <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <HiStar key={i} className="text-white text-[10px] sm:text-sm" />
          ))}
        </div>
        <p className="text-white/70 text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-6">
          "<span className="hidden sm:inline">{testimonial.content}</span>
          <span className="sm:hidden">{testimonial.mobileContent}</span>"
        </p>
        <div className="mb-3 sm:mb-6">
          <span className="text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase px-2 sm:px-3 py-1 sm:py-1.5 border border-white/10 text-white/40 inline-block">
            {testimonial.product}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 32px, 48px"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-white font-medium text-[11px] sm:text-sm truncate">
              {testimonial.name}
            </h4>
            <p className="text-white/40 text-[9px] sm:text-xs truncate">{testimonial.location}</p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-4 sm:w-8 h-px bg-white/10" />
        <div className="absolute top-0 left-0 w-px h-4 sm:h-8 bg-white/10" />
        <div className="absolute bottom-0 right-0 w-4 sm:w-8 h-px bg-white/10" />
        <div className="absolute bottom-0 right-0 w-px h-4 sm:h-8 bg-white/10" />
      </div>
    </div>
  );
});

const TestimonialScroller = memo(function TestimonialScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationFrameId: number;
    let scrollAmount = 0;
    const isMobile = window.innerWidth < 640;
    const scrollSpeed = isMobile ? 0.25 : 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(scroll);
    };

    const timeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scroll);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const doubledTestimonials = useMemo(() => [...TESTIMONIALS, ...TESTIMONIALS], []);

  return (
    <div className="relative w-full overflow-hidden py-2 sm:py-4">
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-6 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {doubledTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden" // TIGHT PADDING
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8" // TIGHT MARGIN
        >
          <span className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-light block mb-2 sm:mb-4">
            TESTIMONIALS
          </span>
          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight"
          >
            WHAT PEOPLE
            <span className="font-extralight text-white/60 ml-2 sm:ml-3">SAY</span>
          </h2>
          <p className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base text-white/40 max-w-xl mx-auto px-2">
            Join thousands of satisfied customers who have discovered the JENERA difference.
          </p>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <TestimonialScroller />
      </m.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8"> 
        {/* TIGHT MARGIN */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-16 pt-6 sm:pt-8 border-t border-white/5"
        >
          <div className="text-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white">50K+</span>
            <p className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-white/40 mt-0.5 sm:mt-1 uppercase">
              Customers
            </p>
          </div>
          <div className="w-px h-8 sm:h-12 bg-white/10" />
          <div className="text-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white">4.9</span>
            <p className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-white/40 mt-0.5 sm:mt-1 uppercase">
              Rating
            </p>
          </div>
          <div className="w-px h-8 sm:h-12 bg-white/10" />
          <div className="text-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white">98%</span>
            <p className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-white/40 mt-0.5 sm:mt-1 uppercase">
              Recommend
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}