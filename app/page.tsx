import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Loan AI</h1>
        <p className="text-xl">
          Find the best loan and credit facility providers or apply for a loan with ease.
        </p>
      </header>
      <main className="flex gap-8">
        <Link
          href="/applicant/login"
          className="px-8 py-4 bg-[var(--primary)] text-white rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Loan Applicant
        </Link>
        <Link
          href="/provider/login"
          className="px-8 py-4 bg-[var(--secondary)] text-white rounded-md shadow hover:bg-green-700 transition-colors"
        >
          Loan Provider
        </Link>
      </main>
    </div>
  );
}
