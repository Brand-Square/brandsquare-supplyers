/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useCartQuery from "@/lib/customHooks/useCartQuery";
import { getAuthToken } from "@/lib/cookiesUtils";
import { CartItem } from "@/app/types/types";

const CartPage: React.FC = () => {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  // Use our custom cart hook
  const {
    cartItems,
    totalPrice,
    isCartLoading,
    updateCartQuantity,
    removeFromCart,
  } = useCartQuery();

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if user is logged in - safely for SSR
  const isLoggedIn = (): boolean => {
    if (!isMounted) return false;
    return !!getAuthToken();
  };

  // Fix image URLs when they have incorrect domain patterns
  const fixImageUrl = (url: string): string => {
    // For placeholder or relative URLs, return as is
    if (!url || url.startsWith("/")) {
      return url || "/placeholder.svg";
    }

    // Fix doubled domain in URL
    if (
      url.includes("api.brandsquare.store/api.brandsquare.store") ||
      url.includes("api.brandsquare.store/https://api.brandsquare.store")
    ) {
      // Extract the path after the doubled domain
      const parts = url.split("api.brandsquare.store");
      if (parts.length > 2) {
        return `https://api.brandsquare.store${parts[parts.length - 1]}`;
      }
    }

    return url;
  };

  // Type-safe function to get the image for a cart item
  const getItemImage = (item: CartItem): string => {
    // Case 1: When selectedVariant is an object with an image property
    if (
      item.selectedVariant &&
      typeof item.selectedVariant === "object" &&
      "variantImage" in item.selectedVariant &&
      item.selectedVariant.variantImage
    ) {
      return item.selectedVariant.variantImage;
    }

    // Case 2: When selectedVariant is a string ID but product might have variants array
    // Use type assertion to access the variants property that might exist at runtime
    if (
      item.selectedVariant &&
      typeof item.selectedVariant === "string" &&
      (item.product as any).variants &&
      Array.isArray((item.product as any).variants)
    ) {
      // Try to find the variant in the product's variants array
      const variant = (item.product as any).variants.find(
        (v: any) => v._id === item.selectedVariant
      );
      if (variant && variant.variantImage) {
        return variant.variantImage;
      }
    }

    // Case 3: If product has images, use the first one
    if (item.product.images && item.product.images.length > 0) {
      return item.product.images[0];
    }

    // If no images at all, use a placeholder
    return "/placeholder.svg";
  };

  // Type-safe helper function to check if a cart item has variants
  // const hasVariantDetails = (item: CartItem): boolean => {
  //   return !!item.selectedVariant && typeof item.selectedVariant === "object";
  // };

  // Helper function to safely access variant properties with type checking
  const getVariantProperties = (
    variant: any
  ): Array<{ key: string; value: string }> => {
    if (!variant || !variant.properties) return [];
    return variant.properties;
  };

  // Helper function to get variant details from runtime product data
  const getVariantFromProduct = (item: CartItem): any | null => {
    if (
      typeof item.selectedVariant === "string" &&
      (item.product as any).variants &&
      Array.isArray((item.product as any).variants)
    ) {
      return (item.product as any).variants.find(
        (v: any) => v._id === item.selectedVariant
      );
    }
    return null;
  };

  // Handle quantity change with item-specific loading indicator
  const handleQuantityChange = async (
    cartItemId: string,
    newQuantity: number
  ): Promise<void> => {
    if (newQuantity < 1) return;

    try {
      // Set this specific item as updating
      setUpdatingItemId(cartItemId);

      await updateCartQuantity({
        cartItemId,
        quantity: newQuantity,
      });

      // Success message handled by hook onSuccess callback
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Error message handled by hook onError callback
    } finally {
      // Clear the updating state
      setUpdatingItemId(null);
    }
  };

  // Handle item removal with item-specific loading indicator
  const handleDeleteItem = async (cartItemId: string): Promise<void> => {
    try {
      // Set this specific item as deleting
      setDeletingItemId(cartItemId);

      await removeFromCart(cartItemId);

      // Success message handled by hook onSuccess callback
    } catch (error) {
      console.error("Error removing item:", error);
      // Error message handled by hook onError callback
    } finally {
      // Clear the deleting state
      setDeletingItemId(null);
    }
  };

  // Handle checkout navigation
  const handleProceedToCheckout = (): void => {
    if (!isLoggedIn()) {
      // Save the intended route for redirection after login
      if (isMounted) {
        try {
          localStorage.setItem("redirectAfterLogin", "/product-sourcing/cart");
        } catch (error) {
          console.error("Error setting localStorage:", error);
        }
      }
      toast.info("Please login to proceed to checkout");
      setIsLoggingIn(true);
      router.push("/auth/login");
    } else {
      router.push("/checkout");
    }
  };

  // Calculate subtotal manually as a fallback
  const calculatedSubtotal = cartItems.reduce(
    (total, item) =>
      total +
      (item.total ??
        (item.product?.currentPrice ?? item.product?.price ?? 0) *
          (item.quantity ?? 1)),
    0
  );

  // Use the API-provided total or our calculated fallback
  const subtotal = totalPrice || calculatedSubtotal;

  // Show a simple loading state when rendering on the server or before mounting
  if (!isMounted) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }

  // Loading state
  if (isCartLoading || isLoggingIn) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  // Empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center py-16 h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-6">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven&apos;t added any products to your cart yet.
        </p>
        <Link href="/product-sourcing">
          <Button className="bg-theme-blue hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Cart Header */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-0 w-full bg-[#000051] p-6 rounded-lg">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center text-white"
          >
            <ArrowLeft className="h-8 w-8" />
          </button>
          <h1 className="text-2xl md:text-4xl text-white mx-auto font-bold">
            Cart <span>({cartItems.length})</span>
          </h1>
        </div>

        <div className="px-4 md:px-20 shadow-md p-4 bg-white rounded-lg mt-2">
          <h5 className="font-bold">Minimum checkout- ₦25,000</h5>
          <p className="text-[#000051]">
            Delivery fees would be added at checkout once your delivery address
            is recorded
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg mb-4 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-4 border-b-2 border-gray-200 shadow-lg p-4 md:p-6">
                {/* Product Image */}
                <div className="relative w-full md:w-80 h-64 md:h-80">
                  <Image
                    src={fixImageUrl(getItemImage(item))}
                    alt={item.product?.name || "Product image"}
                    fill
                    className="object-contain rounded"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>

                <div className="flex-1">
                  {/* Product Details */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">
                        {item.product?.name || "Product"}
                      </h3>
                      <p className="text-sm text-[#E55420] underline">
                        Vendor Store
                      </p>
                      {item.product?.stock !== undefined && (
                        <p className="text-xs text-[#E55420] underline">
                          {item.product.stock < 20
                            ? `ONLY ${item.product.stock} LEFT`
                            : "IN STOCK"}
                        </p>
                      )}
                    </div>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteItem(item._id)}
                      disabled={deletingItemId === item._id}
                    >
                      {deletingItemId === item._id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5 cursor-pointer" />
                      )}
                    </button>
                  </div>

                  {/* Variant and Quantity */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                    {/* Variant Details */}
                    <div className="mb-4 md:mb-0">
                      {item.selectedVariant && (
                        <div className="bg-gray-50 p-2 rounded-md">
                          {/* Handle object variants */}
                          {typeof item.selectedVariant === "object" && (
                            <>
                              <div className="font-medium mb-1">
                                Variant: {item.selectedVariant.name}
                              </div>
                              {item.selectedVariant.properties &&
                                item.selectedVariant.properties.length > 0 && (
                                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                    {getVariantProperties(
                                      item.selectedVariant
                                    ).map((prop, idx) => (
                                      <span
                                        key={idx}
                                        className="bg-gray-100 px-2 py-1 rounded"
                                      >
                                        {prop.key}: {prop.value}
                                      </span>
                                    ))}
                                  </div>
                                )}
                            </>
                          )}

                          {/* Handle string variant IDs with runtime variant data */}
                          {typeof item.selectedVariant === "string" && (
                            <>
                              {/* Try to find variant details at runtime */}
                              {getVariantFromProduct(item) ? (
                                <>
                                  {/* <div className="font-medium mb-1">
                                    Variant: {getVariantFromProduct(item).name}
                                  </div> */}
                                  {getVariantFromProduct(item).properties &&
                                    getVariantFromProduct(item).properties
                                      .length > 0 && (
                                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                        {getVariantProperties(
                                          getVariantFromProduct(item)
                                        ).map((prop, idx) => (
                                          <span
                                            key={idx}
                                            className="bg-gray-100 px-2 py-1 rounded"
                                          >
                                            {prop.key}: {prop.value}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                </>
                              ) : (
                                // If variant details not found, just show the ID
                                <div className="font-medium">
                                  {/* Variant ID:{" "}
                                  {item.selectedVariant.substring(0, 8)}... */}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex flex-col items-end">
                      <div className="flex flex-col md:items-end">
                        <span className="font-semibold text-xl md:text-3xl">
                          ₦
                          {item.total?.toLocaleString() ||
                            (
                              (item.product?.currentPrice ||
                                item.product?.price ||
                                0) * item.quantity
                            ).toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Adjuster */}
                      <div className="flex items-center gap-1 border border-[#E2E3EC] mt-4 rounded">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            item.quantity > 1 &&
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          disabled={
                            updatingItemId === item._id || item.quantity <= 1
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          disabled={updatingItemId === item._id}
                        >
                          {updatingItemId === item._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div>
          <div className="p-6 rounded-lg h-fit">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="mb-4 bg-[#000051] text-white p-6">
                <h2 className="mx-auto text-xl md:text-2xl font-semibold text-center">
                  CART SUMMARY
                </h2>
              </div>

              <div className="flex justify-between items-center font-semibold bg-white px-6 py-8 shadow-lg">
                <span className="text-xl md:text-2xl">Subtotal</span>
                <span className="text-xl md:text-2xl font-normal">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-[#000051] hover:bg-[#000080] text-white mt-6 text-xl md:text-2xl py-6 md:py-8"
              onClick={handleProceedToCheckout}
              disabled={isCartLoading || !cartItems.length}
            >
              {isCartLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                "Checkout"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
