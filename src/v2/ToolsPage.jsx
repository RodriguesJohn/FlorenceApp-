import React from "react";
import { SiteHeader } from "./SiteHeader.jsx";
import "./tools.css";

const tools = [
  {
    name: "Apple Notes MCP",
    category: "Open source · MCP server",
    description:
      "Connect AI assistants to Apple Notes so you can read, create, search, update, and delete notes through natural conversation.",
    href: "https://github.com/RodriguesJohn/applenotesmcp",
    actionLabel: "View on GitHub",
    icon: "notes",
    requirements: ["macOS", "Node.js 18+", "MCP compatible"]
  },
  {
    name: "Ollie AI for Figma",
    category: "Figma plugin · AI design assistant",
    description:
      "Use Ollie AI directly inside Figma as an AI design assistant for prompting, exploring, and supporting design work without leaving the canvas.",
    href: "https://www.figma.com/community/plugin/1599300216747325998/ollie-ai-for-figma",
    actionLabel: "View Figma plugin",
    icon: "ollie",
    requirements: ["Figma", "Community plugin", "AI workflow"]
  }
];

function NotesGlyph() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Apple Notes">
      <rect x="11" y="7" width="42" height="50" rx="11" fill="currentColor" opacity="0.12" />
      <path d="M11 20h42" stroke="currentColor" strokeWidth="3" />
      <path d="M21 30h22M21 38h17M21 46h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.72" />
      <path d="M20 7v10M28 7v10M36 7v10M44 7v10" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function OllieGlyph() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Ollie AI">
      <circle cx="32" cy="32" r="21" fill="currentColor" opacity="0.14" />
      <path
        d="M19 33c0-8 5.7-14 13-14s13 6 13 14-5.7 14-13 14-13-6-13-14Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M24 29h16M24 36h10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ToolGlyph({ name }) {
  if (name === "ollie") return <OllieGlyph />;
  return <NotesGlyph />;
}

export default function ToolsPage({ embedded = false } = {}) {
  React.useEffect(() => {
    if (embedded) return;
    const previousBackground = document.body.style.background;
    document.body.style.background = "#050506";
    return () => {
      document.body.style.background = previousBackground;
    };
  }, [embedded]);

  return (
    <div className={`tools-page${embedded ? " is-embedded" : ""}`}>
      {embedded ? null : <SiteHeader />}

      <div>
        <section className="tools-hero" aria-labelledby="tools-title">
          <h1 id="tools-title">Tools</h1>
        </section>

        <section className="tools-grid" aria-label="Tools">
          {tools.map((tool, index) => (
            <article className="tool-card" key={tool.name}>
              <div className="tool-card-topline">
                <span className="tool-card-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{tool.category}</span>
              </div>

              <div className="tool-card-content">
                <div className={`tool-card-icon tool-card-icon--${tool.icon}`} aria-hidden="true">
                  <ToolGlyph name={tool.icon} />
                </div>
                <div className="tool-card-copy">
                  <h2>{tool.name}</h2>
                  <p>{tool.description}</p>
                </div>
              </div>

              <div className="tool-card-footer">
                <a href={tool.href} target="_blank" rel="noreferrer">
                  {tool.actionLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>

      {embedded ? null : (
        <footer className="tools-footer">
          <div>
            <a className="tools-brand" href="/" aria-label="Human AI Studio home">
              <span className="tools-brand-mark" aria-hidden="true" />
              Human AI Studio
            </a>
            <p>AI product studio for design systems, agents, and AI-native workflows.</p>
          </div>
          <div className="tools-footer-links">
            <span>Contact</span>
            <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
            <address className="tools-footer-address">
              Human AI Studio<br />
              455 Market St Ste 1940<br />
              PMB 769150<br />
              San Francisco, California 94105-2448 US
            </address>
            <a href="/workshop">Workshop</a>
          </div>
        </footer>
      )}
    </div>
  );
}
