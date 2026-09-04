import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import OfferingShader from "./OfferingShader.jsx";
import { modules } from "./playbookTopics.js";
import "./playbook.css";

const FIRST_LESSON = modules[0]?.chapters[0];
const FIRST_VIDEO = FIRST_LESSON?.videos?.[0];
const DEFAULT_MUX_SRC = FIRST_VIDEO?.muxPlaybackId
  ? `https://player.mux.com/${FIRST_VIDEO.muxPlaybackId}?autoplay=true&muted=true&loop=true`
  : "";

const sidebarIcons = {
  foundations: "foundations",
  existing: "existing",
  "making-ready": "ready",
  tooling: "tooling",
  evals: "evals",
  workflows: "workflows",
  prototyping: "prototyping",
  animations: "animations",
  portfolio: "portfolio"
};

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
    prototyping: (
      <>
        <rect x="5" y="6" width="14" height="10" rx="1.5" />
        <path d="M8.5 15.5 11 12l2 2.5 2.5-3 3 4" />
        <circle cx="9" cy="9.5" r="1" />
      </>
    ),
    animations: (
      <>
        <path d="M5 12c2-4 4-4 7 0s5 4 7 0" />
        <path d="M5 16c2-4 4-4 7 0s5 4 7 0" />
      </>
    ),
    portfolio: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="1.5" />
        <path d="M8.5 9h7M8.5 12h5M8.5 15h6" />
      </>
    )
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function DemoCursor() {
  return (
    <svg className="academy-demo-cursor-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.2 3.1 19.4 14.2l-6.1.4 3.6 7.1-2.5 1.2-3.6-7.1-4.4 4.2z"
        fill="#ffffff"
        stroke="#111114"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function AcademyWorkspacePreview({
  product = "Training",
  subtitle,
  sidebarItems,
  demoVideo,
  previewLessons,
  featuredLesson
} = {}) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = React.useState(reduceMotion ? "open" : "idle");
  const navItems = sidebarItems ?? modules.map((item) => ({ id: item.id, label: item.label }));
  const navSubtitle = subtitle ?? "AI-ready design systems";
  const previewVideo = demoVideo ?? "";
  const previewVideoLabel = demoVideo ? "Course preview" : FIRST_VIDEO?.title ?? "Lesson preview";
  const activeLesson = featuredLesson ?? {
    title: FIRST_LESSON?.title ?? "Lesson",
    body: FIRST_LESSON?.body ?? []
  };

  const previewCards =
    previewLessons ??
    modules
      .flatMap((mod) =>
        mod.chapters.map((chapter) => ({
          id: `${mod.id}-${chapter.id}`,
          title: chapter.title.replace(/\?$/, ""),
          color1: "#38bdf8",
          color2: "#0284c7"
        }))
      )
      .slice(0, 9);

  React.useEffect(() => {
    if (reduceMotion) {
      setPhase("open");
      return undefined;
    }

    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setPhase("idle");
        await wait(700);
        if (cancelled) return;
        setPhase("aim");
        await wait(1100);
        if (cancelled) return;
        setPhase("click");
        await wait(220);
        if (cancelled) return;
        setPhase("open");
        await wait(9000);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  const cursorVariants = {
    idle: { x: 92, y: -78, opacity: 0, scale: 1 },
    aim: { x: 0, y: 0, opacity: 1, scale: 1 },
    click: { x: 0, y: 0, opacity: 1, scale: 0.82 },
    open: { x: 0, y: 0, opacity: 0, scale: 1 }
  };

  return (
    <div
      className="playbook-page academy-workspace academy-workspace-demo"
      data-theme="dark"
      aria-hidden="true"
    >
      <div className="playbook-body">
        <aside className="playbook-sidebar">
          <div className="playbook-sidebar-home">
            <span className="playbook-sidebar-brand">
              <span className="playbook-sidebar-icon">
                <SidebarIcon name="home" />
              </span>
              <span>
                <strong>{product}</strong>
                <small>{navSubtitle}</small>
              </span>
            </span>
          </div>
          <nav className="playbook-sidebar-nav">
            {navItems.map((item) => (
              <span
                key={item.id}
                className={`playbook-sidebar-item${item.id === navItems[0]?.id ? " is-active" : ""}`}
              >
                <span className="playbook-sidebar-icon">
                  <SidebarIcon name={sidebarIcons[item.id]} />
                </span>
                <span className="playbook-sidebar-label">{item.label}</span>
              </span>
            ))}
          </nav>
        </aside>

        <div className="playbook-stage">
          <AnimatePresence mode="wait" initial={false}>
            {phase === "open" ? (
              <motion.div
                key="lesson"
                className="playbook-shell academy-demo-lesson"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <article className="playbook-article">
                  <span className="playbook-back">Back</span>
                  <h1>{activeLesson.title}</h1>
                  {(activeLesson.body || []).slice(0, 2).map((paragraph, index) => (
                    <React.Fragment key={paragraph}>
                      <p>{paragraph}</p>
                      {index === 0 && (previewVideo || DEFAULT_MUX_SRC) ? (
                        <div className="playbook-watch is-single">
                          <div className="playbook-watch-stage">
                            <div className="playbook-video-frame">
                              {previewVideo ? (
                                <video
                                  key={previewVideo}
                                  src={previewVideo}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload="auto"
                                  tabIndex={-1}
                                  aria-label={previewVideoLabel}
                                  onCanPlay={(event) => {
                                    event.currentTarget.muted = true;
                                    event.currentTarget.play().catch(() => {});
                                  }}
                                />
                              ) : (
                                <iframe
                                  src={DEFAULT_MUX_SRC}
                                  title={FIRST_VIDEO.title}
                                  allow="autoplay; encrypted-media; picture-in-picture"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  tabIndex={-1}
                                />
                              )}
                            </div>
                            <p className="playbook-watch-now">{previewVideoLabel}</p>
                          </div>
                        </div>
                      ) : null}
                    </React.Fragment>
                  ))}
                </article>
              </motion.div>
            ) : (
              <motion.div
                key="index"
                className="playbook-shell"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <section className="playbook-index">
                  <p className="academy-workspace-kicker">{product}</p>
                  <h1>Lessons</h1>
                  <div className="playbook-module-grid academy-workspace-grid">
                    {previewCards.map((entry, index) => {
                      const isTarget = index === 0;

                      return (
                        <article
                          className={`playbook-module-card${isTarget ? " is-demo-target" : ""}${phase === "click" && isTarget ? " is-clicking" : ""}`}
                          key={entry.id}
                          style={{
                            "--card-color-1": entry.color1,
                            "--card-color-2": entry.color2
                          }}
                        >
                          <div className="playbook-module-thumb">
                            <OfferingShader
                              color1={entry.color1}
                              color2={entry.color2}
                              seed={index * 3.1 + 1.2}
                              mono
                              speed={0.32}
                              className="playbook-module-shader"
                            />
                            {isTarget ? (
                              <span className="academy-lesson-play">
                                <svg viewBox="0 0 24 24">
                                  <path d="M8.4 6.2v11.6L18.2 12z" />
                                </svg>
                                {reduceMotion ? null : (
                                  <motion.div
                                    className="academy-demo-cursor"
                                    variants={cursorVariants}
                                    initial="idle"
                                    animate={phase}
                                    transition={{
                                      x: { type: "spring", stiffness: 240, damping: 24 },
                                      y: { type: "spring", stiffness: 240, damping: 24 },
                                      scale: { duration: 0.12 },
                                      opacity: { duration: 0.18 }
                                    }}
                                  >
                                    <DemoCursor />
                                  </motion.div>
                                )}
                              </span>
                            ) : null}
                          </div>
                          <div className="playbook-module-body">
                            <h2>{entry.title}</h2>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AcademyWorkspacePreview;
