// product-sourcing/[id]/page.tsx

"use client";

import React, { use } from "react";
import { useSingleProduct } from "@/lib/customHooks/useReactQueryProductStoreHooks";
import ProductView from "@/app/components/productSourcing/pages/ProductView";

/**
 * Product detail page that displays a single product
 */

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  // Unwraping params using React.use()
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  // Use the React Query hook to fetch the product
  const { data: product, isLoading, error } = useSingleProduct(productId);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-center">
          <div className="h-12 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
          <div className="h-64 w-full max-w-md bg-gray-200 rounded mb-4 mx-auto"></div>
          <div className="h-8 w-full max-w-md bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-center">
        <div className="text-red-500">
          <h2 className="text-xl font-bold mb-2">Error Loading Product</h2>
          <p>{error.message || "Failed to load product details"}</p>
        </div>
      </div>
    );
  }

  // Show not found state if no product was returned
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <p>
            The product you`&apos;`re looking for doesn`&apos;`t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Show product view when data is available
  return (
    <div>
      <ProductView product={product} />
    </div>
  );
};

export default ProductDetailPage;
