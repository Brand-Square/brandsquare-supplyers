import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

interface CategoriesResponse {
  data: { categories: Category[] };
}

export function useGetCategories(limit?: number) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosClient<CategoriesResponse>(
        `/categories/?limit=${limit ?? 10}`
      );
      return data;
    },
    staleTime: Infinity,
  });
}
