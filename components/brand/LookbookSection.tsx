// src/components/brand/LookbookSection.tsx
"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";

const LOOKBOOK_ITEMS = [
  {
    id: 1,
    title: "Urban Minimalism",
    season: "AW 2025",
    aspectRatio: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  },
  {
    id: 2,
    title: "Essential Layers",
    season: "AW 2025",
    aspectRatio: "aspect-square",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
  },
  {
    id: 3,
    title: "Modern Classics",
    season: "AW 2025",
    aspectRatio: "aspect-[4/5]",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
  },
  {
    id: 4,
    title: "Quiet Luxury",
    season: "AW 2025",
    aspectRatio: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
  },
];

export function LookbookSection() {
  return (
    <section
      id="lookbook"
      className="py-8 sm:py-12 lg:py-16 bg-neutral-950 relative overflow-hidden" // TIGHT PADDING
      aria-labelledby="lookbook-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8" // TIGHT MARGIN
        >
          <div>
            <span className="text-[10px] sm:text-xs tracking-[0.4em] text-white/40 font-light block mb-3">
              VISUAL STORIES
            </span>
            <h2
              id="lookbook-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
            >
              LOOKBOOK
              <span className="font-extralight text-white/60 ml-3">2025</span>
            </h2>
          </div>
          <a
            href="/lookbook"
            className="mt-6 sm:mt-0 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors group"
          >
            View Full Lookbook
            <HiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </m.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {LOOKBOOK_ITEMS.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group cursor-pointer ${index % 2 === 1 ? "lg:mt-6" : ""}`} // REDUCED OFFSET
            >
              <div className={`${item.aspectRatio} relative overflow-hidden`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />

                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] tracking-[0.2em] text-white/60">
                    {item.season}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/80">
                      Explore
                      <HiArrowUpRight size={12} />
                    </span>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-6 h-px bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
                <div className="absolute top-0 left-0 w-px h-6 bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}