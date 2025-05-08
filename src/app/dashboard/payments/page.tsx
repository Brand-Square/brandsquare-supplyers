import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { StatCards } from "./StatCards";
import { AllPayments } from "./AllPayments";

const PaymentPage = () => {
  return (
    <div>
      <PrimaryHeading text="Payments" />
      <SectionSubtitle text="Manage your transactions from here" />
      <div className="mt-4">
        <StatCards />
      </div>
      <div className="mt-4">
        <AllPayments />
      </div>
    </div>
  );
};
export default PaymentPage;
