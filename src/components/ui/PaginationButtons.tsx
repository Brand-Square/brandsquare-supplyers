import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export const PaginationButtons: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  // onPageChange = () => {},
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 2) pages.push(1, "...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 1) pages.push("...", totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-1">
      {/* Previous Button */}
      <Button
        variant="outline"
        // onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8"
      >
        <ChevronLeft size={16} /> Previous
      </Button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "default" : "outline"}
          className="h-8"
          // onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        variant="outline"
        // onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8"
      >
        Next <ChevronRight size={16} />
      </Button>
    </div>
  );
};
