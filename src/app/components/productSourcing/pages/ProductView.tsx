"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  UserRound,
  ThumbsUp,
  Loader2,
} from "lucide-react";
import { ProductType, ProductVariant, CartVariant } from "@/app/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useCartQuery from "@/lib/customHooks/useCartQuery";
import { useProductReviewsQuery } from "@/lib/customHooks/useProductReviewsQuery";
import RelatedProducts from "./RelatedProducts";
import Footer from "../../ui/Footer";
import ntc from "ntcjs";

// Helper function to convert ProductVariant to CartVariant
const convertToCartVariant = (
  variant: ProductVariant | null
): CartVariant | undefined => {
  if (!variant) return undefined;

  return {
    _id: variant._id,
    name: variant.name,
    type: variant.type,
    // Convert variantPrice from string to number if needed
    variantPrice:
      typeof variant.variantPrice === "string"
        ? parseFloat(variant.variantPrice)
        : variant.variantPrice,
    // Same for variantStock if needed
    variantStock:
      typeof variant.variantStock === "string"
        ? parseInt(variant.variantStock, 10)
        : variant.variantStock,
    variantImage: variant.variantImage,
    properties: variant.properties,
    applyDiscount: variant.applyDiscount,
  };
};

// Helper function to get unique sizes from variants
const getUniqueSizes = (variants: ProductVariant[] | undefined): string[] => {
  if (!variants || variants.length === 0) return [];

  const sizes =
    variants.flatMap((variant) =>
      variant.properties
        .filter((prop) => prop.key.toLowerCase() === "size")
        .map((prop) => prop.value)
    ) || [];
  return [...new Set(sizes)];
};

// Helper function to check if variants have colors
const hasColor = (variants: ProductVariant[] | undefined): boolean => {
  if (!variants || variants.length === 0) return false;

  return variants.some((variant) =>
    variant.properties.some((prop) => prop.key.toLowerCase() === "color")
  );
};

const formatColorName = (color: string) => {
  const colorMatch = ntc.name(color);
  if (colorMatch[1]) {
    return colorMatch[1]
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return color;
};

// Helper function to check if variants have sizes
const hasSize = (variants: ProductVariant[] | undefined): boolean => {
  if (!variants || variants.length === 0) return false;

  return variants.some((variant) =>
    variant.properties.some((prop) => prop.key.toLowerCase() === "size")
  );
};

// Interface for component props
interface ProductViewProps {
  product: ProductType;
}

const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  // State for selected image
  const [selectedImage, setSelectedImage] = useState<number>(0);

  // State for product quantity
  const [quantity, setQuantity] = useState<number>(1);

  // State for selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  // State for selected size
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Router for navigation
  const router = useRouter();

  // Use our custom hooks
  const { addToCart, isAddingToCart, cartItems } = useCartQuery();

  const { reviews, isProductReviewsLoading, averageRating, reviewCount } =
    useProductReviewsQuery(product?._id);

  // Enhanced function to check if a product or variant is in cart
  const isProductInCart = (): boolean => {
    if (!cartItems || cartItems.length === 0) return false;

    return cartItems.some((item) => {
      // Base product check (no variant selected)
      if (!selectedVariant) {
        return (
          item.product._id === product._id &&
          // Ensure the cart item also has no variant
          !item.selectedVariant
        );
      }

      // Specific variant check
      if (item.product._id === product._id) {
        // If cart item has variant as object
        if (item.selectedVariant && typeof item.selectedVariant === "object") {
          return item.selectedVariant._id === selectedVariant._id;
        }

        // If cart item has variant as string ID
        if (item.selectedVariant && typeof item.selectedVariant === "string") {
          return item.selectedVariant === selectedVariant._id;
        }
      }

      return false;
    });
  };

  // Handle size selection
  const handleSizeSelect = (size: string): void => {
    setSelectedSize(size);

    // Don't change the variant or image when selecting a size
    // Just update the size selection
  };

  // Handle quantity increment
  const incrementQuantity = (): void => {
    setQuantity(quantity + 1);
  };

  // Handle quantity decrement
  const decrementQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle add to cart
  const handleAddToCart = async (): Promise<void> => {
    try {
      if (!product) {
        throw new Error("Product not found");
      }

      // Convert ProductVariant to CartVariant
      const cartVariant = convertToCartVariant(selectedVariant);

      await addToCart({
        product: product._id,
        quantity,
        selectedVariant: cartVariant,
      });

      // toast.success("Product added to cart successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add to cart";
      toast.error(errorMessage);
    }
  };

  // Handle checkout
  const handleCheckout = async (): Promise<void> => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      toast.info("Please login to order your items");
      const returnUrl = `/checkout?productId=${
        product._id
      }&quantity=${quantity}${
        product.packSize
          ? `&packSize=${encodeURIComponent(product.packSize)}`
          : ""
      }`;
      router.push(`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }

    try {
      await handleAddToCart();
      router.push("/checkout");
    } catch (error) {
      console.error("Failed to proceed to checkout:", error);
    }
  };

  // Get available sizes from product variants
  const availableSizes = getUniqueSizes(product.variants);

  // Check if product has color variants
  const showColor = hasColor(product.variants);

  // Check if product has size variants
  const showSize = hasSize(product.variants);

  // Determine if product is in cart (for button state)
  const productInCart = isProductInCart();

  return (
    <>
      <div className="md:max-w-[95%] mx-auto md:p-4">
        {/* Back Navigation */}
        <div className="flex items-center mb-4 py-4 px-6 mt-2 bg-[#000051]">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-8 h-8 mr-1 text-white" />
          </button>
          <h1 className="text-white mx-auto">View Products</h1>
        </div>

        <div className="grid grid-cols-1 p-4 sm:p-0 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/5 today-deal order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[20rem] lg:max-h-[350px] xl:max-h-[28rem] 2xl:max-h-[559px]">
                {/* Default image thumbnail */}
                <button
                  onClick={() => {
                    setSelectedVariant(null);
                    setSelectedImage(0);
                  }}
                  className={cn(
                    "flex-shrink-0 rounded-lg shadow-md border p-2",
                    !selectedVariant
                      ? "border-2 border-blue-500"
                      : "border border-gray-200"
                  )}
                >
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    width={100}
                    height={100}
                    layout="responsive"
                    alt={`Thumbnail ${product.name}`}
                    className="w-full h-full object-contain"
                  />
                </button>

                {/* Variant thumbnails */}
                {product.variants?.map((variant, index) => (
                  <button
                    key={variant._id || index}
                    onClick={() => {
                      setSelectedVariant(() => variant);
                    }}
                    className={cn(
                      "flex-shrink-0 rounded-lg shadow-md border p-2",
                      selectedVariant?._id === variant._id
                        ? "border-2 border-blue-500"
                        : "border border-gray-200"
                    )}
                  >
                    <Image
                      src={variant.variantImage || "/placeholder.svg"}
                      width={100}
                      height={100}
                      layout="responsive"
                      alt={`Variant ${variant.name}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Main large image - On right */}
              <div className="md:w-4/5 order-1 md:order-2">
                <div className="shadow-md border border-[#E2E3EC] rounded-lg p-2">
                  <Image
                    layout="responsive"
                    width={1}
                    height={1}
                    src={
                      selectedVariant?.variantImage ||
                      product.images[selectedImage] ||
                      "/placeholder.svg"
                    }
                    alt={product.name}
                    className="w-full object-contain aspect-square rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Product title and price */}
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-baseline gap-2 mb-4">
              <p className="text-xl font-bold">
                {product.currentPrice?.toLocaleString() ||
                  product.price?.toLocaleString()}{" "}
                NGN
              </p>
              {product.discount && product.discount.discountValue > 0 && (
                <p className="text-sm text-gray-500 line-through">
                  {product.price?.toLocaleString()} NGN
                </p>
              )}
            </div>

            {/* Pack size info */}
            {product.packSize && (
              <p className="text-sm text-gray-600 mb-4">
                Pack Size: {product.packSize}
                {product.packQuantity && ` (${product.packQuantity} units)`}
              </p>
            )}

            {/* Product description */}
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Product ratings */}
            <div className="flex items-center mb-6">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill={i < (averageRating || 0) ? "#E55420" : "none"}
                    color="#E55420"
                  />
                ))}
              <span className="ml-2 text-sm text-gray-600">
                {averageRating ? averageRating.toFixed(1) : "0.0"} |{" "}
                {reviewCount || reviews.length} Reviews | {product.sold || 0}{" "}
                sold
              </span>
            </div>

            {/* Color selection */}
            {showColor && (
              <div className="mb-6">
                <h2 className="font-bold mb-2">
                  Color:{" "}
                  <span className="font-normal">
                    {selectedVariant?.properties.find(
                      (p) => p.key.toLowerCase() === "color"
                    )?.value
                      ? formatColorName(
                          selectedVariant.properties.find(
                            (p) => p.key.toLowerCase() === "color"
                          )?.value || ""
                        )
                      : " "}
                  </span>
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.variants
                    ?.filter((v) =>
                      v.properties.some((p) => p.key.toLowerCase() === "color")
                    )
                    .map((variant, index) => {
                      const colorProp = variant.properties.find(
                        (p) => p.key.toLowerCase() === "color"
                      );
                      return (
                        <div
                          key={variant._id || index}
                          style={{
                            backgroundColor: colorProp?.value || "gray",
                          }}
                          className={cn(
                            "w-10 h-10 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200",
                            selectedVariant?._id === variant._id &&
                              "ring-2 ring-blue-500 ring-offset-2"
                          )}
                          onClick={() => {
                            // Just update the selected variant, don't change size
                            setSelectedVariant(variant);
                          }}
                        />
                      );
                    })}
                </div>
              </div>
            )}

            {/* Size selection */}
            {showSize && (
              <div className="mb-6">
                <h2 className="font-bold mb-2">
                  Size:{" "}
                  <span className="font-normal">
                    {selectedSize || "Select a size"}
                  </span>
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableSizes.map((size, index) => (
                    <div
                      key={index}
                      className={cn(
                        "py-1 px-3 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200",
                        selectedSize === size && "bg-blue-100 border-blue-500"
                      )}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mb-6">
              <h2 className="font-bold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button
                  className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 mx-2 text-center">{quantity}</span>
                <button
                  className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md"
                  onClick={incrementQuantity}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                className="flex-1 h-16 border-none bg-[#000051] text-white hover:bg-[#000051]/80 hover:text-white rounded-xl"
                onClick={handleAddToCart}
                disabled={isAddingToCart || productInCart}
              >
                {isAddingToCart ? (
                  <div className="flex items-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Adding to cart...
                  </div>
                ) : productInCart ? (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" /> In Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to cart
                  </>
                )}
              </Button>
              <Button
                className="flex-1 h-16 bg-[#E55420] text-white hover:bg-[#E55420]/80 rounded-xl"
                onClick={handleCheckout}
                disabled={isAddingToCart}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 p-4 sm:p-0">
          <h2 className="text-2xl font-bold mb-4">
            Customer Reviews ({reviewCount || reviews.length})
          </h2>
          <div className="border-t border-gray-200 pt-4">
            {isProductReviewsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={review._id || index}
                  className="flex justify-between py-4 border-b border-gray-200"
                >
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      <UserRound className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {review.user?.name || "Anonymous"}
                        <span className="text-gray-500 text-sm ml-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </h4>
                      <p className="text-gray-700 mt-1">{review.comment}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex justify-end">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4"
                            fill={i < (review.rating || 0) ? "#E55420" : "none"}
                            color="#E55420"
                          />
                        ))}
                    </div>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      Verified Purchase
                    </p>
                    <button className="flex items-center text-sm text-gray-500 mt-2">
                      <ThumbsUp className="w-4 h-4 mr-1" /> Helpful (0)
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-gray-500">
                No reviews yet for this product.
              </p>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProducts
          productId={product._id}
          categoryId={
            product.categories && product.categories.length > 0
              ? product.categories[0]
              : undefined
          }
        />
      </div>
      <Footer />
    </>
  );
};

export default ProductView;
