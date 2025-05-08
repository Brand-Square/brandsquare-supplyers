import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductResponse } from "@/app/types/types";

// Base URL
const BASE_URL = "https://api.brandsquare.store/api";
const TODAYS_DEALS_ENDPOINT = "/products/todays-deals";

/**
 * Custom hook for fetching today's deal products with React Query
 */
export const useTodaysDealsProducts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["todaysDeals", page, limit],
    queryFn: async (): Promise<ProductResponse> => {
      try {
        const response = await axios.get(
          `${BASE_URL}${TODAYS_DEALS_ENDPOINT}`,
          {
            params: { page, limit },
          }
        );

        const todaysDealsData = response.data;

        // Check if we have products in the expected format
        if (
          todaysDealsData &&
          todaysDealsData.isSuccess &&
          Array.isArray(todaysDealsData.data)
        ) {
          // Transform response to match ProductResponse type
          return {
            products: todaysDealsData.data,
            limit: limit,
            page: page,
            totalPages: Math.ceil(todaysDealsData.data.length / limit),
            totalProducts: todaysDealsData.data.length,
          };
        } else {
          console.warn("Unexpected API response format:", todaysDealsData);
          return {
            products: [],
            limit,
            page,
            totalPages: 0,
            totalProducts: 0,
          };
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.msg || "Failed to fetch today's deals";
          console.error("Today's deals API error:", error.response?.data);
          toast.error(errorMessage);
        } else {
          console.error("Unexpected error fetching today's deals:", error);
          toast.error("An unexpected error occurred");
        }

        // Return empty response on error
        return {
          products: [],
          limit,
          page,
          totalPages: 0,
          totalProducts: 0,
        };
      }
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    refetchOnWindowFocus: false,
  });
};
