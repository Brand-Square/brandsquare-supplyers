"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import useInitAuthStore from "@/app/store/InitAuthStore";
import Link from 'next/link';

export const UserDropdown = () => {
  const { signOut, vendor } = useInitAuthStore();

  const getVendorInitials = () => {
    if (!vendor?.companyName) return "VN";
    return vendor.companyName
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="bg-neutral-100">
          <AvatarFallback>{getVendorInitials()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-[4rem] w-[14rem]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href='/dashboard/settings'>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href="/dashboard/wallets">
          <DropdownMenuItem>Wallets</DropdownMenuItem>
        </Link>
        <Link href="/dashboard/support">
          <DropdownMenuItem>Support</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
