import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserIcon from "../../../../../public/assets/icons/user-icon";
import useInitAuthStore from "@/app/store/InitAuthStore";

import MenuDropdown from "./MenuDropdown";

const link = [
  { title: "Home", href: "/" },
  { title: "Why choose us", href: "#why-choose" },
  { title: "Features", href: "#features" },
  { title: "FAQs", href: "#faqs" },
  { title: "Contact", href: "#contact" },
];
const MobileNav = () => {
  const { isAuthenticated } = useInitAuthStore();

  return (
    <header className="border-b py-4 px-4 sticky top-0 left-0 z-50 bg-white">
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

        {isAuthenticated ? (
          // <DropdownMenu>
          //   <DropdownMenuTrigger>
          //     <Avatar>
          //       <AvatarFallback>{getVendorInitials()}</AvatarFallback>
          //     </Avatar>
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent>
          //     <DropdownMenuLabel>My Account</DropdownMenuLabel>
          //     <DropdownMenuSeparator />
          //     <DropdownMenuItem>Profile</DropdownMenuItem>
          //     <DropdownMenuItem>Billing</DropdownMenuItem>
          //     <DropdownMenuItem>Team</DropdownMenuItem>
          //     <DropdownMenuItem>Subscription</DropdownMenuItem>
          //     <DropdownMenuSeparator />
          //     <DropdownMenuItem onClick={() => signOut()}>
          //       Sign Out
          //     </DropdownMenuItem>
          //   </DropdownMenuContent>
          // </DropdownMenu>
          <MenuDropdown />
        ) : (
          <Link href="/auth/create-account">
            <Button className="flex md:hidden gap-2 bg-[#000051] hover:bg-[#1a1b5e]/90 text-white">
              <UserIcon />
              <span>Sign Up</span>
            </Button>
          </Link>
        )}
      </div>
      <div className="flex justify-center items-center md:hidden py-4 ">
        <nav className="flex md:hidden items-center space-x-4">
          {link.map((item, i) => (
            <Link key={i} href={item.href} className="">
              <Button variant="link">{item.title}</Button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default MobileNav;
