"use client";

import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import Toast from "../ui/ToastContainer";


export default function ProductRequest() {
  const [file, setFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];

    // Validate file type
    const validTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/gif",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload SVG, PNG, JPG or GIF files only");
      return;
    }

    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size should not exceed 5MB");
      return;
    }

    // Validate file size (800x400px max)
    const img = document.createElement("img");
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      if (img.width > 800 || img.height > 400) {
        toast.info("Image dimensions may be resized to fit");
        console.log("Image dimensions must be 800x400px or smaller");
        // toast({
        //   title: "Image too large",
        //   description: "Image dimensions must be 800x400px or smaller",
        //   variant: "destructive",
        // });
        URL.revokeObjectURL(img.src);
        return;
      }
      setFile(selectedFile);
    };

    // Validate image dimensions
    // const img = document.createElement("img");
    // img.src = URL.createObjectURL(selectedFile);
    // img.onload = () => {
    //   if (img.width > 800 || img.height > 400) {
    //     toast.info("Image dimensions may be resized to fit");
    //   }
    //   setFile(selectedFile);
    // };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/svg+xml": [".svg"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    console.log("Form data to be submitted:", Object.fromEntries(formData));

    // Simulate API request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Product request submitted successfully!");

      // Reset form or redirect
      setTimeout(() => {
        router.push("/product-sourcing");
      }, 2000);
    } catch (error) {
      toast.error("Failed to submit product request");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container px-4 py-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center">
            <Link
              href="/product-sourcing"
              className="mr-3 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
            <h1 className="text-xl font-semibold">Request a product</h1>
          </div>

          <Card>
            <CardContent className="p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="product-name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Product name*
                  </label>
                  <Input
                    id="product-name"
                    name="productName"
                    placeholder="e.g Eleganza"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="color"
                    className="text-sm font-medium text-gray-700"
                  >
                    Colour
                  </label>
                  <Input
                    id="color"
                    name="color"
                    placeholder="e.g Red"
                    className="w-full"
                    type="color"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pack-size"
                    className="text-sm font-medium text-gray-700"
                  >
                    Pack size*
                  </label>
                  <Select name="packSize">
                    <SelectTrigger id="pack-size">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={handleDecrement}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 1)
                      }
                      className="w-20 text-center"
                      min="1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={handleIncrement}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div
                    {...getRootProps()}
                    className={`rounded-lg border-2 border-dashed border-gray-200 p-8 transition-colors ${
                      isDragActive ? "border-yellow-400 bg-yellow-50" : ""
                    }`}
                  >
                    <input {...getInputProps()} name="image" />
                    {file ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Image
                            src={
                              URL.createObjectURL(file) || "/placeholder.svg"
                            }
                            alt="Preview"
                            width={40}
                            height={40}
                            className="rounded object-cover"
                          />
                          <span className="text-sm text-gray-600">
                            {file.name}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
                        <Upload className="mb-4 h-8 w-8 text-gray-400" />
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="text-yellow-400">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            SVG, PNG, JPG or GIF (max. 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                  >
                    Description*
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="State your specifications"
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-center text-sm font-medium text-yellow-400">
                    OR UPLOAD A DOCUMENT
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0A0E4F] text-white hover:bg-[#0A0E4F]/90"
                  >
                    {isSubmitting ? "Submitting..." : "Request a product"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Toast />
    </div>
  );
}

// "use client";

// import { ArrowLeft, Upload, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// export default function ProductRequest() {
//   const [file, setFile] = useState<File | null>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const selectedFile = acceptedFiles[0];

//     // Validate file type
//     const validTypes = [
//       "image/svg+xml",
//       "image/png",
//       "image/jpeg",
//       "image/gif",
//     ];
//     if (!validTypes.includes(selectedFile.type)) {
//       console.log("Please upload SVG, PNG, JPG or GIF files only");
//       //   toast({
//       //     title: "Invalid file type",
//       //     description: "Please upload SVG, PNG, JPG or GIF files only",
//       //     variant: "destructive",
//       //   });
//       return;
//     }

  //   // Validate file size (800x400px max)
  //   const img = document.createElement("img");
  //   img.src = URL.createObjectURL(selectedFile);
  //   img.onload = () => {
  //     if (img.width > 800 || img.height > 400) {
  //       console.log("Image dimensions must be 800x400px or smaller");
  //       // toast({
  //       //   title: "Image too large",
  //       //   description: "Image dimensions must be 800x400px or smaller",
  //       //   variant: "destructive",
  //       // });
  //       URL.revokeObjectURL(img.src);
  //       return;
  //     }
  //     setFile(selectedFile);
  //   };
  // }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/svg+xml": [".svg"],
//       "image/png": [".png"],
//       "image/jpeg": [".jpg", ".jpeg"],
//       "image/gif": [".gif"],
//     },
//     maxFiles: 1,
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}

//       {/* Main Content */}
//       <main className="container px-4 py-6">
//         <div className="mx-auto max-w-2xl">
//           <div className="mb-6 flex items-center">
//             <Link
//               href="#"
//               className="mr-3 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//             </Link>
//             <h1 className="text-xl font-semibold">Request a product</h1>
//           </div>

//           <Card>
//             <CardContent className="p-6">
//               <form className="space-y-6">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="product-name"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Product name
//                   </label>
//                   <Input
//                     id="product-name"
//                     placeholder="e.g Eleganza"
//                     className="w-full"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="color"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Colour
//                   </label>
//                   <Input id="color" placeholder="e.g Red" className="w-full" />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="pack-size"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Pack size
//                   </label>
//                   <Select>
//                     <SelectTrigger id="pack-size">
//                       <SelectValue placeholder="Select" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="small">Small</SelectItem>
//                       <SelectItem value="medium">Medium</SelectItem>
//                       <SelectItem value="large">Large</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="quantity"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Quantity
//                   </label>
//                   <div className="flex items-center space-x-2">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-9 w-9"
//                     >
//                       -
//                     </Button>
//                     <Input
//                       type="number"
//                       id="quantity"
//                       defaultValue="1"
//                       className="w-20 text-center"
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-9 w-9"
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <div
//                     {...getRootProps()}
//                     className={`rounded-lg border-2 border-dashed border-gray-200 p-8 transition-colors ${
//                       isDragActive ? "border-yellow-400 bg-yellow-50" : ""
//                     }`}
//                   >
//                     <input {...getInputProps()} />
//                     {file ? (
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <Image
//                             src={
//                               URL.createObjectURL(file) || "/placeholder.svg"
//                             }
//                             alt="Preview"
//                             width={40}
//                             height={40}
//                             className="rounded object-cover"
//                           />
//                           <span className="text-sm text-gray-600">
//                             {file.name}
//                           </span>
//                         </div>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setFile(null);
//                           }}
//                         >
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-center justify-center text-center">
//                         <Upload className="mb-4 h-8 w-8 text-gray-400" />
//                         <div className="space-y-1">
//                           <p className="text-sm">
//                             <span className="text-yellow-400">
//                               Click to upload
//                             </span>{" "}
//                             or drag and drop
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             SVG, PNG, JPG or GIF (max. 800x400px)
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="description"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Description
//                   </label>
//                   <Textarea
//                     id="description"
//                     placeholder="State your specifications"
//                     className="min-h-[120px]"
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   <p className="text-center text-sm font-medium text-yellow-400">
//                     OR UPLOAD A DOCUMENT
//                   </p>
//                   <Button
//                     type="submit"
//                     className="w-full bg-[#0A0E4F] text-white hover:bg-[#0A0E4F]/90"
//                   >
//                     Request a product
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// }
