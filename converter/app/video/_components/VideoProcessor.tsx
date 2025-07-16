"use client";
import React, { useEffect, useState } from "react";


const VideoProcessor = () => {
  const [ready, setReady] = useState(false);
  const [ffmpeg, setFfmpeg] = useState<any>(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const ffmpegInstance = new FFmpeg();
      await ffmpegInstance.load();
      setFfmpeg(ffmpegInstance);
      setReady(true);
    };

    loadFFmpeg();
  }, []);

  return (
    <div>
      {ready ? <p>FFmpeg Ready!</p> : <p>Loading FFmpeg...</p>}
    </div>
  );
};

export default VideoProcessor;
