import * as Yup from "yup";

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "At least one category is required"),
  price: Yup.number()
    .min(0, "Price must be a positive number")
    .required("Price is required"),
  discount: Yup.object({
    discountType: Yup.string().optional(),
    amount: Yup.number().optional(),
    discountValue: Yup.number().optional(),
  }).optional(),
  variants: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Variant name is required"),
        type: Yup.string().required("Variant type is required"),
        variantPrice: Yup.number().optional(),
      })
    )
    .optional(),
  availability: Yup.string().required("Availability is required"),
  packSize: Yup.string().optional(),
});
