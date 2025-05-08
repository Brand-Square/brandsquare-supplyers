//  import React from 'react'
//  import HelpBanner from '@/app/components/dasboardComponents/ui/HelpBanner'
// import Product from '@/app/components/dasboardComponents/pages/product'
"use client";
import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { Plus } from "lucide-react";
import Link from "next/link";
import { StatCards } from "./StatCards";
import { ProductsTable } from "./ProductsTable";

const ProductsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <PrimaryHeading text="My Products" />
          <SectionSubtitle text="Manage your products from here" />
        </div>
        <div className="flex items-center gap-x-2">
          <Link
            href={"/dashboard/products/add-product"}
            className="inline-flex px-3 py-2 text-sm font-semibold rounded-lg items-center gap-x-2 bg-theme-blue text-white"
          >
            <Plus size={20} /> New product
          </Link>
         
        </div>
      </div>

      <section className="mt-5">
        <StatCards />
      </section>
      <section className="mt-5">
        <ProductsTable />
      </section>
    </div>
  );
};

export default ProductsPage;
