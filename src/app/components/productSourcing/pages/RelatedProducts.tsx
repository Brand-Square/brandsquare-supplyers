"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/app/types/types";
import ProductCard from "../ui/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://api.brandsquare.store/api";

interface RelatedProductsProps {
  productId: string;
  categoryId?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  productId,
  categoryId,
}) => {
  // Fetching related products based on the current product's category
  const {
    data: relatedProducts,
    isLoading: isRelatedLoading,
    error: relatedError,
  } = useRelatedProducts(productId, categoryId);

  return (
    <div className="py-8 mt-8 mb-10 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="w-full bg-[#000051] p-6 flex items-center">
          <Link href="/product-sourcing">
            <ArrowLeft className="w-8 h-8 ml-1 text-white" />
          </Link>
          <h2 className="text-xl font-medium text-white text-center mx-auto">
            More products
          </h2>
        </div>
        <Link
          href="/product-sourcing"
          className="flex items-center text-sm text-blue-600 md:hidden"
        >
          <Button
            variant="outline"
            className="hidden md:flex items-center border-gray-300"
          >
            See more products <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      {isRelatedLoading ? (
        <div className="flex justify-center py-8 px-4 sm:px-0">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : relatedError ? (
        <div className="text-red-500 text-center px-4 sm:px-0">
          Error loading related products
        </div>
      ) : relatedProducts && relatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 px-4 sm:px-0 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {relatedProducts.map((product: ProductType) => (
              <Link
                  key={product._id}
                  href={`/product-sourcing/${product._id}`}
                  className=""
              >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No related products found
        </div>
      )}
    </div>
  );
};

// Custom hook to fetch related products
const useRelatedProducts = (productId: string, categoryId?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["relatedProducts", productId, categoryId],
    queryFn: async () => {
      try {
        // Fetch products from the same category, excluding the current product
        const params = categoryId
          ? { category: categoryId, exclude: productId, limit: 5 }
          : { exclude: productId, limit: 5 };

        const response = await axios.get(`${BASE_URL}/products`, {
          params,
        });

        // Return the data or an empty array if no results
        return response.data?.data?.products || [];
      } catch (error) {
        console.error("Error fetching related products:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { data, isLoading, error };
};

export default RelatedProducts;
