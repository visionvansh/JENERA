// src/components/brand/MustHaveProducts.tsx
"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiArrowRight, HiFire } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { shopifyFetch, PRODUCTS_QUERY } from "@/lib/shopify";

// Helper function
const getFutureDate = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

// Manual configuration for products
// Use the product HANDLE (from URL), not the ID
const PRODUCT_CONFIGS: Record<string, {
  productHandle: string;
  inventory?: number;
  saleEnds?: string;
  badge?: string;
}> = {
  "product-1": {
    productHandle: "cinematic-hoodie",
    inventory: 50,
    saleEnds: getFutureDate(5),
    badge: "Best Seller",
  }, 
  "product-2": {
    productHandle: "jesus-hoodie",
    inventory: 5,
    saleEnds: getFutureDate(2),
    badge: "Best Seller",
  }, 

   "product-3": {
    productHandle: "jesus-saves-hoodie",
    inventory: 50,
    saleEnds: getFutureDate(8),
   
  }, 
  // Add more products here as needed
};

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

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  return (
    <Link href={`/product/${product.handle}`}>
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
            {product.inventory && product.inventory < 10 && (
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
    </Link>
  );
};

export function MustHaveProducts() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        const mappedProducts: ShopifyProduct[] = Object.entries(PRODUCT_CONFIGS)
          .map(([key, config]) => {
            const shopifyProduct = data.products.edges.find(
              (edge) => edge.node.handle === config.productHandle
            )?.node;

            if (!shopifyProduct) {
              console.warn(`❌ Product with handle "${config.productHandle}" not found`);
              return null;
            }

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
              inventory: config.inventory ?? null,
              saleEnds: config.saleEnds ?? null,
              badge: config.badge ?? null,
              availableForSale: shopifyProduct.availableForSale,
            };
          })
          .filter((p): p is ShopifyProduct => p !== null);

        console.log(`✅ Mapped ${mappedProducts.length} products successfully`);
        setProducts(mappedProducts);
        
        if (mappedProducts.length === 0) {
          setError("No matching products found. Check your product handles in PRODUCT_CONFIGS.");
        }
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // MINIMUM_PRODUCTS_FOR_MARQUEE: Only use marquee if we have at least 5 products
  const MINIMUM_PRODUCTS_FOR_MARQUEE = 5;
  const shouldUseMarquee = products.length >= MINIMUM_PRODUCTS_FOR_MARQUEE;
  
  // For marquee, duplicate the products array to create seamless loop
  const DESKTOP_MARQUEE_LIST = shouldUseMarquee ? [...products, ...products] : products;

  if (loading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white/40 text-lg">Loading products...</div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-400 text-lg mb-4">{error || "No products available"}</div>
          <div className="text-white/40 text-sm">
            Please check the console for more details and verify your product handles.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="must-have"
      className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden"
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
            className="text-center mb-6 sm:mb-8"
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
          {/* Mobile: Horizontal scroll */}
          <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 gap-4 pb-8">
            {products.map((product) => (
              <div key={product.id} className="snap-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Desktop: Marquee animation for 5+ products, centered grid for fewer */}
          {shouldUseMarquee ? (
            <div className="hidden lg:block w-full overflow-hidden pause-on-hover">
              <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
                {DESKTOP_MARQUEE_LIST.map((product, index) => (
                  <div key={`${product.id}-${index}`}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Fewer than 5 products: centered grid display without marquee
            <div className="hidden lg:flex justify-center items-center gap-8 px-4">
              {products.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 sm:mt-8 container mx-auto px-4"
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