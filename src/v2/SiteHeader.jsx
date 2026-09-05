import React from "react";
import { NavMenu } from "./NavMenu.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";
import "./site-header.css";

export function SiteHeader({ brand = "Florence AI" }) {
  return (
    <header className="site-header">
      <a className="site-header-brand" href="/" aria-label={`${brand} home`}>
        <span className="site-header-mark" aria-hidden="true">
          <span />
          <span />
        </span>
        {brand}
      </a>
      <div className="site-header-actions">
        <NavMenu />
        <ThemeToggle />
      </div>
    </header>
  );
}
