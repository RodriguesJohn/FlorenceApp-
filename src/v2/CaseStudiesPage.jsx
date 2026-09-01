import React from "react";
import { Entrance, EntranceItem, entranceViewport } from "./entrance.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import florenceStill from "../assets/work/Florence.png";
import "./case-studies.css";

const BOOKING_URL = "https://cal.com/john-rodrigues-rqt2lg/15min";
const NEWSLETTER_URL = "https://substack.com/@johnrodrigues";

const publishedCaseStudies = [
  {
    slug: "florence",
    href: "/case-studies/florence",
    title: "Florence",
    label: "AI-ready design system",
    summary:
      "73% retrieval at launch. On-brand UI after a few tweaks. Lower token cost, shipped in any coding agent.",
    image: florenceStill,
  },
];

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

export default function CaseStudiesPage() {
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
    <div className="cs-page current-home">
      <SiteHeader />
      <main className="cs-index" id="main-content">
        <header className="cs-index-hero">
          <p className="cs-index-kicker">Work</p>
          <h1>Case studies</h1>
          <p className="cs-index-lede">
            Products and systems I shipped. Florence is first.
          </p>
        </header>

        <ul className="cs-grid">
          {publishedCaseStudies.map((study) => (
            <li key={study.slug}>
              <a className="cs-card" href={study.href}>
                <span className="cs-card-media">
                  <img src={study.image} alt="" />
                </span>
                <span className="cs-card-copy">
                  <span className="cs-card-label">{study.label}</span>
                  <span className="cs-card-title">{study.title}</span>
                  <span className="cs-card-summary">{study.summary}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <CaseStudyFooter />
    </div>
  );
}
