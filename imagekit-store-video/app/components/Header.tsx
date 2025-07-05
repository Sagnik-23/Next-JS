"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-950 text-white sticky top-0 z-50 shadow-md shadow-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo/Home */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold hover:text-blue-400 transition"
          onClick={() =>
            showNotification("Welcome to ImageKit ReelsPro", "info")
          }
        >
          <Home className="w-5 h-5" />
          <span>Video with AI</span>
        </Link>

        {/* User Icon + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-full p-2 hover:bg-gray-800 transition focus:outline-none"
          >
            <User className="w-6 h-6 text-white" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <ul className="absolute right-0 mt-3 w-64 bg-white text-black rounded-md shadow-lg z-50 overflow-hidden">
              {session ? (
                <>
                  <li className="px-4 py-2 text-sm bg-gray-100 border-b border-gray-200">
                    Hello, <strong>{session.user?.email?.split("@")[0]}</strong>
                  </li>

                  <li>
                    <Link
                      href="/upload"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                      onClick={() => {
                        showNotification("Welcome to Admin Dashboard", "info");
                        setIsOpen(false);
                      }}
                    >
                      Upload Video
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left transition"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => {
                      showNotification("Please sign in to continue", "info");
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
