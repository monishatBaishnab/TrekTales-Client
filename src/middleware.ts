import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/services/auth";

const AUTH_ROUTES = ["/login", "/register"];

const ROLE_BASED_ROUTES: Record<string, RegExp[]> = {
  USER: [/^\/user-profile/, /^\/posts(\/.*)?$/],
  ADMIN: [/^\/dashboard/, /^\/user-profile/, /^\/posts(\/.*)?$/],
};

type Role = keyof typeof ROLE_BASED_ROUTES;
type User = { role?: Role; name?: string } | null;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user: User = await getCurrentUser();

  if (!user) {
    return AUTH_ROUTES.includes(pathname)
      ? NextResponse.next()
      : NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
  }

  const normalizedRole = user.role?.toUpperCase() as Role;
  const roleRoutes = ROLE_BASED_ROUTES[normalizedRole];

  if (roleRoutes?.some((route) => route.test(pathname))) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/user-profile",
    "/user-profile/:path*",
    "/posts",
    "/posts/:path*",
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
