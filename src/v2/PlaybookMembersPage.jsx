import React from "react";
import { NavMenu } from "./NavMenu.jsx";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import { playbookCoverHtml, playbookParts, playbookToc } from "./playbookDocument.js";
import "./styles.css";
import "./playbook.css";
import "./playbook-members.css";

function PlaybookArtifact() {
  return (
    <div className="playbook-artifact" aria-hidden="true">
      <div className="playbook-artifact-page playbook-artifact-page--back" />
      <div className="playbook-artifact-page playbook-artifact-page--mid" />
      <div className="playbook-artifact-page playbook-artifact-page--front">
        <p className="playbook-artifact-kicker">Human AI Studio</p>
        <p className="playbook-artifact-title">AI-Ready Design System Playbook</p>
        <p className="playbook-artifact-meta">Workshop cohort · 17 parts</p>
        <ol className="playbook-artifact-toc">
          {playbookToc.slice(0, 7).map((item) => (
            <li key={item.href}>{item.title}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function MembersLogin() {
  const { signIn, configured } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState("");
  const closeRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const triggerRef = React.useRef(null);

  const close = React.useCallback(() => {
    setOpen(false);
    setError("");
    triggerRef.current?.focus();
  }, []);

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

  React.useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div className="playbook-gate">
      <div className="playbook-gate-panel">
        <p className="playbook-login-kicker">Workshop playbook</p>
        <h1 className="playbook-gate-title">For workshop attendees</h1>
        <p className="playbook-gate-lede">
          Notes, links, and resources from the AI-ready design systems workshop. Everything shared in the session. If you attended, log in with that email.
        </p>
        <div className="playbook-gate-actions">
          <button
            ref={triggerRef}
            type="button"
            className="playbook-login-submit playbook-gate-login"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            Log in
          </button>
          <a className="playbook-gate-workshop" href="/workshop">
            About the workshop
          </a>
        </div>
      </div>
      <div className="playbook-gate-visual">
        <PlaybookArtifact />
      </div>

      {open ? (
        <div className="playbook-login-layer" role="presentation">
          <button type="button" className="playbook-login-backdrop" aria-label="Close login" onClick={close} />
          <section
            className="playbook-login playbook-members-login"
            role="dialog"
            aria-modal="true"
            aria-labelledby="playbook-login-title"
          >
            <div className="playbook-login-modal-head">
              <p className="playbook-login-kicker">Members</p>
              <button
                ref={closeRef}
                type="button"
                className="playbook-login-modal-close"
                aria-label="Close login"
                onClick={close}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h2 id="playbook-login-title">Log in</h2>
            <p className="playbook-intro">Use the email you joined with.</p>
            <form className="playbook-login-form" onSubmit={submit}>
              <label htmlFor="playbook-members-email">Email</label>
              <input
                ref={emailRef}
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
        </div>
      ) : null}
    </div>
  );
}

function splitPart(title) {
  const match = String(title).match(/^(\d{2})\s*·\s*(.+)$/);
  return match ? { num: match[1], label: match[2] } : { num: "", label: title };
}

function MembersHome() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [hash, setHash] = React.useState(() => window.location.hash || "");
  const initial = (user.email?.[0] || "A").toUpperCase();
  const index = playbookParts.findIndex((entry) => entry.href === hash);
  const part = index > -1 ? playbookParts[index] : null;
  const previous = index > 0 ? playbookParts[index - 1] : null;
  const next = index > -1 ? playbookParts[index + 1] : playbookParts[0];

  const go = React.useCallback((href) => {
    window.history.replaceState(null, "", href || "/playbook");
    setHash(href || "");
    setOpen(false);
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="playbook-body">
      <aside className={`playbook-sidebar${open ? " is-open" : ""}`} aria-label="Playbook">
        <div className="playbook-sidebar-home">
          <a
            className={`playbook-sidebar-brand${!part ? " is-active" : ""}`}
            href="/playbook"
            onClick={(event) => {
              event.preventDefault();
              go("");
            }}
          >
            <span>
              <strong>Playbook</strong>
              <small>AI-ready design systems</small>
            </span>
          </a>
        </div>
        <nav className="playbook-sidebar-nav" aria-label="Parts">
          {playbookToc.map((item) => {
            const meta = splitPart(item.title);
            const current = hash === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`playbook-sidebar-item${current ? " is-active" : ""}`}
                aria-current={current ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.href);
                }}
              >
                {meta.num ? <span className="playbook-doc-num">{meta.num}</span> : null}
                <span className="playbook-sidebar-label">{meta.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="playbook-sidebar-foot">
          <div className="playbook-account">
            <span className="playbook-account-mark" aria-hidden="true">
              {initial}
            </span>
            <span className="playbook-account-name">{user.email}</span>
            <button type="button" className="playbook-account-out" onClick={() => signOut()}>
              Log out
            </button>
          </div>
        </div>
      </aside>
      <div className="playbook-stage">
        <div className="playbook-shell playbook-doc-shell" id="playbook">
          <button
            type="button"
            className="playbook-nav-toggle"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Contents"}
          </button>
          {part ? (
            <article className="playbook-doc playbook-doc-page" aria-labelledby="playbook-part-title">
              <h1 id="playbook-part-title">{part.title.replaceAll("AI-ready", "AI\u2011ready")}</h1>
              <div dangerouslySetInnerHTML={{ __html: part.html }} />
            </article>
          ) : (
            <article
              className="playbook-doc playbook-doc-page"
              aria-label="AI-Ready Design System Playbook"
              dangerouslySetInnerHTML={{ __html: playbookCoverHtml }}
            />
          )}
          <div className="playbook-pager">
            {part && previous ? (
              <button type="button" className="wc-btn wc-btn--ghost" onClick={() => go(previous.href)}>
                Previous
              </button>
            ) : part ? (
              <button type="button" className="wc-btn wc-btn--ghost" onClick={() => go("")}>
                Cover
              </button>
            ) : (
              <span />
            )}
            {next ? (
              <button type="button" className="wc-btn wc-btn--primary" onClick={() => go(next.href)}>
                Next
              </button>
            ) : (
              <button type="button" className="wc-btn wc-btn--primary" onClick={() => go("")}>
                Cover
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
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

      {user ? (
        <MembersHome />
      ) : (
      <div className="playbook-members-stage" id="playbook">
        {!ready ? (
          <p className="playbook-intro" role="status">
            Loading
          </p>
        ) : (
          <MembersLogin />
        )}
      </div>
      )}
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
