// src/app/product/[handle]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import { Navbar, Footer, ScrollProgress } from "@/components/brand";
import { shopifyFetch, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { getProductStaticData, getConfiguredHandles } from "@/lib/productConfig";

interface ShopifyProductResponse {
  product: {
    id: string;
    title: string;
    handle: string;
    description: string;
    descriptionHtml: string; // ADDED
    productType: string;
    availableForSale: boolean;
    totalInventory: number;
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
    options: Array<{
      id: string;
      name: string;
      values: string[];
    }>;
    variants: {
      edges: Array<{
        node: {
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
        };
      }>;
    };


    
  } | null;

  
}

export async function generateStaticParams() {
  const handles = getConfiguredHandles();
  return handles.map((handle) => ({
    handle: handle,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ handle: string }> 
}): Promise<Metadata> {
  const { handle } = await params;
  
  try {
    const data = await shopifyFetch<ShopifyProductResponse>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    if (!data.product) {
      return {
        title: "Product Not Found | HausofVeda",
      };
    }

    const image = data.product.images.edges[0]?.node.url || "";

    return {
      title: `${data.product.title} | HausofVeda`,
      description: data.product.description || "",
      openGraph: {
        title: `${data.product.title} | HausofVeda`,
        description: data.product.description || "",
        images: image ? [image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product | HausofVeda",
    };
  }
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ handle: string }> 
}) {
  const { handle } = await params;
  
  // Get static configuration
  const staticData = getProductStaticData(handle);
  
  if (!staticData) {
    console.error(`No static configuration found for handle: ${handle}`);
    notFound();
  }

  // Fetch dynamic data from Shopify
  let shopifyData;
  try {
    const data = await shopifyFetch<ShopifyProductResponse>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: staticData.productHandle },
    });

    shopifyData = data.product;
  } catch (error) {
    console.error("Error fetching product from Shopify:", error);
    notFound();
  }

  if (!shopifyData) {
    console.error(`Product not found in Shopify: ${handle}`);
    notFound();
  }

  // Debug: Log the options to see what Shopify returns
  console.log("=== SHOPIFY PRODUCT DATA ===");
  console.log("Product Title:", shopifyData.title);
  console.log("Options:", JSON.stringify(shopifyData.options, null, 2));
  console.log("Variants count:", shopifyData.variants.edges.length);
  console.log("First variant selectedOptions:", JSON.stringify(shopifyData.variants.edges[0]?.node.selectedOptions, null, 2));

  // Extract sizes from options - check multiple possible names
  const sizeOption = shopifyData.options.find(opt => 
    opt.name.toLowerCase() === 'size' || 
    opt.name.toLowerCase() === 'sizes' ||
    opt.name.toLowerCase() === 'taille'
  );
  
  // Extract colors from options - check multiple possible names
  const colorOption = shopifyData.options.find(opt => 
    opt.name.toLowerCase() === 'color' || 
    opt.name.toLowerCase() === 'colour' ||
    opt.name.toLowerCase() === 'colors' ||
    opt.name.toLowerCase() === 'couleur'
  );

  // If options are not found, try to extract from variants
  let sizes: string[] = sizeOption?.values || [];
  let colors: string[] = colorOption?.values || [];

  // Fallback: Extract unique sizes and colors from variants if options are empty
  if (sizes.length === 0 || colors.length === 0) {
    const uniqueSizes = new Set<string>();
    const uniqueColors = new Set<string>();

    shopifyData.variants.edges.forEach(({ node }) => {
      node.selectedOptions.forEach(option => {
        const optionName = option.name.toLowerCase();
        if (optionName === 'size' || optionName === 'sizes' || optionName === 'taille') {
          uniqueSizes.add(option.value);
        }
        if (optionName === 'color' || optionName === 'colour' || optionName === 'colors' || optionName === 'couleur') {
          uniqueColors.add(option.value);
        }
      });
    });

    if (sizes.length === 0) {
      sizes = Array.from(uniqueSizes);
    }
    if (colors.length === 0) {
      colors = Array.from(uniqueColors);
    }
  }

  console.log("Extracted Sizes:", sizes);
  console.log("Extracted Colors:", colors);

  // Get images from Shopify
  const images = shopifyData.images.edges.map(edge => edge.node.url);

  // Calculate prices from Shopify
  const price = parseFloat(shopifyData.priceRange.minVariantPrice.amount);
  const compareAtPrice = shopifyData.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(shopifyData.compareAtPriceRange.minVariantPrice.amount)
    : null;

  // Combine static and dynamic data
  const product = {
    id: shopifyData.id,
    handle: shopifyData.handle,
    name: shopifyData.title,
    descriptionHtml: shopifyData.descriptionHtml, // ADDED
    price: price,
    originalPrice: compareAtPrice && compareAtPrice > price ? compareAtPrice : null,
    badge: staticData.badge || null,
    images: images.length > 0 ? images : ["/placeholder.jpg"],
    category: shopifyData.productType || "General",
    inventory: staticData.inventory ?? shopifyData.totalInventory,
    sizes: sizes,
    colors: colors,
    availableForSale: shopifyData.availableForSale,
    variants: shopifyData.variants.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      quantityAvailable: edge.node.quantityAvailable,
      price: {
        amount: edge.node.price.amount,
        currencyCode: edge.node.price.currencyCode,
      },
      compareAtPrice: edge.node.compareAtPrice ? {
        amount: edge.node.compareAtPrice.amount,
        currencyCode: edge.node.compareAtPrice.currencyCode,
      } : null,
      selectedOptions: edge.node.selectedOptions,
    })),
    saleEnds: staticData.saleEnds || null,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
        
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
          <ProductPageClient product={product} />
        </div>

        <Footer />
      </main>
    </>
  );
}