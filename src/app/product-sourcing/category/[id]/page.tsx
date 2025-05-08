"use client";

import React, { useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/app/components/productSourcing/ui/ProductCard";
import { useProductsByCategory } from "@/lib/customHooks/useProductsByCategory";
import { Pagination } from "@/app/components/ui/Pagination";
import Footer from "@/app/components/ui/Footer";

const CategoryProductsPage = ({ params }: { params: Promise<{ id: string }>;
 }) => {
  // Resolve the params Promise to get category ID
  const resolvedParams = use(params);
  const categoryId = resolvedParams.id;

  // Get category name from URL search params
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("name") || "Category";

  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Use the custom hook to fetch products by category
  const {
    data: productResponse,
    isLoading,
    error,
  } = useProductsByCategory(categoryId, currentPage);

  // Extract data from the response
  const products = productResponse?.products || [];
  const totalPages = productResponse?.totalPages || 1;
  const totalProducts = productResponse?.totalProducts || 0;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center">
          <Link
            href="/product-sourcing"
            className="mr-4 flex items-center text-gray-600 hover:text-theme-blue"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">{categoryName}</h1>
          {totalProducts > 0 && (
            <span className="ml-4 text-gray-500">
              ({totalProducts} products)
            </span>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(12)
              .fill(0)
              .map((_, index) => (
                <div key={`skeleton-${index}`} className="animate-pulse">
                  <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                  <div className="mt-2 bg-gray-200 h-4 w-3/4 rounded"></div>
                  <div className="mt-1 bg-gray-200 h-4 w-1/2 rounded"></div>
                </div>
              ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-red-600">Error: {error.message}</p>
              <button
                className="mt-4 px-4 py-2 bg-theme-blue text-white rounded-md"
                onClick={() => router.refresh()}
              >
                Try Again
              </button>
            </div>
          ) : products.length > 0 ? (
            // Render products
            products.map((product, index) => (
              <div key={`product-${product._id || index}`}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            // No products found
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-600">
                No products found in this category.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && !error && totalPages > 0 && (
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="py-4"
            />
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default CategoryProductsPage;
