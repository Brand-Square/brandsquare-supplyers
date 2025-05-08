import React from "react";

import { useState, useRef } from "react";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../button";

interface ImageUploaderProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  previews?: string[];
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ImageUploader({
  setFiles,
  setPreviews,
  previews,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: File[] = [];
    // const newPreviews: string[] = [];
    const maxFileSize = 1 * 1024 * 1024; // 1MB in bytes
    const isImage = (file: File) => file.type.startsWith("image/");

    Array.from(selectedFiles).forEach((file) => {
      if (!isImage(file)) return;

      if (file.size > maxFileSize) {
        alert(`"${file.name}" is too large. Max file size is 1MB.`);
        return;
      }

      newFiles.push(file);

      // Create preview for each valid file
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviews((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
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
    handleFileChange(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center flex-wrap gap-3">
      <div
        className={`border-2 grow grid h-[10rem] place-items-center pb-3 px-5 border-dashed rounded-xl ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleInputChange}
          accept="image/*"
          className="hidden"
        />

        <div
          className="flex flex-col items-center justify-center  cursor-pointer"
          onClick={handleClick}
        >
          <div className="bg-gray-100 p-4 rounded-full mb-3">
            <CloudUpload className="h-6 w-6 text-gray-500" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">
              <span className="text-yellow-500">Click to upload</span> or drag
              and drop
            </p>
            <p className="text-sm text-gray-500 mt-1">
              SVG, PNG, JPG or GIF (max. 800×400px)
            </p>
          </div>
        </div>
      </div>
      {previews &&
        previews.map((preview, index) => (
          <div
            key={index}
            className="relative shadow size-[10rem] bg-neutral-100 rounded-lg"
          >
            <Image
              src={preview || "/placeholder.svg"}
              width={500}
              height={400}
              className="w-full h-full object-cover rounded-lg"
              alt={`Preview ${index + 1}`}
            />
            <Button
              variant="outline"
              size="icon"
              type="button"
              className="absolute top-2 -right-2 rounded-full bg-white shadow-md hover:bg-gray-100"
              onClick={() => removeImage(index)}
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      {/* <div className=" size-[10rem] bg-neutral-100 rounded-lg"></div> */}
    </div>
  );
}
