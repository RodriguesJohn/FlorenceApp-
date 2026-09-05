import React from "react";
import chaseCompanyLogo from "../assets/companies/ChaseLightMOde.png";
import appleCompanyLogo from "../assets/companies/Apple-Logo.png";
import googleCompanyLogo from "../assets/companies/GoogleLogog.png";
import metaCompanyLogo from "../assets/companies/Meta-Emblem.png";
import "./styles.css";

const newsletterUrl = "https://substack.com/@johnrodrigues";

const newsletterCompanies = [
  { name: "Meta", icon: metaCompanyLogo },
  { name: "Google", icon: googleCompanyLogo },
  { name: "Apple", icon: appleCompanyLogo },
  { name: "Chase", icon: chaseCompanyLogo }
];

export function NewsletterCta({ className = "" }) {
  return (
    <section
      className={`final-cta v2-final-cta ${className}`.trim()}
      aria-labelledby="newsletter-cta-title"
      data-nav-theme="dark"
    >
      <div className="final-cta-inner final-cta-inner--newsletter">
        <div className="newsletter-cta">
          <div className="newsletter-copy">
            <h2 id="newsletter-cta-title">Newsletter</h2>
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
      </div>
    </section>
  );
}
