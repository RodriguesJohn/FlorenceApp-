import React from "react";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { NavMenu } from "./NavMenu.jsx";
import profilePicture from "../assets/Profile Picture.jpg";
import florenceWorkImage from "../assets/work/Florence.png";
import "./styles.css";
import "./design-systems.css";

const WORKSHOP_URL = "https://maven.com/humanaistudio/ai-ready-design-system-workshop";
const MASTERCLASS_URL = "https://maven.com/p/7ff349/ai-ready-design-systems-masterclass";
const MASTERCLASS_START = new Date("2026-08-18T19:00:00Z").getTime();
const MASTERCLASS_END = new Date("2026-08-18T20:00:00Z").getTime();
const newsletterUrl = "https://substack.com/@johnrodrigues";
const footerVideoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4";

const outcomes = [
  {
    number: "01",
    title: "The agent-ready framework",
    body: "Structure components, tokens, naming, and documentation so agents can build on-brand UI instead of creating visual drift."
  },
  {
    number: "02",
    title: "Agent-readiness evals",
    body: "See where your system breaks for agents, learn how to test it, and establish a benchmark before you start fixing it."
  },
  {
    number: "03",
    title: "AI-ready component architecture",
    body: "Connect Figma and code with the right tools, MCPs, and component patterns for reliable agent workflows."
  },
  {
    number: "04",
    title: "A step-by-step checklist",
    body: "Leave with a practical roadmap your team can run against an existing design system immediately."
  }
];

const agenda = [
  {
    time: "First 2 hours",
    title: "The AI-ready design system framework",
    body: "Move from foundations to advanced topics: agent consumers, system architecture, tokens, rules, documentation, and readiness benchmarks."
  },
  {
    time: "20-minute break",
    title: "Reset and prepare to build",
    body: "Step away, compare notes, and come back ready to apply the framework."
  },
  {
    time: "Final 2 hours",
    title: "Practical implementation",
    body: "Audit an existing system, find the failure modes, and apply the workflow to components, Figma, code, and agent instructions."
  }
];

const included = [
  "Four-hour live, hands-on workshop",
  "Agent-ready design system playbook",
  "Readiness evaluation framework",
  "Implementation checklist and roadmap",
  "Lifetime access to the recording",
  "Human AI Studio peer community",
  "Certificate of completion"
];

const audience = [
  "Product and systems designers",
  "Design system practitioners",
  "Design managers and leads",
  "AI consultants working with product teams"
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function CheckIcon() {
  return <span className="ds-check" aria-hidden="true">✓</span>;
}

function getMasterclassCountdown(now = Date.now()) {
  if (now >= MASTERCLASS_END) return { status: "Masterclass ended" };
  if (now >= MASTERCLASS_START) return { status: "Live now" };

  const totalSeconds = Math.max(0, Math.floor((MASTERCLASS_START - now) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

function MasterclassCountdown() {
  const [countdown, setCountdown] = React.useState(() => getMasterclassCountdown());

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getMasterclassCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (countdown.status) {
    return <span className="ds-masterclass-countdown is-status" aria-hidden="true">{countdown.status}</span>;
  }

  const units = [
    [countdown.days, "d"],
    [countdown.hours, "h"],
    [countdown.minutes, "m"],
    [countdown.seconds, "s"]
  ];

  return (
    <span className="ds-masterclass-countdown" aria-hidden="true">
      <span className="ds-countdown-label">Starts in</span>
      {units.map(([value, label]) => (
        <span className="ds-countdown-unit" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <small>{label}</small>
        </span>
      ))}
    </span>
  );
}

function CtaLink({ href, children, variant = "primary", className = "" }) {
  return (
    <a
      className={`ds-conversion-cta is-${variant} ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

export default function DesignSystemsPage() {
  React.useEffect(() => {
    document.title = "AI-Ready Design System Workshop | Human AI Studio";
    const description =
      "Everything you need to make your design system agent-ready: the framework, readiness evals, component architecture, and a step-by-step checklist.";
    let meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    return () => {
      if (previous != null) meta.setAttribute("content", previous);
    };
  }, []);

  return (
    <main className="page-shell current-home ds-audit-page" id="main-content">
      <a className="ds-skip-link" href="#workshop-offer">Skip to workshop offer</a>

      <nav className="nav nav-dark" aria-label="Primary">
        <a className="brand" href="/" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="nav-actions">
          <NavMenu />
        </div>
      </nav>

      <a
        className="ds-urgency-bar"
        href={MASTERCLASS_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Join the free AI-Ready Design Systems Masterclass on August 18 at 12:00 PM Pacific Time on Maven"
      >
        <span className="ds-banner-date">August 18 · 12:00 PM PT</span>
        <MasterclassCountdown />
        <span className="ds-banner-cta">
          Join the free masterclass
          <span className="ds-banner-arrow" aria-hidden="true">↗</span>
        </span>
      </a>
      <div className="ds-urgency-spacer" aria-hidden="true" />

      <section className="ds-audit-hero" aria-labelledby="ds-audit-title">
        <Entrance className="ds-audit-hero-inner" animate="visible">
          <div className="ds-audit-hero-copy">
            <div className="ds-hero-main">
              <EntranceItem as="h1" id="ds-audit-title">
                Everything you need to make your design system agent-ready.
              </EntranceItem>
              <EntranceItem as="p" className="ds-audit-intro">
                Learn the framework, evals, component architecture, and step-by-step
                checklist you can apply to your existing system.
              </EntranceItem>
            </div>

            <EntranceItem as="aside" className="ds-hero-offer-card" aria-label="Workshop details">
              <p className="ds-hero-offer-label">Live workshop</p>
              <dl className="ds-hero-meta">
                <div><dt>Date</dt><dd>August 29</dd></div>
                <div><dt>Time</dt><dd>9:00 AM–1:00 PM PT</dd></div>
                <div><dt>Format</dt><dd>Live on Maven</dd></div>
              </dl>
              <div className="ds-audit-actions">
                <CtaLink href={WORKSHOP_URL}>Reserve your seat for $599</CtaLink>
                <CtaLink href={MASTERCLASS_URL} variant="secondary">
                  Join the free masterclass
                </CtaLink>
              </div>
              <p className="ds-hero-proof">20 seats · Certificate · Lifetime recording</p>
            </EntranceItem>
          </div>

          <EntranceItem className="ds-audit-hero-media">
            <img
              src={florenceWorkImage}
              alt="Florence agent-ready design system showing a structured component library"
            />
            <div>
              <span>Florence · Built by Human AI Studio</span>
              <a href="/offerings/agent-ready-design-system">
                See the system behind the workshop <ArrowIcon />
              </a>
            </div>
          </EntranceItem>
        </Entrance>
      </section>

      <section className="ds-trust-strip" aria-label="Instructor experience">
        <p>Built from 10+ years of product and design experience</p>
        <div aria-label="Previously worked with">
          <span>JPMorgan</span>
          <span>Citi</span>
          <span>TOCA</span>
          <span>4.8/5 Maven rating</span>
        </div>
      </section>

      <section className="ds-audit-problem" aria-labelledby="ds-audit-problem-title">
        <Entrance className="ds-audit-rail">
          <EntranceItem as="h2" id="ds-audit-problem-title">
            An AI-ready playbook for your design system.
          </EntranceItem>
          <EntranceItem as="p" className="ds-section-intro">
            Know what to evaluate, change, and document next.
          </EntranceItem>

          <div className="ds-outcome-grid">
            {outcomes.map((outcome) => (
              <Entrance as="article" className="ds-outcome-card" key={outcome.number}>
                <span>{outcome.number}</span>
                <h3>{outcome.title}</h3>
                <p>{outcome.body}</p>
              </Entrance>
            ))}
          </div>
        </Entrance>
      </section>

      <section className="ds-why-section" aria-labelledby="ds-why-title">
        <Entrance className="ds-audit-rail ds-why-layout">
          <div>
            <EntranceItem as="h2" id="ds-why-title">
              AI slop is an architecture problem.
            </EntranceItem>
          </div>
          <div className="ds-why-copy">
            <EntranceItem as="p">
              Agents building without your design system create visual drift. Teams are
              moving faster, but the output is inconsistent because most systems were
              designed for people to browse, not for agents to query and apply.
            </EntranceItem>
            <EntranceItem as="p">
              Design systems are becoming the infrastructure coding agents build from.
              Everyone sees the shift. Almost nobody knows how to make an existing system
              ready for it.
            </EntranceItem>
            <EntranceItem as="p" className="ds-why-emphasis">
              Designers can clean up the output or own the architecture that creates it.
              This workshop teaches you how to own it.
            </EntranceItem>
          </div>
        </Entrance>
      </section>

      <section className="ds-masterclass" id="free-masterclass" aria-labelledby="masterclass-title">
        <Entrance className="ds-masterclass-inner">
          <EntranceItem className="ds-masterclass-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/OqrxSgWpRvs?rel=0"
              title="What are agentic design systems?"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </EntranceItem>
          <div className="ds-masterclass-copy">
            <EntranceItem as="h2" id="masterclass-title">
              Not ready for the workshop yet?
            </EntranceItem>
            <EntranceItem as="p">
              Join the free AI-Ready Design Systems Masterclass. Learn what changes when
              agents become design system consumers, see the core framework, and decide if
              the hands-on workshop is right for you.
            </EntranceItem>
            <EntranceItem className="ds-masterclass-list" as="ul">
              <li><CheckIcon /> Understand what makes a system agent-ready</li>
              <li><CheckIcon /> See the shift from human docs to agent infrastructure</li>
              <li><CheckIcon /> Join live on August 18 at 12:00 PM PT</li>
            </EntranceItem>
            <EntranceItem>
              <CtaLink href={MASTERCLASS_URL} variant="light">
                Join the free masterclass
              </CtaLink>
            </EntranceItem>
            <EntranceItem as="p" className="ds-masterclass-proof">
              Free on Maven · Live August 18 · 60 minutes
            </EntranceItem>
          </div>
        </Entrance>
      </section>

      <section className="ds-agenda" aria-labelledby="agenda-title">
        <Entrance className="ds-audit-rail">
          <EntranceItem as="h2" id="agenda-title">
            Four focused hours from framework to implementation.
          </EntranceItem>
          <ol className="ds-agenda-list">
            {agenda.map((item, index) => (
              <Entrance as="li" key={item.time}>
                <span className="ds-agenda-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.time}</strong>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.body}</p>
              </Entrance>
            ))}
          </ol>
        </Entrance>
      </section>

      <section className="ds-fit" aria-labelledby="fit-title">
        <Entrance className="ds-audit-rail ds-fit-grid">
          <div>
            <EntranceItem as="h2" id="fit-title">
              For the people responsible for how products get built.
            </EntranceItem>
          </div>
          <EntranceItem as="ul">
            {audience.map((item) => <li key={item}><CheckIcon /> {item}</li>)}
          </EntranceItem>
        </Entrance>
      </section>

      <section className="ds-instructor" aria-labelledby="instructor-title">
        <Entrance className="ds-instructor-inner">
          <EntranceItem className="ds-instructor-portrait">
            <img src={profilePicture} alt="John Rodrigues" />
          </EntranceItem>
          <div>
            <EntranceItem as="h2" id="instructor-title">John Rodrigues</EntranceItem>
            <EntranceItem as="p" className="ds-instructor-role">
              Design Engineer · Founder of Human AI Studio
            </EntranceItem>
            <EntranceItem as="p">
              John is a design engineer and founder of Human AI Studio, an AI-native
              product studio. He brings 10+ years of product and design experience from
              teams including JPMorgan, Citi, and TOCA, and has taught more than 10 cohorts
              on Maven with a 4.8/5 rating.
            </EntranceItem>
            <EntranceItem as="p">
              This workshop is built from Human AI Studio’s R&amp;D and the work behind
              Florence, an agent-ready design system designed for real AI-native product
              workflows.
            </EntranceItem>
          </div>
        </Entrance>
      </section>

      <section className="ds-offer" id="workshop-offer" aria-labelledby="offer-title">
        <Entrance className="ds-offer-card">
          <div className="ds-offer-copy">
            <EntranceItem as="h2" id="offer-title">
              Learn how to make your design system AI-ready.
            </EntranceItem>
            <EntranceItem as="p">
              One hands-on day to move from confusion to a concrete framework, evaluation,
              and implementation roadmap.
            </EntranceItem>
            <EntranceItem className="ds-offer-meta">
              <div><span>Date</span><strong>August 29, 2026</strong></div>
              <div><span>Time</span><strong>9:00 AM–1:00 PM PT</strong></div>
              <div><span>Format</span><strong>Live on Maven</strong></div>
            </EntranceItem>
          </div>

          <div className="ds-price-card">
            <EntranceItem as="p" className="ds-price-label">One-time enrollment</EntranceItem>
            <EntranceItem as="p" className="ds-price">$599</EntranceItem>
            <EntranceItem as="p" className="ds-seat-note">Limited to 20 seats</EntranceItem>
            <EntranceItem as="ul">
              {included.map((item) => <li key={item}><CheckIcon /> {item}</li>)}
            </EntranceItem>
            <EntranceItem>
              <CtaLink href={WORKSHOP_URL} variant="light" className="ds-offer-cta">
                Reserve your workshop seat
              </CtaLink>
            </EntranceItem>
            <EntranceItem as="p" className="ds-discount-note">
              <a
                href="https://help.maven.com/en/articles/6723771-getting-your-course-reimbursed"
                target="_blank"
                rel="noreferrer"
              >
                Get Your Course Reimbursed <span aria-hidden="true">↗</span>
              </a>
              <span>Your employer’s 2026 learning and development budget may cover this workshop.</span>
            </EntranceItem>
          </div>
        </Entrance>
      </section>

      <section className="ds-faq" aria-labelledby="faq-title">
        <Entrance className="ds-faq-inner">
          <EntranceItem>
            <h2 id="faq-title">Before you enroll.</h2>
          </EntranceItem>
          <div>
            <EntranceItem as="details">
              <summary>What if I can’t attend live?</summary>
              <p>You’ll receive lifetime access to the workshop recording on Maven.</p>
            </EntranceItem>
            <EntranceItem as="details">
              <summary>Do I need to be a design system expert?</summary>
              <p>No. Familiarity with product design, components, or design systems is useful, but the session builds from the foundations into advanced implementation.</p>
            </EntranceItem>
            <EntranceItem as="details">
              <summary>Can I bring my team?</summary>
              <p>Yes. Maven offers 20% off for 2–9 seats and 25% off for 10 or more seats.</p>
            </EntranceItem>
            <EntranceItem as="details">
              <summary>Will I receive a certificate?</summary>
              <p>Yes. You’ll receive a certificate of completion that you can share with your employer or add to LinkedIn.</p>
            </EntranceItem>
          </div>
        </Entrance>
      </section>

      <section className="ds-final-choice" aria-labelledby="final-choice-title">
        <Entrance className="ds-final-choice-inner">
          <EntranceItem as="h2" id="final-choice-title">
            Start with the free masterclass, or go deeper in the live workshop.
          </EntranceItem>
          <EntranceItem className="ds-audit-actions">
            <CtaLink href={WORKSHOP_URL}>Reserve your workshop seat</CtaLink>
            <CtaLink href={MASTERCLASS_URL} variant="secondary">Join the free masterclass</CtaLink>
          </EntranceItem>
        </Entrance>
      </section>

      <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <video
          className="footer-growth-video"
          src={footerVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="footer-growth-scrim" aria-hidden="true" />
        <div className="site-footer-inner">
          <Entrance className="footer-brand">
            <EntranceItem as="a" className="brand" href="/#top" aria-label="Human AI Studio home">
              <span className="brand-mark" aria-hidden="true" />
              Human AI Studio
            </EntranceItem>
            <EntranceItem as="p">
              Human AI Studio is a company of Human Inspire Studio LLC.
            </EntranceItem>
          </Entrance>

          <Entrance className="footer-column">
            <EntranceItem as="p">Contact</EntranceItem>
            <EntranceItem as="a" href={newsletterUrl} target="_blank" rel="noreferrer">
              Publication
            </EntranceItem>
            <EntranceItem as="a" href="mailto:john@humanaistudio.ai">
              john@humanaistudio.ai
            </EntranceItem>
          </Entrance>
        </div>
        <div className="footer-wordmark" aria-hidden="true">Human AI Studio</div>
      </footer>
    </main>
  );
}
