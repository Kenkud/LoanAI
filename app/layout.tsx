import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Import Poppins with a weight of 300 and the latin subset
const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "An app using Poppins with weight 300",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
