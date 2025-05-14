import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ChevronRightIcon from "../../../../public/assets/icons/chevronRightIcon";
import useInitAuthStore from "@/app/store/InitAuthStore";
import { Button } from "@/components/ui/button";
import MobileNav from "../ui/navigation/MobileNav";
import MobileFooter from "../ui/MobileFooter";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    title: "Market Guidance",
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

export default function MobileHome() {
  const { isAuthenticated } = useInitAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderAuthButton = () => {
    if (!isClient) return null;

    const token = localStorage.getItem('token');
    const isSignedIn = isAuthenticated || !!token;

    if (isSignedIn) {
      return (
        <Link href="/dashboard" className="[&>button]:w-full">
          <Button className="py-6 lg:py-8 text-lg lg:text-xl w-full">
            Continue to Dashboard
          </Button>
        </Link>
      );
    } else {
      return (
        <Link href="/auth/create-account" className="[&>button]:w-full">
          <Button className="py-6 lg:py-8 text-lg lg:text-xl w-full">
            Sign Up as a supplier
          </Button>
        </Link>
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <MobileNav />

      <main className="flex-1">
        {/* Hero Section - Mobile Restructured */}
        <section id="home" className="bg-[#D9D9D9] px-4 py-8 mb-8">
          <div className="flex flex-col">
            <div className="order-2 mt-4 w-full">
              <h1 className="text-[#313131] text-3xl font-bold">
                Become a BrandSquare Supplier - Expand Your Reach.
              </h1>
              <p className="text-[#313131] text-base mt-2">
                Tap into Nigeria&apos;s booming market with guaranteed orders, reliable logistics, and full market support.
              </p>
              <div className="mt-6 flex flex-col space-y-4">
                {renderAuthButton()}               
              </div>
            </div>
            <div className="order-1 w-full relative">
              <div className="h-64 w-64 bg-[#000051] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
              <Image
                src={LandingPageImage}
                alt="Hero Image"
                width={400}
                height={300}
                className="object-contain w-full h-auto relative z-10"
              />
            </div>
          </div>
        </section>

        {/* Why Trust Section - Mobile Restructured */}
        <section className="px-4 py-8">
          <div className="flex flex-col">
            <div className="w-full mb-8">
              <Image
                src={meninwork}
                alt="Brandsquare suppliers"
                className="object-contain w-full"
                width={400}
                height={300}
              />
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold mb-6 text-[#313131]">
                Why suppliers trust Brandsquare
              </h2>
              <div className="space-y-4">
                {content.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <MousePointer2 className="transform scale-x-[-1] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-base">{item.title}</p>
                      <span className="text-gray-600 text-sm">
                        {item.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nigeria Ready Section - Mobile Restructured */}
        <section className="relative py-8 min-h-[400px] flex items-center"
          style={{
            backgroundImage: "url('/assets/images/groupphoto.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="absolute inset-0" style={{ backgroundColor: '#000051', opacity: 0.8 }}></div>
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-6">
                Nigeria is ready for your products
              </h2>
              <div className="space-y-4 mb-6">
                {[
                  "200M+ population with growing demand",
                  "Limited competition, high growth potential",
                  "High need for affordable, quality Chinese goods",
                  "Local supply chains need direct factory partnerships"
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-center gap-2">
                    <MousePointer2 className="w-4 h-4 mt-1 flex-shrink-0 transform scale-x-[-1]" />
                    <p className="text-sm font-bold text-center">{item}</p>
                  </div>
                ))}
              </div>
              {renderAuthButton()}
            </div>
          </div>
        </section>

        {/* Why Different Section - Mobile Restructured */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              Why is Brandsquare Different?
            </h2>
            <div className="flex flex-col">
              <div className="mb-6">
                <Image
                  src="/assets/svg/ybd1.svg"
                  alt="Smiling Woman"
                  width={300}
                  height={300}
                  className="object-contain w-full rounded-xl"
                />
              </div>
              <div className="flex flex-col space-y-6">
                <div className="py-4 px-6 bg-[#F6F7F9] rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">Empowering entrepreneurs</h3>
                  <p className="text-sm text-gray-600">
                    Your gateway to seamless collaboration and success. Manage your products, track sales, and connect with customers effortlessly on one unified platform.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>Simplified International Transactions</li>
                    <li>Warehouse and Shipping Support</li>
                    <li>Instant Web Store Setup</li>
                  </ul>
                </div>
                <div className="py-4 px-6 bg-[#F6F7F9] rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">Your partners for smarter selling</h3>
                  <p className="text-sm text-gray-600">
                    From Listing your products to tracking performance, we provide the tools you need to streamline operations and maximize your reach
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>Access to a large customer base</li>
                    <li>Ongoing Supplier education</li>
                    <li>Flexible growth options</li>
                  </ul>
                </div>
                {isAuthenticated ? (
                  <Link href="/dashboard" className="w-full">
                    <Button className="bg-[#000051] hover:bg-[#1a1b5e]/90 py-4 text-white w-full flex justify-center items-center gap-2">
                      Continue to Dashboard
                      <ChevronRightIcon color="#ffffff" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/create-account" className="w-full">
                    <Button className="bg-[#000051] hover:bg-[#1a1b5e]/90 py-4 text-white w-full flex justify-center items-center gap-2">
                      Become a Supplier
                      <ChevronRightIcon color="#ffffff" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* Contact Section - Mobile Restructured */}
        <section id="contact" className="py-6 px-4">
          <div className="container mx-auto rounded-lg bg-[#000051] p-4">
            <div className="flex flex-col items-center py-4">
              <h2 className="font-bold text-xl text-white text-center mb-2">
                Contact Brandsquare
              </h2>
              <p className="text-sm text-center text-[#FFFFFF] mb-4">
                Have a question or collaboration in mind? Fill out the form below, and we&apos;ll get back to you soon!
              </p>
              <form className="flex flex-col gap-3 w-full">
                <div>
                  <Label className="text-white text-sm">Fullname</Label>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="py-2 bg-white w-full"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm">Email</Label>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="py-2 bg-white w-full"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm">Message</Label>
                  <Textarea
                    placeholder="Your Message"
                    className="py-2 bg-white w-full"
                    rows={4}
                  ></Textarea>
                </div>
                <div>
                  <Button className="bg-[#000051] w-full border border-white hover:bg-[#1a1b5e]/90 py-3 text-white">
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <MobileFooter />
    </div>
  );
}