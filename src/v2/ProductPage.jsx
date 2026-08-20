import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SaaSProductMockup from "./SaaSProductMockup.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import "./product.css";

const bookingUrl = "https://cal.com/john-rodrigues-rqt2lg/15min";

const systemLayers = [
  ["01", "Business command center", "See the whole studio in one view", "Track revenue, pipeline, capacity, client health, and delivery performance without stitching together reports."],
  ["02", "Project operations", "Move work forward automatically", "Keep briefs, schedules, deliverables, approvals, and client communication connected from kickoff to final delivery."],
  ["03", "AI agent workforce", "Give every workflow an operator", "Deploy agents that understand your clients and processes, then let them research, coordinate, draft, and follow up."],
  ["04", "Creative intelligence", "Turn your business context into action", "Ask questions across projects, finances, and clients—and get useful answers grounded in how your studio actually works."]
];

const outcomes = [
  "A live view of revenue, pipeline, capacity, and margins",
  "Connected client, project, and delivery workflows",
  "AI agents that work from your real business context",
  "Automated updates, follow-ups, briefs, and reporting",
  "One operating system for your entire creative business"
];

function ProductButton({ children, secondary = false, href }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      className={`product-button${secondary ? " product-button-secondary" : ""}`}
      href={href || (secondary ? "#context" : bookingUrl)}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      <span>{children}</span>
      <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 9h10M10 5l4 4-4 4" /></svg>
    </motion.a>
  );
}

function ProductPage() {
  const reduceMotion = useReducedMotion();
  const rise = reduceMotion ? {} : {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <main className="product-page">
      <SiteHeader />

      <section className="product-hero product-hero-context" id="top">
        <div className="product-grid" aria-hidden="true" />
        <div className="product-glow" aria-hidden="true" />
        <motion.div className="product-hero-copy" {...rise}>
          <h1>AI agent teams<span className="product-mobile-break"><br /></span> that help<span>scale your creative business.</span></h1>
          <p className="product-hero-intro">Your AI team keeps clients, projects, revenue, and new business moving without losing context or letting deals fall through the cracks.</p>
          <div className="product-hero-actions">
            <ProductButton href="mailto:john@humanaistudio.ai?subject=Join%20the%20waitlist">Join the waitlist</ProductButton>
          </div>
        </motion.div>
        <SaaSProductMockup embedded />
      </section>

      <section className="product-problem">
        <p className="product-section-label">The context gap</p>
        <div>
          <h2>Creative businesses need more than <em>another tool.</em></h2>
          <p>Your clients live in a CRM. Projects live in task boards. Revenue lives in spreadsheets. Team knowledge lives in conversations. When operations stay fragmented, people spend more time coordinating the work than creating it.</p>
        </div>
      </section>

      <section className="product-system" id="context">
        <div className="product-section-heading">
          <p className="product-section-label">The operating system</p>
          <h2>One intelligent layer across your entire business.</h2>
        </div>
        <div className="product-layer-list">
          {systemLayers.map(([number, label, title, copy]) => (
            <article className="product-layer" key={number}>
              <span className="product-layer-number">{number}</span>
              <p className="product-layer-label">{label}</p>
              <h3>{title}</h3>
              <p className="product-layer-copy">{copy}</p>
              <span className="product-layer-icon" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="product-blueprint" id="outcomes">
        <div className="product-blueprint-card">
          <div className="product-blueprint-art" aria-hidden="true">
            <div className="blueprint-node center">AI operating system</div>
            <div className="blueprint-node one">Clients</div>
            <div className="blueprint-node two">Projects</div>
            <div className="blueprint-node three">Revenue</div>
            <div className="blueprint-node four">Agents</div>
            <svg viewBox="0 0 600 600"><circle cx="300" cy="300" r="174" /><circle cx="300" cy="300" r="245" /><path d="M300 55v490M55 300h490M127 127l346 346M473 127 127 473" /></svg>
          </div>
          <div className="product-blueprint-copy">
            <p className="product-section-label">What you get</p>
            <h2>An operating system,<br />not another dashboard.</h2>
            <p>Connected to the tools and workflows you already use. Your team gets a live command center while AI agents handle the coordination, analysis, and repeatable work around it.</p>
            <ul>{outcomes.map((outcome) => <li key={outcome}><span>✓</span>{outcome}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="product-cta">
        <div className="product-cta-ring" aria-hidden="true" />
        <p className="product-section-label">Start here</p>
        <h2>Build the operating system<br />behind your creative business.</h2>
        <p>For creative agencies, studios, and teams ready to put AI agents to work.</p>
        <ProductButton>Book a discovery call</ProductButton>
      </section>

      <footer className="product-footer">
        <a className="product-brand" href="/"><span />Human AI Studio</a>
        <p>AI operating systems for creative businesses.</p>
        <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
      </footer>
    </main>
  );
}

export default ProductPage;
