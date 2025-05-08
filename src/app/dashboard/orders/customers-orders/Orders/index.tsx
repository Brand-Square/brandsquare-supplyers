"use client";

import { Button } from "@/components/ui/button";
import { TableHeading } from "@/components/ui/TableHeading";
import { ListFilter } from "lucide-react";
import { DataTable } from "./DataTable";
import { PaginationButtons } from "@/components/ui/PaginationButtons";
// import { useGetCustomersOrders } from "@/app/api/api-data/useOrders";

export const Orders = () => {
  // const { data, error, isLoading } = useGetCustomersOrders();

  return (
    <div className="bg-white shadow rounded-lg px-3 py-5">
      <div className="flex items-center justify-between">
        <TableHeading text="Orders" />
        <Button variant={"outline"}>
          <ListFilter width={15} height={11.6} />
          Filter
        </Button>
      </div>
      <div className="mt-5">
        <DataTable />
        <div className="mt-8 flex justify-end">
          <PaginationButtons currentPage={1} totalPages={4} />
        </div>
        {/* <TableEmptyState
                subText="No orders yet"
                heading="Your orders will show up here"
              /> */}
      </div>
    </div>
  );
};
