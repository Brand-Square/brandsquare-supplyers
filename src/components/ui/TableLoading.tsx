"use client";

import { TableCell, TableRow } from "./table";
import { Skeleton } from "./skeleton";

interface TableLoadingProps {
  rowCount?: number;
  columnCount?: number;
}

export const TableLoading: React.FC<TableLoadingProps> = ({
  rowCount = 5,
  columnCount = 5,
}) => {
  return (
    <>
      {[...Array(rowCount)].map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {[...Array(columnCount)].map((_, columnIndex) => (
            <TableCell key={columnIndex} className="py-5">
              <Skeleton className="h-4 w-full rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
