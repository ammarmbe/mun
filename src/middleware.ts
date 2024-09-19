import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/auth/session";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (req.nextUrl.pathname.includes(".")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname !== "/login" && !session?.userId) {
    console.log("Redirecting to login");

    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (req.nextUrl.pathname === "/login" && session?.userId) {
    console.log("Redirecting to home");

    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  return NextResponse.next();
}
