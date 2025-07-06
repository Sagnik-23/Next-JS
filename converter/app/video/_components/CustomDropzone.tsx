"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { FiUploadCloud } from "react-icons/fi";

type VideoProps = {
  handleUpload: (file: File) => void;
  acceptedFiles: { [key: string]: string[] };
  disabled?: boolean;
};

const CustomDropzone = ({ handleUpload, acceptedFiles, disabled }: VideoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = (files: File[]) => {
    if (files.length > 0) {
      handleUpload(files[0]);
      setIsHovered(false);
    }
  };

  const onError = (error: Error) => {
    console.error("Dropzone error:", error);
    toast.error(`Error: ${error.message}`, {
      description: "Please try again or contact support if the issue persists.",
      duration: 2000,
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsHovered(true),
    onDragLeave: () => setIsHovered(false),
    onError,
    accept: acceptedFiles,
    disabled,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`transition-all duration-300 cursor-pointer border-2 border-dashed rounded-xl px-6 py-10 flex flex-col items-center justify-center text-center ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : isDragActive || isHovered
          ? "border-blue-500 bg-blue-500/10"
          : "border-gray-500/30 bg-white/5 hover:border-blue-400 hover:bg-white/10"
      }`}
    >
      <input {...getInputProps()} />

      <FiUploadCloud className="text-4xl text-white/70 mb-4" />

      <p className="text-sm text-white/70">
        <strong>Drag & drop</strong> your file here, or <strong>click to browse</strong>
      </p>
      <p className="text-xs text-gray-400 mt-2">Supported formats: mp4, avi, mov, etc.</p>
    </div>
  );
};

export default CustomDropzone;
