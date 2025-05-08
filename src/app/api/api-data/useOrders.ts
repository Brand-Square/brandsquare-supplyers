import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

async function fetchCustomersOrder({
  status = "",
  search = "",
  sortBy = "newest",
} = {}) {
  try {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (search) params.append("search", search);
    if (sortBy) params.append("sortBy", sortBy);

    const queryString = params.toString();
    const url = `/orders/customers${queryString ? `?${queryString}` : ""}`;

    const response = await axiosClient(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useGetCustomersOrders({
  status = "",
  search = "",
  sortBy = "newest",
  enabled = true,
} = {}) {
  return useQuery({
    queryKey: ["customers-orders", { status, search, sortBy }],
    queryFn: () => fetchCustomersOrder({ status, search, sortBy }),
    enabled,
  });
}
