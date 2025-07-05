"use client";

import { useRef, useState, useEffect } from "react";
import { IVideo } from "@/models/Video";
import Link from "next/link";

export default function VideoComponent({ video }: { video: IVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // percent (0-100)
  const [duration, setDuration] = useState(0); // in seconds

  const handlePlayPause = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    setProgress((vid.currentTime / vid.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (vid?.duration) {
      setDuration(vid.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = videoRef.current;
    if (!vid || !duration) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    vid.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  const videoUrl = `${process.env.NEXT_PUBLIC_URL_ENDPOINT}/${video.videoUrl}`;

  return (
    <div className="hover:shadow-lg shadow-gray-400 transition-all duration-300 bg-white rounded-lg overflow-hidden">
      <figure className="relative">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-auto object-cover aspect-[9/16]"
          controls={false}
          playsInline
          muted
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="absolute bottom-3 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Seek Slider */}

      </figure>

      <div className="">
        <div className=" bottom-4 flex items-center gap-2">

          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            className="w-full accent-slate-900"
            min={0}
            max={100}
            step={0.1}
          />
        </div>
        <div className="p-4">
          <Link
            href={`/videos/${video._id}`}
            className="block hover:underline font-semibold text-sm"
          >
            {video.title}
          </Link>
          <p className="text-gray-600 text-xs mt-1 line-clamp-2">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}
