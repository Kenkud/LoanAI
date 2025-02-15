"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import countries from "world-countries";

// Dynamically import `react-world-flags` to avoid SSR issues
const FlagComponent = dynamic(() => import("react-world-flags"), { ssr: false });

type FormDataType = {
  amount: string;
  loanFor: string;
  employmentStatus: string;
  collateral: string;
  approval: string;
  duration: string;
  country: string;
};

export default function Home() {
  // Define state for loan search form
  const [formData, setFormData] = useState<FormDataType>({
    amount: "",
    loanFor: "individual",
    employmentStatus: "employed",
    collateral: "collateral-free",
    approval: "normal",
    duration: "",
    country: "US", // Default country as code
  });

  // State for AI response and loading status
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // State for user country and country code
  const [userCountry, setUserCountry] = useState("US");
  const [countryCode, setCountryCode] = useState("US");

  // Detect User's Country Automatically on First Load
  useEffect(() => {
    fetch("https://ip-api.com/json")
      .then((res) => res.json())
      .then((data) => {
        setUserCountry(data.countryCode);
        setCountryCode(data.countryCode);
        setFormData((prev) => ({ ...prev, country: data.countryCode }));
      })
      .catch((err) => console.error("Country detection failed:", err));
  }, []);

  // Handle input and dropdown changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name in formData) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle Loan Search Form Submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      // Send user search criteria to AI-powered loan search API
      const res = await fetch("/api/loan-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponse(data.data); // Display AI-generated loan results
    } catch (error) {
      setResponse("Error fetching loan information.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 xl:px-24 w-full">
      {/* Country Selector Directly Below Navigation */}
      <div className="w-full flex justify-end pr-4 md:pr-10">
        <div className="flex items-center gap-1 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-md text-sm">
          {/* Display country flag */}
          {countryCode && (
            <span className="w-6 h-4">
              {FlagComponent && (FlagComponent as any)({ country: countryCode, className: "w-6 h-4 rounded-sm" })}
            </span>
          )}
          {/* Country Dropdown (Uses only country codes) */}
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="p-1 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white w-16 text-center">
            {countries.map((country) => (
              <option key={country.cca2} value={country.cca2}>
                {country.cca2}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Page Header with Animated "LoanAI" */}
      <header className="text-center w-full mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Welcome to{" "}
          <motion.span
            className="text-blue-600 dark:text-blue-400"
            animate={{ color: ["#2563eb", "#f59e0b", "#2563eb"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            LoanAI
          </motion.span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 w-full max-w-2xl mx-auto">
          Find the best loan and credit facility providers near you.
        </p>
        <p className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
          Even better, LET THEM FIND YOU!
        </p>
      </header>

      {/* Loan Search Form */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center mt-8">
        <h2 className="text-lg font-semibold text-blue-600">Search for Loans</h2>
        <form onSubmit={handleSearch} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Loan Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Loan Amount"
            value={formData.amount}
            onChange={handleChange}
            className="p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white w-full"
            required
          />

          {/* Loan Duration */}
          <input
            type="number"
            name="duration"
            placeholder="Loan Duration (in months)"
            value={formData.duration}
            onChange={handleChange}
            className="p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white w-full"
            required
          />

          {/* Loan Filters (Dropdowns) */}
          {[
            { name: "loanFor", label: "Loan For", options: ["Individual", "Business"] },
            { name: "employmentStatus", label: "Employment Status", options: ["Employed", "Entrepreneur"] },
            { name: "collateral", label: "Collateral", options: ["Collateral Loans", "Collateral Free Loans"] },
            { name: "approval", label: "Approval Time", options: ["Instant", "Normal"] },
          ].map((field) => (
            <select
              key={field.name}
              name={field.name}
              value={formData[field.name as keyof FormDataType]} // ✅ Fixed TypeScript Error
              onChange={handleChange}
              className="p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white w-full"
            >
              {field.options.map((option) => (
                <option key={option} value={option.toLowerCase().replace(/\s+/g, "-")}>
                  {option}
                </option>
              ))}
            </select>
          ))}

          {/* Submit Button (Spans Full Width) */}
          <button type="submit" className="col-span-2 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors" disabled={loading}>
            {loading ? "Searching..." : "Find Loans"}
          </button>
        </form>
      </div>
    </div>
  );
}
