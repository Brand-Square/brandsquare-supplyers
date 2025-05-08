"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductType } from "@/app/types/types";

interface ProductProps {
  product: ProductType;
  size?: "small";
}

const ProductCard: React.FC<ProductProps> = ({ product, size }) => {
  // Calculate discount percentage
  const calculateDiscountPercentage = (product: ProductType): number => {
    if (
      !product.discount ||
      !product.discount.discountValue ||
      !product.price
    ) {
      return 0;
    }

    if (product.discount.discountType === "percentage") {
      return product.discount.discountValue;
    } else {
      // If discount is fixed amount
      return Math.round((product.discount.discountValue / product.price) * 100);
    }
  };

  const discountPercentage = calculateDiscountPercentage(product);
  // Check for low stock (5 or fewer items)
  const isLowStock = product.stock !== undefined && product.stock <= 5;

  // Function to truncate description text
  const truncateDescription = (
    text: string,
    maxLength: number = 60
  ): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className={`max-w-sm ${size === "small" ? "w-[15rem]" : "w-full"}`}>
      <Link href={`/product-sourcing/${product._id}`} className="h-full block">
        <div className="h-full flex flex-col">
          {" "}
          
            <div className="relative w-full aspect-square border border-[#E2E3EC] overflow-hidden rounded-lg ">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          
          <div className="mt-2 flex-grow flex flex-col">
            {/* Product name and discount*/}
            <div className="flex items-start justify-between h-14">
              <h2 className="text-[16px] font-[700] text-gray-950 line-clamp-2 flex-grow">
                {product.name}
              </h2>
              {/* Discount badge*/}
              {discountPercentage > 0 && (
                <div className="text-[#E55420] text-sm font-[550] py-1 flex-shrink-0">
                  -{discountPercentage}%
                </div>
              )}
            </div>

            {/* Description*/}
            <div className="h-10 mb-2 md:mb-4">
              <p className="text-[0.8rem] md:text-base font-[500] text-gray-800 tracking-wide line-clamp-2">
                {truncateDescription(product.description)}
              </p>
            </div>
            {/* Price and stock status */}
            <div className="flex items-baseline h-8">
              <p className="text-lg font-bold">
                ₦{product.currentPrice.toLocaleString()}
              </p>
              {discountPercentage > 0 && (
                <span className="ml-2 text-sm text-gray-700 line-through">
                  ₦{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="mt-auto flex flex-col gap-2 w-full text-xs">
              <div className="flex items-center w-full justify-between h-6">
                <span className="inline-flex items-center bg-[#E55420] text-white px-2 py-1 rounded-full">
                  Verified 2yrs
                </span>
                <span className="inline-flex text-xs items-center text-[#E55420] px-2 py-1 rounded">
                  MOQ 1 piece
                </span>
              </div>

              <div className="flex items-center w-full justify-between h-6">
                <p
                  className={`inline-flex font-[600] tracking-wide items-center uppercase ${
                    isLowStock ? "text-[#E55420]" : "text-green-600"
                  } px-2 py-1 rounded`}
                >
                  {isLowStock ? "Limited stock" : "In stock"}
                </p>

                <p className="inline-flex items-center text-[#E55420] rounded">
                  {product.sold ? `${product.sold}k sold` : "New"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
