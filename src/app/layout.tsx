import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar.component";
import { PortfolioProvider } from "@/hooks/portfolio.hook";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}
      >
        <PortfolioProvider>
          <Toaster position="top-right" />

          <Sidebar />
          <div className="px-16 lg:pl-[300px] pt-[75px] lg:pt-[50px] w-full h-full">
            {children}
          </div>
        </PortfolioProvider>
      </body>
    </html>
  );
}
