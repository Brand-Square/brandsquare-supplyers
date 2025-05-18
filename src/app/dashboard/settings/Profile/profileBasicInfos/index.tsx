"use client";
import {
  MapPin,
  Phone,
  Store,
  User,
  Briefcase,
  FileText,
  Building,
  Mail,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useVendorProfile } from "@/app/store/useVendorProductStore";
import { useEffect, useState } from "react";

import Image from "next/image";

export function ProfileBasicInfos() {
  const { data, isLoading, isError } = useVendorProfile();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [vendorId, setVendorId] = useState<string | null>(null);


  // Get vendor ID from token on component mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Decode the JWT token
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload && payload.userId) {
          setVendorId(payload.userId);
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);




  // Map API response to expected vendor structure
  const vendor = data?.data ? {
    ...data.data,
    storeName: data.data.businessName,
    ownerName: data.data.user?.email.split('@')[0] || "Vendor",
    phoneNumber: data.data.phoneNumber || "No Phone Number Available",
    location: data.data.location || {
      city: "",
      state: "",
      country: ""
    },
    businessAddress: data.data.businessAddress || "No Address Available"
  } : null;

  // Skeleton loader component for loading state
  const ProfileSkeleton = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2">
        <Skeleton className="size-[3rem] rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>
    </div>
  );

  // Show skeleton during loading
  if (isLoading) return <ProfileSkeleton />;

  // Only show error if there's an actual error and we're not still loading
  if (isError && !isLoading) {
    return (
      <div className="p-4 text-red-500">
        Error loading profile data. Please try again later.
      </div>
    );
  }

  
  if (!vendor && !isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-x-1">
        <User size={15} color="#6A6B72" />
        <span className="text-sm text-[#6A6B72]">Vendor</span>
      </div>

      {/* PROFILE IMAGE AND NAME */}
      <div className="flex items-center gap-x-2 mt-4 mb-6">
        <div className="size-[3rem] rounded-full bg-neutral-200 flex items-center justify-center">
          {vendor?.logo ? (
            <Image
              width={100}
              height={100}
              src={vendor.logo}
              alt={vendor.businessName || "Vendor"}
              className="size-full rounded-full object-cover"
            />
          ) : (
            <Store size={24} color="#6A6B72" />
          )}
        </div>
        <div>
          <span className="block capitalize font-bold text-theme-gray">
            {vendor?.ownerName || "No Name Available"}
          </span>
          <span className="text-[#475467] text-sm">
            {vendor?.businessName || "No Business Name"}
          </span>
        </div>
      </div>


      {/* GRID LAYOUT FOR INFO SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {/* STORE NAME */}
        <div>
          <div className="flex items-center gap-x-1">
            <Store size={15} color="#6A6B72" />
            <span className="text-sm text-[#6A6B72]">Store Name</span>
          </div>
          <p className="text-theme-gray mt-2">
            {vendor?.storeName || "No Store Name Available"}
          </p>
        </div>

        {/* BUSINESS TYPE */}
        <div>
          <div className="flex items-center gap-x-1">
            <Briefcase size={15} color="#6A6B72" />
            <span className="text-sm text-[#6A6B72]">Business Type</span>
          </div>
          <p className="text-theme-gray mt-2 capitalize">
            {vendor?.businessType
              ? vendor.businessType.replace(/([A-Z])/g, " $1").trim()
              : "Not Specified"}
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <div className="flex items-center gap-x-1">
            <Phone size={15} color="#6A6B72" />
            <span className="text-sm text-[#6A6B72]">Contact</span>
          </div>
          <p className="text-theme-gray mt-2">
            {vendor?.phoneNumber || "No Phone Number Available"}
          </p>
        </div>

        {/* STATUS */}
        <div>
          <div className="flex items-center gap-x-1">
            <FileText size={15} color="#6A6B72" />
            <span className="text-sm text-[#6A6B72]">Status</span>
          </div>
          <div className="mt-2">
            <span
              className={`px-2 py-1 text-xs rounded-full ${vendor?.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : vendor?.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
            >
              {vendor?.status || "Unknown"}
            </span>
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <div className="flex items-center gap-x-1">
            <Mail size={15} color="#6A6B72" />
            <span className="text-sm text-[#6A6B72]">Email</span>
          </div>
          <p className="text-theme-gray mt-2">
            {vendor?.user?.email || "No Email Available"}
          </p>
        </div>

        {/* LOCATION */}
        <div>
          <div className="flex items-center gap-x-1">
            <MapPin size={15} color="#6A6B72" />
            <span className="text-sm text-[#6A6B72]">Location</span>
          </div>
          <p className="text-theme-gray mt-2">
            {vendor?.location
              ? `${vendor.location.city || ""}, ${vendor.location.state || ""
                }, ${vendor.location.country || ""}`.replace(/^, |, $/g, "")
              : "No Location Available"}
          </p>
        </div>

        {/* BUSINESS ADDRESS - FULL WIDTH */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-x-1">
            <Building size={15} color="#6A6B72" />
            <span className="text-sm text-[#6A6B72]">Business Address</span>
          </div>
          <p className="text-theme-gray mt-2">
            {vendor?.businessAddress || "No Address Available"}
          </p>
        </div>
      </div>
    </div>
  );
}