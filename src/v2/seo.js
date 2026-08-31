import { track } from "@vercel/analytics";
import { blogPosts } from "./blogData.js";

const SITE_URL = "https://www.humanaistudio.io";
const SITE_NAME = "Human AI Studio";
const DEFAULT_IMAGE = `${SITE_URL}/academy/og.jpg`;

const pages = {
  "/": {
    title: "Human AI Studio | AI Product Studio",
    description:
      "Human AI Studio helps founders and teams design, prototype, and ship AI-native products, agentic systems, design systems, and practical AI workflows.",
    type: "WebSite"
  },
  "/academy": {
    title: "AI Design System Academy | Human AI Studio",
    description:
      "AI Design System Academy: foundations, design systems, evals, and workflows for making a system agents can retrieve.",
    image: `${SITE_URL}/academy/og.jpg`,
    type: "Course"
  },
  "/websites": {
    title: "Websites for AI Companies | Human AI Studio",
    description:
      "Strategy, design, and production-ready websites for AI companies, product studios, founders, and teams that need a sharper launch presence.",
    type: "Service"
  },
  "/case-studies": {
    title: "Case Studies | Human AI Studio",
    description:
      "Selected AI systems, product design, design engineering, and growth work by Human AI Studio for startups and enterprise teams.",
    type: "CollectionPage"
  },
  "/tools": {
    title: "Tools | Human AI Studio",
    description:
      "Open-source tools from Human AI Studio for connecting everyday workflows with AI agents.",
    type: "CollectionPage"
  },
  "/app": {
    title: "App | Human AI Studio",
    description:
      "The Human AI Studio app for AI-ready design systems: framework, contracts, AGENTS.md, Figma MCP setup, evals, and the weekly loop.",
    type: "WebPage",
    noindex: true
  },
  "/workshop/playbook": {
    path: "/app",
    title: "App | Human AI Studio",
    description:
      "The Human AI Studio app for AI-ready design systems: framework, contracts, AGENTS.md, Figma MCP setup, evals, and the weekly loop.",
    type: "WebPage",
    noindex: true
  },
  "/playbook": {
    title: "Playbook | Human AI Studio",
    description:
      "The Human AI Studio playbook. Members sign in to read the written guide.",
    type: "WebPage",
    noindex: true
  },
  "/workshop/complete": {
    title: "You finished the workshop | Human AI Studio",
    description:
      "Congratulations to the August 29 cohort of the AI-Ready Design Systems Workshop. A note from John, what you completed, and what to do next.",
    type: "WebPage"
  },
  "/workshop": {
    title: "AI-Ready Design System Workshop | Human AI Studio",
    description:
      "Join the workshop to learn AI-ready design systems: the framework, readiness evals, component architecture, and implementation checklist.",
    type: "Course"
  },
  "/design-systems": {
    path: "/workshop",
    title: "AI-Ready Design System Workshop | Human AI Studio",
    description:
      "Join the workshop to learn AI-ready design systems: the framework, readiness evals, component architecture, and implementation checklist.",
    type: "Course"
  },
  "/product": {
    title: "AI Agent Teams for Creative Businesses | Human AI Studio",
    description:
      "AI agent teams and operating systems that help creative businesses connect clients, projects, revenue, and workflows without losing context.",
    type: "Product"
  },
  "/blog": {
    title: "Blog | Human AI Studio",
    description:
      "Notes from Human AI Studio on AI-native products, agent-ready design systems, and practical workflows for teams shipping with AI.",
    type: "Blog"
  },
  "/beta": {
    title: "AI Design Systems Academy Membership | Human AI Studio",
    description:
      "A monthly studio for making your design system agent-ready, so humans and agents ship on-brand product instead of AI slop.",
    type: "Course",
    noindex: true
  },
  "/florence": {
    title: "Florence — AI-ready design systems | Human AI Studio",
    description:
      "Florence is an AI-ready design system your coding agents can retrieve accurately and ship without the slop.",
    type: "Service"
  }
};

const offeringPages = {
  "design-engineering": {
    title: "0→1 AI-Native Product Design | Human AI Studio",
    description:
      "Design engineering, coded prototypes, motion, and AI-native product work for teams that need to turn ambiguous ideas into usable products."
  },
  "ai-native-products": {
    title: "AI Systems and Workflow Automation | Human AI Studio",
    description:
      "Workflow automation systems, AI agent architecture, and product engineering designed around decisions that move retention, adaptation, and revenue."
  },
  "ai-consulting": {
    title: "AI Consulting | Human AI Studio",
    description:
      "A focused engagement to map workflows, find high-leverage AI opportunities, and create a realistic plan to build them."
  },
  "ai-training-enablement": {
    title: "AI Enablement Workshops | Human AI Studio",
    description:
      "Hands-on AI workshops and training for teams to build practical habits, prompts, workflows, and systems they can use immediately."
  },
  "agent-ready-design-system": {
    title: "Florence · Agent-Ready Design System | Human AI Studio",
    description:
      "Make your design system agent-queryable and ready for AI-assisted product workflows with a focused audit, strategy, and implementation sprint."
  }
};

function normalizePath(pathname = window.location.pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

function pageForPath(pathname) {
  const path = normalizePath(pathname);
  if (pages[path]) return { path, ...pages[path] };

  const offeringMatch = path.match(/^\/offerings\/([^/]+)$/);
  if (offeringMatch) {
    const offering = offeringPages[offeringMatch[1]];
    if (offering) {
      return { path, type: "Service", ...offering };
    }
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const post = blogPosts.find((entry) => entry.slug === blogMatch[1]);
    if (post) {
      return {
        path,
        type: "BlogPosting",
        title: `${post.title} | Human AI Studio`,
        description: post.description
      };
    }
  }

  return {
    path,
    title: pages["/"].title,
    description: pages["/"].description,
    type: "WebPage",
    noindex: true
  };
}

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("link");
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
}

function structuredDataFor(page) {
  const organization = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      name: SITE_NAME,
      streetAddress: "455 Market St Ste 1940 PMB 769150",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94105-2448",
      addressCountry: "US"
    },
    founder: {
      "@type": "Person",
      name: "John Rodrigues",
      url: SITE_URL,
      sameAs: ["https://www.linkedin.com/in/john-rodrigues4"]
    }
  };

  const basePage = {
    "@type": page.type || "WebPage",
    name: page.title,
    description: page.description,
    url: `${SITE_URL}${page.path === "/" ? "/" : page.path}`,
    publisher: { "@id": `${SITE_URL}/#organization` }
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@id": `${SITE_URL}/#organization`, ...organization },
      { "@id": `${SITE_URL}${page.path}#webpage`, ...basePage }
    ]
  };
}

export function applyPageSeo(pathname = window.location.pathname) {
  const page = pageForPath(pathname);
  const url = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  const image = page.image || DEFAULT_IMAGE;

  document.title = page.title;
  upsertMeta('meta[name="description"]', { name: "description", content: page.description });
  upsertMeta('meta[name="robots"]', {
    name: "robots",
    content: page.noindex ? "noindex, nofollow" : "index, follow"
  });
  upsertLink('link[rel="canonical"]', { rel: "canonical", href: url });

  upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: page.title });
  upsertMeta('meta[property="og:description"]', {
    property: "og:description",
    content: page.description
  });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
  upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
  upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });

  upsertMeta('meta[name="twitter:card"]', {
    name: "twitter:card",
    content: "summary_large_image"
  });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
  upsertMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: page.description
  });
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

  let schema = document.getElementById("structured-data");
  if (!schema) {
    schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.id = "structured-data";
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify(structuredDataFor(page));
}

export function setupSeoTracking() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    const label = link.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || "link";
    const route = normalizePath(window.location.pathname);
    const href = link.href;

    if (href.includes("cal.com/")) {
      track("Book CTA Click", { route, label });
    } else if (href.startsWith("mailto:")) {
      track("Contact Email Click", { route, label });
    } else if (href.includes("substack.com")) {
      track("Newsletter CTA Click", { route, label });
    } else if (href.includes("skool.com")) {
      track("Academy CTA Click", { route, label });
    }
  });

  window.addEventListener("message", (event) => {
    if (!event.origin.endsWith(".cal.com") && event.origin !== "https://cal.com") {
      return;
    }

    const data = event.data;
    if (data?.type !== "CAL:bookingSuccessful" && data?.event !== "bookingSuccessful") {
      return;
    }

    track("Booked Call", {
      route: normalizePath(window.location.pathname),
      provider: "cal.com",
      bookingType: "15min"
    });
  });
}
