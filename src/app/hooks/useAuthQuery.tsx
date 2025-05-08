"use client";

import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../services/authService";
import useInitAuthStore from "../store/InitAuthStore";
import { useEffect } from "react";

/**
 * Custom hook that uses TanStack Query to validate JWT token and update authentication state
 * This ensures isAuthenticated is always up-to-date based on token validity
 */
export function useAuthQuery() {
  const { setIsAuthenticated } = useInitAuthStore();

  // Use TanStack Query to periodically validate the token
  const { data: isValid } = useQuery({
    queryKey: ["auth-validation"],
    queryFn: validateToken,
    // Refetch every 5 minutes and when window regains focus
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    // Don't retry on 401 errors (invalid token)
    retry: (failureCount, error: Error & { response?: { status: number } }) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    },
  });

  // Update the authentication state based on token validity
  useEffect(() => {
    setIsAuthenticated(!!isValid);
  }, [isValid, setIsAuthenticated]);

  return { isAuthenticated: !!isValid };
}
