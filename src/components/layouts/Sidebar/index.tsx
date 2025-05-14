"use client";

import Image from "next/image";
import React from "react";
import HomeIcon from "../../../../public/assets/icons/homeIcon";
import { Wallet } from "lucide-react";
import CustomerIcon from "../../../../public/assets/icons/cutomerIcon";
import ProductIcon from "../../../../public/assets/icons/productIcon";
// import PaymentIcon from "../../../../public/assets/icons/paymentIcon";
// import MarketingIcon from "../../../../public/assets/icons/marketingIcon";
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

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const sidebarVariants = {
  open: {
    width: "272px",
  },
  closed: {
    width: "85px",
  },
};

export const SideBar = () => {
  const { collapseSidebar, setCollapseSidebar, mobileSidebar } =
    useContextStore();
  const { vendor } = useInitAuthStore();

  const pathname = usePathname();

  const linkStyling =
    "flex items-center  gap-2 text-[14px] p-2 rounded-md hover:bg-gray-200 transition-colors";

  const renderSidebarContent = () => (
    <div className={` text-theme-text-gray   flex flex-col justify-between  `}>
      <div>
        <div className="mx-auto  max-w-[60px]">
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
                  <span className="text-sm   block text-black font-semibold">
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
        <div className=" md:hidden block my-5 ">
          <SearchBar style="bg-white w-full py-2 border-0  " text="Search" />
        </div>

        <nav className={cn("space-y-2 mt-5 ")}>
          <Link
            href="/dashboard"
            className={` ${linkStyling}  ${pathname === "/dashboard" && "bg-gray-200"
              } `}
          >
            <HomeIcon />
            {collapseSidebar ? "" : "Home"}
          </Link>

          <Link
            href="/dashboard/orders/customers-orders"
            className={cn(
              "",
              linkStyling,
              pathname === "/dashboard/orders/customers-orders"
                ? "text-theme-blue bg-gray-200"
                : ""
            )}
          >
            <OrdersIcon />
            {collapseSidebar ? "" : "Customers orders"}
          </Link>

          {/* <SidebarAccordion
            triggerHeading="Orders"
            links={[
              { href: "/product-sourcing", label: "Order products" },
              {
                href: "/dashboard/orders/brandsquare-orders",
                label: "Brandsquare orders",
              },
              {
                href: "/dashboard/orders/customers-orders",
                label: "Customers orders",
              },
            ]}
            icon={<OrdersIcon />}
            collapseSidebar={collapseSidebar}
          /> */}

          <SidebarAccordion
            triggerHeading="Products"
            links={[
              { href: "/dashboard/products", label: "All Products" },
              { href: "/dashboard/products/add-product", label: "Add Product" },
            ]}
            icon={<ProductIcon />}
            collapseSidebar={collapseSidebar}
          />

          {/* Rest of navigation items */}
          {/* <Link
            href="/dashboard/customers"
            className={cn(
              "",
              linkStyling,
              pathname === "/dashboard/customers"
                ? "text-theme-blue bg-gray-200"
                : ""
            )}
          >
            <CustomerIcon />
            {collapseSidebar ? "" : "Customers"}
          </Link> */}
          {/* <Link
            href="/dashboard/payments"
            className={cn(
              "",
              linkStyling,
              pathname === "/dashboard/payments"
                ? "text-theme-blue bg-gray-200"
                : ""
            )}
          >
            <PaymentIcon />
            {collapseSidebar ? "" : "Payments"}
          </Link> */}
          <Link
            href="/dashboard/wallets"
            className={cn(
              "",
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
            "",
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
    <motion.aside
      variants={sidebarVariants}
      animate={collapseSidebar ? "closed" : "open"}
      initial="open"
      transition={{ duration: 0.3 }}
      className={cn(
        "sticky left-0 top-0 pb-[3rem] overflow-y-auto overflow-x-hidden h-screen bg-[#F6F7F9]",
        collapseSidebar ? "px-4" : "px-7"
      )}
    >
      <motion.div
        onClick={() => {
          setCollapseSidebar(!collapseSidebar);
        }}
        className={cn(
          "block shadow-lg p-2 rounded-full  cursor-pointer absolute top-5 right-[0] z-10 ",
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
  );
};
