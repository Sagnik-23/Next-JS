import React from 'react'

const AboutPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-4 py-8">
      <section className="max-w-2xl w-full bg-white/5 border border-gray-800 rounded-2xl shadow-lg p-8 backdrop-blur-md mt-25">
        <h1 className="text-3xl font-bold text-white mb-4">About Us</h1>
        <p className="text-lg text-gray-300 mb-6">
          Welcome to <span className="font-semibold text-white">Modifior</span>! Our mission is to make video and media conversion simple, fast, and accessible for everyone. Whether you need to compress, trim, or change the format of your videos, our platform provides an intuitive and secure solution.
        </p>
        <h2 className="text-xl font-semibold text-white mb-2">Our Story</h2>
        <p className="text-gray-300 mb-6">
          Built by a passionate team of developers and designers, Media Converter was born out of the need for a modern, privacy-focused tool that works seamlessly in your browser. We believe in empowering creators, students, and professionals to manage their media files without hassle or risk.
        </p>
        <h2 className="text-xl font-semibold text-white mb-2">Features</h2>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>Fast and secure video compression</li>
          <li>Support for multiple formats (MP4, MKV, AVI, and more)</li>
          <li>Easy trimming and audio removal</li>
          <li>Presets for WhatsApp and Twitter sharing</li>
          <li>All processing happens locally—your files stay private</li>
        </ul>
        <h2 className="text-xl font-semibold text-white mb-2">Contact & Feedback</h2>
        <p className="text-gray-300 mb-6">
          We love hearing from our users! If you have suggestions, feedback, or need support, please reach out at <a href="mailto:sagnik432005@gmail.com" className="text-blue-400 underline">sagnik432005@gmail.com</a>.
        </p>
        <div className="mt-8 text-center">
          <span className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Modifior. All rights reserved.</span>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;