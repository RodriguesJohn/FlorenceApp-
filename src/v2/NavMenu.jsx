import React from "react";
import "./nav-menu.css";

const barLinks = [
  { label: "Product", href: "/#layers" },
  { label: "Pricing", href: "/#pricing" }
];

export function NavMenu() {
  const currentPath =
    typeof window === "undefined"
      ? "/"
      : window.location.pathname.replace(/\/+$/, "") || "/";
  const currentHash =
    typeof window === "undefined" ? "" : window.location.hash;

  const isCurrent = (href) => {
    const [path, hash] = href.split("#");
    const targetPath = path || "/";
    if (hash) {
      return currentPath === targetPath && currentHash === `#${hash}`;
    }
    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  return (
    <nav className="nav-direct" aria-label="Site navigation">
      {barLinks.map((item) => (
        <a
          key={item.label}
          className="nav-direct-link"
          href={item.href}
          aria-current={isCurrent(item.href) ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
