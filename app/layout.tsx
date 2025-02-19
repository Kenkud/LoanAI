import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google"; // Replace Geist with Poppins
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"], // Specify font weights if needed
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Loan AI",
  description: "Your gateway to tailored loan and credit facility information, powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${robotoMono.variable} antialiased`}>
        {/* Top Navigation */}
        <nav className="w-full bg-gray-100 dark:bg-gray-900 py-2 px-6 flex justify-end space-x-4 text-sm">
          <Link href="/login" className="hover:underline text-gray-700 dark:text-gray-300">
            Login
          </Link>
          <Link href="/signup" className="hover:underline text-gray-700 dark:text-gray-300">
            Signup
          </Link>
        </nav>

        {/* Main Navigation */}
        <nav className="w-full bg-white dark:bg-black shadow-md py-4 px-6 flex justify-center space-x-8 text-lg font-semibold">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
            Contact
          </Link>
        </nav>

        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-gray-100 dark:bg-gray-900 text-center py-4 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Loan AI. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
