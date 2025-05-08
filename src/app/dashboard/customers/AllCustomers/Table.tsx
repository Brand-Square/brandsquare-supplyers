import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

export const CustomersTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F7F9]">
            <TableHead className="rounded-tl-xl">Customers</TableHead>
            <TableHead>Completed Orders</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead className="rounded-tr-xl">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <div>
                    <h4 className="text-sm text-[#2A2B2D] font-medium">
                      Deborah Fejiro
                    </h4>
                    <p className="text-[#6A6B72] text-sm">
                      fejirodebbie@mail.com
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-[#2A2B2D] font-medium">
                  2 orders
                </TableCell>
                <TableCell className="text-sm text-[#2A2B2D] font-medium">
                  28th April, 2025
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size={"icon"} variant={"outline"}>
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="px-0 w-[10rem] mr-[5rem]">
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer font-medium text-sm text-[#6A6B72]"
                      >
                        <Link href={"#"}>View Customer</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer font-medium text-sm text-[#6A6B72] "
                      >
                        <Link href={"#"}>See tickets</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
