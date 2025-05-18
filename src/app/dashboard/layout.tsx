"use client";

import { DashboardHeader } from "@/components/layouts/DashboardHeader";
import { SideBar } from "@/components/layouts/Sidebar/index";
import { usePathname, useRouter } from "next/navigation";
import useInitAuthStore from "@/app/store/InitAuthStore";
import { useEffect } from "react";
// import div from '@/components/ui/div';
// import<div>Loading</div>nents/ui<div>Loading</div>ILE_COMPLETION_ROUTE = "/complete-profile";
const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/create-account",
  "/auth/forgot-password",
  "/complete-profile"
];

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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

    // Redirect to profile completion if not complete
    if (isAuthenticated && !profileComplete && !checkProfileComplete()) {
      router.push('/complete-profile');
    }
  }, [isAuthenticated, isLoading, pathname, profileComplete, checkProfileComplete]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  // If not authenticated or profile not complete, don't show dashboard layout
  if (!isAuthenticated || (!profileComplete && !PUBLIC_ROUTES.includes(pathname))) {
    return <div>Loading</div>;
  }

  // Show dashboard layout only for authenticated users with complete profiles
  return (
    <div className="grid xl:grid-cols-[auto_1fr] min-h-screen grid-cols-1 bg-[#F6F7F9]">
      <div className="xl:block hidden">
        <SideBar />
      </div>

      <main className="">
        <DashboardHeader />
        <div className="pt-8 pb-11 px-5 max-w-[90rem] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;