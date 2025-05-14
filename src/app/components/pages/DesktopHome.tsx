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
import LandingPageImage from '../../../../public/assets/images/landingpageImage.png'
import meninwork from '../../../../public/assets/images/meninwork.png'
import { MousePointer2 } from 'lucide-react'

const content = [
  {
    title: "Stable Orders",
    description: "We work with trusted Nigerian distributors.",
  },
  {
    title: "Secure payments",
    description: "Transparent payment terms—simple and reliable.",
  },
  {
    title: "Market Guadiance",
    description: "We help you tailor products for Nigerian buyers."
  },
  {
    title: "Logistics Covered",
    description: "From China to Nigeria—worry-free shipping."
  },
  {
    title: "Brand growth",
    description: "Build your name internationally through smart positioning.",
  }
]

export default function DesktopHome() {
  const { isAuthenticated } = useInitAuthStore();
  return (
    <div className="flex min-h-screen flex-col">
      <DesktopNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="bg-[#D9D9D9] overflow-hidden flex items-center justify-between px-8 mb-8">
          <div className="w-1/2">
            <div>
              <h1 className="text-[#313131] text-[50px] font-bold">
                Become a BrandSquare Supplier - Expand Your Reach.
              </h1>
              <p className="text-[#313131] text-lg">
                Tap into Nigeria&apo;s booming market with guaranteed orders, reliable logistics, and full market support.
              </p>
            </div>
            <div className="mt-6">
              <Button className="py-8 text-xl">
                Sign Up as a supplier
              </Button>
              <Button
                className="bg-[#D9D9D9] text-[#000051] border-[3px] border-[#000051] py-7 px-4 text-xl hover:bg-[#000051] hover:text-white ml-4"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="w-1/2 relative overflow-hidden">
            <div
              className="h-[500px] w-[500px] bg-[#000051] rounded-full absolute -top-30 left-1/2 -translate-x-1/2 z-0"
            ></div>

            <Image
              src={LandingPageImage}
              alt="Hero Image"
              width={1000}
              height={500}
              className="object-contain w-full h-auto relative z-10"
            />
          </div>
        </section>


        <section className="px-8">
          <div className="flex  items-center py-8">
            <div className="w-1/2">
              <Image
                src={meninwork}
                alt="Brandsquare suppliers"
                className="object-contain"
                width={600}
                height={400}
              />
            </div>


            <div className="">
              <h2 className="text-6xl font-bold mb-6 text-[#313131]">
                Why suppliers trust Brandsquare
              </h2>

              <div className="space-y-6">
                {content.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <MousePointer2 className="transform scale-x-[-1]" />
                    <div>
                      <p className="font-semibold text-lg">{item.title}</p>
                      <span className="text-gray-600">
                        {item.description}
                      </span>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>


        <section
          className="relative py-16 min-h-[500px] flex items-center h-full"
          style={{
            backgroundImage: "url('/assets/images/groupphoto.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: '#000051',
              opacity: 0.8,
            }}
          ></div>

          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="flex items-center justify-center flex-col text-center">
              <h2 className="text-5xl font-bold mb-8 leading-tight">
                Nigeria is ready for your products
              </h2>

              <div className="space-y-4 mb-10 text-center flex flex-col items-center">
                <div className="flex items-start gap-3">
                  <MousePointer2 className="w-5 h-5 mt-1 flex-shrink-0 transform scale-x-[-1]" />
                  <p className="text-4xl font-bold">200M+ population with growing demand</p>
                </div>
                <div className="flex items-start gap-3">
                  <MousePointer2 className="w-5 h-5 mt-1 flex-shrink-0 transform scale-x-[-1]" />
                  <p className="text-4xl font-bold">Limited competition, high growth potential</p>
                </div>
                <div className="flex items-start gap-3">
                  <MousePointer2 className="w-5 h-5 mt-1 flex-shrink-0 transform scale-x-[-1]" />
                  <p className="text-4xl font-bold">High need for affordable, quality Chinese goods</p>
                </div>
                <div className="flex items-start gap-3">
                  <MousePointer2 className="w-5 h-5 mt-1 flex-shrink-0 transform scale-x-[-1]" />
                  <p className="text-4xl font-bold">Local supply chains need direct factory partnerships</p>
                </div>
              </div>

              <Button className="bg-[#fff] text-[#000051]  border-[#000051] py-8 px-16 text-2xl hover:bg-[#000051] hover:text-white ">
                Sign up as a supplier
              </Button>
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
