import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#EDF4FF] py-8 border-t">
      <div className="container mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex-[1]">
            <Image
              src="/assets/icons/bransquare-logo.svg"
              alt="Brandsquare Logo"
              width={130}
              height={30}
              className="h-8 w-auto"
            />
            <p className="text-[14px] font-[400] font-dm-sans text-[#2B2B57]  mb-6">
              Brandsquare is the all-in-one platform for African vendors to
              source products, manage logistics, and sell online with minimal
              capital investment.
            </p>
            <div className="flex space-x-4 mb-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-[#1a1b5e]"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-[#1a1b5e]"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-[#1a1b5e]"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          <div className="flex-[3]">
            <div className=" grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Electronics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Fashion & Apparel
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Beauty & Personal Care
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Home & Furniture
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Health & Wellness
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Groceries & Food
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Toys & Baby Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Automotive & Accessories
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Sports & Outdoor Gear
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Books & Stationery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Jewelry & Watches
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Pet Supplies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[700] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      See all categories
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Terms and Conditons
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/login"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Log in/Get Started
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/product-sourcing/cart"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/product-sourcing/orders"
                      className="text-[#2B2B57] text-[16px] font-[500] font-dm-sans hover:text-[#1a1b5e]"
                    >
                      My orders
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© Copyright {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
