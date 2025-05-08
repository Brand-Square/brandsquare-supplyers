import { StatsCard } from "@/components/ui/StatsCard";
import PaymentIcon from "../../../../../public/assets/icons/paymentIcon";

export const StatCards = () => {
  return (
    <div className="grid sm:grid-cols-3 gap-3.5">
      <StatsCard
        icon={<PaymentIcon />}
        title="All time earnings"
        value="0 NGN"
        info="Total earnings on this dashboard"
      />
      <StatsCard
        icon={<PaymentIcon />}
        title="Pending payments"
        value="0"
        info="These payments are being processed"
      />
      <StatsCard
        icon={<PaymentIcon />}
        title="Completed payments"
        percentageValue="13"
        value="0"
        info="Compared to last month"
      />
    </div>
  );
};
