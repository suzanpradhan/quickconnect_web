import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  // Allow static files and assets
  if (pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  if (token) {
    // Authenticated user
    if (pathname === "/" || pathname === "/login") {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    return NextResponse.next();
  } else {
    // Unauthenticated user
    if (pathname === "/" || pathname === "/profile") {
      return NextResponse.redirect(
        new URL(
          `/login?callback=${encodeURIComponent(req.url)}`,
          req.nextUrl.origin
        )
      );
    }
    if (pathname === "/login") {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login"],
};
