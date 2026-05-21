import {
  adminSessionCookieName,
  verifyAdminSessionToken,
} from "@/libs/adminAuth/token";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(adminSessionCookieName)?.value;
  const session = await verifyAdminSessionToken(token);

  if (pathname.startsWith("/admin") && pathname !== "/admin/register" && !session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if ((pathname === "/login" || pathname === "/admin/register") && session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
