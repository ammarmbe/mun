import { getTodaysInterviews } from "@/data/interviews";
import { getUser } from "@/utils/auth/user";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const upcoming = searchParams.has("upcoming")
    ? searchParams.get("upcoming") === "true"
    : undefined;

  const user = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const interviews = await getTodaysInterviews({
    council: user.council,
    upcoming,
  });

  return new Response(JSON.stringify(interviews));
}
