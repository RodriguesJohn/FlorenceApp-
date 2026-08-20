import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import { caseStudies } from "./caseStudiesData.js";
import caseStudiesHero from "../assets/work-reel.mp4";
import chaseLogo from "../assets/companies/Chase.png";
import tocaLogo from "../assets/companies/TocaWhite.png";
import outfitLogo from "../assets/companies/OutFitLogo.svg";
import pamLogo from "../assets/companies/PAMLogo.png";
import "./case-studies.css";

const heroCompanies = [
  { name: "PureFi", kind: "wordmark" },
  { name: "Notable", kind: "wordmark" },
  { name: "JPMorgan Chase", kind: "image", icon: chaseLogo },
  { name: "TOCA Football", kind: "image", icon: tocaLogo },
  { name: "Please Assist Me", kind: "image", icon: pamLogo, mark: true },
  { name: "No Scroll", kind: "wordmark" },
  { name: "Outfit AI", kind: "image", icon: outfitLogo, mark: true }
];

const bookingLink = "john-rodrigues-rqt2lg/15min";
const bookingNamespace = "15min";
const bookingUrl = `https://cal.com/${bookingLink}`;
const bookingConfig = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true"
};
const bookingAttributes = {
  "data-cal-link": bookingLink,
  "data-cal-namespace": bookingNamespace,
  "data-cal-config": JSON.stringify(bookingConfig)
};

function openBookingModal(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const calApi = window.Cal?.ns?.[bookingNamespace] || window.Cal;
  if (!calApi) return;

  event.preventDefault();
  calApi("modal", {
    calLink: bookingLink,
    config: bookingConfig
  });
}

function CaseStudyMedia({ study, className = "", priority = false }) {
  const mediaClass = `cs-media${study.fit === "contain" ? " cs-media--contain" : ""}${study.containTone === "light" ? " cs-media--contain-light" : ""}${study.mediaShift === "down" ? " cs-media--shift-down" : ""}${className ? ` ${className}` : ""}`;
  const containerRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const mediaStyle = {
    objectPosition: study.position,
    transform: study.mediaScale ? `scale(${study.mediaScale})` : undefined
  };

  React.useEffect(() => {
    if (!study.video) return undefined;

    if (priority) {
      const idle =
        typeof window !== "undefined" && "requestIdleCallback" in window
          ? window.requestIdleCallback(() => setShouldLoad(true), { timeout: 900 })
          : null;
      const timer = window.setTimeout(() => setShouldLoad(true), 120);
      return () => {
        window.clearTimeout(timer);
        if (idle != null && "cancelIdleCallback" in window) {
          window.cancelIdleCallback(idle);
        }
      };
    }

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, study.video]);

  React.useEffect(() => {
    if (!shouldLoad) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    const play = () => {
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => video.removeEventListener("loadeddata", play);
  }, [shouldLoad, study.video]);

  if (!study.video) {
    return (
      <div className={mediaClass}>
        <img src={study.image} alt="" style={mediaStyle} loading={priority ? "eager" : "lazy"} />
      </div>
    );
  }

  return (
    <div className={mediaClass} ref={containerRef}>
      {study.image ? (
        <img
          className="cs-media-poster"
          src={study.image}
          alt=""
          style={mediaStyle}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      ) : null}
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="cs-media-video"
          src={study.video}
          poster={study.image}
          muted
          loop
          playsInline
          autoPlay
          preload={priority ? "metadata" : "none"}
          style={mediaStyle}
        />
      ) : null}
    </div>
  );
}

export default function CaseStudiesPage() {
  const shouldReduceMotion = useReducedMotion();
  const featured = {
    ...caseStudies[0],
    video: caseStudiesHero,
    fit: "cover",
    position: "center"
  };

  React.useEffect(() => {
    document.title = "Case Studies | Human AI Studio";
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.background;
    const prevBody = body.style.background;
    html.style.background = "#050506";
    body.style.background = "#050506";

    return () => {
      html.style.background = prevHtml;
      body.style.background = prevBody;
    };
  }, []);

  return (
    <div className="cs-page">
      <SiteHeader />

      <main>
        <section className="cs-hero" aria-labelledby="cs-hero-title">
          <Entrance className="cs-hero-copy" animate="visible">
            <EntranceItem as="h1" id="cs-hero-title">
              All Work
            </EntranceItem>
            <EntranceItem as="p" className="cs-hero-sub">
              AI systems, agentic products, and design systems for startups and enterprise teams.
            </EntranceItem>
            <EntranceItem className="cs-hero-logos" aria-label="Companies worked with">
              <div className="cs-hero-logos-row">
                {heroCompanies.map((company) =>
                  company.kind === "image" ? (
                    <img
                      key={company.name}
                      className={company.mark ? "cs-hero-logo-mark" : undefined}
                      src={company.icon}
                      alt={company.name}
                    />
                  ) : (
                    <span key={company.name} className="cs-hero-wordmark">
                      {company.name}
                    </span>
                  )
                )}
              </div>
            </EntranceItem>
            <EntranceItem className="cs-hero-card">
              <CaseStudyMedia study={featured} className="cs-hero-media" priority />
            </EntranceItem>
          </Entrance>
        </section>

        <section className="cs-list" id="cs-work" aria-label="Case studies">
          {caseStudies.map((study) => (
            <Entrance key={study.slug} className="cs-study" id={study.slug}>
              <EntranceItem className="cs-study-media-wrap">
                <CaseStudyMedia study={study} />
              </EntranceItem>
              <EntranceItem className="cs-study-copy">
                <h2>{study.title}</h2>
                <dl className="cs-study-brief">
                  <div className="cs-study-block">
                    <dt>Overview</dt>
                    <dd>{study.overview}</dd>
                  </div>
                  <div className="cs-study-block">
                    <dt>Outcome</dt>
                    <dd>{study.outcome}</dd>
                  </div>
                </dl>
                <div className="cs-study-cta-row">
                  {study.offerUrl ? (
                    <a className="cs-cta cs-cta--compact" href={study.offerUrl}>
                      {study.ctaLabel || "Learn more"}
                    </a>
                  ) : study.appUrl ? (
                    <a
                      className="cs-cta cs-cta--compact"
                      href={study.appUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View project
                    </a>
                  ) : (
                    <a className="cs-cta cs-cta--compact" href={`#${study.slug}`}>
                      Read the case study
                    </a>
                  )}
                </div>
              </EntranceItem>
            </Entrance>
          ))}
        </section>

        <section className="cs-closing" aria-labelledby="cs-closing-title">
          <Entrance className="cs-closing-inner">
            <EntranceItem as="h2" id="cs-closing-title">
              Want to build the next one together?
            </EntranceItem>
            <EntranceItem as="p">
              Product design, design engineering, and AI growth systems for teams shipping category-defining products.
            </EntranceItem>
            <EntranceItem>
              <a
                className="cs-cta cs-cta--solid"
                href={bookingUrl}
                {...bookingAttributes}
                onClick={openBookingModal}
              >
                Book 15 min call
              </a>
            </EntranceItem>
          </Entrance>
        </section>
      </main>

      <footer className="cs-footer">
        <a className="cs-brand" href="/">
          <span className="cs-brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="cs-footer-links">
          <a href="/">Studio</a>
          <a href="/academy">Academy</a>
          <a href={bookingUrl} {...bookingAttributes} onClick={openBookingModal}>
            Book a call
          </a>
        </div>
      </footer>
    </div>
  );
}
