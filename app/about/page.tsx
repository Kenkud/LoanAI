"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">About LoanAI</h1>
        <p className="text-lg mt-4 max-w-2xl text-gray-700 dark:text-gray-300">
          LoanAI is an intelligent platform designed to help users find the best loan and credit facility providers.
          Whether you&apos;re looking to apply for a loan or offer financial services, LoanAI streamlines the process with AI-driven recommendations.
        </p>
      </header>
      <main className="flex gap-6">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 bg-gray-800 text-white rounded-md shadow hover:bg-gray-900 transition-colors"
        >
          Contact Us
        </Link>
      </main>
    </div>
  );
}
