// statscard.tsx
'use client';
import { StatsCard } from "@/components/ui/WalletStatsCard";
import PaymentIcon from "../../../../../public/assets/icons/paymentIcon";

interface StatCardsProps {
  currency?: string;
  totalCompletedTransactions?: number;
  totalUncompletedTransactions?: number;
  totalAmountReceived?: number;
}

export const StatCards = ({
  totalAmountReceived, 
 totalUncompletedTransactions,
  totalCompletedTransactions,
   currency
}: StatCardsProps) => {
  return (
    <div className="grid sm:grid-cols-3 gap-3.5">
      <StatsCard
        icon={<PaymentIcon />}
        title="Available Balance"
        value={`${totalAmountReceived?.toLocaleString('en-us')} ${currency}`}
        info="Amount currently available for withdrawal"
        showActionTop={false}
        actionText="Withdraw"
      />
      <StatsCard
        icon={<PaymentIcon />}
        title="Pending balance"
        value={`${totalUncompletedTransactions}`}
        info="Total numbers of Uncompleted payments"
        showActionTop={false}
        actionText="April 16, 2025"
      />
      <StatsCard
        icon={<PaymentIcon />}
        title="Completed Payment"
        value={`${totalCompletedTransactions}`}
        info="Total numbers of completed payments"
        showActionBottom={false}
        actionText="Withdraw"

      />
    </div>
  );
};