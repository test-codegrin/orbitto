import { cookies } from "next/headers";

const googleAuthBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const oauthStateCookieName = "orbitto_google_oauth_state";

export async function POST(request) {
  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/admin/oauth/google/callback`;
  const clientId = process.env.GOOGLE_CLIENT_ID || "";

  if (!clientId) {
    return Response.json({ error: "Missing GOOGLE_CLIENT_ID." }, { status: 500 });
  }

  const state = crypto.randomUUID();
  cookies().set(oauthStateCookieName, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
    state,
  });

  return Response.json({ url: `${googleAuthBaseUrl}?${params.toString()}` });
}
