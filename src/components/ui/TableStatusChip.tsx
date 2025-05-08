import { cn } from "@/lib/utils";

export type Status = "processing" | "success" | "failed" | "in transit";

type TableStatusChipProps = {
  variant: Status;
};

export const tableVariants: Record<Status, string> = {
  processing: "border-[#865503] bg-[#FEF6E7] text-[#865503]",
  success: "border-[#036B26] bg-[#E7F6EC] text-[#036B26]",
  "in transit": "border-[#04326B] bg-[#E3EFFC] text-[#04326B]",
  failed: "border-[#AD3307] bg-[#FFECE5] text-[#AD3307]",
};

export function TableStatusChip({
  variant = "processing",
}: TableStatusChipProps) {
  return (
    <div
      className={cn(
        "w-max rounded-full border capitalize  py-[2px] px-3 text-sm  font-bold",
        tableVariants[variant]
      )}
    >
      {variant}
    </div>
  );
}
