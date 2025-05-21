import React from "react";
import { ProgressButton } from "./ProgressBtn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SupplierTransaction } from "@/app/store/useVendorProductStore";

const SingleTransaction = ({ transaction }: { transaction: SupplierTransaction }) => {
  return (
    <div className="max-w-[800px] mx-auto my-6">
      <div className="flex items-center gap-3">
        <Button size={"icon"} variant={"ghost"} asChild>
          <Link href={"/dashboard/wallets"}>
            <ChevronLeft className="!size-[1.8rem]" color="#6A6B72" />
          </Link>
        </Button>
        <div>
          <p className="font-semibold text-[#2A2B2D] text-[30px]">
            {transaction._id}
          </p>
          <p className="text-[#6A6B72]">
            {new Date(transaction.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="card bg-white my-5 p-5 rounded-[16px] shadow-2xl">
        <div className="flex justify-between items-center my-3 gap-2">
          <div>
            <span className="text-[14px] text-[#6A6B72]">
              Transaction Amount
            </span>
            <p className="text-[20px] text-[#2A2B2D] font-semibold">
              NGN {transaction.amount.toLocaleString("en-NG")}
            </p>
          </div>
          <div>
            <span className="text-[14px] text-[#6A6B72]">
              Transaction Status
            </span>
            <div className="mt-2">
              <ProgressButton value={transaction.percentage_paid} />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-3 mt-5 gap-2 border-b pb-7 border-[#DDDFE3]">
          <div>
            <span className="text-[14px] text-[#6A6B72]">Transaction ID</span>
            <p className="text-[20px] text-[#000051] font-semibold">
              {transaction._id}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[14px] text-[#6A6B72]">
              Description
            </span>
            <p className="text-[20px] text-[#2A2B2D] font-semibold">
              {transaction.description || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3 mt-5 gap-2 border-b pb-7 border-[#DDDFE3]">
          <div>
            <span className="text-[14px] text-[#6A6B72]">Type</span>
            <p className="text-[20px] text-[#000051] font-semibold">
              {transaction.type.toLocaleUpperCase()}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[14px] text-[#6A6B72]">
              Reference
            </span>
            <p className="text-[20px] text-[#2A2B2D] font-semibold">
              {transaction.reference || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-3 mt-5 gap-2 border-b pb-7 border-[#DDDFE3]">
          <div>
            <span className="text-[14px] text-[#6A6B72]">Percentage Paid</span>
            <p className="text-[20px] text-[#000051] font-semibold">
              {transaction.percentage_paid}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[14px] text-[#6A6B72]">
              Amount received by supplier
            </span>
            <p className="text-[20px] text-[#2A2B2D] font-semibold">
              {transaction.amount_received || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3 mt-5 gap-2">
          <div>
            <span className="text-[14px] text-[#6A6B72]">From</span>
            <p className="text-[20px] text-[#2A2B2D] font-semibold">
              {transaction.from}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[14px] text-[#6A6B72]">Status</span>
            <p className="text-[20px] text-[#2A2B2D] font-semibold">
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTransaction;