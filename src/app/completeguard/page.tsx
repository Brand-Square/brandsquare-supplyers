// components/ProfileCompletionGuard.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useInitAuthStore from "@/app/store/InitAuthStore";
// import LoadingSpinner from "../ui/LoadingSpinner"; 
// import div from '@/components/ui/div';

const PROFILE_COMPLETION_ROUTE = "/complete-profile";
const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/create-account",
  "/auth/forgot-password",
  "/complete-profile"
];

export default function ProfileCompletionGuard({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isAuthenticated,
    isLoading,
    profileComplete,
    checkProfileComplete
  } = useInitAuthStore();

  useEffect(() => {
    if (isLoading) return;

    // Skip check for public routes
    if (PUBLIC_ROUTES.includes(pathname)) return;

    // Redirect unauthenticated users to login
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Check if we need to redirect to complete profile
    const shouldRedirect = isAuthenticated && 
                         !profileComplete && 
                         !checkProfileComplete() && 
                         pathname !== PROFILE_COMPLETION_ROUTE;

    if (shouldRedirect) {
      router.push(PROFILE_COMPLETION_ROUTE);
    }
  }, [isAuthenticated, isLoading, pathname, profileComplete, checkProfileComplete, router]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  // Allow access if:
  // - It's a public route
  // - User is authenticated and profile is complete
  // - User is on the profile completion page
  const shouldRenderChildren = PUBLIC_ROUTES.includes(pathname) ||
                             (isAuthenticated && (profileComplete || checkProfileComplete())) ||
                             pathname === PROFILE_COMPLETION_ROUTE;

  return shouldRenderChildren ? <>{children}</> : <div>loading...</div>;
}