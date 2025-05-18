
"use client"
import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/app/api/axiosClient";
import { useEffect, useState } from "react";


export type VariantProperty = {
  key: string;
  value: string;
};

type ProductVariant = {
  name: string;
  type: string;
  variantPrice: number;
  variantStock: number;
  properties: VariantProperty[];
  applyDiscount: boolean;
  image: string;
};

type VariantInputValues = {
  name: string;
  availableQuantity?: number | null;
  price: number | null;
  image: File | null;
};

interface VariantStore {
  productVariants: ProductVariant[];
  inputValues: VariantInputValues;
}

export const useProductVariantsStore = create<VariantStore>(() => ({
  productVariants: [],
  inputValues: {
    image: null,
    name: "",
    availableQuantity: null,
    price: null,
  },
}));

// Analytics data types
export interface VendorAnalyticsData {
  totalProduct: number;
  totalOrders: number;
  totalUniqueCustomers: number;
  totalRevenue: number;
  salesOverTime: SalesOverTime[];
  bestSellingProducts: BestSellingProduct[];
  productPerformance: ProductPerformance[];
  newCustomersByMonth: NewCustomersByMonth[];
}

export interface SalesOverTime {
  month: string;
  sales?: number;
  customers?: number;
}

export interface BestSellingProduct {
  productId?: string;
  productName?: string;
  quantity?: number;
  revenue?: number;
  name?: string;
  value?: number;
}

export interface Category {
  _id: string;
  name: string;
  parent: string | null;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoriesResponse {
  isSuccess: boolean;
  message: string;
  data: {
    categories: Category[];
    totalCategories: number;
    page: number;
    totalPages: number;
    limit: number;
  };
}

export interface ProductPerformance {
  productId: string;
  productName: string;
  sales: number;
  month: string;
}

export interface NewCustomersByMonth {
  month: string;
  customers: number;
}

interface DecodedToken {
  userId: string;
}

// Fetch vendor analytics data
export const useVendorAnalyticsData = () => {

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem("token"));
    }
  }, []);


  return useQuery<VendorAnalyticsData>({
    queryKey: ["vendor-analytics", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }


      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const vendorId = decodedToken.userId;


        if (!vendorId) {
          throw new Error("Vendor ID not found in token.");
        }


        const response = await axiosInstance.get(`/analytics/vendor/${vendorId}`);

        return response.data;
      } catch (error: unknown) {
        console.error("Error decoding token or fetching data:", error);
        return Promise.reject("Failed to decode token or fetch data.");
      }
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,

    enabled: !!token,
  });
};

// Helper functions to transform data for charts
export const transformSalesOverTimeData = (data: SalesOverTime[] = []) => {
  return data.map(item => ({
    name: item.month,
    val: item.sales
  }));
};

export const transformBestSellingProductsData = (data: BestSellingProduct[] = []) => {
  return data.map(item => ({
    name: item.productName,
    value: item.revenue
  }));
};

export const transformProductPerformanceData = (data: ProductPerformance[] = []) => {
  return data.map(item => ({
    name: item.month,
    [item.productName]: item.sales
  }));
};

export const transformNewCustomersData = (data: NewCustomersByMonth[] = []) => {
  return data.map(item => ({
    name: item.month,
    val: item.customers
  }));
};

// Upload image types
export interface UploadedFile {
  originalName: string;
  fileName: string;
  filePath: string;
  publicUrl: string;
  size: number;
  mimetype: string;
}

export interface UploadImageResponse {
  success: boolean;
  message: string;
  files: UploadedFile[];
}

// Upload image(s) to server
export const uploadImage = async (
  files: File[],
  subfolder: string = "compliance_docs"
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append("files", file);
  });

  const response = await axiosInstance.post(
    `/file/upload?subfolder=${encodeURIComponent(subfolder)}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Category types

// Fetch all categories
export const useCategories = (
  search: string = "bag",
  sortBy: string = "newest",
  page: number = 1,
  limit: number = 100
) => {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories", { search, sortBy, page, limit }],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/categories/?search=${encodeURIComponent(search)}&sortBy=${encodeURIComponent(sortBy)}&page=${page}&limit=${limit}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Customer data types
export interface Customer {
  // Define customer properties here based on the expected response
  // Example:
  id: string;
  name: string;
  email: string;
}

export interface VendorCustomersResponse {
  oldVendorCustomers: Customer[];
  recentVendorCustomers: Customer[];
  newCustomers: Customer[];
  newCustomersByMonth: { month: string; customers: number }[];
}

// Fetch vendor customers
export const useMyCustomers = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return useQuery<VendorCustomersResponse>({
    queryKey: ["my-customers", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }

      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const vendorId = decodedToken.userId;

        if (!vendorId) {
          throw new Error("Vendor ID not found in token.");
        }

        const response = await axiosInstance.get(`/vendor-user/${vendorId}/customers`);
        return response.data;
      } catch (error: unknown) {
        console.error("Error decoding token or fetching data:", error);
        return Promise.reject("Failed to decode token or fetch data.");
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};


//fetch vendor profile
export interface VendorProfile {
  location: {
    country: string;
    state: string;
    city: string;
  };
  performanceMetrics: {
    totalProducts: number;
    averageRating: number;
    totalSales: number;
    refundRate: number;
  };
  notificationPreferences: {
    salesAlert: boolean;
    promotions: boolean;
  };
  withdrawalSettings: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    bankCode: string;
    recipientCode: string;
  };
  _id: string;
  user: string;
  businessName: string;
  productCategories: string[];
  status: string;
  wishlist: unknown[]; // Define a more specific type if needed
  deliveryDetails: unknown[]; // Define a more specific type if needed
  paymentTokens: unknown[]; // Define a more specific type if needed
  onboardingDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  businessAddress: string;
  businessRegistrationNumber: string;
  businessType: string;
  complianceDocument: string[];
  logo: string;
  ownerName: string;
  phoneNumber: string;
  storeName: string;
  taxIdentificationNumber: string;
}

export interface VendorProfileResponse {
  isSuccess: boolean;
  message: string;
  vendor: VendorProfile;
}

export const useVendorProfile = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return useQuery({
    queryKey: ["vendor-profile", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }

      try {
        // Get user data from local storage
        const storedData = localStorage.getItem("vendorDetails");
        if (!storedData) {
          throw new Error("User data not found in local storage.");
        }

        const userData = JSON.parse(storedData);
        const supplierId = userData?._id || userData?.userDetails?.id;

        console.log('supplierId', supplierId);

        if (!supplierId) {
          throw new Error("Supplier ID not found in user details.");
        }

        // Make API call with the correct supplier ID
        const response = await axiosInstance.get(`/supplier-user/${supplierId}/info`);
        return response.data;
      } catch (error: unknown) {
        console.error("Error fetching supplier data:", error);
        throw new Error("Failed to fetch supplier data.");
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};
// Vendor product store
interface MyOrdersResponse {
  isSuccess: boolean;
  message: string;
  data: {
    orders: unknown[];
    totalOrders: number;
    page: number;
    totalPages: number;
    limit: number;
  };
}

export const useMyOrdersQuery = () => {
  return useQuery<MyOrdersResponse>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/orders/my');
        return response.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

interface VendorProductState {
  useMyOrders: () => ReturnType<typeof useMyOrdersQuery>;
}

const useVendorProductStore = create<VendorProductState>()(() => ({
  useMyOrders: () => {
    return useMyOrdersQuery();
  },
}));

export default useVendorProductStore;
