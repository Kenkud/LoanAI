import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google"; // Use a supported Mono font
import "./globals.css";

const geistSans = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({  // Replace with an available font
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loan AI",
  description: "Your gateway to tailored loan and credit facility information, powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

