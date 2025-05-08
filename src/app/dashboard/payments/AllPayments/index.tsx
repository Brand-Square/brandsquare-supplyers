import { Button } from "@/components/ui/button";
import { TableEmptyState } from "@/components/ui/TableEmptyState";
import { TableHeading } from "@/components/ui/TableHeading";
import { ListFilter } from "lucide-react";

export const AllPayments = () => {
  return (
    <div className="bg-white shadow rounded-lg px-3 py-5">
      <div className="flex items-center justify-between">
        <TableHeading text="All Orders" />
        <Button variant={"outline"}>
          <ListFilter width={15} height={11.6} />
          Filter
        </Button>
      </div>
      <div className="mt-8">
        <TableEmptyState
          subText="Your payments will show up here"
          heading="No payments yet"
        />
      </div>
    </div>
  );
};
