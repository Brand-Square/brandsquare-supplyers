import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserIcon from "../../../../../public/assets/icons/user-icon";
import useInitAuthStore from "@/app/store/InitAuthStore";

import MenuDropdown from "./MenuDropdown";

const DesktopNav = () => {
  const { isAuthenticated } = useInitAuthStore();


  return (
    <header className="border-b py-4 sticky top-0 left-0 z-50 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/icons/bransquare-logo.svg"
              alt="Brandsquare Logo"
              width={130}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#home" className="text-lg font-medium">
            Home
          </Link>
          <Link href="#why-choose" className="text-lg font-medium">
            Why choose us
          </Link>
          <Link href="#features" className="text-lg font-medium">
            Features
          </Link>
          <Link href="#contact" className="text-lg font-medium">
            Contact
          </Link>
        </nav>
        {isAuthenticated ? (

          <MenuDropdown />
        ) : (
          <Link href="/auth/create-account">
            <Button className="hidden md:flex gap-2 bg-[#000051] hover:bg-[#1a1b5e]/90 text-white">
              <UserIcon />
              <span>Sign Up</span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default DesktopNav;
