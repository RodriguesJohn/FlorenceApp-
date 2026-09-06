import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import SaaSProductMockup from "./SaaSProductMockup.jsx";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import { FlorenceWaitlistModal, WaitlistButton } from "./FlorenceWaitlistModal.jsx";
import { useAuth, useClerk } from "@clerk/react";
import {
  appPath,
  clerkConfigured,
  clerkOverlayOptions,
} from "./clerkConfig.js";
import figmaLogo from "../assets/logos/Figma.png";
import storybookLogo from "../assets/logos/storybook.png";
import reactLogo from "../assets/logos/react-mark.svg";
import githubLogo from "../assets/logos/github.svg";
import cursorLogo from "../assets/logos/cursor.webp";
import claudeCodeLogo from "../assets/logos/claude-code.png";
import codexLogo from "../assets/logos/codex.png";
import hermesLogo from "../assets/logos/Hermes.jpeg";
import "./product.css";

const BOOKING_URL = "https://cal.com/john-rodrigues-rqt2lg/15min";
const NEWSLETTER_URL = "https://substack.com/@johnrodrigues";

const systemLayers = [
  {
    number: "01",
    label: "Remove",
    title: "Remove AI Slop",
    copy: "Agents retrieve your brand and system instead of inventing UI. The first pass looks like your product."
  },
  {
    number: "02",
    label: "Ship",
    title: "Ship Production UI",
    copy: "Constraints and quality criteria travel with every retrieval. Screens can merge, not just look close."
  },
  {
    number: "03",
    label: "Unify",
    title: "Unify Design Library",
    copy: "Figma, Storybook, and the repo become one catalog. Agents query one source of truth instead of stitching three."
  }
];

const gapOutcomes = [
  {
    title: "Reduce QA",
    copy: "Agents retrieve context instead of guessing. The first pass already matches brand, tokens, and constraints."
  },
  {
    title: "Reduce Token Cost",
    copy: "Fewer retries on almost-right UI. Less of the budget goes to regenerating the same screen."
  },
  {
    title: "Reduce AI Slop",
    copy: "Output passes brand and system criteria. It looks like it came from the system you already run."
  }
];

const outcomes = [
  "No migration into a new platform.",
  "Brand, system, constraints, and quality in one layer.",
  "MCP connects. The layer is the product."
];

const outcomeMapNodes = ["Brand", "System", "Guardrails", "Quality"];

const layerInputs = [
  { name: "Storybook", logo: storybookLogo, contain: true },
  { name: "Figma", logo: figmaLogo, contain: true },
  { name: "Component library", logo: reactLogo },
  { name: "GitHub", logo: githubLogo, invert: true },
  { name: "Code", glyph: "code" },
  { name: "Design tokens", glyph: "tokens" }
];

const layerOutputs = [
  { name: "Cursor", logo: cursorLogo },
  { name: "Claude Code", logo: claudeCodeLogo, contain: true },
  { name: "Codex", logo: codexLogo, contain: true },
  { name: "QA agents", logo: hermesLogo, contain: true }
];

const pricingPlans = [
  {
    id: "entry",
    name: "Entry",
    price: "Free",
    term: null,
    description: "Free context so agents stop shipping AI slop.",
    features: [
      "Reduce AI slop",
      "Lower token spend on retries and rework",
      "Ship with quality, not AI slop",
      "MCP for Cursor and Claude Code"
    ],
    ctaLabel: "Fix AI Slop",
    waitlist: false,
    signup: true,
    ctaPrimary: true,
    featured: false
  },
  {
    id: "growth",
    name: "Growth",
    price: "$49",
    term: "/ editor / month",
    description: "Self-serve Florence MCP on your design system.",
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
    id: "scale",
    name: "Scale",
    price: "Custom Solution",
    term: null,
    description: "Custom solution to build your AI-ready design system.",
    features: [
      "Discovery, audit, and implementation with your team",
      "Custom MCP integrations and quality criteria",
      "Multi-repo governance and onboarding",
      "Hands-on setup with design system owners"
    ],
    ctaLabel: "Book a discovery call",
    ctaHref: BOOKING_URL,
    featured: false
  }
];

function EcosystemGlyph({ id }) {
  const props = {
    width: 14,
    height: 14,
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": true
  };

  switch (id) {
    case "tokens":
      return (
        <svg {...props}>
          <circle cx="5" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="11" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="11" cy="11" r="2.4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path
            d="M6 4.5 2.5 8 6 11.5M10 4.5 13.5 8 10 11.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

const hubPetals = [
  { id: "brand", label: "Brand" },
  { id: "system", label: "System" },
  { id: "quality", label: "Quality" },
  { id: "constraints", label: "Guardrails" }
];

function curve(from, to) {
  const dx = to.x - from.x;
  const pull = Math.max(Math.abs(dx) * 0.46, 28);
  const dir = dx >= 0 ? 1 : -1;
  return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${(from.x + dir * pull).toFixed(1)} ${from.y.toFixed(1)}, ${(to.x - dir * pull).toFixed(1)} ${to.y.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

function edgePoint(cx, cy, radius, x, y) {
  const vx = x - cx;
  const vy = y - cy;
  const length = Math.hypot(vx, vy) || 1;
  return {
    x: cx + (vx / length) * radius,
    y: cy + (vy / length) * radius
  };
}

function ProductEcosystem() {
  const mapRef = useRef(null);
  const hubRef = useRef(null);
  const inputRefs = useRef([]);
  const outputRefs = useRef([]);
  const [wires, setWires] = useState({ width: 0, height: 0, paths: [] });

  const measure = useCallback(() => {
    const map = mapRef.current;
    const hub = hubRef.current;
    if (!map || !hub) return;

    const mapBox = map.getBoundingClientRect();
    if (mapBox.width < 48) return;

    const hubBox = hub.getBoundingClientRect();
    const cx = hubBox.left + hubBox.width / 2 - mapBox.left;
    const cy = hubBox.top + hubBox.height / 2 - mapBox.top;
    const radius = Math.min(hubBox.width, hubBox.height) / 2 - 2;
    const paths = [];

    inputRefs.current.forEach((node, index) => {
      if (!node) return;
      const box = node.getBoundingClientRect();
      const from = {
        x: box.right - mapBox.left,
        y: box.top + box.height / 2 - mapBox.top
      };
      paths.push({
        id: `in-${index}`,
        dir: "in",
        d: curve(from, edgePoint(cx, cy, radius, from.x, from.y))
      });
    });

    outputRefs.current.forEach((node, index) => {
      if (!node) return;
      const box = node.getBoundingClientRect();
      const to = {
        x: box.left - mapBox.left,
        y: box.top + box.height / 2 - mapBox.top
      };
      paths.push({
        id: `out-${index}`,
        dir: "out",
        d: curve(edgePoint(cx, cy, radius, to.x, to.y), to)
      });
    });

    setWires({ width: mapBox.width, height: mapBox.height, paths });
  }, []);

  useLayoutEffect(() => {
    const map = mapRef.current;
    if (!map) return undefined;

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(map);
    window.addEventListener("resize", measure);
    const timeout = window.setTimeout(measure, 120);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(timeout);
    };
  }, [measure]);

  return (
    <div className="product-ecosystem-map" ref={mapRef}>
      {wires.width > 0 ? (
        <svg
          className="product-ecosystem-wires"
          viewBox={`0 0 ${wires.width} ${wires.height}`}
          aria-hidden="true"
        >
          {wires.paths.map((wire, index) => (
            <g key={wire.id}>
              <path className="product-ecosystem-wire-track" d={wire.d} />
              <path
                className={`product-ecosystem-wire-flow product-ecosystem-wire-flow--${wire.dir}`}
                d={wire.d}
                style={{ animationDelay: `${index * 0.18}s` }}
              />
            </g>
          ))}
        </svg>
      ) : null}

      <ProductEcosystemSide
        label="Your stack"
        items={layerInputs}
        direction="inputs"
        itemRefs={inputRefs}
      />

      <div className="product-ecosystem-hub">
        <span className="product-ecosystem-hub-glow" aria-hidden="true" />
        {hubPetals.map((petal) => (
          <span
            className={`product-ecosystem-petal product-ecosystem-petal--${petal.id}`}
            key={petal.id}
          >
            {petal.label}
          </span>
        ))}
        <div className="product-ecosystem-core" ref={hubRef}>
          <span className="product-ecosystem-core-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </span>
          <strong>Florence MCP</strong>
          <span>Context layer</span>
        </div>
      </div>

      <ProductEcosystemSide
        label="Your agents"
        items={layerOutputs}
        direction="outputs"
        itemRefs={outputRefs}
      />
    </div>
  );
}

function ProductEcosystemSide({ label, items, direction, itemRefs }) {
  return (
    <div className={`product-ecosystem-side product-ecosystem-side--${direction}`}>
      <p className="product-ecosystem-label">{label}</p>
      <ul className="product-ecosystem-chips">
        {items.map((item, index) => (
          <ProductEcosystemChip
            key={item.name}
            {...item}
            chipRef={(node) => {
              itemRefs.current[index] = node;
            }}
          />
        ))}
      </ul>
    </div>
  );
}

function ProductEcosystemChip({ name, logo, glyph, contain, invert, chipRef }) {
  return (
    <li className="product-ecosystem-chip" ref={chipRef}>
      <span
        className={`product-ecosystem-chip-logo${
          contain ? " product-ecosystem-chip-logo--contain" : ""
        }${invert ? " product-ecosystem-chip-logo--invert" : ""}`}
      >
        {logo ? <img src={logo} alt="" loading="lazy" /> : <EcosystemGlyph id={glyph} />}
      </span>
      <span className="product-ecosystem-chip-label">{name}</span>
    </li>
  );
}

function ProductPricingCard({ plan, onWaitlistOpen, onFixAiSlop }) {
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
        <ProductPricingCta plan={plan} onWaitlistOpen={onWaitlistOpen} onFixAiSlop={onFixAiSlop} />
      </div>
      <div className="product-pricing-card-body">
        <p className="product-pricing-card-description">{plan.description}</p>
        <ul className="product-pricing-card-features">
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProductPricingCta({ plan, onWaitlistOpen, onFixAiSlop }) {
  const isPrimary = Boolean(plan.ctaPrimary);
  const href = plan.ctaHref;
  const className = `product-btn product-btn--full${
    isPrimary ? " product-btn--primary" : " product-btn--ghost"
  }`;

  if (plan.waitlist) {
    return (
      <WaitlistButton className={className} onOpen={onWaitlistOpen}>
        {plan.ctaLabel}
      </WaitlistButton>
    );
  }

  if (plan.signup) {
    return (
      <WaitlistButton className={className} onOpen={onFixAiSlop}>
        {plan.ctaLabel}
      </WaitlistButton>
    );
  }

  return (
    <a
      className={className}
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {plan.ctaLabel}
    </a>
  );
}

function ProductFooter() {
  return (
    <footer className="product-footer" aria-label="Florence AI footer">
      <div className="product-footer-inner">
        <div className="product-footer-links">
          <a className="product-footer-brand" href="/">
            Florence AI
          </a>
          <a href={NEWSLETTER_URL} target="_blank" rel="noreferrer">
            Publication
          </a>
          <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">
            Book a call
          </a>
        </div>
        <p className="product-footer-credit">
          Florence AI by{" "}
          <a href="https://www.humanaistudio.io">Human AI Studio</a>
        </p>
      </div>
    </footer>
  );
}

function ProductPageView({ onFixAiSlop, onLogIn }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="product-page">
      <SiteHeader brand="Florence AI" />

      <main>
        <section className="product-hero" aria-labelledby="product-hero-title">
          <Entrance className="product-hero-inner" animate="visible">
            <EntranceItem className="product-hero-copy">
              <h1 id="product-hero-title">Design System For Agents</h1>
              <p className="product-lede">
                Your agents produce off-brand, inconsistent UI. Our design
                system keeps it on-brand, on constraint, and off AI slop.
              </p>
              <div className="product-hero-actions">
                <WaitlistButton
                  className="product-btn product-btn--primary liquid-metal-btn--wide"
                  onOpen={onFixAiSlop}
                >
                  Fix AI Slop
                </WaitlistButton>
                <button
                  type="button"
                  className="product-btn product-btn--ghost"
                  onClick={onLogIn}
                >
                  Log in
                </button>
              </div>
            </EntranceItem>
            <EntranceItem className="product-preview">
              <div className="product-preview-frame">
                <SaaSProductMockup embedded story="context" />
              </div>
            </EntranceItem>
          </Entrance>
        </section>

        <section className="product-section" aria-labelledby="product-gap-title">
          <Entrance className="product-section-inner product-gap">
            <EntranceItem as="h2" id="product-gap-title">
              From scattered context to one source of truth.
            </EntranceItem>
            <EntranceItem as="p" className="product-body">
              They ship almost-right UI. QA load grows. Trust doesn&apos;t.
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
              <h2 id="product-ecosystem-title">
                <span>Design and Engineering Infrastructure</span>
                <span>for Coding Agents</span>
              </h2>
              <p className="product-body">
                Your stack on one side. Your agents on the other. One context layer in the middle.
              </p>
            </EntranceItem>
            <EntranceItem className="product-ecosystem" aria-label="Context layer connections">
              <ProductEcosystem />
            </EntranceItem>
            <EntranceItem className="product-section-heading product-layer-heading">
              <h2 id="product-system-title">
                Three outcomes. Not one library.
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
                No migration. Sit on what you already run so agents inherit
                brand, system, and engineering standards.
              </p>
              <ul className="product-outcome-list">
                {outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </EntranceItem>
            <EntranceItem className="product-outcomes-map" aria-hidden="true">
              <div className="product-map-hub">Context layer</div>
              <span className="product-map-trunk" />
              <div className="product-map-connectors">
                {outcomeMapNodes.map((node) => (
                  <span key={node} />
                ))}
              </div>
              <ul className="product-map-stack">
                {outcomeMapNodes.map((node) => (
                  <li key={node}>{node}</li>
                ))}
              </ul>
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
                  <ProductPricingCard
                    plan={plan}
                    onWaitlistOpen={openWaitlist}
                    onFixAiSlop={onFixAiSlop}
                  />
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
              whoever owns the design system. Florence is the layer you
              hand that buyer.
            </EntranceItem>
            <EntranceItem className="product-hero-actions">
              <WaitlistButton onOpen={openWaitlist} />
            </EntranceItem>
          </Entrance>
        </section>
      </main>

      <ProductFooter />

      <FlorenceWaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}

function ProductPageWithClerk() {
  const { isLoaded, isSignedIn } = useAuth();
  const clerk = useClerk();
  const sendToApp = useRef(false);

  useEffect(() => {
    if (!sendToApp.current || !isLoaded || !isSignedIn) return;
    sendToApp.current = false;
    clerk.redirectWithAuth(appPath("/start"));
  }, [clerk, isLoaded, isSignedIn]);

  function goToApp() {
    clerk.redirectWithAuth(appPath("/start"));
  }

  function openSignUp() {
    if (isLoaded && isSignedIn) {
      goToApp();
      return;
    }
    sendToApp.current = true;
    clerk.openSignUp(clerkOverlayOptions);
  }

  function openSignIn() {
    if (isLoaded && isSignedIn) {
      goToApp();
      return;
    }
    sendToApp.current = true;
    clerk.openSignIn(clerkOverlayOptions);
  }

  return <ProductPageView onFixAiSlop={openSignUp} onLogIn={openSignIn} />;
}

export default function ProductPage() {
  if (!clerkConfigured) {
    return (
      <ProductPageView
        onFixAiSlop={() => window.location.assign(appPath("/?signup=1"))}
        onLogIn={() => window.location.assign(appPath("/"))}
      />
    );
  }

  return <ProductPageWithClerk />;
}

