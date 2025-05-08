import Image from "next/image";
import Link from "next/link";
//import { Facebook, Instagram, Twitter } from "lucide-react";
import ChevronRightIcon from "../../../../public/assets/icons/chevronRightIcon";
import useInitAuthStore from "@/app/store/InitAuthStore";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MobileNav from "../ui/navigation/MobileNav";
import MobileFooter from "../ui/MobileFooter";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function MobileHome() {
  const { isAuthenticated } = useInitAuthStore();
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <MobileNav />

      {/* Hero Section */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8">
          <div className="container px-4 space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-[24px] font-dm-sans font-[700] tracking-tight">
                Welcome to Brandsquare Vendor&apos;s Hub
              </h1>
              <p className="text-muted-foreground text-[12px] font-[500]">
                At Brandsquare, we understand the challenges small businesses
                face: limited access to quality products, high upfront costs,
                and the struggle to manage operations efficiently. That’s why we
                created the Vendors Hub—a one-stop solution designed to empower
                vendors like you. with as little as 50% capital. The Vendors Hub
                is your go-to destination for building a thriving business
                without any stress.
              </p>
            </div>
            <div className="flex justify-center items-center ">
              <Image
                src="/assets/images/hg1.png"
                alt="Store Booth"
                width={415}
                height={227}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex justify-center items-center">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="bg-[#000051] w-[328px] h-[50px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                    Continue to Dashboard
                    <span>
                      <ChevronRightIcon color="#ffffff" />
                    </span>
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/create-account">
                  <Button className="bg-[#000051] w-[328px] h-[50px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                    Become a Vendor
                    <span>
                      <ChevronRightIcon color="#ffffff" />
                    </span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* 50% Capital Section */}
        <section className="py-8">
          <div className="container px-4">
            <h2 className="text-[20px] font-[900] font-dm-sans tracking-tight mb-[17px]">
              Start with Just 50% Capital
            </h2>
            <div className="bg-white rounded-xl shadow-sm border px-[18px]">
              <div className="space-y-6">
                <div className="space-y-4 my-[20px]">
                  <p className="text-muted-foreground text-center text-[12px] font-[500] font-dm-sans">
                    You can kickstart your business with only 50% advance
                    payment of the required capital. Imagine launching your
                    dream business, tapping into your passion, and making a
                    meaningful impact—all while managing your finances wisely.
                    Order bulk products with just half upfront and pay the
                    balance when you receive your orders.
                  </p>
                </div>
                <div className="flex justify-center items-center bg-res-600">
                  <Image
                    src="/assets/svg/ma1.svg"
                    alt="Smiling Man"
                    width={644}
                    height={351}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-[35px]">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="bg-[#000051] w-[328px] h-[50px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                    Continue to Dashboard
                    <span>
                      <ChevronRightIcon color="#ffffff" />
                    </span>
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/create-account">
                  <Button className="bg-[#000051] w-[328px] h-[50px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                    Become a Vendor
                    <span>
                      <ChevronRightIcon color="#ffffff" />
                    </span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="why-choose" className="py-8 mt-[68px]">
          <div className="container px-4 space-y-8">
            <h2 className="text-[24px] font-dm-sans font-[700] tracking-tight text-center">
              Why Choose Brandsquare Vendor&apos;s Hub
            </h2>

            <div className="space-y-4">
              {/* Card 1 */}
              <div className="flex flex-col-reverse bg-[#1a1b5e] rounded-xl p-6 text-white">
                <div>
                  <h3 className="text-[20px] font-[600] font-dm-sans mb-4">
                    Affordable Bulk Products
                  </h3>
                  <p className="mb-4 text-[14px] font-[400] font-dm-sans">
                    Source high-quality goods at unbeatable prices directly from
                    trusted manufacturers. We know that finding high-quality
                    products at affordable prices is one of the biggest
                    challenges for small businesses. That’s why we’ve partnered
                    directly with trusted manufacturers to bring you a wide
                    range of products at very low prices. Whether you’re looking
                    for electronics, fashion, home goods, or beauty products,
                    we’ve got you covered.
                  </p>
                  {isAuthenticated ? (
                    <Link href="/dashboard">
                      <Button className="bg-[#E55420] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                        Continue to Dashboard
                        <span>
                          <ChevronRightIcon color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth/create-account">
                      <Button className="bg-[#E55420] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                        Become a Vendor
                        <span>
                          <ChevronRightIcon color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>
                <Image
                  src="/assets/svg/ycu1.svg"
                  alt="Bulk Products"
                  width={303}
                  height={290}
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
              </div>

              {/* Card 2 */}
              <div className="flex flex-col bg-[#1a1b5e] rounded-xl p-6 text-white">
                <div>
                  <h3 className="text-[20px] font-[600] font-dm-sans mb-4">
                    Hassle-Free Logistics: 
                  </h3>
                  <p className="mb-4 text-[14px] font-[400] font-dm-sans">
                    We take the stress out of logistics so you can focus on what
                    you do best—growing your business. From the moment you place
                    an order to the second it arrives at your doorstep, we’ve
                    got you covered.
                  </p>
                </div>
                <Image
                  src="/assets/svg/ycu2.svg"
                  alt="Bulk Products"
                  width={303}
                  height={290}
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button className="bg-[#E55420] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                      Continue to Dashboard
                      <span>
                        <ChevronRightIcon color="#ffffff" />
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/create-account">
                    <Button className="bg-[#E55420] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                      Become a Vendor
                      <span>
                        <ChevronRightIcon color="#ffffff" />
                      </span>
                    </Button>
                  </Link>
                )}
              </div>

              {/* Card 3 */}
              <div className="flex flex-col-reverse bg-[#1a1b5e] rounded-xl p-6 text-white">
                <div>
                  <h3 className="text-[20px] font-[600] font-dm-sans mb-4">
                    Your Own Online Store: 
                  </h3>
                  <p className="mb-4 text-[14px] font-[400] font-dm-sans">
                    With Brandsquare’s Vendors Hub, you can create and customize
                    your storefront in minutes and start selling to customers
                    right away. It’s never been easier to take your business
                    online and reach a wider audience.
                  </p>
                  {isAuthenticated ? (
                    <Link href="/dashboard">
                      <Button className="bg-[#E55420] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                        Continue to Dashboard
                        <span>
                          <ChevronRightIcon color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth/create-account">
                      <Button className="bg-[#E55420] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                        Become a Vendor
                        <span>
                          <ChevronRightIcon color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>
                <Image
                  src="/assets/svg/ycu3.svg"
                  alt="Bulk Products"
                  width={303}
                  height={290}
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Digital Marketplace Section */}
        <section className="py-8">
          <div className="container px-4">
            <div className=" bg-[#1a1b5e] rounded-xl p-6 text-white">
              <div className="flex flex-col-reverse space-y-6">
                <div className="space-y-4">
                  <h2 className="text-[20px] font-[600] font-dm-sans">
                    Brandsquare is designed to help businesses like yours thrive
                    in the digital marketplace
                  </h2>
                  <p className="text-[14px] font-[400] mt-[25px] font-dm-sans">
                    Getting a business up and running might feel like a giant
                    undertaking. At Brandsquare, we&apos;ve simplified the
                    process with our all-in-one vendor platform.
                  </p>
                  <div className="mt-[25px]">
                    {isAuthenticated ? (
                      <Link href="/dashboard">
                        <Button className="bg-[#fff] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-[#000051] flex gap-2 items-center">
                          Continue to Dashboard
                          <span>
                            <ChevronRightIcon color="#000051" />
                          </span>
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/auth/create-account">
                        <Button className="bg-[#fff] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-[#000051] flex gap-2 items-center">
                          Get Started
                          <span>
                            <ChevronRightIcon color="#000051" />
                          </span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex mb-[40px] justify-center">
                  <Image
                    src="/assets/svg/chart1.svg"
                    alt="Dashboard"
                    width={291.6673278808594}
                    height={201.33135986328125}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Different Section */}
        <section className="py-8">
          <div className="container px-4">
            <h2 className="text-[20px] font-[900] font-dm-sans tracking-tight text-center mb-8">
              Why is Brandsquare Different?
            </h2>

            <div className="space-y-6">
              <div className="flex justify-center">
                <Image
                  src="/assets/svg/ybd1.svg"
                  alt="Smiling Woman"
                  width={304}
                  height={319}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div className="flex-1 flex gap-x-4 space-y-6">
                <div className="w-[6px] rounded-[6px] bg-gray-200 h-full">
                  <div className="w-full h-[50%] bg-[#E55420] rounded-[6px]"></div>
                </div>
                <div>
                  <div className="py-[30px] px-[45px] bg-[#F6F7F9] mb-[24px] rounded-[20px]">
                    <h3 className="text-[20px] font-[600] font-dm-sans mb-2">
                      Empowering entrepreneurs
                    </h3>
                    <p className="text-muted-foreground">
                      Your gateway to seamless collaboration and success. Manage
                      your products, track sales, and connect with customers
                      effortlessly on one unified platform.
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                      <li>Simplified International Transactions</li>
                      <li>Warehouse and Shipping Support</li>
                      <li>Instant Web Store Setup</li>
                    </ul>
                  </div>

                  <div className="py-[30px] px-[45px] bg-[#F6F7F9] mb-[24px] rounded-[20px]">
                    <h3 className="text-[20px] font-[600] font-dm-sans mb-2">
                      Your partners for smarter selling
                    </h3>
                    <p className="text-muted-foreground">
                      From Listing your products to tracking performance, we
                      provide the tools you need to streamline operations and
                      maximize your reach
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                      <li>Access to a large customer base</li>
                      <li>Ongoing vendor education</li>
                      <li>Flexible growth options</li>
                    </ul>
                  </div>

                  {isAuthenticated ? (
                    <Link href="/dashboard">
                      <Button className="bg-[#000051] hover:bg-[#1a1b5e]/90 px-[116px] py-[1.5rem] text-white flex gap-2 items-center">
                        Continue to Dashboard
                        <span>
                          <ChevronRightIcon color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth/create-account">
                      <Button className="bg-[#000051] hover:bg-[#1a1b5e]/90 px-[116px] py-[1.5rem] text-white flex gap-2 items-center">
                        Become a Vendor
                        <span>
                          <ChevronRightIcon color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-8 bg-gray-50">
          <div className="container px-4">
            <h2 className="text-[20px] font-[900] font-dm-sans tracking-tight text-center mb-8">
              Features That Empower Your Business
            </h2>

            <div className="flex flex-col-reverse items-center">
              <div className="flex-[3] flex justify-center items-center ">
                <div className="bg-white rounded-md shadow-md py-[29px] px-[48px] flex gap-x-3 items-center">
                  <div className="w-[6px] rounded-[6px] bg-[#F0F1F6] h-full z-20">
                    <div className="w-full h-[50%] bg-[#E55420] rounded-[6px]"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Feature 1 */}
                    <div className="bg-[#F0F1F6] p-6 rounded-xl shadow-sm">
                      <div className="w-12 h-12 bg-[#1a1b5e]/10 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-[#1a1b5e]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6V18M6 12H18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        Sales Monitoring
                      </h3>
                      <p className="text-muted-foreground">
                        Get detailed analytics and real-time insights into your
                        sales performance.
                      </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-[#F0F1F6] p-6 rounded-xl shadow-sm">
                      <div className="w-12 h-12 bg-[#1a1b5e]/10 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-[#1a1b5e]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 19L3.5 13.5M3.5 13.5L9 8M3.5 13.5H21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        Financial Analytics
                      </h3>
                      <p className="text-muted-foreground">
                        Keep track of your revenue, expenses, and profit margins
                        with our comprehensive financial tools.
                      </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-[#F0F1F6] p-6 rounded-xl shadow-sm">
                      <div className="w-12 h-12 bg-[#1a1b5e]/10 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-[#1a1b5e]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Order Tracking</h3>
                      <p className="text-muted-foreground">
                        Monitor order status and shipments in real-time to keep
                        your customers informed.
                      </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-[#F0F1F6] p-6 rounded-xl shadow-sm">
                      <div className="w-12 h-12 bg-[#1a1b5e]/10 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-[#1a1b5e]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        Inventory Management
                      </h3>
                      <p className="text-muted-foreground">
                        Receive real-time inventory updates and automated
                        restock alerts to never miss a sale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-[2] flex justify-center py-4">
                <Image
                  src="/assets/svg/chart1.svg"
                  alt="Dashboard Analytics"
                  width={400}
                  height={240}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-8">
          <div className="container px-4">
            <h2 className="text-[20px] font-[900] font-dm-sans tracking-tight text-center mb-8">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-4">
                <AccordionTrigger className="text-base font-medium py-4">
                  What is the Brandsquare Vendor Hub?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground text-sm">
                  The Brandsquare Vendor Hub is a comprehensive platform
                  designed to help product vendors in Africa grow their
                  businesses by providing access to affordable products,
                  logistics solutions, and online selling tools.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-4">
                <AccordionTrigger className="text-base font-medium py-4">
                  How do I start selling on Brandsquare?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground text-sm">
                  To start selling on Brandsquare, simply sign up for a vendor
                  account, complete your profile, and start listing your
                  products. Our team will guide you through the entire process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-4">
                <AccordionTrigger className="text-base font-medium py-4">
                  How do I pay for goods from Chinese vendors?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground text-sm">
                  Brandsquare handles all payments to international suppliers.
                  You only need to pay us directly, and we&apos;ll manage the
                  rest, including currency exchange and international transfers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-4">
                <AccordionTrigger className="text-base font-medium py-4">
                  How does the 50% capital option work?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground text-sm">
                  Our 50% capital option allows you to start your business by
                  paying only half of the required capital upfront. The
                  remaining balance can be paid after you&apos;ve started
                  selling and generating revenue.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 text-center">
              <Button className="bg-[#1a1b5e] hover:bg-[#1a1b5e]/90 text-white w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
        <section id="contact" className="py-[39px] px-[18px]">
          <div className="container mx-auto rounded-lg bg-[#000051]">
            <div className="flex flex-col justify-center items-center py-[30px] px-[45px]">
              <h2 className="font-[900] text-[16px] font-dm-sans text-[#fff] text-center">
                Contact Brandsquare
              </h2>
              <p className="text-[12px] font-[700] font-dm-sans text-center text-[#FFFFFF]">
                Have a question or collaboration in mind? Fill out the form
                below, and we&apos;ll get back to you soon!
              </p>
              <div className="mt-[44px]">
                <form className="flex flex-col gap-3 item-center">
                  <div>
                    <Label className="text-white">Fullname</Label>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      className="py-3 bg-white w-[276px]"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Email</Label>
                    <Input
                      type="email"
                      placeholder="Your Name"
                      className="py-3 bg-white w-[276px]"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Message</Label>
                    <Textarea
                      placeholder="Your Message"
                      className="py-3 bg-white w-[276px]"
                    ></Textarea>
                  </div>
                  <div>
                    <Button className="bg-[#000051] w-[276px] border border-[#ffffff] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <MobileFooter />
    </div>
  );
}
