import React, { useEffect, useRef } from "react";

import { LiquidMetalButton } from "./LiquidMetalButton.jsx";

const CK_SCRIPT = "https://f.convertkit.com/ckjs/ck.5.js";

const FORM_OPTIONS = {
  settings: {
    after_subscribe: {
      action: "message",
      success_message: "Success! Now check your email to confirm your subscription.",
      redirect_url: ""
    }
  },
  version: "5"
};

export const KIT_WAITLIST_FORMS = {
  florence: {
    action: "https://app.kit.com/forms/9882799/subscriptions",
    id: "9882799",
    uid: "476af0a73d",
    titleId: "product-waitlist-title",
    title: "Join the Florence waitlist",
    description:
      "A design system built for coding agents structured so MCP-connected builders can retrieve the right component instead of guessing."
  },
  course: {
    action: "https://app.kit.com/forms/9882802/subscriptions",
    id: "9882802",
    uid: "ab8a37e2e6",
    titleId: "course-waitlist-title",
    titleLines: ["Join the Design Engineering", "waitlist"],
    description:
      "Get notified when the self-paced course opens. Learn the intersection of design, code, and AI on your schedule."
  }
};

function loadConvertKitScript() {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${CK_SCRIPT}"]`);

    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }

      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = CK_SCRIPT;
    script.async = true;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener("error", () => resolve(), { once: true });
    document.body.appendChild(script);
  });
}

function initConvertKitForms(root = document) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.Formkit?.initialize === "function") {
    root.querySelectorAll(".formkit-form").forEach((form) => {
      window.Formkit.initialize(form);
    });
    return;
  }

  if (typeof window._FormsInit === "function") {
    window._FormsInit();
  }
}

function useConvertKitForm(rootRef, active = true) {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    let cancelled = false;

    loadConvertKitScript().then(() => {
      if (cancelled) {
        return;
      }

      requestAnimationFrame(() => {
        if (!cancelled) {
          initConvertKitForms(rootRef.current ?? document);
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [active, rootRef]);
}

function WaitlistFormCopy({ config }) {
  return (
    <div className="product-waitlist-form-copy">
      <h2 id={config.titleId}>
        {config.titleLines ? (
          config.titleLines.map((line) => <span key={line}>{line}</span>)
        ) : (
          config.title
        )}
      </h2>
      <p>{config.description}</p>
    </div>
  );
}

export function KitWaitlistForm({ variant = "florence" }) {
  const formRef = useRef(null);
  const config = KIT_WAITLIST_FORMS[variant];

  useConvertKitForm(formRef, true);

  return (
    <form
      ref={formRef}
      action={config.action}
      className="seva-form formkit-form product-waitlist-form"
      method="post"
      data-sv-form={config.id}
      data-uid={config.uid}
      data-format="inline"
      data-version="5"
      data-options={JSON.stringify(FORM_OPTIONS)}
    >
      <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert" />
      <div className="product-waitlist-fields formkit-fields" data-element="fields" data-stacked="false">
        <div className="formkit-field">
          <input
            className="formkit-input"
            name="fields[first_name]"
            aria-label="First Name"
            placeholder="First Name"
            type="text"
          />
        </div>
        <div className="formkit-field">
          <input
            className="formkit-input"
            name="email_address"
            aria-label="Email Address"
            placeholder="Email Address"
            required
            type="email"
          />
        </div>
        <button type="submit" data-element="submit" className="formkit-submit product-waitlist-submit">
          <span>Join Waitlist</span>
        </button>
      </div>
      <p className="product-waitlist-disclaimer formkit-disclaimer" data-element="disclaimer">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}

export function KitWaitlistModal({ open, onClose, variant = "florence" }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const config = KIT_WAITLIST_FORMS[variant];

  useConvertKitForm(dialogRef, open);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="product-waitlist-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        ref={dialogRef}
        className="product-waitlist-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={config.titleId}
      >
        <button
          ref={closeRef}
          type="button"
          className="product-waitlist-close"
          aria-label="Close waitlist form"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <WaitlistFormCopy config={config} />
        <KitWaitlistForm variant={variant} />
      </section>
    </div>
  );
}

export function FlorenceWaitlistForm() {
  return <KitWaitlistForm variant="florence" />;
}

export function FlorenceWaitlistModal({ open, onClose }) {
  return <KitWaitlistModal open={open} onClose={onClose} variant="florence" />;
}

export function CourseWaitlistModal({ open, onClose }) {
  return <KitWaitlistModal open={open} onClose={onClose} variant="course" />;
}

export function CourseWaitlistEmbed() {
  const embedRef = useRef(null);
  const config = KIT_WAITLIST_FORMS.course;

  useConvertKitForm(embedRef, true);

  return (
    <section ref={embedRef} className="course-waitlist-embed" id="waitlist" aria-labelledby={config.titleId}>
      <WaitlistFormCopy config={config} />
      <KitWaitlistForm variant="course" />
    </section>
  );
}

export function WaitlistButton({
  className = "product-btn product-btn--primary",
  children = "Join the waitlist",
  onOpen
}) {
  const isPrimary = /\bproduct-btn--primary\b/.test(className);

  if (isPrimary) {
    return (
      <LiquidMetalButton
        className={className.includes("product-btn--full") ? "liquid-metal-btn--full" : ""}
        onClick={onOpen}
      >
        {children}
      </LiquidMetalButton>
    );
  }

  return (
    <button type="button" className={className} onClick={onOpen}>
      {children}
    </button>
  );
}
