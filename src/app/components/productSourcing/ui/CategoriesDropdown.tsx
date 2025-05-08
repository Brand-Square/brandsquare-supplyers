import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategories } from "@/lib/customHooks/useReactQueryProductStoreHooks";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const CategoriesDropdown = () => {
  // Using the useCategories hook from useReactQueryProductStoreHooks
  const { data: categoryResponse, isLoading } = useCategories(1, 1000);

  // Extract categories from the response
  const categories = categoryResponse?.categories || [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"primary"}
          className="font-semibold text-lg outline-none text-theme-blue underline"
        >
          Categories <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-h-[20rem] overflow-y-auto custom-scrollbar-style">
        <DropdownMenuGroup>
          {isLoading ? (
            <DropdownMenuItem disabled>Loading categories...</DropdownMenuItem>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <DropdownMenuItem
                key={category._id}
                asChild
                className="cursor-pointer hover:bg-[#000051]/10"
              >
                <Link
                  href={`/product-sourcing/category/${category._id}?name=${encodeURIComponent(
                    category.name
                  )}`}
                >
                  {category.name}
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>No categories found</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
