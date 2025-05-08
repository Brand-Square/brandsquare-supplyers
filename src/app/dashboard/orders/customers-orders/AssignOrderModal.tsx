import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cart from "../../../../../public/assets/icons/Cart";

interface AssignOrderModal {
  open: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AssignOrderModal({ open, setIsModalOpen }: AssignOrderModal) {
  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <div className="flex gap-x-4">
          <div className="size-[3rem] grid place-items-center border-[#80809A] bg-[#D1E4FF] rounded-lg border">
            <Cart color="#000051" />
          </div>
          <div className="flex-1">
            <DialogTitle>Assign order</DialogTitle>
            <div className="space-y-1 mt-3">
              <Label>Shipping company</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="e.g Heroshe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heroshe">Heroshe</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Assign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
