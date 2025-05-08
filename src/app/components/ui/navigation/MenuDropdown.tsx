
"use client";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useInitAuthStore from "@/app/store/InitAuthStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useVendorProfile } from "@/app/store/useVendorProductStore";

interface VendorDetails {
  businessName: string;
}

const MenuDropdown = () => {
  const { signOut } = useInitAuthStore();
  const [vendor, setVendor] = useState<VendorDetails | null>(null);
  const { data: vendorProfileData } = useVendorProfile();

  useEffect(() => {
    if (vendorProfileData?.vendor) {
      const vendorData = vendorProfileData.vendor;
      // Create a VendorDetails object with the businessName property
      setVendor({ businessName: vendorData.businessName });
    }
  }, [vendorProfileData]);

  const getVendorInitials = () => {
    if (!vendor?.businessName) return "VN";
    return vendor.businessName
      .split(" ")
      .slice(0, 2)
      .map((word: string) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <Button
            size="icon"
            variant="ghost"
            className="w-10 h-10 rounded-full"
          >
            <AvatarFallback>{getVendorInitials()}</AvatarFallback>
          </Button>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard/settings">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;
