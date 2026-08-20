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
    requirements: ["macOS", "Node.js 18+", "MCP compatible"]
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

export default function ToolsPage() {
  React.useEffect(() => {
    const previousBackground = document.body.style.background;
    document.body.style.background = "#050506";
    return () => {
      document.body.style.background = previousBackground;
    };
  }, []);

  return (
    <div className="tools-page">
      <SiteHeader />

      <main>
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
                <div className="tool-card-icon" aria-hidden="true">
                  <NotesGlyph />
                </div>
                <div className="tool-card-copy">
                  <h2>{tool.name}</h2>
                  <p>{tool.description}</p>
                </div>
              </div>

              <div className="tool-card-footer">
                <ul aria-label="Requirements">
                  {tool.requirements.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
                <a href={tool.href} target="_blank" rel="noreferrer">
                  View on GitHub
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="tools-footer">
        <div>
          <a className="tools-brand" href="/" aria-label="Human AI Studio home">
            <span className="tools-brand-mark" aria-hidden="true" />
            Human AI Studio
          </a>
          <p>Human AI Studio is a company of Human Inspire Studio LLC.</p>
        </div>
        <div className="tools-footer-links">
          <span>Contact</span>
          <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
          <a href="/workshop">Workshop</a>
        </div>
      </footer>
    </div>
  );
}
