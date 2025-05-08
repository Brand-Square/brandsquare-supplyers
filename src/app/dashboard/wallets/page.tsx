// page.tsx
'use client'

import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { StatCards } from "./statscard";
import FilterBtnComp from "../../../components/ui/Filterwallets";
import WalletTable from "@/components/ui/walletTable";
import { TableEmptyState } from "@/components/ui/TableEmptyState";
import { useState } from "react";
import { useVendorWalletStats } from "@/app/api/api-data/useWallets"; 

type Transaction = {
  status: 'pending' | 'completed' | 'failed';
};

const Payout = () => {
  const [statusFilter, setStatusFilter] = useState<'pending' | 'completed' | 'failed' | 'all'>('all');
  
  const { data: walletData, isLoading } = useVendorWalletStats();
  
  const filteredTransactions = walletData?.data?.transactions?.filter((transaction: Transaction) => 
    statusFilter === 'all' || transaction.status === statusFilter
  ) || [];

  return (
    <div className="space-y-6">
      <PrimaryHeading text="Wallets" />
      <SectionSubtitle text="Manage your transactions from here" />

      <div className="mt-4">
        <StatCards 
          availableBalance={walletData?.data?.available_balance}
          pendingBalance={walletData?.data?.pending_balance}
          totalBalance={walletData?.data?.totalBalance}
          currency={walletData?.data?.currency}
        />
      </div>

      <div className="mt-8 w-full bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Payout History</h3>
          <FilterBtnComp onStatusChange={setStatusFilter} />
        </div>

        <div className={filteredTransactions.length === 0 ? 'min-h-[456px] flex items-center justify-center' : ''}>
          {!isLoading && filteredTransactions.length > 0 ? (
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