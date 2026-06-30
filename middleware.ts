import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/bookmarks", "/settings", "/community/write"];
const adminRoutes = ["/admin"];

function isRouteMatch(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function hasAuthSessionCookie(request: NextRequest) {
  return Boolean(
    request.cookies.get("authjs.session-token")?.value ||
      request.cookies.get("__Secure-authjs.session-token")?.value,
  );
}

function createLoginRedirect(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = isRouteMatch(pathname, protectedRoutes);
  const isAdminRoute = isRouteMatch(pathname, adminRoutes);

  if (!isProtectedRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  if (!hasAuthSessionCookie(request)) {
    return createLoginRedirect(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/bookmarks",
    "/bookmarks/:path*",
    "/settings",
    "/settings/:path*",
    "/community/write",
    "/community/write/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
