import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ProductType,
  CategoryType,
  ProductData,
  CategoryFormData,
  ProductResponse,
  CategoryResponse,
} from "@/app/types/types";

// API URLs as constants
const API_URLS = {
  BASE: "https://api.brandsquare.store/api",
  CATEGORIES: "/categories/",
  PRODUCTS: "/products/",
} as const;

// Helper function to get auth token from cookies
const getAuthToken = () => {
  return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
};

/**
 * Custom hook for fetching products with React Query
 */
export const useProducts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["products", page, limit],
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
        }>(`${API_URLS.BASE}${API_URLS.PRODUCTS}`, {
          params: { page, limit },
        });

        // Raw data from API
        const responseData = response.data.data;

        // Transform to match ProductResponse type
        const productResponse: ProductResponse = {
          products: Array.isArray(responseData.products)
            ? responseData.products
            : [],
          limit: responseData.limit || limit,
          page: responseData.page || page,
          totalPages: responseData.totalPages || 1,
          totalProducts: responseData.totalProducts || 0,
        };

        return productResponse;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.msg || "Failed to fetch products";
          toast.error(errorMessage);
        } else {
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
    staleTime: 3 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook for fetching a single product
 */
export const useSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async (): Promise<ProductType | null> => {
      if (!productId) return null;

      const token = getAuthToken();

      try {
        const response = await axios.get(
          `${API_URLS.BASE}${API_URLS.PRODUCTS}/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data.data || null;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.msg || "Failed to fetch product";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred");
        }

        return null;
      }
    },
    enabled: !!productId, // Only run query if productId exists
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Custom hook for fetching categories
 */
export const useCategories = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["categories", page, limit],
    queryFn: async (): Promise<CategoryResponse> => {
      const token = getAuthToken();

      try {
        const response = await axios.get<{
          data: {
            categories: CategoryType[];
            page: number;
            limit: number;
            totalPages: number;
            totalCategories: number;
          };
          message: string;
        }>(`${API_URLS.BASE}${API_URLS.CATEGORIES}`, {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Raw data from API
        const responseData = response.data.data;

        // Transform to match CategoryResponse type
        const categoryResponse: CategoryResponse = {
          categories: Array.isArray(responseData.categories)
            ? responseData.categories
            : [],
          limit: responseData.limit || limit,
          page: responseData.page || page,
          totalPages: responseData.totalPages || 1,
          totalCategories: responseData.totalCategories || 0,
        };

        return categoryResponse;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.msg || "Failed to fetch categories";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred");
        }

        // Return empty response on error
        return {
          categories: [],
          limit,
          page,
          totalPages: 0,
          totalCategories: 0,
        };
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

/**
 * Custom hook for adding a new product
 */
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: ProductData) => {
      const token = getAuthToken();
      const formData = new FormData();

      // Append all product data to formData
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("categories", JSON.stringify(productData.categories));
      formData.append("price", productData.price.toString());
      formData.append("availability", productData.availability);
      formData.append("packSize", productData.packSize);
      formData.append("packQuantity", productData.packQuantity.toString());
      formData.append("stock", productData.stock.toString());
      formData.append("mininumStock", productData.mininumStock.toString());
      formData.append(
        "setOutOfStockAtMinimum",
        productData.setOutOfStockAtMinimum.toString()
      );
      formData.append("discountType", productData.discount.discountType);
      formData.append(
        "discountValue",
        productData.discount.discountValue.toString()
      );
      formData.append(
        "strikeOriginalPrice",
        productData.discount.strikeOriginalPrice.toString()
      );
      formData.append("variants", JSON.stringify(productData.variants));

      // Append images
      productData.images.forEach((image) => {
        formData.append("images", image);
      });

      // Append variant images
      productData.variantImages.forEach((image) => {
        formData.append("variantImages", image);
      });

      const response = await axios.post(
        `${API_URLS.BASE}${API_URLS.PRODUCTS}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      // Invalidate products queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.msg || "Failed to add product";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

/**
 * Custom hook for adding a new category
 */
export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryData: CategoryFormData) => {
      const token = getAuthToken();
      const formData = new FormData();

      formData.append("name", categoryData.name);
      formData.append("description", categoryData.description);

      if (categoryData.parent) {
        formData.append("parent", categoryData.parent);
      }

      if (categoryData.image) {
        formData.append("image", categoryData.image);
      }

      const response = await axios.post(
        `${API_URLS.BASE}${API_URLS.CATEGORIES}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      // Invalidate categories queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category added successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.msg || "Failed to add category";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

/**
 * Custom hook for deleting a product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const token = getAuthToken();

      const response = await axios.delete(
        `${API_URLS.BASE}${API_URLS.PRODUCTS}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      // Invalidate products queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.msg || "Failed to delete product";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};
