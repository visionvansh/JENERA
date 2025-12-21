// src/components/brand/ProductShowcase.tsx
"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiPlus } from "react-icons/hi2";

const SHOWCASE_ITEMS = [
  {
    id: 1,
    name: "The Essential Coat",
    description: "Handcrafted from premium Italian wool, designed to be your everyday companion through every season.",
    price: 495,
    features: ["Italian Wool", "Handcrafted", "Timeless Design"],
    image: "/cloth12.png",
  },
  {
    id: 2,
    name: "The Perfect Knit",
    description: "Luxuriously soft merino wool meets modern minimalism in our signature sweater.",
    price: 245,
    features: ["Merino Wool", "Breathable", "Temperature Regulating"],
    image: "/cloth2.png",
  },
  {
    id: 3,
    name: "The Statement Trouser",
    description: "Elevated everyday wear with impeccable tailoring and sustainable fabric choices.",
    price: 195,
    features: ["Organic Cotton", "Tailored Fit", "Versatile"],
    image: "/cloth20.png",
  },
];

export function ProductShowcase() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden"> 
      {/* TIGHT PADDING */}
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
          className="text-center mb-8 sm:mb-10" // TIGHT MARGIN
        >
          <span className="text-[10px] sm:text-xs tracking-[0.4em] text-white/40 font-light block mb-4">
            SIGNATURE PIECES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            CURATED <span className="font-extralight text-white/60">ESSENTIALS</span>
          </h2>
        </m.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"> 
          {/* TIGHT GAP */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] overflow-hidden"
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
                  src={SHOWCASE_ITEMS[activeItem].image}
                  alt={SHOWCASE_ITEMS[activeItem].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </m.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-0 left-0 w-16 h-px bg-white/30" />
            <div className="absolute top-0 left-0 w-px h-16 bg-white/30" />
            <div className="absolute bottom-0 right-0 w-16 h-px bg-white/30" />
            <div className="absolute bottom-0 right-0 w-px h-16 bg-white/30" />

            <div className="absolute top-6 left-6 text-7xl sm:text-8xl font-black text-white/10">
              {String(activeItem + 1).padStart(2, "0")}
            </div>

            <div className="absolute bottom-6 right-6">
              <button className="w-14 h-14 bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors">
                <HiPlus size={20} />
              </button>
            </div>
          </m.div>

          <div className="space-y-6">
            {SHOWCASE_ITEMS.map((item, index) => (
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
                      {item.name}
                    </h3>
                  </div>
                  <span
                    className={`text-lg font-light transition-colors duration-300 ${
                      activeItem === index ? "text-white" : "text-white/30"
                    }`}
                  >
                    ${item.price}
                  </span>
                </div>

                <AnimatePresence>
                  {activeItem === index && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-white/50 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feature, i) => (
                          <span
                            key={i}
                            className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border border-white/20 text-white/60"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
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