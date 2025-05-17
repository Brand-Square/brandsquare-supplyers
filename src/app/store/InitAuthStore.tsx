/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axiosInstance from "../api/axiosClient";

enum API_URL {
  BASE = "https://api.brandsquare.store/api/auth",
  LOGIN = "/login/",
  REGISTER = "/register/",
  VERIFY_OTP = "/verify-otp/",
  SEND_EMAIL_OTP = "/send-otp/",
  FORGOT_PASSWORD = "/forgot-password/",
  RESET_PASSWORD = "/reset-password/",
}

export type Vendor = {
  companyName: string;
  email: string;
  password: string;
  id: string;
  updatedAt: string;
  createdAt: string;
};

interface LoginResponse {
  isSuccess: boolean;
  message: string;
  data: {
    details: Data;
    token: string;
  };
}

export interface AuthenticateVendorStore {
  vendor: Vendor | null;
  email: string;
  password: string;
  termsAccepted: boolean;
  setVendor: (vendor: Vendor | null) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setTermsAccepted: (accepted: boolean) => void;
}

interface RegisterCredentials {
  businessName: string;
  email: string;
  password: string;
  userType: string;
  acceptedTOS: boolean;
}
interface LoginCredentials {
  email: string;
  password: string;
  userType: string;
}
interface emailprop {
  email: string;
}

interface VerifyPasswordPayload {
  email: string;
  password: string;
}

interface AuthStore extends AuthenticateVendorStore {
  isLoading: boolean;
  error: any;
  isAuthenticated: boolean;
  register: (Credential: RegisterCredentials) => Promise<any>;
  resetState: () => void;
  login: (
    LoginCredentials: LoginCredentials,
    router: AppRouterInstance
  ) => Promise<any>;
  sendOtp: (email: emailprop) => Promise<any>;
  verifyOtp: (verifyOtp: verifyOtp) => Promise<any>;
  forgotPassword: (email: emailprop) => Promise<any>;
  ResetPassword: (ResetPassword: resetPassword) => Promise<any>;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  checkTermsAccepted: () => boolean;
  signOut: () => void;
  verifyPassword: (payload: VerifyPasswordPayload) => Promise<void>;
  updateVendorProfile: (data: ProfileUpdateData) => Promise<any>;
  isUpdateProfileLoading: boolean;
  setUpdateProfileLoading: (loading: boolean) => void;
}

interface verifyOtp {
  email: string;
  otp: string;
}
interface resetPassword {
  email: string;
  otp: string;
  newPassword: string;
}

interface LoginResponse {
  isSuccess: boolean;
  message: string;
  data: {
    details: Data;
    token: string;
  };
}
interface Data {
  user: string;
  businessName: string;
  productCategories: string[];
  status: string;
  performanceMetrics: {
    totalProducts: number;
    averageRating: number;
    totalSales: number;
    refundRate: number;
  };
  notificationPreferences: {
    salesAlert: boolean;
    promotions: boolean;
  };
  _id: string;
  paymentTokens: string[];
  onboardingDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  email: string;
  userType: string;
}

interface ProfileUpdateData {
  businessAddress?: string;
  businessRegistrationNumber?: string;
  taxIdentificationNumber?: string;
  businessType: "limitedLiability" | "partnership" | "soleProprietorship";
  logo?: string;
  phoneNumber: string;
  ownerName: string;
  businessName: string;
  storeName: string;
  productCategories: string[];
  notificationPreferences: {
    salesAlert?: boolean;
    promotions?: boolean;
  };
  complianceDocument?: string[];
  deliveryAddresses?: string;
  location?: {
    country?: string;
    state?: string;
    city?: string;
  };
}

const useInitAuthStore = create<AuthStore>((set, get) => {
  let termsAccepted = false;

  // Hydrate vendor from localStorage on initialization
  if (typeof window !== "undefined") {
    // Check if terms have been accepted
    const storedTermsAccepted = localStorage.getItem("termsAccepted");
    if (storedTermsAccepted === "true") {
      termsAccepted = true;
    }
    const token =
      localStorage.getItem("token") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    const vendorDetails = localStorage.getItem("vendorDetails");

    if (vendorDetails) {
      try {
        const details = JSON.parse(vendorDetails);
        set((state) => ({
          ...state,
          vendor: {
            companyName: details.businessName,
            email: details.email,
            password: "",
            id: details._id,
            updatedAt: details.updatedAt,
            createdAt: details.createdAt,
          },
          isAuthenticated: !!token,
        }));
      } catch (error) {
        console.error("Error parsing vendor details:", error);
        localStorage.removeItem("vendorDetails");
        set((state) => ({ ...state, vendor: null, isAuthenticated: false }));
      }
    }
  }

  return {
    signOut: () => {
      // Clear cookies
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("vendorDetails");
        // Don't remove terms acceptance on logout
        // localStorage.removeItem("termsAccepted");
      }

      // Reset store state
      set({
        vendor: null,
        email: "",
        isLoading: false,
        error: null,
        isAuthenticated: false,
        password: "",
        // Don't reset terms acceptance on logout
        // termsAccepted: false,
      });

      window.location.href = "/auth/login";
    },
    vendor: null,
    email: "",
    isLoading: false,
    error: null,
    isAuthenticated: false,
    termsAccepted: termsAccepted,
    // IMPORTED FROM AUTH STORE
    password: "",
    setVendor: (vendor: Vendor | null) => {
      if (typeof window !== "undefined") {
        if (vendor) {
          // Save vendor to localStorage
          localStorage.setItem(
            "vendorDetails",
            JSON.stringify({
              businessName: vendor.companyName,
              email: vendor.email,
              _id: vendor.id,
              updatedAt: vendor.updatedAt,
              createdAt: vendor.createdAt,
            })
          );
        } else {
          localStorage.removeItem("vendorDetails");
        }
      }
      set((state) => ({ ...state, vendor: vendor }));
    },
    setEmail: (email: string) => set((state) => ({ ...state, email: email })),

    setPassword: (password: string) =>
      set((state) => ({ ...state, password: password })),

    setTermsAccepted: (accepted: boolean) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("termsAccepted", String(accepted));
      }
      set({ termsAccepted: accepted });
    },

    resetState: () => {
      set({
        vendor: null,
        isLoading: false,
        error: null,
      });
    },
    setIsLoading: (isLoading: boolean) => {
      set({ isLoading });
    },

    setError: (error: any) => {
      set({ error });
    },

    setIsAuthenticated: (isAuthenticated: boolean) => {
      set({ isAuthenticated });
    },

    checkTermsAccepted: () => {
      // First check the state
      if (get().termsAccepted) {
        return true;
      }

      // Then check localStorage as a backup
      if (typeof window !== "undefined") {
        const storedTermsAccepted = localStorage.getItem("termsAccepted");
        if (storedTermsAccepted === "true") {
          // Update the state to match localStorage
          set({ termsAccepted: true });
          return true;
        }
      }

      return false;
    },

    register: async (Credential: RegisterCredentials) => {
      // Check if terms have been accepted
      if (!get().checkTermsAccepted()) {
        toast.error("You must accept the terms and conditions to register");
        set({ isLoading: false, error: "Terms and conditions not accepted" });
        return Promise.reject("Terms and conditions not accepted");
      }

      set({ isLoading: true, error: null });

      try {
        const response = await axios.post<{
          isSuccess: boolean;
          message: string;
          data: {
            details: Data;
            token: string;
          };
        }>(`${API_URL.BASE + API_URL.REGISTER}`, Credential);

        console.log(response, "response init");
        // Store token and vendor details in state
        const token = response.data.data.token;
        // Update state with vendor details and authentication status
        set((state) => ({
          ...state,
          vendor: {
            companyName: response.data.data.details.businessName,
            email: response.data.data.details.email,
            password: "",
            id: response.data.data.details._id,
            updatedAt: response.data.data.details.updatedAt,
            createdAt: response.data.data.details.createdAt,
          },
          isLoading: false,
          isAuthenticated: true,
        }));

        // Ensure token and vendor details are stored in both localStorage and cookies
        localStorage.setItem("token", token);
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(response.data.data.details)
        );

        // Set secure cookies with proper attributes
        document.cookie = `token=${token}; Secure; SameSite=Strict; max-age=${2 * 24 * 60 * 60
          }; path=/`;
        document.cookie = `email=${response.data.data.details.email
          }; Secure; SameSite=Strict; max-age=${2 * 24 * 60 * 60}; path=/`;

        // Store token in localStorage for persistence
        localStorage.setItem("token", token);
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(response.data.data.details)
        );
        toast.success(response.data.message || "Registration successful");
        console.log(response.data.data.token, "response token");
        console.log(response.data, "response data");

        // STORING TOKEN IN COOKIE FOR SESSION PERSISTENCY OF 48 HOURS
        document.cookie = `token=${response.data.data.token
          }; Secure; SameSite=None; max-age=${2 * 24 * 60 * 60} :path=/`;

        document.cookie = `email=${response.data.data.details.email
          }; Secure; SameSite=None;max-age=${2 * 24 * 60 * 60} :path=/`;

        return response.data;
      } catch (error: any) {
        toast.error(
          error.status === 400
            ? "Invalid details"
            : error.message || "Registration failed"
        );
        console.log(error);
        set({
          isLoading: false,
        });

        throw error;
      }
    },

    login: async (
      LoginCredentials: LoginCredentials,
      router: AppRouterInstance
    ) => {
      set({ isLoading: true, error: null });

      try {
        const response = await axios.post<LoginResponse>(
          `${API_URL.BASE + API_URL.LOGIN}`,
          LoginCredentials
        );

        // Store token and vendor details in state
        const token = response.data.data.token;
        // Update state with vendor details and authentication status
        set((state) => ({
          ...state,
          vendor: {
            companyName: response.data.data.details.businessName,
            email: response.data.data.details.email,
            password: "",
            id: response.data.data.details._id,
            updatedAt: response.data.data.details.updatedAt,
            createdAt: response.data.data.details.createdAt,
          },
          isLoading: false,
          isAuthenticated: true,
        }));

        // Ensure token and vendor details are stored in both localStorage and cookies
        localStorage.setItem("token", token);
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(response.data.data.details)
        );

        // Set secure cookies with proper attributes
        document.cookie = `token=${token}; Secure; SameSite=Strict; max-age=${2 * 24 * 60 * 60
          }; path=/`;
        document.cookie = `email=${response.data.data.details.email
          }; Secure; SameSite=Strict; max-age=${2 * 24 * 60 * 60}; path=/`;

        // Store token in localStorage for persistence
        localStorage.setItem("token", token);
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(response.data.data.details)
        );

        // STORING TOKEN IN COOKIE FOR SESSION PERSISTENCY OF 48 HOURS
        document.cookie = `token=${response.data.data.token
          }; Secure; SameSite=None; max-age=${2 * 24 * 60 * 60}; path=/`;
        document.cookie = `email=${response.data.data.details.email
          }; Secure; SameSite=None;max-age=${2 * 24 * 60 * 60}; path=/`;
        toast.success("Login successful");
        console.log(response, "response init");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } catch (error: any) {
        console.log(error, "error");
        toast.error(
          error.response?.data?.msg || "Login failed" || error.message
        );
        set({
          isLoading: false,
        });
      }
    },

    sendOtp: async (email: emailprop) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      try {
        const response = await axios.post(
          `${API_URL.BASE + API_URL.SEND_EMAIL_OTP}`,
          email,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error: any) {
        console.log(error, "otp error");
        throw error;
      }
    },

    verifyOtp: async (verifyOtp: verifyOtp) => {
      set({ isLoading: true, error: null });

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      try {
        const response = await axios.post<{ message: string }>(
          `${API_URL.BASE + API_URL.VERIFY_OTP}`,
          verifyOtp,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        set({ isLoading: false });

        toast.success(response.data.message);
        return response.data;
      } catch (error: any) {
        toast.error(
          error.response?.data?.msg || "Verification failed" || error.message
        );

        set({
          isLoading: false,
        });

        throw error;
      }
    },

    forgotPassword: async (email: emailprop) => {
      set({ isLoading: true, error: null });

      try {
        const response = await axios.post(
          `${API_URL.BASE + API_URL.FORGOT_PASSWORD}`,
          email
        );
        set({ isLoading: false });

        toast.success(response.data.message);
        document.cookie = `email=${email.email
          }; Secure; SameSite=None;max-age=${2 * 24 * 60 * 60}`;
        return response.data;
      } catch (error: any) {
        toast.error(
          error.message
            ? error.message
            : error.response?.data?.msg || "Password recovery failed"
        );
        set({
          isLoading: false,
        });

        throw error;
      }
    },

    ResetPassword: async (ResetPassword: resetPassword) => {
      set({ isLoading: true, error: null });

      try {
        const response = await axios.post<{ message: string }>(
          `${API_URL.BASE + API_URL.RESET_PASSWORD}`,
          ResetPassword
        );
        set({ isLoading: false });

        console.log(response, "response");
        toast.success(response.data.message);
      } catch (error: any) {
        console.log(error, "error");
        toast.error(
          error.response?.data?.msg || "Error sending code" || error.message
        );
        set({
          isLoading: false,
        });

        throw error;
      }
    },
    verifyPassword: async (payload: VerifyPasswordPayload) => {
      try {
        const response = await axios.post<LoginResponse>(
          `${API_URL.BASE + API_URL.LOGIN}`,
          {
            email: payload.email,
            password: payload.password,
            userType: "supplier",
          }
        );

        if (response.data.isSuccess) {
          const token = response.data.data.token;

          // Update state with vendor details
          set((state) => ({
            ...state,
            vendor: {
              companyName: response.data.data.details.businessName,
              email: response.data.data.details.email,
              password: "",
              id: response.data.data.details._id,
              updatedAt: response.data.data.details.updatedAt,
              createdAt: response.data.data.details.createdAt,
            },
            isAuthenticated: true,
          }));

          // Store token and vendor details
          localStorage.setItem("token", token);
          localStorage.setItem(
            "vendorDetails",
            JSON.stringify(response.data.data.details)
          );

          // Set cookies
          document.cookie = `token=${token}; Secure; SameSite=Strict; max-age=${2 * 24 * 60 * 60
            }; path=/`;
          document.cookie = `email=${response.data.data.details.email
            }; Secure; SameSite=Strict; max-age=${2 * 24 * 60 * 60}; path=/`;

          return Promise.resolve();
        } else {
          return Promise.reject("Invalid password");
        }
      } catch (error: any) {
        return Promise.reject(
          error?.response?.data?.message || "Password verification failed"
        );
      }
    },

    updateVendorProfile: async (data) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      try {
        set({ isUpdateProfileLoading: true });
        const formData = new FormData();

        // Append all fields
        Object.entries(data).forEach(([key, value]) => {
          if (value === undefined || value === null) return;

          if (typeof value === 'object' && !(value instanceof File)) {
            formData.append(key, JSON.stringify(value));
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              if (item instanceof File) {
                formData.append(`${key}[${index}]`, item);
              }
            });
            if (value.length > 0 && !(value[0] instanceof File)) {
              formData.append(key, JSON.stringify(value));
            }
          } else {
            formData.append(key, value);
          }
        });

        const response = await axiosInstance.put(
          "/supplier-user/profile/update",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.isSuccess) {
          if (response.data.data) {
            localStorage.setItem(
              "vendorDetails",
              JSON.stringify(response.data.data)
            );
          }
          return response.data.data;
        }
        throw new Error(response.data.message || "Failed to update profile");
      } catch (error) {
        console.error("Update error:", error);
        throw error;
      } finally {
        set({ isUpdateProfileLoading: false });
      }
    },

    isUpdateProfileLoading: false,
    setUpdateProfileLoading: (loading: boolean) =>
      set({ isUpdateProfileLoading: loading }),
  };
});

export default useInitAuthStore;
