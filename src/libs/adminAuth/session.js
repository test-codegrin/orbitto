import { cookies } from "next/headers";
import {
  adminSessionCookieName,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/libs/adminAuth/token";

export const setAdminSessionCookie = async (admin) => {
  const token = await createAdminSessionToken(admin);

  cookies().set(adminSessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};

export const clearAdminSessionCookie = () => {
  cookies().set(adminSessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
};

export const getAdminSession = async () => {
  const token = cookies().get(adminSessionCookieName)?.value;
  return verifyAdminSessionToken(token);
};

export { adminSessionCookieName, createAdminSessionToken, verifyAdminSessionToken };
