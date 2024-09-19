import { getUser } from "@/utils/auth/user";

export default async function Home() {
  const user = await getUser();

  return <div>hello {user?.firstName}</div>;
}
