"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronsDown, Upload, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";

const socialFormat = {
  "Instagram Square (1:1)": {
    width: 1080,
    height: 1080,
    aspectRatio: "1:1",
  },

  "Instagram Portrait (4:5)": {
    width: 1080,
    height: 1350,
    aspectRatio: "4:5",
  },
  "X Post (Twitter) (16:9)": {
    width: 1200,
    height: 675,
    aspectRatio: "16:9",
  },
  "X Header (Twitter) (3:1)": {
    width: 1500,
    height: 500,
    aspectRatio: "3:1",
  },
  "Facebook Cover (205:78)": {
    width: 820,
    height: 312,
    aspectRatio: "205:78",
  },
};

type SocialFormat = keyof typeof socialFormat;

export default function SocialShare() {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Portrait (4:5)"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTranforming, setIsTranforming] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadImage) {
      setIsTranforming(true);
    }
  }, [selectedFormat, uploadImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFileUpload(droppedFile);
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    []
  );

  const handleFileUpload = async (file: File) => {
    setFileName(file.name);
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/image-upload", formData);

      if (res.status !== 200) {
        throw new Error("Failed to upload image");
      }

      const data = await res.data;
      setUploadImage(data.publicId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageRef.current) return;

    await fetch(imageRef.current.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl mt-6">
      <h1 className="text-5xl font-bold text-center mt-8">
        Social Media Image Creator
      </h1>{" "}
      <div className="card p-4 mt-12 rounded-xl">
        <div className="card-body p-4 ">
          <h2 className="mb-6 card-title text-xl items-center justify-center font-semibold flex">
            Upload Image{" "}
            <span className="ml-2">
              <ChevronsDown />
            </span>
          </h2>
          <div className="flex items-center justify-center mt-3">
            <div
              className={`relative border rounded-lg p-8 text-center transition-colors w-[500px] ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              <div className="flex flex-col items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <ImageIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-md font-medium">
                    {fileName ? fileName : "DRAG & DROP IMAGE HERE "}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    OR CLICK TO BROWSE
                  </p>
                </div>
                {fileName && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => {
                      setFileName("");
                      setUploadImage(null);
                    }}
                  >
                    REMOVE IMAGE
                  </Button>
                )}
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="mt-4 p-4 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-transparent text-primary text-sm animate-spin flex items-center justify-center border-t-primary rounded-full"></div>
                Uploading...
              </div>
            </div>
          )}

          {uploadImage && (
            <div>
              <h2 className="card-title text-center mt-8 text-xl font-semibold">
                SELECT SOCIAL MEDIA FORMAT
              </h2>
              <div className="form-control flex items-center justify-center mt-2">
                <Select
                  value={selectedFormat}
                  onValueChange={(value) =>
                    setSelectedFormat(value as SocialFormat)
                  }
                >
                  <SelectTrigger className="w-[600px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(socialFormat).map((format) => (
                      <SelectItem key={format} value={format}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <h3 className="text-center text-xl mt-8">Preview:</h3>
                <div className="flex items-center justify-center mt-4">
                  <div className="w-[400px] h-[400px] border-2 border-gray-200 dark:border-[#0a0a0a] overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
                    {isTranforming && <div></div>}
                    <CldImage
                      alt="Transformed Image"
                      width={socialFormat[selectedFormat].width}
                      height={socialFormat[selectedFormat].height}
                      sizes="100vvw"
                      src={uploadImage}
                      crop={"fill"}
                      aspectRatio={socialFormat[selectedFormat].aspectRatio}
                      gravity="auto"
                      ref={imageRef}
                      onLoad={() => setIsTranforming(false)}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mt-8">
                <Button onClick={handleDownload} className="px-6 py-6 text-md">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Download for {selectedFormat}
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
