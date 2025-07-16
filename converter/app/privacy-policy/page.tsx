import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-4 py-8">
      <section className="max-w-2xl w-full bg-white/5 border border-gray-800 rounded-2xl shadow-lg p-8 backdrop-blur-md mt-25">
        <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-300 mb-6">
          Your privacy is important to us. This Privacy Policy explains how Media Converter collects, uses, and protects your information when you use our platform.
        </p>
        <h2 className="text-xl font-semibold text-white mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li><span className="font-semibold text-white">No personal data is collected</span> when you use our media conversion tools.</li>
          <li>All file processing happens locally in your browser. <span className="font-semibold text-white">Your files are never uploaded to our servers.</span></li>
          <li>We do not store, access, or share any files you process using our platform.</li>
        </ul>
        <h2 className="text-xl font-semibold text-white mb-2">Cookies & Analytics</h2>
        <p className="text-gray-300 mb-6">
          Media Converter does not use cookies or any tracking technologies to monitor your activity. We may use basic analytics to understand overall usage patterns, but these do not include any personal or file data.
        </p>
        <h2 className="text-xl font-semibold text-white mb-2">Third-Party Services</h2>
        <p className="text-gray-300 mb-6">
          Our platform does not integrate with third-party services that access your files or personal information. Any links to external sites are provided for your convenience and are not covered by this policy.
        </p>
        <h2 className="text-xl font-semibold text-white mb-2">Your Rights</h2>
        <p className="text-gray-300 mb-6">
          Since we do not collect or store any personal data, you retain full control and ownership of your files and information. If you have any questions or concerns, please contact us at <a href="mailto:sagnik432005@gmail.com" className="text-blue-400 underline">sagnik432005@gmail.com</a>.
        </p>
        <h2 className="text-xl font-semibold text-white mb-2">Policy Updates</h2>
        <p className="text-gray-300 mb-6">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of Media Converter constitutes acceptance of those changes.
        </p>
        <div className="mt-8 text-center">
          <span className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Media Converter. All rights reserved.</span>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;