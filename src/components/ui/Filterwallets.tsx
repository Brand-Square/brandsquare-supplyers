'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

interface FilterBtnCompProps {
  onStatusChange: (status: 'pending' | 'completed' | 'failed' | 'all') => void;
}

const FilterBtnComp = ({ onStatusChange }: FilterBtnCompProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm hover:bg-gray-50">
        <Filter className="h-4 w-4" />
        <span>Filter</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={() => onStatusChange('all')}>
          All Transactions
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-amber-700" 
          onClick={() => onStatusChange('pending')}
        >
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-green-700" 
          onClick={() => onStatusChange('completed')}
        >
          Completed
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-700" 
          onClick={() => onStatusChange('failed')}
        >
          Failed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterBtnComp;