"use client";
import { useState } from "react";
import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { Globe, UserRound } from "lucide-react";
import { SupportModals } from "../../../../components/modals/SupportModals";
import { StatsCard } from "../../../../components/ui/StatsCard";
import PaymentIcon from "../../../../../public/assets/icons/paymentIcon";
import { useRouter } from "next/navigation";
import { OrdersTable } from "./index";

const OrdersPage = () => {
  const router = useRouter();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const handleReportIssue = () => {
    setShowContactModal(true);
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <PrimaryHeading text="Support" />
          <SectionSubtitle text="See support materials and get all the help you need" />
        </div>

        <div className="mt-4">
          <div className="flex flex-col md:flex-row md:gap-4 gap-1">
            <button
              className="bg-white text-[rgba(0,0,81,1)] rounded-md py-2 px-4 flex items-center w-max"
              onClick={() => router.push("/dashboard/support")}
            >
              <UserRound size={16} className="mr-2" />
              Go back to support center
            </button>
            <button
              className="bg-[#000842] text-white rounded-md py-2 px-4 flex items-center justify-center w-48"
              onClick={handleReportIssue}
            >
              <Globe size={16} className="mr-2" />
              Report an issue
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 md:flex-row  ">
        <StatsCard
          icon={<PaymentIcon />}
          title="All time tickets"
          percentageValue="13"
          value="0"
          info="Total tickets on this dashboard"
        />
        <StatsCard
          icon={<PaymentIcon />}
          title="Pending tickets"
          percentageValue="13"
          value="0"
          info="These tickets need attention"
        />
        <StatsCard
          icon={<PaymentIcon />}
          title="Completed tickets"
          percentageValue="13"
          value="0"
          info="Compared to last month"
        />
      </div>
      <div className="mt-5">
        <OrdersTable />
      </div>

      <SupportModals
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
        showTicketModal={showTicketModal}
        setShowTicketModal={setShowTicketModal}
      />
    </div>
  );
};
export default OrdersPage;
