import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Status, TableStatusChip, tableVariants } from "./TableStatusChip";

interface TableStatusDropdownProps {
  status: Status;
  handleStatus: (status: Status) => void;
}

export function TableStatusDropdown({
  status = "processing",
  handleStatus,
}: TableStatusDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "w-max rounded-full border flex items-center gap-x-2 capitalize  py-[2px] px-3 text-sm  font-bold",
            tableVariants[status]
          )}
        >
          {status} <ChevronDown size={13} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-0 rounded-xl w-[13.5rem]">
        <DropdownMenuLabel>Change status</DropdownMenuLabel>
        {["processing", "in transit", "failed", "success"].map((status, i) => (
          <DropdownMenuItem
            onClick={() => handleStatus(status as Status)}
            key={i}
          >
            <TableStatusChip variant={status as Status} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
