import React from "react";
import OfferingShader from "./OfferingShader.jsx";
import AcademyWorkspacePreview from "./AcademyWorkspacePreview.jsx";
import { AcademyAnimatedTestimonials } from "./AcademyAnimatedTestimonials.jsx";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import { CourseWaitlistEmbed } from "./FlorenceWaitlistModal.jsx";
import { modules } from "./playbookTopics.js";
import "./academy.css";
import "./course.css";
import "./product.css";

const NEWSLETTER_URL = "https://johnrodrigues.substack.com/";

const designEngineeringSidebar = [
  { id: "foundations", label: "Roadmap" },
  { id: "existing", label: "UI craft" },
  { id: "making-ready", label: "Code" },
  {
    id: "animations",
    label: "Animations",
    lede: "Motion, transitions, and micro-interactions that make interfaces feel finished, not static."
  },
  { id: "tooling", label: "AI tools and workflows" },
  { id: "workflows", label: "Design systems" },
  {
    id: "prototyping",
    label: "Advanced prototyping",
    lede: "Interactive prototypes, motion, and coded demos that prove the design before it ships."
  },
  {
    id: "portfolio",
    label: "DX portfolio",
    lede: "Ship a portfolio that shows design-engineering craft, not just screens in a grid."
  }
];

const designEngineeringModules = designEngineeringSidebar.map((item, index) => {
  const module = modules.find((entry) => entry.id === item.id);
  return {
    id: item.id,
    number: String(index + 1).padStart(2, "0"),
    label: item.label,
    lede: item.lede ?? module?.lede ?? ""
  };
});

const lessonCardColor = { color1: "#38bdf8", color2: "#0284c7" };

const designEngineeringLessons = [
  "What is design engineering",
  "Layout, type, and visual hierarchy",
  "From Figma frame to production code",
  "Motion that guides attention",
  "Cursor, Claude Code, and agent workflows",
  "Tokens, components, and contracts",
  "Coded prototypes that ship the idea",
  "Build a DX portfolio that gets hired",
  "The design-engineering career path"
].map((title, index) => ({
  id: `de-${index}`,
  title,
  ...lessonCardColor
}));

const designEngineeringFeaturedLesson = {
  title: "What is Design Engineering?",
  body: ["The intersection of design and code powered with AI."]
};

const logos = [
  { src: "/academy/Apple.png", alt: "Apple" },
  { src: "/academy/Google.svg.png", alt: "Google" },
  { src: "/academy/Chase.png", alt: "JPMorgan Chase" },
  { src: "/academy/Hubspot.svg.png", alt: "HubSpot" },
  { src: "/academy/intercom-1-logo-png-transparent.png", alt: "Intercom" },
  { src: "/academy/Salesforce.svg", alt: "Salesforce" }
];

const surveyQuotes = [
  {
    id: 1,
    name: "IniOluwa",
    role: "Senior Product Designer",
    company: "Intercom",
    content:
      "I've gone from not knowing how to code to building my own AI agent. Every session has been engaging, interactive, and deeply impactful.",
    rating: 5
  },
  {
    id: 2,
    name: "Dana",
    role: "Lead Product Designer",
    company: "ex Rite Aid",
    content:
      "I'm leaving feeling truly confident in my AI fluency. I'm now ready to build a new portfolio quickly and effectively.",
    rating: 5
  },
  {
    id: 3,
    name: "Dan",
    role: "UX Designer",
    company: "RTI International",
    content:
      "I gained valuable experience building an AI product with AI tools, from strategy and wireframes to a functional prototype.",
    rating: 4
  },
  {
    id: 4,
    name: "Brett",
    role: "Product Designer",
    company: "Simpson Strong-Tie",
    content:
      "John helped me turn initial ideas into working POCs for my portfolio, employer, or even something of my own.",
    rating: 4
  }
];

const included = [
  "All eight modules, self-paced",
  "Lesson video plus the written lesson",
  "UI craft, layout, type, and motion",
  "From Figma frame to production code",
  "AI tools and workflows with Cursor and Claude Code",
  "A DX portfolio you can ship",
  "New lessons while you are subscribed"
];

const packageTestimonials = [
  {
    quote:
      "I've gone from not knowing how to code to building my own AI agent. Every session has been engaging, interactive, and deeply impactful.",
    name: "IniOluwa",
    role: "Senior Product Designer, Intercom",
    img: "/academy/Indi.jpeg"
  },
  {
    quote:
      "I'm leaving this course feeling truly confident in my AI fluency. I'm now ready to build a new portfolio quickly and effectively.",
    name: "Dana",
    role: "Lead Product Designer, ex Rite Aid",
    img: "/academy/Dana.jpeg"
  },
  {
    quote:
      "I gained valuable experience building an AI product, from strategy and wireframes to a functional prototype.",
    name: "Dan",
    role: "UX Designer, RTI International",
    img: "/academy/Dan.jpeg"
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
      "John's course is practical, with demos and real encouragement to explore AI tools specifically for designers.",
    name: "Linda",
    role: "Principal PD, JPMorgan Chase",
    img: "/academy/Linda.jpeg"
  }
];

function PackageTestimonial() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % packageTestimonials.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const testimonial = packageTestimonials[index];

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
          {packageTestimonials.slice(0, 5).map((item, itemIndex) => (
            <img
              key={item.name}
              src={item.img}
              alt=""
              loading="lazy"
              data-active={itemIndex === index ? "true" : undefined}
            />
          ))}
        </div>
        <p>From designers learning design engineering with John</p>
      </div>
    </div>
  );
}

const audience = [
  {
    title: "Designers learning to code",
    body: "You are strong in Figma and want to ship real UI. Learn to write components, use AI to move faster, and close the gap to production."
  },
  {
    title: "Engineers who want design craft",
    body: "You can build features but want stronger layout, type, and motion. Learn the visual layer that makes interfaces feel intentional, not assembled."
  },
  {
    title: "Aspiring design engineers",
    body: "You want a career at the intersection of design and code. Build the skills, workflows, and portfolio that prove you can do both."
  }
];

const faqs = [
  {
    q: "What is this?",
    a: "A self-paced course on making a design system agents can retrieve. Lessons, video, and the same curriculum I teach in the live workshop, on your schedule."
  },
  {
    q: "Why $249 a month?",
    a: "You get the full course and updates while you are subscribed. Cancel when you are done. No cohort date. No seat lottery."
  },
  {
    q: "Is this the live workshop?",
    a: "No. The workshop is a live cohort. This course is the self-paced path. Same problem. Different format."
  },
  {
    q: "Do I get Florence?",
    a: "Florence is the studio showcase. The course teaches you to make your system AI-ready. Custom work is a separate engagement."
  }
];

function JoinWaitlistLink({ className = "" }) {
  return (
    <a
      className={`academy-btn academy-btn--primary ${className}`.trim()}
      href="#waitlist"
    >
      Join the waitlist
    </a>
  );
}

function CourseProductShot() {
  return (
    <figure className="academy-hero-app">
      <div className="academy-hero-app-scaler">
        <div className="academy-hero-chrome">
          <span className="academy-hero-chrome-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="academy-hero-chrome-title">Design Engineering</span>
        </div>
        <div className="academy-hero-app-frame">
          <AcademyWorkspacePreview
            product="Design Engineering"
            subtitle="Self-paced course"
            sidebarItems={designEngineeringSidebar}
            previewLessons={designEngineeringLessons}
            featuredLesson={designEngineeringFeaturedLesson}
            demoVideo="/course/work.mp4?v=1"
          />
        </div>
      </div>
    </figure>
  );
}

export default function CoursePage() {
  React.useEffect(() => {
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
    <div className="academy-page course-landing">
      <SiteHeader />

      <main>
        <section
          className="academy-hero-wrap academy-hero-wrap--product"
          aria-labelledby="course-hero-title"
        >
          <div className="academy-hero-rays" aria-hidden="true" />
          <div className="academy-hero-glow" aria-hidden="true" />
          <div className="academy-hero">
            <Entrance className="academy-hero-copy" animate="visible">
              <EntranceItem as="h1" id="course-hero-title">
                Design Engineering course
              </EntranceItem>
              <EntranceItem as="p" className="academy-hero-sub">
                <span>Learn the intersection of design and code and accelerate your workflows</span>
                <span>with AI and become a most desirable talent.</span>
              </EntranceItem>
              <EntranceItem className="academy-hero-actions">
                <div className="academy-hero-cta-ring">
                  <JoinWaitlistLink />
                </div>
                <a
                  className="academy-btn academy-btn--ghost academy-hero-cta-ghost"
                  href="/playbook"
                >
                  Log in
                </a>
              </EntranceItem>
            </Entrance>
          </div>

          <Entrance className="academy-hero-shot" animate="visible">
            <EntranceItem>
              <div className="academy-hero-shot-glow" aria-hidden="true" />
              <div className="academy-hero-shot-stage">
                <div className="academy-hero-shot-frame">
                  <CourseProductShot />
                </div>
              </div>
            </EntranceItem>
          </Entrance>

          <AcademyAnimatedTestimonials
            title="What practitioners say."
            subtitle="From designers shipping at the intersection of design, code, and AI."
            badgeText=""
            testimonials={surveyQuotes}
            logos={logos}
          />
        </section>

        <section className="academy-section" id="curriculum" aria-labelledby="curriculum-title">
          <Entrance className="academy-section-heading">
            <EntranceItem as="p" className="academy-eyebrow">
              Curriculum
            </EntranceItem>
            <EntranceItem as="h2" id="curriculum-title">
              Eight modules. One system.
            </EntranceItem>
          </Entrance>
          <Entrance className="course-module-grid" as="ol">
            {designEngineeringModules.map((module) => (
              <EntranceItem as="li" className="course-module" key={module.id}>
                <span className="course-module-num">{module.number}</span>
                <div>
                  <h3>{module.label}</h3>
                  <p>{module.lede}</p>
                </div>
              </EntranceItem>
            ))}
          </Entrance>
        </section>

        <section className="academy-section" aria-labelledby="audience-title">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2" id="audience-title">
              Who it is for.
            </EntranceItem>
          </Entrance>
          <Entrance className="course-audience-grid">
            {audience.map((item) => (
              <EntranceItem as="article" className="course-audience-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </EntranceItem>
            ))}
          </Entrance>
        </section>

        <section className="academy-section academy-section--tight" id="pricing" aria-labelledby="pricing-title">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2" id="pricing-title">
              Coming soon.
            </EntranceItem>
            <EntranceItem as="p" className="course-pricing-lede">
              Self-paced. $249 a month. Cancel anytime.
            </EntranceItem>
          </Entrance>
          <Entrance className="academy-packages course-pricing-layout">
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
                  <div className="academy-price-block">
                    <div className="academy-price academy-price--thumb">
                      <span>$249</span>
                      <small>/ per month</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="academy-package-body">
                <ul className="academy-check-list">
                  {included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <CourseWaitlistEmbed />
              </div>
            </EntranceItem>
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
          </Entrance>
        </section>

        <section className="academy-section" aria-labelledby="faq-title">
          <Entrance className="academy-section-heading">
            <EntranceItem as="h2" id="faq-title">
              Questions.
            </EntranceItem>
          </Entrance>
          <Entrance className="course-faq" as="dl">
            {faqs.map((item) => (
              <EntranceItem as="div" className="course-faq-item" key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </EntranceItem>
            ))}
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
            <a href="/workshop">Workshop</a>
            <a href={NEWSLETTER_URL} target="_blank" rel="noreferrer">
              Newsletter
            </a>
          </div>
          <div className="academy-footer-column">
            <p>Contact</p>
            <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
          </div>
        </div>
        <div className="academy-footer-wordmark" aria-hidden="true">
          Human AI Studio
        </div>
      </footer>
    </div>
  );
}
