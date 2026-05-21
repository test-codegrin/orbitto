"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/admin/me", { cache: "no-store" });

      if (response.ok) {
        router.replace("/admin");
        return;
      }

      setIsCheckingSession(false);
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const errorCode = searchParams.get("error");
    if (!errorCode) return;

    const authErrors = {
      google_not_admin:
        "Account restricted",
      google_auth_failed: "Google sign in failed. Please try again.",
      oauth_exchange_failed: "Unable to verify Google sign in. Please try again.",
      invalid_oauth_state:
        "Google login was blocked for security reasons. Please try again.",
      oauth_not_configured:
        "Google OAuth is not configured on server. Please contact admin.",
      google_email_missing:
        "Google account email is missing. Please use another account.",
      missing_oauth_code: "Google login is incomplete. Please try again.",
    };

    setMessage(authErrors[errorCode] || "Authentication failed. Please try again.");
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();

    setIsSubmitting(false);

    if (!response.ok) {
      setMessage(result?.error || "Login failed. Please check your details.");
      return;
    }

    router.replace(searchParams.get("redirectedFrom") || "/admin");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    setIsGoogleSubmitting(true);

    try {
      const response = await fetch("/api/admin/oauth/google/start", {
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok || !result?.url) {
        setMessage(result?.error || "Unable to start Google login.");
        setIsGoogleSubmitting(false);
        return;
      }

      window.location.assign(result.url);
    } catch {
      setMessage("Unable to start Google login.");
      setIsGoogleSubmitting(false);
    }
  };

  if (isCheckingSession) {
    return (
      <main className="admin-auth-page">
        <div className="admin-auth-card">Checking session...</div>
      </main>
    );
  }

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <div>
          <Link href="/" className="admin-auth-brand">
            Orbitto
          </Link>
          <h1>Admin Login</h1>
          <p>Sign in with your admin username or email and password.</p>
        </div>

        {message ? <div className="admin-alert admin-alert-error">{message}</div> : null}

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              autoComplete="username"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          <button type="submit" className="admin-button admin-button-primary" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>

          <button
            type="button"
            className="admin-button admin-button-light"
            onClick={handleGoogleLogin}
            disabled={isGoogleSubmitting}
          >
            {isGoogleSubmitting ? "Redirecting..." : "Continue with Google"}
          </button>
        </form>

        <p className="admin-auth-footnote">
          First setup? <Link href="/admin/register">Register the first admin</Link>
        </p>
      </section>
    </main>
  );
};

export default LoginForm;
