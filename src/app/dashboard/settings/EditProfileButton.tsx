"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound } from "lucide-react";
import useInitAuthStore from "@/app/store/InitAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { VendorDetails } from "@/app/types/vendor";
interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function EditProfileButton() {
  const [vendor, setVendor] = useState<VendorDetails | null>(null);
  const [password, setPassword] = useState("");
  const { verifyPassword } = useInitAuthStore();
  const router = useRouter();

  useEffect(() => {
    const vendorString = localStorage.getItem("vendorDetails");
    if (vendorString) {
      setVendor(JSON.parse(vendorString));
    }
  }, []);

  const handleSubmit = async () => {
    if (!vendor?.email || !password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      await verifyPassword({
        email: vendor.email,
        password,
      });
      toast.success("Password verified successfully");
      router.push("/dashboard/settings/edit-profile");
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(
        apiError?.response?.data?.message ||
          apiError?.message ||
          "Password verification failed"
      );
      console.error("Password verification failed:", apiError);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserRound />
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-start gap-x-3">
          <div className="size-[3rem] rounded-lg bg-[#D1E4FF] border border-[#80809A] grid place-items-center">
            <UserRound size={20} color="#80809A" />
          </div>
          <div className="flex-1">
            <DialogTitle>Edit profile</DialogTitle>
            <p className="mt-4 text-[#6A6B72]">Enter your password to edit.</p>

            <div className="mt-5 space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Enter your password"
                type="password"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
