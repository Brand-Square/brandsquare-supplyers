import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useDeleteProduct } from "@/app/api/api-mutation/useProducts";
import Icon from "../../../../../public/assets/icons/productIcon";
import { Product } from "../add-product/product.type";

interface DeleteModalProps {
  showDeleteDialog: boolean;
  product: Product;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteModal = ({
  showDeleteDialog,
  setShowDeleteDialog,
  product,
}: DeleteModalProps) => {
  const deleteProduct = useDeleteProduct();

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(product._id as string);
      setShowDeleteDialog(false);
    } catch (error) {
      console.log("Error in handleDelete now:", error);
    }
  };

  return (
    <Dialog
      open={showDeleteDialog}
      defaultOpen={true}
      onOpenChange={setShowDeleteDialog}
    >
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-x-8">
            <div className="border-destructive border size-[3rem] shrink-0 grid place-items-center bg-neutral-50 rounded-lg">
              <Icon />
            </div>
            <div>
              <DialogTitle>Delete Product </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <span className="truncate w-12 font-bold text-neutral-700">
                  {product.name}
                </span>{" "}
                ?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button size={"lg"} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            size={"lg"}
            disabled={deleteProduct.isPending}
          >
            {deleteProduct.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
