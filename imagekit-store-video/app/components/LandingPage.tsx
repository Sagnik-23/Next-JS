"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./VideoFeed";
import { IVideo } from "@/models/Video";

const LandingPage = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/video");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 text-black">
      {/* <Header /> */}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">
          Latest Videos
        </h1>

        {loading ? (
          <p className="text-center text-gray-200">Loading videos...</p>
        ) : (
          <VideoFeed videos={videos} />
        )}
      </main>
    </div>
  );
};

export default LandingPage;
