import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BasicInfo } from "./product.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoriesDropdown } from "./CategoriesDropdown";
import { Category, useGetCategories } from "@/app/api/api-data/useCategories";

type BasicInfoSectionProps = {
  values: BasicInfo;
  onChange: (updatedValues: Partial<BasicInfo>) => void;
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  // NEW: Props for exchange rate and converted price
  exchangeRate: number | null;
  convertedPrice: number | null;
};

export function BasicInfoSection({
  values,
  onChange,
  selectedCategories,
  setSelectedCategories,
  // NEW: Destructure new props
  exchangeRate,
  convertedPrice,
}: BasicInfoSectionProps) {
  const { data } = useGetCategories(1000);

  // NEW: Handle price input change with console logging
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange({ price: value });
    const priceInYuan = parseFloat(value);
    if (!isNaN(priceInYuan) && exchangeRate) {
      const priceInNaira = priceInYuan * exchangeRate;
      console.log(
        `Main Product: Price in CNY = ${priceInYuan}, Price in NGN = ${priceInNaira.toFixed(2)}`
      );
    } else {
      console.log(
        `Main Product: Price in CNY = ${value || "N/A"}, NGN conversion unavailable (${
          exchangeRate ? "invalid input" : "exchange rate not loaded"
        })`
      );
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="title">Title*</Label>
        <Input
          id="title"
          required
          value={values.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Cartier Watch"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="dec">Description*</Label>
        <textarea
          required
          value={values.desc}
          onChange={(e) => onChange({ desc: e.target.value })}
          id="dec"
          className="h-[8rem] outline-none p-3 w-full border rounded-md resize-none"
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-1">
          {/* MODIFIED: Update label and input for CNY with NGN suffix */}
          <Label htmlFor="price">Price in Yuan (CNY)*</Label>
          <div className="relative">
            <Input
              id="price"
              required
              value={values.price}
              onChange={handlePriceChange}
              type="number"
              placeholder="CNY"
              className="pr-24" // Add padding to accommodate suffix
            />
            <span
              className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500 pointer-events-none"
            >
              {convertedPrice ? `₦${convertedPrice.toFixed(2)}` : "N/A"}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="Discount">Discount</Label>
          <Input
            id="Discount"
            type="number"
            value={values.discount}
            onChange={(e) => onChange({ discount: e.target.value })}
            placeholder="eg:10%"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-1">
          <Label htmlFor="pack">Avialable pack sizes</Label>
          <Select
            value={values.packsize}
            onValueChange={(val) => onChange({ packsize: val })}
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
            value={values.packQuantity}
            onChange={(e) => onChange({ packQuantity: e.target.value })}
            type="number"
            placeholder="eg: 50"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-1">
          <Label htmlFor="Operating stock">Minimum Operating stock</Label>
          <Input
            id="Operating stock"
            value={values.minimumStock}
            onChange={(e) => onChange({ minimumStock: e.target.value })}
            type="number"
            placeholder="eg: 20"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="Quantity">Total Stock</Label>
          <Input
            id="Quantity"
            value={values.totalStock}
            onChange={(e) => onChange({ totalStock: e.target.value })}
            type="number"
            placeholder="10"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="Categories">Categories*</Label>
        <CategoriesDropdown
          selected={selectedCategories || []}
          onChange={setSelectedCategories}
          options={data?.data ? data.data.categories : []}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-theme-blue text-sm font-bold">
          Notify me when stock reaches this level
        </Label>
        <div className="flex items-center gap-x-2">
          <Switch />
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