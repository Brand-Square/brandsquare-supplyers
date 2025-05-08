import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Plus } from "lucide-react";

export function SizeVariant() {
  return (
    <div className="space-y-2">
      {/* {isEditing ? ( */}
      <>
        <div className="space-y-1">
          <Label htmlFor="">Variant Name</Label>
          <Input id="" placeholder="" defaultValue={"Size"} />
        </div>
        <Popover>
          <PopoverTrigger className="border flex items-center gap-x-2  rounded-md min-h-9 w-full px-2 py-1">
            {/* {selectedColors.length > 0 ? (
                <div className="flex items-center gap-x-2 flex-wrap gap-y-1 flex-1">
                  {selectedColors.map((color, i) => {
                    return (
                      <div
                        key={i}
                        className="text-xs flex items-center w-max py-1 px-1.5 rounded-md bg-neutral-200 gap-x-1 text-theme-black"
                      >
                        <div
                          style={{ backgroundColor: color.hex }}
                          className="size-[1rem] rounded-full"
                        />
                        {color.name}
                        <span
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckColor(color);
                          }}
                          className="p-1 hover:bg-neutral-300"
                        >
                          <X size={12} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <span className="text-sm font-semibold text-neutral-400">
                  Add Colors
                </span>
              )} */}

            <ChevronDown className="ms-auto" size={20} />
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-none  py-1.5">
            <button
              type="button"
              className="flex items-center w-full text-theme-yellow-pry font-semibold text-sm gap-x-2 py-2 px-2 hover:bg-neutral-100  rounded transition-colors"
            >
              <Plus size={18} /> Custom Size
            </button>
            <ScrollArea className="">
              <div className="max-h-[12rem]">
                {colorVariants.map((color, index) => {
                  // const checkedColor = selectedColors.some(
                  //   (c) => c.name === color.name
                  // );

                  return (
                    <div
                      role="button"
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleCheckColor(color);
                      }}
                      className="p-2 rounded-lg cursor-pointer flex gap-x-3 items-center  hover:bg-neutral-100 transition-all duration-300"
                    >
                      <Checkbox id={color.name} />
                      <div className="flex items-center gap-x-1">
                        <div
                          style={{ backgroundColor: color.hex }}
                          className="size-[1.2rem] border rounded-full"
                        />
                        <span className="text-sm text-theme-text-gray">
                          {color.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </>
      {/* ) : (
        <div
          onClick={openEdit}
          className="hover:bg-neutral-100 transition-all rounded-md p-2 duration-300 cursor-pointer"
        >
          <h5 className="font-semibold text-sm text-theme-blue">Color</h5>
          <div className="flex items-center mt-2 gap-1.5 flex-wrap">
            {selectedColors.length > 0 &&
              selectedColors.map((val, i) => (
                <div
                  key={i}
                  className="text-xs flex items-center w-max py-1 px-1.5 rounded-md bg-neutral-200 gap-x-1 text-theme-black"
                >
                  <div
                    style={{ backgroundColor: val.hex }}
                    className="size-[.9rem] rounded-full"
                  />
                  {val.name}
                </div>
              ))}
          </div>
        </div> */}
      {/* )} */}
    </div>
  );
}

const colorVariants = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Navy", hex: "#000080" },
  { name: "Teal", hex: "#008080" },
  { name: "Maroon", hex: "#800000" },
  { name: "Olive", hex: "#808000" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Coral", hex: "#FF7F50" },
];
