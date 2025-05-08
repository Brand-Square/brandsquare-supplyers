"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Toast from "@/app/components/ui/ToastContainer";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const orderIdParam = searchParams.get("orderId");
    if (orderIdParam) {
      setOrderId(orderIdParam);
      console.log("Order ID:", orderIdParam);
    }
  }, [searchParams]);

  const handleTrackOrder = () => {
    if (!orderId) {
      toast.error("Order ID not found");
      router.push("/product-sourcing");
      return;
    }
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="w-full flex items-center justify-center px-4 py-12">
      <Toast />
      <div className="relative w-max mx-auto text-center p-24 rounded-2xl">
        <div
          className="absolute inset-0 rounded-2xl p-[20px] "
          style={{
            background: "linear-gradient(to bottom, #B1E1C5 0%, #FFFFFF 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        ></div>

        <div className="relative z-10">
          <div className="mb-4 flex justify-center items-center">
            <Image
              width={500}
              height={800}
              alt="Order confirmed"
              src="/assets/svg/Device.svg"
              className="w-full max-w-[300px]"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#00510C] mb-4">
            Checkout Successful!
          </h1>

          <p className="text-[#3C3E3C] mb-6 text-md">
            Your order has been placed successfully. Check your order history to
            track the status of your delivery.
          </p>

          <div className="flex flex-col items-center justify-center">
            <Button
              onClick={handleTrackOrder}
              className="bg-[#000051] hover:bg-[#000070] text-white px-8 py-6 text-lg w-max"
            >
              Track Order
              <ChevronRight className="w-4 h-8 ml-1" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
