"use client";

import { useCategories } from "@/lib/customHooks/useReactQueryProductStoreHooks";
import Image from "next/image";
import Link from "next/link";

export default function CategoryGrid() {
  
  const { data: categoryResponse, isLoading, error } = useCategories(1, 9);

  // Extract categories from the response
  const categories = categoryResponse?.categories || [];

  if (isLoading) {
    return (
      <div className="px-4 py-8 space-y-6 mb-8 sm:mb-12 md:mb-16 lg:mb-[6rem]">
        <div className="bg-[#DBE7FB] py-[1.5vh] px-4 font-[700] rounded-lg text-center xl:text-xl">
          Find Everything You Need In One Place
        </div>
        <div className="grid mt-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-items-center">
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-neutral-100 rounded-lg animate-pulse max-w-[40em] aspect-[3/1] sm:aspect-[3/1] md:aspect-1 w-full"
              ></div>
            ))}
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="px-4 py-8 space-y-6 mb-8 sm:mb-12 md:mb-16 lg:mb-[6rem]">
        <div className="bg-[#DBE7FB] py-[1.5vh] px-4 font-[700] rounded-lg text-center xl:text-xl">
          Find Everything You Need In One Place
        </div>
        <div className="text-center text-red-500 p-4">
          <p>Failed to load categories. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 space-y-6 mb-8 sm:mb-12 md:mb-16 lg:mb-[6rem]">
      <div className="bg-[#DBE7FB] py-[1.5vh] px-4 font-[700] rounded-lg text-center xl:text-xl">
        Find Everything You Need In One Place
      </div>

      <div className="grid mt-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-items-center">
        {categories.length > 0 ? (
          categories.slice(0, 9).map((category) => (
            <Link
              href={`/product-sourcing/category/${
                category._id
              }?name=${encodeURIComponent(category.name)}`}
              key={category._id}
              className="block w-full relative max-w-[40em] transition-transform hover:scale-105"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/1] sm:aspect-[3/1] md:aspect-1 w-full">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name || "Category"}
                  width={500}
                  height={300}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute left-0 top-0 w-full h-full drop-shadow flex flex-col justify-center p-3 rounded-md bg-[#000051]/40">
                <h3 className="font-semibold sm:text-lg text-sm text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p>No categories available</p>
          </div>
        )}
      </div>
    </div>
  );
}
