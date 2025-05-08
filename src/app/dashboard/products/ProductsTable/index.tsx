"use client";

import { Button } from "@/components/ui/button";
// import { TableEmptyState } from "@/components/ui/TableEmptyState";
import { TableHeading } from "@/components/ui/TableHeading";
import { EllipsisVertical, ListFilter } from "lucide-react";
import { useGetVendorProducts } from "@/app/api/api-data/useProducts";
import React from "react";
import { Product } from "../add-product/product.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableLoading } from "@/components/ui/TableLoading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { formatNGN } from "@/lib/utils";
import { DeleteModal } from "./DeleteModal";

export const ProductsTable = () => {
  const { data, isLoading } = useGetVendorProducts();
  const products = data?.data.allProducts || [];

  console.log("vendor products", data?.data);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(true);
  const [product, setProduct] = React.useState<Product | null>(null);

  const triggerDeleteModal = (selectedProduct: Product) => {
    setShowDeleteDialog(true);
    setProduct(selectedProduct);
  };

  return (
    <div className="bg-white shadow rounded-lg px-3 py-5">
      <div className="flex items-center justify-between">
        <TableHeading text="All products" />
        <Button variant={"outline"}>
          <ListFilter width={15} height={11.6} />
          Filter products by
        </Button>
      </div>
      <div className="mt-8">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F6F7F9]   [&_th]:font-semibold">
                <TableHead className=" py-5 w-[35rem]  rounded-tl-xl">
                  Product Name{" "}
                </TableHead>
                <TableHead className="py-5 ">Quantity</TableHead>
                <TableHead className="py-5  hidden md:table-cell">
                  Price (NGN)
                </TableHead>
                <TableHead className="py-5  hidden md:table-cell ">
                  Sales
                </TableHead>
                <TableHead className="py-5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product, i) => (
                  <TableRow key={i} className="[&_td]:text-theme-gray">
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-[200px]">
                        {product.images && product.images[0] && (
                          <div className="flex-shrink-0">
                            <Image
                              src={`https://api.brandsquare.store/${product.images[0]}`}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 border  object-cover rounded"
                            />
                          </div>
                        )}
                        <span className="truncate">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {product.stock}
                    </TableCell>
                    <TableCell>{formatNGN(product.price)}</TableCell>
                    <TableCell>{product.sold ? product.sold : 0}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"outline"} size={"icon"}>
                            <EllipsisVertical size={15} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="px-0 mr-20">
                          <DropdownMenuItem className="py-2.5 text-sm text-neutral-600 cursor-pointer">
                            <Link
                              target="_blank"
                              href={"/"}
                              // href={`${BASE_URL}/products/${product._id}`}
                            >
                              View Public Link
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="py-2.5 text-sm text-neutral-600 cursor-pointer">
                            <Link
                              href={`/dashboard/products/${product._id}/edit`}
                            >
                              Edit Product
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            asChild
                            className="text-destructive hover:!text-destructive py-2.5 text-sm cursor-pointer"
                          >
                            <button
                              className="w-full"
                              onClick={() => {
                                setTimeout(
                                  () => triggerDeleteModal(product),
                                  0
                                );
                              }}
                            >
                              Delete
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : isLoading ? (
                <TableLoading columnCount={5} rowCount={10} />
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-theme-blue font-semibold"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* <TableEmptyState
          subText="Your products will show up here"
          heading="No products listed yet"
        /> */}
      </div>

      {/* Modals */}
      {showDeleteDialog && product && (
        <DeleteModal
          setShowDeleteDialog={setShowDeleteDialog}
          product={product}
          showDeleteDialog={showDeleteDialog}
        />
      )}
    </div>
  );
};
