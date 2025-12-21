//Volumes/vision/codes/jenara/my-app/components/product/ProductPageClient.tsx
"use client";

import { useState, useEffect } from "react";
// FIX 1: Import 'm' instead of 'motion'
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  HiArrowRight,
  HiHeart,
  HiOutlineHeart,
  HiMinus,
  HiPlus,
  HiStar,
  HiTruck,
  HiShieldCheck,
  HiArrowPath,
  HiFire,
  HiCheckBadge,
  HiTableCells,
  HiArrowsPointingIn,
  HiChevronDown,
  HiPhoto,
  HiSquare2Stack, 
} from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { CommunityVideoCarousel } from "./CommunityVideoCarousel";
import { TestimonialsSection } from "../brand";
import { BrandStory } from "../brand";
import { MustHaveProducts } from "../brand";

// --- Data & Constants ---

const TRUSTED_COMPANIES = [
  {
    name: "Vogue",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/VOGUE_LOGO.svg",
  },
  {
    name: "Nordstrom",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/Nordstrom_Logo_2019.svg",
  },
  {
    name: "Saks Fifth Avenue",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Saks_Fifth_Avenue_Logo_Horizontal_2007.svg",
  },
  {
    name: "Bergdorf Goodman",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bergdorf_Goodman_Logo.svg",
  },
  {
    name: "Harrods",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Harrods_logo.png",
  },
  {
    name: "Selfridges",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Selfridges_logo.svg",
  },
  {
    name: "Bloomingdale's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Bloomingdale%27s_Logo.svg",
  },
  {
    name: "Neiman Marcus",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/Neiman_Marcus_logo_black.svg",
  },
  {
    name: "Farfetch",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Farfetch_logo_2020.svg",
  },
  {
    name: "Macy's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Macy%27s_logo.svg",
  },
  {
    name: "Barneys New York",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Barneys_New_York_Logo.svg",
  },
  {
    name: "Lord & Taylor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/db/Lord_%26_Taylor_2015_logo_2.svg",
  },
  {
    name: "Dillard's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Dillard%27s_Logo.svg",
  },
];

const INFINITE_LOGOS = [
  ...TRUSTED_COMPANIES,
  ...TRUSTED_COMPANIES,
  ...TRUSTED_COMPANIES,
];

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  images: string[];
  category: string;
  inventory: number;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  fit: string;
  shipping: string;
}

// --- Helper Components ---

const CountdownTimer = ({ hours }: { hours: number }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + hours);

    const calculateTime = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);
        setTimeLeft(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`
        );
      } else {
        setTimeLeft("EXPIRED");
      }
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, [hours]);

  if (!timeLeft) return null;
  return <span className="tabular-nums">{timeLeft}</span>;
};

const AccordionItem = ({
  title,
  children,
  isOpen,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between group"
      >
        <span className="text-sm font-medium text-white tracking-widest uppercase group-hover:text-white/80 transition-colors">
          {title}
        </span>
        <HiChevronDown
          className={`w-5 h-5 text-white/60 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          // FIX 2: motion.div -> m.div
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm text-white/60 leading-relaxed">
              {children}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- NEW COMPONENT: Instagram Style Community Card ---
const InstagramCommunityCard = () => {
  return (
    <div className="w-full max-w-[320px] mx-auto lg:mx-0">
      {/* Header: Logo & Username */}
      <div className="flex items-center gap-3 mb-4">
        {/* Instagram Gradient Ring */}
        <div className="relative w-12 h-12 p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500">
          <div className="w-full h-full rounded-full bg-black p-[2px]">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white/10">
              <Image
                src="/logo.png"
                alt="Brand Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Username & Blue Tick */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-white tracking-tight">
              jenera
            </span>
            <HiCheckBadge className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-[10px] text-white/40">@jenera</span>
        </div>
      </div>

      {/* Post Content: 2 Squares */}
      <div className="grid grid-cols-2 gap-2">
        {/* Square 1 */}
        <div className="relative aspect-square bg-neutral-800 rounded-sm flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
          <Image
            src="/cloth21.png"
            alt="Brand Logo"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 p-1">
            <HiSquare2Stack className="w-5 h-5 text-white drop-shadow-md" />
          </div>
        </div>

        {/* Square 2 */}
        <div className="relative aspect-square bg-neutral-800 rounded-sm flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
          <Image
            src="/cloth22.png"
            alt="Brand Logo"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 p-1">
            <HiSquare2Stack className="w-5 h-5 text-white drop-shadow-md" />
          </div>
        </div>

        <div className="relative aspect-square bg-neutral-800 rounded-sm flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
          <Image
            src="/cloth24.png"
            alt="Brand Logo"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 p-1">
            <HiSquare2Stack className="w-5 h-5 text-white drop-shadow-md" />
          </div>
        </div>

        <div className="relative aspect-square bg-neutral-800 rounded-sm flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
          <Image
            src="/cloth27.png"
            alt="Brand Logo"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 p-1">
            <HiSquare2Stack className="w-5 h-5 text-white drop-shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export function ProductPageClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Accordion State
  const [openSection, setOpenSection] = useState<string | null>("size");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const customerAvatars = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026302d",
    "https://i.pravatar.cc/150?u=a04258114e29026702d",
  ];

  const paymentIcons = [
    {
      name: "Klarna",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Klarna_Wordmark_Transparent_And_Black_v2.svg/2560px-Klarna_Wordmark_Transparent_And_Black_v2.svg.png",
    },
    {
      name: "Visa",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
    },
    {
      name: "Mastercard",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
    },
    {
      name: "Maestro",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Maestro_2016.svg/1280px-Maestro_2016.svg.png",
    },
    {
      name: "Apple Pay",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png",
    },
    {
      name: "Google Pay",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",
    },
    {
      name: "Amex",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      {/* FIX 3: motion.nav -> m.nav */}
      <m.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-xs tracking-[0.2em] uppercase"
      >
        <Link
          href="/"
          className="text-white/40 hover:text-white transition-colors"
        >
          Home
        </Link>
        <span className="mx-3 text-white/20">/</span>
        <Link
          href="/shop"
          className="text-white/40 hover:text-white transition-colors"
        >
          Shop
        </Link>
        <span className="mx-3 text-white/20">/</span>
        <span className="text-white">{product.name}</span>
      </m.nav>

      {/* Product Grid */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
        {/* Image Gallery Column */}
        {/* FIX 4: motion.div -> m.div */}
        <m.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Main Image */}
          <div className="relative aspect-[3/4] bg-neutral-900 border border-white/5 overflow-hidden group">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-square bg-neutral-900 border overflow-hidden transition-all duration-300 ${
                  selectedImage === idx
                    ? "border-white"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 25vw, 12vw"
                />
              </button>
            ))}
          </div>

          {/* Social Proof Section */}
          {/* FIX 5: motion.div -> m.div */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            {/* Review Stars Bar */}
            <div className="flex items-center gap-3 mb-4 pl-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <HiStar key={i} className="w-4 h-4 text-white fill-current" />
                ))}
                <div className="relative w-4 h-4">
                  <HiStar className="absolute inset-0 text-white/30 fill-current" />
                  <div className="absolute inset-0 overflow-hidden w-[70%]">
                    <HiStar className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
              </div>
              <span className="text-white font-bold text-sm">4.7</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-medium ml-1">
                BASED ON 250+ REVIEWS
              </span>
            </div>

            {/* Shoppers Highlight Section */}
            <div className="flex flex-row items-center gap-4 p-3 sm:p-4 rounded-xl bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
              <div className="flex -space-x-3 rtl:space-x-reverse shrink-0 pl-1">
                {customerAvatars.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-neutral-900 overflow-hidden ring-1 ring-white/20"
                  >
                    <Image
                      src={src}
                      alt="Customer"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed">
                  <span className="font-bold text-white">Olivia, Louise</span>
                  <HiCheckBadge className="inline-block w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mx-1 align-text-top" />
                  <span className="text-white/60">and</span>{" "}
                  <span className="font-bold text-white">1,305 others</span>{" "}
                  <span className="text-white/60 block sm:inline">
                    stylish customers, have already shopped with us in the last
                    2 weeks.
                  </span>
                </p>
              </div>
            </div>
          </m.div>
        </m.div>

        {/* Product Info Column */}
        {/* FIX 6: motion.div -> m.div */}
        <m.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Header Section */}
          <div className="space-y-3 sm:space-y-4">
            {/* Category & Favorite - HIDDEN ON MOBILE */}
            <div className="hidden sm:flex items-center justify-between">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                {product.category}
              </span>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 border border-white/10 hover:border-white/30 transition-colors"
                aria-label="Add to favorites"
              >
                {isFavorite ? (
                  <HiHeart className="w-5 h-5 text-red-500" />
                ) : (
                  <HiOutlineHeart className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center sm:gap-4 w-full">
              <span className="text-lg sm:text-xl text-white/40 line-through">
                ${product.originalPrice}
              </span>
              {product.originalPrice && (
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    ${product.price}
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-500 text-[10px] sm:text-xs font-bold tracking-wider">
                    SAVE ${product.originalPrice - product.price}
                  </span>
                </div>
              )}
            </div>

            {/* Taxes */}
            <p className="text-[10px] text-white/40 leading-none">
              Taxes included. Shipping calculated at checkout.
            </p>

            {/* Flash Sale Timer */}
            {product.badge === "Flash Sale" && (
              <div className="flex items-center gap-2 text-red-400 p-2 sm:p-4 border border-red-500/20 bg-red-500/5">
                <IoTimeOutline className="animate-pulse text-sm sm:text-lg" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                  Flash Sale Ends In: <CountdownTimer hours={4} />
                </span>
              </div>
            )}

            {/* Size Chart Icon */}
            <button className="flex items-center gap-2 text-xs text-white hover:text-white/80 transition-colors pt-1">
              <HiTableCells className="w-4 h-4" />
              <span className="underline underline-offset-4">Size Chart</span>
            </button>

            {/* Benefits Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
                  <HiTruck className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-white/90 font-medium">
                  Free Shipping and Returns
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
                  <HiShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-white/90 font-medium">
                  30 Day Money Back Guarantee
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
                  <HiArrowsPointingIn className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-white/90 font-medium">
                  Waist Shaping
                </span>
              </div>
            </div>
            {/* End Benefits Section */}
          </div>

          {/* Description - HIDDEN ON MOBILE */}
          <p className="hidden sm:block text-sm text-white/60 leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-white/10 pt-6 space-y-6">
            {/* Color Selection */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-white/60 mb-3">
                Color:{" "}
                <span className="text-white font-medium">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all ${
                      selectedColor === color
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-white hover:border-white/40"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs tracking-[0.2em] uppercase text-white/60">
                  Size:{" "}
                  {selectedSize && (
                    <span className="text-white font-medium">
                      {selectedSize}
                    </span>
                  )}
                </label>
                <button className="text-xs text-white/60 hover:text-white underline underline-offset-2">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs tracking-wider uppercase border transition-all ${
                      selectedSize === size
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-white hover:border-white/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="space-y-4 pt-4">
              {/* Stock Warning */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-xs sm:text-xs font-bold text-red-500 tracking-wide uppercase">
                  Only a few pieces left in stock
                </span>
              </div>

              {/* Add To Cart Button */}
              <button
                disabled={!selectedSize}
                className="w-full py-4 bg-white text-black text-sm tracking-[0.2em] uppercase font-bold hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl"
              >
                {selectedSize ? "Add to Cart" : "Select Size"}
              </button>

              {/* Payment Icons (UPDATED: Actual Colors) */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {paymentIcons.map((icon) => (
                  <div
                    key={icon.name}
                    className="h-8 w-10 relative bg-white rounded p-1 shadow-sm"
                  >
                    <img
                      src={icon.src}
                      alt={icon.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </m.div>
      </div>

      {/* Accordion Details Section (Replaces Tabs) */}
      {/* FIX 7: motion.div -> m.div */}
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 border-t border-white/10 pt-4"
      >
        <div className="max-w-3xl">
          <AccordionItem
            title="Size Recommendation"
            isOpen={openSection === "size"}
            onClick={() => toggleSection("size")}
          >
            <p>
              Fits true to size. We recommend taking your normal size. The model
              is 178cm/5'10" and is wearing a size S.
            </p>
          </AccordionItem>

          <AccordionItem
            title="Shipping Details"
            isOpen={openSection === "shipping"}
            onClick={() => toggleSection("shipping")}
          >
            <p>{product.shipping}</p>
            <p className="mt-2">Standard delivery: 3-5 business days.</p>
            <p>Express delivery: 1-2 business days available at checkout.</p>
          </AccordionItem>

          <AccordionItem
            title="Return & Exchange"
            isOpen={openSection === "return"}
            onClick={() => toggleSection("return")}
          >
            <p>
              We offer easy 30-day returns and exchanges. Items must be unworn,
              unwashed, and with original tags attached.
            </p>
          </AccordionItem>
        </div>
      </m.div>

      {/* TRUSTED BY SECTION */}
      <section
        className=" bg-black relative overflow-hidden mb-6 "
        aria-labelledby="trusted-heading"
      >
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10">
          {/* FIX 8: motion.div -> m.div */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2
              id="trusted-heading"
              className="text-2xl sm:text-3xl font-black text-white tracking-tight"
            >
              TRUSTED <span className="font-extralight text-white/60">BY</span>
            </h2>
          </m.div>

          <div className="relative overflow-hidden sm:py-6">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              {/* FIX 9: motion.div -> m.div */}
              <m.div
                className="flex gap-8 sm:gap-12 lg:gap-16 items-center w-max"
                animate={{ x: [0, "-50%"] }}
                transition={{
                  x: {
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  },
                }}
              >
                {INFINITE_LOGOS.map((company, index) => (
                  <div
                    key={`${company.name}-${index}`}
                    className="flex-shrink-0 relative h-10 sm:h-12 w-30 sm:w-35 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  >
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain filter brightness-0 invert hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 120px, 160px"
                    />
                  </div>
                ))}
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN OUR COMMUNITY SECTION */}
      <div className="pb-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Call to Action + Instagram Mockup */}

          {/* Right Side: Video Carousel */}
          <div className="w-full lg:w-2/3">
            <CommunityVideoCarousel />
          </div>
        </div>
      </div>

      <div className="pb-4 mb-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Call to Action + Instagram Mockup */}

          <div className="w-full lg:w-1/3 space-y-8 ">
            {/* The Requested Instagram Component */}
            <InstagramCommunityCard />
          </div>
        </div>
      </div>


    <div className="">
        <BrandStory />
      </div>
                   <div className="mb-4">
        <TestimonialsSection />
      </div>

       <div className="mb-4 mt-[-22]">
        <MustHaveProducts />
      </div>
      


    </div>
  );
}