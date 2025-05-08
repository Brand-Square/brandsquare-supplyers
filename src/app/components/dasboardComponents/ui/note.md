/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

enum API_URL {
  BASE = "http://api.brandsquare.store/api/auth",
  LOGIN = "/login",
  REGISTER = "/register/",
  VERIFY_EMAIL = "/verify-email",
  VERIFY_PHONE = "/verify-phone",
  RESEND_EMAIL_OTP = "/resend-email-otp",
  RESEND_PHONE_OTP = "/resend-phone-otp",
  FORGOT_PASSWORD = "/forgot-password",
  VERIRY_RECOVERY_CODE = "/enter-recovery-code",
  RESET_PASSWORD = "/reset-password",
}

export type User = {
  name: string;
  email: string;
  countryCode: string;
  createdAt: string;
  id: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  phoneNumber: string;
  role: string;
  updatedAt: string;
};

export interface AuthenticateUserStore {
  user: User | null;
  email: string;
  password: string;
  setUser: (user: User | null) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

type RecoveryState = "forgotPassword" | "recoveryCode" | "newPassword";

interface PasswordRecovery {
  passwordRecovery: RecoveryState;
  passwordUpdated: boolean;
  setPasswordUpdated: (passwordUpdated: boolean) => void;
  setPasswordRecovery: (passwordRecovery: RecoveryState) => void;
}

interface RegisterUser extends User {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
}
interface VerifyEmail {
  otpCode: string;
  email: string;
}

interface emailprop {
  email: string;
}
interface verifyOtp {
  otpCode: string;
  phoneNumber: string;
  countryCode: string;
}

interface RegisterCredentials {
  companyName: string,
  email: string,
  password: string,
}

interface AuthStore extends AuthenticateUserStore, PasswordRecovery {
  isLoading: boolean;
  error: any;
  isAuthenticated: boolean;
  countryCode: string;
  phoneNumber: string;
  register: (Credential: RegisterCredentials) => Promise<any>;
  verifyEmail: (verifyEmail: VerifyEmail) => Promise<any>;
  ResendEmailCode: (email: emailprop) => Promise<any>;
  ResendPhoneCode: (phone: {
    countryCode: string;
    phoneNumber: string;
  }) => Promise<any>;
  verifyOtp: (verifyOtp: verifyOtp) => Promise<any>;
  resetState: () => void;
  routeHandler: (router: AppRouterInstance) => void;
  loginUser: (router: AppRouterInstance) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  verifyPasswordRecoveryCode: (recoveryCode: number) => void;
  resendPasswordRecoveryCode: () => void;
  updatePassword: (password: string, router: AppRouterInstance) => void;
}

interface TooglerStore {
  expanded: boolean;
  modal: boolean;
  setExpanded: () => void;
  setModal: () => void;
}

const useInitAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  email: "",
  isLoading: false,
  error: null,
  isAuthenticated: false,
  countryCode: "",
  phoneNumber: "",
  // IMPORTED FROM AUTH STORE
  password: "",
  setUser: (user: User | null) => set((state) => ({ ...state, user: user })),
  setEmail: (email: string) => set((state) => ({ ...state, email: email })),
  setPassword: (password: string) =>
    set((state) => ({ ...state, password: password })),
  // IMPORT END

  resetState: () => {
    set({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });
  },
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: any) => {
    set({ error });
  },

  register: async (Credential: RegisterCredentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post<{ token: string; user: RegisterUser }>(
        `${API_URL.BASE + API_URL.REGISTER}`,
        Credential
      );
      console.log(response, "response init");
      // console.log(response.data.user, "response");
      set((state) => ({
        ...state,
        user: response.data.vendor,
        isAuthenticated: true,
        isLoading: false,
        email: response.data.user.email,
      }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const token = response.data.token;
      console.log(response.data.token, "token");
      console.log(response.data.user.email, "token");

      // STORING TOKEN IN COOKIE FOR SESSION PERSISTENCY OF 48 HOURS
      document.cookie = `token=${
        response.data.token
      }; Secure; SameSite=None; max-age=${2 * 24 * 60 * 60}`;

      return response.data;
    } catch (error: any) {

      toast.error(error.status === 400 ? "Email already in use" : error.message || "Registration failed");
      console.log(error);
       set({
        error: error.response.data.message || "Registration failed",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (verifyEmail: VerifyEmail) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL.BASE + API_URL.VERIFY_EMAIL}`,
        verifyEmail,
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      console.log(response, "verify");
      console.log(response.data, "uuujj");

      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
      console.log(error, "error0000000000");
      set({
        error: error.response.data.message || "Verification failed",
        isLoading: false,
      });
      throw error;
    }
  },
  ResendEmailCode: async (email: emailprop) => {
    // set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${API_URL.BASE + API_URL.RESEND_EMAIL_OTP}`,
        email,
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error resending code");
      set({
        error: error.response.data.message || "Error resending code",
        isLoading: false,
      });
      throw error;
    }
  },
  ResendPhoneCode: async (phone: {
    phoneNumber: string;
    countryCode: string;
  }) => {
    // set({ isLoading: true, error: null });
    set((state) => ({
      ...state,
      phoneNumber: phone.phoneNumber,
      countryCode: phone.countryCode,
    }));

    try {
      const response = await axios.post(
        `${API_URL.BASE + API_URL.RESEND_PHONE_OTP}`,
        phone,
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      set({
        isLoading: false,
      });
      toast.success("Code Resent");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error resending code");
      set({
        error: error.response.data.message || "Error resending code",
        isLoading: false,
      });
      throw error;
    }
  },
  verifyOtp: async (verifyOtp: verifyOtp) => {
    set({ isLoading: true, error: null });

    console.log(verifyOtp, "verifyOtp");
    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL.BASE + API_URL.VERIFY_PHONE}`,
        verifyOtp,
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );

      set({ isLoading: false });
      console.log(response.data, "resp99onse");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");

      set({
        error: error.response.data.message || "Verification failed",
        isLoading: false,
      });
      throw error;
    }
  },

  loginUser: async (router: AppRouterInstance) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const response = await axios.post<{
        token: string;
        user: User;
      }>(`${API_URL.BASE + API_URL.LOGIN}`, {
        email: get().email,
        password: get().password,
      });
      // CHECKING IF RESPONSE STATUS IS NOT 201
      if (!(response.status === 201)) {
        throw new Error("invalid credentials");
      }
      // STORING TOKEN IN COOKIE FOR SESSION PERSISTENCY OF 48 HOURS
      document.cookie = `token=${
        response.data.token
      }; Secure; SameSite=None; max-age=${2 * 24 * 60 * 60}`;
      // SUCCESS TOAST
      toast.success("login successful");
      // SETTING USER TO STATE
      set((state) => ({
        ...state,
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      }));
      setTimeout(() => {
        get().routeHandler(router);
      }, 1000);
    } catch (error: any) {
      toast.error("invalid credentials");
      console.log(error);
      set((state) => ({
        ...state,
        error: error.response?.data?.message || "invalid credentials",
        isLoading: false,
      }));
    }
  },
  routeHandler: (router: AppRouterInstance) => {
    if (get().user?.isEmailVerified && get().user?.isPhoneVerified) {
      switch (get().user?.role) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "SUPRE_ADMIN":
          router.push("/super-admin/dashboard");
          break;
        case "CLIENT":
          router.push("/dashboard");
          break;
        default:
          router.refresh();
      }
    } else if (!get().user?.isEmailVerified) {
      get().ResendEmailCode({ email: get().email });
      router.push("/auth/verify-email");
    } else if (!get().user?.isPhoneVerified && get().user) {
      get().ResendPhoneCode({
        phoneNumber: get().user?.phoneNumber || "",
        countryCode: get().user?.countryCode || "",
      });
      router.push("/auth/verify-number");
    } else {
      router.refresh();
    }
  },
  verifyPasswordRecoveryCode: async (recoveryCode: number) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const response = await axios.post<{
        status: number;
        message: string;
        token: string;
      }>(`${API_URL.BASE + API_URL.VERIRY_RECOVERY_CODE}`, {
        email: get().email,
        recoveryCode,
      });

      if (response.status === 201 && response.data.status === 200) {
        toast.success(response.data.message);
        document.cookie = `token=${
          response.data.token
        }; Secure; SameSite=None; max-age=${2 * 24 * 60 * 60}`;
        get().setPasswordRecovery("newPassword");
      } else throw new Error(response.data.message);
    } catch (error: any) {
      set((state) => ({ ...state, error: error.message }));
      toast.error(error.message);
    }
    set((state) => ({ ...state, isLoading: false }));
  },
  resendPasswordRecoveryCode: async () => {
    try {
      if (get().passwordRecovery !== "recoveryCode") {
        set((state) => ({ ...state, isLoading: true }));
      }
      const data = await axios.post<{ status: number; message: string }>(
        `${API_URL.BASE + API_URL.FORGOT_PASSWORD}`,
        { email: get().email }
      );
      if (!(data.status === 201) || !(data.data.status === 200)) {
        throw new Error(data.data.message);
      }
      toast.success(data.data.message);

      if (get().passwordRecovery !== "recoveryCode") {
        set((state) => ({
          ...state,
          passwordRecovery: "recoveryCode",
          error: null,
        }));
      } else {
        set((state) => ({ ...state, error: null }));
      }
    } catch (error: any) {
      set((state) => ({ ...state, error: error.message }));
      toast.error(error.message);
    }
    set((state) => ({ ...state, isLoading: false }));
  },
  // PASSWORD RESET
  passwordRecovery: "forgotPassword",
  passwordUpdated: false,
  setPasswordUpdated: (passwordUpdated: boolean) =>
    set((state) => ({ ...state, passwordUpdated: passwordUpdated })),
  setPasswordRecovery: (passwordRecovery: RecoveryState) =>
    set((state) => ({ ...state, passwordRecovery: passwordRecovery })),
  updatePassword: async (password: string, router: AppRouterInstance) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const response = await axios.post<{ status: number; message: string }>(
        `${API_URL.BASE + API_URL.RESET_PASSWORD}`,
        { confirmPassword: password, password },
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 && response.data.status === 200) {
        get().setPasswordUpdated(true);
        toast.success(response.data.message);
      } else throw new Error(response.data.message);
      setTimeout(() => {
        get().setPasswordUpdated(false);
        get().setPasswordRecovery("forgotPassword");
        router.push("/auth/login");
      }, 3000);
    } catch (error: any) {
      set((state) => ({ ...state, error: error.message }));
      toast.error(error.message);
    }
    set((state) => ({ ...state, isLoading: false }));
  },
}));

export const useToglerStore = create<TooglerStore>((set) => ({
  expanded: true,
  modal: false,
  setExpanded: () => set((state) => ({ ...state, expanded: !state.expanded })),
  setModal: () => set((state) => ({ ...state, modal: !state.modal })),
}));

export default useInitAuthStore;
