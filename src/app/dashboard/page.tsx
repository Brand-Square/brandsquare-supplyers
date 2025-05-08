import React from "react";
import HelpBanner from "../components/dasboardComponents/ui/HelpBanner";
import Home from "../components/dasboardComponents/ui/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const page = () => {
  return (
    <div>
      <HelpBanner
        title="NEED HELP UNDERSTANDING YOUR DASHBOARD?"
        text=" We have curated extra support material to guide you"
        img="/assets/svg/Banner1.svg"
        route="/dashboard/support"
      />    
      <div>
        <Home />
      </div>
    </div>
  );
};

export default page;
