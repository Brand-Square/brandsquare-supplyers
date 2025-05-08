import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  isSubmitting: boolean;
};

export function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <Button disabled={isSubmitting} className="w-[8rem]">
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" /> Saving
        </>
      ) : (
        "Save"
      )}
    </Button>
  );
}
