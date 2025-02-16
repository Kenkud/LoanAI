"use client"; // ✅ This page is a Client Component

import { useSession } from "next-auth/react";

export default function ApplicantDashboardPage() {
  const { data: session, status } = useSession();

  // Show a loading state while session is being fetched
  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center text-blue-600">Applicant Dashboard</h1>

        {session ? (
          <p className="text-center mt-4 text-gray-800 dark:text-gray-300">
            Welcome, <strong>{session.user?.name}</strong>!
          </p>
        ) : (
          <p className="text-center mt-4 text-red-500">
            You are not logged in. Please{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              log in
            </a>.
          </p>
        )}
      </div>
    </div>
  );
}
