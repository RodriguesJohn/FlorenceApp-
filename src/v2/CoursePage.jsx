import React from "react";
import OfferingShader from "./OfferingShader.jsx";
import AcademyWorkspacePreview from "./AcademyWorkspacePreview.jsx";
import { AcademyAnimatedTestimonials } from "./AcademyAnimatedTestimonials.jsx";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { SiteHeader } from "./SiteHeader.jsx";
import { modules } from "./playbookTopics.js";
import "./academy.css";
import "./course.css";

const NEWSLETTER_URL = "https://johnrodrigues.substack.com/";

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

const included = [
  "All six modules, self-paced",
  "Lesson video plus the written lesson",
  "Tokens, contracts, and retrieval",
  "Figma, Cursor, and Claude Code workflows",
  "Evals so you can score the system",
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
    img: "/academy/Sonali.jpeg"
  },
  {
    quote:
      "His strategic frameworks and live sessions helped me think like both a strategist and a solutionist.",
    name: "Sneh",
    role: "UX Designer",
    img: "/academy/Sneh.webp"
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
        <p>From designers who have trained with John</p>
      </div>
    </div>
  );
}

const audience = [
  {
    title: "Product designers",
    body: "You ship in Figma and now the team is prompting Cursor. You want the agent on your system, not around it."
  },
  {
    title: "Design system leads",
    body: "You already have a library. You need retrieval, contracts, and a way to keep agents from inventing a second UI."
  },
  {
    title: "Design engineers",
    body: "You sit between Figma and code. This is how that gap becomes the source of truth for humans and agents."
  }
];

const faqs = [
  {
    q: "What is this?",
    a: "A self-paced course on making a design system agents can retrieve. Lessons, video, and the same curriculum I teach in the live workshop — on your schedule."
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

function ComingSoon({ className = "" }) {
  return (
    <span className={`academy-btn academy-btn--primary academy-btn--soon ${className}`.trim()} aria-disabled="true">
      Coming soon
    </span>
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
          <span className="academy-hero-chrome-title">Training</span>
        </div>
        <div className="academy-hero-app-frame">
          <AcademyWorkspacePreview />
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
                <span>AI-Ready Design</span>
                <span>Systems Course</span>
              </EntranceItem>
              <EntranceItem as="p" className="academy-hero-sub">
                <span>Agents cannot retrieve what you never wrote down. This course is how you structure a system</span>
                <span>so Cursor, Claude Code, and Codex ship from it instead of around it.</span>
              </EntranceItem>
              <EntranceItem className="academy-hero-actions">
                <div className="academy-hero-cta-ring">
                  <ComingSoon />
                </div>
                <a
                  className="academy-btn academy-btn--ghost academy-hero-cta-ghost"
                  href="#curriculum"
                >
                  See the curriculum
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
            subtitle="From designers already shipping. Their reviews. Their ratings."
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
              Six modules. One system.
            </EntranceItem>
          </Entrance>
          <Entrance className="course-module-grid" as="ol">
            {modules.map((module) => (
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
                <ComingSoon className="academy-btn--full" />
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
