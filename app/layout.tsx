import type { Metadata } from "next";
import { Inter,Metal_Mania } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const metalMania = Metal_Mania({
  variable: "--font-metal-mania",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Face The Wall",
  description: "Young people who loves metal. Trash metal band from Slovakia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="[scrollbar-gutter:stable_both-edges]">
      <body
        className={`${inter.variable} ${metalMania.variable} antialiased min-h-screen bg-black text-white overflow-y-scroll`}
      >
        {children}
      </body>
    </html>
  );
}
