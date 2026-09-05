import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./theme.jsx";
import "./saas-mockup.css";

function Icon({ name }) {
  const paths = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    library: <><path d="M4 5.5 12 2l8 3.5-8 3.5-8-3.5Z" /><path d="m4 10 8 3.5 8-3.5M4 14.5l8 3.5 8-3.5" /></>,
    agents: <><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></>,
    code: <><path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18" /></>,
    activity: <path d="M3 12h4l2.2-6 4.2 12 2.3-6H21" />,
    voice: <path d="M21 14.5a2 2 0 0 1-2 2H7.5L3.5 20V5.5a2 2 0 0 1 2-2H19a2 2 0 0 1 2 2Z" />,
    assets: <><rect x="3" y="3" width="18" height="18" rx="2.5" /><circle cx="8.6" cy="8.6" r="1.6" /><path d="m20.5 15.5-4.8-4.8L5 21" /></>,
    components: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><path d="M17.5 14.5v6M14.5 17.5h6" /></>,
    tokens: <><path d="M12 3a9 9 0 1 0 0 18 2.4 2.4 0 0 0 0-4.8 2 2 0 0 1 0-4h4.4A4.6 4.6 0 0 0 21 7.6C21 4.9 17 3 12 3Z" /><circle cx="8.4" cy="9.2" r="1" /></>,
    plug: <><path d="M12 17v5M9 8V3M15 8V3" /><path d="M8 8h8v3a4 4 0 0 1-8 0V8Z" /></>,
    sparkles: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1" /></>,
    film: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v4M7 16v4M17 4v4M17 16v4M3 12h18" /></>,
    dollar: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M15.2 9.2C15.2 8 13.8 7.2 12 7.2S8.8 8 8.8 9.2 10.4 11 12 11s3.2.7 3.2 1.8S13.8 14.8 12 14.8 8.8 14 8.8 12.8" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

const navigation = [
  ["overview", "Overview"],
  ["agents", "Clients"],
  ["library", "Projects"],
  ["activity", "Agent team"],
  ["code", "Automations"]
];

const systemNavigation = [
  { group: "Start here", items: [["agents", "Agent Connect"]] },
  { group: "Brand", items: [["voice", "Brand System"], ["assets", "Assets"]] },
  { group: "Product", items: [["tokens", "Foundation Token"], ["components", "Components"], ["film", "Animation Library"], ["sparkles", "Skills"]] },
  { group: "Connectors", items: [["plug", "Connectors"]] },
  { group: "References", items: [["library", "Libraries"]] },
  { group: "Engineering", items: [["code", "Guardrails"]] },
  { group: "Quality", items: [["overview", "Dashboard"], ["activity", "Evals"]] },
  { group: "Internal", items: [["dollar", "Internal"]] }
];

const SYSTEM_PAGES = ["tokens", "components"];
const PAGE_MS = 6200;

const TOKEN_GROUPS = [
  {
    id: "color",
    label: "Color",
    items: [
      { name: "--color-text-primary", role: "Primary text", swatch: "var(--color-text-primary)" },
      { name: "--color-text-secondary", role: "Secondary text", swatch: "var(--color-text-secondary)" },
      { name: "--color-bg-page", role: "Page", swatch: "var(--color-bg-page)" },
      { name: "--color-bg-subtle", role: "Canvas", swatch: "var(--color-bg-subtle)" },
      { name: "--color-bg-brand", role: "Brand fill", swatch: "var(--color-bg-brand)" },
      { name: "--color-border-default", role: "Default stroke", swatch: "var(--color-border-default)" },
      { name: "--color-interactive-primary", role: "Primary action", swatch: "var(--color-interactive-primary)" },
      { name: "--color-focus-ring", role: "Focus", swatch: "var(--color-focus-ring)" }
    ]
  },
  {
    id: "typography",
    label: "Typography",
    items: [
      { name: "--text-display-*", role: "Page heroes" },
      { name: "--text-metric-*", role: "Balances and KPIs" },
      { name: "--text-heading-*", role: "Section titles" },
      { name: "--text-body-*", role: "Reading copy" },
      { name: "--text-label-*", role: "Controls" },
      { name: "--text-caption-*", role: "Meta and hints" }
    ]
  },
  {
    id: "spacing",
    label: "Spacing",
    items: [
      { name: "--space-inset-*", role: "Padding inside surfaces" },
      { name: "--space-stack-*", role: "Vertical rhythm" },
      { name: "--space-inline-*", role: "Horizontal gaps" },
      { name: "--space-section-*", role: "Section breaks" }
    ]
  },
  {
    id: "motion",
    label: "Motion",
    items: [
      { name: "--motion-interaction-*", role: "Buttons and controls" },
      { name: "--motion-expand-*", role: "Disclosure" },
      { name: "--motion-overlay-*", role: "Menus and toasts" },
      { name: "--motion-modal-*", role: "Dialogs" }
    ]
  }
];

const COMPONENT_ROWS = [
  { name: "Button", category: "Actions", when: "Primary CTA, submit, or destructive confirm", id: "button.json" },
  { name: "Input", category: "Forms", when: "Single-line text with label and error", id: "input.json" },
  { name: "Select", category: "Forms", when: "One value from a known list", id: "select.json" },
  { name: "Switch", category: "Forms", when: "Immediate on/off setting", id: "switch.json" },
  { name: "Sidebar", category: "Navigation", when: "App shell primary nav", id: "sidebar.json" },
  { name: "Tabs", category: "Navigation", when: "Peer views in the same page", id: "tabs.json" },
  { name: "KPI card", category: "Data", when: "One metric with optional delta", id: "kpi-card.json" },
  { name: "Insight card", category: "Data", when: "A recommended action or finding", id: "insight-card.json" },
  { name: "Data table", category: "Data", when: "Structured operational rows", id: "data-table.json" },
  { name: "Chat pattern", category: "Agentic", when: "Full assistant conversation surface", id: "chat-pattern.json" }
];

const studioMetrics = [
  { label: "Revenue", value: "$1.84M", change: "+18.4%", tone: "blue" },
  { label: "Active projects", value: "24", change: "+4 this month", tone: "violet" },
  { label: "Pipeline", value: "$2.6M", change: "8 opportunities", tone: "green" }
];

const activeProjects = [
  { client: "Sonder", project: "Brand system", status: "In review", progress: "82%" },
  { client: "Nova", project: "Launch campaign", status: "In progress", progress: "64%" },
  { client: "Harbor", project: "Content engine", status: "Agent running", progress: "48%" }
];

const agentTeam = [
  { initials: "OP", name: "Operations Agent", task: "Coordinating 8 projects", tone: "violet" },
  { initials: "CS", name: "Client Success", task: "Preparing 3 updates", tone: "blue" },
  { initials: "CP", name: "Content Producer", task: "Creating Nova assets", tone: "green" }
];

const PAGE_META = {
  tokens: {
    title: "Foundation Token",
    lede: "Semantic roles agents must use. Free reads Florence. Studio publishes your own.",
    navActive: "Foundation Token"
  },
  components: {
    title: "Components",
    lede: "Retrieve the contract before composing. The MCP will not invent a sibling control.",
    navActive: "Components"
  }
};

function MockTokenPage({ locked = false }) {
  const [activeGroup, setActiveGroup] = useState(TOKEN_GROUPS[0].id);
  const group = TOKEN_GROUPS.find((item) => item.id === activeGroup) ?? TOKEN_GROUPS[0];

  return (
    <div className="saas-app-page">
      <article className="saas-insight-card">
        <p className="saas-insight-card__eyebrow">Free</p>
        <h4>Studio generates a system you can plug in</h4>
        <p>
          Free already removes slop by serving Florence over MCP. For $99 you get one seat and a generator that publishes your tokens here.
        </p>
        <Chrome locked={locked} className="saas-btn-primary">View Studio</Chrome>
      </article>
      <div className="saas-tabs" role="tablist" aria-label="Token groups">
        {TOKEN_GROUPS.map((tab) => {
          const selected = tab.id === group.id;
          return (
            <Chrome
              locked={locked}
              className={selected ? "active" : ""}
              key={tab.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveGroup(tab.id)}
            >
              {tab.label}
            </Chrome>
          );
        })}
      </div>
      <ul className="saas-token-list">
        {group.items.map((token) => (
          <li className="saas-token-row" key={token.name}>
            {token.swatch ? (
              <span
                className="saas-token-swatch saas-token-swatch--bordered"
                style={{ background: token.swatch }}
                aria-hidden="true"
              />
            ) : (
              <span className="saas-token-swatch saas-token-swatch--type" aria-hidden="true" />
            )}
            <div>
              <code>{token.name}</code>
              <span>{token.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MockComponentsTable() {
  return (
    <div className="saas-app-page">
      <div className="saas-table-shell">
        <div className="saas-table-toolbar">
          <span className="saas-table-search"><i />Search components</span>
        </div>
        <table className="saas-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Category</th>
              <th>When to use</th>
              <th>Contract</th>
            </tr>
          </thead>
          <tbody>
            {COMPONENT_ROWS.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td><span className="saas-table-tag">{row.category}</span></td>
                <td>{row.when}</td>
                <td><code>{row.id}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Chrome({ locked, className, children, ...rest }) {
  if (locked) {
    return (
      <span className={className} aria-hidden="true">
        {children}
      </span>
    );
  }

  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
}

function SaaSProductMockup({ embedded = false, locked = false, story = "studio" }) {
  const reduceMotion = useReducedMotion();
  const { isDark, setTheme } = useTheme();
  const isContext = story === "context";
  const deviceTheme = isContext ? (isDark ? "dark" : "light") : undefined;
  const [pageIndex, setPageIndex] = useState(0);
  const cyclePages = isContext;
  const animatePageTransition = cyclePages && !reduceMotion;
  const currentPage = SYSTEM_PAGES[pageIndex];
  const pageMeta = PAGE_META[currentPage];

  useEffect(() => {
    if (!cyclePages) return undefined;
    const id = setInterval(() => setPageIndex((current) => (current + 1) % SYSTEM_PAGES.length), PAGE_MS);
    return () => clearInterval(id);
  }, [cyclePages]);

  return (
    <section
      className={`saas-preview${embedded ? " saas-preview-embedded" : ""}${locked ? " saas-preview-locked" : ""}`}
      aria-labelledby={embedded || locked ? undefined : "saas-preview-title"}
      aria-hidden={locked ? "true" : undefined}
      data-nav-theme="dark"
    >
      {!embedded && <div className="saas-preview-heading reveal">
        <div>
          <p className="eyebrow">Product Preview</p>
          <h2 id="saas-preview-title">Your AI team, built to scale your creative business.</h2>
        </div>
        <div className="saas-preview-intro">
          <p>Keep clients, projects, revenue, and new business moving without losing context or letting opportunities fall through the cracks.</p>
          <a href="/product">Explore the product <span aria-hidden="true">↗</span></a>
        </div>
      </div>}

      <motion.div
        className={`saas-device reveal${isContext ? ` saas-device--system saas-device--${deviceTheme}` : ""}`}
        initial={reduceMotion ? undefined : { opacity: 0, y: 28, scale: 0.985 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        data-theme={deviceTheme}
      >
        <div className="saas-window-bar">
          <div className="saas-window-dots" aria-hidden="true"><span /><span /><span /></div>
          <div className="saas-window-address"><span className="saas-lock" />system.humanaistudio.ai</div>
          <div className="saas-window-actions" aria-hidden="true"><span /><span /></div>
        </div>

        <div className="saas-app">
          <aside className={`saas-sidebar${isContext ? " saas-sidebar--system" : ""}`}>
            <div className="saas-app-brand"><strong>Florence AI</strong></div>
            <div className="saas-workspace-switcher">
              <div>
                <strong>{isContext ? "Northwind Health" : "Northstar Creative"}</strong>
                {isContext ? null : <small>Agency workspace</small>}
              </div>
              <span className="saas-chevron">⌄</span>
            </div>
            {isContext ? (
              <nav aria-label="Product mockup">
                {systemNavigation.map((section) => (
                  <div className="saas-nav-group" key={section.group}>
                    <p>{section.group}</p>
                    {section.items.map(([icon, label]) => (
                      <span className={label === pageMeta.navActive ? "active" : ""} key={label}>
                        <Icon name={icon} />
                        {label}
                      </span>
                    ))}
                  </div>
                ))}
              </nav>
            ) : (
              <nav aria-label="Product mockup">
                {navigation.map(([icon, label], index) => (
                  <span className={index === 0 ? "active" : ""} key={label}><Icon name={icon} />{label}</span>
                ))}
              </nav>
            )}
            <div className="saas-sidebar-spacer" />
            {isContext ? (
              <div className="saas-theme-switch">
                <span>Dark mode</span>
                {locked ? (
                  <span
                    className="saas-switch"
                    data-on={isDark ? "" : undefined}
                    aria-hidden="true"
                  >
                    <i />
                  </span>
                ) : (
                  <button
                    type="button"
                    className="saas-switch"
                    role="switch"
                    aria-checked={isDark}
                    aria-label="Dark mode"
                    data-on={isDark ? "" : undefined}
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                  >
                    <i />
                  </button>
                )}
              </div>
            ) : null}
            <span className="saas-settings"><Icon name="settings" />Settings</span>
            <div className="saas-user"><span>JR</span><div><strong>John Rodrigues</strong><small>Workspace admin</small></div><i /></div>
          </aside>

          <div className="saas-main">
            {!isContext ? (
              <header className="saas-topbar">
                <div className="saas-breadcrumb">
                  <span>Northstar Creative</span>
                  <i>/</i>
                  <strong>Overview</strong>
                </div>
                <div className="saas-top-actions">
                  <Chrome locked={locked} className="saas-icon-button" aria-label="Search">⌕</Chrome>
                  <Chrome locked={locked} className="saas-share">Share</Chrome>
                  <span className="saas-avatar">JR</span>
                </div>
              </header>
            ) : null}

            <div className="saas-content">
              {isContext ? (
                <div className="saas-canvas">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      className="saas-canvas-page"
                      initial={animatePageTransition ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      exit={animatePageTransition ? { opacity: 0 } : undefined}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <header className="saas-page-header">
                        <div>
                          <p>Product</p>
                          <h3>{pageMeta.title}</h3>
                          <span>{pageMeta.lede}</span>
                        </div>
                        {currentPage === "tokens" ? (
                          <div className="saas-page-header__actions">
                            <span className="saas-tag">MCP off</span>
                            <Chrome locked={locked} className="saas-btn-secondary">Upgrade to Studio</Chrome>
                          </div>
                        ) : null}
                      </header>
                      <div className="saas-canvas-body">
                        {currentPage === "tokens" ? <MockTokenPage locked={locked} /> : <MockComponentsTable />}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <div className="saas-content-title saas-ops-title">
                    <div>
                      <p>Creative business OS</p>
                      <h3>Good morning, Alex.</h3>
                      <span>Here’s how your studio is performing today.</span>
                    </div>
                    <Chrome locked={locked}><span>+</span>New project</Chrome>
                  </div>

                  <div className="saas-command-grid">
                    <div className="saas-command-main">
                      <div className="saas-metrics-grid">
                        {studioMetrics.map((metric) => <article className={`saas-metric-card ${metric.tone}`} key={metric.label}><div><span>{metric.label}</span><i>↗</i></div><strong>{metric.value}</strong><small>{metric.change}</small></article>)}
                      </div>

                      <div className="saas-operations-grid">
                        <div className="saas-operations-main">
                          <article className="saas-revenue-card">
                            <div className="saas-card-head"><div><p>Revenue overview</p><span>January – June</span></div><Chrome locked={locked}>•••</Chrome></div>
                            <div className="saas-revenue-total"><strong>$1.84M</strong><span>+18.4% vs last period</span></div>
                            <div className="saas-chart" aria-hidden="true"><span style={{ height: "34%" }} /><span style={{ height: "48%" }} /><span style={{ height: "42%" }} /><span style={{ height: "61%" }} /><span style={{ height: "72%" }} /><span style={{ height: "88%" }} /><i /></div>
                            <div className="saas-chart-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
                          </article>

                          <div className="saas-workforce-row">
                            <article className="saas-projects-card">
                              <div className="saas-card-head"><div><p>Active work</p><span>Priority projects</span></div><Chrome locked={locked}>View all →</Chrome></div>
                              {activeProjects.map((project) => <div className="saas-project-row" key={project.client}><span className="saas-project-logo">{project.client.slice(0, 1)}</span><div><strong>{project.client}</strong><small>{project.project}</small></div><em>{project.status}</em><i><b style={{ width: project.progress }} /></i><span>{project.progress}</span></div>)}
                            </article>

                            <article className="saas-agent-team-card">
                              <div className="saas-card-head"><div><p>Agent team</p><span>3 agents working</span></div><Chrome locked={locked}>Manage →</Chrome></div>
                              {agentTeam.map((agent) => <div className="saas-agent-member" key={agent.name}><span className={`agent-orb ${agent.tone}`}>{agent.initials}</span><div><strong>{agent.name}</strong><small>{agent.task}</small></div><i aria-label="Online" /></div>)}
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>

                    <aside className="saas-agent-chat">
                      <header>
                        <span className="agent-orb violet">AI</span>
                        <div>
                          <strong>Studio Agent</strong>
                          <small><i />Online · has full context</small>
                        </div>
                        <Chrome locked={locked}>•••</Chrome>
                      </header>
                      <div className="saas-chat-day">Today</div>
                      <div className="saas-chat-message agent">
                        Morning Alex. Three deliverables are due this week and the Nova campaign is waiting on client approval.
                      </div>
                      <div className="saas-chat-message user">
                        Move the campaign forward and prepare the next client update.
                      </div>
                      <div className="saas-chat-message agent">
                        Done. I advanced the production tasks, drafted the update, and scheduled it for your review at 2 PM.
                      </div>
                      <div className="saas-agent-actions"><span>✓ 4 tasks updated</span><span>✦ Draft ready</span></div>
                      <div className="saas-chat-input">
                        <p>Ask your studio agent…</p>
                        <Chrome locked={locked}>↑</Chrome>
                      </div>
                    </aside>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default SaaSProductMockup;
