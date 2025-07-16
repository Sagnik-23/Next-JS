"use client";
import Link from "next/link";

export default function Home() {

  const handleFileDrop = (file: File) => {
    console.log("File dropped:", file);
    // Upload or process the file here
  };

  const options = [
    { label: "Image", value: "image", comingSoon: true },
    { label: "Video", value: "video", comingSoon: false },
    { label: "Audio", value: "audio", comingSoon: true },
    { label: "Document", value: "document", comingSoon: true },
  ];


  return (
    <>
      <div className="text-white px-4 pt-40 bg-slate-950">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-7 p-2">

            Modify & Convert Files Effortlessly
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Midifior helps you transform your files—convert formats, optimize content, and streamline your digital workflow in one place.
          </p>

          {/* <button className="bg-white text-slate-950 px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-gray-100 transition">
            Get Started
          </button> */}
        </section>
        <section className="mt-14 max-w-3xl mx-auto">
          <h2 className="flex text-2xl font-semibold mb-4 justify-center ">Select File Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {options.map((option) => (
              <div
                key={option.value}
                className={`flex justify-between items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center relative ${option.comingSoon ? "opacity-60 cursor-not-allowed" : "hover:bg-white/10 transition"
                  }`}
              >
                {option.comingSoon ? (
                  <>
                    <span className="text-lg font-medium">{option.label}</span>
                    <span className="text-xs mt-1 text-slate-400 block">Coming Soon</span>
                  </>
                ) : (
                  <Link
                    href={`/${option.value}`}
                    className="text-lg font-medium text-white"
                  >
                    {option.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

        </section>
        {/* <Dropzone onFileAccepted={handleFileDrop}/> */}
        <section className="mt-16 w-full max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-10 shadow-md flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">What can Midifior do?</h2>
              <ul className="text-gray-300 space-y-2 text-sm md:text-base list-disc list-inside">
                <li>Convert audio/video/image files across formats</li>
                <li>Compress and optimize media without quality loss</li>
                <li>Batch process multiple files at once</li>
                <li>Fast, secure & privacy-first</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full h-40 md:h-52 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                File Preview / UI Mockup
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-sm text-gray-500 text-center p-4">
          © {new Date().getFullYear()} Midifior. All rights reserved.
        </footer>
      </div>
    </>
  );
}
