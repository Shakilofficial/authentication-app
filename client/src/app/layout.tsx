import { AuthProvider } from "@/providers/AuthProvider";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentication App",
  description:
    "A full-stack authentication app built using Next.js, React, and Tailwind CSS.| Created by Md Shakil Hossain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
