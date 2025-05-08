import { Input } from "@/components/ui/input";
import { VariantImageUpload } from "../add-product/VariantImageUploader";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import { VariantField } from "../add-product/product.type";

type VariantsListsTableProps = {
  cleanedVariants: VariantField[];
  handleFileSelect?: (file: File, parentIndex: number, index: number) => void;
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  handleVariantValuesInputChange: (
    parentIndex: number,
    index: number,
    type: "price" | "stock",
    value: number
  ) => void;
};

export function VariantsListsTable({
  cleanedVariants,
  handleFileSelect,
  selectedRows,
  setSelectedRows,
  handleVariantValuesInputChange,
}: VariantsListsTableProps) {
  const [openRows, setOpenRows] = React.useState<number[]>([]);

  const toggleSelectRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleRow = (index: number) => {
    if (cleanedVariants.length > 1) {
      setOpenRows((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
  };

  const areAllSelected =
    cleanedVariants[0]?.values.length === selectedRows.length;

  const toggleSelectAll = () => {
    if (areAllSelected) {
      setSelectedRows([]);
    } else {
      const allIndexes = cleanedVariants[0].values.map((_, i) => i);
      setSelectedRows(allIndexes);
    }
  };

  return (
    <div>
      {cleanedVariants[0]?.values.length > 0 && (
        <div className="!mt-10 border rounded-md">
          {/* HEADERS   */}
          <div className="grid grid-cols-[5rem,_1fr,_1fr,_1fr] bg-neutral-200  rounded-t-md">
            <div className=" grid place-items-center py-2">
              <Checkbox
                checked={
                  areAllSelected || (selectedRows.length > 0 && "indeterminate")
                }
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelectAll();
                }}
              />
            </div>
            <div className="font-semibold px-3 text-sm py-2  text-theme-blue">
              Variant
            </div>
            <div className="font-semibold text-sm px-3 py-2 text-theme-blue">
              Price
            </div>
            <div className="font-semibold text-sm px-3 py-2 text-theme-blue">
              Availabilty
            </div>
          </div>

          {/* Variants LIST */}
          {cleanedVariants[0].values.map((val, i) => {
            const isOpen = openRows.includes(i);
            const selected = selectedRows.includes(i);

            return (
              <div key={i}>
                <motion.div
                  onClick={() => {
                    toggleRow(i);
                  }}
                  className={cn(
                    "grid border-b hover:bg-neutral-100 transition-all duration-300 cursor-pointer grid-cols-[5rem,_1fr,_1fr,_1fr] items-center",
                    selected ? "bg-neutral-100" : ""
                  )}
                >
                  <div className="px-3 grid place-items-center">
                    <Checkbox
                      checked={selected}
                      onClick={(e) => {
                        toggleSelectRow(i);
                        e.stopPropagation();
                      }}
                    />
                  </div>
                  <div className="px-3 py-2 flex items-center gap-x-2">
                    <VariantImageUpload
                      onFileSelect={(file) => handleFileSelect?.(file, 0, i)}
                    />
                    <div>
                      <span className="text-sm text-neutral-600 font-semibold">
                        {val.label}
                      </span>
                      {cleanedVariants.length > 1 && (
                        <div className="flex items-center gap-x-1">
                          <span className=" text-sm text-neutral-500">
                            {cleanedVariants.length - 1} Variants
                          </span>
                          <ChevronDown size={14} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <Input
                      type="number"
                      onClick={(e) => e.stopPropagation()}
                      value={val.variantPrice}
                      onChange={(e) =>
                        handleVariantValuesInputChange(
                          0,
                          i,
                          "price",
                          Number(e.target.value)
                        )
                      }
                      placeholder="Price"
                      className="bg-white"
                    />
                  </div>
                  <div className="px-3 py-2">
                    <Input
                      type="number"
                      onClick={(e) => e.stopPropagation()}
                      value={val.variantStock}
                      onChange={(e) =>
                        handleVariantValuesInputChange(
                          0,
                          i,
                          "stock",
                          Number(e.target.value)
                        )
                      }
                      placeholder="Quantity"
                      className="bg-white"
                    />
                  </div>
                </motion.div>

                {cleanedVariants.length > 1 && (
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={val.label}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {cleanedVariants[1].values.map((val, i) => {
                          return (
                            <div
                              key={i}
                              className="grid pl-4 border-b grid-cols-[5rem,_1fr,_1fr,_1fr] items-center"
                            >
                              <div className="px-3 grid place-items-center">
                                <Checkbox
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                              <div className="px-3 py-2 flex items-center gap-x-2">
                                <VariantImageUpload
                                  className="size-[2.3rem]"
                                  onFileSelect={(file) =>
                                    handleFileSelect?.(file, 1, i)
                                  }
                                />
                                <div>
                                  <span className="text-sm text-neutral-600 font-medium">
                                    {val.label}
                                  </span>
                                </div>
                              </div>
                              <div className="px-3 py-2">
                                <Input
                                  onClick={(e) => e.stopPropagation()}
                                  type="number"
                                  value={val.variantPrice}
                                  onChange={(e) =>
                                    handleVariantValuesInputChange(
                                      1,
                                      i,
                                      "price",
                                      Number(e.target.value)
                                    )
                                  }
                                  placeholder="Price"
                                  className="bg-white"
                                />
                              </div>
                              <div className="px-3 py-2">
                                <Input
                                  onClick={(e) => e.stopPropagation()}
                                  type="number"
                                  value={val.variantStock}
                                  onChange={(e) =>
                                    handleVariantValuesInputChange(
                                      1,
                                      i,
                                      "stock",
                                      Number(e.target.value)
                                    )
                                  }
                                  placeholder="Quantity"
                                  className="bg-white"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
