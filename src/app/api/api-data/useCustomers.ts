import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

type Customers = {
  notificationPreferences: {
    orderUpdates: boolean;
    promotionalEmails: boolean;
  };
  _id: string;
  user: {
    _id: string;
    email: string;
    userType: "customer" | "admin" | "vendor";
    inviteToken: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  fullName: string;
  accountStatus: "Active" | "Inactive" | "Suspended";
  wishlist: unknown[];
  ordersCount: number;
  returnRate: number;
  reviewsGiven: unknown[];
  deliveryDetails: unknown[];
  createdAt: string;
  updatedAt: string;
  profilePicture: string;
};

interface APICustomersResponse {
  data: {
    customers: Customers;
  };
}

async function fetchCustomers({ status = "", search = "" } = {}) {
  try {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (search) params.append("search", search);
    // if (sortBy) params.append("sortBy", sortBy);

    const queryString = params.toString();
    const url = `/customer-user${queryString ? `?${queryString}` : ""}`;

    const response = await axiosClient(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useGetCustomers({
  status = "",
  search = "",
  enabled = true,
} = {}) {
  return useQuery<APICustomersResponse>({
    queryKey: ["all-customers", { status, search }],
    queryFn: () => fetchCustomers({ status, search }),
    enabled,
  });
}
