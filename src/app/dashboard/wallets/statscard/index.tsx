// statscard.tsx
'use client';
import { StatsCard } from "@/components/ui/WalletStatsCard";
import PaymentIcon from "../../../../../public/assets/icons/paymentIcon";

interface StatCardsProps {
  availableBalance?: number;
  pendingBalance?: number;
  totalBalance?: number;
  currency?: string;
}

export const StatCards = ({
  availableBalance = 0,
  pendingBalance = 0,
  totalBalance = 0,
  currency = 'NGN'
}: StatCardsProps) => {
  return (
    <div className="grid sm:grid-cols-3 gap-3.5">
      <StatsCard
        icon={<PaymentIcon />}
        title="Available Balance"
        value={`${availableBalance} ${currency}`}
        info="Amount currently available for withdrawal"
        showActionTop={false}
        actionText="Withdraw"
      />
      <StatsCard
        icon={<PaymentIcon />}
        title="Pending balance"
        value={`${pendingBalance} ${currency}`}
        info="Amount awaiting clearance"
        showActionTop={false}
        actionText="April 16, 2025"
      />
      <StatsCard
        icon={<PaymentIcon />}
        title="Total Balance"
        value={`${totalBalance} ${currency}`}
        info="Sum of available and pending balances"
        showActionBottom={false}
        actionText="Withdraw"

      />
    </div>
  );
};