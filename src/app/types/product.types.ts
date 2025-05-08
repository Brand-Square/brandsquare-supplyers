// Basic product information types
export interface BasicProductInfo {
  title: string;
  description: string;
  price: number;
  discount?: {
    value: number;
    type: "percentage" | "amount";
  };
  availablePackSizes: string;
  minimumOperatingStock: number;
  categories: string[];
  quantity: number;
  notifyOnStockLevel: boolean;
  setAsOutOfStock: boolean;
}

// Variant related types
export interface VariantValue {
  value: string;
  price?: number;
  quantity?: number;
  image?: string;
}

export interface VariantOption {
  name: string; // The dynamic variant type name (e.g. "color", "size", "material", etc)
  values: VariantValue[];
}

export interface ProductVariant {
  variant: string;
  price: number;
  availability: number;
  image?: string;
}

// A single property in a variant combination
export interface VariantProperty {
  name: string; // The variant type (e.g. "color", "size", "material")
  value: string; // The selected value for this variant type
}

// Represents a specific combination of variant properties
export interface VariantCombination {
  properties: VariantProperty[]; // Array of variant properties that make up this combination
  price: number;
  quantity: number;
  image?: string;
}

// Main product type that combines everything
export interface Product extends BasicProductInfo {
  _id?: string;
  variantOptions: VariantOption[];
  variantCombinations: VariantCombination[];
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Type for the form data when adding/editing a product
export interface ProductFormData
  extends Omit<Product, "_id" | "createdAt" | "updatedAt"> {
  imageFiles?: File[];
  variantImageFiles?: { [key: string]: File };
}
