"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", { ...formData, redirect: false });

    if (result?.error) {
      setMessage("❌ Invalid login credentials");
    } else {
      router.push("/applicant/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-4">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">Login</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
