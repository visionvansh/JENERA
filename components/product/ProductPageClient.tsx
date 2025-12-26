// src/components/product/ProductPageClient.tsx
"use client"; 

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  HiHeart,
  HiOutlineHeart,
  HiStar,
  HiTruck,
  HiShieldCheck,
  HiCheckBadge,
  HiTableCells,
  HiArrowsPointingIn,
  HiChevronDown,
  HiSquare2Stack,
} from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { CommunityVideoCarousel } from "./CommunityVideoCarousel";
import { TestimonialsSection } from "../brand";
import { BrandStory } from "../brand";
import { MustHaveProducts } from "../brand";
import { ProductShowcase } from "../brand/ProductShowcase";
import { useCart } from '@/contexts/CartContext';

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

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface Product {
  id: string;
  handle: string;
  name: string;
  descriptionHtml: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  images: string[];
  category: string;
  inventory: number;
  sizes: string[];
  colors: string[];
  availableForSale: boolean;
  variants: ProductVariant[];
  saleEnds: string | null;
}

// --- Helper Components ---

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
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
  }, [targetDate]);

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

// --- Instagram Style Community Card ---
const InstagramCommunityCard = () => {
  return (
    <div className="w-full max-w-[320px] mx-auto lg:max-w-none lg:mx-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 lg:w-14 lg:h-14 p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500">
          <div className="w-full h-full rounded-full bg-black p-[2px]">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white/10">
              <Image
                src="/logo2.png"
                alt="Brand Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className="text-sm lg:text-base font-bold text-white tracking-tight">
              Fear Yah
            </span>
            <HiCheckBadge className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
          </div>
          <span className="text-[10px] lg:text-xs text-white/40">@fearyah</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:gap-3">
        <div className="relative aspect-square bg-neutral-800 rounded-sm flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
          <Image
            src="/landscape.png"
            alt="Brand Logo"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 p-1">
            <HiSquare2Stack className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-md" />
          </div>
        </div>

        <div className="relative aspect-square bg-neutral-800 rounded-sm flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
          <Image
            src="/landscape2.png"
            alt="Brand Logo"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 p-1">
            <HiSquare2Stack className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-md" />
          </div>
        </div>

        <div className="relative aspect-square bg-neutral-800 rounded-sm flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
          <Image
            src="/landscape3.png"
            alt="Brand Logo"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 p-1">
            <HiSquare2Stack className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-md" />
          </div>
        </div>

        <div className="relative aspect-square bg-neutral-800 rounded-sm flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
          <Image
            src="/cloth30.png"
            alt="Brand Logo"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 p-1">
            <HiSquare2Stack className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export function ProductPageClient({
  product,
}: {
  product: Product;
}) {
  const { addItem } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Debug: Log product data on client side
  useEffect(() => {
    console.log("=== CLIENT PRODUCT DATA ===");
    console.log("Product:", product.name);
    console.log("Sizes:", product.sizes);
    console.log("Colors:", product.colors);
    console.log("Variants:", product.variants.length);
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors.length > 0 ? product.colors[0] : "");
  const [isFavorite, setIsFavorite] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("size");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

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

  // Find the selected variant based on size and color
  const getSelectedVariant = (): ProductVariant | null => {
    if (!selectedSize && !selectedColor) return null;
    
    return product.variants.find(variant => {
      const sizeMatch = !selectedSize || variant.selectedOptions.some(
        opt => opt.name.toLowerCase() === 'size' && opt.value === selectedSize
      );
      const colorMatch = !selectedColor || variant.selectedOptions.some(
        opt => (opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'colour') && opt.value === selectedColor
      );
      return sizeMatch && colorMatch;
    }) || null;
  };

  const selectedVariant = getSelectedVariant();
  const variantPrice = selectedVariant 
    ? parseFloat(selectedVariant.price.amount) 
    : product.price;
  const variantCompareAtPrice = selectedVariant?.compareAtPrice 
    ? parseFloat(selectedVariant.compareAtPrice.amount) 
    : product.originalPrice;

  // Check if a specific size is available (considering selected color)
  const isSizeAvailable = (size: string): boolean => {
    const variant = product.variants.find(v => {
      const sizeMatch = v.selectedOptions.some(
        opt => opt.name.toLowerCase() === 'size' && opt.value === size
      );
      const colorMatch = !selectedColor || v.selectedOptions.some(
        opt => (opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'colour') && opt.value === selectedColor
      );
      return sizeMatch && colorMatch;
    });
    return variant?.availableForSale ?? true;
  };

  // Check if a specific color is available (considering selected size)
  const isColorAvailable = (color: string): boolean => {
    const variant = product.variants.find(v => {
      const colorMatch = v.selectedOptions.some(
        opt => (opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'colour') && opt.value === color
      );
      const sizeMatch = !selectedSize || v.selectedOptions.some(
        opt => opt.name.toLowerCase() === 'size' && opt.value === selectedSize
      );
      return colorMatch && sizeMatch;
    });
    return variant?.availableForSale ?? true;
  };

  // Determine if we need size selection for add to cart
  const needsSizeSelection = product.sizes.length > 0 && !selectedSize;
  const needsColorSelection = product.colors.length > 0 && !selectedColor;
  const canAddToCart = !needsSizeSelection && !needsColorSelection && product.availableForSale;

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!canAddToCart || !selectedVariant) return;

    setIsAddingToCart(true);

    try {
      // Add to local cart context
      addItem({
        variantId: selectedVariant.id,
        productId: product.id,
        name: product.name,
        price: variantPrice,
        quantity: 1,
        image: product.images[0],
        size: selectedSize || undefined,
        color: selectedColor || undefined,
      });

      // Optional: Show success message
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
      {/* Breadcrumb */}
      <m.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 lg:mb-8 text-xs tracking-[0.2em] uppercase"
      >
        <Link
          href="/"
          className="text-white/40 hover:text-white transition-colors"
        >
          Home
        </Link>
        <span className="mx-3 text-white/20">/</span>
        <Link
          href="/product"
          className="text-white/40 hover:text-white transition-colors"
        >
          Shop
        </Link>
        <span className="mx-3 text-white/20">/</span>
        <span className="text-white">{product.name}</span>
      </m.nav>

      {/* Product Grid */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16 mb-12 lg:mb-16">
        {/* Image Gallery Column */}
        <m.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 lg:space-y-6"
        >
          {/* Main Image */}
          <div className="relative aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4] bg-neutral-900 border border-white/5 overflow-hidden group">
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
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 lg:gap-4">
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
          )}
        </m.div>

        {/* Product Info Column */}
        <m.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5 lg:space-y-6 xl:space-y-7"
        >
          {/* Header Section */}
          <div className="space-y-3 sm:space-y-4">
            {/* Category & Favorite */}
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Social Proof Section */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-2 lg:pt-3"
            >
              {/* Review Stars Bar */}
              <div className="flex items-center gap-3 mb-3 lg:mb-4 pl-1">
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
              <div className="flex flex-row items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                <div className="flex -space-x-3 rtl:space-x-reverse shrink-0 pl-1">
                  {customerAvatars.map((src, i) => (
                    <div
                      key={i}
                      className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-neutral-900 overflow-hidden ring-1 ring-white/20"
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
                  <p className="text-[11px] lg:text-xs text-white/90 leading-relaxed">
                    <span className="font-bold text-white">Olivia, Louise</span>
                    <HiCheckBadge className="inline-block w-3 h-3 lg:w-4 lg:h-4 text-blue-400 mx-1 align-text-top" />
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

            {/* Price */}
            <div className="flex items-center gap-3 lg:gap-4 w-full pt-2">
              {variantCompareAtPrice && variantCompareAtPrice > variantPrice && (
                <span className="text-lg lg:text-xl xl:text-2xl text-white/40 line-through">
                  ${variantCompareAtPrice.toFixed(2)}
                </span>
              )}
              <div className="flex items-center gap-2 lg:gap-3">
                <span className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                  ${variantPrice.toFixed(2)}
                </span>
                {variantCompareAtPrice && variantCompareAtPrice > variantPrice && (
                  <span className="px-2 lg:px-3 py-1 bg-red-500/20 text-red-500 text-[10px] lg:text-xs font-bold tracking-wider">
                    SAVE ${(variantCompareAtPrice - variantPrice).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Taxes */}
            <p className="text-[10px] lg:text-xs text-white/40 leading-none">
              Taxes included. Shipping calculated at checkout.
            </p>

            {/* Flash Sale Timer */}
            {product.saleEnds && (
              <div className="flex items-center gap-2 text-red-400 p-3 lg:p-4 border border-red-500/20 bg-red-500/5">
                <IoTimeOutline className="animate-pulse text-base lg:text-lg" />
                <span className="text-xs lg:text-sm font-bold tracking-widest uppercase">
                  Sale Ends In: <CountdownTimer targetDate={product.saleEnds} />
                </span>
              </div>
            )}

            {/* Size Chart Icon */}
            {product.sizes.length > 0 && (
              <button className="flex items-center gap-2 text-xs lg:text-sm text-white hover:text-white/80 transition-colors pt-1">
                <HiTableCells className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="underline underline-offset-4">Size Chart</span>
              </button>
            )}

            {/* Benefits Section */}
            <div className="space-y-3 lg:space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 shrink-0">
                  <HiTruck className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <span className="text-sm lg:text-base text-white/90 font-medium">
                  Free Shipping and Returns
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 shrink-0">
                  <HiShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <span className="text-sm lg:text-base text-white/90 font-medium">
                  30 Day Money Back Guarantee
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5 lg:pt-6 space-y-5 lg:space-y-6">
            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-xs lg:text-sm tracking-[0.2em] uppercase text-white/60 mb-3">
                  Color:{" "}
                  <span className="text-white font-medium">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const available = isColorAvailable(color);
                    return (
                      <button
                        key={color}
                        onClick={() => available && setSelectedColor(color)}
                        disabled={!available}
                        className={`px-4 lg:px-5 py-2 lg:py-2.5 text-xs lg:text-sm tracking-wider uppercase border transition-all ${
                          selectedColor === color
                            ? "border-white bg-white text-black"
                            : available
                            ? "border-white/20 text-white hover:border-white/40"
                            : "border-white/10 text-white/30 cursor-not-allowed line-through"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs lg:text-sm tracking-[0.2em] uppercase text-white/60">
                    Size:{" "}
                    {selectedSize && (
                      <span className="text-white font-medium">
                        {selectedSize}
                      </span>
                    )}
                  </label>
                  <button className="text-xs lg:text-sm text-white/60 hover:text-white underline underline-offset-2">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {product.sizes.map((size) => {
                    const available = isSizeAvailable(size);
                    return (
                      <button
                        key={size}
                        onClick={() => available && setSelectedSize(size)}
                        disabled={!available}
                        className={`py-3 lg:py-3.5 text-xs lg:text-sm tracking-wider uppercase border transition-all ${
                          selectedSize === size
                            ? "border-white bg-white text-black"
                            : available
                            ? "border-white/20 text-white hover:border-white/40"
                            : "border-white/10 text-white/30 cursor-not-allowed line-through"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons Section */}
            <div className="space-y-4 pt-3 lg:pt-4">
              {/* Stock Warning */}
              {product.inventory < 10 && product.inventory > 0 && (
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-xs lg:text-sm font-bold text-red-500 tracking-wide uppercase">
                    Only {product.inventory} pieces left in stock
                  </span>
                </div>
              )}

              {/* Add To Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart || isAddingToCart}
                className="w-full py-4 lg:py-5 bg-white text-black text-sm lg:text-base tracking-[0.2em] uppercase font-bold hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl"
              >
                {isAddingToCart 
                  ? "Adding..." 
                  : !product.availableForSale 
                  ? "Sold Out" 
                  : needsSizeSelection
                  ? "Select Size"
                  : needsColorSelection
                  ? "Select Color"
                  : "Add to Cart"}
              </button>

              {/* Payment Icons */}
              <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3 pt-2">
                {paymentIcons.map((icon) => (
                  <div
                    key={icon.name}
                    className="h-7 w-9 lg:h-8 lg:w-10 relative bg-white rounded p-1 shadow-sm"
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

      {/* Accordion Details Section */}
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 lg:mb-12 border-t border-white/10 pt-6 lg:pt-8"
      >
        <div className="max-w-4xl mx-auto">
          <AccordionItem
            title="Size Recommendation"
            isOpen={openSection === "size"}
            onClick={() => toggleSection("size")}
          >
            <p>
              Fits true to size. We recommend taking your normal size. The model
              is 178cm/5&apos;10&quot; and is wearing a size S.
            </p>
          </AccordionItem>

          <AccordionItem
            title="Shipping Details"
            isOpen={openSection === "shipping"}
            onClick={() => toggleSection("shipping")}
          >
            <p>Free shipping on orders over $200.</p>
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



      {/* PRODUCT SHOWCASE */}
      <ProductShowcase description={product.descriptionHtml} />

            {/* TRUSTED BY SECTION */}
      <section
        className="bg-black relative overflow-hidden mb-8 lg:mb-12"
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
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 lg:mb-8"
          >
            <h2
              id="trusted-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight"
            >
              TRUSTED <span className="font-extralight text-white/60">BY</span>
            </h2>
          </m.div>

          <div className="relative overflow-hidden py-4 lg:py-6">
            <div className="absolute left-0 top-0 bottom-0 w-8 lg:w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 lg:w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <m.div
                className="flex gap-8 lg:gap-12 xl:gap-16 items-center w-max"
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
                    className="flex-shrink-0 relative h-10 lg:h-12 xl:h-14 w-28 lg:w-32 xl:w-36 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  >
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain filter brightness-0 invert hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                ))}
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Carousel + Instagram Component */}
      <div className="pb-6 lg:pb-8 mb-4 lg:mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">
          <div className="lg:col-span-7 w-full mt-6">
            <CommunityVideoCarousel />
          </div>
          <div className="lg:col-span-5 w-full flex items-start justify-center lg:justify-start">
            <InstagramCommunityCard />
          </div>
        </div>
      </div>

      <div className="mb-6 lg:mb-8">
        <BrandStory />
      </div>
      
      <div className="mb-6 lg:mb-8">
        <TestimonialsSection />
      </div>

      <div className="mb-6 lg:mb-8">
        <MustHaveProducts />
      </div>
    </div>
  );
}