import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware enforces simple routing rules based on lightweight cookies
// Cookies used:
// - `tc_session` -> presence means session saved / logged in
// - `tc_role` -> user's role (admin, manager, ambassador, etc.)

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  const session = request.cookies.get("tc_session")?.value;
  const role = request.cookies.get("tc_role")?.value;

  // const isAuthRoute = pathname === "/auth" || pathname.startsWith("/auth/");
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/dashboard/admin");
  const isManager = pathname === "/manager" || pathname.startsWith("/manager/");

  // If not logged in, block access to dashboard/admin/manager
  if (!session && (isDashboard || isAdmin || isManager)) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // If logged in, don't allow visiting auth pages (session saved)
  // if (session && isAuthRoute) {
  //   url.pathname = "/dashboard/home";
  //   return NextResponse.redirect(url);
  // }

  // Role-based access: only admin/manager can access /admin and /manager
  if (session && (isAdmin || isManager)) {
    if (role !== "admin" && role !== "manager") {
      url.pathname = "/dashboard/home";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/manager/:path*",
    "/auth/:path*",
    "/auth",
  ],
};
