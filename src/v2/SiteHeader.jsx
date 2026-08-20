import React from "react";
import { NavMenu } from "./NavMenu.jsx";
import "./site-header.css";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="site-header-brand" href="/" aria-label="Human AI Studio home">
        <span className="site-header-mark" aria-hidden="true">
          <span />
          <span />
        </span>
        Human AI Studio
      </a>
      <NavMenu />
    </header>
  );
}
