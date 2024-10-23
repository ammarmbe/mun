import { getTodaysInterviews } from "@/data/interviews";
import { getUser } from "@/utils/auth";

export async function GET() {
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const interviews = await getTodaysInterviews({
    council: user.admin ? undefined : (user.council ?? undefined),
  });

  return new Response(JSON.stringify(interviews));
}
