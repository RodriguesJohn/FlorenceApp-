import React from "react";
import { track } from "@vercel/analytics";
import "./nav-menu.css";

const bookingLink = "john-rodrigues-rqt2lg/15min";
const bookingNamespace = "15min";
const bookingUrl = `https://cal.com/${bookingLink}`;
const bookingConfig = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true"
};
const bookingAttributes = {
  "data-cal-link": bookingLink,
  "data-cal-namespace": bookingNamespace,
  "data-cal-config": JSON.stringify(bookingConfig)
};

const academyUrl = "/academy";
const studioUrl = "/";
const websitesUrl = "/websites";
const allWorkUrl = "/case-studies";
const designSystemsUrl = "/design-systems";
const blogUrl = "/blog";

function trackAcademyNavClick() {
  track("Academy CTA Click", {
    location: "primary_navigation",
    label: "Academy",
    href: academyUrl
  });
}

function trackWorkshopNavClick() {
  track("Workshop Page Click", {
    location: "primary_navigation",
    label: "Workshop",
    href: designSystemsUrl
  });
}

const serviceLinks = [
  { label: "All work", href: allWorkUrl },
  { label: "Websites", href: websitesUrl },
  { label: "Product design", href: studioUrl },
  { label: "Design systems workshop", href: designSystemsUrl },
  { label: "Blog", href: blogUrl }
];

function openBookingModal(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const calApi = window.Cal?.ns?.[bookingNamespace] || window.Cal;
  if (!calApi) return;

  event.preventDefault();
  calApi("modal", {
    calLink: bookingLink,
    config: bookingConfig
  });
}

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
      <a className="nav-direct-link" href={studioUrl}>
        Studio
      </a>
      <a className="nav-direct-link" href={academyUrl} onClick={trackAcademyNavClick}>
        Academy
      </a>
      <a
        className="nav-direct-link"
        href={designSystemsUrl}
        aria-current={currentPath === designSystemsUrl ? "page" : undefined}
        onClick={trackWorkshopNavClick}
      >
        Workshop
      </a>

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
            {serviceLinks.map((service) => (
              <a
                key={service.label}
                className={`nav-menu-item nav-menu-item--nested${
                  currentPath === service.href ? " is-active" : ""
                }`}
                href={service.href}
                role="menuitem"
                aria-current={currentPath === service.href ? "page" : undefined}
                onClick={close}
              >
                {service.label}
              </a>
            ))}
            <div className="nav-menu-divider" role="separator" aria-hidden="true" />
            <a
              className="nav-menu-item"
              href={bookingUrl}
              role="menuitem"
              {...bookingAttributes}
              onClick={(event) => {
                close();
                openBookingModal(event);
              }}
            >
              Book a call
            </a>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
