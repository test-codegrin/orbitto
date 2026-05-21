import { setAdminSessionCookie } from "@/libs/adminAuth/session";
import { getActiveAdminByEmail } from "@/libs/adminAuth/service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const oauthStateCookieName = "orbitto_google_oauth_state";

export async function GET(request) {
  const requestUrl = request.nextUrl;
  const origin = requestUrl.origin;
  const next = requestUrl.searchParams.get("next") || "/admin";
  const code = requestUrl.searchParams.get("code");
  const googleError = requestUrl.searchParams.get("error");
  const state = requestUrl.searchParams.get("state");
  const stateCookie = cookies().get(oauthStateCookieName)?.value;

  if (googleError) {
    return NextResponse.redirect(new URL("/login?error=google_auth_failed", origin));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_oauth_code", origin));
  }

  if (!state || !stateCookie || state !== stateCookie) {
    return NextResponse.redirect(new URL("/login?error=invalid_oauth_state", origin));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  const redirectUri = `${origin}/api/admin/oauth/google/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=oauth_not_configured", origin));
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
    cache: "no-store",
  });

  const tokenResult = await tokenResponse.json().catch(() => null);
  const accessToken = tokenResult?.access_token;

  if (!tokenResponse.ok || !accessToken) {
    return NextResponse.redirect(new URL("/login?error=oauth_exchange_failed", origin));
  }

  const userInfoResponse = await fetch(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }
  );
  const userInfo = await userInfoResponse.json().catch(() => null);
  const googleEmail = String(userInfo?.email || "").trim().toLowerCase();

  if (!googleEmail) {
    return NextResponse.redirect(new URL("/login?error=google_email_missing", origin));
  }

  const { data: admin, error: adminError } = await getActiveAdminByEmail(googleEmail);

  if (adminError || !admin) {
    return NextResponse.redirect(new URL("/login?error=google_not_admin", origin));
  }

  await setAdminSessionCookie(admin);
  cookies().set(oauthStateCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  const safeNext = next.startsWith("/") ? next : "/admin";
  return NextResponse.redirect(new URL(safeNext, origin));
}
