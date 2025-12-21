// src/components/brand/BrandStory.tsx
"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";
import { IoShirtOutline, IoEarthOutline } from "react-icons/io5";

const storyData = {
  heading: "ABOUT US",
  subheading: "Crafting Elegance",
  description: "Our clothing line combines trendy styles with unparalleled comfort and quality, perfect for every occasion.",
  stat1: { value: "100%", label: "Sustainable Sourcing" },
  stat2: { value: "50+", label: "Global Cities" },
  stat3: { value: "10K+", label: "Happy Customers" },
  heroImage: "/cloth26.png",
  secondaryImage: "/cloth28.png",
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const textSlideVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function BrandStory() {
  return (
    <section 
      id="about" 
      className="py-8 sm:py-12 lg:py-16 bg-neutral-950 relative overflow-hidden" // TIGHT PADDING
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8 lg:mb-10" // TIGHT MARGIN
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-light block mb-2 sm:mb-3">
            OUR STORY
          </span>
          <h2
            id="about-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            {storyData.heading}
            <span className="font-extralight text-white/60 ml-2 sm:ml-3 block sm:inline mt-1 sm:mt-0">
              {storyData.subheading}
            </span>
          </h2>
        </m.div>

        <m.div 
          className="block sm:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <m.div 
            variants={mobileItemVariants}
            className="bg-black border border-white/5 text-white p-6 rounded-sm relative overflow-hidden group"
          >
            {/* Mobile Content same as before */}
            <div>
              <div className="flex items-center gap-2 text-white/40 mb-4">
                <HiSparkles className="text-white/60" size={14} />
                <span className="text-[10px] tracking-[0.25em] uppercase">Est. 2015</span>
              </div>
              <m.h3 variants={textSlideVariants} className="text-2xl font-black tracking-tight mb-4 leading-[1.1]">
                {storyData.heading}
              </m.h3>
              <m.p variants={textSlideVariants} className="text-white/60 text-sm leading-relaxed mb-6">
                {storyData.description}
              </m.p>
              <m.div variants={textSlideVariants} className="flex flex-col gap-4 mt-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <IoShirtOutline className="text-white/60" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Premium</p>
                    <p className="text-sm text-white font-semibold">Quality</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <IoEarthOutline className="text-white/60" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Global</p>
                    <p className="text-sm text-white font-semibold">Reach</p>
                  </div>
                </div>
              </m.div>
            </div>
            <div className="mt-8">
              <a href="/about" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 hover:text-white transition-all duration-300 group/link">
                Read The Full Story <HiArrowRight className="group-hover/link:translate-x-2 transition-transform" size={14} />
              </a>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-0 left-0 w-8 h-px bg-white/10" />
            <div className="absolute top-0 left-0 w-px h-8 bg-white/10" />
          </m.div>
        </m.div>

        <m.div 
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4" // TIGHTER GAP
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          <m.div 
            variants={mobileItemVariants}
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-black border border-white/5 text-white p-6 lg:p-8 rounded-sm flex flex-col justify-between relative overflow-hidden group min-h-[420px] lg:min-h-0"
          >
            <div>
              <div className="flex items-center gap-2 text-white/40 mb-6">
                <HiSparkles className="text-white/60" size={14} />
                <span className="text-[10px] tracking-[0.3em] uppercase">Est. 2015</span>
              </div>
              <m.h3 variants={textSlideVariants} className="text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
                {storyData.heading}
              </m.h3>
              <m.p variants={textSlideVariants} className="text-white/60 text-base leading-relaxed max-w-lg mb-8">
                {storyData.description}
              </m.p>
              <m.div variants={textSlideVariants} className="flex gap-6 mt-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <IoShirtOutline className="text-white/60" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Premium</p>
                    <p className="text-sm text-white font-semibold">Quality</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <IoEarthOutline className="text-white/60" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Global</p>
                    <p className="text-sm text-white font-semibold">Reach</p>
                  </div>
                </div>
              </m.div>
            </div>
            <div className="mt-8">
              <a href="/about" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80 hover:text-white transition-all duration-300 group/link">
                Read The Full Story <HiArrowRight className="group-hover/link:translate-x-2 transition-transform" size={14} />
              </a>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-0 left-0 w-12 h-px bg-white/10" />
            <div className="absolute top-0 left-0 w-px h-12 bg-white/10" />
          </m.div>

          <m.div 
            variants={mobileItemVariants}
            className="sm:col-span-1 lg:row-span-2 relative rounded-sm overflow-hidden h-[380px] md:h-[400px] lg:h-auto lg:min-h-0 group"
          >
            <Image
              src={storyData.heroImage}
              alt="JENERA fashion movement"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm px-4 py-3 border border-white/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">The New Standard</span>
              </div>
            </div>
            <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </m.div>

          <m.div 
            variants={mobileItemVariants}
            className="bg-neutral-900 border border-white/5 p-8 rounded-sm flex flex-col justify-center relative overflow-hidden group min-h-[160px]"
          >
            <div>
              <span className="block text-5xl font-black text-white mb-2">{storyData.stat1.value}</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 leading-tight">{storyData.stat1.label}</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 group-hover:bg-white/20 transition-colors duration-500" />
          </m.div>

          <m.div 
            variants={mobileItemVariants}
            className="relative rounded-sm overflow-hidden h-[160px] md:h-[200px] lg:h-auto lg:min-h-0 group"
          >
            <Image
              src={storyData.secondaryImage}
              alt="Material detail and craftsmanship"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center">
              <span className="text-white font-mono uppercase tracking-[0.25em] text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 px-2 text-center">
                Obsessive Detail
              </span>
            </div>
          </m.div>

          <m.div 
            variants={mobileItemVariants}
            className="bg-neutral-900 border border-white/5 p-8 rounded-sm flex flex-col justify-center relative overflow-hidden group min-h-[160px]"
          >
            <div>
              <span className="block text-5xl font-black text-white mb-2">{storyData.stat2.value}</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 leading-tight">{storyData.stat2.label}</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 group-hover:bg-white/20 transition-colors duration-500" />
          </m.div>

          <m.div 
            variants={mobileItemVariants}
            className="bg-neutral-900 border border-white/5 p-8 rounded-sm flex flex-col justify-center relative overflow-hidden group min-h-[160px]"
          >
            <div>
              <span className="block text-5xl font-black text-white mb-2">{storyData.stat3.value}</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 leading-tight">{storyData.stat3.label}</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 group-hover:bg-white/20 transition-colors duration-500" />
          </m.div>

        </m.div>
      </div>
    </section>
  );
}