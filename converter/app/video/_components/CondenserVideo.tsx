"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomDropzone from "./CustomDropzone";
import { acceptedVideoFormats } from "@/utils/formats";

const CondenserVideo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <motion.div
      className="col-span-1 lg:col-span-5 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-md shadow-lg p-6 transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Upload Video File
      </h2>

      <CustomDropzone handleUpload={handleUpload} acceptedFiles={acceptedVideoFormats} />

      {selectedFile && (
        <div className="mt-6 bg-gray-800/40 rounded-xl p-4 text-white">
          <h3 className="font-semibold text-white/80 mb-2">File Preview:</h3>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">Name:</span> {selectedFile.name}
            </p>
            <p>
              <span className="font-medium">Size:</span>{" "}
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <p>
              <span className="font-medium">Type:</span> {selectedFile.type || "Unknown"}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CondenserVideo;
