"use client";
import { useMyCustomers } from "@/app/store/useVendorProductStore";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCard } from "@/components/ui/StatsCard";

export const StatCards = () => {
  // Use the custom hook to fetch customer data
  const { data, isLoading, error } = useMyCustomers();

  // If data is loading, show skeleton loaders
  if (isLoading) {
    return (
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  // If there's an error, display error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Failed to load customer data. Please try again later.
      </div>
    );
  }

  // Calculate values based on customer data
  const totalOrders = data
    ? data.oldVendorCustomers.length +
      data.recentVendorCustomers.length +
      data.newCustomers.length
    : 0;

  const pendingOrders = data
    ? data.newCustomers.length + data.recentVendorCustomers.length
    : 0;

  const completedOrders = data ? data.oldVendorCustomers.length : 0;

  // Calculate percentage increase
  const totalNewCustomers =
    data?.newCustomersByMonth.reduce(
      (sum, month) => sum + month.customers,
      0
    ) || 0;

  const percentageValue =
    totalOrders > 0 ? Math.round((totalNewCustomers / totalOrders) * 100) : 0;

  return (
    <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
      <StatsCard
        icon={<CardIcon />}
        info="Total orders serviced by Suppliers"
        value={totalOrders.toString()}
        title="All time orders"
      />
      <StatsCard
        icon={<CardIcon />}
        info="Orders that are yet to be delivered"
        value={pendingOrders.toString()}
        title="Orders in transit"
        className="bg-[#EDF4FF]"
      />
      <StatsCard
        icon={<CardIcon />}
        value={completedOrders.toString()}
        percentageValue={percentageValue.toString()}
        title="Completed orders"
      />
    </div>
  );
};

// Skeleton loader for cards
const SkeletonCard = () => {
  return (
    <div className="p-4 rounded-lg border bg-white shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
};

const CardIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.088 13.7844C1.6896 13.7844 2.1776 14.2804 2.1776 14.8932C2.1776 15.506 1.6896 16.002 1.0888 16.002C0.4872 16.002 0 15.506 0 14.8932C0 14.2804 0.488 13.7852 1.088 13.7852M13.4264 13.7852C14.028 13.7852 14.5144 14.2812 14.5144 14.894C14.5144 15.5068 14.028 16.0028 13.4264 16.0028C12.8256 16.0028 12.3384 15.5068 12.3384 14.894C12.3384 14.2812 12.8256 13.7852 13.4264 13.7852ZM15.9776 0.398778C16.0189 0.538806 16.0034 0.689443 15.9345 0.818166C15.8657 0.946889 15.749 1.04337 15.6096 1.08678C15.0384 1.25878 14.6672 1.47558 14.4856 1.71318C14.2944 1.96358 14.1896 2.26998 14.1712 2.61798V10.2668C14.1392 11.158 13.9336 11.8604 13.5328 12.3628C13.116 12.8876 12.476 13.1828 11.5936 13.2684H2.84C2.0584 13.2684 1.4128 13.0644 0.9232 12.6428C0.4336 12.2212 0.1312 11.6108 0.0072 10.8348L0 10.746V5.99398C0.0368 5.16998 0.2952 4.48998 0.7816 3.98118C1.2768 3.46518 1.968 3.20118 2.84 3.17718H10.4544C10.7552 3.17718 10.9984 3.42518 10.9984 3.73078C10.9997 3.87641 10.9431 4.01659 10.8411 4.12054C10.7391 4.22448 10.6 4.2837 10.4544 4.28518H2.8544C2.2624 4.30118 1.8416 4.46198 1.5608 4.75558C1.2728 5.05638 1.1128 5.47638 1.0888 6.01878V10.6988C1.1768 11.206 1.3576 11.5636 1.6264 11.7948C1.9024 12.0332 2.3 12.1588 2.84 12.1588L11.54 12.1612C12.1008 12.1052 12.4728 11.934 12.6872 11.6636C12.9192 11.3724 13.0584 10.8956 13.0824 10.2452V2.58918C13.1128 1.99158 13.2936 1.46678 13.6264 1.03078C13.9696 0.582778 14.5312 0.254778 15.3016 0.0227781C15.3706 0.00264207 15.4428 -0.00363269 15.5142 0.00431617C15.5857 0.012265 15.6548 0.03428 15.7176 0.0690901C15.7805 0.1039 15.8358 0.150816 15.8804 0.207128C15.9251 0.26344 15.9581 0.328033 15.9776 0.397178M10.4544 9.22918C10.7552 9.22918 10.9984 9.47718 10.9984 9.78278C10.9997 9.92841 10.9431 10.0686 10.8411 10.1725C10.7391 10.2765 10.6 10.3357 10.4544 10.3372H3.8072C3.66157 10.3357 3.52249 10.2765 3.42049 10.1725C3.31849 10.0686 3.26192 9.92841 3.2632 9.78278C3.2632 9.47638 3.5072 9.22838 3.8072 9.22838L10.4544 9.22918ZM10.4544 6.27238C10.7552 6.27238 10.9984 6.52038 10.9984 6.82678C10.9997 6.97241 10.9431 7.11259 10.8411 7.21654C10.7391 7.32048 10.6 7.3797 10.4544 7.38118H3.8072C3.66157 7.3797 3.52249 7.32048 3.42049 7.21654C3.31849 7.11259 3.26192 6.97241 3.2632 6.82678C3.2632 6.52118 3.5072 6.27238 3.8072 6.27238H10.4544Z"
      fill="#000051"
    />
  </svg>
);
