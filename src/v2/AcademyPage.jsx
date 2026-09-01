import React from "react";
import OfferingShader from "./OfferingShader.jsx";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { NavMenu } from "./NavMenu.jsx";
import AcademyWorkspacePreview from "./AcademyWorkspacePreview.jsx";
import { AcademyAnimatedTestimonials } from "./AcademyAnimatedTestimonials.jsx";
import "./academy.css";

const ACADEMY_URL = "https://www.skool.com/ai-design-academy-6114/about";
const NEWSLETTER_URL = "https://johnrodrigues.substack.com/";
const NEWSLETTER_EMBED_URL = `${NEWSLETTER_URL}embed`;

const AppleLogo = "/academy/Apple.png";
const GoogleLogo = "/academy/Google.svg.png";
const ChaseLogo = "/academy/Chase.png";
const HubspotLogo = "/academy/Hubspot.svg.png";
const IntercomLogo = "/academy/intercom-1-logo-png-transparent.png";
const SalesforceLogo = "/academy/Salesforce.svg";
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
  { src: IntercomLogo, alt: "Intercom" },
  { src: SalesforceLogo, alt: "Salesforce" }
];

const surveyQuotes = [
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

const pricingBenefits = [
  "AI-ready design systems course",
  "Tokens, components, and contracts",
  "Figma workflows and building in Cursor",
  "Community of AI designers",
  "Async chat support"
];

const pathOptions = [
  {
    title: "Access to\nin-depth lessons",
    color1: "#38bdf8",
    color2: "#e0f2fe"
  },
  {
    title: "Slack community\nhelp",
    color1: "#3b82f6",
    color2: "#bae6fd"
  },
  {
    title: "A community of\nAI designers",
    color1: "#8b5cf6",
    color2: "#ddd6fe"
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
        <p>4.5/5 on Maven from courses I’ve run</p>
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

function AcademySoonCta({ className = "" }) {
  return (
    <span className={`academy-btn academy-btn--primary academy-btn--soon ${className}`.trim()} aria-disabled="true">
      Coming soon
    </span>
  );
}

function MembershipPricingCard() {
  const [billing, setBilling] = React.useState("monthly");
  const monthly = billing === "monthly";

  return (
    <article
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
          <div className="academy-price-block">
            <div className="academy-price academy-price--thumb">
              <span>{monthly ? "$149" : "$1,499"}</span>
              <small>{monthly ? "/ per month" : "one-time annual"}</small>
            </div>
            {monthly ? null : (
              <p className="academy-price-save">Save $289 vs $1,788 billed monthly</p>
            )}
          </div>
          <fieldset className="academy-billing">
            <legend className="academy-billing-legend">Billing</legend>
            <label className={`academy-billing-option${monthly ? " is-selected" : ""}`}>
              <input
                type="radio"
                name="academy-billing"
                value="monthly"
                checked={monthly}
                onChange={() => setBilling("monthly")}
              />
              <span>Monthly</span>
            </label>
            <label className={`academy-billing-option${!monthly ? " is-selected" : ""}`}>
              <input
                type="radio"
                name="academy-billing"
                value="annual"
                checked={!monthly}
                onChange={() => setBilling("annual")}
              />
              <span>Annually</span>
              <em>Save $289</em>
            </label>
          </fieldset>
        </div>
      </div>
      <div className="academy-package-body">
        <ul className="academy-check-list">
          {pricingBenefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
        <AcademySoonCta className="academy-btn--full" />
      </div>
    </article>
  );
}

function AcademyLockedApp() {
  return (
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
  );
}

function AcademyPage() {
  const [isNewsletterOpen, setIsNewsletterOpen] = React.useState(false);
  const newsletterTriggerRef = React.useRef(null);
  const newsletterCloseRef = React.useRef(null);

  React.useEffect(() => {
    document.title = "AI Design Systems Training | Human AI Studio";
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
        <a className="brand" href="/" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="academy-brand-text">
            Human AI Studio
            <span className="academy-nav-product">Training</span>
          </span>
        </a>
        <div className="academy-nav-actions">
          <NavMenu />
        </div>
      </header>

      <main>
        <section className="academy-hero-wrap academy-hero-wrap--product" aria-labelledby="academy-hero-title">
          <div className="academy-hero-rays" aria-hidden="true" />
          <div className="academy-hero-glow" aria-hidden="true" />
          <div className="academy-hero">
            <Entrance className="academy-hero-copy" animate="visible">
              <EntranceItem as="h1" id="academy-hero-title">
                AI Design Systems Training
              </EntranceItem>
              <EntranceItem as="p" className="academy-hero-sub">
                Self-paced training for designers and design system teams. Level up how you build systems with Cursor, Claude Code, and agentic workflows. The modern stack that makes design systems AI-ready.
              </EntranceItem>
              <EntranceItem className="academy-hero-actions">
                <div className="academy-hero-cta-ring">
                  <AcademySoonCta />
                </div>
                <button
                  ref={newsletterTriggerRef}
                  type="button"
                  className="academy-btn academy-btn--ghost academy-hero-cta-ghost"
                  onClick={() => setIsNewsletterOpen(true)}
                  aria-haspopup="dialog"
                >
                  Join 4,200 readers
                </button>
              </EntranceItem>
            </Entrance>
          </div>

          <Entrance className="academy-hero-shot" animate="visible">
            <EntranceItem>
              <div className="academy-hero-shot-glow" aria-hidden="true" />
              <div className="academy-hero-shot-stage">
                <div className="academy-hero-shot-frame">
                  <AcademyLockedApp />
                </div>
              </div>
            </EntranceItem>
          </Entrance>

          <AcademyAnimatedTestimonials
            title="What practitioners say."
            subtitle="From industry designers already shipping. Their reviews. Their ratings."
            badgeText="Popular courses on Maven"
            testimonials={surveyQuotes}
            logos={logos}
          />
        </section>

        <section className="academy-section">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2">Who it's for.</EntranceItem>
          </Entrance>
          <Entrance className="academy-path-grid">
            {pathOptions.map((path, index) => (
              <EntranceItem
                as="article"
                className="academy-path-card"
                key={path.title.replaceAll("\n", " ")}
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
              </EntranceItem>
            ))}
          </Entrance>
        </section>

        <section className="academy-section">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2">Bonus resources and courses.</EntranceItem>
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
            <EntranceItem>
              <MembershipPricingCard />
            </EntranceItem>
          </Entrance>
        </section>

        <section className="academy-section">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2">Trusted by industry professionals.</EntranceItem>
          </Entrance>
          <Entrance>
            <EntranceItem>
              <TestimonialScroller />
            </EntranceItem>
          </Entrance>
        </section>

      </main>

      <footer className="academy-footer" aria-label="Human AI Studio footer">
        <div className="academy-footer-inner">
          <div className="academy-footer-brand">
            <a className="brand" href="/" aria-label="Human AI Studio home">
              <span className="brand-mark" aria-hidden="true" />
              Human AI Studio
            </a>
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
            <address className="academy-footer-address">
              Human AI Studio<br />
              455 Market St Ste 1940<br />
              PMB 769150<br />
              San Francisco, California 94105-2448 US
            </address>
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
