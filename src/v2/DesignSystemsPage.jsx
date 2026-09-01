import React from "react";
import { track } from "@vercel/analytics";
import { Star } from "lucide-react";
import { Entrance, EntranceItem, entranceViewport } from "./entrance.jsx";
import { NavMenu } from "./NavMenu.jsx";
import { WorkshopCountdown } from "./WorkshopCountdown.jsx";
import AcademyWorkspacePreview from "./AcademyWorkspacePreview.jsx";
import { AcademyAnimatedTestimonials } from "./AcademyAnimatedTestimonials.jsx";
import { modules as trainingModules } from "./playbookTopics.js";
import profilePicture from "../assets/Profile Picture.jpg";
import "./styles.css";
import "./design-systems.css";
import "./academy.css";

const SHOW_PLAYBOOK_SECTION = false;
const SHOW_TRAINING_SECTION = false;

const WORKSHOP_URL = "https://maven.com/humanaistudio/ai-ready-design-system-workshop";
const TRAINING_URL = "/academy";
const BOOKING_URL = "https://cal.com/john-rodrigues-rqt2lg/15min";
const newsletterUrl = "https://substack.com/@johnrodrigues";

const companyLogos = [
  { src: "/academy/Apple.png", alt: "Apple" },
  { src: "/academy/Google.svg.png", alt: "Google" },
  { src: "/academy/Chase.png", alt: "JPMorgan Chase" },
  { src: "/academy/Hubspot.svg.png", alt: "HubSpot" },
  { src: "/academy/intercom-1-logo-png-transparent.png", alt: "Intercom" },
  { src: "/academy/Salesforce.svg", alt: "Salesforce" }
];

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

const workshopIncluded = [
  "Live one-day workshop",
  "Live Q&A",
  "Certificate of completion",
  "Lifetime access to the recording",
  "Agent-ready design system playbook",
  "Implementation checklist"
];

const trainingIncluded = [
  "Access to the lesson library",
  "Self-paced lessons you can replay",
  "Tokens, components, and contracts",
  "Figma workflows and building in Cursor",
  "Community of AI designers",
  "Async chat support"
];

const workshopQuotes = [
  {
    id: 1,
    name: "Jake Barrow",
    role: "Product Designer",
    company: "",
    content:
      "John is very knowledgeable and enthusiastic about building quality design systems that allow us to get the most from AI. The course was informative, and there were many opportunities to ask questions.",
    rating: 4
  },
  {
    id: 2,
    name: "Kelly Redznak",
    role: "Sr. Product Designer",
    company: "Optimum",
    content:
      "He packed in a lot of valuable insight on building industry-standard AI-ready design systems, how to structure them, maintain them, and test them so agents produce reliable, on-brand output.",
    rating: 5
  }
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

function trackWorkshopClick(href, label, location) {
  track(
    href === WORKSHOP_URL
      ? "Workshop CTA Click"
      : href === TRAINING_URL
        ? "Academy CTA Click"
        : "Workshop Page CTA Click",
    {
      route: "/workshop",
      label,
      location,
      href
    }
  );
}

function CtaLink({ href, children, variant = "primary", className = "" }) {
  const label = typeof children === "string" ? children : "Workshop CTA";
  const isExternal = /^https?:/i.test(href);

  return (
    <a
      className={`ds-conversion-cta is-${variant} ${className}`.trim()}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      onClick={() => trackWorkshopClick(href, label, "workshop_page")}
    >
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

function PriceCard({
  featured = false,
  comingSoon = false,
  badge,
  label,
  amount,
  term,
  note,
  items,
  ctaHref,
  ctaLabel,
  ctaVariant = "light",
  footer = null
}) {
  return (
    <article
      className={`ds-price-card${featured ? " is-featured" : ""}${comingSoon ? " is-soon" : ""}`}
    >
      <header className="ds-price-head">
        <p className="ds-price-label">{label}</p>
        {badge ? (
          <span className={`ds-price-badge${comingSoon ? " is-soon" : " is-popular"}`}>
            {badge}
          </span>
        ) : null}
      </header>
      <p className="ds-price">
        {amount}
        {term ? <small className="ds-price-term">{term}</small> : null}
      </p>
      <p className={`ds-seat-note${note ? "" : " is-empty"}`}>
        {note || "\u00a0"}
      </p>
      <ul>
        {items.map((item) => (
          <li key={item}><CheckIcon /> {item}</li>
        ))}
      </ul>
      <div className="ds-price-cta">
        {comingSoon ? (
          <span className="ds-conversion-cta is-soon" aria-disabled="true">
            Coming soon
          </span>
        ) : (
          <CtaLink href={ctaHref} variant={ctaVariant} className="ds-offer-cta">
            {ctaLabel}
          </CtaLink>
        )}
      </div>
      <div className="ds-price-extra">
        {footer || <p className="ds-discount-note is-empty" aria-hidden="true">&nbsp;</p>}
      </div>
    </article>
  );
}

const sampleLesson = trainingModules[0]?.chapters[0];
const sampleVideo = sampleLesson?.videos?.[0];
const sampleMuxSrc = sampleVideo?.muxPlaybackId
  ? `https://player.mux.com/${sampleVideo.muxPlaybackId}?autoplay=true&muted=true&loop=true`
  : "";

function TrainingLessonModule() {
  if (!sampleLesson) return null;

  return (
    <div className="ds-training-module">
      <aside className="ds-training-nav" aria-hidden="true">
        <p>
          <strong>Training</strong>
          <small>AI-ready design systems</small>
        </p>
        <ul>
          {trainingModules.map((item, index) => (
            <li key={item.id} className={index === 0 ? "is-active" : undefined}>
              {item.label}
            </li>
          ))}
        </ul>
      </aside>
      <article className="ds-training-lesson">
        <p className="ds-training-back">Back</p>
        <h3>{sampleLesson.title.replaceAll("AI-ready", "AI\u2011ready")}</h3>
        <p>{sampleLesson.body[0]}</p>
        {sampleMuxSrc ? (
          <div className="ds-training-video">
            <iframe
              src={sampleMuxSrc}
              title={sampleVideo.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : null}
      </article>
    </div>
  );
}

export default function DesignSystemsPage({ embedded = false } = {}) {
  React.useEffect(() => {
    if (embedded) return;
    document.title = "AI-Ready Design System Workshop | Human AI Studio";
    const description =
      "Join the workshop to learn AI-ready design systems: the framework, readiness evals, component architecture, and implementation checklist.";
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
  }, [embedded]);

  const Root = embedded ? "div" : "main";

  return (
    <Root
      className={`page-shell current-home ds-audit-page${embedded ? " is-embedded" : ""}`}
      id={embedded ? undefined : "main-content"}
    >
      {embedded ? null : (
        <>
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
            href="#workshop-offer"
            aria-label="Join Workshop for the AI-Ready Design System Workshop on September 12 at 9:00 AM Pacific Time"
            onClick={() => trackWorkshopClick(WORKSHOP_URL, "Join Workshop", "urgency_bar")}
          >
            <span className="ds-urgency-bar-inner">
              <span className="ds-banner-date">September 12 · 9:00 AM PT</span>
              <span className="ds-urgency-bar-actions">
                <WorkshopCountdown className="is-banner" label="Workshop starts in" />
                <span className="ds-banner-cta">
                  Join Workshop
                  <span className="ds-banner-arrow" aria-hidden="true">↗</span>
                </span>
              </span>
            </span>
          </a>
          <div className="ds-urgency-spacer" aria-hidden="true" />
        </>
      )}

      <section className="ds-audit-hero" aria-labelledby="ds-audit-title">
        <Entrance className="ds-audit-hero-inner" animate="visible">
          <div className="ds-audit-hero-copy">
            <div className="ds-hero-main">
              <EntranceItem as="p" className="academy-reviews-badge ds-hero-badge">
                <Star aria-hidden="true" />
                Popular courses on Maven
              </EntranceItem>
              <EntranceItem as="h1" id="ds-audit-title">
                <span>Join AI Design</span>
                <span>System Workshop</span>
              </EntranceItem>
              <EntranceItem as="p" className="ds-audit-intro">
                Join the workshop to learn the framework, evals, and component
                architecture your existing system needs.
              </EntranceItem>
            </div>

            <EntranceItem as="aside" className="ds-hero-offer-card" aria-label="Workshop details">
              <p className="ds-hero-offer-label">Live workshop</p>
              <dl className="ds-hero-meta">
                <div><dt>Date</dt><dd>September 12</dd></div>
                <div><dt>Time</dt><dd>9:00 AM–1:00 PM PT</dd></div>
                <div><dt>Format</dt><dd>Live on Maven</dd></div>
              </dl>
              <div className="ds-audit-actions">
                <CtaLink href={WORKSHOP_URL}>Reserve your seat for $599</CtaLink>
                <CtaLink href={TRAINING_URL} variant="secondary">
                  Join self-paced training
                </CtaLink>
              </div>
              <p className="ds-hero-proof">20 seats · Certificate · Lifetime recording</p>
            </EntranceItem>
          </div>

          <div className="ds-audit-hero-media">
            <video
              className="ds-audit-hero-video"
              src="/workshop/workshop.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              aria-label="Workshop highlight"
              onCanPlay={(event) => {
                event.currentTarget.muted = true;
                event.currentTarget.play().catch(() => {});
              }}
            />
          </div>
        </Entrance>
      </section>

      <section className="ds-trust-strip" aria-label="Companies represented">
        <p>Trusted by designers from</p>
        <div className="ds-trust-logos">
          {companyLogos.map((logo) => (
            <span className="ds-trust-logo" key={logo.alt}>
              <img src={logo.src} alt={logo.alt} />
            </span>
          ))}
        </div>
      </section>

      <div className="ds-reviews">
        <AcademyAnimatedTestimonials
          title=""
          badgeText=""
          testimonials={workshopQuotes}
        />
      </div>

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

      {SHOW_PLAYBOOK_SECTION ? (
      <section className="ds-playbook" id="playbook" aria-labelledby="playbook-title">
        <Entrance className="ds-playbook-inner">
          <EntranceItem className="ds-playbook-visual">
            <figure className="academy-hero-app ds-playbook-app">
              <div className="academy-hero-app-scaler">
                <div className="academy-hero-chrome">
                  <span className="academy-hero-chrome-lights" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="academy-hero-chrome-title">Playbook</span>
                </div>
                <div className="academy-hero-app-frame">
                  <AcademyWorkspacePreview product="Playbook" />
                </div>
              </div>
            </figure>
          </EntranceItem>
          <div className="ds-playbook-copy">
            <EntranceItem as="h2" id="playbook-title">
              <span>Get the playbook</span>
            </EntranceItem>
            <EntranceItem as="p">
              The written guide from the workshop: the agent-ready framework, evals,
              component architecture, and the weekly loop to keep the system current.
            </EntranceItem>
            <EntranceItem className="ds-masterclass-list" as="ul">
              <li><CheckIcon /> Framework, contracts, and naming</li>
              <li><CheckIcon /> Readiness evals and the weekly loop</li>
            </EntranceItem>
            <EntranceItem>
              <CtaLink href="/playbook" variant="light">
                Open the playbook
              </CtaLink>
            </EntranceItem>
          </div>
        </Entrance>
      </section>
      ) : null}

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

      <div className="academy-page ds-training-hero">
        <section
          className="academy-hero-wrap academy-hero-wrap--product"
          aria-labelledby="training-hero-title"
        >
          <div className="academy-hero-rays" aria-hidden="true" />
          <div className="academy-hero-glow" aria-hidden="true" />
          <div className="academy-hero">
            <Entrance className="academy-hero-copy" animate="visible">
              <EntranceItem as="h2" id="training-hero-title">
                A structured way to level up your skill.
              </EntranceItem>
              <EntranceItem as="p" className="academy-hero-sub">
                Make AI skills a top priority at the organization level. Level up how
                your team builds with Cursor, Claude Code, and agentic workflows, not
                just one person.
              </EntranceItem>
            </Entrance>
          </div>

          <Entrance className="academy-hero-shot" animate="visible">
            <EntranceItem>
              <div className="academy-hero-shot-glow" aria-hidden="true" />
              <div className="academy-hero-shot-stage">
                <div className="academy-hero-shot-frame">
                  <figure className="academy-hero-app">
                    <div className="academy-hero-app-scaler">
                      <div className="academy-hero-chrome">
                        <span className="academy-hero-chrome-lights" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="academy-hero-chrome-title">Training</span>
                      </div>
                      <div className="academy-hero-app-frame">
                        <AcademyWorkspacePreview />
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            </EntranceItem>
          </Entrance>
        </section>
      </div>

      <section className="ds-agenda" aria-labelledby="agenda-title">
        <Entrance className="ds-audit-rail">
          <EntranceItem as="h2" id="agenda-title">
            <span>Four focused hours</span>
            <span>from framework to build.</span>
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
              Join the live one-day workshop. Self-paced training is coming soon.
            </EntranceItem>
          </div>

          <div className="ds-price-grid">
            <EntranceItem className="ds-price-cell">
              <PriceCard
                featured
                badge="Most popular"
                label="Workshop"
                amount="$599"
                note="Limited to 20 seats"
                items={workshopIncluded}
                ctaHref={WORKSHOP_URL}
                ctaLabel="Reserve your workshop seat"
                footer={
                  <p className="ds-discount-note">
                    <a
                      href="https://help.maven.com/en/articles/6723771-getting-your-course-reimbursed"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get Your Course Reimbursed <span aria-hidden="true">↗</span>
                    </a>
                    <span>Your employer’s 2026 learning and development budget may cover this workshop.</span>
                  </p>
                }
              />
            </EntranceItem>
            <EntranceItem className="ds-price-cell">
              <PriceCard
                comingSoon
                badge="Coming soon"
                label="Self-paced"
                amount="$149"
                term="/ mo"
                note="Library access"
                items={trainingIncluded}
              />
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
              <p>
                Join the self-paced training for library access on your own time.
                Workshop seats also include lifetime access to the recording.
              </p>
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

      {SHOW_TRAINING_SECTION ? (
      <section className="ds-playbook" id="training" aria-labelledby="training-title">
        <Entrance className="ds-training-wrap">
          <div className="ds-training-intro">
            <EntranceItem as="h2" id="training-title">
              Can&apos;t join the live workshop?
            </EntranceItem>
            <EntranceItem as="p">
              Join the self-paced training. Get access to the lesson library,
              Cursor and Claude Code workflows, and the community — on your
              schedule.
            </EntranceItem>
          </div>
          <EntranceItem>
            <TrainingLessonModule />
          </EntranceItem>
          <EntranceItem>
            <CtaLink href={TRAINING_URL} variant="light">
              Join the self-paced training
            </CtaLink>
          </EntranceItem>
        </Entrance>
      </section>
      ) : null}

      {embedded ? null : (
        <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <div className="site-footer-inner">
          <Entrance className="footer-brand">
            <EntranceItem as="a" className="brand" href="/#top" aria-label="Human AI Studio home">
              <span className="brand-mark" aria-hidden="true" />
              Human AI Studio
            </EntranceItem>
            <EntranceItem as="p">
              AI product studio for design systems, agents, and AI-native workflows.
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
            <EntranceItem as="address" className="footer-address">
              Human AI Studio<br />
              455 Market St Ste 1940<br />
              PMB 769150<br />
              San Francisco, California 94105-2448 US
            </EntranceItem>
            <EntranceItem as="a" href={BOOKING_URL} target="_blank" rel="noreferrer">
              Book a call
            </EntranceItem>
          </Entrance>
        </div>
        <EntranceItem
          as="div"
          className="footer-wordmark"
          aria-hidden="true"
          initial={false}
          whileInView="visible"
          viewport={entranceViewport}
        >
          Human AI Studio
        </EntranceItem>
      </footer>
      )}
    </Root>
  );
}
