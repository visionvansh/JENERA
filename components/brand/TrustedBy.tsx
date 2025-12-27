//Volumes/vision/codes/fearyah/my-app/components/brand/TrustedBy.tsx
"use client";

import { m } from "framer-motion";
import Image from "next/image";

const TRUSTED_COMPANIES = [
  { name: "Vogue", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/VOGUE_LOGO.svg" },
  { name: "Nordstrom", logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/Nordstrom_Logo_2019.svg" },
  { name: "Saks Fifth Avenue", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Saks_Fifth_Avenue_Logo_Horizontal_2007.svg" },
  { name: "Bergdorf Goodman", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bergdorf_Goodman_Logo.svg" },
  { name: "Harrods", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Harrods_logo.png" },
  { name: "Selfridges", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Selfridges_logo.svg" },
  { name: "Bloomingdale's", logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Bloomingdale%27s_Logo.svg" },
  { name: "Neiman Marcus", logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/Neiman_Marcus_logo_black.svg" },
  { name: "Farfetch", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Farfetch_logo_2020.svg" },
  { name: "Macy's", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Macy%27s_logo.svg" },
  { name: "Galeries Lafayette", logo: "/logouse.png" },
  { name: "Barneys New York", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Barneys_New_York_Logo.svg" },
  { name: "Lord & Taylor", logo: "https://upload.wikimedia.org/wikipedia/commons/d/db/Lord_%26_Taylor_2015_logo_2.svg" },
  { name: "Dillard's", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Dillard%27s_Logo.svg" },
];

// Duplicate for seamless infinite scroll
const INFINITE_LOGOS = [...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES];

export function TrustedBy() {
  return (
    <section
      className="py-5 sm:py-12 lg:py-12 bg-black relative overflow-hidden border-y border-white/5"
      aria-labelledby="trusted-heading"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-light block mb-3 sm:mb-4">
            INDUSTRY LEADERS
          </span>
          <h2
            id="trusted-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            TRUSTED
            <span className="font-extralight text-white/60 ml-2 sm:ml-3">BY</span>
          </h2>
        </m.div>

        {/* Infinite Scrolling Logos */}
        <div className="relative overflow-hidden py-4 lg:py-6">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="overflow-hidden flex">
            <m.div
              className="flex gap-8 sm:gap-12 lg:gap-16 items-center w-max"
              // FIX: Use strings for both values to ensure interpolation works
              // FIX: Move -33.33% (1/3rd) because you have 3 sets of logos. 
              // Moving 50% would cause a visual jump on reset.
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {INFINITE_LOGOS.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-shrink-0 relative h-10 sm:h-12 lg:h-14 w-28 sm:w-32 lg:w-36 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain filter brightness-0 invert hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
                  />
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}