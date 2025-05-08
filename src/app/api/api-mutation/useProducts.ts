import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { toast } from "sonner";
import { Product } from "@/app/dashboard/products/add-product/product.type";

// Update product
const updateProduct = async ({
  id,
  formData,
}: {
  id: string;
  formData: Product;
}) => {
  const response = await axiosClient.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export function useEditProduct(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["single-product", id] });
      queryClient.invalidateQueries({ queryKey: ["Vendor-products"] });
      toast.success("Success", {
        description: "Product updated successfully",
      });
      // router.push("/products");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error("Error", {
        description: "Failed to update product. Please try again.",
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await axiosClient.delete(`/products/${productId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidates the products query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["Vendor-products"] });
      toast.success("Product deleted");
    },
    onError: (error: Error) => {
      const message = "Failed to delete product. Please try again";
      toast.error(message);
      console.log("Error deleting product here:", error);
    },
  });
}
