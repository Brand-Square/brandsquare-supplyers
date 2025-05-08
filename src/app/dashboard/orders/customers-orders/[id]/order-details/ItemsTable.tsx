import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableHeading } from "@/components/ui/TableHeading";

export function ItemsTable() {
  return (
    <div className="bg-white shadow rounded-lg p-3">
      <TableHeading text="Items" />
      <div className="mt-5 w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-100">
              <TableHead>SN</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>10 items</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="size-[2.5rem] rounded bg-neutral-200"></div>
                  <div>
                    <p className="text-theme-gray text-sm font-medium">
                      Product 354638
                    </p>
                    <p className="text-[#6A6B72] text-sm">Product 354638</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell>300,000 NGN</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-3"></div>
    </div>
  );
}
