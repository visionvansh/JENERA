// src/app/page.tsx
import { Metadata } from "next";
import { LazyMotion, domAnimation } from "framer-motion";
import {
  Navbar,
  HeroSection,
  MustHaveProducts,
  ShopByCategories,
  FeaturedCollection,
  BrandStory,
  TrustedBy, // ✅ IMPORT
  ProductShowcase,
  LookbookSection,
  TestimonialsSection,
  NewsletterSection,
  Footer,
  ScrollProgress,
} from "@/components/brand";

export const metadata: Metadata = {
  title: "JENERA | Premium Clothing Brand",
  description:
    "Discover timeless elegance with JENERA. Premium clothing crafted for the modern individual. Minimalist design meets exceptional quality.",
  keywords: [
    "clothing brand",
    "fashion",
    "premium clothing",
    "minimalist fashion",
    "luxury apparel",
    "contemporary fashion",
  ],
  openGraph: {
    title: "JENERA | Premium Clothing Brand",
    description:
      "Timeless elegance. Premium craftsmanship. Discover the new collection.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="fixed inset-0 bg-black -z-20" />
      
      <div className="relative min-h-screen text-white selection:bg-white/20 selection:text-white antialiased">
        <ScrollProgress />
        <Navbar />

        <main id="main-content">
          <HeroSection />
          <MustHaveProducts />
          <ShopByCategories />
          <FeaturedCollection />
            <TrustedBy /> 
          <BrandStory />
        {/* ✅ ADD HERE - After BrandStory */}
          
          {/* <div className="hidden lg:block">
            <ProductShowcase />
          </div>
          
          <div className="hidden lg:block">
            <LookbookSection />
          </div> */}
          
          <TestimonialsSection />
          <NewsletterSection />
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}