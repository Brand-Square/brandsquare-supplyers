import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileFooter = () => {
  return (
    <footer className="bg-gray-50 py-8 border-t">
      <div className="container px-4">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <Image
              src="/assets/icons/bransquare-logo.svg"
              alt="Brandsquare Logo"
              width={150}
              height={30}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground mb-4">
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

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-[#1a1b5e]"
                  >
                    Vendor Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-[#1a1b5e]"
                  >
                    Product Catalog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-[#1a1b5e]"
                  >
                    Pricing & Plans
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-[#1a1b5e]"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-[#1a1b5e]"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-[#1a1b5e]"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email: info@brandsquare.com
              </li>
              <li className="text-muted-foreground">
                Phone: +234 123 456 7890
              </li>
              <li className="text-muted-foreground">Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© Copyright 2023</p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
