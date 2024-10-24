import { getUser } from "@/utils/auth";
import { getNotifications } from "@/data/notifications";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const type = searchParams.get("type") === "new" ? "new" : "all";

  const notifications = await getNotifications({
    userId: user.id,
    type,
  });

  return new Response(JSON.stringify(notifications));
}
