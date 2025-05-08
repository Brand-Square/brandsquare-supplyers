"use client";
import React, {useState} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Image from "next/image";
import { Settings, Globe } from "lucide-react";
import Footer from "../../ui/Footer";
import { SupportModals } from "../ui/SupportModal";
import { useRouter } from "next/navigation";

// Type for FAQ
interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
}

// Type for API Response
interface FAQResponse {
  data: {
    faqs: FAQ[];
    limit: number;
    page: number;
    totalFAQ: number;
    totalPages: number;
  };
  isSuccess: boolean;
  message: string;
}

// Type for API Error Response
interface APIErrorResponse {
  message?: string;
  error?: string;
}

// API configuration
const API_URL = "https://api.brandsquare.store/api/faq/";

const SupportPage: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const router = useRouter();

  const handleReportIssue = () => {
    setShowContactModal(true);
  };

  const handleViewTicket = () => {
    router.push('/dashboard/support/ticket');
  }

  // Fetch FAQs using React Query
  const {
    data: faqData,
    isLoading,
    error,
  } = useQuery<FAQResponse, Error>({
    queryKey: ["faqs"],
    queryFn: async () => {
      // Get the token from cookies
      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      try {
        const response: AxiosResponse<FAQResponse> = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            "Content-Type": "application/json",
          },
        });

        // Log full response for debugging
        console.log("Full API Response:", response);
        console.log("Response Data:", response.data);

        return response.data;
      } catch (error) {
        // Type-safe error handling
        if (error instanceof AxiosError) {
          // Log detailed error information
          const apiError = error.response?.data as APIErrorResponse;
          console.error("API Error Details:", {
            message: error.message,
            responseData: apiError,
            status: error.response?.status,
            headers: error.config?.headers,
          });

          // Show user-friendly toast
          toast.error(
            apiError?.message || "Failed to load FAQs. Please try again later."
          );
        }

        throw error;
      }
    },
    retry: 1, // Limit retry attempts
    staleTime: 10 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Extract FAQs from the response
  const faqs = faqData?.data?.faqs || [];

  return (
    <>
      <div className="min-h-screen bg-gray-50 lg:px-[2%]">
        {/* Banner Section */}
        <div className="relative rounded-lg bg-[#B0CAF2] text-white py-7 px-4 md:px-8 lg:px-12">
          <div className="w-[5rem] aspect-square sm:w-[12rem] md:w-[5rem]">
            <Image
              src={"/assets/images/Frame_logo.png"}
              alt="logo"
              width={60}
              height={60}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="max-w-2xl mt-4 mb-6">
            <h1 className="text-2xl sm:text-3xl text-[#000051] font-bold mb-2 md:mb-4">
              Welcome to Brandsquare Support Center
            </h1>
            <p className="text-gray-900 lg:w-[50%] text-sm sm:text-base">
              We have curated helpful materials so you can navigate our platform
              with ease
            </p>
          </div>

          {/* Responsive button container - side by side on all screens */}
          <div className="flex flex-row gap-2 md:gap-3 mt-6 lg:absolute lg:bottom-6 lg:right-6">
            <Button
              className="bg-[#D4E6FF] hover:text-white border-none py-2 md:py-3 flex-1 lg:flex-initial text-[#000051] text-xs sm:text-sm md:text-base"
              onClick={handleViewTicket}
            >
              <Settings className="mr-1 md:mr-2" size={16} />
              <span className="whitespace-nowrap">View Customer Ticket</span>
            </Button>
            <Button
              className="bg-[#000051] py-2 md:py-3 flex-1 lg:flex-initial text-white text-xs sm:text-sm md:text-base"
              onClick={handleReportIssue}
            >
              <Globe className="mr-1 md:mr-2" size={16} />
              <span className="whitespace-nowrap">Report Issue</span>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-full py-8 md:py-12 px-4">
          <h2 className="text-xl text-start md:text-2xl font-bold mb-6 md:mb-6">
            Articles
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin" size={48} />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Unable to load FAQs. Please try again later.
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq._id} value={`item-${faq._id}`}>
                  <AccordionTrigger
                    className="text-left font-semibold
                 text-base hover:no-underline text-gray-800"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* Add SupportModals component */}
        <SupportModals
          showContactModal={showContactModal}
          setShowContactModal={setShowContactModal}
          showTicketModal={showTicketModal}
          setShowTicketModal={setShowTicketModal}
        />
      </div>
      <Footer />
    </>
  );
};

export default SupportPage;
