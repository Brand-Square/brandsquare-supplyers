"use client";

import { StatsCard } from "@/components/ui/StatsCard";
import { StatIcon } from "../../customers/Statcards";
import Cart from "../../../../../public/assets/icons/Cart";
import { Skeleton } from "@/components/ui/skeleton";
import { useVendorAnalyticsData } from "@/app/store/useVendorProductStore";

export const StatCards = () => {
  const { data: analyticsData, isLoading, error } = useVendorAnalyticsData();
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-x-4">
        <Skeleton className="h-[100px] w-[500px]" />
        <Skeleton className="h-[100px] w-[500px]" />
      </div>
    );
  }
  // if (!analyticsData) {
  //   return <div className="text-red-500">No data available</div>;
  // }
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <StatsCard
        icon={<StatIcon />}
        info="Compared to last month"
        title="Total products"
        value={String(analyticsData?.totalProduct)}
        percentageValue="10"
      />
      <StatsCard
        icon={<Cart width={16} height={16} color="#000051" />}
        info="Compared to last month"
        title="Total orders"
        percentageValue="10"
        value={String(analyticsData?.totalOrders)}
      />
    </div>
  );
};
