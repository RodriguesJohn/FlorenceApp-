import React, { useState } from "react";
import SaaSProductMockup from "./SaaSProductMockup.jsx";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import { FlorenceWaitlistModal, WaitlistButton } from "./FlorenceWaitlistModal.jsx";
import figmaLogo from "../assets/logos/Figma.png";
import storybookLogo from "../assets/logos/storybook.png";
import reactLogo from "../assets/logos/react-mark.svg";
import cursorLogo from "../assets/logos/cursor.webp";
import claudeCodeLogo from "../assets/logos/claude-code.png";
import codexLogo from "../assets/logos/codex.png";
import hermesLogo from "../assets/logos/Hermes.jpeg";
import "./product.css";

const BOOKING_URL = "https://cal.com/john-rodrigues-rqt2lg/15min";
const NEWSLETTER_URL = "https://substack.com/@johnrodrigues";
const WORKSHOP_URL = "/workshop";

const systemLayers = [
  {
    number: "01",
    label: "Brand",
    title: "Voice, not just tokens",
    copy: "Brand voice and taste sit outside the library. Without them, agents can be consistent and still off-brand."
  },
  {
    number: "02",
    label: "Design system",
    title: "What agents can retrieve",
    copy: "Components, tokens, and contracts written so Cursor, Claude Code, and Codex read one source of truth."
  },
  {
    number: "03",
    label: "Engineering constraints",
    title: "What the stack will allow",
    copy: "The rules of the repo: platforms, performance, accessibility, and what a generated screen is allowed to touch."
  },
  {
    number: "04",
    label: "Quality criteria",
    title: "How you score the output",
    copy: "Evals and heuristics so a pass is measurable. Not a vibe. Not another round of visual QA."
  }
];

const gapOutcomes = [
  {
    title: "Reduced Q&A",
    copy: "Agents retrieve the right component, token, and constraint instead of guessing and iterating."
  },
  {
    title: "Token cost reduce",
    copy: "Smaller prompts, fewer retries, and less wasted generation on almost-right UI."
  },
  {
    title: "Ship with quality",
    copy: "Output passes brand, system, and eval criteria before it reaches review."
  }
];

const outcomes = [
  "A layer over the system you already run. No migration into a new platform.",
  "Agents inherit brand, system, constraints, and quality in one place.",
  "MCP is how they connect. Where we sit is the product.",
  "Workshops teach the problem. The platform is what we hand the same buyer."
];

const layerInputs = [
  { name: "Slugita", glyph: "slugita" },
  { name: "Figma", logo: figmaLogo, contain: true },
  { name: "Storybook", logo: storybookLogo, contain: true },
  { name: "Design tokens", glyph: "tokens" },
  { name: "Component library", logo: reactLogo },
  { name: "Brand guidelines", glyph: "brand" }
];

const layerOutputs = [
  { name: "Cloud Code", glyph: "cloud" },
  { name: "Cursor", logo: cursorLogo },
  { name: "Claude Code", logo: claudeCodeLogo, contain: true },
  { name: "Codex", logo: codexLogo, contain: true },
  { name: "Figma", logo: figmaLogo, contain: true, badge: "MCP" },
  { name: "QA agents", logo: hermesLogo, contain: true }
];

const pricingPlans = [
  {
    id: "entry",
    name: "Entry",
    price: "$49",
    term: "per month",
    description: "For individuals and small teams getting agents on-brand for the first time.",
    features: [
      "1 workspace and design system",
      "MCP for Cursor and Claude Code",
      "Brand, tokens, and component context",
      "1 seat"
    ],
    ctaLabel: "Join the waitlist",
    waitlist: true,
    featured: false
  },
  {
    id: "platform",
    name: "Platform",
    price: "$99",
    term: "per month",
    description: "Self-serve Florence MCP for teams running coding agents on an existing design system.",
    features: [
      "Brand, system, constraints, and quality in one layer",
      "MCP for Cursor, Claude Code, Codex, and Figma",
      "Component contracts and evals for generated UI",
      "Unlimited repos in your workspace"
    ],
    ctaLabel: "Join the waitlist",
    waitlist: true,
    featured: true
  },
  {
    id: "custom",
    name: "Custom",
    price: "Project",
    term: null,
    description: "Embedded rollout for enterprise teams that need governance, integrations, and hands-on setup.",
    features: [
      "Discovery, audit, and implementation with your team",
      "Custom MCP integrations and quality criteria",
      "Multi-repo governance and onboarding",
      "Workshops for design system owners"
    ],
    ctaLabel: "Book a discovery call",
    ctaHref: BOOKING_URL,
    featured: false
  }
];

function EcosystemGlyph({ id }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": true
  };

  switch (id) {
    case "slugita":
      return (
        <svg {...props}>
          <rect x="2.5" y="3" width="11" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M5.5 8h5M8 5.5v5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "tokens":
      return (
        <svg {...props}>
          <circle cx="5" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="11" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="11" cy="11" r="2.4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "brand":
      return (
        <svg {...props}>
          <path
            d="M4 3.5h8v9H4z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M6 6.5h4M6 8.5h2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...props}>
          <path
            d="M4.5 10.5h7a2.2 2.2 0 0 0 .4-4.4A3 3 0 0 0 6.2 4.5 2.6 2.6 0 0 0 4.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M7 8.2 8.2 9.4 10.8 6.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function ProductEcosystemChip({ name, logo, glyph, contain, badge }) {
  return (
    <li className="product-ecosystem-chip">
      <span
        className={`product-ecosystem-chip-logo${
          contain ? " product-ecosystem-chip-logo--contain" : ""
        }`}
      >
        {logo ? <img src={logo} alt="" loading="lazy" /> : <EcosystemGlyph id={glyph} />}
      </span>
      <span className="product-ecosystem-chip-label">
        {name}
        {badge ? <small className="product-ecosystem-chip-badge">{badge}</small> : null}
      </span>
    </li>
  );
}

function ProductPricingCard({ plan, onWaitlistOpen }) {
  return (
    <article
      className={`product-pricing-card${
        plan.featured ? " product-pricing-card--featured" : ""
      }`}
    >
      <div className="product-pricing-card-head">
        <div className="product-pricing-card-tier">
          <h3>{plan.name}</h3>
          {plan.badge ? (
            <span className="product-pricing-card-badge">{plan.badge}</span>
          ) : null}
        </div>
        <p className="product-pricing-card-price">
          <span>{plan.price}</span>
          {plan.term ? <small>{plan.term}</small> : null}
        </p>
        <p className="product-pricing-card-description">{plan.description}</p>
      </div>
      <ul className="product-pricing-card-features">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {plan.waitlist ? (
        <WaitlistButton
          className={`product-btn product-btn--full${
            plan.featured ? " product-btn--primary" : " product-btn--ghost"
          }`}
          onOpen={onWaitlistOpen}
        >
          {plan.ctaLabel}
        </WaitlistButton>
      ) : (
        <a
          className={`product-btn product-btn--full${
            plan.featured ? " product-btn--primary" : " product-btn--ghost"
          }`}
          href={plan.ctaHref}
          {...(plan.ctaHref.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {plan.ctaLabel}
        </a>
      )}
    </article>
  );
}

function ProductFooter() {
  return (
    <footer className="product-footer" aria-label="Human AI Studio footer">
      <div className="product-footer-inner">
        <a className="product-footer-brand" href="/">
          Human AI Studio
        </a>
        <a href={NEWSLETTER_URL} target="_blank" rel="noreferrer">
          Publication
        </a>
        <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
        <a href={BOOKING_URL} target="_blank" rel="noreferrer">
          Book a call
        </a>
      </div>
    </footer>
  );
}

export default function ProductPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="product-page">
      <SiteHeader />

      <main>
        <section className="product-hero" aria-labelledby="product-hero-title">
          <Entrance className="product-hero-inner" animate="visible">
            <EntranceItem className="product-hero-copy">
              <h1 id="product-hero-title">
                <span>AI Native Design Systems</span>
                <span>For Agents.</span>
              </h1>
              <p className="product-lede">
                An MCP for your coding agent. Build brand, system, and
                engineering constraints here so generated UI ships with
                confidence.
              </p>
              <div className="product-hero-actions">
                <WaitlistButton onOpen={openWaitlist} />
                <a className="product-btn product-btn--ghost" href="#layers">
                  Learn More
                </a>
              </div>
            </EntranceItem>
            <EntranceItem className="product-preview">
              <SaaSProductMockup embedded story="context" />
            </EntranceItem>
          </Entrance>
        </section>

        <section className="product-section" aria-labelledby="product-gap-title">
          <Entrance className="product-section-inner product-gap">
            <EntranceItem as="h2" id="product-gap-title">
              <span>All this design and engineering context so that your agents</span>
              <span>don&apos;t ship AI slop.</span>
            </EntranceItem>
            <EntranceItem as="p" className="product-body">
              They are not blocked. They ship. The damage is what goes out
              the door: almost-right UI, heavier QA, and a product that does
              not look like the company. Volume of agent-generated code is
              compounding. Trust in that output is not.
            </EntranceItem>
            <div className="product-gap-outcomes">
              {gapOutcomes.map((outcome) => (
                <EntranceItem as="article" className="product-gap-outcome" key={outcome.title}>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.copy}</p>
                </EntranceItem>
              ))}
            </div>
          </Entrance>
        </section>

        <section className="product-section" id="layers" aria-labelledby="product-ecosystem-title product-system-title">
          <Entrance className="product-section-inner">
            <EntranceItem className="product-section-heading product-ecosystem-heading">
              <h2 id="product-ecosystem-title">What plugs into this layer</h2>
              <p className="product-body">
                Your stack on one side. Your agents on the other. One context layer in the middle.
              </p>
            </EntranceItem>
            <EntranceItem className="product-ecosystem" aria-label="Context layer connections">
              <div className="product-ecosystem-map">
                <div className="product-ecosystem-column product-ecosystem-column--inputs">
                  <p className="product-ecosystem-label">System inputs</p>
                  <ul>
                    {layerInputs.map((item) => (
                      <ProductEcosystemChip key={item.name} {...item} />
                    ))}
                  </ul>
                </div>
                <div className="product-ecosystem-hub">
                  <span className="product-ecosystem-hub-ring" aria-hidden="true" />
                  <strong>Florence MCP Context layer</strong>
                </div>
                <div className="product-ecosystem-column product-ecosystem-column--outputs">
                  <p className="product-ecosystem-label">Agent outputs</p>
                  <ul>
                    {layerOutputs.map((item) => (
                      <ProductEcosystemChip key={item.name} {...item} />
                    ))}
                  </ul>
                </div>
              </div>
            </EntranceItem>
            <EntranceItem className="product-section-heading product-layer-heading">
              <h2 id="product-system-title">
                Four things. Not one library.
              </h2>
            </EntranceItem>
            <div className="product-layer-list">
              {systemLayers.map((layer) => (
                <EntranceItem as="article" className="product-layer" key={layer.number}>
                  <p className="product-layer-meta">
                    <span>{layer.number}</span>
                    {layer.label}
                  </p>
                  <h3>{layer.title}</h3>
                  <p>{layer.copy}</p>
                </EntranceItem>
              ))}
            </div>
          </Entrance>
        </section>

        <section className="product-section" id="outcomes" aria-labelledby="product-outcomes-title">
          <Entrance className="product-section-inner product-outcomes">
            <EntranceItem className="product-outcomes-copy">
              <h2 id="product-outcomes-title">
                Over the system you already run.
              </h2>
              <p className="product-body">
                Others ask you to move into their platform. This layer sits
                on brand, design system, and engineering standards you
                already have, so agents inherit them. Connecting to agents
                is commodity. The claim is the layer.
              </p>
              <ul className="product-outcome-list">
                {outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </EntranceItem>
            <EntranceItem className="product-outcomes-map" aria-hidden="true">
              <div className="product-map-hub">Context layer</div>
              <div className="product-map-node product-map-node--a">Brand</div>
              <div className="product-map-node product-map-node--b">System</div>
              <div className="product-map-node product-map-node--c">Constraints</div>
              <div className="product-map-node product-map-node--d">Quality</div>
            </EntranceItem>
          </Entrance>
        </section>

        <section className="product-section" id="pricing" aria-labelledby="product-pricing-title">
          <Entrance className="product-section-inner product-pricing">
            <EntranceItem className="product-section-heading">
              <h2 id="product-pricing-title">Pricing.</h2>
            </EntranceItem>
            <div className="product-pricing-grid">
              {pricingPlans.map((plan) => (
                <EntranceItem key={plan.id}>
                  <ProductPricingCard plan={plan} onWaitlistOpen={openWaitlist} />
                </EntranceItem>
              ))}
            </div>
          </Entrance>
        </section>

        <section className="product-section product-close" aria-labelledby="product-close-title">
          <Entrance className="product-section-inner product-close-inner">
            <EntranceItem as="h2" id="product-close-title">
              Teams that maintain a design system and run coding agents.
            </EntranceItem>
            <EntranceItem as="p" className="product-body">
              Growth-stage B2B SaaS through enterprise. The champion is
              whoever owns the design system. Workshops are how we teach
              the problem. The platform is the solution we hand the same
              buyer.
            </EntranceItem>
            <EntranceItem className="product-hero-actions">
              <WaitlistButton onOpen={openWaitlist} />
              <a className="product-btn product-btn--ghost" href={WORKSHOP_URL}>
                Join the workshop
              </a>
            </EntranceItem>
          </Entrance>
        </section>
      </main>

      <ProductFooter />

      <FlorenceWaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
