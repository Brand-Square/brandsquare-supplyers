"use client";
import { Search, Menu } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
// import QuestionMark from "../../../../public/assets/icons/questionMarkIcon";
import { PrintIcon } from "../../../../public/assets/icons/PrintIcon";
// import { NotificationIcon } from "../../../../public/assets/icons/NotificationIcon";

import { UserDropdown } from "./UserDropdown";


export const DashboardHeader = () => {
  return (
    <header className="bg-white px-5 flex items-center justify-between max-sm:justify-between py-3 shadow-md sticky top-0 z-40">
      <div className="flex items-center relative max-sm:hidden">
        <Search size={20} color="#6A6B72" className="absolute left-3" />
        <input
          type="text"
          placeholder=" Search anything"
          className="pl-[3rem]  pr-2 text-sm py-2 w-[19rem] rounded text-[#6A6B72] outline-none bg-[#F0F1F6]"
        />
      </div>
      <div className="md:hidden">
        <Menu size={30} color="#6A6B72" className="" />
      </div>
      <div className="flex items-center max-sm:gap-1 gap-x-4">
        {/* <Link
          href={"/dashboard/support"}
          className="rounded-full bg-theme-blue grid place-items-center size-[1.8rem]"
        >
          <QuestionMark />
        </Link> */}
        <Button
          asChild
          size={"icon"}
          variant={"ghost"}
          className="[&_svg]:size-[22px]"
        >
          <Link href={"#"}>
            <PrintIcon />
          </Link>
        </Button>
        {/* <Button
          asChild
          size={"icon"}
          variant={"ghost"}
          className="[&_svg]:size-[22px]"
        >
          <Link href={"#"}>
            <NotificationIcon />
          </Link>
        </Button> */}

        <UserDropdown />
      </div>
    </header>
  );
};
