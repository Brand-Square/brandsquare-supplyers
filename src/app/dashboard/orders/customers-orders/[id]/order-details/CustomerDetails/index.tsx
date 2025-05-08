import { Mail, MapPin, Phone, User, Wallet } from "lucide-react";

export function CustomerDetails() {
  return (
    <div className="bg-white border grid md:grid-cols-3 md:divide-x divide-y shadow rounded-lg ">
      <div className="p-3.5">
        <div className="flex gap-x-3 items-center text-sm text-[#6A6B72]">
          <User size={20} />
          <span>Customer</span>
        </div>
        <div className="mt-3 flex items-center gap-x-3">
          <div className="size-[2.5rem] bg-slate-200 rounded-full"></div>
          <div>
            <h2 className="text-sm font-semibold text-theme-gray">
              Eleganza Limited
            </h2>
            <p className="text-sm text-[#6A6B72]">olivia@untitledui.com</p>
          </div>
        </div>
      </div>
      <div className="p-3.5">
        <div className="space-y-2">
          <div className="flex gap-x-3 items-center text-sm text-[#6A6B72]">
            <MapPin size={20} />
            <span>Address</span>
          </div>
          <p className="text-sm text-theme-gray">
            371, Borno Way, Alagomeji, Lagos
          </p>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex gap-x-3 items-center text-sm text-[#6A6B72]">
            <Phone size={20} />
            <span>Contact</span>
          </div>
          <p className="text-sm text-theme-gray ">07090898098</p>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex gap-x-3 items-center text-sm text-[#6A6B72]">
            <Mail size={20} />
            <span>Mail</span>
          </div>
          <p className="text-sm text-theme-gray">olivia@untitledui.com</p>
        </div>
      </div>
      <div className="p-3.5 space-y-3">
        <div className="space-y-2">
          <div className="flex gap-x-3 items-center text-sm text-[#6A6B72]">
            <Wallet size={20} />
            <span>Transaction</span>
          </div>
          <p className="text-sm font-semibold text-theme-gray">300,000 NGN</p>
        </div>
        <div className="space-y-2">
          <div className="flex gap-x-3 items-center text-sm text-[#6A6B72]">
            <span>Delivery fees</span>
          </div>
          <p className="text-sm font-semibold text-theme-gray">10,000 NGN</p>
        </div>
        <div className="space-y-2">
          <div className="flex gap-x-3 items-center text-sm text-[#6A6B72]">
            <span>Total</span>
          </div>
          <p className="text-sm font-semibold text-theme-gray">10,000 NGN</p>
        </div>
      </div>
    </div>
  );
}
