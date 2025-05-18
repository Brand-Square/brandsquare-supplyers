"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import HomeIcon from "../../../../public/assets/icons/homeIcon";
import { Wallet } from "lucide-react";
import CustomerIcon from "../../../../public/assets/icons/cutomerIcon";
import ProductIcon from "../../../../public/assets/icons/productIcon";
import OrdersIcon from "../../../../public/assets/icons/ordersIcon";
import SettingIcon from "../../../../public/assets/icons/settingIcon";
import ChevronLeftIcon from "../../../../public/assets/icons/chevronLeftIcon";
import { AnimatePresence, motion } from "framer-motion";
import DashLogo from "../../../../public/assets/icons/DashLogo";
import useContextStore from "@/app/store/contextStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "../../../app/components/ui/searchBar";
import { cn } from "@/lib/utils";
import { SidebarAccordion } from "./SidebarAccordion";
import useInitAuthStore from "@/app/store/InitAuthStore";
import { Menu, X } from "lucide-react";

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const sidebarVariants = {
  open: { width: "272px" },
  closed: { width: "85px" },
  mobileOpen: { x: 0, opacity: 1 },
  mobileClosed: { x: "-100%", opacity: 0 },
};

export const SideBar = () => {
  const { collapseSidebar, setCollapseSidebar, mobileSidebar, setMobileSidebar } =
    useContextStore();
  const { vendor } = useInitAuthStore();
  const pathname = usePathname();

  const linkStyling =
    "flex items-center gap-2 text-[14px] p-2 rounded-md hover:bg-gray-200 transition-colors";

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebar(false);
  }, [pathname, setMobileSidebar]);

  const renderSidebarContent = () => (
    <div className="text-theme-text-gray flex flex-col justify-between h-full">
      <div>
        <div className="mx-auto max-w-[60px]">
          <DashLogo
            width={collapseSidebar ? "30" : mobileSidebar ? "0" : "70"}
            height={mobileSidebar ? "20" : "96"}
          />
        </div>

        <div className="flex items-center space-x-2 justify-between">
          <div className="mt-auto flex items-center space-x-2">
            <Image
              width={100}
              height={100}
              src="/assets/icons/userIcon.svg"
              alt="Avatar"
              className="h-8 w-8 rounded-full border-2"
            />
            <AnimatePresence>
              {!collapseSidebar && (
                <motion.div
                  className="block"
                  initial="visible"
                  animate="visible"
                  exit="hidden"
                  variants={textVariants}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm block text-black font-semibold">
                    {vendor?.companyName}
                  </span>
                  <span className="text-[12px] font-light">
                    {vendor?.email}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="md:hidden block my-5">
          <SearchBar style="bg-white w-full py-2 border-0" text="Search" />
        </div>

        <nav className={cn("space-y-2 mt-5")}>
          <Link
            href="/dashboard"
            className={`${linkStyling} ${pathname === "/dashboard" && "bg-gray-200"}`}
          >
            <HomeIcon />
            {collapseSidebar ? "" : "Home"}
          </Link>

          <Link
            href="/dashboard/orders/customers-orders"
            className={cn(
              linkStyling,
              pathname === "/dashboard/orders/customers-orders"
                ? "text-theme-blue bg-gray-200"
                : ""
            )}
          >
            <OrdersIcon />
            {collapseSidebar ? "" : "Customers orders"}
          </Link>

          <SidebarAccordion
            triggerHeading="Products"
            links={[
              { href: "/dashboard/products", label: "All Products" },
              { href: "/dashboard/products/add-product", label: "Add Product" },
            ]}
            icon={<ProductIcon />}
            collapseSidebar={collapseSidebar}
          />

          <Link
            href="/dashboard/wallets"
            className={cn(
              linkStyling,
              pathname === "/dashboard/wallets"
                ? "text-theme-blue bg-gray-200"
                : ""
            )}
          >
            <Wallet />
            {collapseSidebar ? "" : "wallets"}
          </Link>
        </nav>
      </div>

      <div className="mt-[6rem]">
        <h3 className="text-[#8D8E97] text-[14px]">
          Manage {collapseSidebar ? "" : "dashboard"}
        </h3>
        <Link
          href="/dashboard/settings"
          className={cn(
            linkStyling,
            pathname === "/dashboard/settings"
              ? "text-theme-blue bg-gray-200"
              : ""
          )}
        >
          <SettingIcon />
          {collapseSidebar ? "" : "Setting"}
        </Link>
        <Link
          href="/dashboard/support"
          className={cn(
            linkStyling,
            pathname === "/dashboard/support"
              ? "text-theme-blue bg-gray-200"
              : ""
          )}
        >
          <CustomerIcon />
          {collapseSidebar ? "" : "support"}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button (shown only on mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-theme-blue text-white"
        onClick={() => setMobileSidebar(!mobileSidebar)}
      >
        {mobileSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar (unchanged) */}
      <motion.aside
        variants={sidebarVariants}
        animate={collapseSidebar ? "closed" : "open"}
        initial="open"
        transition={{ duration: 0.3 }}
        className={cn(
          "hidden md:block sticky left-0 top-0 pb-[3rem] overflow-y-auto overflow-x-hidden h-screen bg-[#F6F7F9]",
          collapseSidebar ? "px-4" : "px-7"
        )}
      >
        <motion.div
          onClick={() => setCollapseSidebar(!collapseSidebar)}
          className={cn(
            "block shadow-lg p-2 rounded-full cursor-pointer absolute top-5 right-[0] z-10",
            mobileSidebar ? "hidden" : "bg-white"
          )}
        >
          <span
            className={cn(
              "grid place-items-center transition-all duration-300",
              collapseSidebar ? "rotate-180" : "rotate-0"
            )}
          >
            <ChevronLeftIcon />
          </span>
        </motion.div>
        {renderSidebarContent()}
      </motion.aside>

      {/* Mobile Sidebar (overlay style) */}
      <AnimatePresence>
        {mobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setMobileSidebar(false)}
            />
            <motion.aside
              variants={sidebarVariants}
              initial="mobileClosed"
              animate="mobileOpen"
              exit="mobileClosed"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-screen w-64 bg-[#F6F7F9] z-40 shadow-xl md:hidden px-4 py-4 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <DashLogo width="70" height="96" />
                <button
                  onClick={() => setMobileSidebar(false)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <X size={24} />
                </button>
              </div>
              {renderSidebarContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};