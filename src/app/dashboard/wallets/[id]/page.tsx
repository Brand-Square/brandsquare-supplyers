"use client";
import { usePathname } from "next/navigation";
import React from "react";
import SingleTransaction from "../SingleTransaction";
import { useSingleTransaction } from "@/app/store/useVendorProductStore";
import {Skeleton} from '@/components/ui/skeleton'

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[3]; 

  const { data: transaction, isLoading, error } = useSingleTransaction(id);

  return (
    <div className="px-5">
      {isLoading && <Skeleton/>}
      {error && <div>Error: {(error as Error).message}</div>}
      {transaction && <SingleTransaction transaction={transaction} />}
    </div>
  );
};

export default Page;