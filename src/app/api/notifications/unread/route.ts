import { getUser } from "@/utils/auth";
import { getUnreadNotificationCount } from "@/data/notifications";

export async function GET() {
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const count = await getUnreadNotificationCount({
    userId: user.id,
  });

  return new Response(JSON.stringify(count));
}
