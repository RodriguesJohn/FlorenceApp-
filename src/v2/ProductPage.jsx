import React from "react";
import SaaSProductMockup from "./SaaSProductMockup.jsx";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import "./product.css";

const BOOKING_URL = "https://cal.com/john-rodrigues-rqt2lg/15min";
const NEWSLETTER_URL = "https://substack.com/@johnrodrigues";
const WAITLIST_URL = "mailto:john@humanaistudio.ai?subject=Context%20layer%20waitlist";
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

const outcomes = [
  "A layer over the system you already run. No migration into a new platform.",
  "Agents inherit brand, system, constraints, and quality in one place.",
  "MCP is how they connect. Where we sit is the product.",
  "Workshops teach the problem. The platform is what we hand the same buyer."
];

const layerInputs = [
  "Slugita",
  "Figma",
  "Storybook",
  "Design tokens",
  "Component library",
  "Brand guidelines"
];

const layerOutputs = [
  "Cloud Code",
  "Cursor",
  "Claude Code",
  "Codex",
  "Figma MCP",
  "QA agents"
];

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
  return (
    <div className="product-page">
      <SiteHeader />

      <main>
        <section className="product-hero" aria-labelledby="product-hero-title">
          <Entrance className="product-hero-inner" animate="visible">
            <EntranceItem className="product-hero-copy">
              <p className="product-eyebrow">Design and engineering context layer</p>
              <h1 id="product-hero-title">
                <span>AI native design systems</span>
                <span>for agents.</span>
              </h1>
              <p className="product-lede">
                An MCP you plug into your agent. You build the system here.
                Generated UI is not production-ready, not useful, and not
                accessible. We encode design and front-end engineering
                constraints so you can ship fast with confidence.
              </p>
              <div className="product-hero-actions">
                <a className="product-btn product-btn--primary" href={WAITLIST_URL}>
                  Join the waitlist
                </a>
                <a className="product-btn product-btn--ghost" href="#layers">
                  The four layers
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
            <EntranceItem as="p" className="product-eyebrow">
              The problem
            </EntranceItem>
            <EntranceItem as="h2" id="product-gap-title">
              Agents ship slop. Enterprises ship off-brand products.
            </EntranceItem>
            <EntranceItem as="p" className="product-body">
              They are not blocked. They ship. The damage is what goes out
              the door: almost-right UI, heavier QA, and a product that does
              not look like the company. Volume of agent-generated code is
              compounding. Trust in that output is not.
            </EntranceItem>
          </Entrance>
        </section>

        <section className="product-section" id="layers" aria-labelledby="product-system-title">
          <Entrance className="product-section-inner">
            <EntranceItem className="product-section-heading">
              <p className="product-eyebrow">The product argument</p>
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
            <EntranceItem className="product-ecosystem" aria-label="Context layer connections">
              <p className="product-ecosystem-title">What plugs into this layer</p>
              <div className="product-ecosystem-grid">
                <div className="product-ecosystem-column">
                  <p className="product-ecosystem-label">System inputs</p>
                  <ul>
                    {layerInputs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="product-ecosystem-core" aria-hidden="true">
                  <span>Context layer</span>
                </div>
                <div className="product-ecosystem-column">
                  <p className="product-ecosystem-label">Agent outputs</p>
                  <ul>
                    {layerOutputs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </EntranceItem>
          </Entrance>
        </section>

        <section className="product-section" id="outcomes" aria-labelledby="product-outcomes-title">
          <Entrance className="product-section-inner product-outcomes">
            <EntranceItem className="product-outcomes-copy">
              <p className="product-eyebrow">Where we sit</p>
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

        <section className="product-section product-close" aria-labelledby="product-close-title">
          <Entrance className="product-section-inner product-close-inner">
            <EntranceItem as="p" className="product-eyebrow">
              Who it is for
            </EntranceItem>
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
              <a className="product-btn product-btn--primary" href={WAITLIST_URL}>
                Join the waitlist
              </a>
              <a className="product-btn product-btn--ghost" href={WORKSHOP_URL}>
                Join the workshop
              </a>
            </EntranceItem>
          </Entrance>
        </section>
      </main>

      <ProductFooter />
    </div>
  );
}
