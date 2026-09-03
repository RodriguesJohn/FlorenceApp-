import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SaaSProductMockup from "./SaaSProductMockup.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import "./product.css";

const bookingUrl = "https://cal.com/john-rodrigues-rqt2lg/15min";

const problemStats = [
  { stat: "42%", label: "of committed code is AI-generated" },
  { stat: "66%", label: "frustrated by 'almost right' AI output" },
  { stat: "29%", label: "trust in AI output (down from 40%)" },
  { stat: "75%", label: "of Google's code is now AI-generated" }
];

const systemLayers = [
  ["01", "Brand", "Voice, tone, and quality standards", "Your brand guidelines aren't in your design system—but agents need them to ship on-brand interfaces."],
  ["02", "Design System", "Components, patterns, and behaviors", "Tokens, components, and interaction patterns that define your product's visual language."],
  ["03", "Engineering Constraints", "Technical boundaries and standards", "Stack preferences, accessibility requirements, performance budgets, and code conventions."],
  ["04", "Quality Criteria", "The judgment layer", "What makes output 'good enough to ship' vs 'needs review'—codified so agents can self-correct."]
];

const valueProps = [
  "Agents inherit your standards without retraining models",
  "No migration—sits over your existing design system",
  "Reduces QA and rework costs on AI-generated UI",
  "One designer's cost, applied to every agent in your company",
  "Ships context through MCP to Cursor, Copilot, Windsurf, and custom agents"
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
          <h1>The context layer<span className="product-mobile-break"><br /></span> for<span>agent-generated interfaces.</span></h1>
          <p className="product-hero-intro">Agents ship fast. Enterprises ship inconsistent, off-brand products. We encode the judgment layer—brand, design system, engineering constraints, and quality criteria—so your agents inherit standards without retraining models.</p>
          <div className="product-hero-actions">
            <ProductButton href="mailto:john@humanaistudio.ai?subject=Early%20access">Request early access</ProductButton>
          </div>
        </motion.div>
        <SaaSProductMockup embedded />
      </section>

      <section className="product-problem">
        <p className="product-section-label">The Problem</p>
        <div>
          <h2>Agents ship slop.<br />Enterprises ship <em>off-brand products.</em></h2>
          <p>AI-generated code volume is exploding—42% of all committed code, 75% at Google—but trust in that output fell from 40% to 29%. Agents produce "almost right" interfaces that require heavy QA, rework, and design system cleanup. Volume compounds while confidence drops.</p>
        </div>
        <div className="product-stats-grid">
          {problemStats.map(({ stat, label }) => (
            <div className="product-stat" key={label}>
              <strong>{stat}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="product-system" id="context">
        <div className="product-section-heading">
          <p className="product-section-label">The Solution</p>
          <h2>Four layers competitors don't encode.</h2>
          <p className="product-system-intro">Design system platforms encode components and tokens. We encode the complete context agents need to ship production-ready interfaces: brand voice, design system, engineering constraints, and quality heuristics.</p>
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
            <div className="blueprint-node center">Context Layer</div>
            <div className="blueprint-node one">Brand</div>
            <div className="blueprint-node two">Design System</div>
            <div className="blueprint-node three">Engineering</div>
            <div className="blueprint-node four">Quality</div>
            <svg viewBox="0 0 600 600"><circle cx="300" cy="300" r="174" /><circle cx="300" cy="300" r="245" /><path d="M300 55v490M55 300h490M127 127l346 346M473 127 127 473" /></svg>
          </div>
          <div className="product-blueprint-copy">
            <p className="product-section-label">How It Works</p>
            <h2>A layer over what you<br />already run. No migration.</h2>
            <p>Competitors ask you to move into their platform. We sit over the design system, brand guidelines, and engineering standards you already maintain. Your agents inherit judgment without leaving your workflow.</p>
            <ul>{valueProps.map((prop) => <li key={prop}><span>✓</span>{prop}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="product-market">
        <div className="product-market-content">
          <p className="product-section-label">Market</p>
          <h2>~$4B serviceable market.<br />~$63M raised by category.<br />The gap is unwon.</h2>
          <div className="product-market-grid">
            <div className="product-market-item">
              <strong>25,600</strong>
              <span>Organizations running design systems + coding agents</span>
            </div>
            <div className="product-market-item">
              <strong>$36K–$240K</strong>
              <span>Annual contract value: the cost of one designer applied to every agent</span>
            </div>
            <div className="product-market-item">
              <strong>90%</strong>
              <span>Developer AI adoption rate (up from 76% in 2 years)</span>
            </div>
          </div>
          <p className="product-market-insight">Category raised ~$63M (Knapsack $20.8M, Taste Labs $18.5M, Supernova $13M, zeroheight $10.4M) against a ~$4B market. Demand is proven, coverage is thin, and the layer between design systems and agent output is unserved.</p>
        </div>
      </section>

      <section className="product-cta">
        <div className="product-cta-ring" aria-hidden="true" />
        <p className="product-section-label">Get Started</p>
        <h2>The context layer your agents need<br />to ship production-ready interfaces.</h2>
        <p>For growth-stage B2B SaaS to enterprise teams running design systems and coding agents.</p>
        <ProductButton>Request early access</ProductButton>
      </section>

      <footer className="product-footer">
        <a className="product-brand" href="/"><span />Human AI Studio</a>
        <p>The context layer for agent-generated interfaces.</p>
        <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
      </footer>
    </main>
  );
}

export default ProductPage;
