// app/complete-profile/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useInitAuthStore from "@/app/store/InitAuthStore";
import ProfileEditor from "@/app/dashboard/settings/edit-profile/EditProfileForm";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { isAuthenticated, profileComplete, checkProfileComplete } = useInitAuthStore();

  useEffect(() => {
    // If profile is already complete, redirect to dashboard
    if (profileComplete || checkProfileComplete()) {
      router.push("/dashboard");
    }
  }, [profileComplete, checkProfileComplete, router]);

  if (!isAuthenticated) {
    return null; // The guard will handle redirection
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
        <p className="mb-6 text-gray-600">
          Please complete your profile information to continue using the platform.
        </p>
        <ProfileEditor isCompleteProfileFlow={true} />
      </div>
    </div>
  );
}