import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const CheckoutSuccessPage = dynamic(
  () => import("@/app/components/productSourcing/pages/CheckoutSuccessPage"),
  {
    loading: () => (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-[#000051]" />
      </div>
    ),
  }
);

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-[#000051]" />
        </div>
      }
    >
      <CheckoutSuccessPage />
    </Suspense>
  );
}
