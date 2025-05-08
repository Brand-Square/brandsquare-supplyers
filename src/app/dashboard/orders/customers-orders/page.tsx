import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { StatCards } from "./StatCards";
import { Orders } from "./Orders";

const CustomersOrdersPage = () => {
  return (
    <div>
      <PrimaryHeading text="Customers’ Orders" />
      <SectionSubtitle text="Track orders for your customers here" />
      <div className="mt-4">
        <StatCards />
      </div>
      <div className="mt-5">
        <Orders />
      </div>
    </div>
  );
};
export default CustomersOrdersPage;
