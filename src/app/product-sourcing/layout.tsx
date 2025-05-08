import React from "react";
import TopBar from "../components/productSourcing/ui/TopBar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full mt-[18.5%] xl:mt-[10%] ">
      <div className="fixed top-0 left-0 z-40 w-full">
        <TopBar />
      </div>

      <div className="lg:overflow-hidden sm:-mt-[6%] xl:mt-0 2xl:-mt-[2%]">{children}</div>
    </div>
  );
};

export default layout;
