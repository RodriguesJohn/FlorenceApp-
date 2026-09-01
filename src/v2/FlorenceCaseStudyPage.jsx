import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Entrance, EntranceItem, entranceViewport } from "./entrance.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import florenceStill from "../assets/work/Florence.png";
import "./florence-case-study.css";

const BOOKING_URL = "https://cal.com/john-rodrigues-rqt2lg/15min";
const NEWSLETTER_URL = "https://substack.com/@johnrodrigues";
const DEMO_VIDEO_SRC = "/florence/F2.mp4";
const LAUNCH_VIDEO_SRC = "/florence/launch.mp4";

function CaseStudyFooter() {
  return (
    <div className="current-home">
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
            <EntranceItem as="a" href={NEWSLETTER_URL} target="_blank" rel="noreferrer">
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
    </div>
  );
}

export default function FlorenceCaseStudyPage() {
  React.useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.background;
    const prevBody = document.body.style.background;
    html.style.background = "#000000";
    document.body.style.background = "#000000";
    return () => {
      html.style.background = prevHtml;
      document.body.style.background = prevBody;
    };
  }, []);

  return (
    <div className="fcs-page current-home">
      <SiteHeader />
      <main className="fcs-main" id="main-content">
        <section className="fcs-hero" aria-labelledby="fcs-title">
          <Entrance className="fcs-hero-inner" animate="visible">
            <EntranceItem as="p" className="fcs-kicker">
              Case studies
            </EntranceItem>
            <EntranceItem as="h1" id="fcs-title">
              Florence
            </EntranceItem>
            <EntranceItem as="p" className="fcs-lede">
              I built Florence so coding agents retrieve a real design system
              instead of inventing UI. It launched at 73% retrieval accuracy.
              After a few manual tweaks, the screens were on-brand, cheaper in
              tokens, and fast enough to ship.
            </EntranceItem>
            <EntranceItem as="dl" className="fcs-project">
              <div>
                <dt>Project</dt>
                <dd>Florence</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>AI-ready design system</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>2026</dd>
              </div>
              <div>
                <dt>Agents</dt>
                <dd>Cursor, Claude Code, Codex</dd>
              </div>
            </EntranceItem>
          </Entrance>
        </section>

        <figure className="fcs-frame">
          <video
            className="fcs-video"
            src={DEMO_VIDEO_SRC}
            poster={florenceStill}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Florence design system demo"
          />
        </figure>

        <div className="fcs-body">
          <section className="fcs-block" aria-labelledby="fcs-problem">
            <h2 id="fcs-problem">The problem</h2>
            <p className="fcs-problem-lead">
              Today&apos;s design systems were built for humans. Figma files,
              a few docs, tribal knowledge in Slack. That is a visual language
              for people. It is not a system agents can retrieve.
            </p>
            <p>
              Nothing was machine-readable in a way a coding agent could trust.
              So the model invented UI. Context stayed scattered. Token cost
              went up because the agent restated what the system never said
              once. The brand paid for it in screens that looked almost right.
            </p>
            <ul className="fcs-pains">
              <li>
                <span className="fcs-pain-index" aria-hidden="true">
                  01
                </span>
                <div className="fcs-pain-copy">
                  <h3>Off-brand UI that leads to an inconsistent experience</h3>
                  <p>Agents could see components. They still had no rules for a complete product.</p>
                  <p className="fcs-impact">
                    <span>Impact</span>
                    Users hit a different product in every flow. The brand
                    stops holding.
                  </p>
                </div>
              </li>
              <li>
                <span className="fcs-pain-index" aria-hidden="true">
                  02
                </span>
                <div className="fcs-pain-copy">
                  <h3>Scattered context that agents cannot retrieve</h3>
                  <p>Some of it lived in GitHub. Some in Figma. A lot of it was never written down.</p>
                  <p className="fcs-impact">
                    <span>Impact</span>
                    Every session starts from zero. The agent burns tokens
                    relearning the product.
                  </p>
                </div>
              </li>
              <li>
                <span className="fcs-pain-index" aria-hidden="true">
                  03
                </span>
                <div className="fcs-pain-copy">
                  <h3>Token cost that climbs with every guessed screen</h3>
                  <p>The hole was product context. The agent restated what the system never said once.</p>
                  <p className="fcs-impact">
                    <span>Impact</span>
                    The bill goes up. The screens still need a rewrite.
                  </p>
                </div>
              </li>
              <li>
                <span className="fcs-pain-index" aria-hidden="true">
                  04
                </span>
                <div className="fcs-pain-copy">
                  <h3>Shipping that slows while humans clean up every pass</h3>
                  <p>One screen can look fine. Across flows, review becomes the bottleneck.</p>
                  <p className="fcs-impact">
                    <span>Impact</span>
                    Velocity looks high until the cleanup starts. The product
                    ships later, and less on-brand.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section className="fcs-block" aria-labelledby="fcs-built">
            <h2 id="fcs-built">Why Florence exists</h2>
            <p className="fcs-problem-lead">
              That is why I built Florence. It was a staging proof of work. A
              live catalog I could put in front of a client and show that
              retrievability can be solved.
            </p>
            <p>
              I spent months in the files. How tokens were named. How states
              were documented. How an agent actually asked for a button versus
              how a designer filed one. I was looking for a method, not a
              prettier theme.
            </p>
            <p>
              The studio keeps the internals. What I took out was strategy:
              make the system retrievable, then measure it. Florence was the
              proof I could walk into a room with.
            </p>
          </section>
        </div>

        <section className="fcs-story" aria-labelledby="fcs-story">
          <div className="fcs-body fcs-body--tight">
            <div className="fcs-block">
              <h2 id="fcs-story">An AI-ready design system</h2>
              <p className="fcs-problem-lead">
                Florence launched. That is the proof of work. Not a slide. A
                catalog I still run.
              </p>
            </div>
          </div>

          <figure className="fcs-frame">
            <video
              className="fcs-video"
              src={LAUNCH_VIDEO_SRC}
              poster={florenceStill}
              controls
              playsInline
              preload="metadata"
              aria-label="Florence launch video"
            />
          </figure>

          <div className="fcs-body">
            <ul className="fcs-pains">
              <li>
                <span className="fcs-pain-index" aria-hidden="true">
                  01
                </span>
                <div className="fcs-pain-copy">
                  <h3>29 components. 9 foundations. 736 tokens.</h3>
                  <p>Agents hit a real catalog instead of inventing UI.</p>
                  <p className="fcs-impact">
                    <span>Shipped</span>
                    A live AI-ready design system. Still running.
                  </p>
                </div>
              </li>
              <li>
                <span className="fcs-pain-index" aria-hidden="true">
                  02
                </span>
                <div className="fcs-pain-copy">
                  <h3>73% retrieval at launch</h3>
                  <p>After a few tweaks, screens were on-brand and cheaper in tokens.</p>
                  <p className="fcs-impact">
                    <span>Measured</span>
                    Retrievable enough to ship. Cheap enough to keep using.
                  </p>
                </div>
              </li>
              <li>
                <span className="fcs-pain-index" aria-hidden="true">
                  03
                </span>
                <div className="fcs-pain-copy">
                  <h3>The agent-ready design system framework</h3>
                  <p>Same problem, on their system, without the studio internals.</p>
                  <p className="fcs-impact">
                    <span>Method</span>
                    A way to do the work on someone else&apos;s system.
                  </p>
                </div>
              </li>
              <li>
                <span className="fcs-pain-index" aria-hidden="true">
                  04
                </span>
                <div className="fcs-pain-copy">
                  <h3>Workshops with working designers</h3>
                  <p>Salesforce was in the room. So were other product orgs.</p>
                  <p className="fcs-impact">
                    <span>In the room</span>
                    The work left the catalog and went into other teams.
                  </p>
                </div>
              </li>
            </ul>

            <section className="fcs-block fcs-close" aria-labelledby="fcs-research">
              <h2 id="fcs-research">What the research showed</h2>
              <p className="fcs-problem-lead">
                I spent months in the files asking one question. Can a coding
                agent retrieve a real design system instead of inventing UI.
              </p>
              <p>
                Human-first systems were not enough. Figma, a few docs, Slack.
                The work was how tokens were named, how states were documented,
                and how an agent actually asked for a button. I was looking for
                a method I could measure. Not a prettier theme.
              </p>
              <p>
                Florence was the proof. It launched at 73% retrieval. After a
                few manual tweaks, agents shipped on-brand screens. Token cost
                came down because the system said it once. That method left the
                catalog — workshops, other teams, their tokens and components.
              </p>
              <p>The catalog is live. Go use it.</p>
            </section>

            <div className="fcs-actions">
              <a className="button fcs-cta" href="/florence">
                Visit Florence
              </a>
              <a className="fcs-ghost" href="/florence/system">
                Open the system
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <CaseStudyFooter />
    </div>
  );
}
