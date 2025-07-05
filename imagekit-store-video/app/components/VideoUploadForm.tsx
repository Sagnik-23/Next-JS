"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload"; 

const VideoUploadForm = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Upload a Video 🎬</h1>

        {/* Upload Component */}
        <FileUpload
          fileType="video"
          onSuccess={(res) => setVideoUrl(res.url!)}
          onProgress={(percent) => setProgress(percent)}
        />

        {/* Progress Bar */}
        {progress > 0 && progress < 100 && (
          <div className="mt-6">
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1 text-center">{progress}% uploaded</p>
          </div>
        )}

        {/* Video Preview */}
        {videoUrl && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Preview</h2>
            <video
              src={videoUrl}
              controls
              className="w-full rounded-lg border border-gray-700 shadow"
            />
            <p className="text-xs mt-2 break-all">{videoUrl}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploadForm;
