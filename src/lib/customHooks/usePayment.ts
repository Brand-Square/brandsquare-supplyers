import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuthToken } from "@/lib/cookiesUtils";
import { DeliveryAddress, PaymentInitResponse, PaymentVerificationResponse, ApiError } from "@/app/types/types";


const API_BASE_URL = "https://api.brandsquare.store/api";


export const usePayment = () => {
    // Initialize payment mutation
    const initializePayment = useMutation<PaymentInitResponse, Error, DeliveryAddress>({
        mutationFn: async (deliveryAddress: DeliveryAddress) => {
            const token = getAuthToken();

            if (!token) {
                throw new Error("Please login to proceed with payment");
            };

            const payload = {
              deliveryDetail: {
                street: deliveryAddress.street,
                city: deliveryAddress.city,
                state: deliveryAddress.state,
                zipCode: deliveryAddress.zipCode || "000000",
                country: deliveryAddress.country,
                recipientFirstName: deliveryAddress.recipientFirstName,
                recipientLastName: deliveryAddress.recipientLastName,
                recipientPhone: deliveryAddress.recipientPhone,
                recipientAnotherPhone: deliveryAddress.recipientAnotherPhone,
                deliveryType: deliveryAddress.deliveryType,
              },
              saveAddress: deliveryAddress.saveAddress || false,
            };

            try {
                const response = await axios.post<PaymentInitResponse>(
                    `${API_BASE_URL}/payment/initiate`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.data?.isSuccess) {
                    throw new Error(response.data?.message || "Payment initialization failed");
                };

                toast.success("Payment initialized successfully");
                return response.data;
            } catch (error) {
                const typedError = error as ApiError;
                const errorMessage = typedError.response?.data?.message || typedError.message || "Failed to initiate payment";
                throw new Error(errorMessage);
            }
        },
        onError: (error) => {
            toast.error(error.message || "Failed to initiate payment");
        }
    });


    // Verify payment mutation
    const verifyPayment = useMutation<PaymentVerificationResponse, Error, string>({
        mutationFn: async (transactionId: string) => {
            const token = getAuthToken();

            if (!token) {
                throw new Error("Please login to verify payment");
            };

            try {
                const response = await axios.get<PaymentVerificationResponse>(
                    `${API_BASE_URL}/payment/verify/${transactionId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.data?.isSuccess) {
                    throw new Error(response.data?.message || "Payment verification failed");
                };

                toast.success("Payment verified successfully");
                return response.data;
            } catch (error) {
                const typedError = error as ApiError;
                const errorMessage = typedError.response?.data?.message || typedError.message || "Failed to verify payment";
                throw new Error(errorMessage);
            }
        },
        onError: (error) => {
            toast.error(error.message || "Failed to verify payment");
        }
    });

    return {
      initiatePayment: initializePayment.mutateAsync,
      verifyPayment: verifyPayment.mutateAsync,
      isInitiatingPayment: initializePayment.isPending,
      isVerifyingPayment: verifyPayment.isPending,
      paymentError: initializePayment.error || verifyPayment.error,
    };
}