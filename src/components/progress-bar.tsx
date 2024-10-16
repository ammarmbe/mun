"use client";

import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressBar() {
  return (
    <AppProgressBar
      height="2px"
      color="rgb(var(--brand-600))"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
