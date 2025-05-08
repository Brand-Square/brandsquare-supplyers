import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { Product } from "@/app/dashboard/products/add-product/product.type";

type ResponseVendorProduct = {
  data: {
    allProducts: Product[];
    limit: number;
    page: number;
    totalPages: number;
    totalProducts: number;
  };
};

type APIResponseSingleProduct = {
  data: Product[];
};

async function fetchProducts() {
  // queryString: string,
  // productType: ProductFilterType
  const { data } = await axiosClient(`/products/my-products`);

  return data;
}

export function useGetVendorProducts() {
  // Gets state from Zustand store
  // const {
  //   page,
  //   limit,
  //   productType,
  //   search,
  //   maxPrice,
  //   sortBy,
  //   category,
  //   minPrice,
  // } = useProductsStore();

  // const params: Record<string, string> = {
  //   page: page.toString(),
  //   limit: limit.toString(),
  //   sortBy,
  // };

  // if (search) params.search = search;
  // if (maxPrice) params.maxPrice = maxPrice;
  // if (minPrice) params.minPrice = minPrice;

  // if (category) {
  //   params.category = category;
  // }

  // const queryString = new URLSearchParams(params).toString();

  return useQuery<ResponseVendorProduct>({
    queryKey: [
      "Vendor-products",
      // {
      //   page,
      //   search,
      //   maxPrice,
      //   minPrice,
      //   sortBy,
      //   limit,
      //   category,
      //   productType,
      // },
    ],
    queryFn: () => fetchProducts(),
  });
}

async function fetchProduct(id: string) {
  try {
    const { data } = await axiosClient.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useGetSingleProduct(id: string) {
  return useQuery<APIResponseSingleProduct>({
    queryKey: ["single-product", { id }],
    queryFn: () => fetchProduct(id),
  });
}
