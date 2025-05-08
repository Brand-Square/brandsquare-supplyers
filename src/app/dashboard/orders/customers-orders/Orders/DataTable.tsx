"use client";

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
import { Status } from "@/components/ui/TableStatusChip";
import { TableStatusDropdown } from "@/components/ui/TableStatusDropdown";
import { ChevronsUpDown, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AssignOrderModal } from "../AssignOrderModal";

export const DataTable = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isAssignOrderModalOpen, setIsAssignOrderModalOpen] =
    React.useState(false);
  const [orderStatus, setOrderStatus] = React.useState("processing");

  const handleAssignOrderClick = () => {
    setIsAssignOrderModalOpen(true);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-neutral-100">
            <TableHead>
              <button className="flex text-sm font-medium items-center gap-x-1">
                Order ID <ChevronsUpDown size={15} />
              </button>
            </TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="w-[20rem]">Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <span className="block text-sm text-[#2A2B2D]">Order 34785</span>
              <span className="block text-sm text-[#6A6B72]">
                20th may,2025
              </span>
            </TableCell>
            <TableCell>10 Items</TableCell>
            <TableCell>300,000 NGN</TableCell>
            <TableCell>
              <TableStatusDropdown
                handleStatus={setOrderStatus}
                status={orderStatus as Status}
              />
            </TableCell>
            <TableCell>
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"} size={"icon"}>
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" className="px-0 w-[190px]">
                  <DropdownMenuItem
                    asChild
                    className="text-[#6A6B72] font-medium text-sm "
                  >
                    <Link
                      className="w-full"
                      href={`/dashboard/orders/customers-orders/${567467}/order-details`}
                    >
                      View order
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleAssignOrderClick}
                    className="text-[#6A6B72] font-medium text-sm "
                  >
                    Assign order
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#6A6B72] font-medium text-sm ">
                    Track Order
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Modal */}
      <AssignOrderModal
        setIsModalOpen={setIsAssignOrderModalOpen}
        open={isAssignOrderModalOpen}
      />
    </div>
  );
};
