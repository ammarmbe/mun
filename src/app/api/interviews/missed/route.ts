import { getMissedInterviews } from "@/data/interviews";
import { getUser } from "@/utils/auth/user";

export async function GET() {
  const user = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const interviews = await getMissedInterviews({
    council: user.council,
  });

  return new Response(JSON.stringify(interviews));
}
