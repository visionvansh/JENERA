// src/app/product/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import { Navbar, Footer, ScrollProgress } from "@/components/brand";

// Combined product data
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Classic Wool Overcoat",
    price: 495,
    originalPrice: 650,
    badge: "Best Seller",
    images: ["/cloth1.jpg", "/cloth2.png", "/cloth3.jpg", "/cloth4.png"],
    category: "Outerwear",
    inventory: 5,
    description: "A timeless wool overcoat crafted from premium Italian wool. Features a classic silhouette with modern tailoring details.",
    details: [
      "100% Premium Italian Wool",
      "Fully lined with silk blend",
      "Two interior pockets",
      "Dry clean only",
      "Made in Italy"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Camel"],
    fit: "Regular fit",
    shipping: "Free shipping on orders over $200",
  },
  {
    id: 2,
    name: "Cashmere Turtleneck",
    price: 285,
    originalPrice: 350,
    badge: "Flash Sale",
    images: ["/cloth2.png", "/cloth5.png", "/cloth6.png", "/cloth7.png"],
    category: "",
    inventory: 4,
    description: "Luxuriously soft cashmere turtleneck. Perfect for layering or wearing on its own.",
    details: [
      "100% Mongolian Cashmere",
      "Ribbed collar and cuffs",
      "Hand wash cold",
      "Lay flat to dry",
      "Made in Scotland"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Cream", "Grey"],
    fit: "Slim fit",
    shipping: "Free shipping on orders over $200",
  },
  {
    id: 3,
    name: "Tailored Wool Trousers",
    price: 195,
    images: ["/cloth8.png", "/cloth18.png", "/cloth19.png"],
    category: "Bottoms",
    inventory: 6,
    description: "Impeccably tailored trousers in a premium wool blend. Features a modern tapered fit.",
    details: [
      "70% Wool, 30% Polyester",
      "Flat front with pressed crease",
      "Side and back pockets",
      "Machine wash cold",
      "Made in Portugal"
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Black", "Navy", "Grey"],
    fit: "Tapered fit",
    shipping: "Free shipping on orders over $200",
  },
  {
    id: 4,
    name: "Silk Blend Shirt",
    price: 175,
    badge: "Limited",
    images: ["/cloth4.png", "/cloth20.png", "/cloth21.png"],
    category: "Tops",
    inventory: 3,
    description: "Refined silk blend shirt with a subtle sheen. Features mother-of-pearl buttons.",
    details: [
      "60% Silk, 40% Cotton",
      "Mother-of-pearl buttons",
      "Classic collar",
      "Dry clean recommended",
      "Made in Italy"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Ivory"],
    fit: "Regular fit",
    shipping: "Free shipping on orders over $200",
  },
  {
    id: 5,
    name: "Essential Oversized Tee",
    price: 89,
    originalPrice: 110,
    images: ["/cloth16.png", "/cloth5.png"],
    category: "Tops",
    inventory: 4,
    description: "Premium oversized tee in heavyweight cotton. The perfect essential piece.",
    details: [
      "100% Organic Cotton",
      "Heavyweight 240gsm",
      "Reinforced neckline",
      "Machine wash cold",
      "Made in Portugal"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Black", "White", "Sage"],
    fit: "Oversized fit",
    shipping: "Free shipping on orders over $200",
  },
  {
    id: 6,
    name: "Structured Wool Blazer",
    price: 329,
    badge: "Best Seller",
    images: ["/cloth17.png", "/cloth1.jpg"],
    category: "Outerwear",
    inventory: 15,
    description: "Modern structured blazer in premium wool. Features peak lapels and a contemporary fit.",
    details: [
      "100% Virgin Wool",
      "Peak lapels",
      "Two-button closure",
      "Dry clean only",
      "Made in Italy"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Charcoal"],
    fit: "Slim fit",
    shipping: "Free shipping on orders over $200",
  },
  {
    id: 7,
    name: "Merino Knit Sweater",
    price: 219,
    originalPrice: 280,
    badge: "Flash Deal",
    images: ["/cloth19.png", "/cloth2.png"],
    category: "",
    inventory: 8,
    description: "Luxurious merino wool sweater with a classic crew neck. Breathable and temperature regulating.",
    details: [
      "100% Merino Wool",
      "Crew neck",
      "Ribbed cuffs and hem",
      "Hand wash cold",
      "Made in Scotland"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Graphite", "Navy", "Camel"],
    fit: "Regular fit",
    shipping: "Free shipping on orders over $200",
  },
];

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === parseInt(id));
  
  if (!product) {
    return {
      title: "Product Not Found | HausofVeda",
    };
  }

  return {
    title: `${product.name} | HausofVeda`,
    description: product.description,
    openGraph: {
      title: `${product.name} | HausofVeda`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
        
        {/* Background Pattern */}
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
          <ScrollProgress />
          <ProductPageClient product={product} relatedProducts={relatedProducts} />
        </div>

        <Footer />
      </main>
    </>
  );
}