import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DesktopNav from "../ui/navigation/DesktopNav";
//import ChevronLeftIcon from "../../../../public/assets/icons/chevronLeftIcon";
import ChevronRightIcon from "../../../../public/assets/icons/chevronRightIcon";
import Footer from "../ui/Footer";
import useInitAuthStore from "@/app/store/InitAuthStore";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DesktopHome() {
  const { isAuthenticated } = useInitAuthStore();
  return (
    <div className="flex min-h-screen flex-col">
      <DesktopNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="bg-[#D9D9D9] overflow-hidden">
          <div className="flex items-center mt-[4rem] h-[75vh] ml-[3.5rem]">
            <div className="flex-[3]  space-y-4 ">
              <h1 className="text-[54px] font-[600] font-dm-sans tracking-tight">
                Welcome to Brandsquare Suppliers Hub
              </h1>
              <p className="text-muted-foreground font-dm-sans">
                Partner with us to bring your products to one of Africa&apos;s most active e-commerce markets. Brandsquare connects trusted Chinese suppliers directly with verified vendors across Nigeria, offering a secure and scalable partnership where your products get the exposure, reliability, and logistics support they need to thrive.
              </p>
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="bg-[#000051] mt-[30px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                    Become a Supplier
                    <span>
                      <ChevronRightIcon color="#ffffff" />
                    </span>
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/create-account">
                  <Button className="bg-[#000051] mt-[30px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                    Become a Supplier
                    <span>
                      <ChevronRightIcon color="#ffffff" />
                    </span>
                  </Button>
                </Link>
              )}
            </div>
            <div className="flex-[2] relative overflow-hidden">
              <Image
                src="/assets/svg/hg1.svg"
                alt="Store Booth"
                width={5408}
                height={4068}
                className="w-full h-full object-cover translate-x-6 "
              />
            </div>
          </div>
        </section>

        {/* 50% Capital Section */}
        <section className="py-8">
          <div className="container mx-auto">
            <h2 className="text-[48px] font-[900] tracking-tight font-dm-sans ">
              Why Chinese Factories Choose Brandsquare
            </h2>
            <div className="flex items-center bg-white rounded-xl shadow-md border px-[56px]">
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground font-dm-sans">
                  Chinese manufacturers choose Brandsquare because we provide secure and predictable trade. With 40% of the order value paid upfront and full balance settled upon delivery confirmation, you can produce and ship with confidence. Our vendor network ensures steady product demand, and our in-market knowledge helps your products succeed locally. From marketing to logistics, we handle the complex side—so you can focus on production.
                </p>
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button className="bg-[#000051] mt-[30px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                      Continue to Dashboard
                      <span>
                        <ChevronRightIcon color="#ffffff" />
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/create-account">
                    <Button className="bg-[#000051] mt-[30px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                      Become a Supplier
                      <span>
                        <ChevronRightIcon color="#ffffff" />
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src="/assets/svg/ma1.svg"
                  alt="Smiling Man"
                  width={878}
                  height={479}
                  className="object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>


        <section className="py-8">
          <div className="container mx-auto">
            <h2 className="text-[48px] font-[900] tracking-tight font-dm-sans ">
              What You’ll Gain With Brandsquare
            </h2>
            <div className="flex flex-row-reverse items-center bg-white rounded-xl shadow-md border px-[56px]">
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground font-dm-sans">
                  When you join our supplier network, you get more than orders. You gain a trusted channel into the Nigerian market. We offer access to high-demand vendors, structured order cycles, and promotional support. Your products are marketed across platforms while our logistics team ensures seamless delivery from factory to warehouse. It’s a simple, scalable way to grow beyond borders.
                </p>
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button className="bg-[#000051] mt-[30px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                      Continue to Dashboard
                      <span>
                        <ChevronRightIcon color="#ffffff" />
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/create-account">
                    <Button className="bg-[#000051] mt-[30px] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                      Become a Supplier
                      <span>
                        <ChevronRightIcon color="#ffffff" />
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src="/assets/svg/ma1.svg"
                  alt="Smiling Man"
                  width={878}
                  height={479}
                  className="object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Why Choose Section */}
        <section id="why-choose" className="py-8">
          <div className="container mx-auto space-y-8">
            <h2 className="text-[40px] font-[900] font-dm-sans tracking-tight text-center">
              Why Choose Brandsquare Supplier Hub
            </h2>

            <div className="flex flex-col gap-8">
              {/* Card 1 */}
              <div className="bg-[#000051] flex flex-row-reverse items-center px-[76px] gap-8 rounded-xl py-[56px] text-white">
                <div className="flex-1">
                  <h3 className="text-[32px] font-dm-sans font-[600] mb-4">
                    Affordable Bulk Products
                  </h3>
                  <p className="mb-4">
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
                        Become a Supplier
                        <span>
                          <ChevronRightIcon color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>
                <div className="flex-1">
                  <Image
                    src="/assets/svg/ycu1.svg"
                    alt="Bulk Products"
                    width={491}
                    height={290}
                    className="w-[30rem] h-[17rem] object-cover rounded-lg mb-4"
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#000051] flex  items-center px-[76px] gap-8 rounded-xl py-[56px] text-white">
                <div className="flex-1">
                  <h3 className="text-[32px] font-dm-sans font-[600] mb-4">
                    Hassle-Free Logistics:
                  </h3>
                  <p className="mb-4">
                    We take the stress out of logistics so you can focus on what
                    you do best—growing your business. From the moment you place
                    an order to the second it arrives at your doorstep, we’ve
                    got you covered.
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
                        Become a Supplier
                        <span>
                          <ChevronRightIcon color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>
                <div className="flex-1">
                  <Image
                    src="/assets/svg/ycu2.svg"
                    alt="Bulk Products"
                    width={491}
                    height={290}
                    className="w-[30rem] h-[17rem] object-cover rounded-lg mb-4"
                  />
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#000051] flex flex-row-reverse items-center px-[76px] gap-8 rounded-xl py-[56px] text-white">
                <div className="flex-1">
                  <h3 className="text-[32px] font-dm-sans font-[600] mb-4">
                    Your Own Online Store:
                  </h3>
                  <p className="mb-4">
                    With Brandsquare&apos;s Suppliers &apos; Hub, you can create
                    and customize your storefront in minutes and start selling
                    to customers right away. It’s never been easier to take your
                    business online and reach a wider audience.
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
                        Become a Supplier
                        <span>
                          <ChevronRightIcon color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>
                <div className="flex-1">
                  <Image
                    src="/assets/svg/ycu3.svg"
                    alt="Bulk Products"
                    width={491}
                    height={290}
                    className="w-[30rem] h-[17rem] object-cover rounded-lg mb-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Marketplace Section */}
        <section className="py-8">
          <div className="container mx-auto">
            <div
              style={{
                backgroundImage: "url('/assets/images/authBg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="flex items-center gap-8 bg-[#1a1b5e] rounded-xl text-white"
            >
              <div className="flex-1 ml-[50px] space-y-4">
                <h2 className="text-[30px] font-dm-sans font-[600]">
                  Brandsquare is designed to help businesses like yours thrive
                  in the digital marketplace
                </h2>
                <p className="text-sm font-dm-sans">
                  Running a successful business requires more than just great
                  products—it’s about staying organized, making smart decisions,
                  and keeping your customers happy. That’s why Brandsquare’s
                  Suppliers&apos; Hub comes equipped with powerful business tools
                  that put you in the driver’s seat.
                </p>
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button className="bg-[#fff] mt-2 hover:bg-[#1a1b5e]/90 py-[1.5rem] text-[#000051] flex gap-2 items-center">
                      Continue to Dashboard
                      <span>
                        <ChevronRightIcon color="#000051" />
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/create-account">
                    <Button className="bg-[#fff] mt-2 hover:bg-[#1a1b5e]/90 py-[1.5rem] text-[#000051] flex gap-2 items-center">
                      Get Started
                      <span>
                        <ChevronRightIcon color="#000051" />
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex-1 flex relative">
                <Image
                  src="/assets/svg/dash1.svg"
                  alt="Dashboard"
                  width={567.2191162109375}
                  height={398.14361572265625}
                  className="w-full h-full mt-[63px] "
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Different Section */}
        <section className="py-8">
          <div className="container mx-auto">
            <h2 className="text-[40px] font-[900] font-dm-sans tracking-tight text-center mb-8">
              Why is Brandsquare Different?
            </h2>

            <div className="flex-1 flex justify-center gap-8">
              <div className="flex justify-center items-center ">
                <Image
                  src="/assets/svg/ybd1.svg"
                  alt="Smiling Woman"
                  width={497}
                  height={508}
                  className="object-contain shadow-sm rounded-xl"
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
                      <li>Ongoing Supplier education</li>
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
                        Become a Supplier
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
          <div className="container mx-auto">
            <h2 className="text-[40px] font-[900] font-dm-sans  tracking-tight mb-8">
              Features That Empower Your Business
            </h2>
            <div className="flex items-center">
              <div className="flex-[3] flex justify-center items-center ">
                <div className="bg-white rounded-md shadow-md py-[29px] px-[48px] flex gap-x-3 items-center">
                  <div className="w-[6px] rounded-[6px] bg-[#F0F1F6] h-full z-20">
                    <div className="w-full h-[50%] bg-[#E55420] rounded-[6px]"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
          <div className="container mx-auto">
            <div className="flex justify-center items-center">
              <div className="flex flex-col shadow-md py-[42px] px-[37px] rounded-md  ">
                <h2 className="text-[40px] font-dm-sans font-[900] tracking-tight text-center mb-8">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="item-1"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-base font-medium py-4">
                      What kind of suppliers do you work with?
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">
                      We work with Chinese factories or sourcing companies that can handle consistent production, maintain quality standards, and support export-ready processes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-base font-medium py-4">
                      How do payments work?
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">
                      You’ll receive 40% of the total order value upfront. The balance (60%) is paid after the goods arrive at our warehouse and pass basic inspection.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-base font-medium py-4">
                      Who handles logistics?
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">
                      We do Our logistics team manages shipping from China to Nigeria and ensures safe delivery through our fulfillment network.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-base font-medium py-4">
                      How do I know which products you need?
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">
                      Once you’re onboarded, we’ll guide you based on market demand, seasonality, and product performance insights.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-base font-medium py-4">
                      What if I don’t speak English?
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">
                      You can work through a bilingual representative or trading partner who can help communicate clearly with our team.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-base font-medium py-4">
                      Can I work with you if I don’t have certifications?
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">
                      We prioritize factories that meet quality standards. However, if your products meet our criteria but lack formal certificates, we’ll assess your case individually.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-8 text-center flex justify-center items-center">
                  <Button className="bg-[#000051] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                    View More FAQs
                    <span>
                      <ChevronRightIcon color="#ffffff" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="py-[39px]">
          <div className="container mx-auto rounded-lg bg-[#000051]">
            <div className="flex flex-col justify-center items-center py-[30px] px-[45px]">
              <h2 className="font-[800] text-[48px] font-dm-sans text-[#fff] text-center">
                Contact Brandsquare
              </h2>
              <p className="text-[20px] font-[600] font-dm-sans text-center text-[#FFFFFF]">
                Have a question or collaboration in mind? Fill out the form{" "}
                <br />
                below, and we&apos;ll get back to you soon!
              </p>
              <div className="mt-[44px]">
                <form className="flex flex-col gap-3 item-center">
                  <div>
                    <Label className="text-white">Fullname</Label>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      className="py-3 bg-white w-[685px]"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Email</Label>
                    <Input
                      type="email"
                      placeholder="Your Name"
                      className="py-3 bg-white w-[685px]"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Message</Label>
                    <Textarea
                      placeholder="Your Message"
                      className="py-3 bg-white w-[685px]"
                    ></Textarea>
                  </div>
                  <div>
                    <Button className="bg-[#000051] w-[685px] border border-[#ffffff] hover:bg-[#1a1b5e]/90 py-[1.5rem] text-white flex gap-2 items-center">
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
