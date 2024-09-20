import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/auth/session";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (req.nextUrl.pathname !== "/login" && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (req.nextUrl.pathname === "/login" && session?.userId) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
