"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-md px-6 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-white tracking-wide">
          <Link href="/">Modifior</Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-10 text-sm text-white">
          <Link href="/" className="hover:bg-gray-800 p-2 rounded-lg transition duration-200">
            Home
          </Link>
          <Link href="/about" className="hover:bg-gray-800 p-2 rounded-lg transition duration-200">
            About
          </Link>
          <Link href="/privacy-policy" className="hover:bg-gray-800 p-2 rounded-lg transition duration-200">
            Privacy Policy
          </Link>
        </div>

        {/* GitHub Link */}
        <a
          href="https://github.com/Sagnik-23/Next-JS/tree/main/converter"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex gap-2 text-white hover:bg-black py-2 px-4 rounded-lg transition duration-300 text-sm"
        >
          <FaGithub className="text-xl" />
          GitHub Repo
        </a>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl md:hidden focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[90%] max-w-7xl bg-white/10 border border-white/20 rounded-2xl shadow-md backdrop-blur-md z-40 p-6 flex flex-col gap-4 text-white md:hidden animate-slideDown">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition">About</Link>
          <Link href="/privacy-policy" onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition">Privacy Policy</Link>
          <a
            href="https://github.com/Sagnik-23/Next-JS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 items-center hover:text-gray-300 transition"
          >
            <FaGithub className="text-xl" />
            GitHub Repo
          </a>
        </div>
      )}

      {/* Optional animation (if using Tailwind v3.3+) */}
      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
