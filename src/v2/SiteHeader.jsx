import React from "react";
import { NavMenu } from "./NavMenu.jsx";
import "./site-header.css";

export function SiteHeader({ brand = "Human AI Studio" }) {
  return (
    <header className="site-header">
      <a className="site-header-brand" href="/" aria-label={`${brand} home`}>
        <span className="site-header-mark" aria-hidden="true">
          <span />
          <span />
        </span>
        {brand}
      </a>
      <NavMenu />
    </header>
  );
}
