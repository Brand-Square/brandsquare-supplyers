import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "./add-product/product.type";
import { FormikProps } from "formik";

type BasicInfoSection = {
  formik: FormikProps<Product>;
};

export function BasicInfoSection({ formik }: BasicInfoSection) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="title">Title*</Label>
        <Input
          id="name"
          required
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Cartier Watch"
          error={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Description*</Label>
        <textarea
          required
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="h-[8rem] outline-none p-3 w-full border rounded-md resize-none"
        ></textarea>
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500 text-sm">
            {formik.errors.description}
          </div>
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-1">
          <Label htmlFor="price">Price*</Label>
          <Input
            id="price"
            required
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            placeholder="NGN"
            error={
              formik.touched.price && formik.errors.price
                ? formik.errors.price
                : null
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="discount">Discount *</Label>
          <Input
            id="discount"
            type="number"
            name="discount"
            value={formik.values.discount.discountValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="eg:10%"
            error={
              formik.touched.discount && formik.errors.discount
                ? formik.errors.discount.discountValue
                : null
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-1">
          <Label htmlFor="packSize">Avialable pack sizes</Label>
          <Select
            name="packSize"
            value={formik.values.packSize}
            onValueChange={(value) => formik.setFieldValue("packSize", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pack size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="half-dozen">Half-Dozen</SelectItem>
              <SelectItem value="dozen">Dozen</SelectItem>
              <SelectItem value="box">Box</SelectItem>{" "}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="packQuantity">Pack Quantity</Label>
          <Input
            id="packQuantity"
            name="packQuantity"
            value={formik.values.packQuantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            placeholder="eg: 50"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-1">
          <Label htmlFor="minimumStock">Minimum Operating stock</Label>
          <Input
            id="minimumStock"
            name="minimumStock"
            value={formik.values.mininumStock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            placeholder="eg: 20"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="totalStock">Total Stock</Label>
          <Input
            id="totalStock"
            name="totalStock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            placeholder="10"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="Categories">Categories*</Label>
      </div>

      <div className="space-y-1.5">
        <Label className="text-theme-blue text-sm font-bold">
          Notify me when stock reaches this level
        </Label>
        <div className="flex items-center gap-x-2">
          <Switch
          // checked={formik.values.n}
          // onCheckedChange={(checked) =>
          //   formik.setFieldValue("notifyOnLowStock", checked)
          // }
          />
          <label
            htmlFor="stock value"
            className="text-sm font-medium text-[#6A6B72]"
          >
            Set as out of stock value
          </label>
        </div>
      </div>
    </div>
  );
}
