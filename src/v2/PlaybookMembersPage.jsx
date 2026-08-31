import React from "react";
import { NavMenu } from "./NavMenu.jsx";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import "./styles.css";
import "./playbook.css";
import "./playbook-members.css";

function MembersLogin() {
  const { signIn, configured } = useAuth();
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState("");

  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    setError("");
    setPending(true);
    const { error: signInError } = await signIn({ email, password });
    setPending(false);

    if (signInError) {
      setError(signInError.message || "Could not log in with that email and password.");
    }
  };

  return (
    <section className="playbook-login playbook-members-login" aria-labelledby="playbook-login-title">
      <p className="playbook-login-kicker">Playbook</p>
      <h1 id="playbook-login-title">Log in</h1>
      <p className="playbook-intro">Members only. Use the email you joined with.</p>
      <form className="playbook-login-form" onSubmit={submit}>
        <label htmlFor="playbook-members-email">Email</label>
        <input
          id="playbook-members-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <label htmlFor="playbook-members-password">Password</label>
        <input
          id="playbook-members-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        {!configured ? (
          <p className="playbook-login-error" role="status">
            Login is not configured on this environment.
          </p>
        ) : null}
        {error ? (
          <p className="playbook-login-error" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" className="playbook-login-submit" disabled={pending || !configured}>
          {pending ? "Signing in…" : "Log in"}
        </button>
      </form>
    </section>
  );
}

function MembersHome() {
  const { user, signOut } = useAuth();
  const initial = (user.email?.[0] || "A").toUpperCase();

  return (
    <section className="playbook-members-home" aria-labelledby="playbook-title">
      <p className="playbook-welcome-kicker">Playbook</p>
      <h1 id="playbook-title">Playbook</h1>
      <p className="playbook-intro">The written guide. Chapters land here.</p>
      <div className="playbook-account">
        <span className="playbook-account-mark" aria-hidden="true">
          {initial}
        </span>
        <button type="button" className="playbook-account-out" onClick={() => signOut()}>
          Log out
        </button>
      </div>
    </section>
  );
}

function PlaybookMembersApp() {
  const { ready, user } = useAuth();

  React.useEffect(() => {
    document.body.style.background = "#000000";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <main className="page-shell current-home playbook-page playbook-members-page" id="main-content">
      <a className="playbook-skip" href="#playbook">
        Skip to playbook
      </a>

      <nav className="nav nav-dark" aria-label="Primary">
        <a className="brand" href="/" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="nav-actions">
          <NavMenu />
        </div>
      </nav>

      <div className="playbook-members-stage" id="playbook">
        {!ready ? (
          <p className="playbook-intro" role="status">
            Loading
          </p>
        ) : user ? (
          <MembersHome />
        ) : (
          <MembersLogin />
        )}
      </div>
    </main>
  );
}

export default function PlaybookMembersPage() {
  return (
    <AuthProvider>
      <PlaybookMembersApp />
    </AuthProvider>
  );
}
