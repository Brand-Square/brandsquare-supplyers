import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { CartItem, CartItemInput, CartResponse } from "@/app/types/types";
import { getAuthToken } from "../cookiesUtils";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.brandsquare.store/api";
const CART_ENDPOINT = "/carts";

export const useCartQuery = () => {
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

  // Fetch cart items using useQuery directly in the hook
  const {
    data: cartData,
    isLoading: isCartLoading,
    error: cartError,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async (): Promise<CartResponse> => {
      try {
        const token = isMounted ? getAuthToken() : undefined;

        if (!token) {
          return { data: [], totalItems: 0, totalPrice: 0 };
        }

        const response = await axios.get(
          `${BASE_URL}${CART_ENDPOINT}`,
          getHeaders()
        );
        console.log("Cart API Response:", response.data);

        return response.data;
      } catch (error) {
        console.error("Error fetching cart items:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          toast.error("Please login to view your cart");
        } else {
          toast.error("Failed to load cart items");
        }

        // Return empty cart on error
        return { data: [], totalItems: 0, totalPrice: 0 };
      }
    },
    staleTime: 60 * 1000, // 1 minute
    enabled: !!isMounted && !!getAuthToken(), // Only run if component is mounted and user is authenticated
  });

  // Add item to cart
  const addToCart = useMutation({
    mutationFn: async (cartItem: CartItemInput): Promise<CartItem> => {
      try {
        if (!isMounted) {
          throw new Error("Component not mounted");
        }

        const token = getAuthToken();

        if (!token) {
          throw new Error("You must be logged in to add items to cart");
        }

        // Build a complete payload for the API
        const payload = {
          product: cartItem.product,
          quantity: cartItem.quantity,
          // Only include selectedVariant if it exists
          ...(cartItem.selectedVariant && {
            selectedVariant: cartItem.selectedVariant,
          }),
          // Only include variantId if it exists
          ...(cartItem.variantId && { variantId: cartItem.variantId }),
          // Only include customSpecifications if they exist
          ...(cartItem.customSpecifications && {
            customSpecifications: cartItem.customSpecifications,
          }),
        };

        console.log("Adding to cart with payload:", payload);

        const response = await axios.post(
          `${BASE_URL}${CART_ENDPOINT}`,
          payload,
          getHeaders()
        );

        return response.data.data;
      } catch (error) {
        console.error("Error adding item to cart:", error);
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.msg ||
            "Failed to add item to cart";
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item added to cart successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update cart item
  const updateCartItem = useMutation({
    mutationFn: async ({
      cartItemId,
      updatedData,
    }: {
      cartItemId: string;
      updatedData: Partial<CartItemInput>;
    }): Promise<CartItem> => {
      try {
        if (!isMounted) {
          throw new Error("Component not mounted");
        }

        // Build a clean update payload
        const payload = {
          ...updatedData,
          // Include variantId if selectedVariant exists
          ...(updatedData.selectedVariant && {
            variantId: updatedData.variantId || updatedData.selectedVariant._id,
          }),
        };

        console.log("Updating cart item with payload:", payload);

        const response = await axios.put(
          `${BASE_URL}${CART_ENDPOINT}/${cartItemId}`,
          payload,
          getHeaders()
        );

        return response.data.data;
      } catch (error) {
        console.error("Error updating cart item:", error);
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.msg ||
            "Failed to update cart item";
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart item updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update cart item quantity
  const updateCartQuantity = useMutation({
    mutationFn: async ({
      cartItemId,
      quantity,
    }: {
      cartItemId: string;
      quantity: number;
    }): Promise<CartItem> => {
      try {
        if (!isMounted) {
          throw new Error("Component not mounted");
        }

        if (quantity <= 0) {
          throw new Error("Quantity must be greater than zero");
        }

        const response = await axios.put(
          `${BASE_URL}${CART_ENDPOINT}/${cartItemId}/quantity`,
          { quantity },
          getHeaders()
        );

        return response.data.data;
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.msg ||
            "Failed to update quantity";
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Quantity updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete cart item
  const deleteCartItem = useMutation({
    mutationFn: async (cartItemId: string): Promise<void> => {
      try {
        if (!isMounted) {
          throw new Error("Component not mounted");
        }

        await axios.delete(
          `${BASE_URL}${CART_ENDPOINT}/${cartItemId}`,
          getHeaders()
        );
      } catch (error) {
        console.error("Error deleting cart item:", error);
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.msg ||
            "Failed to remove item from cart";
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Helper function to check if a product is in cart
  const isProductInCart = (productId: string, variantId?: string): boolean => {
    if (!cartData || !cartData.data || cartData.data.length === 0) {
      return false;
    }

    return cartData.data.some((item) => {
      // If checking a specific variant
      if (variantId) {
        return (
          item.product._id === productId &&
          item.selectedVariant &&
          item.selectedVariant._id === variantId
        );
      }

      // If checking just the product (any variant)
      return item.product._id === productId;
    });
  };

  // Helper function to get cart item ID if product is in cart
  const getCartItemId = (
    productId: string,
    variantId?: string
  ): string | null => {
    if (!cartData || !cartData.data || cartData.data.length === 0) {
      return null;
    }

    const item = cartData.data.find((item) => {
      if (variantId) {
        return (
          item.product._id === productId &&
          item.selectedVariant &&
          item.selectedVariant._id === variantId
        );
      }
      return item.product._id === productId;
    });

    return item ? item._id : null;
  };

  return {
    // Cart data
    cartItems: cartData?.data || [],
    totalItems: cartData?.totalItems || 0,
    totalPrice: cartData?.totalPrice || 0,
    isMounted,

    // Loading and error states
    isCartLoading,
    cartError,

    // Actions
    addToCart: addToCart.mutateAsync,
    updateCartItem: updateCartItem.mutateAsync,
    updateCartQuantity: updateCartQuantity.mutateAsync,
    removeFromCart: deleteCartItem.mutateAsync,
    refetchCart,

    // Helper functions
    isProductInCart,
    getCartItemId,

    // Mutation states
    isAddingToCart: addToCart.isPending,
    isUpdatingCart: updateCartItem.isPending,
    isUpdatingQuantity: updateCartQuantity.isPending,
    isRemovingFromCart: deleteCartItem.isPending,
  };
};

export default useCartQuery;
