import { getUser } from "@/utils/auth/user";
import { getInterviewById } from "@/data/interview";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const interview = await getInterviewById({
    id: params.id,
    council: user.council,
  });

  return new Response(JSON.stringify(interview));
}
