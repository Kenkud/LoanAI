"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "applicant" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, password: hashedPassword }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("❌ Error signing up. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">Signup</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-4">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="applicant">Loan Applicant</option>
          <option value="provider">Loan Provider</option>
        </select>
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">Signup</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
