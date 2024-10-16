import Image from "next/image";
import React from "react";

export default function Success() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-10 px-8">
      <Image priority src="/logo.png" height={120} width={120} alt="Logo" />
      <h1 className="text-center text-display-xs font-semibold">
        Your form has been submitted. Thank you.
      </h1>
    </div>
  );
}
