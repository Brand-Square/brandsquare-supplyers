"use client";
import { Search } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import QuestionMark from "../../../../public/assets/icons/questionMarkIcon";
import { PrintIcon } from "../../../../public/assets/icons/PrintIcon";
import { NotificationIcon } from "../../../../public/assets/icons/NotificationIcon";

import { UserDropdown } from "./UserDropdown";
//import MenuDropdown from "@/app/components/ui/navigation/MenuDropdown";


export const DashboardHeader = () => {
  return (
    <header className="bg-white px-5 flex items-center justify-between py-3 shadow-md sticky top-0 z-40">
      <div className="flex items-center relative">
        <Search size={20} color="#6A6B72" className="absolute left-3" />
        <input
          type="text"
          placeholder=" Search anything"
          className="pl-[3rem] pr-2 text-sm py-2 w-[19rem] rounded text-[#6A6B72] outline-none bg-[#F0F1F6]"
        />
      </div>
      <div className="flex items-center gap-x-4">
        <Link
          href={"#"}
          className="rounded-full bg-theme-blue grid place-items-center size-[1.8rem]"
        >
          <QuestionMark />
        </Link>
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
        <Button
          asChild
          size={"icon"}
          variant={"ghost"}
          className="[&_svg]:size-[22px]"
        >
          <Link href={"#"}>
            <NotificationIcon />
          </Link>
        </Button>

        <UserDropdown />
        {/* <MenuDropdown /> */}

      </div>
    </header>
  );
};
