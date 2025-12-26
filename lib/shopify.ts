// src/lib/shopify.ts
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  if (!domain || !storefrontAccessToken) {
    throw new Error("Missing Shopify environment variables");
  }

  try {
    const response = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });

    const { data, errors } = await response.json();

    if (errors) {
      console.error("Shopify GraphQL errors:", errors);
      throw errors[0];
    }

    return data as T;
  } catch (error) {
    console.error("Shopify Fetch Error:", error);
    throw error;
  }
}

// Query for listing products
export const PRODUCTS_QUERY = `
  query Products {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          productType
          totalInventory
        }
      }
    }
  }
`;

// Query for single product with full variant details
export const PRODUCT_BY_HANDLE_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      availableForSale
      totalInventory
      productType
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;