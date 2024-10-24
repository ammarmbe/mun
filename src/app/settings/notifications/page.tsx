import React from "react";
import { getUser } from "@/utils/auth";
import Notifications from "@/app/settings/notifications/notifications";

export default async function Page() {
  const { user } = await getUser();

  return <Notifications user={user!} />;
}
