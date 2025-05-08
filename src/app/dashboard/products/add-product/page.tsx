import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import React from "react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";

const page = () => {
  return (
    <div>
      <div className="flex items-center justify-between mx-auto max-w-[60rem]">
        <PrimaryHeading text="Add New Product" />{" "}
        <Button variant={"ghost"}>Clear</Button>
      </div>
      <div className="mt-5 mx-auto max-w-[60rem]">
        <ProductForm />
      </div>
    </div>
  );
};

export default page;
