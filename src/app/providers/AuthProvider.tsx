"use client";

import { ReactNode } from "react";
import { useAuthQuery } from "../hooks/useAuthQuery";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component that uses TanStack Query to validate JWT token
 * and update authentication state throughout the application
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  // This hook will automatically validate the token and update isAuthenticated state
  useAuthQuery();

  return <>{children}</>;
}
