"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useNewsletterSubscription } from "@/lib/customHooks/useNewsLetterSubscription";

interface NewsletterFormProps {
  className?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({
    text: "",
    type: "",
  });

  // Use our custom hook
  const { subscribe, isLoading } = useNewsletterSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // Basic validation
    if (!email || !name) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    try {
      // Use the subscribe function from our custom hook
      const result = await subscribe({ name, email });

      if (result.success) {
        // setMessage({ text: result.message, type: "success" });
        toast.success("Subscribed successfully!");

        // Reset form fields
        setEmail("");
        setName("");
      } else {
        setMessage({ text: result.message, type: "error" });
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error during newsletter subscription:", error);
      setMessage({
        text: "An unexpected error occurred. Please try again.",
        type: "error",
      });
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`bg-[#000051] py-[15%] relative lg:py-[5%] text-white lg:grid lg:place-content-center rounded-lg shadow-lg p-6 pb-[25%] md:pb-[12%] lg:pb-[10%] md:p-8 ${className}`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="grid place-content-center">
          <h2 className="text-[5vw] md:text-2xl m-auto font-bold mb-2 text-center w-[50vw] lg:text-4xl lg:w-auto">
            Be the first to know about our best offers
          </h2>
          <p className="text-sm tracking-wide mx-auto md:text-base mb-6 text-[#FFFFFF] text-center lg:w-[70%]">
            Join our mailing list and be the first to know about discounts
            offers, exclusive deals, and new arrivals!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 lg:m-auto place-content-center lg:w-[70%]"
        >
          <div className="grid grid-cols-1 gap-4 mb-[4vh]">
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                placeholder="Your name"
              />
            </div>
            <div className="mt-[1vh]">
              <label
                htmlFor="email"
                className="block text-base font-medium mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white bg-white text-gray-800 placeholder-gray-400"
                placeholder="Your email address"
              />
            </div>
          </div>

          {message.text && (
            <div
              className={`text-sm p-2 rounded ${
                message.type === "success"
                  ? "bg-green-600/20 text-green-200"
                  : "bg-red-600/20 text-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#000051] w-full md:w-[40%] text-white px-6 py-3 rounded-xl font-medium border-2 border-white hover:bg-[#000080] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#000051] disabled:opacity-70 xl:w-[40%]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2
                    className="animate-spin mr-2"
                    width={16}
                    height={16}
                  />
                  Subscribing...
                </span>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="aspect-square lg:hidden absolute right-[10%] bottom-[0.2vh]">
        <Image
          src={"/assets/newDesignAssets/baloons.png"}
          alt="Assets"
          width={80}
          height={80}
          className=" "
        />
      </div>
      <div className="aspect-square hidden lg:block absolute lg:bottom-[12%] lg:left-[10%]">
        <Image
          src={"/assets/newDesignAssets/baloons.png"}
          alt="Assets"
          width={100}
          height={100}
          className=" "
        />
      </div>
      <div className="aspect-square hidden lg:block absolute lg:top-[17%] xl:top-[14%] lg:left-[5%] xl:left-[10%]">
        <Image
          src={"/assets/newDesignAssets/card.png"}
          alt="Assets"
          width={100}
          height={100}
          className=""
        />
      </div>
      <div className="aspect-square lg:hidden absolute top-[31%] right-[10%]">
        <Image
          src={"/assets/newDesignAssets/Group.png"}
          alt="Assets"
          width={80}
          height={80}
          className=""
        />
      </div>
      <div className="aspect-square hidden lg:block absolute lg:top-[17%] xl:top-[14%] lg:right-[10%]">
        <Image
          src={"/assets/newDesignAssets/Group.png"}
          alt="Assets"
          width={100}
          height={100}
          className=""
        />
      </div>
    </div>
  );
};

export default NewsletterForm;
