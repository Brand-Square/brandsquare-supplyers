import { Category } from "@/app/api/api-data/useCategories";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CheckIcon } from "../../../../../public/assets/icons/CheckIcon";

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface CategoriesDropdownProps {
  options: Category[];
  selected: Category[];
  onChange: (values: Category[]) => void;
  className?: string;
  badgeClassName?: string;
}

export function CategoriesDropdown({
  options,
  selected,
  onChange,
}: CategoriesDropdownProps) {
  const handleSelect = (value: Category) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="border h-10 w-full rounded-lg px-3  flex items-center justify-between">
        <div>
          {selected?.length === 0 ? (
            <span className="text-neutral-300 text-sm">Select Categories</span>
          ) : (
            <div>
              {selected[0]?.name}{" "}
              {selected.length > 1 && <span>{selected.length - 1} others</span>}
            </div>
          )}
        </div>
        <ChevronDown size={20} />
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-none p-0 py-1.5">
        <Link
          href={"/dashboard/products/new-products-category"}
          className="flex items-center text-theme-yellow-pry font-semibold text-sm gap-x-2 py-2 px-2 hover:bg-neutral-100  rounded transition-colors"
        >
          <Plus size={18} /> New Category
        </Link>
        <ScrollArea className="">
          <ul className="max-h-[12rem]">
            {options.map((option) => {
              const selectedLabel = selected.includes(option);
              return (
                <li
                  role="button"
                  key={option._id}
                  onClick={() => handleSelect(option)}
                  className="group w-full flex items-center justify-between h-10 cursor-pointer py-2 px-2 hover:bg-neutral-100 rounded"
                >
                  <span className="text-sm text-gray-700">{option.name}</span>
                  {selectedLabel && <CheckIcon />}
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
