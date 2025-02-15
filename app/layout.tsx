"use client"; // Ensures this file can use state/hooks

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaBars, FaXmark } from "react-icons/fa6";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change nav background when scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Top Navigation with Social Links */}
        <nav className="w-full bg-gray-100 dark:bg-gray-800 py-2 px-6 flex justify-between items-center text-sm">
          {/* Social Links */}
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className="hover:text-blue-500">
              <FaFacebookF />
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram />
            </Link>
            <Link href="https://tiktok.com" target="_blank" aria-label="TikTok" className="hover:text-black dark:hover:text-white">
              <FaTiktok />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="X (Twitter)" className="hover:text-blue-400">
              <FaTwitter />
            </Link>
          </div>

          {/* Authentication Links */}
          <div className="hidden md:flex space-x-4">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              Signup
            </Link>
          </div>
        </nav>

        {/* Main Navigation (Sticky) */}
        <nav
          className={`w-full shadow-md py-4 px-6 flex justify-between items-center sticky top-0 transition-all duration-300 z-50 ${
            isScrolled ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-black"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            LoanAI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation (Dropdown) */}
        {menuOpen && (
          <div className="md:hidden bg-gray-100 dark:bg-gray-800 shadow-md py-4 px-6 fixed top-16 left-0 w-full flex flex-col items-center space-y-4 text-lg font-medium z-50">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <hr className="w-3/4 border-gray-300 dark:border-gray-600" />
            <Link href="/login" className="hover:underline" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link href="/signup" className="hover:underline" onClick={() => setMenuOpen(false)}>
              Signup
            </Link>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm">
          © {new Date().getFullYear()} Loan AI. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
