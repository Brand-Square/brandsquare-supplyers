/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import BellIcon from "../../../../../public/assets/icons/bellIcon";
import QuestionMark from "../../../../../public/assets/icons/questionMarkIcon";
import SearchBar from "@/app/components/ui/searchBar";
import UserIcon from "../../../../../../public/assets/icons/userIcon.svg";
import useContextStore from "@/app/store/contextStore";
// import Logo from "../../../../../public/assets/icons/DashLogo";
import Logo from "../../../../../public/assets/svgComponent/Logo";
import MenuIcon from "../../../../../public/assets/icons/menuIcon";
import AvatarDemo from "../../../components/ui/AvatarDemo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import useInitAuthStore from "@/app/store/InitAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import CategoryNav from "./CategoryNav";
import useCartQuery from "@/lib/customHooks/useCartQuery";
import { CategoriesDropdown } from "./CategoriesDropdown";

const TopBar = () => {
  const { mobileSidebar, setMobileSidebar } = useContextStore();
  // const { logout } = useInitAuthStore();
  const router = useRouter();
  const handleCartRouting = () => {
    router.push('/product-sourcing/cart');
  }

  const { cartItems, isCartLoading } = useCartQuery();

  const handleHome = () => {
    router.push('/product-sourcing')
  }
  return (
    <div className=" border-b xl:border-none xl:w-full">
      <div className="flex justify-between items-center py-3 bg-[#000051] lg:bg-white px-3 xl:px-7">
        <div className="flex-1 hidden lg:flex items-center gap-3">
          <div className="md:hidden block">
            <div
              onClick={() => setMobileSidebar(!mobileSidebar)}
              className=" cursor-pointer"
            >
              <MenuIcon />
            </div>
          </div>
          <button
            className="bg-transparent block cursor-pointer"
            onClick={handleHome}
          >
            <Logo />
          </button>
        </div>

        <div className="w-[90%] lg:w-[48%] xl:w-auto">
          <SearchBar />
        </div>

        <div className="flex  flex-1  justify-end items-center gap-1 xl:gap-x-4 ">
          <Link
            href={"/product-sourcing/support"}
            className="flex items-center gap-1 hover:bg-[#000051]/10 hover:bg-opacity-10 rounded-lg p-2 lg:px-2 xl:px-3 lg:py-2"
          >
            <div className="cursor-pointer text-sm hidden lg:block p-[0.2rem] bg-theme-blue rounded-full">
              <QuestionMark />
            </div>
            <span className="text-[0.9rem] hidden lg:inline-flex">Help</span>
          </Link>

          <div className="hidden cursor-pointer">
            <BellIcon />
          </div>

          <button className=" lg:hidden" onClick={handleCartRouting}>
            <ShoppingCart
              className="text-white xl:text-black scale-x-[-1]"
              width={35}
              height={35}
            />
            {!isCartLoading && cartItems && cartItems.length > 0 && (
              <span className="absolute top-2 right-7 bg-white text-[#000051] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          <button
            className="hidden lg:flex items-center gap-1 px-3 rounded-lg py-2 hover:bg-[#000051]/10 rounde-lg"
            onClick={handleCartRouting}
          >
            <ShoppingCart
              className="text-white lg:text-black scale-x-[-1]"
              width={20}
              height={20}
            />
            {!isCartLoading && cartItems && cartItems.length > 0 && (
              <span className="absolute lg:top-[1.2rem] lg:right-[17.5%] xl:right-[16%] 2xl:right-[13%] bg-[#000051] 2xl:top-[1.3rem] text-white text-xs font-bold rounded-full lg:w-4 lg:h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
            <span className="text-[0.9rem]">Cart</span>
          </button>

          <div className="hidden lg:block hover:bg-[#000051]/10 px-3 rounded-lg cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="hidden lg:flex -ml-2 items-center">
                  <AvatarDemo />
                  <span className="text-[0.9rem]">Account</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-8">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link className="w-full" href="/dashboard/edit-profile">
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Invite admin
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>More...</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    console.log("loggy");
                  }}
                >
                  Log out
                  <DropdownMenuShortcut>
                    <LogOutIcon className="h-5 w-5" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-full items-center bg-white justify-between xl:border-t shadow-sm md:py-0 py-4 px-7">
        <CategoriesDropdown />
        <CategoryNav />
        <Link
          href="/product-sourcing/product-request"
          className="md:hidden lg:block font-semibold py-3 px-3 rounded-md bg-[#000051] text-sm text-white"
        >
          Request a product
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
