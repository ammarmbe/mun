import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/auth/session";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname !== "/login" && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (req.nextUrl.pathname === "/login" && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
