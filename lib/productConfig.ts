// src/lib/productConfig.ts
// UNIFIED PRODUCT CONFIGURATION
// Add all your product handles and static data here

export interface ProductStaticData {
  productHandle: string; // Shopify product handle (from URL)
  
  // Static data for listing pages
  inventory?: number;
  saleEnds?: string;
  badge?: string;
}

// Helper function for sale end dates
export const getFutureDate = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

// CENTRAL CONFIGURATION - Add all products here
export const PRODUCT_CONFIGS: Record<string, ProductStaticData> = {
  "cinematic-hoodie": {
    productHandle: "cinematic-hoodie",
    inventory: 50,
    saleEnds: getFutureDate(5),
    badge: "Best Seller",
  },
  
  "jesus-hoodie": {
    productHandle: "jesus-hoodie",
    inventory: 5,
    saleEnds: getFutureDate(2),
    badge: "Best Seller",
  },
  
  "jesus-saves-hoodie": {
    productHandle: "jesus-saves-hoodie",
    inventory: 50,
    saleEnds: getFutureDate(8),
  },
  

  "faith-driven-bag": {
    productHandle: "faith-driven-bag",
    inventory: 50,
    saleEnds: getFutureDate(2),
  },

    "quality-sweater": {
    productHandle: "quality-sweater",
    inventory: 2,
    saleEnds: getFutureDate(2),
  },

      "fear-yah-carry-bag": {
    productHandle: "fear-yah-carry-bag",
    inventory: 6,
    saleEnds: getFutureDate(2),
  },
  
  // Add more products here following the same pattern
};

// Get all configured product handles
export const getConfiguredHandles = (): string[] => {
  return Object.keys(PRODUCT_CONFIGS);
};

// Get static data for a specific handle
export const getProductStaticData = (handle: string): ProductStaticData | null => {
  return PRODUCT_CONFIGS[handle] || null;
};