import { Button } from "@/components/ui/button";
// import { TableEmptyState } from "@/components/ui/TableEmptyState";
import { TableHeading } from "@/components/ui/TableHeading";
import { ListFilter } from "lucide-react";
import { PaginationButtons } from "@/components/ui/PaginationButtons";

export const OrdersTable = () => {
  return (
    <div className="bg-white shadow rounded-lg px-3 py-5">
      <div className="flex items-center justify-between">
        <TableHeading text="Orders" />
        <Button variant={"outline"}>
          <ListFilter width={15} height={11.6} />
          Filter
        </Button>
      </div>
      <div className="border-b">
        <button className="inline-block py-3 font-medium text-[#2B2B57] text-sm">
          Orders
        </button>
      </div>
      <div className="mt-5">
       
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
