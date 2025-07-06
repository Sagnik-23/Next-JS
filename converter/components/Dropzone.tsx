"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type DropzoneProps = {
  onFileAccepted: (file: File) => void;
};

const Dropzone: React.FC<DropzoneProps> = ({ onFileAccepted }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]); // handle first file
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    noClick: false,
    noKeyboard: false,
    accept: {
      "*/*": [], // Accept all file types
    },
  });

  const selectedFile = acceptedFiles[0];

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-xl mx-auto cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-white text-center transition duration-300 mt-10 ${
        isDragActive ? "bg-white/10 border-blue-400" : ""
      }`}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center space-y-3">
        <svg
          className="w-10 h-10 text-white/60"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 4.5A4.5 4.5 0 0015.5 8H15a5 5 0 00-9.9.75A3.75 3.75 0 006 16h12z"
          />
        </svg>
        <p className="text-white/70">
          {isDragActive ? "Drop your file here..." : "Drag & drop any file or click to select"}
        </p>

        {selectedFile && (
          <div className="text-white/80 mt-3 text-sm">
            <p>
              <strong>{selectedFile.name}</strong>
            </p>
            <p>{(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
