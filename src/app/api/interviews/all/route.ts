import { getAllInterviews } from "@/data/interviews";
import { getUser } from "@/utils/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const pageIndex = searchParams.has("page_index")
    ? Number(searchParams.get("page_index"))
    : undefined;

  const pageSize = searchParams.has("page_size")
    ? Number(searchParams.get("page_size"))
    : undefined;

  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const interviews = await getAllInterviews({
    council: user.admin ? undefined : (user.council ?? undefined),
    pageIndex: pageIndex ?? 0,
    pageSize: pageSize ?? 10,
  });

  return new Response(JSON.stringify(interviews));
}
