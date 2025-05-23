import { StatsCard } from "@/components/ui/StatsCard";

export const StatCards = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatsCard
        icon={<StatIcon />}
        info="Registered users on the storefront"
        title="Total number of customers"
        value="0 NGN"
      />
      <StatsCard
        icon={<StatIcon />}
        info="Compared to last month"
        title="Total orders"
        percentageValue="0"
        value="0"
      />
      <StatsCard
        icon={<StatIcon />}
        info="Compared to last month"
        title="Total sales"
        percentageValue="0"
        value="0"
      />
    </div>
  );
};

export const StatIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_3934_8275)">
      <path
        d="M11.3793 0.0239258C9.92969 1.42633 8.49609 2.81593 8.49609 2.81593L9.01129 3.86393C9.70969 3.17273 10.4113 2.56393 11.0809 1.88633C12.4905 4.98153 13.4513 7.47593 14.6329 10.7735C15.0193 11.8447 14.9401 11.8927 14.0161 12.4711C12.5305 13.2095 12.0601 13.6951 10.2897 15.5783H11.5017C12.9817 14.2399 13.5305 13.7679 15.3841 12.7911C16.0401 12.4127 16.1297 11.9351 15.8609 11.1911C14.9937 8.78153 13.1137 3.58713 11.3793 0.0239258Z"
        fill="#000051"
      />
      <path
        d="M7.59847 0.0566406C6.53768 0.772641 5.71927 1.80304 4.79688 2.68624L5.17528 3.89264C5.89767 3.32464 6.52567 2.63744 7.17527 1.98864L10.6761 10.7702C10.8777 11.3646 10.5601 11.8942 9.92088 12.4702C9.15608 13.0854 7.58088 14.5182 6.86648 15.611H7.95287C9.09367 14.4398 9.29927 14.2806 10.5977 13.1566C11.4697 12.267 12.2569 11.8118 11.8457 10.6718L7.59847 0.0566406Z"
        fill="#000051"
      />
      <path
        d="M4.01783 0C3.73543 0.096 3.50023 0.2776 3.27943 0.4704C2.2393 1.46721 1.20223 2.46722 0.168232 3.4704C0.0114317 3.616 -0.00216826 3.8304 0.00023174 4.0448L0.0130317 5.256C0.0130317 5.256 1.39383 3.9136 3.45543 1.928C4.56743 4.82 5.72503 7.696 6.86583 10.5784C7.02183 11.0136 6.64823 11.3704 6.17463 11.8464C5.52023 12.4848 4.15063 13.7984 2.74983 15.5544H4.15463L7.53063 11.8512C7.85223 11.4096 8.25063 10.9784 8.08263 10.5784L4.01863 0H4.01783Z"
        fill="#000051"
      />
    </g>
    <defs>
      <clipPath id="clip0_3934_8275">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
