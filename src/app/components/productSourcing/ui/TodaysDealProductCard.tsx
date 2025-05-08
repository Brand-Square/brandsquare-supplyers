"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { ProductType } from "@/app/types/types";

interface TodaysDealProps {
  products: ProductType[];
  endTime?: Date;
  title?: string;
}

const TodaysDeal: React.FC<TodaysDealProps> = ({
  products,
  endTime = new Date(Date.now() + 24 * 60 * 60 * 1000),
  title = "Today's Deals",
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
  }>({
    hours: 24,
    minutes: 0,
    seconds: 0,
    totalSeconds: 24 * 60 * 60,
  });

  // Calculate and update time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = endTime.getTime() - now;

      if (difference <= 0) {
        // Timer expired
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
        });
        return;
      }

      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        totalSeconds: Math.floor(difference / 1000),
      });
    };

    // Update immediately and then every second
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  // Format time to always show double digits
  const formatTime = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  // Calculate stock percentage for progress bar
  const calculateStockPercentage = (product: ProductType): number => {
    // Check if product has stock information
    if (product.stock === undefined || product.stock <= 0) {
      return 0;
    }

    const maxStock = 100; // Assume 100 is the maximum stock level for full bar

    // Calculate percentage, capped at 100%
    const percentage = Math.min(100, (product.stock / maxStock) * 100);

    return percentage;
  };

  // Determine color based on stock level
  const getStockBarColor = (stockPercentage: number): string => {
    if (stockPercentage > 50) {
      return "bg-[#000051]"; // Blue for good stock levels (> 50%)
    } else if (stockPercentage > 20) {
      return "bg-[#FFA500]"; // Orange for medium stock (20-50%)
    } else {
      return "bg-orange-600"; // Red for low stock (< 20%)
    }
  };

  // Calculate discount percentage for a product
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

  // Function to truncate description text
  const truncateDescription = (
    text: string,
    maxLength: number = 100
  ): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (!products || products.length === 0) {
    return null; // Don't render if no products
  }

  return (
    <div className={`w-full bg-white mt-0 overflow-hidden`}>
      <div className="flex items-center px-[2%] bg-[#DBE7FB] py-[5%] sm:py-[2%] xl:py-[1%] xl:px-[5%] lg:rounded-t-lg justify-between md:items-center mb-6">
        <div>
          <h2 className="text-[5.5vw] sm:text-2xl xl:text-2xl font-bold tracking-wide">
            {title}
          </h2>
        </div>

        <div className="flex items-center tracking-wide">
          <span className="hidden md:block text-lg font-[550]">Time Left:</span>
          <Clock className="text-gray-600 md:hidden" width={18} height={18} />
          <div className="countdown flex items-center">
            <div className="px-1 font-bold sm:text-2xl text-[4.7vw] xl:text-2xl">
              {formatTime(timeLeft.hours)}h
            </div>
            <span className="text-gray-900 font-bold">:</span>
            <div className="px-1 font-bold sm:text-2xl text-[4.7vw] xl:text-2xl">
              {formatTime(timeLeft.minutes)}m
            </div>
            <span className="text-gray-900 font-bold">:</span>
            <div className="px-1 font-bold sm:text-2xl text-[4.7vw] xl:text-2xl">
              {formatTime(timeLeft.seconds)}s
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-stretch gap-4 overflow-auto today-deal pb-[5%] px-[4%]">
        {products.map((product) => {
          const discountPercentage = calculateDiscountPercentage(product);
          const stockPercentage = calculateStockPercentage(product);
          const stockBarColor = getStockBarColor(stockPercentage);

          return (
            <Link
              href={`/product-sourcing/${product._id}`}
              key={product._id}
              className="block group"
            >
              <div className="bg-[#DBE7FB] border border-[#DBE7FB] px-[4%] pt-[6%] w-[70vw] sm:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] h-full rounded-xl overflow-hidden flex flex-col">
                {/* Product Image - Fixed height for consistency */}
                <div className="w-full aspect-square relative">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>

                <div className="py-4 flex flex-col flex-grow">
                  <div className="flex items-start justify-between h-14 mb-2">
                    <h3 className="text-gray-950 tracking-wide font-bold line-clamp-2">
                      {product.name}
                    </h3>
                    {discountPercentage > 0 && (
                      <div className="bg-orange-600 text-white text-sm font-bold px-1 py-1 flex-shrink-0">
                        {discountPercentage}%
                      </div>
                    )}
                  </div>

                  <div className="h-8 mb-2">
                    <div className="flex items-baseline">
                      <span className="text-xl tracking-wide font-bold text-orange-600">
                        ₦{product.currentPrice.toLocaleString()}
                      </span>
                      {discountPercentage > 0 && (
                        <span className="ml-2 text-base font-semibold text-gray-900 line-through">
                          ₦{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="h-12 mb-2">
                    <p className="text-base font-[500] text-gray-900 tracking-wide line-clamp-2">
                      {truncateDescription(product.description)}
                    </p>
                  </div>

                  {/* Stock level progress bar - replacing the time-based one */}
                  <div className="hidden md:block h-6 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="flex-grow h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${stockBarColor}`}
                          style={{ width: `${stockPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">
                        {product.stock !== undefined ? (
                          <>
                            <span
                              className={
                                stockPercentage <= 20
                                  ? "text-orange-600 font-bold"
                                  : ""
                              }
                            >
                              {product.stock} in stock
                            </span>
                            {stockPercentage <= 20 && (
                              <span className="text-orange-600 ml-1 font-bold">
                                (Low)
                              </span>
                            )}
                          </>
                        ) : (
                          "Stock unavailable"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TodaysDeal;
