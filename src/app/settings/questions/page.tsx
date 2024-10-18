import React from "react";
import { getUser } from "@/utils/auth";
import Questions from "@/app/settings/questions/questions";

export default async function Page() {
  const { user } = await getUser();

  return <Questions user={user!} />;
}
