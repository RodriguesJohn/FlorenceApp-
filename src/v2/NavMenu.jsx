import React from "react";
import { createPortal } from "react-dom";
import { track } from "@vercel/analytics";
import "./nav-menu.css";

const studioUrl = "/";
const courseUrl = "/course";
const designSystemsUrl = "/workshop";
const blogUrl = "/blog";

const academyPaths = new Set(["/academy", "/workshop", "/course", "/design-systems"]);

function trackWorkshopNavClick() {
  track("Workshop Page Click", {
    location: "primary_navigation",
    label: "Workshop",
    href: designSystemsUrl
  });
}

const barLinks = [{ label: "Studio", href: studioUrl }];

const academyLinks = [
  { label: "Workshop", href: designSystemsUrl, onClick: trackWorkshopNavClick },
  { label: "DX Course", href: courseUrl }
];

const menuLinks = [
  { label: "Case studies", href: "/case-studies" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: blogUrl }
];

function useNavDropdown(align = "left") {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const [panelStyle, setPanelStyle] = React.useState(null);

  const updatePanelPosition = React.useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setPanelStyle({
      top: `${Math.round(rect.bottom + 10)}px`,
      ...(align === "right"
        ? {
            right: `${Math.round(window.innerWidth - rect.right)}px`,
            left: "auto"
          }
        : {
            left: `${Math.round(rect.left)}px`,
            right: "auto"
          })
    });
  }, [align]);

  React.useEffect(() => {
    if (!open) return undefined;

    updatePanelPosition();

    const onPointerDown = (event) => {
      const target = event.target;
      if (
        !rootRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
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

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }

    updatePanelPosition();
    setOpen(true);
  };

  return {
    open,
    rootRef,
    triggerRef,
    panelRef,
    panelStyle,
    toggle,
    close: () => setOpen(false)
  };
}

export function NavMenu() {
  const academy = useNavDropdown("left");
  const menu = useNavDropdown("right");
  const currentPath =
    typeof window === "undefined"
      ? "/"
      : window.location.pathname.replace(/\/+$/, "") || "/";

  const isCurrent = (href) =>
    currentPath === href || (href !== "/" && currentPath.startsWith(`${href}/`));

  const isAcademyActive = academyPaths.has(currentPath);

  return (
    <nav className="nav-direct" aria-label="Site navigation">
      {barLinks.map((item) => (
        <a
          key={item.label}
          className="nav-direct-link"
          href={item.href}
          aria-current={currentPath === item.href ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}

      <div className={`nav-menu nav-menu--dropdown${academy.open ? " is-open" : ""}`} ref={academy.rootRef}>
        <button
          ref={academy.triggerRef}
          type="button"
          className={`nav-direct-link nav-menu-trigger nav-menu-trigger--label${
            isAcademyActive ? " is-active" : ""
          }`}
          aria-expanded={academy.open}
          aria-haspopup="menu"
          aria-controls="academy-nav-menu"
          onClick={academy.toggle}
        >
          Academy
          <svg
            className="nav-menu-chevron"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 4.25 6 7.75l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {academy.open && academy.panelStyle
          ? createPortal(
              <div
                className="nav-menu-panel nav-menu-panel--dropdown"
                id="academy-nav-menu"
                role="menu"
                ref={academy.panelRef}
                style={academy.panelStyle}
              >
                {academyLinks.map((item) => (
                  <a
                    key={item.label}
                    className={`nav-menu-item${isCurrent(item.href) ? " is-active" : ""}`}
                    href={item.href}
                    role="menuitem"
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    onClick={() => {
                      academy.close();
                      item.onClick?.();
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>,
              document.body
            )
          : null}
      </div>

      <div className={`nav-menu${menu.open ? " is-open" : ""}`} ref={menu.rootRef}>
        <button
          ref={menu.triggerRef}
          type="button"
          className="nav-direct-link nav-menu-trigger nav-menu-trigger--icon"
          aria-expanded={menu.open}
          aria-haspopup="menu"
          aria-controls="primary-nav-menu"
          aria-label="Open menu"
          onClick={menu.toggle}
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
        {menu.open && menu.panelStyle
          ? createPortal(
              <div
                className="nav-menu-panel"
                id="primary-nav-menu"
                role="menu"
                ref={menu.panelRef}
                style={menu.panelStyle}
              >
                {menuLinks.map((item) => (
                  <a
                    key={item.label}
                    className={`nav-menu-item${isCurrent(item.href) ? " is-active" : ""}`}
                    href={item.href}
                    role="menuitem"
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    onClick={menu.close}
                  >
                    {item.label}
                  </a>
                ))}
              </div>,
              document.body
            )
          : null}
      </div>
    </nav>
  );
}
