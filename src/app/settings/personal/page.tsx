import React from "react";
import { getUser } from "@/utils/auth";
import Personal from "@/app/settings/personal/personal";

export default async function Page() {
  const { user } = await getUser();

  return <Personal user={user!} />;
}
