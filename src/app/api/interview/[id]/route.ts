import { getUser } from "@/utils/auth";
import { getInterviewById } from "@/data/interview";

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const interview = await getInterviewById({
    id: params.id,
    council: user.admin ? undefined : (user.council ?? undefined),
  });

  return new Response(JSON.stringify(interview));
}
