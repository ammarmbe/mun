import { getUser } from "@/utils/auth/user";

export async function GET() {
  const user = await getUser();

  return new Response(JSON.stringify(user));
}
