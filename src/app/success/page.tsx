import Image from "next/image";
import React from "react";

export default function Success() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center px-8">
      <Image priority src="/logo.png" height={120} width={120} alt="Logo" />
      <h1 className="mt-10 text-center text-display-xs font-semibold">
        Your form has been submitted.
      </h1>
      <p className="mt-2 text-center text-xl font-semibold">Thank you!</p>
    </div>
  );
}
