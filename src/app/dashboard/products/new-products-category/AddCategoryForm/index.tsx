"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export const AddCategoryForm = () => {
  const [uploadedImages, setUploadedImages] = React.useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  React.useEffect(() => {
    console.log("images uploaded", uploadedImages);
  }, [uploadedImages]);

  return (
    <form
      // onSubmit={handlesubmit}
      className="grid md:grid-cols-2  items-start gap-3"
    >
      <Card>
        <CardHeader className="hidden">
          <CardTitle className="font-bold   text-[#2A2B2D]"></CardTitle>
        </CardHeader>

        <CardContent className=" pt-5 space-y-5">
          <div className="space-y-1">
            <Label className="text-sm text-[#2A2B2D] font-medium">
              Category name
            </Label>
            <Input
              // value={formData.name}
              name="name"
              // onChange={handleChange}
              placeholder="e.g Cleaning materials"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-sm text-[#2A2B2D] font-medium">
              Category description
            </Label>
            <textarea
              // value={formData.description}
              name="description"
              // onChange={handleChange}
              placeholder="Describe the category"
              id="desc"
              className="resize-none p-3 w-full h-[10rem] outline-none border rounded-md"
            ></textarea>
          </div>
          <div className="space-y-1">
            <Label className="text-sm text-[#2A2B2D] font-medium">
              Parent category
            </Label>
            {/* <textarea
              // value={formData.description}
              name="description"
              // onChange={handleChange}
              placeholder="Describe the category"
              id="desc"
              className="resize-none p-3 w-full h-[10rem] outline-none border rounded-md"
            ></textarea> */}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold  text-[#2A2B2D]">Images</CardTitle>
        </CardHeader>

        <CardContent>
          <ImageUploader
            previews={imagePreviews}
            setPreviews={setImagePreviews}
            setFiles={setUploadedImages}
          />
          <Button className="mt-8">Add category</Button>
        </CardContent>
      </Card>
    </form>
  );
};
