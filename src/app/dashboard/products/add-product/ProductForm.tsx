"use client";

import { Category } from "@/app/api/api-data/useCategories";

import React from "react";

import { ImageUploader } from "@/components/ui/ImageUploader";

import { VariantsListsTable } from "../VariantListsTable";
import {
  BasicInfo,
  Color,
  Discount,
  Product,
  ProductImageVariantResponse,
  VariantField,
  VariantOptionImage,
} from "./product.type";
import axiosClient from "@/app/api/axiosClient";
import { BasicInfoSection } from "./BasicInfoSection";
import { VariantsSectionInputs } from "./VariantsSectionInputs";
import { SubmitButton } from "../SubmitButton";
import { toast } from "sonner";
import { generateCombinations, generateCombinationsImage } from "./helper";
// import { SizeVariant } from "../SizeVariants";

const basicInfos = {
  name: "",
  desc: "",
  price: "",
  discount: "",
  minimumStock: "",
  packsize: "",
  packQuantity: "",
  totalStock: "",
};

export function ProductForm() {
  const [selectedCategories, setSelectedCategories] = React.useState<
    Category[]
  >([]);

  const [inputValues, setInputValues] = React.useState<BasicInfo>(basicInfos);

  const [productImages, setProductImages] = React.useState<File[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<Color[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[] | []>([]);

  const [variantFields, setVariantFields] = React.useState<VariantField[]>([]);

  const cleanedVariants = variantFields.map((variant) => ({
    ...variant,
    values: variant.values.filter((v) => v.label.trim() !== ""),
  }));

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function updateBasicInfo(updatedValues: Partial<BasicInfo>) {
    setInputValues((prev) => ({
      ...prev,
      ...updatedValues,
    }));
  }

  const handleFileSelect = (file: File, parentIndex: number, index: number) => {
    setSelectedFile(file);
    setVariantFields((prev) => {
      const updated = [...prev];
      updated[parentIndex].values[index].image = file;
      return updated;
    });

    console.log(selectedFile);
  };

  const handleVariantValuesInputChange = (
    parentIndex: number,
    index: number,
    type: "price" | "stock",
    value: number
  ) => {
    setVariantFields((prev) => {
      const newData = [...prev];
      const item = { ...newData[parentIndex].values[index] };

      if (type === "price") item.variantPrice = value;
      else item.variantStock = value;

      newData[parentIndex].values[index] = item;
      return newData;
    });
  };

  function handleCheckColor(newColor: Color) {
    const exists = selectedColors.some((color) => color.name === newColor.name);

    const updatedColors = exists
      ? selectedColors.filter((color) => color.name !== newColor.name)
      : [...selectedColors, newColor];

    setSelectedColors(updatedColors);
    setVariantFields((prev) =>
      prev.map((field) =>
        field.name.toLowerCase() === "color"
          ? {
              ...field,
              values: updatedColors.map((c) => ({
                label: c.name,
              })),
            }
          : field
      )
    );
  }

  function addMoreVariant(name?: string) {
    if (variantFields.length === 3) {
      return toast.warning("Max Variants reached");
    }

    setVariantFields((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: name || "",
        values: [{ label: "", image: "" }],
        isEditing: true,
      },
    ]);
  }

  function handleVariantValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    varIndex: number,
    valIndex: number
  ) {
    const value = e.target.value;
    setVariantFields((prev) => {
      const updated = [...prev];
      updated[varIndex].values[valIndex].label = value;

      // Only add a new empty input **if the last one is being filled**
      const values = updated[varIndex].values;
      if (
        valIndex === values.length - 1 &&
        value.trim() !== "" &&
        !values.includes({ label: "" })
      ) {
        updated[varIndex].values.push({ label: "" });
      }

      return updated;
    });
  }

  // TODO: this is testing faze
  const deleteVariantValue = (variantName: string, valueLabel: string) => {
    setVariantFields((prev) =>
      prev.map((variant) => {
        if (variant.name === variantName) {
          return {
            ...variant,
            values: variant.values.filter((v) => v.label !== valueLabel),
          };
        }
        return variant;
      })
    );
  };

  function toggleVariantEdit(index: number) {
    setVariantFields((prev) =>
      prev.map((variant, i) =>
        i === index ? { ...variant, isEditing: !variant.isEditing } : variant
      )
    );
  }

  function clearProductInputs() {
    setInputValues(basicInfos);
    setSelectedCategories([]);
    setProductImages([]);
    setVariantFields([]);
    setImagePreviews([]);
  }

  // ADD PRODUCTS REQUEST
  async function addProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const discount: Discount = {
      discountType: "amount",
      discountValue: Number(inputValues.discount),
      strikeOriginalPrice: true,
    };

    const formDataImages = new FormData();

    productImages.forEach((image) => {
      formDataImages.append("productImages", image);
    });

    // Extract only the `values` arrays
    const valueArrays = cleanedVariants.map((field) => field.values);

    // Generate all combinations of values
    const allCombinations = generateCombinationsImage(valueArrays);

    allCombinations.forEach((combination) => {
      const nameParts = combination.map((value, index) => {
        const fieldName = variantFields[index].name;
        return `${fieldName}-${value.label}`;
      });

      const image = combination.find((val) => val.image)?.image || "";

      const key = `variantCombinationsImages_${nameParts.join(
        "_"
      )}-${crypto.randomUUID()}`;

      formDataImages.append(key, image);
    });

    variantFields.forEach((variant) => {
      variant.values.forEach((value) => {
        if (value.image instanceof File) {
          const key = `variantOptionImages_${variant.name}_${value.label}`;
          formDataImages.append(key, value.image);
        }
      });
    });

    console.log("FormData contents:");
    [...formDataImages.entries()].forEach(([key, value]) => {
      console.log(key, value);
    });

    setIsSubmitting(true);

    try {
      const variantImageResponse =
        await axiosClient.post<ProductImageVariantResponse>(
          "/products/image-upload",
          formDataImages,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

      const variantImageResponseData = variantImageResponse.data.data;

      const variantOptionImages: VariantOptionImage[] =
        variantImageResponse.data.data.variantOptionImages.map((item) => ({
          optionName: item.optionName,
          value: item.value,
          images: item.images,
        }));

      const variantCombinations = generateCombinations(
        cleanedVariants,
        variantImageResponseData.variantCombinations
      );

      const variantOptions = cleanedVariants.map((variant) => ({
        name: variant.name,
        values: variant.values.map((v) => v.label),
      }));

      const formData: Product = {
        name: inputValues.name,
        description: inputValues.desc,
        price: Number(inputValues.price),
        discount,
        packSize: inputValues.packsize,
        packQuantity: Number(inputValues.packQuantity),
        mininumStock: Number(inputValues.minimumStock),
        stock: Number(inputValues.totalStock),
        setOutOfStockAtminimum: true,
        freeShipping: true,
        avialability: "vendors",
        categories: selectedCategories.map((cat) => cat._id),
        images: variantImageResponseData.productImages,
        variants: {
          variantOptions,
          variantOptionImages,
          variantCombinations,
        },
      };

      const response = await axiosClient.post("/products", formData);
      clearProductInputs();
      console.log(variantImageResponseData);
      toast.success("🎉 Product created successfully!");
      console.log("response", response);
    } catch (error) {
      console.log("Error creating product:", error);
      toast.error("❌ Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={addProduct}>
      {/* Product name and Info */}
      <div className="bg-white border space-y-3 rounded-lg py-4 px-6">
        <BasicInfoSection
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          values={inputValues}
          onChange={updateBasicInfo}
        />

        {/* PRODUCT IMAGES */}
        <div className="space-y-2">
          <h1 className="font-semibold mt-5 text-sm text-theme-gray">
            Add Images
          </h1>
          <ImageUploader
            setPreviews={setImagePreviews}
            previews={imagePreviews}
            setFiles={setProductImages}
          />
        </div>
      </div>

      {/* Variants */}
      <div className="mt-5 bg-white border space-y-3 rounded-lg py-4 px-6">
        <h1 className="font-semibold  text-sm text-theme-gray">
          Product Variants
        </h1>
        {/* <SizeVariant /> */}

        <VariantsSectionInputs
          toggleVariantEdit={toggleVariantEdit}
          setVariantFields={setVariantFields}
          setSelectedColors={setSelectedColors}
          selectedColors={selectedColors}
          handleVariantValueChange={handleVariantValueChange}
          handleCheckColor={handleCheckColor}
          deleteVariantValue={deleteVariantValue}
          addMoreVariant={addMoreVariant}
          variants={variantFields}
        />

        {/* All Variants Lists */}
        <VariantsListsTable
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          handleFileSelect={handleFileSelect}
          handleVariantValuesInputChange={handleVariantValuesInputChange}
          cleanedVariants={cleanedVariants}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <div className="mt-5 flex justify-end">
        <SubmitButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}
