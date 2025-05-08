import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

// Base URL for the API
const BASE_URL = "https://api.brandsquare.store/api";

// Basic interface for subscription data input (what the component provides)
export interface NewsletterSubscribeData {
  name: string;
  email: string;
}

// Generic API response type
interface ApiResponse {
  success?: boolean;
  message?: string;
  msg?: string;
  error?: string;
  [key: string]: unknown;
}

interface UseNewsletterSubscriptionReturn {
  subscribe: (
    data: NewsletterSubscribeData
  ) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for handling newsletter subscriptions
 */
export const useNewsletterSubscription =
  (): UseNewsletterSubscriptionReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Subscribe to the newsletter
     * @param data The subscription data
     * @returns Promise with success status and message
     */
    const subscribe = async (
      data: NewsletterSubscribeData
    ): Promise<{ success: boolean; message: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        // Get the auth token from cookies if available
        let token = "";
        const tokenCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="));

        if (tokenCookie) {
          token = tokenCookie.split("=")[1];
        }

        // Prepare request config with auth header
        const config = {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        };

        // Make the API call
        const response: AxiosResponse<ApiResponse> = await axios.post(
          `${BASE_URL}/newsletter/subscribe`,
          data, // Since we now use the same field names as the API expects
          config
        );

        setIsLoading(false);
        return {
          success: true,
          message:
            response.data?.message ||
            response.data?.msg ||
            "Successfully subscribed to the newsletter!",
        };
      } catch (err) {
        setIsLoading(false);

        if (axios.isAxiosError(err) && err.response) {
          const typedError = err as AxiosError<ApiResponse>;
          const responseData = typedError.response?.data || {};

          // Create a readable error message
          let errorMessage = "Subscription failed. ";

          // Extract meaningful error information
          if (typeof responseData === "string") {
            errorMessage += responseData;
          } else {
            // Try to get the error message
            if (responseData.message) {
              errorMessage += responseData.message;
            } else if (responseData.msg) {
              errorMessage += responseData.msg;
            } else if (responseData.error) {
              errorMessage += responseData.error;
            }
          }

          setError(errorMessage);
          return { success: false, message: errorMessage };
        }

        // Generic error handling
        setError("An unexpected error occurred.");
        return { success: false, message: "An unexpected error occurred." };
      }
    };

    return {
      subscribe,
      isLoading,
      error,
    };
  };
