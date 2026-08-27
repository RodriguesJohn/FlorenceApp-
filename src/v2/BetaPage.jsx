import React from "react";
import "./beta.css";
import DesignSystemsPage from "./DesignSystemsPage.jsx";
import ToolsPage from "./ToolsPage.jsx";

const newsletterUrl = "https://johnrodrigues.substack.com/";

const modules = [
  {
    id: "home",
    section: "membership",
    label: "Home",
    title: "Home",
    body: "Ship without the AI slop."
  },
  {
    id: "articles",
    section: "membership",
    label: "Articles",
    title: "Articles",
    body: "Essays and notes on AI-ready design systems."
  },
  {
    id: "academy",
    section: "membership",
    label: "Academy",
    title: "Academy",
    body: "Lessons in Figma, design, and code for AI-ready design systems."
  },
  {
    id: "tools",
    section: "membership",
    label: "Tools",
    title: "Tools",
    body: "Workflows, MCPs, and plugins for building AI-ready design systems."
  },
  {
    id: "studio",
    section: "studio",
    label: "Studio",
    href: "/"
  },
  {
    id: "workshop",
    section: "studio",
    label: "Workshop",
    title: "Workshop",
    body: "The live AI-ready design systems workshop. Framework, evals, and implementation."
  },
  {
    id: "florence",
    section: "studio",
    label: "Florence",
    href: "/design-systems"
  }
];

const membershipNav = modules.filter((item) => item.section === "membership");
const studioNav = modules.filter((item) => item.section === "studio");

const articles = [
  {
    id: "florence-instead-of-prompts",
    title: "I built Florence so I could stop describing the system",
    dek: "A prompt is a poor substitute for a component contract.",
    date: "Aug 2026",
    read: "8 min",
    body: [
      "Every session started the same way. I’d paste tokens, list components, and remind the model which button was the real one. Then I’d do it again the next day.",
      "Florence is the system I got tired of explaining. Tokens, components, and the contracts that say how they get used. The agent reads the same files the product uses.",
      "The prompt got shorter. The output got closer. Not because the writing got better. Because the system was finally in the loop."
    ]
  },
  {
    id: "first-eval-that-failed",
    title: "The first eval that failed",
    dek: "Readiness isn’t a vibe. It’s a score you can rerun.",
    date: "Jul 2026",
    read: "7 min",
    body: [
      "We said the system was agent-ready. Then we ran the eval. Catalog match fell apart the moment the prompt left the happy path.",
      "That failure was useful. It showed which components had names, which tokens were reachable, and which parts of the system only lived in someone’s head.",
      "I don’t trust a design system that can’t fail in public. If you can’t score it, you can’t tell when it got better."
    ]
  },
  {
    id: "two-users-now",
    title: "Two users for every component",
    dek: "Humans click it. Agents have to find it.",
    date: "Jul 2026",
    read: "5 min",
    body: [
      "A component used to have one job: look right and behave right in the product. That’s still the job. It just isn’t the only one.",
      "Agents search by name, props, and the rules around usage. If those aren’t in the system, the agent will invent a cousin and ship that instead.",
      "I design for both now. The visual is for the person. The contract is for the agent. Skip either one and you get slop."
    ]
  },
  {
    id: "what-stays-out-of-the-prompt",
    title: "What we keep out of the prompt",
    dek: "If it belongs in the system, it shouldn’t live in chat.",
    date: "Jun 2026",
    read: "6 min",
    body: [
      "Color, type, spacing, and the component map do not belong in a prompt. They belong in files the agent can retrieve every time.",
      "The prompt is for the task. Build this flow. Use the existing button. Don’t invent a new card. The system handles the rest.",
      "That’s how we ship fast without the AI slop. Not by writing longer instructions. By putting the design system where the agent already looks."
    ]
  }
];

const academyTabs = [
  { id: "all", label: "All" },
  { id: "figma", label: "Figma" },
  { id: "design", label: "Design" },
  { id: "code", label: "Code" },
  { id: "skills", label: "Skills" },
  { id: "ui", label: "UI" },
  { id: "workflows", label: "AI workflows" }
];

const academyLessons = [
  {
    id: "figma-architecture",
    tab: "figma",
    title: "Intro to AI-ready design systems",
    body: "Name variants, properties, and frames so an agent can find the real component instead of drawing a cousin."
  },
  {
    id: "figma-tokens",
    tab: "figma",
    title: "Color tokens",
    body: "Color, type, and spacing as named values in the file, not a screenshot of the styles panel."
  },
  {
    id: "figma-handoff",
    tab: "figma",
    title: "Handoff that survives the prompt",
    body: "What to publish from Figma so code and agents share one source, not a dump of frames."
  },
  {
    id: "design-framework",
    tab: "design",
    title: "Agent-ready framework",
    body: "Tokens, naming, components, and docs structured so agents can retrieve the system and ship on-brand UI."
  },
  {
    id: "design-two-users",
    tab: "design",
    title: "Two users for every component",
    body: "Humans click it. Agents have to find it. Design the contract as carefully as the visual."
  },
  {
    id: "design-evals",
    tab: "design",
    title: "Readiness evals",
    body: "A benchmark for where your system breaks for models, and a way to re-test it as you fix it."
  },
  {
    id: "code-contracts",
    tab: "code",
    title: "Component contracts",
    body: "Props, states, and usage rules in the repo so the agent builds with the real button, not a new one."
  },
  {
    id: "code-mcp",
    tab: "code",
    title: "MCPs and the system loop",
    body: "Connect the design system to the tools you already use, so the prompt stays short and the output stays on-brand."
  },
  {
    id: "code-florence",
    tab: "code",
    title: "Florence in the repo",
    body: "Walk the same files, tokens, and component contracts we use internally."
  },
  {
    id: "skills-prompting",
    tab: "skills",
    title: "Prompting with the system",
    body: "Keep the task in the prompt. Put tokens, components, and rules in files the agent can retrieve."
  },
  {
    id: "skills-evals",
    tab: "skills",
    title: "Running a readiness eval",
    body: "Score whether an agent can find the real component, then rerun it after you fix the system."
  },
  {
    id: "skills-cursor",
    tab: "skills",
    title: "Agents in the editor",
    body: "Use Cursor and Claude Code against the same contracts, not a new UI invented in chat."
  },
  {
    id: "ui-reuse",
    tab: "ui",
    title: "UI the agent can reuse",
    body: "Name the real component. Show the states. If the model can’t find it, it will draw a cousin."
  },
  {
    id: "ui-states",
    tab: "ui",
    title: "States as part of the contract",
    body: "Hover, empty, error, and loading belong in the system, not as a paragraph in the prompt."
  },
  {
    id: "ui-type-space",
    tab: "ui",
    title: "Type and space in the file",
    body: "Size, leading, and spacing as named values. A screenshot of the canvas is not a source of truth."
  },
  {
    id: "workflows-loop",
    tab: "workflows",
    title: "A workflow the system can run",
    body: "The task stays in the prompt. Tokens, components, and rules stay in files the agent retrieves every time."
  },
  {
    id: "workflows-eval",
    tab: "workflows",
    title: "Evals in the weekly loop",
    body: "Score whether the agent found the real component, then rerun it after you change the system."
  },
  {
    id: "workflows-ship",
    tab: "workflows",
    title: "Ship a flow without a new UI",
    body: "Use the existing button, the existing card, and the existing tokens. If it’s missing, add it to the system first."
  }
];

const homePlans = [
  {
    id: "weekly",
    kicker: "Free",
    title: "Weekly notes",
    price: "Free",
    cadence: "",
    body: "A short note each week. What I changed in the system, and what broke.",
    includes: ["Weekly email", "Unsubscribe anytime"],
    cta: "Join the newsletter",
    href: newsletterUrl
  },
  {
    id: "academy",
    kicker: "Membership",
    title: "Academy",
    price: "$99",
    cadence: "/ month",
    body: "Lessons, articles, tools, and Florence. The loop for shipping without the AI slop.",
    includes: ["Articles, included", "All academy lessons", "Tools and Florence", "Cancel anytime"],
    cta: "Get membership",
    join: true
  },
  {
    id: "workshop",
    kicker: "One day",
    title: "Workshop",
    price: "$599",
    cadence: "one day",
    body: "Live. Framework, evals, and an implementation plan you can run the next morning.",
    includes: ["Four hours live", "Lifetime recording", "Certificate of completion"],
    cta: "Join the workshop",
    view: "workshop"
  }
];

function Icon({ name }) {
  const paths = {
    home: (
      <>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10.5V20h12V10.5" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
    academy: (
      <>
        <path d="M4 10.5 12 5l8 5.5" />
        <path d="M6 11.5V18h12v-6.5" />
        <path d="M12 18v-4" />
      </>
    ),
    articles: (
      <>
        <path d="M7 4h10v16H7z" />
        <path d="M10 8h4M10 12h4M10 16h2" />
      </>
    ),
    tools: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <rect x="13" y="4" width="7" height="7" rx="1" />
        <rect x="4" y="13" width="7" height="7" rx="1" />
        <rect x="13" y="13" width="7" height="7" rx="1" />
      </>
    ),
    florence: <circle cx="12" cy="12" r="7" />,
    workshop: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 19c.8-3.2 3.4-5 7-5s6.2 1.8 7 5" />
      </>
    ),
    studio: (
      <>
        <circle cx="9.5" cy="12" r="4.5" />
        <circle cx="14.5" cy="12" r="4.5" />
      </>
    )
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function NavButton({ item, active, onOpen }) {
  const inner = (
    <>
      <span className="beta-nav-icon">
        <Icon name={item.id} />
      </span>
      <span className="beta-nav-label">{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <a className="beta-nav-item" href={item.href}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`beta-nav-item${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
      onClick={() => onOpen(item.id)}
    >
      {inner}
    </button>
  );
}

function CardBoard({ items, onOpen }) {
  return (
    <section className="beta-board" aria-label="Library">
      {items.map((item) => {
        const className = `beta-card${item.featured ? " beta-card--featured" : ""}`;
        const inner = (
          <>
            {item.eyebrow ? <span className="beta-card-kicker">{item.eyebrow}</span> : null}
            <strong>{item.title}</strong>
            <span>{item.body}</span>
            <em>{item.action}</em>
          </>
        );

        if (!onOpen) {
          return (
            <article className={className} key={item.id}>
              {inner}
            </article>
          );
        }

        return (
          <button
            type="button"
            className={className}
            key={item.id}
            onClick={() => onOpen(item)}
          >
            {inner}
          </button>
        );
      })}
    </section>
  );
}

function LessonBoard({ items }) {
  return (
    <section className="beta-lessons" aria-label="Lessons">
      {items.map((item) => {
        const n = String(academyLessons.findIndex((lesson) => lesson.id === item.id) + 1).padStart(
          2,
          "0"
        );

        return (
          <article className="beta-lesson" key={item.id}>
            <span className="beta-lesson-n" aria-hidden="true">
              {n}
            </span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        );
      })}
    </section>
  );
}

function AuthModal({ mode, onClose, onJoin, onLogin, onSwitch }) {
  const dialogRef = React.useRef(null);
  const isLogin = mode === "login";

  React.useEffect(() => {
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      [...(dialog?.querySelectorAll("button, input") ?? [])].filter(
        (node) => !node.hasAttribute("disabled")
      );

    requestAnimationFrame(() => {
      if (isLogin) {
        dialog?.querySelector("input")?.focus();
      } else {
        dialog?.querySelector(".beta-cta")?.focus();
      }
    });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) return;

      const nodes = focusable();
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [isLogin, onClose]);

  const submitLogin = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div className="beta-modal">
      <button
        type="button"
        className="beta-modal-backdrop"
        aria-label={isLogin ? "Close login" : "Close membership"}
        onClick={onClose}
      />
      <div
        className="beta-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="beta-auth-title"
        aria-describedby="beta-auth-copy"
        ref={dialogRef}
        tabIndex={-1}
      >
        <button type="button" className="beta-modal-close" onClick={onClose}>
          Close
        </button>
        <p className="beta-card-kicker">{isLogin ? "Members" : "Membership"}</p>
        <h2 id="beta-auth-title">
          {isLogin ? "Log in" : "AI Design Systems Academy"}
        </h2>
        <p id="beta-auth-copy" className="beta-lede">
          {isLogin
            ? "Welcome back. Use the email you joined with."
            : "Lessons for building AI-ready design systems, so you can ship fast without the AI slop."}
        </p>

        {isLogin ? (
          <form className="beta-auth-form" onSubmit={submitLogin}>
            <label htmlFor="beta-login-email">Email</label>
            <input
              id="beta-login-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
            />
            <label htmlFor="beta-login-password">Password</label>
            <input
              id="beta-login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            <button type="submit" className="beta-cta">
              Log in
            </button>
          </form>
        ) : (
          <>
            <p className="beta-join-price">
              <span>$99</span>
              <small>/ month</small>
            </p>
            <ul className="beta-join-list">
              <li>Articles, included</li>
              <li>Figma, design, and code lessons</li>
              <li>Tools and Florence</li>
              <li>Cancel anytime</li>
            </ul>
            <button type="button" className="beta-cta" onClick={onJoin}>
              Join for $99/month
            </button>
          </>
        )}

        <button type="button" className="beta-auth-switch" onClick={onSwitch}>
          {isLogin ? "New here? Get membership" : "Already a member? Log in"}
        </button>
      </div>
    </div>
  );
}

function AcademyView() {
  const [tab, setTab] = React.useState("all");
  const [authMode, setAuthMode] = React.useState(null);
  const tabRefs = React.useRef([]);

  const visible =
    tab === "all" ? academyLessons : academyLessons.filter((item) => item.tab === tab);

  const moveTab = (index) => {
    const next = (index + academyTabs.length) % academyTabs.length;
    setTab(academyTabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const closeAuth = () => setAuthMode(null);

  return (
    <>
      <header className="beta-academy-hero">
        <div className="beta-academy-hero-copy">
          <h1>
            <span>AI Design Systems</span>
            <span>Academy</span>
          </h1>
        </div>
        <div className="beta-academy-hero-cta">
          <p className="beta-lede">Ship without the AI slop.</p>
          <div className="beta-welcome-actions">
            <button
              type="button"
              className="beta-cta"
              aria-haspopup="dialog"
              onClick={() => setAuthMode("join")}
            >
              Get membership
            </button>
            <button
              type="button"
              className="beta-cta beta-cta--ghost"
              aria-haspopup="dialog"
              onClick={() => setAuthMode("login")}
            >
              Log in
            </button>
          </div>
        </div>
      </header>

      <div
        className="beta-tabs"
        role="tablist"
        aria-label="Academy tracks"
      >
        {academyTabs.map((item, index) => {
          const selected = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`beta-tab-${item.id}`}
              className={`beta-tab${selected ? " is-active" : ""}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              onClick={() => setTab(item.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveTab(index + 1);
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveTab(index - 1);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  moveTab(0);
                }
                if (event.key === "End") {
                  event.preventDefault();
                  moveTab(academyTabs.length - 1);
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`beta-panel-${tab}`}
        aria-labelledby={`beta-tab-${tab}`}
      >
        <LessonBoard items={visible} />
      </div>

      {authMode ? (
        <AuthModal
          mode={authMode}
          onClose={closeAuth}
          onJoin={closeAuth}
          onLogin={closeAuth}
          onSwitch={() => setAuthMode(authMode === "login" ? "join" : "login")}
        />
      ) : null}
    </>
  );
}

function HomeView({ onOpen }) {
  const [authMode, setAuthMode] = React.useState(null);
  const closeAuth = () => setAuthMode(null);

  return (
    <div className="beta-home">
      <header className="beta-home-hero">
        <h1>
          <span>AI Design Systems</span>
          <span>Academy</span>
        </h1>
        <p className="beta-lede">
          Agents invent UI when the system lives in a prompt. The academy puts it in files —
          so you ship without the AI slop.
        </p>
        <div className="beta-welcome-actions">
          <button
            type="button"
            className="beta-cta"
            aria-haspopup="dialog"
            onClick={() => setAuthMode("join")}
          >
            Get membership
          </button>
          <button type="button" className="beta-cta beta-cta--ghost" onClick={() => onOpen("workshop")}>
            Join the workshop
          </button>
        </div>
        <button
          type="button"
          className="beta-home-login"
          aria-haspopup="dialog"
          onClick={() => setAuthMode("login")}
        >
          Log in
        </button>
      </header>

      <section className="beta-home-block" aria-labelledby="beta-included-title">
        <h2 id="beta-included-title">What’s included</h2>
        <ol className="beta-home-list">
          <li>
            <span>
              <strong>Articles, included.</strong> The notes on making a system agent-ready. They come
              with membership.
            </span>
          </li>
          <li>
            <span>
              <strong>Lessons.</strong> Figma, design, code, UI, and AI workflows. The weekly loop.
            </span>
          </li>
          <li>
            <span>
              <strong>Tools.</strong> Apple Notes MCP and Ollie for Figma. Use them the same day.
            </span>
          </li>
          <li>
            <span>
              <strong>Florence.</strong> The reference system. Tokens, components, and contracts an
              agent can retrieve.
            </span>
          </li>
        </ol>
      </section>

      <section className="beta-home-block is-plans" aria-labelledby="beta-plans-title">
        <h2 id="beta-plans-title">Join</h2>
        <div className="beta-plans">
          {homePlans.map((plan) => (
            <article className={`beta-plan${plan.join ? " is-membership" : ""}`} key={plan.id}>
              <p className="beta-card-kicker">{plan.kicker}</p>
              <h3>{plan.title}</h3>
              <p className="beta-plan-price">
                <span>{plan.price}</span>
                <small>{plan.cadence}</small>
              </p>
              <p>{plan.body}</p>
              <ul>
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {plan.href ? (
                <a
                  className="beta-cta beta-cta--ghost"
                  href={plan.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {plan.cta}
                </a>
              ) : plan.join ? (
                <button
                  type="button"
                  className="beta-cta"
                  aria-haspopup="dialog"
                  onClick={() => setAuthMode("join")}
                >
                  {plan.cta}
                </button>
              ) : (
                <button
                  type="button"
                  className="beta-cta beta-cta--ghost"
                  onClick={() => onOpen(plan.view)}
                >
                  {plan.cta}
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      {authMode ? (
        <AuthModal
          mode={authMode}
          onClose={closeAuth}
          onJoin={closeAuth}
          onLogin={closeAuth}
          onSwitch={() => setAuthMode(authMode === "login" ? "join" : "login")}
        />
      ) : null}
    </div>
  );
}

function ArticlesView() {
  const [openId, setOpenId] = React.useState(null);
  const article = articles.find((item) => item.id === openId);

  if (article) {
    return (
      <article className="beta-article" aria-labelledby="beta-article-title">
        <button type="button" className="beta-back" onClick={() => setOpenId(null)}>
          All articles
        </button>
        <h1 id="beta-article-title">{article.title}</h1>
        <p className="beta-lede">{article.dek}</p>
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    );
  }

  return (
    <>
      <div className="beta-welcome">
        <h1>Articles</h1>
        <p className="beta-lede">Essays and notes on AI-ready design systems.</p>
      </div>
      <CardBoard
        items={articles.map((item) => ({
          id: item.id,
          title: item.title,
          body: item.dek,
          action: `${item.read} · ${item.date}`
        }))}
        onOpen={(item) => setOpenId(item.id)}
      />
    </>
  );
}

export default function BetaPage() {
  const [view, setView] = React.useState("home");
  const [navOpen, setNavOpen] = React.useState(false);
  const current = modules.find((item) => item.id === view) ?? modules[0];

  React.useEffect(() => {
    const previousBackground = document.body.style.background;
    document.body.style.background = "#000";
    return () => {
      document.body.style.background = previousBackground;
    };
  }, []);

  React.useEffect(() => {
    setNavOpen(false);
  }, [view]);

  const openModule = (id) => {
    setView(id);
  };

  return (
    <div className="beta-app">
      <a className="beta-skip" href="#beta-main">
        Skip to content
      </a>

      {navOpen ? (
        <button
          type="button"
          className="beta-backdrop"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      ) : null}

      <aside
        id="beta-sidebar"
        className={`beta-sidebar${navOpen ? " is-open" : ""}`}
        aria-label="AI Design Systems"
      >
        <button
          type="button"
          className="beta-brand"
          aria-current={view === "home" ? "page" : undefined}
          onClick={() => openModule("home")}
        >
          <span className="beta-brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <div>
            <strong>AI Design Systems</strong>
            <small>Academy membership</small>
          </div>
        </button>

        <nav className="beta-nav">
          <div className="beta-nav-group">
            {membershipNav.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                active={item.id === view}
                onOpen={openModule}
              />
            ))}
          </div>

          <div className="beta-nav-group">
            {studioNav.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                active={item.id === view}
                onOpen={openModule}
              />
            ))}
          </div>
        </nav>
      </aside>

      <div className="beta-shell">
        <header className="beta-topbar">
          <button
            type="button"
            className="beta-menu"
            aria-expanded={navOpen}
            aria-controls="beta-sidebar"
            onClick={() => setNavOpen((open) => !open)}
          >
            Menu
          </button>
          <p className="beta-crumb">
            {current.section === "membership" ? (
              current.id === "academy" || current.id === "home" ? (
                <strong>{current.label}</strong>
              ) : (
                <>
                  Academy <span aria-hidden="true">/</span> <strong>{current.label}</strong>
                </>
              )
            ) : (
              <strong>{current.label}</strong>
            )}
          </p>
        </header>

        <main
          id="beta-main"
          className={`beta-main${current.id === "workshop" || current.id === "tools" ? " beta-main--flush" : ""}`}
        >
          {current.id === "home" ? (
            <HomeView onOpen={openModule} />
          ) : current.id === "articles" ? (
            <ArticlesView />
          ) : current.id === "academy" ? (
            <AcademyView />
          ) : current.id === "workshop" ? (
            <DesignSystemsPage embedded />
          ) : current.id === "tools" ? (
            <ToolsPage embedded />
          ) : (
            <section className="beta-module-view" aria-labelledby="beta-module-title">
              <div className="beta-module-copy">
                <h1 id="beta-module-title">{current.title}</h1>
                <p className="beta-lede">{current.body}</p>
              </div>
              <div className="beta-module-stage">
                <p>Open in the beta. Content for this room is still being added.</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
