import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TailwindIndicator from "@/components/utility/tailwind-indicator";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarWrapper from "@/components/sidebar/sidebar-wrapper";
import React from "react";
import { Toaster } from "sonner";
import ReactQuery from "@/components/utility/react-query";
import ProgressBar from "@/components/progress-bar";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        className={`${inter.className} flex min-h-[100dvh] flex-col bg-primary text-primary antialiased md:flex-row`}
      >
        <TailwindIndicator />
        <Toaster
          toastOptions={{
            className: "w-full",
          }}
        />
        <ProgressBar />
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <ReactQuery>{children}</ReactQuery>
      </body>
    </html>
  );
}
