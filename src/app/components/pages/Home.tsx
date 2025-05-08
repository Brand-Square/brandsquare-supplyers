// app/page.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DashBtn from "@/app/auth/components/ui/DashBtn";
import Image from "next/image";
import DashLogo from "../../../../public/assets/icons/DashLogo";
import SearchBar from "../ui/searchBar";
import Link from "next/link";
export default function BrandsquareLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 md:py-12 Bg">
        <div className=" container px-4  py-7 w-full md:hidden block">
          <SearchBar />
        </div>
        <div className="container mx-auto px-4">
          <div className=" gap-8 items-center">
            <div className="grid my-6  md:my-16 md:grid-cols-2 gap-8 items-start">
              <div className=" flex gap-3 ">
                {" "}
                <div
                  className={`w-2 rounded-full max-h-64 bg-theme-blue  `}
                  role="separator"
                  aria-orientation="vertical"
                />
                <h1 className="text-3xl md:text-[57px] max-w-[500px] md:leading-[60px] font-bold mb-2">
                  <span className="text-[#E55420]  leading-10 space-y-5">
                    Welcome{" "}
                    <span className="text-theme-blue">
                      To Brandsquare Vendors&apos; Hub{" "}
                    </span>{" "}
                  </span>
                  <br />
                </h1>
              </div>
              <div>
                <p className="text-gray-600 mb-6 text-left">
                  At Brandsquare, we understand the challenges small businesses
                  face without access to capital. Our goal is to empower you to
                  engage in large scale commerce effortlessly. That&apos;s why
                  we created the Vendors&apos; Hub, a fully stocked inventory
                  combined with reliable logistics systems, to allow your
                  business to scale quickly. No barriers, no confusion, just
                  building a thriving business without the limitations.
                </p>
                <div className=" w-fit">
                  <Link href={"/auth/create-account"} className=" w-fit">
                    <DashBtn text="Signup as A vendor Now" icon="" />
                  </Link>
                </div>
              </div>
              {/* <Button className="bg-navy-800 text-white hover:bg-navy-900">
                                Sign Up for Vendors&apos; Hub
                            </Button> */}
            </div>
            <div className="  mt-16 md:mt-36">
              <Card className="bannerBg text-white overflow-hidden ">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-white">
                    Start With Just{" "}
                    <span className=" text-theme-blue">50% </span>Capital
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 items-start">
                    <div>
                      <p className="text-sm md:text-base">
                        You can kickstart your business with only 50% advance
                        payment of the required capital thanks to our innovative
                        financing solution. Scale your online marketplace
                        through it, while ensuring zero financial worry. Our
                        flexible payment plan spreads out the remaining balance
                        over a period of time as products get sold.
                      </p>
                      <Button className="mt-4 bg-yellow-400 text-gray-800 hover:bg-yellow-500">
                        Join Vendors&apos; Hub Today
                      </Button>
                    </div>
                    <div className="flex justify-center">
                      <Image
                        height={10}
                        width={400}
                        src="/assets/images/Laptoplady2.png"
                        alt="Bulk Products"
                        className=" object-cover h-fit    "
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className=" flex  md:flex-row flex-col gap-5  md:my-2 my-5 md:justify-between items-start md:items-center">
            <h2 className="text-xl md:text-3xl font-bold md:mb-8">
              Why Choose Brandsquare Vendors&apos; Hub?
            </h2>
            <Link href={"/auth/create-account"} className=" w-fit">
              <DashBtn text="Signup as A vendor Now" icon="" />
            </Link>
          </div>

          <div className=" ">
            {/* Card 1 */}
            <Card className=" bg-[#D1E4FF]  p-3 md:p-7 flex flex-col md:flex-row gap-8 items-center mb-6">
              <CardHeader className=" flex-1">
                <Image
                  height={1000}
                  width={1000}
                  src="/assets/images/cardB1.png"
                  alt="Bulk Products"
                  className="rounded-lg w-full object-cover  h-52"
                />
              </CardHeader>
              <div className=" flex-1">
                <CardContent>
                  <CardTitle className="text-xl">
                    Affordable Bulk Products
                  </CardTitle>
                  <p className="text-gray-600">
                    Source high-quality goods at competitive prices directly
                    from trusted manufacturers and suppliers. Our bulk
                    purchasing power enables us to secure the lowest possible
                    rates for top-quality products. Get a wide range of products
                    at very low prices. Whether you&apos;re looking for
                    electronics, fashion, or home goods, we have products at
                    prices you&apos;ll love.
                  </p>
                </CardContent>
                <CardFooter>
                  <a href="#" className="text-theme-orange text-sm font-medium">
                    Learn more →
                  </a>
                </CardFooter>
              </div>
            </Card>
            <Card className=" bg-[#D1E4FF]  p-3 md:p-7 flex flex-col md:flex-row-reverse gap-8 items-center mb-6">
              <CardHeader className=" flex-1">
                <Image
                  height={1000}
                  width={1000}
                  src="/assets/images/cardB2.png"
                  alt="Bulk Products"
                  className="rounded-lg w-full object-cover  h-52"
                />
              </CardHeader>
              <div className=" flex-1">
                <CardContent>
                  <CardTitle className="text-xl">
                    Hassle-Free Logistics:{" "}
                  </CardTitle>
                  <p className="text-gray-600">
                    We take the stress out of logistics so you can focus on what
                    you do best—growing your business. From the moment you place
                    an order to the second it arrives at your doorstep, we’ve
                    got you covered.
                  </p>
                </CardContent>
                <CardFooter>
                  <a href="#" className="text-theme-orange text-sm font-medium">
                    Learn more →
                  </a>
                </CardFooter>
              </div>
            </Card>
            <Card className=" bg-[#D1E4FF]  p-3 md:p-7 flex flex-col md:flex-row gap-8 items-center mb-6">
              <CardHeader className=" flex-1">
                <Image
                  height={1000}
                  width={1000}
                  src="/assets/images/cardB3.png"
                  alt="Bulk Products"
                  className="rounded-lg w-full object-cover  h-52"
                />
              </CardHeader>
              <div className=" flex-1">
                <CardContent>
                  <CardTitle className="text-xl">
                    Your Own Online Store:{" "}
                  </CardTitle>
                  <p className="text-gray-600">
                    With Brandsquare’s &apos; Hub, you can create and customize
                    your storefront in minutes and start selling to customers
                    right away. It’s never been easier to take your business
                    online and reach a wider audience.
                  </p>
                </CardContent>
                <CardFooter>
                  <a href="#" className="text-theme-orange text-sm font-medium">
                    Learn more →
                  </a>
                </CardFooter>
              </div>
            </Card>
            <Card className=" bg-theme-blue BgBanner p-3 md:p-7 flex flex-col md:flex-row-reverse gap-8 items-center mb-6">
              <CardHeader className=" flex-1">
                <Image
                  height={1000}
                  width={1000}
                  src="/assets/images/cardB4.png"
                  alt="Bulk Products"
                  className="rounded-lg w-full object-cover  h-52"
                />
              </CardHeader>
              <div className=" flex-1">
                <CardContent>
                  <CardTitle className="text-xl text-white">
                    Brandsquare is designed to help businesses like yours thrive
                    in the digital marketplace
                  </CardTitle>
                  <p className="text-white">
                    Running a successful business requires more than just great
                    products—it’s about staying organized, making smart
                    decisions, and keeping your customers happy. That’s why
                    Brandsquare’s Vendors&apos; Hub comes equipped with powerful
                    business tools that put you in the driver’s seat.
                  </p>
                </CardContent>
                <CardFooter>
                  <a href="#" className="text-theme-orange text-sm font-medium">
                    Learn more →
                  </a>
                </CardFooter>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-12 border-t border-b border-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Why are we different?</h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative  ">
              <Image
                height={500}
                width={500}
                src="/assets/images/Laptoplady.png"
                alt="Bulk Products"
                className=" md:max-h-[600px]  md:max-w-[550px] object-cover h-fit   "
              />
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-md p-6  ">
                <h3 className="text-2xl font-bold mb-4">
                  Empowering entrepreneurs
                </h3>
                <p className="text-gray-700 mb-4">
                  Your gateway to seamless collaboration and success. Manage
                  your products, track sales, and connect with customers
                  effortlessly on one unified platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Simplified International Transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Warehouse and Shipping Support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Instant Web Store Setup</span>
                  </li>
                </ul>
              </div>

              {/* Second Card */}
              <div className="bg-gray-50 rounded-md p-6 ">
                <h3 className="text-2xl font-bold mb-4">
                  Your partners for smarter selling
                </h3>
                <p className="text-gray-700 mb-4">
                  From listing your products to tracking performance, we provide
                  the tools you need to streamline operations and maximize your
                  reach
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Access to a large customer base</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Ongoing vendor education</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Flexible growth options</span>
                  </li>
                </ul>
              </div>

              <Button className="bg-theme-blue text-white hover:bg-navy-900 flex items-center gap-2">
                Signup As A Vendor Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Features That Empower Your Business
          </h2>

          <div className=" flex  md:flex-row flex-col gap-6 justify-between items-start">
            <div className="grid md:grid-cols-2 gap-6 flex-1">
              {/* Feature 1 */}
              <Card className=" bg-[#F0F1F6]">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-start  ">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20 2.19747e-10C22.6264 -1.23112e-05 25.2271 0.517293 27.6537 1.52238C30.0802 2.52747 32.285 4.00065 34.1421 5.85782C35.9993 7.71499 37.4725 9.91978 38.4776 12.3463C39.4827 14.7728 40 17.3735 40 20C40 31.0457 31.0457 40 20 40C8.95434 40 0 31.0457 0 20C0 8.95434 8.95434 2.19747e-10 20 2.19747e-10ZM22 22H18C13.0486 22 8.79769 24.9988 6.96422 29.2795C9.86522 33.3474 14.6228 36 20 36C25.3771 36 30.1347 33.3474 33.0358 29.2793C31.2023 24.9988 26.9514 22 22 22ZM20 6C16.6863 6 14 8.68631 14 12C14 15.3137 16.6863 18 20 18C23.3137 18 26 15.3137 26 12C26 8.68631 23.3138 6 20 6Z"
                        fill="#000051"
                      />
                    </svg>

                    <h3 className="font-bold text-lg mb-2 text-theme-blue text-left">
                      Easy Onboarding
                    </h3>
                    <p className="text-gray-600 text-left text-sm">
                      Get started in just a few simple steps. Our intuitive
                      platform makes it easy to list your products and start
                      selling.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className=" bg-[#F0F1F6]">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-start  ">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 0C17.6348 0 11.5303 2.52856 7.02944 7.02944C2.52856 11.5303 0 17.6348 0 24C0 30.3652 2.52856 36.4697 7.02944 40.9706C11.5303 45.4714 17.6348 48 24 48C30.3652 48 36.4697 45.4714 40.9706 40.9706C45.4714 36.4697 48 30.3652 48 24C48 17.6348 45.4714 11.5303 40.9706 7.02944C36.4697 2.52856 30.3652 0 24 0ZM22.416 10.614C26.8 10.564 31.148 12.882 33.276 17.222C35.094 20.926 35.032 24.442 33.08 28.512C32.126 30.502 32.106 30.632 32.598 31.668C33.026 32.572 34.052 33.226 35.04 33.226C35.948 33.226 37.34 32.054 37.544 31.118C37.744 30.21 37.158 28.882 36.33 28.364C36.0641 28.2002 35.802 28.0301 35.544 27.854C35.286 27.654 36.384 27.094 37.026 27.094C38.4 27.094 39.52 28.146 39.776 29.674C39.886 30.34 40.044 30.518 40.656 30.678C42.374 31.122 43.25 33.58 42.166 34.91C41.726 35.45 41.706 35.452 41.556 34.994C41.022 33.392 40.224 32.754 38.75 32.754C38.112 32.754 37.606 33.01 36.554 33.866C34.542 35.506 32.822 36.472 30.74 37.13C28.188 37.898 25.236 38.086 22.568 37.442C18.244 36.58 14.104 33.222 12.064 28.928C9.516 23.564 10.27 18 14.066 14.154C15.1569 13.0441 16.4558 12.1602 17.8886 11.5528C19.3214 10.9454 20.8598 10.6264 22.416 10.614Z"
                        fill="#000051"
                      />
                    </svg>

                    <h3 className="font-bold text-lg mb-2 text-theme-blue text-left">
                      Powerful Analytics
                    </h3>
                    <p className="text-gray-600 text-left text-sm">
                      Gain insights into your sales performance and customer
                      behavior.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className=" bg-[#F0F1F6]">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-start  ">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 0C4.4087 0 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6V8H40V6C40 4.4087 39.3679 2.88258 38.2426 1.75736C37.1174 0.632141 35.5913 0 34 0H6ZM40 12H0V26C0 27.5913 0.632141 29.1174 1.75736 30.2426C2.88258 31.3679 4.4087 32 6 32H34C35.5913 32 37.1174 31.3679 38.2426 30.2426C39.3679 29.1174 40 27.5913 40 26V12ZM12 22C12 21.4696 12.2107 20.9609 12.5858 20.5858C12.9609 20.2107 13.4696 20 14 20H22.828L22.586 19.758C22.2107 19.383 21.9998 18.8742 21.9996 18.3437C21.9994 17.8132 22.21 17.3043 22.585 16.929C22.96 16.5537 23.4688 16.3428 23.9993 16.3426C24.5298 16.3424 25.0387 16.553 25.414 16.928L29.07 20.586C29.4449 20.9611 29.6556 21.4697 29.6556 22C29.6556 22.5303 29.4449 23.0389 29.07 23.414L25.414 27.07C25.2295 27.261 25.0088 27.4134 24.7648 27.5182C24.5208 27.623 24.2584 27.6782 23.9928 27.6805C23.7272 27.6828 23.4639 27.6322 23.2181 27.5316C22.9723 27.4311 22.749 27.2826 22.5612 27.0948C22.3734 26.907 22.2249 26.6837 22.1244 26.4379C22.0238 26.1921 21.9732 25.9288 21.9755 25.6632C21.9778 25.3976 22.033 25.1352 22.1378 24.8912C22.2426 24.6472 22.395 24.4265 22.586 24.242L22.828 24H14C13.4696 24 12.9609 23.7893 12.5858 23.4142C12.2107 23.0391 12 22.5304 12 22Z"
                        fill="#000051"
                      />
                    </svg>

                    <h3 className="font-bold text-lg mb-2 text-theme-blue text-left">
                      Flexible Pricing
                    </h3>
                    <p className="text-gray-600 text-left text-sm">
                      Choose from various commission structures that suit your
                      business model.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className=" bg-[#F0F1F6]">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-start  ">
                    <svg
                      width="30"
                      height="42"
                      viewBox="0 0 30 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.581 29.346L10.578 29.337L10.008 29.151C7.29707 28.1928 4.91866 26.4757 3.156 24.204C1.73065 22.3686 0.751271 20.227 0.295102 17.9483C-0.161067 15.6696 -0.0815441 13.3161 0.527397 11.0734C1.13634 8.8307 2.25804 6.76015 3.80403 5.02509C5.35002 3.29002 7.27801 1.93789 9.43592 1.07536C11.5938 0.212825 13.9226 -0.136525 16.2386 0.054866C18.5547 0.246257 20.7945 0.973154 22.7816 2.17822C24.7686 3.38329 26.4485 5.03356 27.6887 6.99887C28.9289 8.96418 29.6955 11.1908 29.928 13.503C30.009 14.328 29.328 15 28.5 15C27.672 15 27.009 14.325 26.91 13.503C26.6423 11.3815 25.8125 9.37008 24.5066 7.67686C23.2006 5.98363 21.466 4.67012 19.4821 3.87224C17.4982 3.07435 15.3371 2.82107 13.2225 3.13861C11.1078 3.45614 9.11648 4.33296 7.45442 5.67833C5.79236 7.02371 4.51998 8.78876 3.76894 10.7909C3.01791 12.793 2.8155 14.9594 3.18265 17.066C3.5498 19.1725 4.47319 21.1428 5.85725 22.7727C7.24132 24.4027 9.0358 25.6333 11.055 26.337C11.5643 25.4081 12.3851 24.6886 13.3727 24.3053C14.3604 23.922 15.4516 23.8994 16.4543 24.2416C17.4569 24.5838 18.3067 25.2688 18.854 26.1759C19.4012 27.083 19.6109 28.1541 19.446 29.2007C19.2812 30.2472 18.7524 31.202 17.9527 31.8969C17.1531 32.5919 16.1339 32.9825 15.0746 32.9998C14.0153 33.0172 12.9839 32.6603 12.1619 31.9919C11.3399 31.3235 10.7801 30.3866 10.581 29.346ZM8.202 31.671C5.26382 30.4715 2.69502 28.5164 0.756 26.004C0.263146 26.7432 9.68095e-05 27.6116 0 28.5V30C0 35.913 5.58 42 15 42C24.42 42 30 35.913 30 30V28.5C30 27.3065 29.5259 26.162 28.682 25.318C27.8381 24.4741 26.6935 24 25.5 24H21C21.6292 24.8403 22.075 25.8034 22.3085 26.8269C22.5421 27.8504 22.5581 28.9115 22.3557 29.9416C22.1533 30.9717 21.7368 31.9478 21.1333 32.8068C20.5298 33.6658 19.7527 34.3885 18.8523 34.9282C17.9519 35.468 16.9482 35.8126 15.9061 35.9399C14.8641 36.0673 13.8069 35.9744 12.803 35.6674C11.7991 35.3604 10.8709 34.846 10.0783 34.1576C9.28573 33.4692 8.64651 32.6221 8.202 31.671ZM24 15C24 12.258 22.773 9.80102 20.838 8.15102C19.8932 7.35076 18.7935 6.75405 17.6076 6.39821C16.4217 6.04237 15.1751 5.93505 13.9458 6.08296C12.7165 6.23088 11.531 6.63084 10.4634 7.25784C9.3957 7.88485 8.46891 8.7254 7.74094 9.72693C7.01297 10.7285 6.49947 11.8694 6.23258 13.0785C5.96568 14.2875 5.95112 15.5386 6.18981 16.7535C6.4285 17.9684 6.91531 19.1211 7.61978 20.1393C8.32425 21.1575 9.23123 22.0193 10.284 22.671C11.618 21.5896 13.2827 20.9986 15 20.997C16.7166 20.9969 18.3812 21.5857 19.716 22.665C21.0252 21.8596 22.1063 20.7322 22.8562 19.3904C23.6062 18.0486 23.9999 16.5371 24 15Z"
                        fill="#000051"
                      />
                    </svg>

                    <h3 className="font-bold text-lg mb-2 text-theme-blue text-left">
                      24/7 Support
                    </h3>
                    <p className="text-gray-600 text-left text-sm">
                      Access our dedicated vendor support team anytime you need
                      assistance.{" "}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className=" flex-1 flex justify-end">
              <div className="  ">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/Screen.png"
                  alt="Bulk "
                  className=" object-contain border-4 rounded-lg border-theme-blue "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What is the Brandsquare Vendors&apos; Hub?
                </AccordionTrigger>
                <AccordionContent>
                  The Brandsquare Vendors&apos; Hub is a platform designed to
                  help small businesses grow and scale.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How do I start selling on Brandsquare?
                </AccordionTrigger>
                <AccordionContent>
                  Sign up for an account, complete your profile, and list your
                  products to start selling.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How do I pay for goods from Chinese vendors?
                </AccordionTrigger>
                <AccordionContent>
                  We handle all payments to suppliers. You only pay us for the
                  products you order.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How does the 50% capital option work?
                </AccordionTrigger>
                <AccordionContent>
                  You pay 50% upfront, and the remaining balance is paid as your
                  products sell.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-theme-blue text-white hover:bg-navy-900">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t border-gray-200 mt-8 bg-[#C2DCFF]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <DashLogo width="60" height="60" />
              <p className="text-gray-600 text-sm mb-4">
                Brandsquare is a platform that helps entrepreneurs and small
                businesses scale and succeed in the digital marketplace.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Our Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Health & Wellness</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Supplements
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Beauty & Skin
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Weight Loss
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Sports & Outdoor Gear</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Fitness Equipment
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Sports Nutrition
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Outdoor
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
            <p>© Copyright 2025 - All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// const VerticalBar = ( ) => {
//     return (
//         <div className="bar">
//             <div className="half orange"></div>
//             <div className="half gray"></div>
//         </div>
//     );
// };
