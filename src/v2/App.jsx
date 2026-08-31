import React from "react";
import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion, useReducedMotion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import * as THREE from "three";
import OfferingShader from "./OfferingShader.jsx";
import * as PricingCard from "./PricingCard.jsx";
import { Entrance, EntranceItem, entranceChild, entranceViewport } from "./entrance.jsx";
import { NavMenu } from "./NavMenu.jsx";
import { WorkshopCountdown } from "./WorkshopCountdown.jsx";
import profilePicture from "../assets/Profile Picture.jpg";
import studioAbstract from "../assets/studio-abstract.png";
import caseStudiesHeroVideo from "../assets/case-studies-hero.mp4";
import workReelVideo from "../assets/work-reel.mp4";
import heroButterflyVideo from "../assets/hero-cinematic-mobile.mp4";
import rbAiPoster from "../assets/work/rb-ai-poster.jpg";
import pureFiPoster from "../assets/work/purefi-poster.jpg";
import orbiPoster from "../assets/work/orbi-poster.jpg";
import evaAiVideo from "../assets/EvaAIV2.mov";
import pureFiVideo from "../assets/PureFi.MOV";
import productContextVideo from "../assets/ultramock-product-context.mp4";
import outfixWorkVideo from "../assets/work/OutfixV2.mp4";
import outfixWorkPoster from "../assets/work/outfixHero.png";
import florenceWorkImage from "../assets/work/Florence.png";
import ollieWorkVideo from "../assets/work/OllieAIDemo.mp4";
import ollieWorkPoster from "../assets/work/OllieAIV1.png";
import balanceTransferWorkVideo from "../assets/work/BT.mp4";
import balanceTransferWorkPoster from "../assets/work/BT1.png";
import noScrollWorkImage from "../assets/work/NoScrollApp.png";
import dcbWorkImage from "../assets/work/DCB.png";
import ultraMockWorkVideo from "../assets/work/UltraMock.mp4";
import ultraMockWorkPoster from "../assets/work/UltraMock.png";
import aiAcademyWorkVideo from "../assets/work/AIAcademy.mp4";
import aiAcademyWorkPoster from "../assets/work/AIAcademy.png";
import aiInsightsWorkVideo from "../assets/work/AIInsightsApp.mp4";
import aiInsightsWorkPoster from "../assets/work/AIInsightsPoster.webp";
import codexLogo from "../assets/logos/claude-code.png";
import vercelLogo from "../assets/logos/codex.png";
import cursorLogo from "../assets/logos/cursor.webp";
import linearLogo from "../assets/logos/linear.jpeg";
import nextLogo from "../assets/logos/nextjs.png";
import reactLogo from "../assets/logos/react.png";
import swiftUiLogo from "../assets/logos/swiftui.png";
import claudeCodeLogo from "../assets/logos/vercel.png";
import xcodeLogo from "../assets/logos/xcode.png";
import figmaLogo from "../assets/logos/Figma.png";
import wonderLogo from "../assets/logos/Wonder.png";
import hermesLogo from "../assets/logos/Hermes.jpeg";
import openClawLogo from "../assets/logos/OpenClaw.png";
import githubLogo from "../assets/logos/github.svg";
import storybookLogo from "../assets/logos/storybook.png";
import typescriptLogo from "../assets/logos/typescript.webp";
import ProductPage from "./ProductPage.jsx";
import AcademyPage from "./AcademyPage.jsx";
import tocaCompanyLogo from "../assets/companies/Toca.png";
import citiCompanyLogo from "../assets/companies/Citi.svg.png";
import chaseCompanyLogo from "../assets/companies/ChaseLightMOde.png";
import appleCompanyLogo from "../assets/companies/Apple-Logo.png";
import googleCompanyLogo from "../assets/companies/GoogleLogog.png";
import metaCompanyLogo from "../assets/companies/Meta-Emblem.png";
import "./styles.css";

const FlorenceOfferPage = React.lazy(() => import("./FlorenceOfferPage.jsx"));

const bookingLink = "john-rodrigues-rqt2lg/15min";
const bookingNamespace = "15min";
const bookingUrl = `https://cal.com/${bookingLink}`;

function trackAcademyCtaClick(location, label = "Academy") {
  track("Academy CTA Click", {
    location,
    label,
    href: "/academy"
  });
}

function trackWorkshopPageClick(location, label = "Learn more") {
  track("Workshop CTA Click", {
    location,
    label,
    href: "/workshop"
  });
}
const bookingConfig = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true"
};
const bookingAttributes = {
  "data-cal-link": bookingLink,
  "data-cal-namespace": bookingNamespace,
  "data-cal-config": JSON.stringify(bookingConfig)
};

const problemCardEntrance = {
  hidden: {
    opacity: 0,
    y: 44,
    scale: 0.92,
    rotateX: 18,
    filter: "blur(14px) saturate(0.72)"
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px) saturate(1)",
    transition: {
      delay: index * 0.12,
      duration: 0.82,
      ease: [0.16, 1, 0.3, 1]
    }
  })
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

function BookingTextLink({ className, children, onClick, ...rest }) {
  return (
    <a
      className={className}
      href={bookingUrl}
      {...rest}
      {...bookingAttributes}
      onClick={(event) => {
        onClick?.(event);
        openBookingModal(event);
      }}
    >
      {children}
    </a>
  );
}

function StaggeredFade({ text, baseDelay = 0 }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const characters = Array.from(text);

  return (
    <span ref={ref} className="staggered-fade" aria-label={text}>
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden="true"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: 0.6,
            delay: baseDelay + i * 0.07,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

function createWebGLRenderer(options) {
  try {
    return new THREE.WebGLRenderer(options);
  } catch {
    return null;
  }
}

const cinematicHeroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4";

const entranceContainer = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.08,
      opacity: { duration: 0.7 },
      filter: { duration: 0.7 }
    }
  }
};

const newsletterEmbedUrl = "https://johnrodrigues.substack.com/embed";

function NewsletterModal({ open, onClose }) {
  React.useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="booking-modal newsletter-modal is-open"
      role="dialog"
      aria-modal="true"
      aria-label="Subscribe to the newsletter"
    >
      <button
        type="button"
        className="booking-modal-backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="booking-modal-panel">
        <div className="booking-modal-header">
          <div>
            <p>Human AI Studio Newsletter</p>
            <span>Business case studies, AI insights, and industry trends.</span>
          </div>
          <button
            type="button"
            className="booking-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <iframe
          src={newsletterEmbedUrl}
          title="Subscribe to the Human AI Studio newsletter"
          frameBorder="0"
          scrolling="no"
        />
      </div>
    </div>
  );
}

function HomeWorkHighlightVideo() {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;

    v.muted = true;
    v.defaultMuted = true;

    const tryPlay = () => {
      v.muted = true;
      const play = v.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    };

    tryPlay();
    const events = ["loadedmetadata", "loadeddata", "canplay", "canplaythrough"];
    events.forEach((event) => v.addEventListener(event, tryPlay));
    return () => {
      events.forEach((event) => v.removeEventListener(event, tryPlay));
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="home-florence-video"
      src="/florence/F2.mp4"
      autoPlay
      muted
      defaultMuted
      loop
      playsInline
      webkit-playsinline="true"
      preload="auto"
      controls={false}
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
      aria-label="Florence demo reel"
    />
  );
}

function CinematicHero() {
  const [newsletterOpen, setNewsletterOpen] = React.useState(false);
  const videoRef = React.useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const setHeroVideoRef = React.useCallback((node) => {
    videoRef.current = node;
    if (!node) return;

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
    const v = videoRef.current;
    if (!v) return undefined;
    // iOS Safari is strict: it only autoplays when the video is muted AND
    // inline as DOM properties/attributes, otherwise it shows a play button.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "true");
    v.setAttribute("x5-playsinline", "true");
    v.setAttribute("x5-video-player-type", "h5");
    v.controls = false;
    v.disablePictureInPicture = true;

    const tryPlay = () => {
      v.muted = true;
      v.defaultMuted = true;
      v.controls = false;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();

    const events = ["loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing"];
    events.forEach((e) => v.addEventListener(e, tryPlay));
    const onVisible = () => {
      if (!document.hidden) tryPlay();
    };
    const onFirstGesture = () => tryPlay();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
    window.addEventListener("pointerdown", onFirstGesture, { once: true });

    return () => {
      events.forEach((e) => v.removeEventListener(e, tryPlay));
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("touchstart", onFirstGesture);
      window.removeEventListener("pointerdown", onFirstGesture);
    };
  }, []);

  return (
    <section
      className="hero-cinematic"
      id="top"
      data-nav-theme="dark"
      aria-label="Human AI Studio"
    >
      <video
        ref={setHeroVideoRef}
        className="hero-cinematic-video"
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget.play().catch(() => {});
        }}
        onCanPlay={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget.play().catch(() => {});
        }}
        aria-hidden="true"
      >
        <source src={heroButterflyVideo} media="(max-width: 640px)" type="video/mp4" />
        <source src={heroButterflyVideo} type="video/mp4" />
      </video>
      <div className="hero-cinematic-scrim" aria-hidden="true" />

      <motion.div
        className="hero-cinematic-content"
        variants={entranceContainer}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
      >
        <div className="hero-cinematic-panel">
          <h1 className="hero-cinematic-title">
            <motion.span
              className="hero-cinematic-line"
              variants={entranceChild}
            >
              Design Systems for
            </motion.span>
            <motion.span
              className="hero-cinematic-line"
              variants={entranceChild}
            >
              Humans and AI Agents
            </motion.span>
          </h1>

          <motion.p
            className="hero-cinematic-subtitle"
            variants={entranceChild}
          >
            <span className="hero-cinematic-subtitle-line">
              Based in the heart of Silicon Valley, we help teams build{" "}
              <span className="motto-emphasis">AI-ready design systems</span>.
            </span>
            <span className="hero-cinematic-subtitle-line">
              So you can ship fast without the{" "}
              <span className="motto-emphasis">AI slop</span>.
            </span>
          </motion.p>

          <motion.div className="hero-cinematic-cta-row" variants={entranceChild}>
            <a
              className="hero-cinematic-cta liquid-glass"
              href={bookingUrl}
              onClick={openBookingModal}
              {...bookingAttributes}
            >
              <span className="hero-cinematic-avatar" aria-hidden="true">
                <img src={profilePicture} alt="" />
              </span>
              <span>Book 15 min call</span>
            </a>
            <a
              className="hero-cinematic-spots"
              href={newsletterUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                event.preventDefault();
                setNewsletterOpen(true);
              }}
            >
              <svg
                className="hero-cinematic-spots-icon"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 4.5h12v8H2z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="m2.4 5 5.6 4 5.6-4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Join newsletter
            </a>
          </motion.div>
        </div>
      </motion.div>

      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
    </section>
  );
}

const workPathways = [
  {
    name: "1:1 Consultation",
    color1: "#3b82f6",
    color2: "#bae6fd",
    ctaLabel: "Book 15 Min Discovery Call",
    features: [
      "Help build AI workflows",
      "Provide guidance and support",
      "Consultation and advisory"
    ]
  },
  {
    name: "Audits and Team Embedded",
    featured: true,
    color1: "#8b5cf6",
    color2: "#ddd6fe",
    ctaLabel: "Book 15 Min Discovery Call",
    features: [
      "End-to-end audits, reports, and analysis",
      "Evals, components, contracts, metadata, intent, and reusability",
      "Deliverables across Figma, code, animation, and foundations"
    ]
  },
  {
    name: "Design Systems Workshop",
    color1: "#10b981",
    color2: "#a7f3d0",
    ctaLabel: "Join Workshop",
    ctaHref: "/workshop",
    features: [
      "Hands-on workshop to audit and build AI-ready design systems",
      "Practical tooling and workflows"
    ]
  }
];

function WorkPathways() {
  return (
    <section className="pathways" aria-labelledby="pathways-title" data-nav-theme="dark">
      <Entrance className="pathways-inner">
        <EntranceItem as="h2" id="pathways-title" className="pathways-title">
          Ways to work together
        </EntranceItem>

        <EntranceItem className="pathways-grid">
          {workPathways.map((plan) => (
            <article
              className={`pathway-card${plan.featured ? " is-featured" : ""}`}
              key={plan.name}
              style={{ "--card-1": plan.color1, "--card-2": plan.color2 }}
            >
              <PricingCard.Header>
                <div className="pricing-card-header-intro">
                  <PricingCard.PlanName as="h3" className="pathway-name">
                    {plan.name}
                  </PricingCard.PlanName>
                  {plan.tagline ? (
                    <PricingCard.Description>{plan.tagline}</PricingCard.Description>
                  ) : null}
                </div>
                {plan.ctaHref ? (
                  <a
                    className={`pathway-cta${plan.featured ? " is-featured" : ""}`}
                    href={plan.ctaHref}
                    onClick={
                      plan.ctaHref === "/academy"
                        ? () => trackAcademyCtaClick("work_pathways", plan.ctaLabel)
                        : undefined
                    }
                  >
                    {plan.ctaLabel}
                  </a>
                ) : (
                  <a
                    className={`pathway-cta${plan.featured ? " is-featured" : ""}`}
                    href={bookingUrl}
                    onClick={openBookingModal}
                    {...bookingAttributes}
                  >
                    {plan.ctaLabel || "Book 15 min call"}
                  </a>
                )}
              </PricingCard.Header>

              <PricingCard.Body>
                <PricingCard.List className="pathway-features">
                  {plan.features.map((feature) => (
                    <PricingCard.ListItem key={feature}>
                      <CheckCircle2 aria-hidden="true" />
                      <span>{feature}</span>
                    </PricingCard.ListItem>
                  ))}
                </PricingCard.List>
              </PricingCard.Body>
            </article>
          ))}
        </EntranceItem>
      </Entrance>
    </section>
  );
}

function BottomBlur() {
  return <div className="page-bottom-blur" aria-hidden="true" />;
}

function BookingButton({ showAvatar = false }) {
  const shouldReduceMotion = useReducedMotion();
  const hoverMotion = shouldReduceMotion
    ? {}
    : {
        y: -2,
        scale: 1.018,
        transition: { type: "spring", stiffness: 520, damping: 28, mass: 0.6 }
      };
  const tapMotion = shouldReduceMotion
    ? {}
    : {
        y: 0,
        scale: 0.985,
        transition: { type: "spring", stiffness: 620, damping: 32, mass: 0.55 }
      };

  return (
    <motion.a
      className="button"
      href={bookingUrl}
      onClick={openBookingModal}
      {...bookingAttributes}
      whileHover={hoverMotion}
      whileTap={tapMotion}
    >
      {showAvatar && (
        <span className="button-avatar" aria-hidden="true">
          <img src={profilePicture} alt="" />
        </span>
      )}
      <span className="button-label">Book 15 min call</span>
    </motion.a>
  );
}

const offerings = [
  {
    title: "Build 0->1 AI-Native Products",
    description:
      "0->1 product design and design engineering, from an idea to a fully functional product."
  },
  {
    title: "AI Consulting",
    description:
      "Identify business needs, pain points, and bottlenecks where AI can augment your workflows."
  },
  {
    title: "Workshops for Teams",
    description:
      "Hands-on AI sessions for teams to prototype, apply, and improve real workflows."
  }
];

const principles = [
  "Human judgment first and design-centered approach",
  "Prototype before theory",
  "Systems that move business needles over demos"
];

const v2HowItWorks = [
  {
    title: "Strategy Workshop",
    description:
      "Understand your business model, customer journey, revenue motion, tools, data, and team workflows before building."
  },
  {
    title: "AI Agent and Systems Development",
    description:
      "Design and develop AI agents around the decisions, handoffs, and operating needs that matter most to the business."
  },
  {
    title: "Workflow Integration",
    description:
      "Connect agents into your systems, knowledge bases, team processes, and client-facing workflows so they fit real operations."
  },
  {
    title: "Support and Monitoring",
    description:
      "Refine the system after launch with monitoring, iteration, workflow tuning, and support as your operations scale."
  }
];

const homeOffers = [
  {
    title: "0→1 AI-Native Products",
    titleLines: ["0→1 AI-Native", "Products"],
    description:
      "Fuzzy concepts stall until someone makes them real. We work in coded, clickable flows from week one, so the idea gets tested instead of debated.",
    slug: "design-engineering",
    stage: "Build",
    color1: "#3b82f6",
    color2: "#bae6fd"
  },
  {
    title: "AI-Ready Design System Sprint",
    titleLines: ["AI-Ready Design", "System Sprint"],
    description:
      "Most prototypes get thrown out at handoff. We get your design system agent-ready, so the prototype becomes production code instead of a rebuild.",
    slug: "ai-native-products",
    link: "/workshop",
    stage: "Systems",
    color1: "#8b5cf6",
    color2: "#ddd6fe"
  },
  {
    title: "Academy",
    description:
      "Hands-on training on the AI tools that turn a rough idea into a coded flow in hours, so your team stops waiting on specialists.",
    slug: "ai-training-enablement",
    link: "/academy",
    stage: "Enable",
    color1: "#10b981",
    color2: "#a7f3d0"
  }
];

const homeProblems = [
  {
    title: "AI slop to on-brand UI.",
    titleLines: ["AI slop →", "on-brand UI."],
    color1: "#3b82f6",
    color2: "#bae6fd"
  },
  {
    title: "Design drift to shared context.",
    titleLines: ["Design drift →", "shared context."],
    color1: "#8b5cf6",
    color2: "#ddd6fe"
  },
  {
    title: "Models guessing to models with context.",
    titleLines: ["Models guessing →", "models with context."],
    color1: "#10b981",
    color2: "#a7f3d0"
  }
];

const offeringPages = {
  "ai-native-products": {
    eyebrow: "Offering 02",
    title: "Move Business Needles with AI Systems",
    intro:
      "Workflow automation systems and audits that drive business transformation, increasing retention, adaptation, and revenue.",
    status: "placeholder",
    sections: [
      {
        heading: "What this looks like",
        body: "End-to-end AI systems: discovery, workflow automation, agent architecture, and production engineering, designed around the decisions that move retention, adaptation, and revenue."
      },
      {
        heading: "Where it fits",
        body: "Founders and teams who want AI woven into how the business actually operates, driving outcomes and growth, not just shipping a demo."
      }
    ]
  },
  "design-engineering": {
    eyebrow: "Offering 01",
    title: "Ship Fast with Design Engineering",
    intro:
      "Product design, design engineering, agent building, and design systems. Components, interactions, and motion built with development in the same loop.",
    status: "placeholder",
    sections: [
      {
        heading: "What this looks like",
        body: "Prototype ideas in days, build production-ready UI, motion, and agent surfaces, and ship components without another redesign cycle between design and development."
      },
      {
        heading: "Where it fits",
        body: "Product teams that need more than mockups: someone who can design, build, and help the interface land in production fast."
      }
    ]
  },
  "ai-consulting": {
    eyebrow: "Offering 03",
    title: "AI Consulting",
    intro:
      "Identify where AI can improve workflows, solve business problems, and create practical leverage with a clear, honest plan.",
    status: "placeholder",
    sections: [
      {
        heading: "What this looks like",
        body: "A focused engagement to map your workflows, find the highest-leverage AI opportunities, and lay out a realistic path to build them."
      },
      {
        heading: "Where it fits",
        body: "Leaders who want a clear-eyed take on where AI helps, where it doesn't, and what to do next."
      }
    ]
  },
  "ai-training-enablement": {
    eyebrow: "Offering 03",
    title: "AI Enablement, Workshops and Training",
    intro:
      "Custom workshops and cohorts for your teams to become truly AI-native, with hands-on guidance tailored to how your team actually works.",
    status: "live",
    sections: [
      {
        heading: "What you get",
        body: "Live, hands-on workshops built around your real workflows. Teams leave with practical AI habits, prompts, and systems they use the next day."
      },
      {
        heading: "Format",
        body: "Half-day or multi-session engagements, in-person or remote, sized to your team. Follow-up materials and playbooks included."
      },
      {
        heading: "Outcomes",
        body: "Faster execution, higher-quality output, and a team that treats AI as a core tool rather than a novelty."
      }
    ]
  },
  "growth-strategies": {
    eyebrow: "Offering 03",
    title: "AI Enablement, Workshops and Training",
    intro:
      "Custom workshops and cohorts for your teams to become truly AI-native, with hands-on guidance tailored to how your team actually works.",
    status: "live",
    sections: [
      {
        heading: "What you get",
        body: "Live, hands-on workshops built around your real workflows. Teams leave with practical AI habits, prompts, and systems they use the next day."
      },
      {
        heading: "Format",
        body: "Half-day or multi-session engagements, in-person or remote, sized to your team. Follow-up materials and playbooks included."
      },
      {
        heading: "Outcomes",
        body: "Faster execution, higher-quality output, and a team that treats AI as a core tool rather than a novelty."
      }
    ]
  }
};

const workItems = [
  {
    label: "0 → 1 AI-native product work",
    title: "RB AI",
    video: workReelVideo,
    image: rbAiPoster,
    position: "center"
  },
  {
    label: "Design system for AI agents",
    title: "Florence",
    image: florenceWorkImage,
    position: "center"
  },
  {
    label: "JPMorgan Chase · B2B SaaS Platform",
    title: "Digital Commercial Banking",
    image: dcbWorkImage,
    position: "center"
  },
  {
    label: "Native Mobile Redesign and AI Ready Design System",
    title: "PureFi",
    video: pureFiVideo,
    image: pureFiPoster,
    position: "72% 46%"
  },
  {
    label: "AI Styling · 0 → 1 Product",
    title: "Outfix AI",
    video: outfixWorkVideo,
    image: outfixWorkPoster,
    position: "center",
    fit: "contain"
  },
  {
    label: "Voice Todo",
    title: "Orbi Agent",
    video: evaAiVideo,
    image: orbiPoster,
    position: "44% 50%"
  },
  {
    label: "Figma Plugin · Claude Code",
    title: "Ollie AI",
    video: ollieWorkVideo,
    image: ollieWorkPoster,
    position: "center"
  },
  {
    label: "Citi · Consumer Banking",
    title: "Balance Transfer",
    video: balanceTransferWorkVideo,
    image: balanceTransferWorkPoster,
    position: "center",
    fit: "contain"
  },
  {
    label: "Citi · AI Strategy",
    title: "AI Insights",
    video: aiInsightsWorkVideo,
    image: aiInsightsWorkPoster,
    position: "center"
  },
  {
    label: "Website Design · AI Academy",
    title: "AI Academy",
    video: aiAcademyWorkVideo,
    image: aiAcademyWorkPoster,
    position: "center",
    fit: "contain",
    containTone: "light"
  },
  {
    label: "Website Design · olo.app",
    title: "Olo",
    video: ultraMockWorkVideo,
    image: ultraMockWorkPoster,
    position: "center",
    fit: "contain"
  },
  {
    label: "iOS · 4.6★ · 50K Users",
    title: "No Scroll",
    image: noScrollWorkImage,
    position: "center",
    fit: "contain",
    containTone: "light"
  }
];

function BioIcon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  if (name === "cap") {
    return (
      <svg {...common}>
        <path d="M12 4L2 9l10 5 10-5-10-5z" />
        <path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5" />
      </svg>
    );
  }

  if (name === "badge") {
    return (
      <svg {...common}>
        <circle cx="12" cy="9.5" r="5.5" />
        <path d="M8.5 14.5L7 21l5-2.4L17 21l-1.5-6.5" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...common}>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9.75h4v11.25H3V9.75zm6.5 0h3.83v1.54h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12V21h-4v-4.96c0-1.18-.02-2.7-1.64-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75z" />
      </svg>
    );
  }

  if (name === "substack") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M4 3h16v2.6H4V3zm0 4.7h16v2.6H4V7.7zM4 12.4L12 17l8-4.6V21l-8-4.6L4 21v-8.6z" />
      </svg>
    );
  }

  return null;
}

function WorkShowcase() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const selectorRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const active = workItems[activeIndex];

  // Browsers defer or pause autoplay for offscreen video; kick it back on
  // whenever the stage is in view, and whenever the selection changes.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const tryPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    tryPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) tryPlay();
          else video.pause();
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(video);

    document.addEventListener("visibilitychange", tryPlay);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [activeIndex]);
  const step = (dir) =>
    setActiveIndex((i) => (i + dir + workItems.length) % workItems.length);

  // Keep the active thumbnail in view without scrolling the page.
  React.useEffect(() => {
    const rail = selectorRef.current;
    const chip = rail?.children?.[activeIndex];
    if (!rail || !chip) return;
    rail.scrollTo({
      left: chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2,
      behavior: "smooth"
    });
  }, [activeIndex]);

  return (
    <section className="work-showcase" aria-labelledby="work-title" data-nav-theme="dark">
      <div className="work-showcase-inner">
        <Entrance className="section-heading no-section-note work-heading">
          <EntranceItem>
            <h2 id="work-title">Work Highlights</h2>
          </EntranceItem>
          <EntranceItem className="work-heading-actions">
            <a className="work-case-studies-cta" href="/case-studies">
              View all
            </a>
            <div className="work-nav">
              <button
                type="button"
                className="work-nav-btn"
                aria-label="Previous project"
                onClick={() => step(-1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M15 5l-7 7 7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="work-nav-btn"
                aria-label="Next project"
                onClick={() => step(1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M9 5l7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </EntranceItem>
        </Entrance>

        <div className="work-spotlight">
          <div
            className={`work-spotlight-media${active.fit === "contain" ? " work-spotlight-contain" : ""}`}
          >
            {active.video ? (
              <video
                key={active.title}
                ref={videoRef}
                src={active.video}
                poster={active.image}
                autoPlay
                muted
                defaultMuted
                loop
                playsInline
                webkit-playsinline="true"
                preload="auto"
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                onLoadedMetadata={(event) => {
                  event.currentTarget.muted = true;
                  event.currentTarget.play().catch(() => {});
                }}
                onCanPlay={(event) => {
                  event.currentTarget.muted = true;
                  event.currentTarget.play().catch(() => {});
                }}
                style={{ objectPosition: active.position }}
              />
            ) : (
              <img
                key={active.title}
                src={active.image}
                alt={active.title}
                style={{ objectPosition: active.position }}
              />
            )}
          </div>
        </div>

        <div
          className="work-selector"
          role="tablist"
          aria-label="Select a project"
          ref={selectorRef}
        >
          {workItems.map((item, index) => (
            <button
              type="button"
              role="tab"
              key={item.title}
              className={`work-chip${index === activeIndex ? " is-active" : ""}`}
              aria-selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <span className="work-chip-media">
                <img src={item.image} alt="" style={{ objectPosition: item.position }} />
              </span>
              <span className="work-chip-title">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


const v2Principles = [
  "Scope the business problem and customer workflow",
  "Design the agent workflow around real team handoffs",
  "Build, integrate, and improve the system inside the business"
];

const homePrinciples = [
  "Start with business context, product goals, and team readiness",
  "Design and build practical tools with clear product craft",
  "Enable teams to adopt AI with confidence inside real work"
];

const toolStack = [
  { name: "Linear", icon: linearLogo },
  { name: "Claude Code", icon: claudeCodeLogo },
  { name: "Codex", icon: codexLogo },
  { name: "Cursor", icon: cursorLogo },
  { name: "Figma", icon: figmaLogo },
  { name: "Wonder", icon: wonderLogo, contain: true },
  { name: "Vercel", icon: vercelLogo },
  { name: "Xcode", icon: xcodeLogo },
  { name: "React", icon: reactLogo },
  { name: "TypeScript", icon: typescriptLogo },
  { name: "GitHub", icon: githubLogo },
  { name: "Storybook", icon: storybookLogo },
  { name: "SwiftUI", icon: swiftUiLogo },
  { name: "Next.js", icon: nextLogo }
];

const toolStackRowOne = toolStack.slice(0, 5);
const toolStackRowTwo = toolStack.slice(5, 10);
const toolStackRowThree = [
  ...toolStack.slice(10),
  { name: "OpenClaw", icon: openClawLogo },
  { name: "Hermes Agents", icon: hermesLogo }
];

const bioCompanies = [
  { name: "TOCA", icon: tocaCompanyLogo },
  { name: "Citi", icon: citiCompanyLogo },
  { name: "Chase", icon: chaseCompanyLogo }
];

const newsletterCompanies = [
  { name: "Meta", icon: metaCompanyLogo },
  { name: "Google", icon: googleCompanyLogo },
  { name: "Apple", icon: appleCompanyLogo },
  { name: "Chase", icon: chaseCompanyLogo }
];

const newsletterUrl = "https://substack.com/@johnrodrigues";

const academyProofVideo = "/academy/hero.mp4?v=hero-cd598d71";
const academyProofVideoMobile = "/academy/hero-mobile.mp4?v=hero-cd598d71";

const academyProofLogos = [
  { name: "Apple", icon: "/academy/Apple.png" },
  { name: "Google", icon: "/academy/Google.svg.png" },
  { name: "JPMorgan Chase", icon: "/academy/Chase.png" },
  { name: "HubSpot", icon: "/academy/Hubspot.svg.png" },
  { name: "Intercom", icon: "/academy/intercom-1-logo-png-transparent.png" }
];

function CohortAcademyProof() {
  const setVideoRef = React.useCallback((node) => {
    if (!node) return;
    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    node.setAttribute("muted", "");
    node.setAttribute("playsinline", "");
    node.setAttribute("webkit-playsinline", "true");
    const playPromise = node.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }, []);

  return (
    <div className="cohort-proof">
      <div className="cohort-proof-video">
        <video
          ref={setVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label="Inside the AI-Ready Design Systems Workshop"
        >
          <source src={academyProofVideoMobile} media="(max-width: 768px)" type="video/mp4" />
          <source src={academyProofVideo} type="video/mp4" />
        </video>
      </div>
      <div className="cohort-proof-trust">
        <span className="cohort-proof-label">Resources trusted by designers from</span>
        <div className="cohort-proof-logos">
          {academyProofLogos.map((logo) => (
            <img key={logo.name} src={logo.icon} alt={logo.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Yay!!! Thank you John! You literally explained auto layout today so effortlessly. I understand it more now than ever before. I'm considering taking your course to take my Figma skills up a notch.",
    name: "Yariela B",
    role: "UX Designer",
    logo: googleCompanyLogo
  },
  {
    quote:
      "Had an amazing chat with John. We exchanged some interesting resources and talked about the importance of understanding the value of a designer.",
    name: "Lucas W",
    role: "Product Designer",
    logo: appleCompanyLogo
  },
  {
    quote:
      "John has shown tremendous value as a UX designer. This year, he has answered every challenge in taking on additional responsibility in project management, client relationship building, and increased design ownership and delivery.",
    name: "Zachary E",
    role: "Creative Director, VP",
    logo: citiCompanyLogo
  },
  {
    quote:
      "His thoughtful ideas and entrepreneurship have enhanced our team's collaboration. His design work has significantly boosted visibility and impact across all product areas. His keen eye for UX and resourcefulness with new technologies are impressive.",
    name: "Kristian K",
    role: "Product Designer, VP",
    logo: chaseCompanyLogo
  },
  {
    quote:
      "Working with John has been a real pleasure. He brought a clear process from beginning to end, responded quickly, and delivered high-quality work. The new design makes No Scroll feel like a brand new app. If you're considering working with John, don't hesitate.",
    name: "Andrew",
    role: "Founder of No Scroll App"
  },
  {
    quote:
      "Collaborating with John was both easy and productive. John provided valuable insights into product development and user experience that truly enhanced our project and moved it to the next level. I highly recommend John.",
    name: "Edward Petkovicz",
    role: "faxion.ai"
  }
];

const cohortTestimonials = [
  {
    quote:
      "Incredibly useful course which gave me amazing insights on AI. Rather than only learning theory, we rolled up our sleeves and used LLMs and AI tools in real time. John is patient and makes sure everyone understands the tools he introduces.",
    name: "Dan",
    role: "UX design leader · ex JP Morgan Chase, Razorfish",
    cohort: "Cohort 3",
    rating: 5
  },
  {
    quote:
      "I’m leaving this course feeling truly confident in my AI fluency, and my AI tool belt feels up-to-date. I joined to upskill and understand how AI will shape my workflow, and the course delivered. I genuinely feel more competitive in the job market.",
    name: "Dana",
    role: "Lead Product Designer · ex Rite Aid",
    cohort: "Cohort 2",
    rating: 5
  },
  {
    quote:
      "I gained valuable experience building an AI product using AI tools from strategy and wireframes to a functional prototype. The course covered Relume, Lovable, Figma Make, n8n, and more. John was available, accessible, and extremely knowledgeable. Highly recommend.",
    name: "Dan",
    role: "UX Designer · RTI International",
    cohort: "Cohort 2",
    rating: 4
  },
  {
    quote:
      "John equipped me with an understanding of the AI possibility space and helped me turn initial ideas into working POCs for my portfolio, employer, or even something of my own. He’s also building a network we can all draw inspiration from.",
    name: "Brett",
    role: "Product Designer · Simpson Strong-Tie",
    cohort: "Cohort 2",
    rating: 4
  }
];

function CohortTestimonialRotator() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeTestimonial = cohortTestimonials[activeIndex];

  React.useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % cohortTestimonials.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <aside className="cohort-testimonial" aria-label="Participant testimonials">
      <span className="cohort-testimonial-mark" aria-hidden="true">“</span>
      <div className="cohort-testimonial-viewport">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="cohort-testimonial-slide"
            key={activeIndex}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: -22, y: 18 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: 22, y: -18 }}
            transition={{ duration: shouldReduceMotion ? 0.18 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="cohort-testimonial-rating"
              aria-label={`${activeTestimonial.rating} out of 5 stars`}
            >
              <span aria-hidden="true">{"★".repeat(activeTestimonial.rating)}</span>
              <span aria-hidden="true">{"☆".repeat(5 - activeTestimonial.rating)}</span>
            </div>
            <blockquote>{activeTestimonial.quote}</blockquote>
            <footer>
              <span className="cohort-testimonial-avatar">{activeTestimonial.name.slice(0, 2).toUpperCase()}</span>
              <span>
                <strong>{activeTestimonial.name}</strong>
                <small>{activeTestimonial.role} · {activeTestimonial.cohort}</small>
              </span>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="cohort-testimonial-dots" aria-hidden="true">
        {cohortTestimonials.map((testimonial, index) => (
          <span className={index === activeIndex ? "is-active" : ""} key={`${testimonial.name}-${index}`} />
        ))}
      </div>
    </aside>
  );
}

function HeroNebulaShader({ className = "" }) {
  const containerRef = React.useRef(null);
  const materialRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = createWebGLRenderer({ antialias: true, alpha: true });
    if (!renderer) {
      container.dataset.webglUnavailable = "true";
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      varying vec2 vUv;

      mat2 rot(float a) {
        float c = cos(a);
        float s = sin(a);
        return mat2(c, -s, s, c);
      }

      float field(vec3 p) {
        float t = iTime * 0.42;
        p.xz *= rot(t * 0.28);
        p.xy *= rot(t * 0.18);
        vec3 q = p * 2.0 + t;
        return length(p + vec3(sin(t * 0.55))) * log(length(p) + 1.0)
          + sin(q.x + sin(q.z + sin(q.y))) * 0.45 - 1.0;
      }

      void main() {
        vec2 uv = (vUv * iResolution - 0.5 * iResolution) / min(iResolution.x, iResolution.y);
        uv.x *= 1.05;
        uv.y *= 1.18;

        vec3 col = vec3(0.0);
        float d = 2.2;

        for (int i = 0; i < 6; i++) {
          vec3 p = vec3(0.0, 0.0, 4.7) + normalize(vec3(uv, -1.0)) * d;
          float rz = field(p);
          float f = clamp((rz - field(p + 0.08)) * 0.55, -0.08, 1.0);
          vec3 base = vec3(0.10, 0.14, 0.16) + vec3(1.65, 0.72, 0.5) * f;
          col = col * base + smoothstep(2.45, 0.0, rz) * 0.58 * base;
          d += min(rz, 1.0);
        }

        float radius = length(uv);
        float vignette = smoothstep(0.88, 0.18, radius);
        float edge = smoothstep(0.16, 0.72, radius);
        col *= vignette;
        col = mix(col * 0.32, col, edge);

        float alpha = smoothstep(0.82, 0.18, radius) * 0.82;
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const onResize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(width, height);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    onResize();

    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`hero-side-shader ${className}`} aria-hidden="true" />;
}

function DotMatrixBackground({ className = "", intensity = 1, dotScale = 1, connections = false }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    let animationFrame = 0;
    let startedAt = performance.now();
    let dots = [];
    let meshNodes = [];
    let meshLinks = [];

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const gap = window.innerWidth < 560 ? 22 : 26;
      dots = [];
      meshNodes = [];
      meshLinks = [];

      for (let y = gap / 2, row = 0; y < height; y += gap, row += 1) {
        for (let x = gap / 2, column = 0; x < width; x += gap, column += 1) {
          dots.push({
            column,
            row,
            x,
            y,
            seed: Math.random(),
            phase: Math.random() * Math.PI * 2
          });
        }
      }

      if (connections) {
        const nodeCount = window.innerWidth < 560 ? 86 : 170;
        const radiusX = width * 0.42;
        const radiusY = height * 0.26;

        for (let index = 0; index < nodeCount; index += 1) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.pow(Math.random(), 0.55);
          const clusterBias = Math.sin(index * 1.7) * 0.18;

          meshNodes.push({
            x: width / 2 + Math.cos(angle) * radiusX * (radius + clusterBias) + (Math.random() - 0.5) * 90,
            y: height / 2 + Math.sin(angle) * radiusY * radius + (Math.random() - 0.5) * 70,
            phase: Math.random() * Math.PI * 2,
            seed: Math.random(),
            size: 0.75 + Math.random() * 1.8
          });
        }

        meshNodes.forEach((node, index) => {
          const nearest = meshNodes
            .map((candidate, candidateIndex) => ({
              candidateIndex,
              distance: candidateIndex === index ? Infinity : Math.hypot(candidate.x - node.x, candidate.y - node.y)
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3);

          nearest.forEach(({ candidateIndex, distance }, neighborIndex) => {
            if (candidateIndex <= index || distance > Math.min(width, height) * 0.34) return;

            meshLinks.push({
              from: index,
              to: candidateIndex,
              strength: 1 - neighborIndex * 0.2,
              phase: Math.random() * Math.PI * 2
            });
          });
        });
      }

      startedAt = performance.now();
    };

    const draw = (now) => {
      const { width, height } = canvas.getBoundingClientRect();
      const elapsed = (now - startedAt) / 1000;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDistance = Math.hypot(centerX, centerY);
      const delayedElapsed = Math.max(elapsed - 0.55, 0);
      const revealRadius = Math.min(delayedElapsed * 0.42, 1.2);
      const shimmerWidth = 0.045;

      context.clearRect(0, 0, width, height);

      if (connections) {
        const meshReveal = Math.min(Math.max((elapsed - 0.55) / 1.6, 0), 1);
        const drawnMeshNodes = meshNodes.map((node) => {
          const driftX = Math.sin(elapsed * 0.18 + node.phase) * 7 + Math.sin(elapsed * 0.42 + node.y * 0.012) * 2.5;
          const driftY = Math.cos(elapsed * 0.2 + node.phase * 0.8) * 5 + Math.sin(elapsed * 0.36 + node.x * 0.01) * 2;
          const distance = Math.hypot(node.x - centerX, node.y - centerY);
          const edgeFade = 1 - Math.min(distance / maxDistance, 1) * 0.62;
          const pulse = 0.68 + Math.sin(elapsed * 0.75 + node.phase) * 0.32;

          return {
            ...node,
            drawX: node.x + driftX,
            drawY: node.y + driftY,
            opacity: Math.min(edgeFade * pulse * meshReveal * 0.34, 0.34)
          };
        });

        context.lineCap = "round";
        context.lineJoin = "round";

        meshLinks.forEach((link) => {
          const from = drawnMeshNodes[link.from];
          const to = drawnMeshNodes[link.to];
          if (!from || !to) return;

          const flow = 0.58 + Math.sin(elapsed * 0.75 + link.phase) * 0.42;
          const lineOpacity = Math.min(Math.min(from.opacity, to.opacity) * link.strength * flow * 0.78, 0.13);
          if (lineOpacity <= 0.01) return;

          context.beginPath();
          context.strokeStyle = `rgba(210, 236, 255, ${lineOpacity})`;
          context.lineWidth = 0.55 + link.strength * 0.35;
          context.moveTo(from.drawX, from.drawY);
          context.lineTo(to.drawX, to.drawY);
          context.stroke();
        });

        drawnMeshNodes.forEach((node) => {
          if (node.opacity <= 0.01) return;

          context.beginPath();
          context.fillStyle = `rgba(255, 255, 255, ${Math.min(node.opacity * 1.15, 0.42)})`;
          context.arc(node.drawX, node.drawY, node.size * dotScale, 0, Math.PI * 2);
          context.fill();
        });
      }

      const drawnDots = dots.map((dot) => {
        const distance = Math.hypot(dot.x - centerX, dot.y - centerY);
        const normalizedDistance = distance / maxDistance;
        const angleFromCenter = Math.atan2(dot.y - centerY, dot.x - centerX);
        const radialWave = Math.sin(elapsed * 0.9 - normalizedDistance * 18 + dot.phase) * 1.6;
        const diagonalWave = Math.sin(elapsed * 0.55 + (dot.x + dot.y) * 0.018 + dot.phase) * 0.75;
        const drawX = dot.x + Math.cos(angleFromCenter) * radialWave + diagonalWave;
        const drawY = dot.y + Math.sin(angleFromCenter) * radialWave - diagonalWave * 0.45;
        const reveal = Math.min(Math.max((revealRadius - normalizedDistance) / 0.34, 0), 1);
        const shimmerDistance = Math.abs(normalizedDistance - revealRadius);
        const shimmer = Math.max(1 - shimmerDistance / shimmerWidth, 0);
        const pulse = 0.45 + Math.sin(elapsed * 1.2 + dot.phase) * 0.25;
        const ambientPulse = 0.72 + Math.sin(elapsed * 0.75 + dot.phase + dot.seed * 6) * 0.28;
        const edgeFade = 1 - Math.min(distance / maxDistance, 1) * 0.72;
        const baseOpacity = 0.035 + dot.seed * 0.075 + pulse * 0.025;
        const opacity = Math.min(edgeFade * (reveal * baseOpacity * ambientPulse + shimmer * 0.09) * intensity, 0.42);

        return {
          ...dot,
          drawX,
          drawY,
          opacity,
          shimmer
        };
      });

      drawnDots.forEach((dot) => {
        if (dot.opacity <= 0.01) return;

        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        context.arc(dot.drawX, dot.drawY, (dot.shimmer > 0.18 ? 1.35 : dot.seed > 0.82 ? 1.1 : 0.85) * dotScale, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [connections, dotScale, intensity]);

  return <canvas className={`dot-matrix-background ${className}`} ref={canvasRef} aria-hidden="true" />;
}

function useRevealAnimation() {
  React.useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    revealElements.forEach((element) => element.classList.add("reveal-pending"));

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.classList.remove("reveal-pending");
        element.classList.add("is-visible");
      });
      return undefined;
    }

    const revealElement = (element) => {
      element.classList.remove("reveal-pending");
      element.classList.add("is-visible");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealElement(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);
}

function useMarqueeStart() {
  React.useEffect(() => {
    const marquee = document.querySelector(".work-marquee");
    const track = marquee?.querySelector(".work-track");
    if (!marquee || !track) return undefined;

    const loopWidth = () => track.scrollWidth / 2; // items are duplicated
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glideSpeed = 42; // pixels per second
    let animationFrame = null;
    let lastTimestamp = null;
    let paused = false;
    let resumeTimer = null;

    const cardStep = () => {
      const card = track.querySelector(".work-card");
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      return card ? card.getBoundingClientRect().width + gap : 400;
    };

    const nudge = (dir) => {
      const half = loopWidth();
      // Wrap seamlessly when stepping backwards past the start.
      if (dir < 0 && marquee.scrollLeft < cardStep()) {
        marquee.scrollLeft += half;
      }
      if (dir > 0 && marquee.scrollLeft >= half - cardStep() / 2) {
        marquee.scrollLeft -= half;
      }
      marquee.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
    };

    const prevBtn = document.querySelector(".work-nav-prev");
    const nextBtn = document.querySelector(".work-nav-next");
    const pause = () => {
      paused = true;
      if (resumeTimer) window.clearTimeout(resumeTimer);
    };
    const resume = () => {
      paused = false;
      lastTimestamp = null;
    };
    const pauseThenResume = () => {
      pause();
      resumeTimer = window.setTimeout(resume, 1600);
    };
    const glide = (timestamp) => {
      if (!paused && !prefersReducedMotion) {
        if (lastTimestamp != null) {
          marquee.scrollLeft += ((timestamp - lastTimestamp) / 1000) * glideSpeed;
          const half = loopWidth();
          if (marquee.scrollLeft >= half) marquee.scrollLeft -= half;
        }
        lastTimestamp = timestamp;
      } else {
        lastTimestamp = null;
      }
      animationFrame = window.requestAnimationFrame(glide);
    };

    const onPrev = () => {
      nudge(-1);
      pauseThenResume();
    };
    const onNext = () => {
      nudge(1);
      pauseThenResume();
    };

    marquee.scrollLeft = 0;
    marquee.addEventListener("mouseenter", pause);
    marquee.addEventListener("mouseleave", resume);
    marquee.addEventListener("wheel", pauseThenResume, { passive: true });
    marquee.addEventListener("touchstart", pauseThenResume, { passive: true });
    prevBtn?.addEventListener("click", onPrev);
    nextBtn?.addEventListener("click", onNext);
    animationFrame = window.requestAnimationFrame(glide);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (resumeTimer) window.clearTimeout(resumeTimer);
      marquee.removeEventListener("mouseenter", pause);
      marquee.removeEventListener("mouseleave", resume);
      marquee.removeEventListener("wheel", pauseThenResume);
      marquee.removeEventListener("touchstart", pauseThenResume);
      prevBtn?.removeEventListener("click", onPrev);
      nextBtn?.removeEventListener("click", onNext);
    };
  }, []);
}

function OriginalHome() {
  useRevealAnimation();

  return (
    <main className="page-shell">
      <nav className="nav nav-dark" aria-label="Primary">
        <a className="brand" href="#top" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <BookingTextLink className="nav-link">
          Book a call
        </BookingTextLink>
      </nav>

      <section className="hero" id="top" data-nav-theme="dark">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">AI product studio</p>
            <h1>
              <span>Human</span>
              <span>AI</span>
              <span>Studio</span>
            </h1>
            <p className="intro">
              Independent product studio based in the SF Bay Area by John Rodrigues, helping businesses build 0-&gt;1 AI-native products and agentic operating systems.
            </p>
            <div className="hero-actions">
              <BookingButton showAvatar />
            </div>
          </div>
        </div>
      </section>

      <section className="offerings" aria-labelledby="offerings-title" data-nav-theme="light">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">Offerings</p>
            <h2 id="offerings-title">Three ways to work together</h2>
          </div>
          <p className="section-note">
            Focused support for founders, teams, and organizations turning AI
            ideas into useful products and practices.
          </p>
        </div>

        <div className="offering-grid">
          {offerings.map((offering, index) => (
            <article
              className="offering-card reveal"
              key={offering.title}
              style={{ "--reveal-delay": `${120 + index * 140}ms` }}
            >
              <div className="offering-topline">
                <span className="number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="offering-copy">
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach" aria-labelledby="approach-title" data-nav-theme="dark">
        <div className="approach-inner">
          <div>
            <p className="eyebrow">Approach</p>
            <h2 id="approach-title">
              Product thinking, craft, and design engineering for business impact.
            </h2>
          </div>
          <div className="principle-list">
            {principles.map((principle) => (
              <p key={principle}>{principle}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bio" aria-labelledby="bio-title" data-nav-theme="light">
        <div className="bio-inner">
          <div className="bio-copy reveal">
            <p className="eyebrow">Work directly with John</p>
            <h2 id="bio-title">Direct, hands-on AI product work.</h2>
            <p>
              Human AI Studio is led by John Rodrigues. Every engagement is
              hands-on, practical, and close to the work: product thinking,
              system design, prototyping, implementation, and the human side of
              helping people make sense of AI.
            </p>
            <p>
              Add John&apos;s bio here: background, perspective, recent work,
              and the kind of collaborators, founders, teams, or organizations
              he works best with.
            </p>
            <div className="bio-actions">
              <a
                className="secondary-button"
                href="https://www.linkedin.com/in/john-rodrigues4?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="secondary-button"
                href="https://johnrodrigues.substack.com/"
                target="_blank"
                rel="noreferrer"
              >
                Substack
              </a>
            </div>
          </div>
          <figure className="profile-card reveal" style={{ "--reveal-delay": "130ms" }}>
            <div className="profile-image">
              <img src={profilePicture} alt="John Rodrigues" />
            </div>
            <figcaption>
              <span>John Rodrigues</span>
              <span>Design Engineer | Founder of Human AI Studio</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="cta-title" data-nav-theme="dark">
        <DotMatrixBackground />
        <div className="final-cta-inner reveal">
          <p className="eyebrow">Start here</p>
          <h2 id="cta-title">
            <span>Have an AI product, workflow,</span>
            <span>or team question?</span>
          </h2>
          <BookingButton />
        </div>
      </section>

      <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <a className="brand" href="#top" aria-label="Human AI Studio home">
              <span className="brand-mark" aria-hidden="true" />
              Human AI Studio
            </a>
            <p>
              Independent AI product studio run by John Rodrigues in the SF Bay Area.
            </p>
          </div>

          <div className="footer-column">
            <p>Services</p>
            <a href="#top">AI-native products</a>
            <a href="#top">AI operating systems</a>
            <a href="#top">AI workshops</a>
          </div>

          <div className="footer-column">
            <p>Studio</p>
            <span>San Francisco Bay Area</span>
            <span>Design engineering</span>
            <span>Product systems</span>
          </div>

          <div className="footer-column">
            <p>Contact</p>
            <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
            <address className="footer-address">
              Human AI Studio<br />
              455 Market St Ste 1940<br />
              PMB 769150<br />
              San Francisco, California 94105-2448 US
            </address>
            <BookingTextLink>Book 15 min call</BookingTextLink>
          </div>
        </div>
      </footer>
    </main>
  );
}

function StudioHome({ isHistory = false }) {
  useRevealAnimation();
  useMarqueeStart();
  const shouldReduceMotion = useReducedMotion();
  const cards = isHistory ? v2HowItWorks : homeProblems;
  const principlesList = isHistory ? v2Principles : homePrinciples;

  return (
    <main className={`page-shell ${isHistory ? "history-home" : "current-home"}`}>
      <motion.nav
        className="nav nav-dark"
        aria-label="Primary"
        variants={entranceChild}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
      >
        <a className="brand" href="/#top" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="nav-actions">
          <NavMenu />
        </div>
      </motion.nav>

      {!isHistory && (
        <a
          className="home-workshop-bar"
          href="/workshop#workshop-offer"
          aria-label="Join Workshop for the AI-Ready Design System Workshop on August 29 at 9:00 AM Pacific Time"
        >
          <span className="home-workshop-bar-inner">
            <span className="home-workshop-date">August 29 · 9:00 AM PT</span>
            <span className="home-workshop-actions">
              <WorkshopCountdown className="is-home-banner" label="Workshop starts in" />
              <span className="home-workshop-cta">
                Join Workshop
                <span className="home-workshop-arrow" aria-hidden="true">↗</span>
              </span>
            </span>
          </span>
        </a>
      )}

      {isHistory ? (
        <section className="hero v2-hero-section" id="top" data-nav-theme="dark">
          <DotMatrixBackground className="v2-hero-entrance-dots" intensity={3.2} dotScale={1.15} />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">Human AI Studio</p>
              <h1>
                <span>Agentic Design Systems</span>
                <span>for Humans and AI</span>
              </h1>
              <p className="intro v2-hero-intro">
                <span>AI agent and agentic operating system development to help businesses</span>{" "}
                <span>scale operations and grow revenue.</span>
              </p>
              <div className="hero-actions">
                <BookingButton showAvatar />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <CinematicHero />
      )}

      <section
        id="offerings"
        className={`offerings ${isHistory ? "" : "dark-offerings"}`}
        aria-labelledby={isHistory ? "v2-how-title" : undefined}
        aria-label={isHistory ? undefined : "How we build zero to one"}
        data-nav-theme={isHistory ? "light" : "dark"}
      >
        {isHistory ? (
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">How It Works</p>
              <h2 className="v2-how-heading" id="v2-how-title">
                From Workflow Pain to AI System
              </h2>
            </div>
            <p className="section-note">
              A forward-deployed process for understanding the business problem, designing the workflow, and shipping AI agents into real operations.
            </p>
          </div>
        ) : null}

        {isHistory ? (
          <div className="offering-grid v2-flow-grid">
            {cards.map((step, index) => (
              <article
                className="offering-card v2-offering-card reveal"
                key={step.title}
                style={{
                  "--reveal-delay": `${120 + index * 140}ms`,
                  "--card-color-1": step.color1,
                  "--card-color-2": step.color2
                }}
              >
                <div className="offering-topline">
                  <span className="number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="offering-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.logos && (
                    <div className="logo-proof" aria-label={`${step.title} credibility`}>
                      {step.logos.map((logo) => (
                        <span key={logo}>{logo}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <Entrance className="offering-grid v2-flow-grid v2-offer-grid" viewport={{ once: false, amount: 0.22, margin: "0px 0px -10% 0px" }}>
            {cards.map((step, index) => (
              <EntranceItem
                as={step.link ? "a" : "article"}
                className="offering-card v2-offering-card problem-card"
                key={step.title}
                {...(!isHistory
                  ? {
                      custom: index,
                      variants: problemCardEntrance
                    }
                  : {})}
                {...(step.link
                  ? {
                      href: step.link,
                      "aria-label": `Learn more about ${step.title}`,
                      onClick:
                        step.link === "/academy"
                          ? () => trackAcademyCtaClick("offerings_grid", step.title)
                          : undefined
                    }
                  : {})}
                style={{
                  "--card-color-1": step.color1,
                  "--card-color-2": step.color2,
                  "--problem-card-index": index
                }}
              >
                <div className="offering-thumb">
                  <OfferingShader
                    color1={step.color1}
                    color2={step.color2}
                    seed={index * 3.7 + 1.3}
                  />
                  <h3 className="offering-thumb-title">
                    {step.titleLines
                      ? step.titleLines.map((line) => (
                          <span className="offering-title-line" key={line}>
                            {line}
                          </span>
                        ))
                      : step.title}
                  </h3>
                </div>
              </EntranceItem>
            ))}
          </Entrance>
        )}
      </section>

      {!isHistory && (
        <section className="home-florence-showcase" aria-labelledby="home-florence-title" data-nav-theme="dark">
          <Entrance className="home-florence-showcase-inner">
            <EntranceItem className="home-florence-header">
              <div className="home-florence-copy">
                <h2 id="home-florence-title" className="home-florence-title">
                  Work Highlight
                </h2>
              </div>
              <a className="home-florence-cta" href="/florence">
                Explore Florence <span aria-hidden="true">↗</span>
              </a>
            </EntranceItem>
            <div className="home-florence-media">
              <HomeWorkHighlightVideo />
              <div>
                <span>Florence · Built by Human AI Studio</span>
                <a href="/florence">
                  See the system behind the workshop <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </Entrance>
        </section>
      )}

      {!isHistory && <WorkPathways />}

      <section id="tools" className="approach" aria-labelledby="v2-approach-title" data-nav-theme="dark">
        {isHistory ? (
          <div className="approach-inner reveal">
            <div>
              <p className="eyebrow">Approach</p>
              <h2 id="v2-approach-title">
                Forward-deployed design and engineering for your business.
              </h2>
            </div>
            <div className="approach-details">
              <div className="principle-list">
                {principlesList.map((principle) => (
                  <p key={principle}>{principle}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Entrance className="approach-inner">
            <EntranceItem>
              <h2 id="v2-approach-title">Built for your existing stack.</h2>
            </EntranceItem>
            <EntranceItem className="approach-details">
              <div className="stack-card" aria-label="Tool stack">
                <div className="stack-card-rows">
                  <div className="stack-card-row">
                    <div className="stack-card-track">
                      {[...toolStackRowOne, ...toolStackRowOne].map((tool, index) => (
                        <span
                          className={`stack-logo${tool.contain ? " stack-logo-contain" : ""}`}
                          key={`row1-${tool.name}-${index}`}
                          aria-hidden={index >= toolStackRowOne.length}
                        >
                          <img src={tool.icon} alt={tool.name} loading="lazy" />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="stack-card-row">
                    <div className="stack-card-track stack-card-track-reverse">
                      {[...toolStackRowTwo, ...toolStackRowTwo].map((tool, index) => (
                        <span
                          className={`stack-logo${tool.contain ? " stack-logo-contain" : ""}`}
                          key={`row2-${tool.name}-${index}`}
                          aria-hidden={index >= toolStackRowTwo.length}
                        >
                          <img src={tool.icon} alt={tool.name} loading="lazy" />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="stack-card-row">
                    <div className="stack-card-track">
                      {[...toolStackRowThree, ...toolStackRowThree].map((tool, index) => (
                        <span
                          className={`stack-logo${tool.contain ? " stack-logo-contain" : ""}${tool.icon ? "" : " stack-logo-text"}`}
                          key={`row3-${tool.name}-${index}`}
                          aria-hidden={index >= toolStackRowThree.length}
                        >
                          {tool.icon ? (
                            <img src={tool.icon} alt={tool.name} loading="lazy" />
                          ) : (
                            <span>{tool.name}</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </EntranceItem>
          </Entrance>
        )}
      </section>

      <section
        className={`bio v2-bio ${isHistory ? "" : "dark-bio"}`}
        aria-labelledby="v2-bio-title"
        data-nav-theme={isHistory ? "light" : "dark"}
      >
        <div className={`bio-inner ${isHistory ? "" : "bio-card-shell"}`}>
          {isHistory ? (
            <div className="bio-copy reveal">
              <p className="eyebrow">Work Directly With John</p>
              <h2 id="v2-bio-title">
                <span>Work 1:1 With John Rodrigues</span>
                <span>From Strategy to Launch.</span>
              </h2>
              <p>
                Work directly with John Rodrigues across strategy, product design, design engineering, AI agent development, and implementation. You get the personal touch of a close 1:1 collaboration instead of a handoff-heavy agency process.
              </p>
              <p>
                John brings AI credibility through hands-on product work: turning ambiguous business workflows into prototypes, agentic systems, internal tools, and AI-native products that teams can understand, trust, and operate.
              </p>
              <div className="bio-actions">
                <a
                  className="secondary-button"
                  href="https://www.linkedin.com/in/john-rodrigues4?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="secondary-button"
                  href="https://johnrodrigues.substack.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Substack
                </a>
              </div>
            </div>
          ) : (
            <Entrance className="bio-copy" initial={false}>
              <EntranceItem as="h2" id="v2-bio-title">
                <span>Your Design Engineering Partner</span>
              </EntranceItem>
              <EntranceItem as="p">
                I work with teams from startups to enterprise, combining AI strategy and design engineering to turn complex technology into products people trust. I hold a Master's in Interaction Design, a Bachelor's in Engineering, and completed Stanford's AI and UX program.
              </EntranceItem>
              <EntranceItem as="p">
                I've earned recognition from JPMorgan Chase leadership, and my Substack, four years running, is read by 4,200+ designers, leaders, and founders from Apple, Google, and other top companies.
              </EntranceItem>
              <EntranceItem className="bio-actions">
                <a
                  className="bio-icon-button"
                  href="https://www.linkedin.com/in/john-rodrigues4?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <BioIcon name="linkedin" />
                </a>
                <a
                  className="bio-icon-button"
                  href="https://johnrodrigues.substack.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Substack"
                >
                  <BioIcon name="substack" />
                </a>
              </EntranceItem>
              <EntranceItem className="bio-logos" aria-label="Experience with teams at leading companies">
                <span className="bio-logos-label">Experience with teams at</span>
                <div className="bio-logos-row">
                  {bioCompanies.map((company) => (
                    <img key={company.name} src={company.icon} alt={company.name} />
                  ))}
                </div>
              </EntranceItem>
            </Entrance>
          )}
          {isHistory ? (
            <figure className="profile-card reveal" style={{ "--reveal-delay": "130ms" }}>
              <div className="profile-image">
                <img src={profilePicture} alt="John Rodrigues" />
              </div>
              <figcaption>
                <span>John Rodrigues</span>
                <span>Design Engineer | Founder of Human AI Studio</span>
              </figcaption>
            </figure>
          ) : (
            <Entrance as="figure" className="profile-card">
              <EntranceItem className="profile-image">
                <img src={profilePicture} alt="John Rodrigues" />
              </EntranceItem>
              <EntranceItem as="figcaption">
                <span>John Rodrigues</span>
                <span>Design Engineer | Founder of Human AI Studio</span>
              </EntranceItem>
            </Entrance>
          )}
        </div>
      </section>

      {!isHistory && (
        <section className="testimonials" aria-labelledby="testimonials-title" data-nav-theme="dark">
          <div className="testimonials-inner">
            <Entrance className="section-heading no-section-note">
              <EntranceItem>
                <h2 id="testimonials-title">What People Say</h2>
              </EntranceItem>
            </Entrance>
            <div className="testimonial-marquee" aria-label="Testimonials">
              <div className="testimonial-track">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                <article
                  className="testimonial-card"
                  key={`${testimonial.name}-${index}`}
                  aria-hidden={index >= testimonials.length}
                >
                  <p>“{testimonial.quote}”</p>
                  <footer>
                    <span className="testimonial-name">{testimonial.name}</span>
                    <span className="testimonial-role">{testimonial.role}</span>
                    {testimonial.logo && (
                      <img className="testimonial-logo" src={testimonial.logo} alt="" />
                    )}
                  </footer>
                </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {!isHistory && (
        <section className="cohort-section" aria-labelledby="cohort-card-title" data-nav-theme="dark">
          <Entrance className="cohort-section-inner">
            <EntranceItem as="div" className="cohort-card">
              <OfferingShader
                color1="#7c3aed"
                color2="#0ea5e9"
                seed={8.4}
                className="cohort-card-shader"
              />
              <div className="cohort-card-copy">
                <h3 id="cohort-card-title">
                  <span>AI-Ready Design</span>
                  <span>Systems Workshop</span>
                </h3>
                <p>
                  Join the workshop to learn the framework, evals, and component architecture your existing system needs.
                </p>
                <div className="cohort-card-actions">
                  <a
                    className="cohort-card-action cohort-card-action--primary"
                    href="/workshop"
                    onClick={() => trackWorkshopPageClick("cohort_card", "Learn more")}
                  >
                    Learn more
                  </a>
                </div>
              </div>
              <CohortAcademyProof />
            </EntranceItem>
          </Entrance>
        </section>
      )}

      {!isHistory && (
        <section className="final-cta v2-final-cta" aria-labelledby="v2-cta-title" data-nav-theme="dark">
          <DotMatrixBackground />
          <Entrance className="final-cta-inner final-cta-inner--newsletter">
            <div className="newsletter-cta">
              <EntranceItem className="newsletter-copy">
                <h2 id="v2-cta-title">Newsletter</h2>
                <p className="final-cta-lede">
                  Behind-the-scenes notes on AI industry shifts, design systems, and how product teams are evolving with AI.
                </p>
                <div className="newsletter-actions">
                  <a className="button" href={newsletterUrl} target="_blank" rel="noreferrer">
                    <span className="button-label">Read the Newsletter</span>
                  </a>
                </div>
              </EntranceItem>
              <EntranceItem className="newsletter-visual" aria-hidden="true">
                <div className="issue-card-deck">
                  <div className="issue-card issue-card--back" />
                  <div className="issue-card issue-card--front">
                    <div className="issue-card-head">
                      <span className="issue-mark" />
                      <div className="issue-card-meta">
                        <span className="issue-card-name">Human AI Studio</span>
                        <span className="issue-card-sub">Research Newsletter</span>
                      </div>
                      <span className="issue-card-pill">Subscribed</span>
                    </div>
                    <p className="issue-card-body">
                      Field notes on AI industry changes, agent-ready design systems, and the workflows shaping modern product teams.
                    </p>
                    <div className="issue-card-foot">
                      <span className="issue-card-foot-label">Read by professionals at</span>
                      <div className="issue-card-logos">
                        {newsletterCompanies.map((company) => (
                          <img key={company.name} src={company.icon} alt={company.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </EntranceItem>
            </div>
          </Entrance>
        </section>
      )}

      {isHistory && (
      <section className="final-cta v2-final-cta" aria-labelledby="v2-cta-title" data-nav-theme="dark">
        <DotMatrixBackground />
        <div className={`final-cta-inner reveal${isHistory ? "" : " final-cta-inner--newsletter"}`}>
          {isHistory ? (
            <>
              <p className="eyebrow">Start Here</p>
              <h2 id="v2-cta-title">
                <span>Need an AI operating</span>
                <span>system for your business?</span>
              </h2>
              <BookingButton />
            </>
          ) : (
            <div className="newsletter-cta">
              <div className="newsletter-copy">
                <h2 id="v2-cta-title">Newsletter</h2>
                <p className="final-cta-lede">
                  Behind-the-scenes notes on AI industry shifts, design systems, and how product teams are evolving with AI.
                </p>
                <div className="newsletter-actions">
                  <a className="button" href={newsletterUrl} target="_blank" rel="noreferrer">
                    <span className="button-label">Read the Newsletter</span>
                  </a>
                </div>
              </div>
              <div className="newsletter-visual" aria-hidden="true">
                <div className="issue-card-deck">
                <div className="issue-card issue-card--back" />
                <div className="issue-card issue-card--front">
                  <div className="issue-card-head">
                    <span className="issue-mark" />
                    <div className="issue-card-meta">
                      <span className="issue-card-name">Human AI Studio</span>
                      <span className="issue-card-sub">Research Newsletter</span>
                    </div>
                    <span className="issue-card-pill">Subscribed</span>
                  </div>
                  <p className="issue-card-body">
                    Field notes on AI industry changes, agent-ready design systems, and the workflows shaping modern product teams.
                  </p>
                  <div className="issue-card-foot">
                    <span className="issue-card-foot-label">Read by professionals at</span>
                    <div className="issue-card-logos">
                      {newsletterCompanies.map((company) => (
                        <img key={company.name} src={company.icon} alt={company.name} />
                      ))}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <div className="site-footer-inner">
          {isHistory ? (
            <div className="footer-brand">
              <a className="brand" href="/#top" aria-label="Human AI Studio home">
                <span className="brand-mark" aria-hidden="true" />
                Human AI Studio
              </a>
              <p>
                AI agent operating system design and development studio run by John Rodrigues.
              </p>
            </div>
          ) : (
            <Entrance className="footer-brand">
              <EntranceItem as="a" className="brand" href="/#top" aria-label="Human AI Studio home">
                <span className="brand-mark" aria-hidden="true" />
                Human AI Studio
              </EntranceItem>
              <EntranceItem as="p">
                AI product studio for design systems, agents, and AI-native workflows.
              </EntranceItem>
            </Entrance>
          )}

          {isHistory && (
            <>
              <div className="footer-column">
                <p>Services</p>
                <a href="/#top">Agentic operating systems</a>
                <a href="/#top">AI agent development</a>
                <a href="/#top">Operations integration</a>
              </div>

              <div className="footer-column">
                <p>Studio</p>
                <span>San Francisco Bay Area</span>
                <span>Product and design studio</span>
                <span>Direct 1:1 collaboration</span>
              </div>
            </>
          )}

          {isHistory ? (
            <div className="footer-column">
              <p>Contact</p>
              <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
              <address className="footer-address">
                Human AI Studio<br />
                455 Market St Ste 1940<br />
                PMB 769150<br />
                San Francisco, California 94105-2448 US
              </address>
              <BookingTextLink>Book a call</BookingTextLink>
            </div>
          ) : (
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
              <EntranceItem as="span">
                <BookingTextLink>Book a call</BookingTextLink>
              </EntranceItem>
            </Entrance>
          )}
        </div>
        {isHistory ? (
          <div className="footer-wordmark reveal" aria-hidden="true">
            Human AI Studio
          </div>
        ) : (
          <EntranceItem
            as="div"
            className="footer-wordmark"
            aria-hidden="true"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={entranceViewport}
          >
            Human AI Studio
          </EntranceItem>
        )}
      </footer>
    </main>
  );
}

function OfferingPage({ slug }) {
  useRevealAnimation();
  const page = offeringPages[slug];

  if (!page) {
    return (
      <main className="page-shell current-home offering-page">
        <nav className="nav nav-dark" aria-label="Primary">
          <a className="brand" href="/#top" aria-label="Human AI Studio home">
            <span className="brand-mark" aria-hidden="true" />
            Human AI Studio
          </a>
          <div className="nav-actions">
            <NavMenu />
          </div>
        </nav>
        <section className="offering-hero" data-nav-theme="dark">
          <div className="offering-hero-inner reveal">
            <a className="offering-back" href="/#offerings">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M11 7H3M6.5 3.5 3 7l3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Back to offerings</span>
            </a>
            <h1>Offering not found</h1>
            <p className="offering-intro">
              This page doesn’t exist yet. Head back to explore the ways we can work together.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell current-home offering-page">
      <nav className="nav nav-dark" aria-label="Primary">
        <a className="brand" href="/#top" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="nav-actions">
          <NavMenu />
        </div>
      </nav>

      <section className="offering-hero" data-nav-theme="dark">
        <div className="offering-hero-inner reveal">
          <a className="offering-back" href="/#offerings">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M11 7H3M6.5 3.5 3 7l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to offerings</span>
          </a>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="offering-intro">{page.intro}</p>
          {page.status === "placeholder" && (
            <span className="offering-badge">More details coming soon</span>
          )}
          <div className="offering-hero-actions">
            <BookingButton showAvatar />
          </div>
        </div>
      </section>

      <section className="offering-body" data-nav-theme="dark">
        <div className="offering-body-inner">
          {page.sections.map((section, index) => (
            <article
              className="offering-detail reveal"
              key={section.heading}
              style={{ "--reveal-delay": `${120 + index * 120}ms` }}
            >
              <span className="offering-detail-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta v2-final-cta" aria-labelledby="offering-cta-title" data-nav-theme="dark">
        <DotMatrixBackground />
        <div className="final-cta-inner reveal">
          <p className="eyebrow">Start Here</p>
          <h2 id="offering-cta-title">
            <span>Let’s talk about</span>
            <span>{page.title}.</span>
          </h2>
          <BookingButton />
        </div>
      </section>

      <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <a className="brand" href="/#top" aria-label="Human AI Studio home">
              <span className="brand-mark" aria-hidden="true" />
              Human AI Studio
            </a>
            <p>Independent product and design studio by John Rodrigues.</p>
          </div>
          <div className="footer-column">
            <p>Offerings</p>
            {homeOffers.map((offer) => (
              <a
                key={offer.slug}
                href={offer.link || `/offerings/${offer.slug}`}
                {...(offer.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {offer.title}
              </a>
            ))}
          </div>
          <div className="footer-column">
            <p>Contact</p>
            <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
            <address className="footer-address">
              Human AI Studio<br />
              455 Market St Ste 1940<br />
              PMB 769150<br />
              San Francisco, California 94105-2448 US
            </address>
            <BookingTextLink>Book 15 min call</BookingTextLink>
          </div>
        </div>
        <div className="footer-wordmark reveal" aria-hidden="true">
          Human AI Studio
        </div>
      </footer>
    </main>
  );
}

function App() {
  const route = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHistory = route === "/history";
  const isProduct = route === "/product";
  const isAcademy = route === "/academy";
  const offeringMatch = route.match(/^\/offerings\/([^/]+)$/);
  const offeringSlug = offeringMatch ? offeringMatch[1] : null;

  return (
    <>
      {isProduct ? (
        <ProductPage />
      ) : isAcademy ? (
        <AcademyPage />
      ) : route === "/florence" || offeringSlug === "agent-ready-design-system" ? (
        <React.Suspense fallback={null}>
          <FlorenceOfferPage />
        </React.Suspense>
      ) : offeringSlug ? (
        <OfferingPage slug={offeringSlug} />
      ) : (
        <StudioHome isHistory={isHistory} />
      )}
      <BottomBlur />
      <Analytics />
    </>
  );
}

export default App;
