import { Mail, Phone, User } from "lucide-react";

export function ProfileBasicInfos() {
  return (
    <div className="">
      <div className="flex items-center gap-x-1">
        <User size={15} color="#6A6B72" />{" "}
        <span className="text-sm text-[#6A6B72]">Vendor</span>
      </div>

      {/* PROFILE IMAGE AND NAME */}
      <div className="flex items-center gap-x-2 mt-4">
        <div className="size-[3rem] rounded-full bg-neutral-200"></div>
        <div>
          <span className="block  capitalize font-bold text-theme-gray">
            specter Eke
          </span>
          <span className="text-[#475467] text-sm">specter@gmail.com</span>
        </div>
      </div>

      {/* CONTACT */}
      <div className="mt-4">
        <div className="flex items-center gap-x-1">
          <Phone size={15} color="#6A6B72" />
          <span className="text-sm text-[#6A6B72]">Contact</span>
        </div>
        <p className="text-theme-gray mt-2">0904040432</p>
      </div>

      {/* MAIL */}
      <div className="mt-4">
        <div className="flex items-center gap-x-1">
          <Mail size={15} color="#6A6B72" />
          <span className="text-sm text-[#6A6B72]">Mail</span>
        </div>
        <p className="text-theme-gray mt-2">@specter.com@gmail</p>
      </div>

      {/* ADDRESS */}
      <div className="mt-4">
        <div className="flex items-center gap-x-1">
          <Mail size={15} color="#6A6B72" />
          <span className="text-sm text-[#6A6B72]">Address</span>
        </div>
        <p className="text-theme-gray mt-2">12, udo club</p>
      </div>
    </div>
  );
}
