export type Discount = {
  discountType: "amount" | "percentage" | "";
  discountValue: number;
  strikeOriginalPrice?: boolean;
};

export type VariantOption = {
  name: string;
  values: string[];
};

export type VariantOptionImage = {
  optionName: string;
  value: string;
  images: string[];
};

export type VariantCombination = {
  name: string;
  variantPrice: number;
  variantStock: number;
  properties: string[];
  applyDiscount?: boolean;
  variantImages: string[];
};

export type Variants = {
  variantOptions: VariantOption[];
  variantOptionImages: VariantOptionImage[];
  variantCombinations: VariantCombination[];
};

export type Product = {
  _id?: string;
  name: string;
  description: string;
  categories: string[];
  images: string[];
  discount: Discount;
  price: number;
  variants: Variants;
  avialability: "vendors" | "customers" | "both";
  packSize: string;
  packQuantity: number;
  stock: number;
  mininumStock: number;
  setOutOfStockAtminimum: boolean;
  freeShipping: boolean;
  sold?: number;
};

export type Color = { hex: string; name: string };

export type VariantValue = {
  label: string;
  image?: File | string;
  variantPrice?: number;
  variantStock?: number;
};

export type VariantField = {
  id: string;
  name: string;
  values: VariantValue[];
  isEditing: boolean;
};

export type BasicInfo = {
  name: string;
  desc: string;
  price: string;
  totalStock: string;
  discount: string;
  minimumStock: string;
  packsize: string;
  packQuantity: string;
};

export type ProductImageVariantResponse = {
  data: {
    productImages: string[];
    variantOptionImages: VariantOptionImageResponse[];
    variantCombinations: VariantOptionCombinationResponse[];
  };
};

export type VariantOptionImageResponse = {
  optionName: string;
  value: string;
  images: string[];
};

export type VariantOptionCombinationResponse = {
  name: string;
  variantImages: string[];
};
