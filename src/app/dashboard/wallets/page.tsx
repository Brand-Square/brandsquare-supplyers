// page.tsx
'use client';

import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { StatCards } from "./statscard";
import FilterBtnComp from "../../../components/ui/Filterwallets";
import WalletTable from "@/components/ui/walletTable";
import { TableEmptyState } from "@/components/ui/TableEmptyState";
import { useState } from "react";
import useVendorProductStore, { SupplierTransaction } from "@/app/store/useVendorProductStore";

interface Transaction {
  transactionId: string;
  _id: string;
  percentage_paid: number;
  amount_received: number;
  supplierId: string;
  amount: number;
  type: string;
  from: string;
  description: string;
  reference: string;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

const Payout = () => {
  const [statusFilter, setStatusFilter] = useState<'pending' | 'completed' | 'failed' | 'all'>('all');


  const { useSupplierTransactions } = useVendorProductStore();
  const { data: transactionsResponse, isLoading } = useSupplierTransactions();


  const supplierTransactions = transactionsResponse?.data || [];


  const filteredTransactions: Transaction[] = supplierTransactions
    .filter((transaction) => statusFilter === 'all' || transaction.status === statusFilter)
    .map((transaction: SupplierTransaction) => ({
      ...transaction,
      transactionId: transaction._id,
    }));




  const totalUncompletedTransactions = supplierTransactions.filter(
    (transaction: SupplierTransaction) => transaction.percentage_paid < 100
  ).length;

  const totalCompletedTransactions = supplierTransactions.filter(
    (transaction: SupplierTransaction) => transaction.percentage_paid === 100
  ).length;

  const totalAmountReceived = supplierTransactions.reduce(
    (sum: number, transaction: SupplierTransaction) => sum + (transaction.amount_received || 0),
    0
  );



  
  const currency = "Yuan";

  return (
    <div className="space-y-6">
      <PrimaryHeading text="Payments" />
      <SectionSubtitle text="Manage your transactions with Brandsquare from here" />

      <div className="mt-4">
        <StatCards
          totalAmountReceived={totalAmountReceived}
          totalUncompletedTransactions={totalUncompletedTransactions}
          totalCompletedTransactions={totalCompletedTransactions}
          currency={currency}
        />
      </div>

      <div className="mt-8 w-full bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Payout History</h3>
          <FilterBtnComp onStatusChange={setStatusFilter} />
        </div>

        <div className={filteredTransactions.length === 0 ? 'min-h-[456px] flex items-center justify-center' : ''}>
          {isLoading ? (
            <div>Loading transactions...</div>
          ) : filteredTransactions.length > 0 ? (
            <div className="py-4">
              <WalletTable transactions={filteredTransactions} />
            </div>
          ) : (
            <TableEmptyState
              heading="No transactions yet"
              subText="Your wallet transactions will appear here"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payout;