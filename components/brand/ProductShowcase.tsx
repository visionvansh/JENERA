// src/components/product/ProductShowcase.tsx
"use client";

import { useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiPlus } from "react-icons/hi2";

interface ShowcaseItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ProductShowcaseProps {
  description: string;
}

// Function to parse Shopify description and extract image-title-description sets
function parseShowcaseItems(htmlDescription: string): ShowcaseItem[] {
  const items: ShowcaseItem[] = [];
  
  if (!htmlDescription) return items;

  // Extract all images
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const images: string[] = [];
  let imgMatch;
  while ((imgMatch = imgRegex.exec(htmlDescription)) !== null) {
    images.push(imgMatch[1]);
  }

  // Extract all h1/h2/h3/h4/h5/h6 headings
  const headingRegex = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  const headings: string[] = [];
  let headingMatch;
  while ((headingMatch = headingRegex.exec(htmlDescription)) !== null) {
    // Strip any inner HTML tags and get clean text
    const cleanText = headingMatch[1].replace(/<[^>]*>/g, '').trim();
    if (cleanText) {
      headings.push(cleanText);
    }
  }

  // Extract all paragraphs
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const paragraphs: string[] = [];
  let pMatch;
  while ((pMatch = pRegex.exec(htmlDescription)) !== null) {
    // Strip any inner HTML tags and get clean text
    const cleanText = pMatch[1].replace(/<[^>]*>/g, '').trim();
    if (cleanText) {
      paragraphs.push(cleanText);
    }
  }

  // Create items by pairing: image -> heading -> paragraph
  const itemCount = Math.min(images.length, headings.length);
  
  for (let i = 0; i < itemCount; i++) {
    items.push({
      id: i + 1,
      title: headings[i],
      description: paragraphs[i] || '',
      image: images[i],
    });
  }

  return items;
}

export function ProductShowcase({ description }: ProductShowcaseProps) {
  const showcaseItems = useMemo(() => parseShowcaseItems(description), [description]);
  const [activeItem, setActiveItem] = useState(0);

  // Don't render if no items found
  if (showcaseItems.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.4em] text-white/40 font-light block mb-4">
            PRODUCT DETAILS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            FEATURES <span className="font-extralight text-white/60">&amp; DETAILS</span>
          </h2>
        </m.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          
          {/* --- PC VERSION IMAGE ---
            Added 'hidden lg:block' so this large side image ONLY shows on Desktop.
            On mobile, we hide this because we show the image inline inside the list below.
          */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block relative aspect-[4/5] overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <m.div
                key={activeItem}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={showcaseItems[activeItem]?.image || "/placeholder.jpg"}
                  alt={showcaseItems[activeItem]?.title || "Product detail"}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  unoptimized
                />
              </m.div>
            </AnimatePresence>
            
            {/* Corner decorations */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-0 left-0 w-16 h-px bg-white/30" />
            <div className="absolute top-0 left-0 w-px h-16 bg-white/30" />
            <div className="absolute bottom-0 right-0 w-16 h-px bg-white/30" />
            <div className="absolute bottom-0 right-0 w-px h-16 bg-white/30" />

            {/* Item number */}
            <div className="absolute top-6 left-6 text-7xl sm:text-8xl font-black text-white/10">
              {String(activeItem + 1).padStart(2, "0")}
            </div>

            {/* Plus button */}
            <div className="absolute bottom-6 right-6">
              <button className="w-14 h-14 bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors">
                <HiPlus size={20} />
              </button>
            </div>
          </m.div>

          {/* Content Section */}
          <div className="space-y-6">
            {showcaseItems.map((item, index) => (
              <m.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group cursor-pointer border-l-2 transition-all duration-500 ${
                  activeItem === index
                    ? "border-white pl-6"
                    : "border-white/10 pl-6 hover:border-white/30"
                }`}
                onClick={() => setActiveItem(index)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] text-white/40 block mb-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-medium transition-colors duration-300 ${
                        activeItem === index ? "text-white" : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Show content (Image + Description) only for active item */}
                <AnimatePresence>
                  {activeItem === index && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {/* --- MOBILE VERSION IMAGE ---
                         This image block is 'lg:hidden', meaning it only shows on mobile.
                         It appears right above the text when the user clicks.
                      */}
                      <div className="relative w-full aspect-[4/3] mt-4 mb-4 lg:hidden bg-white/5">
                         <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            unoptimized
                         />
                      </div>

                      {item.description && (
                        <p className="text-sm text-white/50 leading-relaxed mt-3 mb-4">
                          {item.description}
                        </p>
                      )}
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}