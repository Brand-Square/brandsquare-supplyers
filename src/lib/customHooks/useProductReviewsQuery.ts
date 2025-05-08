import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductReview, ProductReviewInput } from "@/app/types/types";
import { getAuthToken } from "../cookiesUtils";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.brandsquare.store/api";
const PRODUCT_REVIEWS_ENDPOINT = "/product-review";

export const useProductReviewsQuery = (productId?: string) => {
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true after component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper to create headers with auth token
  const getHeaders = () => {
    const token = isMounted ? getAuthToken() : undefined;
    return {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    };
  };

  // Fetch product reviews
  const {
    data: productReviewsData,
    isLoading: isProductReviewsLoading,
    error: productReviewsError,
    refetch: refetchProductReviews,
  } = useQuery({
    queryKey: ["productReviews", productId],
    queryFn: async (): Promise<ProductReview[]> => {
      try {
        if (!productId) {
          return [];
        }

        const response = await axios.get(
          `${BASE_URL}${PRODUCT_REVIEWS_ENDPOINT}/${productId}`,
          getHeaders()
        );

        console.log("Product Reviews API Response:", response.data);

        if (Array.isArray(response.data)) {
          return response.data;
        } else if (Array.isArray(response.data.data)) {
          return response.data.data;
        }

        return [];
      } catch (error) {
        console.error("Error fetching product reviews:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          toast.error("Please login to view product reviews");
        } else {
          toast.error("Failed to load product reviews");
        }
        // Return empty array on error
        return [];
      }
    },
    enabled: !!productId && !!isMounted, // Only run the query if productId is defined and component is mounted
    staleTime: 5 * 60 * 1000,
  });

  // Add product review
  const addProductReview = useMutation({
    mutationFn: async (
      reviewData: ProductReviewInput
    ): Promise<ProductReview> => {
      try {
        if (!isMounted) {
          throw new Error("Component not mounted");
        }

        const token = getAuthToken();

        if (!token) {
          throw new Error("You must be logged in to submit a review");
        }

        // Validate rating
        if (reviewData.rating < 1 || reviewData.rating > 5) {
          throw new Error("Rating must be between 1 and 5");
        }

        // Validate comment
        if (!reviewData.comment.trim()) {
          throw new Error("Please provide a review comment");
        }

        const response = await axios.post(
          `${BASE_URL}${PRODUCT_REVIEWS_ENDPOINT}`,
          reviewData,
          getHeaders()
        );

        return response.data.data;
      } catch (error) {
        console.error("Error adding product review:", error);
        if (axios.isAxiosError(error)) {
          // Check for specific error messages from the API
          const errorMessage =
            error.response?.data?.message || error.response?.data?.msg;

          // Handle the specific case where user hasn't received the product
          if (
            errorMessage?.includes("have not received this product") ||
            errorMessage?.includes("must purchase") ||
            errorMessage?.includes("not eligible")
          ) {
            throw new Error(
              "You can only review products you have purchased and received"
            );
          }

          throw new Error(errorMessage || "Failed to submit review");
        }
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      // Invalidate queries for this product's reviews
      queryClient.invalidateQueries({
        queryKey: ["productReviews", variables.product],
      });
      toast.success("Review submitted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete a product review
  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: string): Promise<void> => {
      try {
        if (!isMounted) {
          throw new Error("Component not mounted");
        }

        const token = getAuthToken();

        if (!token) {
          throw new Error("You must be logged in to delete a review");
        }

        await axios.delete(
          `${BASE_URL}${PRODUCT_REVIEWS_ENDPOINT}/${reviewId}`,
          getHeaders()
        );
      } catch (error) {
        console.error("Error deleting product review:", error);
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.msg ||
            "Failed to delete review";
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate queries for this product's reviews
      if (productId) {
        queryClient.invalidateQueries({
          queryKey: ["productReviews", productId],
        });
      }
      toast.success("Review deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Check if a user has already reviewed a product
  const hasUserReviewed = (): boolean => {
    if (!isMounted || !productReviewsData || productReviewsData.length === 0) {
      return false;
    }

    const userId = getUserIdFromToken();
    if (!userId) {
      return false;
    }

    return productReviewsData.some((review) => review.user._id === userId);
  };

  // Check if a user can review a product
  const canUserReviewProduct = async (productId: string): Promise<boolean> => {
    if (!isMounted) {
      return false;
    }

    const token = getAuthToken();

    if (!token) {
      return false; // Not authenticated
    }

    try {
      // Check if user has already reviewed this product
      if (hasUserReviewed()) {
        return false;
      }

      // Check if user has purchased and received this product
      const response = await axios.get(
        `${BASE_URL}/orders/products/${productId}/delivered`,
        getHeaders()
      );

      // If the API request succeeds, the user is eligible to review
      return response.data.canReview || response.data.data?.canReview || true;
    } catch (error) {
      console.error("Error checking review eligibility:", error);

      if (axios.isAxiosError(error)) {
        // If we get a 403 or 404, the user hasn't purchased or received the product
        if (error.response?.status === 403 || error.response?.status === 404) {
          return false;
        }
      }

      // For any other errors, default to false for safety
      return false;
    }
  };

  // Get user ID from token (simplified approach)
  const getUserIdFromToken = (): string | null => {
    if (!isMounted) {
      return null;
    }

    const token = getAuthToken();
    if (!token) {
      return null;
    }

    try {
      // Basic decoding of JWT to get user ID - DO NOT USE for security-critical operations
      // This is a simplified approach for UI purposes only
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId || null;
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  };

  return {
    // Reviews data
    reviews: productReviewsData || [],
    reviewCount: productReviewsData?.length || 0,
    averageRating:
      productReviewsData && productReviewsData.length > 0
        ? productReviewsData.reduce((acc, review) => acc + review.rating, 0) /
          productReviewsData.length
        : 0,
    isMounted,

    // Loading and error states
    isProductReviewsLoading,
    productReviewsError,

    // Actions
    addReview: addProductReview.mutateAsync,
    deleteReview: deleteReviewMutation.mutateAsync,
    refetchProductReviews,

    // Helper functions
    hasUserReviewed,
    getUserId: getUserIdFromToken,
    canUserReviewProduct,

    // Mutation states
    isAddingReview: addProductReview.isPending,
    isDeletingReview: deleteReviewMutation.isPending,
  };
};
