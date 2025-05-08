"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { getAuthToken } from "@/lib/cookiesUtils";
import { usePayment } from "@/lib/customHooks/usePayment";
import { DeliveryAddress } from "@/app/types/types";
import useCartQuery from "@/lib/customHooks/useCartQuery";
import Link from "next/link";
import Toast from "@/app/components/ui/ToastContainer";

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"customer" | "delivery">(
    "customer"
  );
  const [deliveryType, setDeliveryType] = useState<"pickup" | "door" | null>(
    null
  );
  const [isAddressValidating, setIsAddressValidating] = useState(false);

  // Custom hooks
  const { initiatePayment, verifyPayment, isInitiatingPayment } = usePayment();
  const { cartItems, isCartLoading, refetchCart } = useCartQuery();

  // Address form state
  const [address, setAddress] = useState<Omit<DeliveryAddress, "deliveryType">>(
    {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Nigeria",
      recipientFirstName: "",
      recipientLastName: "",
      recipientPhone: "",
      recipientAnotherPhone: "",
      saveAddress: false,
    }
  );

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Verify payment if redirected from payment gateway
  useEffect(() => {
    const verifyPaymentFromUrl = async () => {
      const reference = searchParams.get("reference");
      const trxref = searchParams.get("trxref");
      const transactionId = reference || trxref;

      if (transactionId) {
        try {
          console.log("Verifying payment with transaction ID:", transactionId);
          const verificationResponse = await verifyPayment(transactionId);
          console.log("Verification response:", verificationResponse);

          if (verificationResponse?.isSuccess) {
            // Include orderId in redirect if available
            const orderId = verificationResponse.data?._id;
            router.push(
              orderId
                ? `/checkout/success?orderId=${orderId}`
                : "/checkout/success"
            );
          } else {
            toast.error(
              verificationResponse?.message || "Payment verification failed"
            );
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message || "Error verifying payment");
          }
        }
      }
    };

    if (isMounted) {
      verifyPaymentFromUrl();
    }
  }, [searchParams, verifyPayment, router, isMounted]);

  // Calculate delivery fee based on delivery type
  const calculateDeliveryFee = (): number => {
    return deliveryType === "pickup"
      ? 4000
      : deliveryType === "door"
      ? 15000
      : 0;
  };

  // Calculate subtotal from cart items
  const calculateSubtotal = (): number => {
    return cartItems.reduce((acc, item) => acc + (item.total || 0), 0);
  };

  // Calculate total price including delivery fee
  const calculateTotal = (): number => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  // Handle delivery type change
  const handleDeliveryChange = (type: "pickup" | "door") => {
    if (deliveryType === type) {
      setDeliveryType(null);
    } else {
      setDeliveryType(type);
    }
  };

  // Handle address form submission
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddressValidating(true);

    // Basic validation for required fields
    if (
      !address.recipientFirstName ||
      !address.recipientLastName ||
      !address.recipientPhone ||
      !address.street ||
      !address.city ||
      !address.state
    ) {
      toast.error("Please fill in all required fields");
      setIsAddressValidating(false);
      return;
    }

    // Phone number validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(address.recipientPhone)) {
      toast.error("Please enter a valid phone number");
      setIsAddressValidating(false);
      return;
    }

    setIsAddressValidating(false);
    setActiveTab("delivery");
  };

  // Handle checkout submission
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    const token = getAuthToken();
    if (!token) {
      toast.info("Please login to proceed with checkout");
      // Improved return URL structure for better user flow
      const returnUrl = encodeURIComponent("/checkout");
      localStorage.setItem("redirectAfterLogin", "/checkout");
      router.push(`/auth/login?returnUrl=${returnUrl}`);
      return;
    }

    // Validate delivery type selection
    if (!deliveryType) {
      toast.error("Please select a delivery method");
      return;
    }

    try {
      // Prepare delivery address for payment
      const deliveryAddress: DeliveryAddress = {
        ...address,
        deliveryType: deliveryType || "door",
      };

      // Initiate payment
      const paymentResponse = await initiatePayment(deliveryAddress);

      console.log("Payment Response:", paymentResponse);

      // Updated API response structure check to handle multiple possible formats
      const authorizationUrl =
        paymentResponse?.data?.authorization?.authorizationUrl ||
        paymentResponse?.data?.data?.authorization_url;

      console.log("Authorization URL:", authorizationUrl);

      // Redirect to payment gateway if authorization URL is provided
      if (authorizationUrl) {
        window.location.href = authorizationUrl;
      } else {
        toast.success("Order placed successfully!");
        refetchCart();
        router.push("/checkout/success");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Checkout failed");
      }
      console.error("Checkout error:", error);
    }
  };

  // Check if cart is empty
  const isCartEmpty = !cartItems || cartItems.length === 0;

  // Loading state when data is being fetched
  if (!isMounted || isCartLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-[#000051]" />
      </div>
    );
  }

  // Empty cart state
  if (isCartEmpty) {
    return (
      <div className="text-center py-16 h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-6">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven&apos;t added any products to your cart yet.
        </p>
        <Link href="/product-sourcing">
          <Button className="bg-[#000051] hover:bg-[#000051]/80 text-white transition-colors">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-16">
      <Toast />

      {/* Header */}
      <div className="flex items-center mb-4 py-4 px-6 mt-2 bg-[#000051] rounded-lg">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center text-white"
        >
          <ArrowLeft className="h-8 w-8 mr-1" />
        </button>
        <h1 className="text-2xl md:text-3xl text-white mx-auto font-bold">
          Checkout
        </h1>
      </div>

      {/* Minimum Checkout Notice */}
      <div className="px-4 md:px-20 shadow-md p-4 bg-white rounded-lg mt-2 mb-4">
        <h5 className="font-bold">Minimum checkout- ₦25,000</h5>
        <p className="text-[#000051]">
          Delivery fees would be added at checkout once your delivery address is
          recorded
        </p>
      </div>

      {/* Tabs */}
      <div className="p-4 flex gap-4 border-b mb-4">
        <button
          className={`${
            activeTab === "customer"
              ? "font-bold underline text-[#000051]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("customer")}
        >
          Customer Address
        </button>
        <button
          className={`${
            activeTab === "delivery"
              ? "font-bold underline text-[#000051]"
              : "text-gray-500"
          }`}
          onClick={() => {
            if (
              !isAddressValidating &&
              Object.values(address).some(
                (value) => value !== "" && value !== false
              )
            ) {
              setActiveTab("delivery");
            }
          }}
        >
          Delivery Details
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="p-4">
            <div className="text-white text-lg bg-[#000051] text-center p-4 rounded-t-lg font-semibold">
              {activeTab === "customer"
                ? "Customer Address"
                : "Delivery Details"}
            </div>

            {/* Customer Address Form */}
            {activeTab === "customer" && (
              <form
                onSubmit={handleAddressSubmit}
                className="space-y-4 p-4 shadow-lg border-x border-b rounded-b-md"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name *
                    </label>
                    <Input
                      required
                      value={address.recipientFirstName}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          recipientFirstName: e.target.value,
                        })
                      }
                      placeholder="Enter your First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name *
                    </label>
                    <Input
                      required
                      value={address.recipientLastName}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          recipientLastName: e.target.value,
                        })
                      }
                      placeholder="Enter your Last Name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number *
                    </label>
                    <Input
                      required
                      type="tel"
                      value={address.recipientPhone}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          recipientPhone: e.target.value,
                        })
                      }
                      placeholder="Enter your Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Additional Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={address.recipientAnotherPhone || ""}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          recipientAnotherPhone: e.target.value,
                        })
                      }
                      placeholder="Enter additional Phone Number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Street Address *
                  </label>
                  <Input
                    required
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    placeholder="Enter your street address"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City *
                    </label>
                    <Input
                      required
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State *
                    </label>
                    <Input
                      required
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      placeholder="Enter state"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Zip/Postal Code
                    </label>
                    <Input
                      value={address.zipCode || ""}
                      onChange={(e) =>
                        setAddress({ ...address, zipCode: e.target.value })
                      }
                      placeholder="Enter your zip/postal code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <Input
                      disabled
                      value={address.country}
                      onChange={(e) =>
                        setAddress({ ...address, country: e.target.value })
                      }
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveAddress"
                    className="mr-2"
                    checked={address.saveAddress || false}
                    onChange={(e) =>
                      setAddress({ ...address, saveAddress: e.target.checked })
                    }
                  />
                  <label htmlFor="saveAddress" className="text-sm">
                    Save this address for future orders
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#000051] text-white mt-4 py-6"
                  disabled={isAddressValidating}
                >
                  {isAddressValidating ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    "Proceed"
                  )}
                </Button>
              </form>
            )}

            {/* Delivery Details */}
            {activeTab === "delivery" && (
              <div className="p-4 shadow-lg border-x border-b rounded-b-md">
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Select Delivery Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={deliveryType === "pickup"}
                        onChange={() => handleDeliveryChange("pickup")}
                        className="h-4 w-4"
                      />
                      <div>
                        <p className="font-medium">Pickup Station</p>
                        <p className="text-sm text-gray-500">Price: ₦4,000</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={deliveryType === "door"}
                        onChange={() => handleDeliveryChange("door")}
                        className="h-4 w-4"
                      />
                      <div>
                        <p className="font-medium">Door Delivery</p>
                        <p className="text-sm text-gray-500">Price: ₦15,000</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-white text-lg bg-[#000051] text-center p-4 rounded-t-lg font-semibold">
                    Order Summary
                  </div>
                  <div className="border-x border-b rounded-b-md shadow-md mb-6">
                    {deliveryType && (
                      <div className="px-4 py-3 border-b">
                        <h3 className="font-semibold">
                          {deliveryType === "pickup"
                            ? "Pickup Station"
                            : "Door Delivery"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Estimated delivery: 3-5 business days
                        </p>
                      </div>
                    )}

                    {/* Cart Items */}
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex gap-4 p-4 border-b">
                        <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              item.selectedVariant?.variantImage ||
                              (item.product.images &&
                              item.product.images.length > 0
                                ? item.product.images[0]
                                : "/placeholder.svg")
                            }
                            alt={item.product.name || "Product"}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">Vendor Store</p>
                          <div className="flex justify-between mt-2">
                            <span>Quantity: {item.quantity}</span>
                            <span className="font-semibold">
                              ₦{item.total?.toLocaleString() || "0"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-[#000051] hover:bg-[#000051]/80 text-white py-6 text-lg"
                    disabled={!deliveryType || isInitiatingPayment}
                  >
                    {isInitiatingPayment ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="p-6 rounded-lg h-fit">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="mb-4 bg-[#000051] text-white p-6">
                <h2 className="mx-auto text-xl md:text-2xl font-semibold text-center">
                  CART SUMMARY
                </h2>
              </div>

              <div className="bg-white px-6 py-8 shadow-lg">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-xl">Subtotal</span>
                  <span className="text-xl font-normal">
                    ₦{calculateSubtotal().toLocaleString()}
                  </span>
                </div>

                {activeTab === "customer" ? (
                  <p className="text-sm text-gray-500 mt-2">
                    Delivery fees will be calculated in the next step
                  </p>
                ) : (
                  <>
                    {deliveryType && (
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-700">Delivery Fee</span>
                        <span>₦{calculateDeliveryFee().toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-4 pt-4 border-t font-semibold">
                      <span className="text-xl">Total</span>
                      <span className="text-xl">
                        ₦{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {activeTab === "customer" ? (
              <Button
                onClick={handleAddressSubmit}
                className="w-full bg-[#000051] hover:bg-[#000051]/80 text-white mt-6 py-6 text-lg"
                disabled={isAddressValidating}
              >
                {isAddressValidating ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  "Proceed"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#000051] hover:bg-[#000051]/80 text-white mt-6 py-6 text-lg"
                disabled={!deliveryType || isInitiatingPayment}
              >
                {isInitiatingPayment ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
