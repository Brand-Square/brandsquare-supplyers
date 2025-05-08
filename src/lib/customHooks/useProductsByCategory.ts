import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductResponse, ProductType } from "@/app/types/types";

// API URL
const API_URL = "https://api.brandsquare.store/api/products/";

/**
 * Custom hook to fetch products by category
 * @param categoryId The ID of the category to filter products by
 * @param page Current page number for pagination
 * @param limit Number of products per page
 * @returns Query result with products, loading state, and error state
 */

export const useProductsByCategory = (
  categoryId: string,
  page = 1,
  limit = 10
) => {
  return useQuery({
    queryKey: ["productsByCategory", categoryId, page, limit],
    queryFn: async (): Promise<ProductResponse> => {
      try {
        const response = await axios.get<{
          data: {
            products: ProductType[];
            page: number;
            limit: number;
            totalPages: number;
            totalProducts: number;
          };
          message: string;
        }>(`${API_URL}`, {
          params: {
            category: categoryId,
            page,
            limit,
          },
        });

        const responseData = response.data.data;

        // Transform to match ProductResponse type
        const productResponse: ProductResponse = {
          products: Array.isArray(responseData?.products)
            ? responseData?.products
            : [],
          limit: responseData?.limit || limit,
          page: responseData?.page || page,
          totalPages: responseData?.totalPages || 1,
          totalProducts: responseData?.totalProducts || 0,
        };

        return productResponse;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.msg || "Failed to fetch products";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occured");
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
    enabled: !!categoryId, // Only run query if categoryId exists
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
