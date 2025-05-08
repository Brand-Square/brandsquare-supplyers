"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import useInitAuthStore from "@/app/store/InitAuthStore";
import Link from "next/link";
import Image from "next/image";

export default function TermsAndConditions() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();
  const { setTermsAccepted, checkTermsAccepted } = useInitAuthStore();

  useEffect(() => {
    // Check if terms were already accepted
    if (checkTermsAccepted()) {
      setAccepted(true);
    }
  }, [checkTermsAccepted]);

  const handleTermsAccept = () => {
    setAccepted(true);
    setTermsAccepted(true);
    
    // Always navigate back to create account page
    router.push('/auth/create-account');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        {accepted ? (
          <AcceptedState />
        ) : (
          <Card className="w-full shadow-sm">
            <CardHeader className="flex flex-col items-center space-y-2 pb-6">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/icons/bransquare-logo.svg"
                  alt="Brandsquare Logo"
                  width={230}
                  height={70}
                  className="h-8 w-auto"
                />
              </Link>
              <CardTitle className="text-xl md:text-2xl text-center">
                Brandsquare Supplier Terms and Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base space-y-6 pb-8">
              <p className="text-gray-600">
                These Terms and Conditions (&quot;Terms&quot;) govern the
                relationship between Brandsquare and its Chinese suppliers
                (&quot;Supplier&quot;). By engaging with Brandsquare, the
                Supplier agrees to comply with these Terms.
              </p>

              <div className="space-y-2">
                <h3 className="font-semibold text-base md:text-lg">
                  1. Definitions
                </h3>
                <p>
                  <span className="font-medium">Brandsquare:</span> Refers to
                  the Brandsquare Company, which operates an e-commerce
                  platform.
                </p>
                <p>
                  <span className="font-medium">Supplier:</span> Refers to the
                  Chinese company providing products to Brandsquare.
                </p>
                <p>
                  <span className="font-medium">Products:</span> Refers to the
                  goods supplied by the Supplier for sale on the Brandsquare
                  e-commerce platform.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-base md:text-lg">
                  2. Roles and Responsibilities
                </h3>
                <div className="pl-4 space-y-2">
                  <h4 className="font-medium">2.1 Role of the Supplier</h4>
                  <p>
                    <span className="font-medium">Quality Products:</span> The
                    Supplier shall provide quality and affordable products to
                    Brandsquare.
                  </p>
                  <p>
                    <span className="font-medium">Product Confirmation:</span>{" "}
                    The Supplier must provide product pictures and pricing to
                    Brandsquare for confirmation before shipment.
                  </p>

                  <h4 className="font-medium mt-4">2.2 Role of Brandsquare</h4>
                  <p>
                    <span className="font-medium">Receiving Products:</span>{" "}
                    Brandsquare will receive products when they arrive in
                    Nigeria and will send picture proof confirming all products
                    received.
                  </p>
                  <p>
                    <span className="font-medium">Product Photography:</span>{" "}
                    Brandsquare will take professional photos of the products,
                    edit them, and upload them to the e-commerce website.
                  </p>
                  <p>
                    <span className="font-medium">Marketing Campaigns:</span>{" "}
                    Brandsquare will set up weekly and monthly social media
                    campaigns to create awareness and engagement on the
                    e-commerce store.
                  </p>
                  <p>
                    <span className="font-medium">Onsite Marketing:</span>{" "}
                    Brandsquare will carry out onsite marketing to increase
                    product purchases from the e-commerce store.
                  </p>
                  <p>
                    <span className="font-medium">Event Organization:</span>{" "}
                    Brandsquare will organize events to onboard new wholesalers
                    to the platform.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-base md:text-lg">
                  3. Financial Responsibilities
                </h3>
                <div className="pl-4 space-y-2">
                  <h4 className="font-medium">3.1 Supplier Responsibilities</h4>
                  <p>
                    The Supplier is fully responsible for providing, branding,
                    and packaging the products before shipment to
                    Brandsquare&apos;s warehouse.
                  </p>

                  <h4 className="font-medium mt-4">
                    3.2 Brandsquare Responsibilities
                  </h4>
                  <p>
                    Brandsquare is responsible for all online and offline
                    advertising related to the products.
                  </p>
                  <p>
                    Brandsquare will handle shipping the products to customers.
                  </p>
                  <p>
                    Brandsquare is responsible for providing warehouse
                    facilities and maintenance.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-base md:text-lg">
                  4. Product Orders and Payment System
                </h3>
                <div className="pl-4 space-y-2">
                  <h4 className="font-medium">4.1 Sample Shipment</h4>
                  <p>
                    The Supplier shall first ship product samples to
                    Brandsquare&apos;s warehouse for product confirmation.
                    Brandsquare will take pictures of the samples and upload
                    them to the e-commerce store, then send a link to the
                    Supplier for confirmation of product placement.
                  </p>

                  <h4 className="font-medium mt-4">
                    4.2 Advertising and Product Listings
                  </h4>
                  <p>
                    Brandsquare will commence advertising using the product
                    samples sent by the Supplier while both parties finalize the
                    next set of products to be shipped.
                  </p>

                  <h4 className="font-medium mt-4">4.3 Commission Structure</h4>
                  <p>
                    Brandsquare will take a 13% commission on all sales made
                    from products supplied by the Supplier. For example, if a
                    product sold for RMB 500, Brandsquare will retain RMB 65 as
                    commission.
                  </p>

                  <h4 className="font-medium mt-4">4.4 Pricing</h4>
                  <p>
                    The product price listed on the website will be determined
                    solely by Brandsquare.
                  </p>

                  <h4 className="font-medium mt-4">4.5 Payment Process</h4>
                  <p>
                    Payments will be made to the Supplier in Naira through the
                    PingPong payment system. A 40% upfront payment will be made
                    to the Supplier before the products are shipped to
                    Brandsquare&apos;s warehouse. Upon receipt of the products
                    at Brandsquare&apos;s warehouse, the Supplier will be
                    notified via the suppliers dashboard. The remaining 60% will
                    be paid to the Supplier within three (3) weeks of receipt.
                  </p>

                  <h4 className="font-medium mt-4">4.6 Storage of Goods</h4>
                  <p>
                    Goods will remain in Brandsquare&apos;s warehouse until the
                    customer makes complete payment.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-base md:text-lg">
                  5. Agreement Acknowledgment
                </h3>
                <p>
                  By entering into this agreement, both Brandsquare and the
                  Supplier acknowledge that they understand their roles and
                  responsibilities as outlined in these Terms.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-base md:text-lg">
                  6. Contact Information
                </h3>
                <p>
                  For any questions or concerns regarding these Terms and
                  Conditions, please contact Brandsquare at:
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:support@brandsquare.store"
                    className="text-primary"
                  >
                    support@brandsquare.store
                  </a>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 pt-2 pb-6 px-6">
              <Button variant="outline" onClick={() => router.back()}>
                Back
              </Button>
              <Button
                onClick={handleTermsAccept}
              >
                Accept
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

function AcceptedState() {
  const router = useRouter();
  
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto mb-6">
        <Image
          src="/assets/icons/bransquare-logo.svg"
          alt="Brandsquare Logo"
          width={150}
          height={45}
          className="h-10 w-auto"
        />
      </div>
      
      <div className="bg-green-50 text-green-700 rounded-lg p-8 max-w-lg mx-auto">
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Terms Already Accepted</h2>
        <p className="mb-6">
          You have already accepted Brandsquare&apos;s Terms and Conditions.
        </p>
        <div className="flex justify-center">
          <Button onClick={() => router.push("/auth/create-account")}>
            Return to Account Creation
          </Button>
        </div>
      </div>
    </div>
  );
}
