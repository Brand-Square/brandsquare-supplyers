"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
import { Loader2 } from "lucide-react";
import MobileLogo from "../../../../../public/assets/icons/MobileLogo";

// Base URL for API requests
const BASE_URL = "https://api.brandsquare.store/api";

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
  // State for form fields
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCreateTicket = () => {
    setShowContactModal(false);
    setShowTicketModal(true);
  };

  const handleReportSubmit = async () => {
    // Validation
    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (!description || description.trim().length < 10) {
      toast.error(
        "Please provide a detailed description (at least 10 characters)"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Get token from cookies
      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!cookieToken) {
        toast.error("You need to be logged in to create a ticket");
        setIsSubmitting(false);
        return;
      }

      // Prepare data for API call
      const ticketData = {
        title: category, // Use the category as the title
        description,
        // Category is intentionally omitted due to enum validation issues
      };

      // Log the request payload for debugging
      console.log("Creating ticket with data:", ticketData);

      // Make API call
      const response = await axios.post(`${BASE_URL}/tickets`, ticketData, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
          "Content-Type": "application/json",
        },
      });

      // Log the successful response
      console.log("Ticket created successfully:", response.data);

      // Show success message
      toast.success("Ticket submitted successfully!");

      // Reset form and close modal
      setCategory("");
      setDescription("");
      setShowTicketModal(false);
    } catch (error) {
      // Detailed error logging
      if (axios.isAxiosError(error)) {
        console.error("Ticket creation error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.config?.headers,
        });

        // Show error from API if available, otherwise generic message
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to create ticket. Please try again.";
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
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
                  className="min-h-[120px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowTicketModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-950 text-white hover:bg-blue-900"
                onClick={handleReportSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Report"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
