import React from "react";
import { getUser } from "@/utils/auth";
import Admin from "@/app/settings/admin/admin";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await getUser();

  if (!user!.admin) return redirect("/home");

  return <Admin />;
}
