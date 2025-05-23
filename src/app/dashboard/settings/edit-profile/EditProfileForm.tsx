"use client";
import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  uploadImage,
  useVendorProfile,
} from "@/app/store/useVendorProductStore";
import { toast } from "react-toastify";
import { cleanImageUrl } from '@/lib/customHooks/useCleanImageUrl'
import useInitAuthStore from "@/app/store/InitAuthStore";

// Sample countries
const COUNTRIES = [
  "Nigeria",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
  "Brazil",
];


const BUSINESS_TYPES = [
  { value: "limitedLiability", label: "Limited Liability" },
  { value: "partnership", label: "Partnership" },
  { value: "soleProprietorship", label: "Sole Proprietorship" },
];

export default function ProfileEditor() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Form state
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [complianceDocuments, setComplianceDocuments] = useState<File[]>([]);
  const [documentPreviews, setDocumentPreviews] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState({
    salesAlert: true,
    promotions: true,
  });



  // Form data
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    phoneNumber: "",
    businessType: "",
    taxIdentificationNumber: "",
    businessRegistrationNumber: "",
    businessAddress: "",
    country: "",
    state: "",
    city: "",
  });



  const { data: vendorProfileData } = useVendorProfile();

  useEffect(() => {
    if (vendorProfileData?.data) {
      const vendor = vendorProfileData.data;

      const cleanedComplianceDocs = vendor.complianceDocument
        ?.map(cleanImageUrl)
        .filter(Boolean) as string[] || [];
      setDocumentPreviews(cleanedComplianceDocs);


      setFormData({
        businessName: vendor.businessName || "",
        ownerName: vendor.ownerName || "",
        phoneNumber: vendor.phoneNumber || "",
        businessType: vendor.businessType || "",
        taxIdentificationNumber: vendor.taxIdentificationNumber || "",
        businessRegistrationNumber: vendor.businessRegistrationNumber || "",
        businessAddress: vendor.businessAddress || "",
        country: vendor.location?.country || "",
        state: vendor.location?.state || "",
        city: vendor.location?.city || "",
      });

      if (vendor.logo) {
        const cleanedLogo = cleanImageUrl(vendor.logo);
        if (cleanedLogo) {
          setLogoPreview(cleanedLogo);
        }
      }
    }
  }, [vendorProfileData]);



  const { updateVendorProfile, isUpdateProfileLoading, } = useInitAuthStore();

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle compliance document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setComplianceDocuments((prev) => [...prev, ...newFiles]);

      // Create previews
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setDocumentPreviews((prev) => [
              ...prev,
              event.target!.result as string,
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove compliance document
  const removeDocument = (index: number) => {
    setComplianceDocuments((prev) => prev.filter((_, i) => i !== index));
    setDocumentPreviews((prev) => prev.filter((_, i) => i !== index));
  };




  const isFormValid = () => {
    // Required fields validation
    const requiredFieldsValid =
      formData.businessName.trim() !== "" &&
      formData.ownerName.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.businessType.trim() !== "" &&
      formData.businessAddress.trim() !== "" &&
      formData.country.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.city.trim() !== "";

    // Phone number validation (basic - at least 6 digits)
    const phoneRegex = /\d{6,}/;
    const phoneValid = phoneRegex.test(formData.phoneNumber);

    // Business registration number validation (if provided)
    const registrationValid =
      formData.businessRegistrationNumber.trim() === "" ||
      formData.businessRegistrationNumber.trim().length >= 6;

    // Tax ID validation (if provided)
    const taxIdValid =
      formData.taxIdentificationNumber.trim() === "" ||
      formData.taxIdentificationNumber.trim().length >= 6;

    return (
      requiredFieldsValid &&
      phoneValid &&
      registrationValid &&
      taxIdValid
    );
  };


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();


  //   let logoUrl = "";
  //   if (logo) {
  //     try {
  //       const logoRes = await uploadImage([logo]);
  //       if (logoRes?.files?.[0]?.publicUrl) {
  //         logoUrl = logoRes.files[0].publicUrl;
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       toast.error("Failed to upload logo.");
  //       return;
  //     }
  //   }


  //   const existingDocumentUrls = documentPreviews
  //     .filter(preview => preview.startsWith('http'))
  //     .map(url => cleanImageUrl(url))
  //     .filter(Boolean) as string[];

  //   let newDocumentUrls: string[] = [];
  //   if (complianceDocuments.length > 0) {
  //     try {
  //       const docsRes = await uploadImage(complianceDocuments);
  //       newDocumentUrls = (docsRes?.files || []).map(
  //         (f: { publicUrl: string }) => f.publicUrl
  //       );
  //     } catch (err) {
  //       console.log(err);
  //       toast.error("Failed to upload compliance documents.");
  //       return;
  //     }
  //   }


  //   const allDocumentUrls = [...existingDocumentUrls, ...newDocumentUrls];


  //   const updateData = {
  //     businessName: formData.businessName,
  //     ownerName: formData.ownerName,
  //     phoneNumber: formData.phoneNumber,
  //     businessType: formData.businessType as
  //       | "limitedLiability"
  //       | "partnership"
  //       | "soleProprietorship",
  //     taxIdentificationNumber: formData.taxIdentificationNumber,
  //     businessRegistrationNumber: formData.businessRegistrationNumber,
  //     businessAddress: formData.businessAddress,
  //     location: {
  //       country: formData.country,
  //       state: formData.state,
  //       city: formData.city,
  //     },
  //     logo: logoUrl || vendorProfileData?.data?.logo || undefined,
  //     complianceDocument: allDocumentUrls.length > 0 ? allDocumentUrls : undefined,
  //     notificationPreferences: {
  //       salesAlert: notificationPreferences.salesAlert,
  //       promotions: notificationPreferences.promotions,
  //     },
  //   };

  //   try {
  //     await updateVendorProfile(updateData);
  //     toast.success("Profile updated successfully!");
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       toast.error(
  //         error.message || "Failed to update profile. Please try again."
  //       );
  //     } else {
  //       toast.error("Failed to update profile. Please try again.");
  //     }
  //   }
  // };

  // Handle client-side rendering


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let logoUrl = "";
    if (logo) {
      try {
        const logoRes = await uploadImage([logo]);
        if (logoRes?.files?.[0]?.publicUrl) {
          logoUrl = logoRes.files[0].publicUrl;
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to upload logo.");
        return;
      }
    }

    const existingDocumentUrls = documentPreviews
      .filter(preview => preview.startsWith('http'))
      .map(url => cleanImageUrl(url))
      .filter(Boolean) as string[];

    let newDocumentUrls: string[] = [];
    if (complianceDocuments.length > 0) {
      try {
        const docsRes = await uploadImage(complianceDocuments);
        newDocumentUrls = (docsRes?.files || []).map(
          (f: { publicUrl: string }) => f.publicUrl
        );
      } catch (err) {
        console.log(err);
        toast.error("Failed to upload compliance documents.");
        return;
      }
    }

    const allDocumentUrls = [...existingDocumentUrls, ...newDocumentUrls];

    const updateData = {
      businessName: formData.businessName,
      ownerName: formData.ownerName,
      phoneNumber: formData.phoneNumber,
      businessType: formData.businessType as
        | "limitedLiability"
        | "partnership"
        | "soleProprietorship",
      taxIdentificationNumber: formData.taxIdentificationNumber,
      businessRegistrationNumber: formData.businessRegistrationNumber,
      businessAddress: formData.businessAddress,
      location: {
        country: formData.country,
        state: formData.state,
        city: formData.city,
      },
      logo: logoUrl || vendorProfileData?.data?.logo || undefined,
      complianceDocument: allDocumentUrls.length > 0 ? allDocumentUrls : undefined,
      notificationPreferences: {
        salesAlert: notificationPreferences.salesAlert,
        promotions: notificationPreferences.promotions,
      },
    };

    try {
      const response = await updateVendorProfile(updateData);
      toast.success("Profile updated successfully!");

      if (response?.data?.isProfileComplete) {
        setShowSuccessMessage(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(
          error.message || "Failed to update profile. Please try again."
        );
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

// TODO:this is the success message
  if (showSuccessMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-white">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500 mx-auto"
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Congratulations!
          </h1>
          <p className="text-gray-600 mb-6">
            Your business information has been submitted successfully and is under review.
            Once approved, you will receive an email that permits you to start uploading
            your products and manage your business through dashboard.
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-900 hover:bg-blue-900/90">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return null;
  }

  // Mobile view
  if (isMobile) {
    return (
      <div className="flex flex-col bg-white">
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4">
          <div>
            {/* Page Header */}
            <Link href="/dashboard/settings">
              <div className="flex items-center mb-6">
                <ChevronLeft className="w-5 h-5 mr-2" />
                <h1 className="text-xl font-medium">Edit profile</h1>
              </div>
            </Link>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Basic Information</h2>

                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business Name*
                  </label>
                  <Input
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Owner Name*
                  </label>
                  <Input
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>



                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number*
                  </label>
                  <Input
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business Logo
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 relative">
                    {logoPreview ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative mb-2 w-20 h-20">
                          <Image
                            src={logoPreview}
                            alt="Logo Preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setLogo(null);
                            setLogoPreview(null);
                          }}
                          className="flex items-center text-gray-500 text-sm"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Clear Upload
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-50 p-3 rounded-full mb-2">
                          <Upload className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <span className="text-yellow-500 font-medium text-sm">
                            Click to upload
                          </span>
                          <span className="text-gray-500 text-sm">
                            {" "}
                            or drag and drop
                          </span>
                          <p className="text-xs text-gray-400 mt-1">
                            SVG, PNG, JPG or GIF (max. 800×400px)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleLogoUpload}
                          accept="image/*"
                          id="logo-upload-mobile"
                        />
                        <label
                          htmlFor="logo-upload-mobile"
                          className="absolute inset-0 cursor-pointer"
                        ></label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Details Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Business Details</h2>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business Type
                  </label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, businessType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tax Identification Number */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tax Identification Number
                  </label>
                  <Input
                    name="taxIdentificationNumber"
                    value={formData.taxIdentificationNumber}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Business Registration Number */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business Registration Number
                  </label>
                  <Input
                    name="businessRegistrationNumber"
                    value={formData.businessRegistrationNumber}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Business Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business Address
                  </label>
                  <Textarea
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Delivery Addresses */}

              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Location</h2>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country
                  </label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, country: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Province
                  </label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                </div>
              </div>

              {/* Product Categories Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Product Categories</h2>


              </div>

              {/* Compliance Documents Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Compliance Documents</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Documents
                  </label>

                  {/* Document Previews */}
                  {documentPreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {documentPreviews.map((preview, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-2">
                            <div className="relative h-24 mb-2">
                              <Image
                                src={preview || "/placeholder.svg"}
                                alt={`Document ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="w-full flex items-center justify-center text-red-500 text-sm"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Remove
                            </button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 relative">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-50 p-2 rounded-full mb-2">
                        <Upload className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <span className="text-yellow-500 font-medium text-xs">
                          Upload documents
                        </span>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, JPG, PNG (max 5MB each)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleDocumentUpload}
                        accept="image/*,.pdf"
                        multiple
                        id="document-upload-mobile"
                      />
                      <label
                        htmlFor="document-upload-mobile"
                        className="absolute inset-0 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">
                  Notification Preferences
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sales-alert">Sales Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your sales
                      </p>
                    </div>
                    <Switch
                      id="sales-alert"
                      checked={notificationPreferences.salesAlert}
                      onCheckedChange={(checked) =>
                        setNotificationPreferences((prev) => ({
                          ...prev,
                          salesAlert: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="promotions">Promotions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about promotions and offers
                      </p>
                    </div>
                    <Switch
                      id="promotions"
                      checked={notificationPreferences.promotions}
                      onCheckedChange={(checked) =>
                        setNotificationPreferences((prev) => ({
                          ...prev,
                          promotions: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-navy-blue hover:bg-navy-blue/90"
                  disabled={isUpdateProfileLoading || !isFormValid()}
                >
                  {isUpdateProfileLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="flex bg-white">
      {/* Main Content */}
      <div className="w-full flex flex-col">
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl">
            {/* Page Header */}
            <Link href="/dashboard/settings">
              <div className="flex items-center mb-6">
                <ChevronLeft className="w-5 h-5 mr-2" />
                <h1 className="text-2xl font-medium">Edit profile</h1>
              </div>
            </Link>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Basic Information</h2>

                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business Name*
                  </label>
                  <Input
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Owner Name*
                  </label>
                  <Input
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">


                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number*
                    </label>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business Logo
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-8 relative">
                    {logoPreview ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative mb-2 w-24 h-24">
                          <Image
                            src={logoPreview || "/placeholder.svg"}
                            alt="Logo Preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setLogo(null);
                            setLogoPreview(null);
                          }}
                          className="flex items-center text-gray-500 text-sm"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Clear Upload
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-50 p-3 rounded-full mb-2">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <span className="text-yellow-500 font-medium">
                            Click to upload
                          </span>
                          <span className="text-gray-500">
                            {" "}
                            or drag and drop
                          </span>
                          <p className="text-sm text-gray-400 mt-1">
                            SVG, PNG, JPG or GIF (max. 800×400px)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleLogoUpload}
                          accept="image/*"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="absolute inset-0 cursor-pointer"
                        ></label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Details Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Business Details</h2>

                <div className="grid grid-cols-2 gap-4">
                  {/* Business Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Business Type
                    </label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessType: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tax Identification Number */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tax Identification Number
                    </label>
                    <Input
                      name="taxIdentificationNumber"
                      value={formData.taxIdentificationNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Business Registration Number */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business Registration Number
                  </label>
                  <Input
                    name="businessRegistrationNumber"
                    value={formData.businessRegistrationNumber}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Business Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business Address
                  </label>
                  <Textarea
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Delivery Addresses */}

              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Location</h2>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country
                  </label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, country: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Province
                    </label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                    />
                  </div>
                </div>
              </div>



              {/* Compliance Documents Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Compliance Documents</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Documents
                  </label>

                  {/* Document Previews */}
                  {documentPreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      {/* {documentPreviews.map((preview, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-2">
                            <div className="relative h-32 mb-2">
                              <Image
                                src={preview || "/placeholder.svg"}
                                alt={`Document ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="w-full flex items-center justify-center text-red-500 text-sm"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Remove
                            </button>
                          </CardContent>
                        </Card>
                      ))} */}

                      {documentPreviews.map((preview, index) => (
                        preview ? (
                          <Card key={index} className="overflow-hidden">
                            <CardContent className="p-2">
                              <div className="relative h-24 mb-2">
                                <Image
                                  src={preview}
                                  alt={`Document ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeDocument(index)}
                                className="w-full flex items-center justify-center text-red-500 text-sm"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Remove
                              </button>
                            </CardContent>
                          </Card>
                        ) : null
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 relative">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-50 p-3 rounded-full mb-2">
                        <Upload className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <span className="text-yellow-500 font-medium">
                          Upload documents
                        </span>
                        <p className="text-sm text-gray-400 mt-1">
                          PDF, JPG, PNG (max 5MB each)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleDocumentUpload}
                        accept="image/*,.pdf"
                        multiple
                        id="document-upload"
                      />
                      <label
                        htmlFor="document-upload"
                        className="absolute inset-0 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sales-alert-desktop">Sales Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your sales
                      </p>
                    </div>
                    <Switch
                      id="sales-alert-desktop"
                      checked={notificationPreferences.salesAlert}
                      onCheckedChange={(checked) =>
                        setNotificationPreferences((prev) => ({
                          ...prev,
                          salesAlert: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="promotions-desktop">Promotions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about promotions and offers
                      </p>
                    </div>
                    <Switch
                      id="promotions-desktop"
                      checked={notificationPreferences.promotions}
                      onCheckedChange={(checked) =>
                        setNotificationPreferences((prev) => ({
                          ...prev,
                          promotions: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-900/90"
                  disabled={isUpdateProfileLoading || !isFormValid()}
                >
                  {isUpdateProfileLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
