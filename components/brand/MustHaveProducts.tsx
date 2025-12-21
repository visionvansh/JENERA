// src/components/brand/MustHaveProducts.tsx
"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiArrowRight, HiFire, HiEye } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";

// ... [Helper functions and data arrays remain unchanged] ...
const getFutureDate = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

const MUST_HAVE_PRODUCTS = [
  {
    id: 1,
    name: "Classic Wool Overcoat",
    price: 495,
    originalPrice: 650,
    badge: "Best Seller",
    image: "/cloth1.jpg",
    category: "Outerwear",
    inventory: 5,
    saleEnds: getFutureDate(3),
  },
  {
    id: 2,
    name: "Cashmere Turtleneck",
    price: 285,
    originalPrice: 350,
    badge: "Flash Sale",
    image: "/cloth2.png",
    category: "Knitwear",
    saleEnds: getFutureDate(5),
    inventory: 4,

  },
  {
    id: 3,
    name: "Tailored Wool Trousers",
    price: 195,
    image: "/cloth8.png",
    category: "Bottoms",
    inventory: 6,
  },
  {
    id: 4,
    name: "Silk Blend Shirt",
    price: 175,
    badge: "Limited",
    image: "/cloth4.png",
    category: "Tops",
    inventory: 3,
  },
  {
    id: 5,
    name: "Silk Blend Shirt",
    price: 175,
    badge: "Limited",
    image: "/cloth5.png",
    category: "Tops",
    inventory: 2,

  },
  {
    id: 6,
    name: "Silk Blend Shirt",
    price: 175,
    badge: "Limited",
    image: "/cloth6.png",
    category: "Tops",
    inventory: 7,
  },
  {
    id: 7,
    name: "Silk Blend Shirt",
    price: 175,
    badge: "Limited",
    image: "/cloth7.png",
    category: "Tops",
    inventory: 8,
  },
];

const DESKTOP_MARQUEE_LIST = [...MUST_HAVE_PRODUCTS, ...MUST_HAVE_PRODUCTS];

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

const ProductCard = ({ product }: { product: any }) => {
  return (
    <article className="group cursor-pointer w-[280px] sm:w-[320px] flex-shrink-0 relative flex flex-col h-full">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-4 border border-white/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
          {product.badge && (
            <span className="px-3 py-1 bg-white text-black text-[10px] tracking-[0.15em] uppercase font-bold shadow-lg">
              {product.badge}
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
          <button className="w-full py-3 bg-white text-black text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-200 transition-colors shadow-xl">
            Add to Bag
          </button>
        </div>
        <div className="absolute top-0 left-0 w-8 h-px bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
        <div className="absolute top-0 left-0 w-px h-8 bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-8 h-px bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-px h-8 bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
      </div>

      <div className="space-y-2.5 flex-1">
        <div className="flex justify-between items-start">
          <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
            {product.category}
          </span>
          {product.inventory < 10 && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-wider animate-pulse">
              <HiFire /> Only {product.inventory} Left
            </span>
          )}
        </div>
        <h3 className="text-sm sm:text-base text-white font-medium group-hover:text-white/80 transition-colors leading-tight">
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
      </div>
    </article>
  );
};

export function MustHaveProducts() {
  return (
    <section
      id="must-have"
      className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden" // TIGHT PADDING
      aria-labelledby="must-have-heading"
    >
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .pause-on-hover:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8" // TIGHT MARGIN
          >
            <span className="text-[10px] sm:text-xs tracking-[0.4em] text-white/40 font-light block mb-4">
              CURATED SELECTION
            </span>
            <h2
              id="must-have-heading"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight"
            >
              MUST HAVE
              <span className="font-extralight text-white/60 ml-3">PIECES</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/40 max-w-xl mx-auto">
              Essential pieces that define modern elegance. Timeless designs
              crafted for everyday luxury.
            </p>
          </m.div>
        </div>

        <div className="w-full relative">
          <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 gap-4 pb-8">
            {MUST_HAVE_PRODUCTS.map((product) => (
              <div key={product.id} className="snap-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="hidden lg:block w-full overflow-hidden pause-on-hover">
            <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
              {DESKTOP_MARQUEE_LIST.map((product, index) => (
                <div key={`${product.id}-${index}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 sm:mt-8 container mx-auto px-4" // TIGHT MARGIN
        >
          <a
            href="/shop"
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors group"
          >
            Shop All Products
            <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </m.div>
      </div>
    </section>
  );
}