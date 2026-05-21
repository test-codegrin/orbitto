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
        </form>

        <p className="admin-auth-footnote">
          First setup? <Link href="/admin/register">Register the first admin</Link>
        </p>
      </section>
    </main>
  );
};

export default LoginForm;
