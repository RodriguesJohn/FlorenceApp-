import React from "react";
import { track } from "@vercel/analytics";
import "./nav-menu.css";

const studioUrl = "/";
const courseUrl = "/course";
const designSystemsUrl = "/workshop";
const blogUrl = "/blog";

function trackWorkshopNavClick() {
  track("Workshop Page Click", {
    location: "primary_navigation",
    label: "Workshop",
    href: designSystemsUrl
  });
}

const barLinks = [
  { label: "Studio", href: studioUrl },
  { label: "Workshop", href: designSystemsUrl, onClick: trackWorkshopNavClick },
  { label: "Course", href: courseUrl }
];

const menuLinks = [
  { label: "Case studies", href: "/case-studies" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: blogUrl }
];

export function NavMenu() {
  const [open, setOpen] = React.useState(false);
  const currentPath =
    typeof window === "undefined"
      ? "/"
      : window.location.pathname.replace(/\/+$/, "") || "/";
  const rootRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const [panelStyle, setPanelStyle] = React.useState(null);

  const updatePanelPosition = React.useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setPanelStyle({
      top: `${Math.round(rect.bottom + 10)}px`,
      right: `${Math.round(window.innerWidth - rect.right)}px`
    });
  }, []);

  React.useEffect(() => {
    if (!open) return undefined;

    updatePanelPosition();

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, updatePanelPosition]);

  const close = () => setOpen(false);

  const isCurrent = (href) =>
    currentPath === href || (href !== "/" && currentPath.startsWith(`${href}/`));

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }

    updatePanelPosition();
    setOpen(true);
  };

  return (
    <nav className="nav-direct" aria-label="Site navigation">
      {barLinks.map((item) => (
        <a
          key={item.label}
          className="nav-direct-link"
          href={item.href}
          aria-current={currentPath === item.href ? "page" : undefined}
          onClick={item.onClick}
        >
          {item.label}
        </a>
      ))}

      <div className={`nav-menu${open ? " is-open" : ""}`} ref={rootRef}>
        <button
          ref={triggerRef}
          type="button"
          className="nav-direct-link nav-menu-trigger nav-menu-trigger--icon"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls="primary-nav-menu"
          aria-label="Open menu"
          onClick={toggle}
        >
          <svg
            className="nav-menu-icon"
            width="16"
            height="16"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 3.75h9M2.5 7h9M2.5 10.25h9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {open && panelStyle ? (
          <div
            className="nav-menu-panel"
            id="primary-nav-menu"
            role="menu"
            style={panelStyle}
          >
            {barLinks.map((item) => (
              <a
                key={`menu-${item.label}`}
                className={`nav-menu-item nav-menu-item--bar${
                  currentPath === item.href ? " is-active" : ""
                }`}
                href={item.href}
                role="menuitem"
                aria-current={currentPath === item.href ? "page" : undefined}
                onClick={() => {
                  close();
                  item.onClick?.();
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="nav-menu-divider nav-menu-divider--bar" role="separator" aria-hidden="true" />
            {menuLinks.map((item) => (
              <a
                key={item.label}
                className={`nav-menu-item${isCurrent(item.href) ? " is-active" : ""}`}
                href={item.href}
                role="menuitem"
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={() => {
                  close();
                  item.onClick?.();
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
