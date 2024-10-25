import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/form", "/success", "/_next/", "/api/"];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === "GET") {
    if (
      request.nextUrl.pathname.startsWith("/images") ||
      request.nextUrl.pathname.startsWith("/logo.png")
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

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)",
  ],
};
