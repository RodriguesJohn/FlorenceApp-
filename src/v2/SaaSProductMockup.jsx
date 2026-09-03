import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./saas-mockup.css";

function Icon({ name }) {
  const paths = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    library: <><path d="M4 5.5 12 2l8 3.5-8 3.5-8-3.5Z" /><path d="m4 10 8 3.5 8-3.5M4 14.5l8 3.5 8-3.5" /></>,
    agents: <><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></>,
    code: <><path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18" /></>,
    activity: <path d="M3 12h4l2.2-6 4.2 12 2.3-6H21" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

const navigation = [
  ["overview", "Overview"],
  ["library", "Components"],
  ["code", "Tokens"],
  ["agents", "Brand"],
  ["activity", "Quality"]
];

const contextMetrics = [
  { label: "Components", value: "127", change: "18 updated today", tone: "blue" },
  { label: "Tokens", value: "340", change: "Synced 2m ago", tone: "violet" },
  { label: "Agent queries", value: "1.2K", change: "Today", tone: "green" }
];

const recentComponents = [
  { name: "Button", category: "Core", status: "Agent-ready", usage: "840" },
  { name: "Input", category: "Forms", status: "Synced", usage: "620" },
  { name: "Modal", category: "Overlay", status: "Updated", usage: "380" }
];

const brandLayers = [
  { initials: "BR", name: "Brand Voice", task: "Tone & personality defined", tone: "violet" },
  { initials: "DS", name: "Design System", task: "127 components cataloged", tone: "blue" },
  { initials: "EG", name: "Engineering", task: "Stack constraints set", tone: "green" }
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

function SaaSProductMockup({ embedded = false, locked = false }) {
  const reduceMotion = useReducedMotion();

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
          <h2 id="saas-preview-title">The context layer for agent-generated interfaces.</h2>
        </div>
        <div className="saas-preview-intro">
          <p>Your agents inherit brand voice, design system, engineering constraints, and quality standards—so they ship on-brand, production-ready interfaces without retraining models.</p>
          <a href="/product">Explore the product <span aria-hidden="true">↗</span></a>
        </div>
      </div>}

      <motion.div
        className="saas-device reveal"
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
          <aside className="saas-sidebar">
            <div className="saas-app-brand"><span className="saas-app-mark"><i /><i /></span><strong>Human AI</strong></div>
            <div className="saas-workspace-switcher">
              <span className="saas-workspace-logo">A</span>
              <div><strong>Acme Design System</strong><small>Production workspace</small></div>
              <span className="saas-chevron">⌄</span>
            </div>
            <nav aria-label="Product mockup">
              {navigation.map(([icon, label], index) => (
                <span className={index === 0 ? "active" : ""} key={label}><Icon name={icon} />{label}</span>
              ))}
            </nav>
            <div className="saas-sidebar-spacer" />
            <div className="saas-context-meter">
              <div><span>Context coverage</span><strong>100%</strong></div>
              <i><b /></i>
              <small>All layers synced</small>
            </div>
            <span className="saas-settings"><Icon name="settings" />Settings</span>
            <div className="saas-user"><span>JR</span><div><strong>John Rodrigues</strong><small>System admin</small></div><i /></div>
          </aside>

          <div className="saas-main">
            <header className="saas-topbar">
              <div className="saas-breadcrumb"><span>Acme Design System</span><i>/</i><strong>Overview</strong></div>
              <div className="saas-top-actions">
                <Chrome locked={locked} className="saas-icon-button" aria-label="Search">⌕</Chrome>
                <Chrome locked={locked} className="saas-share">Sync context</Chrome>
                <span className="saas-avatar">JR</span>
              </div>
            </header>

            <div className="saas-content">
              <div className="saas-content-title saas-ops-title">
                <div><p>Context Layer</p><h3>Design system ready.</h3><span>Your agents have access to brand, components, tokens, and quality standards.</span></div>
                <Chrome locked={locked}><span>+</span>Add layer</Chrome>
              </div>

              <div className="saas-command-grid">
                <div className="saas-command-main">
                  <div className="saas-metrics-grid">
                    {contextMetrics.map((metric) => <article className={`saas-metric-card ${metric.tone}`} key={metric.label}><div><span>{metric.label}</span><i>↗</i></div><strong>{metric.value}</strong><small>{metric.change}</small></article>)}
                  </div>

                  <div className="saas-operations-grid">
                    <div className="saas-operations-main">
                      <article className="saas-revenue-card">
                        <div className="saas-card-head"><div><p>Agent activity</p><span>Last 7 days</span></div><Chrome locked={locked}>•••</Chrome></div>
                        <div className="saas-revenue-total"><strong>1.2K</strong><span>queries served with context</span></div>
                        <div className="saas-chart" aria-hidden="true"><span style={{height:"28%"}} /><span style={{height:"42%"}} /><span style={{height:"38%"}} /><span style={{height:"65%"}} /><span style={{height:"58%"}} /><span style={{height:"82%"}} /><i /></div>
                        <div className="saas-chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
                      </article>

                      <div className="saas-workforce-row">
                        <article className="saas-projects-card">
                          <div className="saas-card-head"><div><p>Component library</p><span>Most accessed</span></div><Chrome locked={locked}>View all →</Chrome></div>
                          {recentComponents.map((component) => <div className="saas-project-row" key={component.name}><span className="saas-project-logo">{component.name.slice(0,1)}</span><div><strong>{component.name}</strong><small>{component.category}</small></div><em>{component.status}</em><i><b style={{width:`${Math.min(parseInt(component.usage)/10, 100)}%`}} /></i><span>{component.usage} uses</span></div>)}
                        </article>

                        <article className="saas-agent-team-card">
                          <div className="saas-card-head"><div><p>Context layers</p><span>All layers active</span></div><Chrome locked={locked}>Configure →</Chrome></div>
                          {brandLayers.map((layer) => <div className="saas-agent-member" key={layer.name}><span className={`agent-orb ${layer.tone}`}>{layer.initials}</span><div><strong>{layer.name}</strong><small>{layer.task}</small></div><i aria-label="Active" /></div>)}
                        </article>
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="saas-agent-chat">
                  <header><span className="agent-orb blue">AI</span><div><strong>Context Agent</strong><small><i />Online · full system context</small></div><Chrome locked={locked}>•••</Chrome></header>
                  <div className="saas-chat-day">Today</div>
                  <div className="saas-chat-message agent">Your design system is synced. 127 components and 340 tokens are available to all agents.</div>
                  <div className="saas-chat-message user">Generate a dashboard using our brand colors and button component.</div>
                  <div className="saas-chat-message agent">Generated with Acme brand colors (primary #3b82f6, neutral gray scale) and your approved Button component. Applied accessibility standards and spacing tokens.</div>
                  <div className="saas-agent-actions"><span>✓ On-brand</span><span>✦ Standards met</span></div>
                  <div className="saas-chat-input"><p>Ask about components, colors, or tokens…</p><Chrome locked={locked}>↑</Chrome></div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default SaaSProductMockup;
