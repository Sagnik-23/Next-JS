"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-white tracking-tight">
          Upload Your Reel
        </h1>

        <p className="text-center text-slate-300 mb-6 text-sm">
          Share your creative vision with the world. Fill in the details and upload your masterpiece!
        </p>

        <VideoUploadForm />
      </div>
    </div>
  );
}
