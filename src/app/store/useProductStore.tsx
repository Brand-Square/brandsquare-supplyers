// // /* eslint-disable @typescript-eslint/no-unused-vars */

// const newProduct = {
//   name: "",
//   description: "",
//   price: null,
//   packSize: "",
//   discount: 0,
//   minimumStock: null,
//   categories: [],
//   quantity: [],
//   images: [],

//   variantTypes: [
//     {
//       id: "",
//       name: "",
//       values: [],
//     },
//   ],
// };

// import { create } from "zustand";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import {
//   ProductData,
//   CategoryFormData,
//   ApiResponse,
//   ProductStore,
//   CategoryResponse,
//   ProductResponse,
//   ProductType,
//   CategoryType,
// } from "../types/types";
// import { Product } from "../dashboard/products/add-product/product.type";

// // API URLs as constants
// const API_URLS = {
//   BASE: "https://api.brandsquare.store/api",
//   CATEGORIES: "/categories/",
//   PRODUCTS: "/products/",
// } as const;

// export const product: Product = {
//   name: "",
//   description: "",
//   categories: [],
//   discount: {
//     discountType: "",
//     discountValue: "",
//     strikeOriginalPrice: false,
//   },
//   price: "",
//   variants: [],
//   availability: "",
//   packSize: "",
//   packQuantity: "",
//   stock: "",
//   mininumStock: "",
//   setOutOfStockAtMinimum: false,
//   images: [],
//   variantImages: [],
// };

// const useProductStore = create<ProductStore>((set) => ({
//   productData: product,
//   resetState: () => set({ isLoading: false, error: null }),
//   products: [],
// }));

// export default useProductStore;
