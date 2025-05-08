"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MobileLogo from "../../../public/assets/icons/MobileLogo";

export function SupportModals({
  showContactModal,
  setShowContactModal,
  showTicketModal,
  setShowTicketModal,
}: {
  showContactModal: boolean;
  setShowContactModal: (val: boolean) => void;
  showTicketModal: boolean;
  setShowTicketModal: (val: boolean) => void;
}) {
  const handleCreateTicket = () => {
    setShowContactModal(false);
    setShowTicketModal(true);
  };

  return (
    <>
      {/* Contact Support Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-md">
          <DialogHeader className="bg-[#B0CAF2] p-3 rounded-md mt-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <MobileLogo />
                <DialogTitle className="text-2xl font-semibold text-blue-950">
                  Welcome to Brandsquare Support Centre
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-6">
            <div className="rounded-lg bg-blue-50 p-4">
              <h3 className="text-sm text-gray-500 mb-1">Contact support</h3>
              <p className="text-blue-950 font-semibold">Call 090876940</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowContactModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-950 text-white hover:bg-blue-900"
                onClick={handleCreateTicket}
              >
                Create ticket instead
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Ticket Modal */}
      <Dialog open={showTicketModal} onOpenChange={setShowTicketModal}>
        <DialogContent className="w-[95vw] max-w-md sm:p-6 p-4 overflow-y-auto max-h-[90vh]">
          <DialogHeader className="bg-[#B0CAF2] p-3 rounded-md mt-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <MobileLogo />
                <DialogTitle className="text-2xl font-semibold text-blue-950 break-words text-start">
                  Welcome to Brandsquare Support Centre
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <p className="text-blue-950 mb-1">
                Create a ticket to report your order
              </p>
              <p className="text-sm text-gray-500">
                or{" "}
                <button
                  onClick={() => {
                    setShowTicketModal(false);
                    setShowContactModal(true);
                  }}
                  className="text-blue-950 font-semibold hover:underline"
                >
                  Contact Support
                </button>
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Select a category for your issue
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g Disputes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disputes">Disputes</SelectItem>
                    <SelectItem value="delivery">Delivery Issues</SelectItem>
                    <SelectItem value="product">Product Issues</SelectItem>
                    <SelectItem value="payment">Payment Issues</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Describe your issue
                </label>
                <Textarea
                  placeholder="Type your message here"
                  className="min-h-[120px] w-full resize-y"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 flex-row">
              <Button
                variant="outline"
                onClick={() => setShowTicketModal(false)}
                className="w-max"
              >
                Cancel
              </Button>
              <Button className="bg-blue-950 text-white hover:bg-blue-900 w-max">
                Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
