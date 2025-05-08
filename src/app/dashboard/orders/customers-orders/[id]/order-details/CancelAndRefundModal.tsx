import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductIcon from "../../../../../../../public/assets/icons/productIcon";

interface AssignOrderModal {
  open: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CancelAndRefundModal({
  open,
  setIsModalOpen,
}: AssignOrderModal) {
  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <div className="flex gap-x-4">
          <div className="size-[3rem] grid place-items-center border-[#FF3B30] bg-[#FF3B301A] rounded-lg border">
            <ProductIcon color="#FF3B30" />
          </div>
          <div className="flex-1">
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription className="text-[#6A6B72] mt-5">
              Are you sure you want to cancel{" "}
              <span className="text-theme-blue font-semibold">
                Order 354638
              </span>{" "}
              conduct this refund?{" "}
            </DialogDescription>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"}>Cancel Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
