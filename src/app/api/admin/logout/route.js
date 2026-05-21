import { clearAdminSessionCookie } from "@/libs/adminAuth/session";

export async function POST() {
  clearAdminSessionCookie();
  return Response.json({ message: "Logged out." });
}

