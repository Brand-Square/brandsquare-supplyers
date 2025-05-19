'use client'
import { Button } from "@/components/ui/button";
import { PrimaryHeading } from "@/components/ui/PrimaryHeading";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { LogOut } from "lucide-react";
import { Profile } from "./Profile";
import { useRouter } from "next/navigation";
// import { EditProfileButton } from "./EditProfileButton";

export default function SettingsPage() {
  const router = useRouter();

  const handlepush =()=>{
    router.push('/dashboard/settings/edit-profile')
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <PrimaryHeading text="Profile settings" />
          <SectionSubtitle text="Manage your profile from here" />
        </div>
        <div className="flex items-center gap-x-3">
          {/* <EditProfileButton /> */}
          <Button
          onClick={handlepush}
          >
            Edit Profile
          </Button>
          <Button
            variant={"destructive"}
            className="bg-[#FCD6D6] border hover:bg-[#f8c9c9] hover:text-[#F03134] border-[#F03134] text-[#F03134]"
          >
            <LogOut color="#F03134" />
            Logout
          </Button>
        </div>
      </div>

      <div className="p-5 bg-white border mt-6 rounded-lg">
        <Profile />
      </div>
    </div>
  );
}
