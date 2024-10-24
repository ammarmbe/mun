import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/form", "/success", "/_next/", "/api/"];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === "GET") {
    if (
      request.nextUrl.pathname === "/manifest.webmanifest" ||
      request.nextUrl.pathname.startsWith("/images/icon-")
    ) {
      return NextResponse.next();
    }

    const response = NextResponse.next();
    const token = request.cookies.get("session")?.value ?? null;

    if (token !== null) {
      response.cookies.set("session", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      if (request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(request.nextUrl.origin + "/");
      }
    } else if (
      !publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
    ) {
      return NextResponse.redirect(request.nextUrl.origin + "/login");
    }

    return response;
  }

  const originHeader = request.headers.get("Origin");
  const hostHeader =
    request.headers.get("Host") || request.headers.get("X-Forwarded-Host");

  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  let origin: URL;

  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, {
      status: 403,
    });
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
}
