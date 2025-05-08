import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const CheckoutPageContent = dynamic(
  () => import("@/app/components/productSourcing/pages/CheckoutPage"),
  {
    loading: () => (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-[#000051]" />
      </div>
    ),
  }
);

function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-[#000051]" />
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}

export default CheckoutPage;
