"use client";

import type React from "react";
import { type ChangeEvent, useRef, useState, useEffect } from "react";
import { FileImage } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  name?: string;
  id?: string;
  className?: string;
}

export const VariantImageUpload: React.FC<ImageUploadProps> = ({
  onFileSelect,
  accept = "image/*",
  name = "image",
  id = "image-upload",
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createPreview = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxFileSize = 1 * 1024 * 1024; // 1MB in bytes

    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > maxFileSize) {
        alert(`"${file.name}" is too large. Max file size is 1MB.`);
        return;
      }

      onFileSelect?.(file);
      createPreview(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        onFileSelect?.(file);
        createPreview(file);
        if (fileInputRef.current) {
          // Create a DataTransfer object and add the file
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInputRef.current.files = dataTransfer.files;
        }
      }
    }
  };

  // Clean up the preview URL when the component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "size-[3rem] transition-all duration-300 bg-neutral-100 border border-dashed hover:bg-white  rounded-md flex items-center justify-center cursor-pointer overflow-hidden",
        isDragging ? "border-primary bg-neutral-200" : "border-neutral-300",
        className
      )}
      role="button"
      tabIndex={0}
      aria-label="Upload image"
    >
      {previewUrl ? (
        <Image
          src={previewUrl || "/assets/images/placeholder.svg"}
          alt="Preview"
          width={200}
          height={200}
          className="h-full w-full object-cover"
        />
      ) : (
        <FileImage className="size-5 text-neutral-500" />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="sr-only"
        name={name}
        id={id}
        aria-hidden="true"
      />
    </div>
  );
};
