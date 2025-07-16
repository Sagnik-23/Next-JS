"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomDropzone from "./CustomDropzone";
import { acceptedVideoFormats } from "@/utils/formats";
import { FileActions, QualityType, VideoFormats, VideoInputSettings } from "@/utils/types";
import { VideoDisplay } from "./VideoDisplay";
import { VideoTrim } from "./VideoTrim";
import VideoInput from "./VideoInput";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { toast } from "sonner";
import convertFile from "@/utils/convert";
import { VideoProgressCondense } from "./VideoProgressCondense";
import { VideoOutputDetails } from "./VideoOutputDetails";



const CondenserVideo = () => {
  const [selectedFile, setSelectedFile] = useState<FileActions>();
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{
    startTime?: number;
    elapsedSeconds?: number;
  }>({ elapsedSeconds: 0 });
  const [status, setStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [videoSettings, setVideoSettings] = useState<VideoInputSettings>({
    quality: QualityType.High,
    videoType: VideoFormats.MP4,
    customEndTime: 100,
    customStartTime: 0,
    removeAudio: false,
    twitterCompressionComand: false,
    whatsappCompressionComand: false,
    duration: 100,
  });

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = url;

    video.onloadedmetadata = () => {
      const duration = video.duration;

      setSelectedFile({
        fileName: file.name,
        fileSize: file.size,
        from: file.name.slice(0, file.name.lastIndexOf(".")),
        fileType: file.type || "Unknown",
        file,
        isError: false,
      });

      setVideoSettings({
        quality: QualityType.High,
        videoType: VideoFormats.MP4,
        customStartTime: 0,
        customEndTime: duration,
        removeAudio: false,
        twitterCompressionComand: false,
        whatsappCompressionComand: false,
        duration, // Actual video duration
      });

      URL.revokeObjectURL(url); // cleanup
    };
  };

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (time?.startTime) {
      timer = setInterval(() => {
        setTime((prev) => ({
          ...prev,
          elapsedSeconds: Math.floor((Date.now() - (prev.startTime || Date.now())) / 1000),
        }));
      }, 1000);
    }
  }, [time])
  const ffmpegRef = useRef(new FFmpeg());
  const disabledDuringCompression = status === "processing";

  const loadFFmpeg = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL("/download/ffmpeg-core.js", "text/javascript"),
      wasmURL: await toBlobURL("/download/ffmpeg-core.wasm", "application/wasm"),
    });
  }

  const loadWithToast = () => {
    toast.promise(loadFFmpeg(), {
      loading: "Loading FFmpeg...",
      success: "FFmpeg loaded successfully!",
      error: "Failed to load FFmpeg",
    });
  }

  useEffect(() => loadWithToast(), []);

  const handleCompress = async () => {
    if (!selectedFile) return;
    try {
      setTime({ startTime: Date.now(), elapsedSeconds: 0 });
      setStatus("processing");
      ffmpegRef.current.on("progress", ({ progress }) => {
        const percentage = (progress) * 100;
        console.log("Progress:", percentage);
        setProgress(percentage);
      });
      ffmpegRef.current.on("log", (message) => {
        console.log("FFmpeg log:", message);
      });
      const { url, outputFileName, outputBlob } = await convertFile(ffmpegRef.current, selectedFile, videoSettings);
      setSelectedFile({
        ...selectedFile,
        url,
        output: outputFileName,
        outputBlob,
      });
      setTime((prev) => ({
        ...prev,
        elapsedSeconds: Math.floor((Date.now() - (prev.startTime || Date.now())) / 1000),
      }));
      setProgress(100);
      toast.success("Video compression completed successfully!");
      setStatus("completed");
    } catch (error) {
      console.error("Error during compression:", error);
      toast.error("Compression failed. Please try again.");
      setStatus("idle");
      return;
    }
  }


  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 items-start">
      {/* Left side: Video display */}
      <motion.div
        className="lg:w-1/2 w-full rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-md shadow-lg p-6 transition-all duration-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          Upload Video File
        </h2>

        {selectedFile ? (
          <VideoDisplay videoUrl={URL.createObjectURL(selectedFile.file)} />
        ) : (
          <CustomDropzone handleUpload={handleUpload} acceptedFiles={acceptedVideoFormats} />
        )}
      </motion.div>

      {/* Right side: Controls and Output */}
      <AnimatePresence mode="popLayout">
        {selectedFile && (
          <motion.div
            className="lg:w-1/2 w-full relative rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-md shadow-md p-4 space-y-4 overflow-auto"
          >
            {(status === "idle" || status === "processing") && (
              <div className="flex flex-col space-y-4 bg-slate-800 backdrop-blur-lg rounded-lg p-4 mb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white/90">Selected File</h3>
                    <p className="text-xs text-gray-400 truncate max-w-[12rem]">{selectedFile.fileName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(selectedFile.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(undefined)}
                    className="px-3 py-1.5 rounded-md bg-slate-200 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <VideoTrim
              disabled={disabledDuringCompression}
              onVideoSettingsChange={setVideoSettings}
              videoSettings={videoSettings}
            />
            <VideoInput
              videoSettings={videoSettings}
              onVideoSettingsChange={setVideoSettings}
              disabled={disabledDuringCompression}
            />
            {status === "processing" && (
              <VideoProgressCondense progress={progress} seconds={time.elapsedSeconds ?? 0} />
            )}
            {(status === "idle" || status === "completed") && (
              <button
                onClick={handleCompress}
                className="px-3 py-1.5 rounded-md bg-slate-200 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer w-full"
              >
                Compress Video
              </button>
            )}

            {status === "completed" && (
              <VideoOutputDetails videoFile={selectedFile} timeTaken={time.elapsedSeconds} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

};

export default CondenserVideo;
