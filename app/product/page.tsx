// src/app/product/page.tsx
"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Navbar, 
  Footer, 
  NewsletterSection, 
  ScrollProgress 
} from "@/components/brand";
import { 
  HiAdjustmentsHorizontal, 
  HiChevronDown, 
  HiFunnel,
  HiFire 
} from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { shopifyFetch, PRODUCTS_QUERY } from "@/lib/shopify";
import { PRODUCT_CONFIGS } from "@/lib/productConfig";

// --- Types ---
interface ShopifyProduct {
  id: string;
  name: string;
  handle: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  inventory: number | null;
  saleEnds: string | null;
  badge: string | null;
  availableForSale: boolean;
}

// --- Countdown Timer Component ---
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

// --- Product Card Component ---
const ProductCard = ({ 
  product, 
  index 
}: { 
  product: ShopifyProduct, 
  index: number 
}) => {
  return (
    <Link href={`/product/${product.handle}`} className="block h-full">
      <m.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="group cursor-pointer relative flex flex-col h-full"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-4 border border-white/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 items-start z-20">
            {product.badge && (
              <span className="px-3 py-1 bg-white text-black text-[10px] tracking-[0.15em] uppercase font-bold shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 hidden sm:block">
            <button 
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic here
              }}
              className="w-full py-3 bg-white text-black text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-200 transition-colors shadow-xl"
            >
              Add to Bag
            </button>
          </div>

          {/* Decorative Borders */}
          <div className="absolute top-0 left-0 w-8 h-px bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
          <div className="absolute top-0 left-0 w-px h-8 bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
          <div className="absolute bottom-0 right-0 w-8 h-px bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
          <div className="absolute bottom-0 right-0 w-px h-8 bg-white/0 group-hover:bg-white/50 transition-colors duration-500" />
        </div>

        <div className="space-y-2.5 flex-1">
          {/* Category & Stock Status */}
          <div className="flex justify-between items-start gap-2">
            <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
              {product.category}
            </span>
            {product.inventory !== null && product.inventory < 10 && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-wider animate-pulse whitespace-nowrap">
                <HiFire /> Only {product.inventory} Left
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base text-white font-medium group-hover:text-white/80 transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Price Row */}
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

          {/* Countdown Timer (if sale) */}
          {product.saleEnds && (
            <div className="flex items-center gap-1.5 text-red-400 pt-1">
              <IoTimeOutline className="animate-pulse text-sm flex-shrink-0" />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                Ends <CountdownTimer targetDate={product.saleEnds} />
              </span>
            </div>
          )}
        </div>
      </m.article>
    </Link>
  );
};

// --- Main Component ---
export default function ProductListingPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>(["All"]);

  // Fetch products from Shopify
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🔄 Fetching products from Shopify...");
        
        const data = await shopifyFetch<{
          products: {
            edges: Array<{
              node: {
                id: string;
                title: string;
                handle: string;
                productType: string;
                images: {
                  edges: Array<{
                    node: {
                      url: string;
                      altText: string | null;
                    };
                  }>;
                };
                priceRange: {
                  minVariantPrice: {
                    amount: string;
                    currencyCode: string;
                  };
                };
                compareAtPriceRange: {
                  minVariantPrice: {
                    amount: string;
                    currencyCode: string;
                  } | null;
                };
                availableForSale: boolean;
                totalInventory: number;
              };
            }>;
          };
        }>({
          query: PRODUCTS_QUERY,
        });

        if (!data?.products?.edges) {
          setError("No products found in Shopify");
          setLoading(false);
          return;
        }

        console.log(`✅ Fetched ${data.products.edges.length} products from Shopify`);

        // Map ALL Shopify products with static data if available
        const mappedProducts: ShopifyProduct[] = data.products.edges
          .map((edge) => {
            const shopifyProduct = edge.node;
            const staticConfig = PRODUCT_CONFIGS[shopifyProduct.handle];

            const price = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
            const compareAtPrice = shopifyProduct.compareAtPriceRange?.minVariantPrice?.amount
              ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
              : null;

            return {
              id: shopifyProduct.id,
              name: shopifyProduct.title,
              handle: shopifyProduct.handle,
              price: price,
              originalPrice: compareAtPrice && compareAtPrice > price ? compareAtPrice : null,
              image: shopifyProduct.images.edges[0]?.node.url || "/placeholder.jpg",
              category: shopifyProduct.productType || "General",
              inventory: staticConfig?.inventory ?? null,
              saleEnds: staticConfig?.saleEnds ?? null,
              badge: staticConfig?.badge ?? null,
              availableForSale: shopifyProduct.availableForSale,
            };
          })
          .filter((p): p is ShopifyProduct => p !== null);

        console.log(`✅ Mapped ${mappedProducts.length} products successfully`);
        setProducts(mappedProducts);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(mappedProducts.map(p => p.category).filter(Boolean))
        ).sort();
        setCategories(["All", ...uniqueCategories]);

        if (mappedProducts.length === 0) {
          setError("No products available at the moment.");
        }
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter Logic
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Loading State
  if (loading) {
    return (
      <>
        <Navbar />
        <ScrollProgress />
        <main className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-white/40 text-sm tracking-wider">Loading products...</p>
          </div>
        </main>
      </>
    );
  }

  // Error State
  if (error || products.length === 0) {
    return (
      <>
        <Navbar />
        <ScrollProgress />
        <main className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
              <HiFunnel className="text-2xl text-red-400" />
            </div>
            <p className="text-red-400 text-lg mb-2">{error || "No products available"}</p>
            <p className="text-white/40 text-sm">
              Please check back later or contact support if the problem persists.
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ScrollProgress />
      
      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-24 sm:pt-32">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none fixed">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-white/40 font-light block mb-3 uppercase">
                Shop The Collection
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                ALL <span className="font-extralight text-white/60">PRODUCTS</span>
              </h1>
            </m.div>

            {/* Filter Controls */}
            <m.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              {/* Desktop Category Tabs */}
              <div className="hidden md:flex items-center gap-2 bg-neutral-900/50 p-1 rounded-sm border border-white/5 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 rounded-sm ${
                      selectedCategory === cat 
                        ? "bg-white text-black font-bold" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden flex items-center gap-2 px-4 py-3 border border-white/20 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all"
              >
                <HiAdjustmentsHorizontal className="text-lg" />
                <span>Filter</span>
              </button>

              {/* Sort Button (placeholder for future implementation) */}
              <button className="flex items-center gap-2 px-4 py-3 border border-white/20 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                <span>Sort</span>
                <HiChevronDown />
              </button>
            </m.div>
          </div>

          {/* Mobile Filter Menu */}
          <AnimatePresence>
            {isFilterOpen && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden mb-8"
              >
                <div className="grid grid-cols-2 gap-2 pb-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`py-3 text-[10px] tracking-[0.2em] uppercase border transition-all ${
                        selectedCategory === cat
                          ? "bg-white text-black border-white"
                          : "text-white/60 border-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <div className="mb-6 text-[10px] tracking-[0.2em] text-white/40 uppercase">
            Showing {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:gap-y-16 pb-20">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <HiFunnel className="text-2xl text-white/40" />
              </div>
              <p className="text-white/60 text-sm tracking-wide">No products found in this category.</p>
              <button 
                onClick={() => setSelectedCategory("All")}
                className="mt-6 text-xs underline underline-offset-4 text-white hover:text-white/70 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>

        <NewsletterSection />
        <Footer />
      </main>
    </>
  );
}