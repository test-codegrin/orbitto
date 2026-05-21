"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

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

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    if (form.password !== form.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setIsSubmitting(true);

    const response = await fetch("/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: form.full_name,
        username: form.username,
        email: form.email,
        password: form.password,
      }),
    });
    const result = await response.json();

    setIsSubmitting(false);

    if (!response.ok) {
      setMessage({ type: "error", text: result?.error || "Registration failed." });
      return;
    }

    setMessage({ type: "success", text: "Admin registered. Redirecting to login..." });
    window.setTimeout(() => router.replace("/login"), 1200);
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
          <h1>Register Admin</h1>
          <p>Create an admin account.</p>
        </div>

        {message ? (
          <div className={`admin-alert admin-alert-${message.type}`}>{message.text}</div>
        ) : null}

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              value={form.full_name}
              onChange={(event) => updateField("full_name", event.target.value)}
              autoComplete="name"
            />
          </label>

          <label>
            Username
            <input
              value={form.username}
              onChange={(event) => updateField("username", event.target.value)}
              required
              autoComplete="username"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(event) => updateField("confirmPassword", event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>

          <button type="submit" className="admin-button admin-button-primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Register Admin"}
          </button>
        </form>

        <p className="admin-auth-footnote">
          Already registered? <Link href="/login">Go to login</Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterForm;

