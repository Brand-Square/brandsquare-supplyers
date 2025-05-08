"use client";

import { Button } from "@/components/ui/button";
import { TableHeading } from "@/components/ui/TableHeading";
import { ListFilter } from "lucide-react";
import { CustomersTable } from "./Table";
import { PaginationButtons } from "@/components/ui/PaginationButtons";
import React from "react";
import { TableEmptyState } from "@/components/ui/TableEmptyState";
import { useGetCustomers } from "@/app/api/api-data/useCustomers";

export const AllCustomers = () => {
  const [customers] = React.useState([1]);
  const { data } = useGetCustomers();
  console.log(data);

  return (
    <div className="bg-white rounded-lg shadow py-5 px-3">
      <div className="flex items-center justify-between">
        <TableHeading text="All Customers" />
        <Button variant={"outline"}>
          <ListFilter width={15} height={11.6} />
          Filter
        </Button>
      </div>
      <div className="mt-5">
        {customers.length === 0 ? (
          <TableEmptyState
            subText=" Your customers will show up here"
            heading="You have no customers yet"
          />
        ) : (
          <CustomersTable />
        )}
      </div>
      {customers.length !== 0 && (
        <div className="mt-8 flex justify-end">
          <PaginationButtons currentPage={1} totalPages={4} />
        </div>
      )}
    </div>
  );
};
