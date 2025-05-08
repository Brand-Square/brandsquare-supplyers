import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import React from "react";
import { ColorVariant } from "./ColorVariant";
import { VariantSection } from "./VariantSection";
import { motion } from "framer-motion";
import { Color, VariantField } from "./product.type";

type VariantsSectionInputs = {
  variants: VariantField[];
  addMoreVariant(name?: string): void;
  toggleVariantEdit(index: number): void;
  handleCheckColor(newColor: Color): void;
  handleCheckColor(newColor: Color): void;
  selectedColors: Color[];
  setVariantFields: React.Dispatch<React.SetStateAction<VariantField[]>>;
  setSelectedColors: React.Dispatch<React.SetStateAction<Color[]>>;
  handleVariantValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    varIndex: number,
    valIndex: number
  ): void;
  deleteVariantValue: (variantName: string, valueLabel: string) => void;
};

export function VariantsSectionInputs({
  variants,
  addMoreVariant,
  toggleVariantEdit,
  handleCheckColor,
  selectedColors,
  setVariantFields,
  setSelectedColors,
  handleVariantValueChange,
  deleteVariantValue,
}: VariantsSectionInputs) {
  return (
    <div>
      {variants.length === 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant={"secondary"}
              className="w-full text-neutral-500 font-medium"
            >
              <Plus /> Add Variants like sizes and colors
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-w-none">
            <DropdownMenuItem
              onClick={() => {
                addMoreVariant("color");
              }}
            >
              Color
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addMoreVariant("size")}>
              Size
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <motion.div layout="position" className="space-y-3">
        {variants.map((variant, i) => {
          return (
            <React.Fragment key={variant.id}>
              {/* Color Variant */}
              {variant.name === "color" ? (
                <div key={variant.id} className="border rounded-lg py-4 px-7">
                  <ColorVariant
                    openEdit={() => toggleVariantEdit(i)}
                    isEditing={variant.isEditing}
                    handleCheckColor={handleCheckColor}
                    selectedColors={selectedColors}
                  />

                  {variant.isEditing && (
                    <div className="mt-3 flex items-center justify-end gap-x-4">
                      <Button
                        onClick={() => {
                          setVariantFields((prev) =>
                            prev.filter((v) => v.id !== variant.id)
                          );
                          setSelectedColors([]);
                        }}
                        type="button"
                        variant={"secondary"}
                        size={"sm"}
                      >
                        Remove
                      </Button>
                      <Button
                        onClick={() => toggleVariantEdit(i)}
                        type="button"
                        size={"sm"}
                      >
                        Done
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <VariantSection
                  key={variant.id}
                  variant={variant}
                  index={i}
                  onNameChange={(index, value) => {
                    const trimmedValue = value.trim();

                    // Check if this value already exists in another index
                    const isDuplicate = variants.some(
                      (field, i) =>
                        i !== index &&
                        field.name.trim().toLowerCase() ===
                          trimmedValue.toLowerCase()
                    );

                    if (isDuplicate && trimmedValue !== "") {
                      // Optionally: Show a toast or inline error here
                      console.warn("Duplicate variant name!");
                      return;
                    }

                    const updated = [...variants];
                    updated[index].name = value;
                    setVariantFields(updated);
                  }}
                  onValueChange={handleVariantValueChange}
                  toggleEdit={() => toggleVariantEdit(i)}
                  deleteVariantValue={deleteVariantValue}
                  onRemoveVariant={(id) => {
                    setVariantFields((prev) => prev.filter((v) => v.id !== id));
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </motion.div>

      {variants.length > 0 && (
        <div className=" mt-2">
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => addMoreVariant()}
            className="w-full text-neutral-500 font-medium"
          >
            <Plus /> Add another Variant option
          </Button>
        </div>
      )}
    </div>
  );
}
