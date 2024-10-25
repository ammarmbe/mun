import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import TailwindIndicator from "@/components/utility/tailwind-indicator";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";
import { Toaster } from "sonner";
import ReactQuery from "@/components/utility/react-query";
import ProgressBar from "@/components/progress-bar";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SafeArea from "@/components/utility/safe-area";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MUN Interviews",
  description:
    "The MUN Interviews app is designed to help secretariats manage the delegate interview process.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-[100dvh] flex-col bg-secondary text-primary antialiased md:flex-row`}
      >
        <TailwindIndicator />
        <Toaster
          toastOptions={{
            className: "w-full",
          }}
        />
        <ProgressBar />
        <ReactQuery>
          <Sidebar />
          <NuqsAdapter>{children}</NuqsAdapter>
        </ReactQuery>
        <SafeArea />
      </body>
    </html>
  );
}
