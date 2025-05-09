import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("token"); // atau session check kamu

  const protectedRoutes = ["/", "/inbox"];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/inbox"], // ❗ cuma lindungi home dan inbox, BUKAN /to/*
};
