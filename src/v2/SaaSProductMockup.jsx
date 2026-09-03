import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  { group: "Brand", items: [["voice", "Voice & tone"], ["assets", "Logo & assets"]] },
  { group: "Design system", items: [["library", "Foundations"], ["components", "Components"], ["tokens", "Tokens"]] },
  { group: "Engineering", items: [["code", "Constraints"]] },
  { group: "Quality", items: [["activity", "Evals"]] }
];

const componentFilters = [
  ["All", "28"],
  ["Base", "14"],
  ["Data display", "6"],
  ["Agentic", "4"],
  ["Motion", "4"]
];

const componentCards = [
  {
    name: "Button",
    meta: "5 variants · 3 sizes",
    detail: "Contract retrieved by Cursor",
    preview: (
      <div className="dsp-buttons">
        <span className="dsp-btn-primary">Save changes</span>
        <span className="dsp-btn-ghost">Cancel</span>
      </div>
    )
  },
  {
    name: "Input",
    meta: "Label · hint · error",
    detail: "Form contract resolved",
    preview: (
      <div className="dsp-field">
        <small>Work email</small>
        <span className="dsp-input">jane@acme.com<i /></span>
      </div>
    )
  },
  {
    name: "Select",
    meta: "Single · grouped",
    detail: "Options schema matched",
    preview: (
      <div className="dsp-field">
        <small>Environment</small>
        <span className="dsp-input dsp-select">Production<b>⌄</b></span>
      </div>
    )
  },
  {
    name: "Switch",
    meta: "2 sizes · disabled",
    detail: "States mapped to tokens",
    preview: (
      <div className="dsp-switches">
        <span className="dsp-switch-row"><em className="dsp-switch on"><i /></em>Enabled</span>
        <span className="dsp-switch-row"><em className="dsp-switch"><i /></em>Off</span>
      </div>
    )
  },
  {
    name: "Tabs",
    meta: "Underline · pill",
    detail: "Keyboard contract checked",
    preview: (
      <div className="dsp-tabs">
        <span className="active">Overview</span>
        <span>Usage</span>
        <span>Code</span>
      </div>
    )
  },
  {
    name: "Tag",
    meta: "6 tones · removable",
    detail: "Tone scale resolved",
    preview: (
      <div className="dsp-tags">
        <span>Design</span>
        <span>Beta</span>
        <span>Passed</span>
      </div>
    )
  },
  {
    name: "KPI card",
    meta: "Delta · sparkline",
    detail: "Data roles bound",
    preview: (
      <div className="dsp-kpi">
        <small>Retrieval rate</small>
        <strong>94%</strong>
        <em>+6.2% vs last week</em>
      </div>
    )
  },
  {
    name: "Bar chart",
    meta: "Stacked · grouped",
    detail: "Chart palette applied",
    preview: (
      <div className="dsp-chart" aria-hidden="true">
        <i style={{ height: "38%" }} />
        <i style={{ height: "56%" }} />
        <i style={{ height: "44%" }} />
        <i style={{ height: "72%" }} />
        <i style={{ height: "88%" }} />
      </div>
    )
  }
];

const colorTokens = [
  ["--color-bg-brand", "#2563eb"],
  ["--color-data-2", "#8b5cf6"],
  ["--color-data-3", "#10b981"],
  ["--color-data-4", "#f59e0b"],
  ["--color-data-5", "#ef4444"],
  ["--color-data-6", "#06b6d4"],
  ["--color-data-7", "#ec4899"],
  ["--color-text-primary", "#e5e7eb"]
];

const STEP_MS = 1900;

const staticTokenRows = [
  {
    name: "Typography",
    token: "--text-heading-md",
    count: "18",
    visual: (
      <span className="dsp-token-type">
        <b style={{ fontSize: ".8rem" }}>Aa</b>
        <b style={{ fontSize: ".58rem" }}>Aa</b>
        <b style={{ fontSize: ".44rem" }}>Aa</b>
      </span>
    )
  },
  {
    name: "Spacing",
    token: "--space-400",
    count: "12",
    visual: (
      <span className="dsp-token-space">
        <b style={{ width: ".3rem" }} />
        <b style={{ width: ".65rem" }} />
        <b style={{ width: "1.15rem" }} />
      </span>
    )
  },
  {
    name: "Radius",
    token: "--radius-control-md",
    count: "6",
    visual: (
      <span className="dsp-token-radius">
        <b style={{ borderRadius: ".1rem" }} />
        <b style={{ borderRadius: ".3rem" }} />
        <b style={{ borderRadius: "999px" }} />
      </span>
    )
  }
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
  const isContext = story === "context";
  const [step, setStep] = useState(0);
  const animateSystem = isContext && !reduceMotion;

  useEffect(() => {
    if (!animateSystem) return undefined;
    const id = setInterval(() => setStep((current) => current + 1), STEP_MS);
    return () => clearInterval(id);
  }, [animateSystem]);

  const activeIndex = step % componentCards.length;
  const activeColor = colorTokens[step % colorTokens.length];
  const logEntries = Array.from({ length: 4 }, (_, offset) => {
    const cursor = step - offset;
    const card = componentCards[((cursor % componentCards.length) + componentCards.length) % componentCards.length];
    return {
      id: cursor,
      title: card.name,
      detail: card.detail,
      time: offset === 0 ? "now" : `${offset * 2}s`
    };
  });

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
        className={`saas-device reveal${isContext ? " saas-device--system" : ""}`}
        initial={reduceMotion ? undefined : { opacity: 0, y: 28, scale: 0.985 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="saas-window-bar">
          <div className="saas-window-dots" aria-hidden="true"><span /><span /><span /></div>
          <div className="saas-window-address"><span className="saas-lock" />system.humanaistudio.ai</div>
          <div className="saas-window-actions" aria-hidden="true"><span /><span /></div>
        </div>

        <div className="saas-app">
          <aside className={`saas-sidebar${isContext ? " saas-sidebar--system" : ""}`}>
            <div className="saas-app-brand"><span className="saas-app-mark"><i /><i /></span><strong>Human AI</strong></div>
            <div className="saas-workspace-switcher">
              <span className="saas-workspace-logo">A</span>
              <div>
                <strong>{isContext ? "Acme Product" : "Northstar Creative"}</strong>
                <small>{isContext ? "Design system workspace" : "Agency workspace"}</small>
              </div>
              <span className="saas-chevron">⌄</span>
            </div>
            {isContext ? (
              <nav aria-label="Product mockup">
                {systemNavigation.map((section) => (
                  <div className="saas-nav-group" key={section.group}>
                    <p>{section.group}</p>
                    {section.items.map(([icon, label]) => (
                      <span className={label === "Components" ? "active" : ""} key={label}>
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
            <div className="saas-context-meter">
              <div>
                <span>{isContext ? "Context coverage" : "Monthly capacity"}</span>
                <strong>{isContext ? "94%" : "74%"}</strong>
              </div>
              <i><b style={isContext ? { width: "94%" } : undefined} /></i>
              <small>{isContext ? "Brand · foundations · components · tokens" : "18 projects scheduled"}</small>
            </div>
            <span className="saas-settings"><Icon name="settings" />Settings</span>
            <div className="saas-user"><span>JR</span><div><strong>John Rodrigues</strong><small>Workspace admin</small></div><i /></div>
          </aside>

          <div className="saas-main">
            <header className="saas-topbar">
              <div className="saas-breadcrumb">
                <span>{isContext ? "Acme Product" : "Northstar Creative"}</span>
                <i>/</i>
                {isContext && <><span>Design system</span><i>/</i></>}
                <strong>{isContext ? "Components" : "Overview"}</strong>
              </div>
              <div className="saas-top-actions">
                <Chrome locked={locked} className="saas-icon-button" aria-label="Search">⌕</Chrome>
                <Chrome locked={locked} className="saas-share">{isContext ? "Publish" : "Share"}</Chrome>
                <span className="saas-avatar">JR</span>
              </div>
            </header>

            <div className="saas-content">
              {isContext ? (
              <>
              <div className="saas-content-title saas-ops-title">
                <div>
                  <p>Design system</p>
                  <h3>Components</h3>
                  <span>28 contracts your agents retrieve instead of inventing UI.</span>
                </div>
                <Chrome locked={locked}><span>+</span>New component</Chrome>
              </div>

              <div className="saas-ds-toolbar">
                <div className="saas-ds-filters">
                  {componentFilters.map(([label, count], index) => (
                    <span className={index === 0 ? "active" : ""} key={label}>{label}<b>{count}</b></span>
                  ))}
                </div>
                <span className="saas-ds-search"><i />Search components</span>
              </div>

              <div className="saas-ds-grid">
                {componentCards.map((card, index) => {
                  const isActive = animateSystem && index === activeIndex;
                  return (
                    <article className={`saas-ds-card${isActive ? " is-active" : ""}`} key={card.name}>
                      <div className="saas-ds-preview">{card.preview}</div>
                      <div className="saas-ds-card-meta">
                        <div><p>{card.name}</p><span>{card.meta}</span></div>
                      </div>
                      {isActive && (
                        <motion.i
                          className="saas-ds-card-scan"
                          aria-hidden="true"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                        />
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="saas-ds-bottom">
                <article className="saas-ds-panel">
                  <div className="saas-card-head"><div><p>Tokens</p><span>68 across 9 foundations</span></div><Chrome locked={locked}>View all →</Chrome></div>

                  <div className="saas-ds-token-row">
                    <span className="dsp-token-swatches">
                      {colorTokens.map(([token, hex], index) => (
                        <motion.b
                          key={token}
                          style={{ background: hex }}
                          animate={animateSystem
                            ? { opacity: index === step % colorTokens.length ? 1 : 0.32, scale: index === step % colorTokens.length ? 1.28 : 1 }
                            : { opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      ))}
                    </span>
                    <div>
                      <strong>Color</strong>
                      <small>{animateSystem ? activeColor[0] : "--color-bg-brand"}</small>
                    </div>
                    <em>32</em>
                  </div>

                  {staticTokenRows.map((token) => (
                    <div className="saas-ds-token-row" key={token.name}>
                      {token.visual}
                      <div><strong>{token.name}</strong><small>{token.token}</small></div>
                      <em>{token.count}</em>
                    </div>
                  ))}
                </article>

                <article className="saas-ds-panel">
                  <div className="saas-card-head"><div><p>Agent retrieval</p><span>Live · Cursor session</span></div><Chrome locked={locked}>•••</Chrome></div>
                  <div className="saas-ds-log">
                    <AnimatePresence initial={false} mode="popLayout">
                      {logEntries.map((entry) => (
                        <motion.div
                          className="saas-ds-log-row"
                          key={entry.id}
                          layout={animateSystem}
                          initial={animateSystem ? { opacity: 0, y: -10 } : false}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <i aria-hidden="true" />
                          <div><strong>{entry.title}</strong><small>{entry.detail}</small></div>
                          <time>{entry.time}</time>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </article>
              </div>
              </>
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
                        <div className="saas-chart" aria-hidden="true"><span style={{height:"34%"}} /><span style={{height:"48%"}} /><span style={{height:"42%"}} /><span style={{height:"61%"}} /><span style={{height:"72%"}} /><span style={{height:"88%"}} /><i /></div>
                        <div className="saas-chart-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
                      </article>

                      <div className="saas-workforce-row">
                        <article className="saas-projects-card">
                          <div className="saas-card-head"><div><p>Active work</p><span>Priority projects</span></div><Chrome locked={locked}>View all →</Chrome></div>
                          {activeProjects.map((project) => <div className="saas-project-row" key={project.client}><span className="saas-project-logo">{project.client.slice(0,1)}</span><div><strong>{project.client}</strong><small>{project.project}</small></div><em>{project.status}</em><i><b style={{width:project.progress}} /></i><span>{project.progress}</span></div>)}
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
