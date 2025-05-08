"use client";

import React from "react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import CategoryNav from "../components/productSourcing/ui/CategoryNav";
import DashBtn from "../components/dasboardComponents/ui/DashBtn";
import Banner from "../components/productSourcing/ui/Banner";
// import CategoryBanner from "../components/ui/CategoryBanner";
import ProductCard from "../components/productSourcing/ui/ProductCard";
import TodaysDeal from "../components/productSourcing/ui/TodaysDealProductCard";
import Footer from "../components/ui/Footer";
// import DrinksCat from "../../../public/assets/images/drinksCategory.png";
// import OfficeCat from "../../../public/assets/images/officeMaterials.png";
// import BuildingCat from "../../../public/assets/images/buildingCategory.png";
// import Image from "next/image";
import NewsletterForm from "../components/productSourcing/ui/NewsLetterForm";
import { useHotPicksProducts } from "@/lib/customHooks/useHotPicksProducts";
import { useTodaysDealsProducts } from "@/lib/customHooks/useTodaysDealProducts";
import CategoryGrid from "../components/productSourcing/ui/CategoriesGrid";

const ProductSourcingPage = () => {

  const {
    data: hotPicksResponse,
    isLoading: isLoadingHotPicks,
    error: hotPicksError,
  } = useHotPicksProducts();

  const {
    data: todaysDealsResponse,
    isLoading: isLoadingDeals,
    error: dealsError,
  } = useTodaysDealsProducts();


  // Get products array from the response
  const hotPicksProducts = hotPicksResponse?.products || [];
  const todaysDealsProducts = todaysDealsResponse?.products || [];

  const router = useRouter();

  const handleRequestProduct = () => {
    router.push("/product-sourcing/product-request");
  };

  // Set end time to midnight tonight for the deals
  const today = new Date();
  const endTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1, // tomorrow
    0,
    0,
    0 // midnight
  );

  return (
    <>
      <div className="">
        <div className="nav hidden md:hidden md:items-center md:justify-between py-2 mt-7 gap-3 bg-white">
          <div className="md:block hidden">
            <DashBtn
              styling="bg-theme-blue text-white text-[13px]"
              text="Request a product"
              onClick={handleRequestProduct}
            />
          </div>
        </div>

        <div className="px-[3%] xl:px-[2%] xl:-mt-[2%] xl:pb-2">
          <Banner />
        </div>

        {/* Today's deals */}
        <section className="my-8 xl:px-[2%]">
          {isLoadingDeals ? (
            // Loading state for deals section
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 w-60 mb-6 rounded"></div>
              <div className="h-64 lg:h-80 bg-gray-200 w-full rounded-lg"></div>
            </div>
          ) : dealsError ? (
            // Error state
            <div className="text-center py-10 text-red-500">
              <p>Error loading deals: {dealsError.message}</p>
            </div>
          ) : todaysDealsProducts.length > 0 ? (
            // Show TodaysDeal component if we have discounted products
            <TodaysDeal products={todaysDealsProducts} endTime={endTime} />
          ) : (
            // Fallback if no deals are available
            <div>
              <h1 className="text-[30px] font-semibold mb-4">
                Today&apos;s Deals
              </h1>
              <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">
                  No deals available today. Check back soon!
                </p>
              </div>
            </div>
          )}
        </section>

        {/* More Products Section */}
        <section className="mb-[7%]">
          <div className=" -mt-[3%] lg:-mt-[2.5%] ">
            <div className="flex items-center justify-between py-[2.5%] px-[4%] bg-[#DBE7FB] mb-[14%] sm:mb-[7%] xl:mb-[4%] xl:py-4">
              <div>
                <h1 className="text-lg xl:text-xl  font-bold tracking-wide">
                  Find Your Perfect Pick
                </h1>
                {/* {productResponse?.totalProducts > 0 && (
                <p className="text-gray-600 text-sm">
                  Showing {Math.min(products.length, 6)} of{" "}
                  {productResponse.totalProducts} products
                </p>
              )} */}
              </div>
              <div>
                <button
                  onClick={() =>
                    router.push("/product-sourcing/products-catalog")
                  }
                  className="text-lg xl:text-xl tracking-wide font-medium underline"
                >
                  See all
                </button>
              </div>
            </div>
          </div>

          <div className="product pb-[5%] grid justify-items-center px-[3vw] grid-cols-2 gap-[3vw] sm:gap-y-[5vw] sm:gap-x-[5vw] lg:grid-cols-5 xl:gap-[3vw] xl:px-[2vw]">
            {isLoadingHotPicks ? (
              // Loading state
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <div key={`skeleton-${index}`} className="animate-pulse">
                    <div className="bg-gray-200 w-40 h-40 rounded-lg"></div>
                    <div className="mt-2 bg-gray-200 h-4 w-32 rounded"></div>
                    <div className="mt-1 bg-gray-200 h-4 w-24 rounded"></div>
                  </div>
                ))
            ) : hotPicksError ? (
              // Error state
              <div className="col-span-6 text-center py-10 text-red-500">
                <p>Error loading products: {hotPicksError.message}</p>
              </div>
            ) : hotPicksProducts.length > 0 ? (
              // Products are available
              hotPicksProducts.map((product, index) => (
                <div
                  key={`product-${product._id || index}`}
                  className="w-[46.5vw] lg:w-[19vw]"
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              // No products available
              <div className="col-span-6 text-center py-10">
                <p>Products unavailable</p>
              </div>
            )}
          </div>
        </section>

        <section className="xl:-mt-[7%] sm:-mt-[4%] mb-[20%] xl:mb-[5%] xl:px-[1vw]">
          <CategoryGrid/>
        </section>
        <section className="mb-[7vh] sm:-mt-[8%] xl:mt-0">
          <div className="px-[4%] xl:px-[1vw]">
            <NewsletterForm />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductSourcingPage;
