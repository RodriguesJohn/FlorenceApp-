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
  { group: "Brand and Marketing", items: [["voice", "Brand System"], ["assets", "Creatives"]] },
  { group: "Product", items: [["library", "Foundation Token"], ["components", "Components"]] },
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

const SYSTEM_PAGES = ["color", "components"];
const PAGE_MS = 6200;

const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

/* Primitive ramps from florence-ds/02-foundations/colors/primitives.css */
const PRIMITIVE_PALETTES = [
  {
    name: "gray",
    label: "Gray",
    values: ["#f9fafb", "#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563", "#374151", "#1f2937", "#111827"]
  },
  {
    name: "slate",
    label: "Slate",
    values: ["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a"]
  },
  {
    name: "blue",
    label: "Blue",
    values: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a"]
  },
  {
    name: "green",
    label: "Green",
    values: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d"]
  },
  {
    name: "violet",
    label: "Violet",
    values: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95"]
  },
  {
    name: "rose",
    label: "Rose",
    values: ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337"]
  }
];

const COLOR_SINGLES = [
  { name: "white", label: "White", hex: "#ffffff" },
  { name: "black", label: "Black", hex: "#000000" }
];

/* Semantic roles — dark theme resolved from florence-ds/02-foundations/colors/semantics.css */
const FLORENCE = {
  "--color-text-primary": "#f9fafb",
  "--color-text-secondary": "#d1d5db",
  "--color-text-muted": "#6b7280",
  "--color-text-brand": "#93c5fd",
  "--color-text-success": "#86efac",
  "--color-bg-page": "#000000",
  "--color-bg-subtle": "#141414",
  "--color-bg-muted": "#1a1a1a",
  "--color-bg-brand": "#3b82f6",
  "--color-bg-brand-subtle": "#1e3a8a",
  "--color-border-default": "#262626",
  "--color-border-strong": "#404040",
  "--color-border-focus": "#60a5fa",
  "--color-border-brand": "#60a5fa",
  "--color-interactive-primary": "#60a5fa",
  "--color-interactive-primary-hover": "#93c5fd",
  "--color-interactive-selected": "#1e3a8a",
  "--color-brand-primary": "#60a5fa",
  "--color-brand-on-brand": "#ffffff",
  "--color-disabled-text": "#6b7280",
  "--color-data-1": "#60a5fa",
  "--color-data-2": "#a3e635",
  "--color-data-3": "#a78bfa",
  "--color-data-4": "#fb7185",
  "--color-data-5": "#22d3ee"
};

const componentCards = [
  { name: "Button", meta: "5 variants · 3 sizes", type: "button", category: "Base" },
  { name: "Input", meta: "Label · hint · error", type: "input", category: "Base" },
  { name: "Select", meta: "Single · grouped", type: "select", category: "Base" },
  { name: "Switch", meta: "2 sizes · disabled", type: "switch", category: "Base" },
  { name: "Tabs", meta: "Underline · pill", type: "tabs", category: "Base" },
  { name: "Tag", meta: "6 tones · removable", type: "tag", category: "Base" },
  { name: "KPI card", meta: "Delta · sparkline", type: "kpi", category: "Data display" },
  { name: "Bar chart", meta: "Stacked · grouped", type: "chart", category: "Data display" }
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
  color: {
    title: "Color",
    lede: "Primitive palette ramps your agents retrieve.",
    breadcrumbParent: "Foundation Token",
    navActive: "Foundation Token"
  },
  components: {
    title: "Components",
    lede: "28 contracts your agents retrieve instead of inventing UI.",
    breadcrumbParent: null,
    navActive: "Components"
  }
};

function isLightHex(hex) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function ComponentPreview({ type }) {
  if (type === "switch") {
    return (
      <div className="dsp-animated-preview">
        <div className="dsp-switches">
          <span className="dsp-switch-row">
            <span className="dsp-switch" style={{ backgroundColor: FLORENCE["--color-interactive-primary"] }}>
              <i className="dsp-switch-knob" />
            </span>
            Enabled
          </span>
        </div>
      </div>
    );
  }

  if (type === "button") {
    return (
      <div className="dsp-animated-preview">
        <div className="dsp-buttons">
          <span
            className="dsp-btn-primary"
            style={{
              backgroundColor: FLORENCE["--color-interactive-primary"],
              color: FLORENCE["--color-brand-on-brand"]
            }}
          >
            Save changes
          </span>
          <span className="dsp-btn-ghost">Cancel</span>
        </div>
      </div>
    );
  }

  if (type === "input" || type === "select") {
    return (
      <div className="dsp-animated-preview">
        <div className="dsp-field">
          <small>{type === "select" ? "Environment" : "Work email"}</small>
          <span
            className={`dsp-input${type === "select" ? " dsp-select" : ""}`}
            style={{ borderColor: FLORENCE["--color-border-default"] }}
          >
            {type === "select" ? <>Production<b>⌄</b></> : <>jane@acme.com<i /></>}
          </span>
        </div>
      </div>
    );
  }

  if (type === "tabs") {
    return (
      <div className="dsp-animated-preview">
        <div className="dsp-tabs">
          <span className="active" style={{ color: FLORENCE["--color-text-primary"] }}>Overview</span>
          <span>Usage</span>
          <span>Code</span>
        </div>
      </div>
    );
  }

  if (type === "tag") {
    return (
      <div className="dsp-animated-preview">
        <div className="dsp-tags">
          <span style={{ backgroundColor: FLORENCE["--color-bg-brand-subtle"], color: FLORENCE["--color-text-brand"] }}>Design</span>
          <span>Beta</span>
          <span style={{ backgroundColor: FLORENCE["--color-interactive-selected"], color: FLORENCE["--color-text-success"] }}>Passed</span>
        </div>
      </div>
    );
  }

  if (type === "kpi") {
    const sparkHeights = ["28%", "42%", "36%", "58%", "48%", "72%", "64%"];
    return (
      <div className="dsp-animated-preview">
        <div className="dsp-kpi">
          <div className="dsp-kpi-head">
            <small>Retrieval rate</small>
            <div className="dsp-kpi-spark" aria-hidden="true">
              {sparkHeights.map((height, index) => (
                <i key={index} style={{ height, backgroundColor: FLORENCE["--color-data-1"], opacity: 0.35 + index * 0.08 }} />
              ))}
            </div>
          </div>
          <strong style={{ color: FLORENCE["--color-text-primary"] }}>94%</strong>
          <em style={{ color: FLORENCE["--color-text-success"] }}>+6.2% vs last week</em>
        </div>
      </div>
    );
  }

  if (type === "chart") {
    const dataColors = [
      FLORENCE["--color-data-1"],
      FLORENCE["--color-data-2"],
      FLORENCE["--color-data-3"],
      FLORENCE["--color-data-4"],
      FLORENCE["--color-data-5"]
    ];
    const heights = ["38%", "56%", "44%", "72%", "88%"];
    return (
      <div className="dsp-animated-preview">
        <div className="dsp-chart" aria-hidden="true">
          {dataColors.map((hex, index) => (
            <i key={hex} style={{ height: heights[index], backgroundColor: hex }} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function PrimitiveSwatch({ paletteName, step, hex }) {
  const isLight = step <= 400 || paletteName === "white" || isLightHex(hex);
  const token = `--color-${paletteName}-${step}`;

  return (
    <div
      className={`dsp-florence-swatch${isLight ? " dsp-florence-swatch--light" : ""}`}
      style={{ backgroundColor: hex }}
    >
      <span className="dsp-florence-swatch__step">{step}</span>
      <span className="dsp-florence-swatch__meta">
        <span className="dsp-florence-swatch__token">{token}</span>
        <span className="dsp-florence-swatch__hex">{hex}</span>
      </span>
    </div>
  );
}

function SingleSwatch({ name, label, hex }) {
  const isLight = name === "white";
  const token = `--color-${name}`;

  return (
    <div
      className={`dsp-florence-swatch dsp-florence-swatch--single${isLight ? " dsp-florence-swatch--light" : ""}`}
      style={{ backgroundColor: hex }}
    >
      <span className="dsp-florence-swatch__step">{label}</span>
      <span className="dsp-florence-swatch__meta">
        <span className="dsp-florence-swatch__token">{token}</span>
        <span className="dsp-florence-swatch__hex">{hex}</span>
      </span>
    </div>
  );
}

function MockColorPage() {
  return (
    <div className="dsp-florence-page">
      <div className="dsp-florence-scales">
        {PRIMITIVE_PALETTES.map((palette) => (
          <section className="dsp-florence-scale" key={palette.name}>
            <header className="dsp-florence-scale__header">
              <strong>{palette.label}</strong>
              <code>color-{palette.name}-*</code>
            </header>
            <div className="dsp-florence-scale__row">
              {palette.values.map((hex, index) => (
                <PrimitiveSwatch
                  key={`${palette.name}-${COLOR_STEPS[index]}`}
                  paletteName={palette.name}
                  step={COLOR_STEPS[index]}
                  hex={hex}
                />
              ))}
            </div>
          </section>
        ))}

        <section className="dsp-florence-scale">
          <header className="dsp-florence-scale__header">
            <strong>Singles</strong>
            <code>color-white · color-black</code>
          </header>
          <div className="dsp-florence-scale__row dsp-florence-scale__row--singles">
            {COLOR_SINGLES.map((single) => (
              <SingleSwatch key={single.name} {...single} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function MockComponentsPage() {
  return (
    <div className="dsp-components-page">
      <div className="saas-ds-grid">
        {componentCards.map((card) => (
          <article className="saas-ds-card" key={card.name}>
            <div className="saas-ds-preview">
              <ComponentPreview type={card.type} />
            </div>
            <div className="saas-ds-card-meta">
              <div>
                <div className="saas-ds-card-title">
                  <p>{card.name}</p>
                  <span className="saas-ds-card-category">{card.category}</span>
                </div>
                <span>{card.meta}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SystemToolbar({ page, locked }) {
  if (page !== "components") {
    return null;
  }

  return (
    <div className="saas-ds-toolbar dsp-system-toolbar-inner">
      <div className="saas-ds-filters">
        {componentFilters.map(([label, count], index) => (
          <span className={index === 0 ? "active" : ""} key={label}>{label}<b>{count}</b></span>
        ))}
      </div>
      <div className="saas-ds-toolbar-actions">
        <span className="saas-ds-search"><i />Search components</span>
        <Chrome locked={locked} className="saas-ds-new">
          <span>+</span>New component
        </Chrome>
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
  const isContext = story === "context";
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
            <div className="saas-app-brand"><strong>Florence AI</strong></div>
            <div className="saas-workspace-switcher">
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
            <span className="saas-settings"><Icon name="settings" />Settings</span>
            <div className="saas-user"><span>JR</span><div><strong>John Rodrigues</strong><small>Workspace admin</small></div><i /></div>
          </aside>

          <div className="saas-main">
            <header className="saas-topbar">
              <div className="saas-breadcrumb">
                <span>{isContext ? "Acme Product" : "Northstar Creative"}</span>
                <i>/</i>
                {isContext && <><span>Product</span><i>/</i></>}
                {isContext && pageMeta.breadcrumbParent && <><span>{pageMeta.breadcrumbParent}</span><i>/</i></>}
                <strong>{isContext ? pageMeta.title : "Overview"}</strong>
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
                <div className={`dsp-system-shell${currentPage === "color" ? " dsp-system-shell--color" : ""}`}>
                  <div className="saas-content-title saas-ops-title dsp-system-head">
                    <div>
                      <p>Product</p>
                      <h3>{pageMeta.title}</h3>
                      <span>{pageMeta.lede}</span>
                    </div>
                  </div>

                  {currentPage === "components" ? (
                    <div className="dsp-system-toolbar">
                      <SystemToolbar page={currentPage} locked={locked} />
                    </div>
                  ) : null}

                  <div className="dsp-system-stage">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPage}
                        className="dsp-system-page"
                        initial={animatePageTransition ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        exit={animatePageTransition ? { opacity: 0 } : undefined}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {currentPage === "color" ? (
                          <MockColorPage />
                        ) : (
                          <MockComponentsPage />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
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
