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
  ["agents", "Clients"],
  ["library", "Projects"],
  ["activity", "Agent team"],
  ["code", "Automations"]
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
          <h2 id="saas-preview-title">Your AI team, built to scale your creative business.</h2>
        </div>
        <div className="saas-preview-intro">
          <p>Keep clients, projects, revenue, and new business moving without losing context or letting opportunities fall through the cracks.</p>
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
              <div><strong>Northstar Creative</strong><small>Agency workspace</small></div>
              <span className="saas-chevron">⌄</span>
            </div>
            <nav aria-label="Product mockup">
              {navigation.map(([icon, label], index) => (
                <span className={index === 0 ? "active" : ""} key={label}><Icon name={icon} />{label}</span>
              ))}
            </nav>
            <div className="saas-sidebar-spacer" />
            <div className="saas-context-meter">
              <div><span>Monthly capacity</span><strong>74%</strong></div>
              <i><b /></i>
              <small>18 projects scheduled</small>
            </div>
            <span className="saas-settings"><Icon name="settings" />Settings</span>
            <div className="saas-user"><span>JR</span><div><strong>John Rodrigues</strong><small>Workspace admin</small></div><i /></div>
          </aside>

          <div className="saas-main">
            <header className="saas-topbar">
              <div className="saas-breadcrumb"><span>Northstar Creative</span><i>/</i><strong>Overview</strong></div>
              <div className="saas-top-actions">
                <Chrome locked={locked} className="saas-icon-button" aria-label="Search">⌕</Chrome>
                <Chrome locked={locked} className="saas-share">Share</Chrome>
                <span className="saas-avatar">JR</span>
              </div>
            </header>

            <div className="saas-content">
              <div className="saas-content-title saas-ops-title">
                <div><p>Creative business OS</p><h3>Good morning, Alex.</h3><span>Here’s how your studio is performing today.</span></div>
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
                  <header><span className="agent-orb violet">AI</span><div><strong>Studio Agent</strong><small><i />Online · has full context</small></div><Chrome locked={locked}>•••</Chrome></header>
                  <div className="saas-chat-day">Today</div>
                  <div className="saas-chat-message agent">Morning Alex. Three deliverables are due this week and the Nova campaign is waiting on client approval.</div>
                  <div className="saas-chat-message user">Move the campaign forward and prepare the next client update.</div>
                  <div className="saas-chat-message agent">Done. I advanced the production tasks, drafted the update, and scheduled it for your review at 2 PM.</div>
                  <div className="saas-agent-actions"><span>✓ 4 tasks updated</span><span>✦ Draft ready</span></div>
                  <div className="saas-chat-input"><p>Ask your studio agent…</p><Chrome locked={locked}>↑</Chrome></div>
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
