import React from "react";
import { NavMenu } from "./NavMenu.jsx";
import OfferingShader from "./OfferingShader.jsx";
import { findLocation, hrefFor, modules } from "./playbookTopics.js";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import "./styles.css";
import "./playbook.css";

function videoKey(video) {
  return video.muxPlaybackId || video.youtubeId || "";
}

function PlaybookWatch({ videos }) {
  const [activeKey, setActiveKey] = React.useState(videoKey(videos[0]));
  const [started, setStarted] = React.useState(false);
  const active = videos.find((video) => videoKey(video) === activeKey) || videos[0];

  React.useEffect(() => {
    setActiveKey(videoKey(videos[0]));
    setStarted(false);
  }, [videos]);

  if (!active) return null;

  const mux = Boolean(active.muxPlaybackId);
  const src = mux
    ? `https://player.mux.com/${active.muxPlaybackId}`
    : `https://www.youtube-nocookie.com/embed/${active.youtubeId}?rel=0${started ? "&autoplay=1" : ""}`;
  const single = videos.length === 1;

  return (
    <div className={`playbook-watch${single ? " is-single" : ""}`}>
      <div className="playbook-watch-stage">
        <div className="playbook-video-frame">
          <iframe
            key={src}
            src={src}
            title={`${active.part ? `${active.part} ` : ""}${active.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        {active.title ? (
          <p className="playbook-watch-now">
            {active.part ? <span>{active.part}</span> : null}
            {active.title}
          </p>
        ) : null}
      </div>
      {single ? null : (
      <nav className="playbook-watch-list" aria-label="Series">
        {videos.map((video) => {
          const key = videoKey(video);
          const current = key === videoKey(active);
          const thumb = video.muxPlaybackId
            ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg`
            : `https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg`;
          return (
            <button
              type="button"
              key={key}
              className={current ? "is-current" : ""}
              aria-current={current ? "true" : undefined}
              onClick={() => {
                setActiveKey(key);
                setStarted(true);
              }}
            >
              <img src={thumb} alt="" />
              <span>
                {video.part ? <em>{video.part}</em> : null}
                <strong>{video.title}</strong>
                {current ? <b>Playing</b> : null}
              </span>
            </button>
          );
        })}
      </nav>
      )}
    </div>
  );
}

function PlaybookLesson({ chapter, headingId, headingRef, showTitle = true }) {
  return (
    <>
      {showTitle ? (
        <h2 className="playbook-lesson-title" id={headingId} ref={headingRef} tabIndex={-1}>
          {chapter.title.replaceAll("AI-ready", "AI\u2011ready")}
        </h2>
      ) : null}
      {chapter.table ? (
        <div className="playbook-compare">
          <p className="playbook-compare-lede">{chapter.table.title}</p>
          <div className="playbook-compare-board" role="table" aria-label={chapter.table.title}>
            <div className="playbook-compare-h playbook-compare-h--axis" role="columnheader">
              <span className="playbook-sr">Category</span>
            </div>
            <div className="playbook-compare-h playbook-compare-h--off" role="columnheader">
              {chapter.table.offLabel}
            </div>
            <div className="playbook-compare-h playbook-compare-h--on" role="columnheader">
              {chapter.table.onLabel}
            </div>
            {chapter.table.rows.map((row, index) => (
              <div className="playbook-compare-row" role="row" key={row.label}>
                <div className="playbook-compare-axis" role="rowheader">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {row.label}
                </div>
                <div className="playbook-compare-cell playbook-compare-cell--off" role="cell">
                  <strong>{row.offLead}</strong>
                  <span>{row.off}</span>
                </div>
                <div className="playbook-compare-cell playbook-compare-cell--on" role="cell">
                  <strong>{row.onLead}</strong>
                  <span>{row.on}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {chapter.framework ? (
        <div className="playbook-fw">
          <p className="playbook-fw-lede">{chapter.framework.lede}</p>
          <ol className="playbook-fw-rail" aria-label="Four moves">
            {chapter.framework.moves.map((move, index) => (
              <li key={move.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{move.name}</strong>
                <em>{move.kicker}</em>
              </li>
            ))}
          </ol>
          <div className="playbook-fw-board">
            {chapter.framework.moves.map((move) => (
              <section className="playbook-fw-col" key={move.name} aria-labelledby={`fw-${move.name}`}>
                <h3 id={`fw-${move.name}`}>{move.name}</h3>
                <ol>
                  {move.steps.map((step) => (
                    <li key={step.n}>
                      <span>{step.n}</span>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.body}</p>
                        <em>{step.done}</em>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
          <p className="playbook-fw-loop">
            <span>04 Prove</span>
            <b>returns to</b>
            <span>02 Structure</span>
            <i>{chapter.framework.loop}</i>
          </p>
        </div>
      ) : null}
      {(chapter.body || []).map((paragraph, index) => (
        <React.Fragment key={paragraph}>
          <p>{paragraph}</p>
          {index === 0 && chapter.videos ? <PlaybookWatch videos={chapter.videos} /> : null}
        </React.Fragment>
      ))}
      {!chapter.body?.length && chapter.videos ? <PlaybookWatch videos={chapter.videos} /> : null}
      {chapter.glossary ? (
        <dl className="playbook-glossary">
          {chapter.glossary.map((entry) => (
            <div className="playbook-glossary-item" key={entry.term}>
              <dt>{entry.term}</dt>
              <dd>{entry.meaning}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </>
  );
}

function PlaybookWelcome({ onStart }) {
  const first = modules[0];
  const firstLesson = first.chapters[0];

  return (
    <section className="playbook-welcome" aria-labelledby="playbook-title">
      <p className="playbook-welcome-kicker">AI-ready design systems</p>
      <h1 id="playbook-title">Welcome</h1>
      <div className="playbook-welcome-mark" aria-hidden="true">
        <OfferingShader
          color1={first.color1}
          color2={first.color2}
          seed={1.18}
          mono
          speed={0.32}
          className="playbook-welcome-shader"
        />
      </div>
      <p className="playbook-intro">
        Glad you&apos;re here. Go through the lessons when you have time. The modules stay in the rail.
        When you want people, <a href={SLACK_INVITE}>join the Slack community</a>.
      </p>
      <button type="button" className="playbook-welcome-start" onClick={onStart}>
        <span>First lesson</span>
        <strong>{firstLesson.title.replace(/\?$/, "")}</strong>
        <em>Begin</em>
      </button>
    </section>
  );
}

function PlaybookCard({ title, color1, color2, seed, onClick }) {
  return (
    <button
      type="button"
      className="playbook-module-card"
      style={{ "--card-color-1": color1, "--card-color-2": color2 }}
      onClick={onClick}
    >
      <div className="playbook-module-thumb">
        <OfferingShader
          color1={color1}
          color2={color2}
          seed={seed}
          mono
          speed={0.32}
          className="playbook-module-shader"
        />
      </div>
      <div className="playbook-module-body">
        <h2>{title}</h2>
      </div>
    </button>
  );
}

function SidebarIcon({ name }) {
  const icons = {
    home: (
      <>
        <path d="M4 10.5 12 4l8 6.5" />
        <path d="M6 9.8V20h12V9.8" />
      </>
    ),
    foundations: (
      <>
        <path d="M4 8h16" />
        <path d="M6 12h12" />
        <path d="M8 16h8" />
      </>
    ),
    existing: (
      <>
        <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5z" />
        <path d="M12 4v16" />
      </>
    ),
    ready: (
      <>
        <path d="M5 16.5 9.2 8h5.6L19 16.5" />
        <path d="M8 12h8" />
      </>
    ),
    tooling: (
      <>
        <rect x="4.5" y="5" width="15" height="14" rx="2" />
        <path d="M8 10h3M8 14h8" />
      </>
    ),
    evals: (
      <>
        <path d="M6 12.2 10.1 16 18 8" />
      </>
    ),
    workflows: (
      <>
        <path d="M5 8h6l2 4h6" />
        <path d="M17 8h2v4" />
        <path d="M5 16h14" />
      </>
    ),
    slack: (
      <>
        <path d="M9 6.5v11" />
        <path d="M15 6.5v11" />
        <path d="M6.5 9h11" />
        <path d="M6.5 15h11" />
      </>
    )
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

const sidebarIcons = {
  foundations: "foundations",
  existing: "existing",
  "making-ready": "ready",
  tooling: "tooling",
  evals: "evals",
  workflows: "workflows"
};

const SLACK_INVITE =
  "https://join.slack.com/t/aibuildercommunity/shared_invite/zt-3akgd78mu-UZqBz_9GOzrKlHGoQrnngA";

const THEME_KEY = "playbook-theme";
const APP_PATH = "/app";

function appHref(hash) {
  return hash ? `${APP_PATH}${hash}` : APP_PATH;
}

function readTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return "dark";
}

function PlaybookAccount({ onLogin }) {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <button type="button" className="playbook-account-out" onClick={onLogin}>
        Log in
      </button>
    );
  }

  const initial = (user.email?.[0] || "A").toUpperCase();

  return (
    <div className="playbook-account">
      <span className="playbook-account-mark" aria-hidden="true">
        {initial}
      </span>
      <button type="button" className="playbook-account-out" onClick={() => signOut()}>
        Log out
      </button>
    </div>
  );
}

function PlaybookLogin({ onClose, onSuccess }) {
  const { signIn, configured } = useAuth();
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState("");
  const dialogRef = React.useRef(null);

  React.useEffect(() => {
    const previous = document.activeElement;
    dialogRef.current?.querySelector("input")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose]);

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
      return;
    }

    onSuccess();
  };

  return (
    <div className="playbook-login-layer">
      <button type="button" className="playbook-login-backdrop" aria-label="Close login" onClick={onClose} />
      <section
        className="playbook-login"
        aria-labelledby="playbook-login-title"
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
      >
      <p className="playbook-login-kicker">Members</p>
      <h2 id="playbook-login-title">Log in</h2>
      <p className="playbook-intro">
        Use the email you joined with. First-time setup comes later.
      </p>
      <form className="playbook-login-form" onSubmit={submit}>
        <label htmlFor="playbook-email">Email</label>
        <input
          id="playbook-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
        />
        <label htmlFor="playbook-password">Password</label>
        <input
          id="playbook-password"
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
  );
}

function PlaybookApp() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(readTheme);
  const [{ module, chapter }, setLocation] = React.useState(() => findLocation(window.location.hash));

  const go = React.useCallback((moduleId, chapterId) => {
    const next = hrefFor(moduleId, chapterId);
    window.history.replaceState(null, "", appHref(next));
    setLocation(findLocation(next));
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goHome = React.useCallback(() => {
    window.history.replaceState(null, "", APP_PATH);
    setLocation({ module: null, chapter: null });
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    const onHash = () => setLocation(findLocation(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.playbookTheme = theme;
    document.documentElement.style.colorScheme = theme;
    document.body.style.background = theme === "light" ? "#f4f3ef" : "#000000";
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
    return () => {
      delete document.documentElement.dataset.playbookTheme;
      document.documentElement.style.colorScheme = "";
      document.body.style.background = "";
    };
  }, [theme]);

  const chapterIndex = module ? module.chapters.findIndex((item) => item.id === chapter?.id) : -1;
  const previousChapter = module && chapterIndex > 0 ? module.chapters[chapterIndex - 1] : null;
  const nextChapter =
    module && chapterIndex > -1 && chapterIndex < module.chapters.length - 1
      ? module.chapters[chapterIndex + 1]
      : null;
  const moduleIndex = module ? modules.findIndex((item) => item.id === module.id) : -1;
  const nextModule = !nextChapter && moduleIndex > -1 ? modules[moduleIndex + 1] : null;

  return (
    <main className="page-shell current-home playbook-page" data-theme={theme} id="main-content">
      <a className="playbook-skip" href="#playbook">
        Skip to app
      </a>

      <nav className={theme === "light" ? "nav nav-light" : "nav nav-dark"} aria-label="Primary">
        <a className="brand" href="/" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="nav-actions">
          <NavMenu />
        </div>
      </nav>

      <div className="playbook-body">
      <aside className={`playbook-sidebar${open ? " is-open" : ""}`} aria-label="Academy">
        <div className="playbook-sidebar-home">
        <a
          className={`playbook-sidebar-brand${!module ? " is-active" : ""}`}
          href={APP_PATH}
          onClick={(event) => {
            event.preventDefault();
            goHome();
          }}
        >
          <span className="playbook-sidebar-icon" aria-hidden="true">
            <SidebarIcon name="home" />
          </span>
          <span>
            <strong>Academy</strong>
            <small>AI-ready design systems</small>
          </span>
        </a>
        <PlaybookAccount
          onLogin={() => {
            setOpen(false);
            setLoginOpen(true);
          }}
        />
        </div>
        <nav className="playbook-sidebar-nav" aria-label="Academy">
          {modules.map((item) => (
            <a
              key={item.id}
              href={appHref(hrefFor(item.id))}
              className={`playbook-sidebar-item${module?.id === item.id ? " is-active" : ""}`}
              aria-current={module?.id === item.id ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                go(item.id);
              }}
            >
              <span className="playbook-sidebar-icon" aria-hidden="true">
                <SidebarIcon name={sidebarIcons[item.id]} />
              </span>
              <span className="playbook-sidebar-label">{item.label}</span>
            </a>
          ))}
          <a
            className="playbook-sidebar-item"
            href={SLACK_INVITE}
            onClick={() => setOpen(false)}
          >
            <span className="playbook-sidebar-icon" aria-hidden="true">
              <SidebarIcon name="slack" />
            </span>
            <span className="playbook-sidebar-label">Slack community</span>
          </a>
        </nav>
        <div className="playbook-mode" role="radiogroup" aria-label="Color mode">
          <button
            type="button"
            role="radio"
            className={theme === "dark" ? "is-on" : ""}
            aria-checked={theme === "dark"}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
          <button
            type="button"
            role="radio"
            className={theme === "light" ? "is-on" : ""}
            aria-checked={theme === "light"}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
        </div>
      </aside>

      <div className="playbook-stage">
        <div className="playbook-shell" id="playbook">
          <button
            type="button"
            className="playbook-nav-toggle"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>

        {module && chapter ? (
          <article className="playbook-article" aria-labelledby="playbook-title">
            <button type="button" className="playbook-back" onClick={() => go(module.id)}>
              Back
            </button>
            <h1 id="playbook-title">{chapter.title.replaceAll("AI-ready", "AI\u2011ready")}</h1>
            <PlaybookLesson chapter={chapter} showTitle={false} />
            <div className="playbook-pager">
              {previousChapter ? (
                <button type="button" className="wc-btn wc-btn--ghost" onClick={() => go(module.id, previousChapter.id)}>
                  Previous
                </button>
              ) : (
                <button type="button" className="wc-btn wc-btn--ghost" onClick={() => go(module.id)}>
                  Back
                </button>
              )}
              {nextChapter ? (
                <button type="button" className="wc-btn wc-btn--primary" onClick={() => go(module.id, nextChapter.id)}>
                  Next
                </button>
              ) : nextModule ? (
                <button type="button" className="wc-btn wc-btn--primary" onClick={() => go(nextModule.id)}>
                  {nextModule.number} {nextModule.label}
                </button>
              ) : (
                <button type="button" className="wc-btn wc-btn--primary" onClick={goHome}>
                  All modules
                </button>
              )}
            </div>
          </article>
        ) : module ? (
          <section className="playbook-index" aria-labelledby="playbook-title">
            <button type="button" className="playbook-back" onClick={goHome}>
              Back
            </button>
            <h1 id="playbook-title">{module.title}</h1>
            <p className="playbook-intro">{module.lede}</p>
            <div className="playbook-module-grid">
              {module.chapters.map((entry, index) => (
                <PlaybookCard
                  key={entry.id}
                  title={entry.title}
                  color1={module.color1}
                  color2={module.color2}
                  seed={index * 3.1 + 1.2}
                  onClick={() => go(module.id, entry.id)}
                />
              ))}
            </div>
          </section>
        ) : (
          <PlaybookWelcome onStart={() => go(modules[0].id, modules[0].chapters[0].id)} />
        )}
        </div>
      </div>
      </div>

      {loginOpen ? (
        <PlaybookLogin
          onClose={() => setLoginOpen(false)}
          onSuccess={() => setLoginOpen(false)}
        />
      ) : null}
    </main>
  );
}

export default function PlaybookPage() {
  return (
    <AuthProvider>
      <PlaybookApp />
    </AuthProvider>
  );
}
