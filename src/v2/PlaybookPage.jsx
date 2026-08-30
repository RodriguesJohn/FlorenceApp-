import React from "react";
import { NavMenu } from "./NavMenu.jsx";
import OfferingShader from "./OfferingShader.jsx";
import { findLocation, hrefFor, modules } from "./playbookTopics.js";
import "./styles.css";
import "./playbook.css";

function PlaybookWatch({ videos }) {
  const [activeId, setActiveId] = React.useState(videos[0]?.youtubeId || "");
  const [started, setStarted] = React.useState(false);
  const active = videos.find((video) => video.youtubeId === activeId) || videos[0];

  React.useEffect(() => {
    setActiveId(videos[0]?.youtubeId || "");
    setStarted(false);
  }, [videos]);

  if (!active) return null;

  const src = `https://www.youtube-nocookie.com/embed/${active.youtubeId}?rel=0${started ? "&autoplay=1" : ""}`;

  return (
    <div className="playbook-watch">
      <div className="playbook-watch-stage">
        <div className="playbook-video-frame">
          <iframe
            key={src}
            src={src}
            title={`${active.part} ${active.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="playbook-watch-now">
          <span>{active.part}</span>
          {active.title}
        </p>
      </div>
      <nav className="playbook-watch-list" aria-label="Series">
        {videos.map((video) => {
          const current = video.youtubeId === active.youtubeId;
          return (
            <button
              type="button"
              key={video.youtubeId}
              className={current ? "is-current" : ""}
              aria-current={current ? "true" : undefined}
              onClick={() => {
                setActiveId(video.youtubeId);
                setStarted(true);
              }}
            >
              <img
                src={`https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg`}
                alt=""
              />
              <span>
                <em>{video.part}</em>
                <strong>{video.title}</strong>
                {current ? <b>Playing</b> : null}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
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

const THEME_KEY = "playbook-theme";

function readTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return "dark";
}

export default function PlaybookPage() {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(readTheme);
  const [{ module, chapter }, setLocation] = React.useState(() => findLocation(window.location.hash));

  const go = React.useCallback((moduleId, chapterId) => {
    const next = hrefFor(moduleId, chapterId);
    window.history.replaceState(null, "", next || "/workshop/playbook");
    setLocation(findLocation(next));
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goHome = React.useCallback(() => {
    window.history.replaceState(null, "", "/workshop/playbook");
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
        Skip to playbook
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

      <div className="playbook-shell" id="playbook">
        <button
          type="button"
          className="playbook-nav-toggle"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Topics"}
        </button>

        <aside className={`playbook-sidebar${open ? " is-open" : ""}`} aria-label="Playbook">
          <a
            className={`playbook-sidebar-title${!module ? " is-active" : ""}`}
            href="/workshop/playbook"
            onClick={(event) => {
              event.preventDefault();
              goHome();
            }}
          >
            Playbook
          </a>
          <nav>
            <ol className="playbook-tree">
              {modules.map((item) => (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.id)}
                    className={module?.id === item.id ? "is-active" : ""}
                    onClick={(event) => {
                      event.preventDefault();
                      go(item.id);
                    }}
                  >
                    <span>{item.number}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <button
            type="button"
            className="playbook-theme-toggle"
            onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
            aria-pressed={theme === "light"}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </aside>

        {module && chapter ? (
          <article className="playbook-article" aria-labelledby="playbook-title">
            <button type="button" className="playbook-back" onClick={() => go(module.id)}>
              Back
            </button>
            <h1 id="playbook-title">{chapter.title}</h1>
            {chapter.table ? (
              <div className="playbook-compare">
                <h2>{chapter.table.title}</h2>
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
          <section className="playbook-index" aria-labelledby="playbook-title">
            <h1 id="playbook-title">AI-ready design system playbook</h1>
            <p className="playbook-intro">Four modules. Open one, then open a topic.</p>
            <div className="playbook-module-grid">
              {modules.map((item, index) => (
                <PlaybookCard
                  key={item.id}
                  title={item.title}
                  color1={item.color1}
                  color2={item.color2}
                  seed={index * 4.2 + 0.8}
                  onClick={() => go(item.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
