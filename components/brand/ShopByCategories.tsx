// src/components/brand/ShopByCategories.tsx
"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";

const CATEGORIES = [
  {
    id: 1,
    name: "Dresses",
    description: "Coats, Jackets & Blazers",
    itemCount: 48,
    image: "/cloth12.png",
    size: "large",
  },
  {
    id: 2,
    name: "Fall Collection",
    description: "Sweaters & Cardigans",
    itemCount: 36,
    image: "/cloth13.png",
    size: "small",
  },
  {
    id: 3,
    name: "Co-ords",
    description: "Casual & Formal",
    itemCount: 52,
    image: "/cloth14.png",
    size: "small",
  },
  {
    id: 4,
    name: "Tops",
    description: "Tailored & Relaxed",
    itemCount: 44,
    image: "/cloth15.png",
    size: "medium",
  },
  {
    id: 5,
    name: "Bikinis and Covers",
    description: "Bags, Scarves & More",
    itemCount: 67,
    image: "/cloth3.png",
    size: "medium",
  },

];

export function ShopByCategories() {
  return (
    <section
      id="categories"
      className="py-8 sm:py-12 lg:py-16 bg-neutral-950 relative overflow-hidden" // TIGHT PADDING
      aria-labelledby="categories-heading"
    >
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
              EXPLORE
            </span>
            <h2
              id="categories-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
            >
              SHOP BY
              <span className="font-extralight text-white/60 ml-3">CATEGORY</span>
            </h2>
          </div>
          <a
            href="/categories"
            className="mt-6 sm:mt-0 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors group"
          >
            All Categories
            <HiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </m.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <m.a
            href={`/category/${CATEGORIES[0].name.toLowerCase()}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 row-span-2 group cursor-pointer relative overflow-hidden"
          >
            <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] sm:min-h-[500px]">
              <Image
                src={CATEGORIES[0].image}
                alt={CATEGORIES[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-[10px] tracking-[0.2em] text-white/60 uppercase block mb-2">
                  {CATEGORIES[0].itemCount} Items
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1">
                  {CATEGORIES[0].name}
                </h3>
                <p className="text-sm text-white/60">{CATEGORIES[0].description}</p>
                
                <div className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white group-hover:text-white/80 transition-colors">
                  Explore
                  <HiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>

              <div className="absolute top-6 right-6 w-12 h-12 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <HiArrowUpRight className="text-white" />
              </div>
            </div>
          </m.a>

          {CATEGORIES.slice(1).map((category, index) => (
            <m.a
              href={`/category/${category.name.toLowerCase()}`}
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              className="group cursor-pointer relative overflow-hidden"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <span className="text-[10px] tracking-[0.2em] text-white/60 uppercase block mb-1">
                    {category.itemCount} Items
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                    {category.name}
                  </h3>
                  <p className="text-xs text-white/50 hidden sm:block">{category.description}</p>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 bg-white/0 group-hover:bg-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <HiArrowUpRight className="text-black text-sm" />
                </div>
              </div>
            </m.a>
          ))}
        </div>
      </div>
    </section>
  );
}