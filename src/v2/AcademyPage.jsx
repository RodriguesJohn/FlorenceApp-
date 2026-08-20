import React from "react";
import OfferingShader from "./OfferingShader.jsx";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { NavMenu } from "./NavMenu.jsx";
import "./academy.css";

const ACADEMY_URL = "https://www.skool.com/ai-design-academy-6114/about";
const NEWSLETTER_URL = "https://johnrodrigues.substack.com/";
const NEWSLETTER_EMBED_URL = `${NEWSLETTER_URL}embed`;

const AppleLogo = "/academy/Apple.png";
const GoogleLogo = "/academy/Google.svg.png";
const ChaseLogo = "/academy/Chase.png";
const HubspotLogo = "/academy/Hubspot.svg.png";
const IntercomLogo = "/academy/intercom-1-logo-png-transparent.png";
const CursorBlogImage = "/academy/CursorBlog.png";
const ClaudeCodeBlog = "/academy/ClaudeCodeBlog.png";
const NativeMobileImage = "/academy/NativeMobile.jpg";

const ACADEMY_HERO_VIDEO = "/academy/hero.mp4?v=hero-cd598d71";
const ACADEMY_HERO_VIDEO_MOBILE = "/academy/hero-mobile.mp4?v=hero-cd598d71";

function AcademyHeroVideo() {
  const videoRef = React.useRef(null);

  const setVideoRef = React.useCallback((node) => {
    videoRef.current = node;
    if (!node) return;

    // iOS Safari / Chrome Android only autoplay when muted + inline are set as DOM attrs.
    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    node.autoplay = true;
    node.controls = false;
    node.setAttribute("autoplay", "");
    node.setAttribute("muted", "");
    node.setAttribute("playsinline", "");
    node.setAttribute("webkit-playsinline", "true");
    node.setAttribute("x5-playsinline", "true");
    node.setAttribute("x5-video-player-type", "h5");
    node.removeAttribute("controls");
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.pause();
      video.removeAttribute("data-ready");
      return undefined;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");

    const markReady = () => {
      video.setAttribute("data-ready", "true");
    };

    const tryPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.controls = false;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(markReady).catch(() => {});
      }
    };

    // Load the selected <source> then attempt playback.
    video.load();
    tryPlay();

    const playEvents = [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
      "playing"
    ];
    playEvents.forEach((eventName) => video.addEventListener(eventName, tryPlay));
    video.addEventListener("playing", markReady);

    const onVisible = () => {
      if (!document.hidden) tryPlay();
    };
    const onFirstGesture = () => tryPlay();

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onVisible);
    window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
    window.addEventListener("pointerdown", onFirstGesture, { once: true });

    return () => {
      playEvents.forEach((eventName) => video.removeEventListener(eventName, tryPlay));
      video.removeEventListener("playing", markReady);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onVisible);
      window.removeEventListener("touchstart", onFirstGesture);
      window.removeEventListener("pointerdown", onFirstGesture);
    };
  }, []);

  return (
    <div className="academy-hero-media" aria-hidden="true">
      <video
        ref={setVideoRef}
        className="academy-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        onLoadedMetadata={(event) => {
          const node = event.currentTarget;
          node.muted = true;
          node.defaultMuted = true;
          node.play().catch(() => {});
        }}
        onCanPlay={(event) => {
          const node = event.currentTarget;
          node.muted = true;
          node
            .play()
            .then(() => node.setAttribute("data-ready", "true"))
            .catch(() => {});
        }}
      >
        <source src={ACADEMY_HERO_VIDEO_MOBILE} media="(max-width: 768px)" type="video/mp4" />
        <source src={ACADEMY_HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="academy-hero-video-gradient" />
      <div className="academy-hero-video-vignette" />
    </div>
  );
}

const logos = [
  { src: AppleLogo, alt: "Apple" },
  { src: GoogleLogo, alt: "Google" },
  { src: ChaseLogo, alt: "JPMorgan Chase" },
  { src: HubspotLogo, alt: "HubSpot" },
  { src: IntercomLogo, alt: "Intercom" }
];

const pricingBenefits = [
  "Claude Code, Cursor, and Codex tracks",
  "Latest AI research, news, and trends",
  "Recordings, prompts, and templates",
  "Skool community access",
  "Monthly 30-minute group calls"
];

const pathOptions = [
  {
    title: "Stay ahead of the shift",
    description: "Build practical AI fluency through real product work.",
    bullets: [
      "Claude Code, Cursor, and Codex",
      "Real product projects",
      "Prompts, templates, and recordings"
    ],
    color1: "#38bdf8",
    color2: "#e0f2fe"
  },
  {
    title: "Learn and grow together",
    description: "Learn alongside AI-native designers and builders.",
    bullets: [
      "Get unstuck with feedback",
      "Stay accountable",
      "See what others are shipping"
    ],
    color1: "#3b82f6",
    color2: "#bae6fd"
  },
  {
    title: "Monthly live sessions",
    description: "Join John monthly to unblock your work and keep shipping.",
    bullets: [
      "Live Q&A and walkthroughs",
      "Apply it to real workflows",
      "Replay anytime"
    ],
    color1: "#8b5cf6",
    color2: "#ddd6fe"
  }
];

const cohortModules = [
  {
    title: "AI fluency",
    description: "AI habits that show up in real product work.",
    color1: "#3b82f6",
    color2: "#bae6fd"
  },
  {
    title: "Tools that ship",
    description: "Ship full stack apps.",
    color1: "#8b5cf6",
    color2: "#ddd6fe"
  },
  {
    title: "Agents & systems",
    description: "Agents and systems you can ship and keep iterating on.",
    color1: "#10b981",
    color2: "#a7f3d0"
  }
];

const courses = [
  {
    id: 6,
    title: "Claude Code",
    excerpt: "Ship products and tighten your workflow with Claude Code.",
    category: "Track",
    image: ClaudeCodeBlog
  },
  {
    id: 7,
    title: "Cursor",
    excerpt: "Composer, Agent Mode, and parallel workflows that move faster.",
    category: "Track",
    image: CursorBlogImage
  },
  {
    id: 8,
    title: "Codex",
    excerpt: "Plan, build, and ship native iOS apps with Codex.",
    category: "Track",
    image: NativeMobileImage
  }
];

const bonusResources = [
  { title: "AI Strategy Track" },
  { title: "AI Agents Track" },
  { title: "Project Demos" },
  { title: "Design Engineering Track" },
  { title: "Complete Figma Course" },
  { title: "Tools & Credits" },
  { title: "Productivity Workflows" },
  { title: "AI Foundation Track" }
];

function BonusCardStack() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % bonusResources.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="academy-bonus-stack" aria-live="polite">
      {bonusResources.map((resource, index) => {
        const offset =
          (index - activeIndex + bonusResources.length) % bonusResources.length;
        if (offset > 3) return null;

        return (
          <article
            className="academy-bonus-card academy-bonus-card--stack"
            key={resource.title}
            data-offset={offset}
            style={{
              zIndex: bonusResources.length - offset,
              "--stack-offset": offset
            }}
            aria-hidden={offset !== 0}
          >
            <div className="academy-bonus-face">
              <h3>{resource.title}</h3>
            </div>
          </article>
        );
      })}
    </div>
  );
}

const testimonials = [
  {
    quote:
      "I'm leaving this course feeling truly confident in my AI fluency. I'm now ready to build a new portfolio quickly and effectively.",
    name: "Dana",
    role: "Lead Product Designer, ex Rite Aid",
    img: "/academy/Dana.jpeg"
  },
  {
    quote:
      "I've gone from not knowing how to code to building my own AI agent. Every session has been engaging, interactive, and deeply impactful.",
    name: "IniOluwa",
    role: "Senior Product Designer, Intercom",
    logo: IntercomLogo,
    img: "/academy/Indi.jpeg"
  },
  {
    quote:
      "John equipped me with understanding the AI possibility space to take my initial ideas and turn them into working POCs.",
    name: "Brett",
    role: "Product Designer",
    img: "/academy/Brett.jpeg"
  },
  {
    quote:
      "John emphasizes practical application over lectures, which made the material immediately useful.",
    name: "Sonali",
    role: "Sr. Product Designer, JPMorgan Chase",
    logo: ChaseLogo,
    img: "/academy/Sonali.jpeg"
  },
  {
    quote:
      "His strategic frameworks and live sessions helped me think like both a strategist and a solutionist.",
    name: "Sneh",
    role: "UX Designer",
    img: "/academy/Sneh.webp"
  },
  {
    quote:
      "This cohort gave me the foundation to understand AI at a high level, and how to design human-centered AI experiences.",
    name: "Kenneth Hargrove",
    role: "Product Designer, CoStar",
    img: "/academy/Kenny.jpeg"
  },
  {
    quote:
      "John's course is practical, with demos and real encouragement to explore AI tools specifically for designers.",
    name: "Linda",
    role: "Principal PD, JPMorgan Chase",
    logo: ChaseLogo,
    img: "/academy/Linda.jpeg"
  },
  {
    quote:
      "Always accessible. He creates additional tutorials on demand and is ready to help with patience and care.",
    name: "Aviad",
    role: "Product Designer",
    img: "/academy/Avaid.jpeg"
  },
  {
    quote:
      "Crash course in AI tools: Relume, Lovable, Figma Make, n8n, and more. John was extremely knowledgeable.",
    name: "Dan",
    role: "UX Designer, RTI International",
    img: "/academy/Dan.jpeg"
  }
];

const featuredOrder = (() => {
  const lead = testimonials.findIndex((item) => item.name === "IniOluwa");
  if (lead <= 0) return testimonials;
  return [...testimonials.slice(lead), ...testimonials.slice(0, lead)];
})();

/* Cycles the quote so the card never sits static next to the pricing cards. */
function PackageTestimonial() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % featuredOrder.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const testimonial = featuredOrder[index];

  return (
    <div className="academy-package-body">
      <p className="academy-package-eyebrow">What builders say</p>
      <div className="academy-package-quote-slot" key={testimonial.name}>
        <blockquote className="academy-package-quote">{testimonial.quote}</blockquote>
        <div className="academy-package-quote-person">
          <img src={testimonial.img} alt="" loading="lazy" />
          <span>
            <strong>{testimonial.name}</strong>
            <small>{testimonial.role}</small>
          </span>
        </div>
      </div>
      <div className="academy-package-proof">
        <div className="academy-package-avatars" aria-hidden="true">
          {featuredOrder.slice(0, 5).map((item, itemIndex) => (
            <img
              key={item.name}
              src={item.img}
              alt=""
              loading="lazy"
              data-active={itemIndex === index ? "true" : undefined}
            />
          ))}
        </div>
        <p>4.6/5 rating on Maven</p>
      </div>
    </div>
  );
}

function TestimonialScroller() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <div className="academy-marquee">
      <div className="academy-marquee-fade academy-marquee-fade--left" />
      <div className="academy-marquee-fade academy-marquee-fade--right" />
      <div className="academy-marquee-track academy-marquee-track--testimonials">
        {marqueeItems.map((testimonial, index) => (
          <figure
            className="academy-testimonial"
            key={`${testimonial.name}-${index}`}
          >
            <blockquote>“{testimonial.quote}”</blockquote>
            <figcaption>
              <div className="academy-testimonial-person">
                <img
                  className="academy-testimonial-avatar"
                  src={testimonial.img}
                  alt=""
                />
                <span>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.role}</small>
                </span>
              </div>
              {testimonial.logo ? (
                <img className="academy-testimonial-logo" src={testimonial.logo} alt="" />
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function AcademyPage() {
  const [isNewsletterOpen, setIsNewsletterOpen] = React.useState(false);
  const newsletterTriggerRef = React.useRef(null);
  const newsletterCloseRef = React.useRef(null);

  React.useEffect(() => {
    document.title = "AI Academy | Human AI Studio";
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

  React.useEffect(() => {
    if (!isNewsletterOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    newsletterCloseRef.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsNewsletterOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      newsletterTriggerRef.current?.focus();
    };
  }, [isNewsletterOpen]);

  return (
    <div className="academy-page">
      <header className="academy-nav">
        <a className="academy-brand" href="/">
          <span className="academy-brand-mark" aria-hidden="true" />
          <span className="academy-brand-text">AI Academy</span>
        </a>
        <div className="academy-nav-actions">
          <NavMenu />
        </div>
      </header>

      <main>
        <section className="academy-hero-wrap academy-hero-wrap--cinematic academy-hero-wrap--editorial">
          <AcademyHeroVideo />
          <div className="academy-hero">
            <Entrance className="academy-hero-copy" animate="visible">
              <EntranceItem as="h1">
                <span className="academy-hero-line">Learn How to Build Products,</span>
                <span className="academy-hero-line">Design Systems, and AI Agents.</span>
              </EntranceItem>
              <EntranceItem className="academy-hero-actions">
                <a
                  className="academy-btn academy-btn--primary"
                  href={ACADEMY_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Join AI Academy
                  <span className="academy-btn-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <button
                  ref={newsletterTriggerRef}
                  type="button"
                  className="academy-btn academy-btn--ghost"
                  onClick={() => setIsNewsletterOpen(true)}
                  aria-haspopup="dialog"
                >
                  Join 4,200 readers
                </button>
              </EntranceItem>
            </Entrance>

            <Entrance
              className="academy-hero-proof"
              aria-label="Professionals from leading companies"
              animate="visible"
            >
              <EntranceItem className="academy-hero-proof-rating">
                <span
                  className="academy-hero-stars"
                  aria-label="4.5 out of 5 stars"
                >
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="academy-hero-star academy-hero-star--half">★</span>
                </span>
                <span>4.6/5 rating on Maven</span>
              </EntranceItem>
              <EntranceItem className="academy-logo-row academy-logo-row--inline">
                {logos.map((logo) => (
                  <img key={logo.alt} src={logo.src} alt={logo.alt} />
                ))}
              </EntranceItem>
            </Entrance>
          </div>

          <a className="academy-hero-scroll" href="#membership" aria-label="Scroll to enrollment">
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="academy-section">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2">Why builders join.</EntranceItem>
          </Entrance>
          <Entrance className="academy-path-grid">
            {pathOptions.map((path, index) => (
              <EntranceItem
                as="article"
                className="academy-path-card"
                key={path.title}
                style={{
                  "--card-color-1": path.color1,
                  "--card-color-2": path.color2
                }}
              >
                <div className="academy-path-thumb">
                  <OfferingShader
                    color1={path.color1}
                    color2={path.color2}
                    seed={index * 4.2 + 0.8}
                    className="academy-path-shader"
                  />
                  <h3 className="academy-path-thumb-title">{path.title}</h3>
                </div>
                <div className="academy-path-body">
                  <p>{path.description}</p>
                  <ul>
                    {path.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </EntranceItem>
            ))}
          </Entrance>
        </section>

        <section className="academy-section">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2">Tools you’ll actually use.</EntranceItem>
          </Entrance>
          <Entrance className="academy-course-grid">
            {courses.map((course) => (
              <EntranceItem as="article" className="academy-course" key={course.id}>
                <div className="academy-course-media">
                  <img src={course.image} alt="" />
                </div>
                <div className="academy-course-body">
                  <h3>{course.title}</h3>
                  <p>{course.excerpt}</p>
                </div>
              </EntranceItem>
            ))}
          </Entrance>
        </section>

        <section className="academy-section">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2">Professionals already shipping.</EntranceItem>
          </Entrance>
          <Entrance>
            <EntranceItem>
              <TestimonialScroller />
            </EntranceItem>
          </Entrance>
        </section>

        <section className="academy-section academy-section--bonus">
          <Entrance className="academy-bonus-split">
            <EntranceItem className="academy-bonus-copy">
              <h2>
                <span>More resources and courses</span>
                <span>to level up your skills.</span>
              </h2>
            </EntranceItem>
            <EntranceItem>
              <BonusCardStack />
            </EntranceItem>
          </Entrance>
        </section>

        <section className="academy-section academy-section--tight" id="membership">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2">Choose how you want to learn.</EntranceItem>
          </Entrance>
          <Entrance className="academy-packages">
            <EntranceItem
              as="article"
              className="academy-package academy-package--testimonials"
              style={{
                "--card-color-1": "#64748b",
                "--card-color-2": "#e2e8f0"
              }}
            >
              <PackageTestimonial />
            </EntranceItem>
            <EntranceItem
              as="article"
              className="academy-package"
              style={{
                "--card-color-1": "#10b981",
                "--card-color-2": "#a7f3d0"
              }}
            >
              <div className="academy-package-thumb">
                <OfferingShader
                  color1="#10b981"
                  color2="#a7f3d0"
                  seed={2.4}
                  className="academy-package-shader"
                />
                <div className="academy-package-thumb-copy">
                  <div className="academy-price academy-price--thumb">
                    <span>$149</span>
                    <small>/ per month</small>
                  </div>
                </div>
              </div>
              <div className="academy-package-body">
                <ul className="academy-check-list">
                  {pricingBenefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <a
                  className="academy-btn academy-btn--primary academy-btn--full"
                  href={ACADEMY_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Join the Academy
                </a>
              </div>
            </EntranceItem>
          </Entrance>
        </section>

        <section className="academy-section" id="cohort">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2">What you get</EntranceItem>
          </Entrance>
          <Entrance className="academy-modules">
            {cohortModules.map((module, index) => (
              <EntranceItem
                as="article"
                className="academy-module-card"
                key={module.title}
                style={{
                  "--card-color-1": module.color1,
                  "--card-color-2": module.color2
                }}
              >
                <div className="academy-module-thumb">
                  <OfferingShader
                    color1={module.color1}
                    color2={module.color2}
                    seed={index * 3.7 + 1.3}
                    className="academy-module-shader"
                  />
                  <span className="academy-module-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="academy-module-thumb-title">{module.title}</h3>
                </div>
                <div className="academy-module-copy">
                  <p>{module.description}</p>
                </div>
              </EntranceItem>
            ))}
          </Entrance>
        </section>

      </main>

      <footer className="academy-footer" aria-label="Human AI Studio footer">
        <div className="academy-footer-inner">
          <div className="academy-footer-brand">
            <a className="academy-footer-brand-link" href="/" aria-label="Human AI Studio home">
              <span className="academy-brand-mark" aria-hidden="true" />
              Human AI Studio
            </a>
            <p>
              AI Academy for industry professionals shipping with AI through live workshops and self-paced tracks.
            </p>
          </div>
          <div className="academy-footer-column">
            <p>Explore</p>
            <a href="/">Studio</a>
            <a href={ACADEMY_URL} target="_blank" rel="noreferrer">
              Academy
            </a>
          </div>
          <div className="academy-footer-column">
            <p>Contact</p>
            <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
          </div>
        </div>
        <div className="academy-footer-wordmark" aria-hidden="true">Human AI Studio</div>
      </footer>

      {isNewsletterOpen ? (
        <div
          className="academy-newsletter-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsNewsletterOpen(false);
            }
          }}
        >
          <section
            className="academy-newsletter-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="academy-newsletter-title"
          >
            <div className="academy-newsletter-header">
              <div>
                <h2 id="academy-newsletter-title">Join 4,200+ readers</h2>
                <p>AI product thinking, practical workflows, and original research.</p>
              </div>
              <button
                ref={newsletterCloseRef}
                type="button"
                className="academy-newsletter-close"
                aria-label="Close newsletter signup"
                onClick={() => setIsNewsletterOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <iframe
              className="academy-newsletter-frame"
              src={NEWSLETTER_EMBED_URL}
              title="Human AI Studio newsletter signup"
            />
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default AcademyPage;
