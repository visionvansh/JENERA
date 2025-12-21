// src/components/brand/FeaturedCollection.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiArrowLeft, HiFire } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";

// ... [Keep helper functions and data arrays as they are] ...
const getFutureDate = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Essential Oversized Tee",
    price: 89,
    originalPrice: 110,
    category: "Tops",
    color: "Charcoal",
    image: "/cloth16.png",
    inventory: 4, 
    saleEnds: getFutureDate(4),
  },
  {
    id: 2,
    name: "Structured Wool Blazer",
    price: 329,
    category: "Outerwear",
    color: "Black",
    image: "/cloth17.png",
    badge: "Best Seller",
    inventory: 15,
  },
  {
    id: 3,
    name: "Tailored Wide Trousers",
    price: 189,
    category: "Bottoms",
    color: "Ivory",
    image: "/cloth18.png",
    inventory: 42,
  },
  {
    id: 4,
    name: "Merino Knit Sweater",
    price: 219,
    originalPrice: 280,
    category: "Knitwear",
    color: "Graphite",
    image: "/cloth19.png",
    badge: "Flash Deal",
    saleEnds: getFutureDate(2),
    inventory: 8,
  },
  {
    id: 5,
    name: "Canvas Utility Jacket",
    price: 279,
    category: "Outerwear",
    color: "Off-White",
    image: "/cloth20.png",
    inventory: 2, 
  },
  {
    id: 6,
    name: "Relaxed Fit Shirt",
    price: 129,
    category: "Shirts",
    color: "Cream",
    image: "/cloth21.png",
    inventory: 20,
  },
  {
    id: 7,
    name: "Linen Blend Overshirt",
    price: 145,
    category: "Shirts",
    color: "Sage",
    image: "/cloth22.png",
    inventory: 12,
  },
];

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setTimeLeft("EXPIRED");
      }
    };
    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, [targetDate]);
  if (!timeLeft) return null;
  return <span className="tabular-nums">{timeLeft}</span>;
};

export function FeaturedCollection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth / 2;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="collections"
      className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden" // TIGHT PADDING
      aria-labelledby="collections-heading"
    >
      <div className="absolute inset-0 opacity-[0.02]">
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
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8" // TIGHT MARGIN
        >
          <div>
            <span className="text-[10px] sm:text-xs tracking-[0.4em] text-white/40 font-light block mb-3">
              NEW ARRIVALS
            </span>
            <h2
              id="collections-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
            >
              FEATURED
              <span className="font-extralight text-white/60 ml-3">PIECES</span>
            </h2>
          </div>

          <div className="flex gap-3 mt-6 sm:mt-0 z-20">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? "border-white/30 text-white hover:bg-white hover:text-black cursor-pointer"
                  : "border-white/10 text-white/20 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <HiArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? "border-white/30 text-white hover:bg-white hover:text-black cursor-pointer"
                  : "border-white/10 text-white/20 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <HiArrowRight size={18} />
            </button>
          </div>
        </m.div>

        <div className="relative group/carousel">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none transition-opacity duration-300 opacity-100" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none transition-opacity duration-300 opacity-100" />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              scrollBehavior: "smooth"
            }}
          >
            {FEATURED_PRODUCTS.map((product, index) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <m.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[380px] group cursor-pointer snap-start relative flex flex-col h-full"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-4 border border-white/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 380px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1.5 bg-white text-black text-[10px] tracking-[0.15em] uppercase font-bold shadow-lg">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {!product.badge && (
                      <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] text-white/50">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                      <button className="w-full py-3 bg-white text-black text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-200 transition-colors shadow-xl">
                        Quick Add
                      </button>
                    </div>
                    <div className="absolute top-0 left-0 w-8 h-px bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
                    <div className="absolute top-0 left-0 w-px h-8 bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
                    <div className="absolute bottom-0 right-0 w-8 h-px bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
                    <div className="absolute bottom-0 right-0 w-px h-8 bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
                  </div>

                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                        {product.category}
                      </span>
                      {product.inventory && product.inventory < 10 && (
                         <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-wider animate-pulse">
                           <HiFire /> Only {product.inventory} Left
                         </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base text-white font-medium group-hover:text-white/80 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap items-center justify-between gap-y-2">
                      <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-white">
                          ${product.price}
                          </span>
                          {product.originalPrice && (
                          <span className="text-xs text-white/40 line-through">
                              ${product.originalPrice}
                          </span>
                          )}
                      </div>
                      {product.saleEnds && (
                          <div className="flex items-center gap-1.5 text-red-400">
                          <IoTimeOutline className="animate-pulse text-sm" />
                          <span className="text-[10px] font-bold tracking-widest uppercase">
                              Ends <CountdownTimer targetDate={product.saleEnds} />
                          </span>
                          </div>
                      )}
                    </div>
                  </div>
                </m.article>
              </Link>
            ))}
          </div>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 sm:mt-8" // TIGHT MARGIN
        >
          <a
            href="/collections"
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors group"
          >
            View All Products
            <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </m.div>
      </div>
    </section>
  );
}