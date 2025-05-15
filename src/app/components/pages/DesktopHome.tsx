import { useEffect, useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DesktopNav from "../ui/navigation/DesktopNav";
import ChevronRightIcon from "../../../../public/assets/icons/chevronRightIcon";
import Footer from "../ui/Footer";
import useInitAuthStore from "@/app/store/InitAuthStore";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LandingPageImage from '../../../../public/assets/images/landingpageImage.png';
import meninwork from '../../../../public/assets/images/meninwork.png';
import { MousePointer2 } from 'lucide-react';

const content = [
  {
    title: "Stable Orders",
    description: "We work with trusted African distributors.",
  },
  {
    title: "Secure Payments",
    description: "Transparent payment terms—simple and reliable.",
  },
  {
    title: "Market Guidance",
    description: "We help you tailor products for African buyers."
  },
  {
    title: "Logistics Covered",
    description: "From China to African—worry-free shipping."
  },
  {
    title: "Brand Growth",
    description: "Build your name internationally through smart positioning.",
  }
];

export default function DesktopHome() {
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
      <DesktopNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="bg-[#D9D9D9] overflow-hidden flex items-center justify-between px-4 lg:px-8 mb-8 py-12">
          <div className="w-full lg:w-1/2 px-4">
            <div>
              <h1 className="text-[#313131] text-4xl lg:text-[50px] font-bold leading-tight">
                Become a BrandSquare Supplier - Expand Your Reach.
              </h1>
              <p className="text-[#313131] text-base lg:text-lg mt-4">
                Tap into African&apos;s booming market with guaranteed orders, reliable logistics, and full market support.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {renderAuthButton()}
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[500px]">
            <div className="h-[400px] lg:h-[500px] w-[400px] lg:w-[500px] bg-[#000051] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
            <Image
              src={LandingPageImage}
              alt="Hero Image"
              width={1000}
              height={500}
              className="object-contain w-full h-auto relative z-10"
              priority
            />
          </div>
        </section>

        {/* Why Trust Section */}
        <section className="px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full h-full lg:w-1/2">
              <Image
                src={meninwork}
                alt="Brandsquare suppliers"
                className="object-contain w-full"
                width={600}
                height={400}
              />
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-[#313131]">
                Why suppliers trust Brandsquare
              </h2>

              <div className="space-y-6">
                {content.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <MousePointer2 className="transform scale-x-[-1] flex-shrink-0 mt-1" />
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

       
        <section className="relative py-16 min-h-[500px] flex items-center"
          style={{
            backgroundImage: "url('/assets/images/groupphoto.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="absolute inset-0 bg-[#000051] opacity-80"></div>
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">
                Africa is ready for your products
              </h2>

              <div className="space-y-6 mb-10">
                {[
                  "200m+ population in Nigeria alone, with growing demand",
                  "Limited competition, high growth potential",
                  "High need for affordable, quality Chinese goods",
                  "Local supply chains need direct factory partnerships"
                ].map((item, index) => (
                  <div key={index} className="flex items-start justify-center gap-3">
                    <MousePointer2 className="w-5 h-5 mt-1 flex-shrink-0 transform scale-x-[-1]" />
                    <p className="text-xl lg:text-2xl font-bold text-left lg:text-center">{item}</p>
                  </div>
                ))}
              </div>

              {isClient && (
                <Link 
                  href={isAuthenticated || localStorage.getItem('token') ? "/dashboard" : "/auth/create-account"} 
                  className="inline-block"
                >
                  <Button className="bg-white text-[#000051] border border-[#000051] py-6 lg:py-8 px-12 lg:px-16 text-xl hover:bg-[#000051] hover:text-white">
                    {isAuthenticated || localStorage.getItem('token') ? "Continue to Dashboard" : "Sign up as a supplier"}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Why Different Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl lg:text-[40px] font-bold text-center mb-12">
              Why is Brandsquare Different?
            </h2>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2 flex justify-center">
                <Image
                  src="/assets/svg/ybd1.svg"
                  alt="Smiling Woman"
                  width={497}
                  height={508}
                  className="object-contain shadow-sm rounded-xl w-full max-w-md"
                />
              </div>

              <div className="lg:w-1/2 flex gap-6">
                <div className="hidden lg:block w-[6px] rounded-[6px] bg-gray-200 h-auto">
                  <div className="w-full h-[50%] bg-[#E55420] rounded-[6px]"></div>
                </div>
                <div className="w-full">
                  <div className="p-6 lg:py-[30px] lg:px-[45px] bg-[#F6F7F9] mb-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-2">
                      Empowering entrepreneurs
                    </h3>
                    <p className="text-gray-600">
                      Your gateway to seamless collaboration and success. Manage
                      your products, track sales, and connect with customers
                      effortlessly on one unified platform.
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-gray-600">
                      <li>Simplified International Transactions</li>
                      <li>Warehouse and Shipping Support</li>
                      <li>Instant Web Store Setup</li>
                    </ul>
                  </div>

                  <div className="p-6 lg:py-[30px] lg:px-[45px] bg-[#F6F7F9] mb-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-2">
                      Your partners for smarter selling
                    </h3>
                    <p className="text-gray-600">
                      From listing your products to tracking performance, we
                      provide the tools you need to streamline operations and
                      maximize your reach.
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-gray-600">
                      <li>Access to a large customer base</li>
                      <li>Ongoing Supplier education</li>
                      <li>Flexible growth options</li>
                    </ul>
                  </div>

                  {isClient && (
                    <Link 
                      href={isAuthenticated || localStorage.getItem('token') ? "/dashboard" : "/auth/create-account"} 
                      className="block"
                    >
                      <Button className="bg-[#000051] hover:bg-[#1a1b5e]/90 w-full lg:w-auto lg:px-[116px] py-4 lg:py-[1.5rem] text-white flex gap-2 items-center justify-center">
                        {isAuthenticated || localStorage.getItem('token') ? "Continue to Dashboard" : "Become a Supplier"}
                        <ChevronRightIcon color="#ffffff" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 px-4">
          <div className="container mx-auto rounded-lg bg-[#000051] max-w-4xl">
            <div className="py-8 lg:py-[30px] px-6 lg:px-[45px]">
              <h2 className="text-3xl lg:text-[48px] font-bold text-white text-center mb-4">
                Contact Brandsquare
              </h2>
              <p className="text-lg lg:text-xl text-center text-white mb-8">
                Have a question or collaboration in mind? Fill out the form below, and we&apos;ll get back to you soon!
              </p>
              <form className="flex flex-col gap-4 max-w-lg mx-auto">
                <div>
                  <Label className="text-white">Fullname</Label>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="py-3 bg-white w-full"
                  />
                </div>
                <div>
                  <Label className="text-white">Email</Label>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="py-3 bg-white w-full"
                  />
                </div>
                <div>
                  <Label className="text-white">Message</Label>
                  <Textarea
                    placeholder="Your Message"
                    className="py-3 bg-white w-full min-h-[120px]"
                  />
                </div>
                <div>
                  <Button type="submit" className="bg-[#000051] w-full border border-white hover:bg-[#1a1b5e]/90 py-4 text-white">
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}