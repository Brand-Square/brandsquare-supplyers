import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { VariantField } from "./product.type";

type Props = {
  variant: VariantField;
  index: number;
  onNameChange: (index: number, value: string) => void;
  onValueChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex: number,
    valueIndex: number
  ) => void;
  onRemoveVariant: (variantId: string) => void;
  toggleEdit: () => void;
  deleteVariantValue: (variantName: string, valueLabel: string) => void;
};

export const VariantSection: React.FC<Props> = ({
  variant,
  index,
  onNameChange,
  onValueChange,
  onRemoveVariant,
  toggleEdit,
  deleteVariantValue,
}) => {
  return (
    <div key={variant.id} className="border rounded-lg py-4 px-7">
      {variant.isEditing ? (
        <>
          <div className="space-y-2">
            <div className="space-y-1">
              <Label>Variant Name</Label>
              <Input
                value={variant.name}
                onChange={(e) => onNameChange(index, e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Variant Values</Label>
              {variant.values.map((val, valIndex) => (
                <Input
                  key={valIndex}
                  value={val.label}
                  rightIcon={
                    valIndex === 0 ? null : (
                      <button
                        onClick={() =>
                          deleteVariantValue(variant.name, val.label)
                        }
                        type="button"
                      >
                        <Trash2 size={17} />
                      </button>
                    )
                  }
                  onChange={(e) => onValueChange(e, index, valIndex)}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end gap-x-4">
            <Button
              onClick={() => onRemoveVariant(variant.id)}
              type="button"
              variant="secondary"
              size="sm"
            >
              Remove
            </Button>
            <Button onClick={toggleEdit} type="button" size="sm">
              Done
            </Button>
          </div>
        </>
      ) : (
        <div
          onClick={toggleEdit}
          className="hover:bg-neutral-100 transition-all rounded-md p-2 duration-300 cursor-pointer"
        >
          <h5 className="font-semibold text-sm text-theme-blue">
            {variant.name}
          </h5>
          <div className="flex items-center mt-2 gap-1.5 flex-wrap">
            {variant.values
              .filter((val) => val.label.trim() !== "")
              .map((val, i) => (
                <div
                  key={i}
                  className="w-max bg-neutral-200 py-1 px-2 text-xs text-theme-gray"
                >
                  {val.label}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
