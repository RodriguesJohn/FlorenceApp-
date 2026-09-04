import React from "react";
import OfferingShader from "./OfferingShader.jsx";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { NavMenu } from "./NavMenu.jsx";
import "./styles.css";
import "./workshop-complete.css";

const RECORDING_URL = "https://maven.com/humanaistudio/ai-ready-design-system-workshop";
const NEWSLETTER_URL = "https://substack.com/@johnrodrigues";

const completed = [
  {
    number: "01",
    title: "The agent-ready framework",
    body: "You mapped tokens, naming, and documentation so agents retrieve the system instead of inventing from the prompt."
  },
  {
    number: "02",
    title: "Readiness evals",
    body: "You saw where the system breaks for agents, and you left with a way to test it."
  },
  {
    number: "03",
    title: "Component architecture",
    body: "You connected Figma, code, and the contracts that keep output on-brand."
  },
  {
    number: "04",
    title: "The checklist",
    body: "You have a sequence you can run on an existing system on Monday."
  }
];

const nextSteps = [
  {
    title: "Watch the recording",
    body: "Lifetime access on Maven. Replay the four hours when you implement.",
    href: RECORDING_URL,
    label: "Open Maven",
    external: true
  },
  {
    title: "Open the app",
    body: "The sequence from the room. Contracts, AGENTS.md, Figma setup, evals, Monday checklist.",
    href: "/app",
    label: "Open app"
  },
  {
    title: "Continue on the course",
    body: "The Design Engineering course is the longer track. Modules unlock after you join.",
    href: "/academy",
    label: "Start today"
  },
  {
    title: "Open Florence",
    body: "The system behind the workshop. Retrieve components instead of prompting from scratch.",
    href: "/florence",
    label: "Explore Florence"
  }
];

export default function WorkshopCompletePage() {
  return (
    <main className="page-shell current-home wc-page" id="main-content">
      <a className="ds-skip-link wc-skip" href="#congratulations">
        Skip to congratulations
      </a>

      <nav className="nav nav-dark" aria-label="Primary">
        <a className="brand" href="/" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="nav-actions">
          <NavMenu />
        </div>
      </nav>

      <section className="wc-hero" aria-labelledby="wc-title">
        <Entrance className="wc-hero-inner" animate="visible">
          <EntranceItem as="p" className="eyebrow wc-eyebrow">
            August 29, 2026 · August 29 cohort
          </EntranceItem>
          <EntranceItem as="h1" id="wc-title">
            <span>You finished</span>
            <span>the workshop</span>
          </EntranceItem>
          <EntranceItem as="p" className="wc-lede">
            This is for everyone who sat through the four hours. I built this
            page so the August 29 cohort has a place that says it plainly.
            You finished.
          </EntranceItem>
          <EntranceItem className="wc-hero-actions">
            <a className="wc-btn wc-btn--primary" href="#congratulations">
              Read the note
            </a>
            <a
              className="wc-btn wc-btn--ghost"
              href={RECORDING_URL}
              target="_blank"
              rel="noreferrer"
            >
              Watch the recording
              <span aria-hidden="true">↗</span>
            </a>
          </EntranceItem>
        </Entrance>
      </section>

      <section
        className="wc-letter-section"
        id="congratulations"
        aria-labelledby="wc-letter-title"
      >
        <Entrance className="wc-letter-wrap">
          <EntranceItem as="div" className="wc-letter">
            <OfferingShader
              color1="#0ea5e9"
              color2="#7c3aed"
              seed={8.4}
              className="wc-letter-shader"
            />
            <div className="wc-letter-copy">
              <p className="eyebrow">A note from John</p>
              <h2 id="wc-letter-title">Congratulations, August 29 cohort</h2>
              <p>
                I ran this workshop because agents were inventing UI from the
                prompt. You stayed for the framework, the evals, and the
                architecture. That is the work.
              </p>
              <p>
                You now have a way to make an existing design system retrievable.
                Tokens. Components. Contracts. Use it on a real system this week,
                while the four hours are still close.
              </p>
              <p>I am proud of this room. Thank you for showing up.</p>
              <p className="wc-signoff">John Rodrigues</p>
            </div>
          </EntranceItem>
        </Entrance>
      </section>

      <section className="wc-done" aria-labelledby="wc-done-title">
        <Entrance className="wc-rail">
          <EntranceItem as="p" className="eyebrow">
            What you completed
          </EntranceItem>
          <EntranceItem as="h2" id="wc-done-title">
            Four hours. Four pieces you can run.
          </EntranceItem>
          <div className="wc-done-grid">
            {completed.map((item) => (
              <EntranceItem as="article" className="wc-done-card" key={item.number}>
                <span className="wc-done-tag">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </EntranceItem>
            ))}
          </div>
        </Entrance>
      </section>

      <section className="wc-next" aria-labelledby="wc-next-title">
        <Entrance className="wc-rail">
          <EntranceItem as="p" className="eyebrow">
            What to do next
          </EntranceItem>
          <EntranceItem as="h2" id="wc-next-title">
            Keep the system moving.
          </EntranceItem>
          <div className="wc-next-grid">
            {nextSteps.map((step, index) => (
              <EntranceItem as="article" className="wc-next-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <a
                  className={
                    index === 0
                      ? "wc-btn wc-btn--primary"
                      : "wc-btn wc-btn--ghost"
                  }
                  href={step.href}
                  {...(step.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {step.label}
                  {step.external ? <span aria-hidden="true">↗</span> : null}
                </a>
              </EntranceItem>
            ))}
          </div>
          <EntranceItem as="p" className="wc-newsletter">
            Field notes still go out on Substack.{" "}
            <a href={NEWSLETTER_URL} target="_blank" rel="noreferrer">
              Join the newsletter.
            </a>
          </EntranceItem>
        </Entrance>
      </section>

      <footer className="wc-footer" aria-label="Human AI Studio footer">
        <div className="wc-footer-inner">
          <a className="brand" href="/" aria-label="Human AI Studio home">
            <span className="brand-mark" aria-hidden="true" />
            Human AI Studio
          </a>
          <div className="wc-footer-links">
            <a href="/">Studio</a>
            <a href="/academy">Academy</a>
            <a href="/workshop">Workshop</a>
            <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
