import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

export async function fetchVendorWallet() {
  try {
    const response = await axiosClient.get('/vendor-user/wallet/stats');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useVendorWalletStats() {
  return useQuery({
    queryKey: ['vendorWalletStats'],
    queryFn: fetchVendorWallet
  });
}