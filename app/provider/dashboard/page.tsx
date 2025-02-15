"use client";

export default function ProviderDashboard() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-bold text-green-600 dark:text-green-400">Loan Provider Dashboard</h1>
      <p className="text-lg mt-4 max-w-2xl text-gray-700 dark:text-gray-300">
        Welcome to your dashboard! Here, you can manage loan listings, review applications, and update loan criteria.
      </p>
    </div>
  );
}
