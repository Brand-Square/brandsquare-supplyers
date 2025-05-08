"use client";

import { Button } from "@/components/ui/button";
import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { AudioWaveform, ChevronLeft, UserRound } from "lucide-react";
import Link from "next/link";
import { CartCancel } from "../../../../../../../public/assets/icons/CartCancel";
import { OrderStatusDropdown } from "./OrderStatusDropdown";
import { CustomerDetails } from "./CustomerDetails";
import { ItemsTable } from "./ItemsTable";
import React from "react";
import { CancelAndRefundModal } from "./CancelAndRefundModal";
import { AssignOrderModal } from "../../AssignOrderModal";

const OrderDetailsPage = () => {
  const [cancelOrderModalOpen, setCancelOrderModal] = React.useState(false);
  const [isAssignOrderModalOpen, setIsAssignOrderModalOpen] =
    React.useState(false);

  const handleAssignOrderClick = () => {
    setIsAssignOrderModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="[&_svg]:size-[1.5rem]"
            asChild
          >
            <Link href={"/dashboard/orders/customers-orders"}>
              <ChevronLeft />
            </Link>
          </Button>
          <PrimaryHeading text="Order 354638" />
        </div>
        <div className="flex items-center gap-x-2">
          <OrderStatusDropdown />
          <Button
            asChild
            variant={"outline"}
            className="font-semibold text-[#8D8E97]"
          >
            <Link href={""}>
              <AudioWaveform size={22} color="#6A6B72" /> Track order
            </Link>
          </Button>
          <Button
            onClick={handleAssignOrderClick}
            variant={"outline"}
            className="font-semibold text-[#8D8E97]"
          >
            <UserRound size={22} color="#6A6B72" />
            Assign order
          </Button>
          <button
            onClick={() => setCancelOrderModal(true)}
            className="text-sm font-bold flex items-center gap-x-2.5 py-2 rounded-lg px-2 text-[#F03134] border border-[#F03134] bg-[#FCD6D6]"
          >
            <CartCancel />
            Cancel and Refund
          </button>
        </div>
      </div>

      <div className="mt-5">
        <CustomerDetails />
      </div>
      <div className="mt-5">
        <ItemsTable />
      </div>

      {/* Modal */}
      <CancelAndRefundModal
        open={cancelOrderModalOpen}
        setIsModalOpen={setCancelOrderModal}
      />
      <AssignOrderModal
        setIsModalOpen={setIsAssignOrderModalOpen}
        open={isAssignOrderModalOpen}
      />
    </div>
  );
};
export default OrderDetailsPage;
