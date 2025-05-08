"use client";

import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { ChevronLeft, LoaderCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
import { useGetSingleProduct } from "@/app/api/api-data/useProducts";
import { AxiosError } from "axios";
import { Product } from "../../add-product/product.type";
import { BasicInfoSection } from "../../BasicInfoSection";
import { ImageUploader } from "@/components/ui/ImageUploader";
// import * as Yup from "yup";
import { ProductSchema } from "./schema.type";
import { SubmitButton } from "../../SubmitButton";
import { FormikHelpers, useFormik } from "formik";
import { useEditProduct } from "@/app/api/api-mutation/useProducts";
import { Button } from "@/components/ui/button";

const initialValues: Product = {
  name: "",
  description: "",
  categories: [],
  freeShipping: false,
  images: [],
  mininumStock: 0,
  packQuantity: 0,
  setOutOfStockAtminimum: false,
  stock: 0,
  price: 0,
  discount: {
    discountType: "",
    discountValue: 0,
  },
  variants: {
    variantCombinations: [],
    variantOptionImages: [],
    variantOptions: [],
  },
  avialability: "both",
  packSize: "",
};

const EditProduct = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data, isLoading, error, refetch } = useGetSingleProduct(id);
  const product = data?.data[0];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedImage, setSelectedImage] = React.useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[] | []>([]);
  const { mutate } = useEditProduct(id);
  // const [productData, setProductData] = React.useState<Product>(initialValues);

  // React.useEffect(() => {
  //   if (product) {
  //     setProductData({
  //       name: product.name || "",
  //       description: product.description || "",
  //       categories: product.categories || [],
  //       price: product.price || 0,
  //       packSize: product.packSize || "",
  //       discount: product.discount || {
  //         discountType: "",
  //         discountValue: 0,
  //       },
  //       variants: product.variants || [],
  //       avialability: product.avialability || "both",
  //       freeShipping: false,
  //       mininumStock: product.mininumStock,
  //       packQuantity: product.packQuantity,
  //       setOutOfStockAtminimum: true,
  //       stock: product.stock,
  //       images: [],
  //     });
  //   }
  // }, [product]);

  React.useEffect(() => {
    if (product?.images) {
      setImagePreviews(product.images);
    }
  }, [product]);

  // Handle form submission
  const handleSubmit = (
    values: Product,
    { setSubmitting }: FormikHelpers<Product>
  ) => {
    const dataToSubmit = { ...values };

    mutate({ id, formData: dataToSubmit });
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: product
      ? {
          ...initialValues,
          ...product,
          discount: product.discount || initialValues.discount,
          variants: {
            variantCombinations: product.variants?.variantCombinations || [],
            variantOptionImages: product.variants?.variantOptionImages || [],
            variantOptions: product.variants?.variantOptions || [],
          },
        }
      : initialValues,
    validationSchema: ProductSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  console.log("product packsize", product?.packSize);
  console.log("formik packSize", formik.values.variants);

  const axiosError = error as AxiosError<{ msg: string }>;
  if (isLoading) {
    return (
      <div className="h-[80vh] grid place-items-center">
        <LoaderCircle size={40} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">
          {axiosError?.response?.data?.msg || "An unexpected error occurred"}
        </p>
        <div className="flex justify-center mt-3">
          <Button onClick={() => refetch()}>
            <RefreshCcw /> Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[60rem]">
      <div className="flex gap-x-2 items-center">
        <Link
          href={"/dashboard/products"}
          className="p-1.4 hover:bg-neutral-100 "
        >
          <ChevronLeft />
        </Link>
        <PrimaryHeading text="Edit Product" />
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-6 ">
        <div className="bg-white border space-y-3 rounded-lg py-4 px-6">
          <BasicInfoSection formik={formik} />

          {/* PRODUCT IMAGES */}
          <div className="space-y-2">
            <h1 className="font-semibold mt-5 text-sm text-theme-gray">
              Add Images
            </h1>

            <ImageUploader
              setPreviews={setImagePreviews}
              previews={imagePreviews}
              setFiles={setSelectedImage}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-5 flex justify-end">
          <SubmitButton isSubmitting={formik.isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
