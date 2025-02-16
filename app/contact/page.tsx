"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Functionality to be implemented)");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Contact Us</h1>
        <p className="text-lg mt-4 max-w-2xl text-gray-700 dark:text-gray-300">
          Have questions or need support? Reach out to us, and we&apos;ll get back to you as soon as possible.
        </p>
      </header>
      <main className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
            rows={4}
            required
          ></textarea>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors">
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
}
