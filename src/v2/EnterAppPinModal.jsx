import React, { useCallback, useEffect, useRef, useState } from "react";

const APP_PIN = "2024";
const PIN_LENGTH = APP_PIN.length;

export function EnterAppPinModal({ open, onClose, appUrl }) {
  const inputRef = useRef(null);
  const digitsRef = useRef("");
  const clearTimer = useRef(0);
  const [digits, setDigits] = useState("");
  const [error, setError] = useState(false);

  const reset = useCallback(() => {
    window.clearTimeout(clearTimer.current);
    digitsRef.current = "";
    setDigits("");
    setError(false);
  }, []);

  const applyDigits = useCallback(
    (next) => {
      const value = next.replace(/\D/g, "").slice(0, PIN_LENGTH);
      digitsRef.current = value;
      setDigits(value);
      setError(false);
      window.clearTimeout(clearTimer.current);

      if (value.length < PIN_LENGTH) {
        return;
      }

      if (value === APP_PIN) {
        window.location.assign(appUrl);
        return;
      }

      setError(true);
      window.clearTimeout(clearTimer.current);
      clearTimer.current = window.setTimeout(() => {
        digitsRef.current = "";
        setDigits("");
        setError(false);
      }, 420);
    },
    [appUrl]
  );

  useEffect(() => {
    if (!open) {
      reset();
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(clearTimer.current);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, reset]);

  if (!open) {
    return null;
  }

  const status = error
    ? "Incorrect PIN"
    : digits.length
      ? `${digits.length} of ${PIN_LENGTH} digits entered`
      : "Enter the PIN";

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
        className={`product-waitlist-dialog product-pin-dialog${
          error ? " is-error" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-pin-title"
        aria-describedby="product-pin-status"
      >
        <button
          type="button"
          className="product-waitlist-close"
          aria-label="Close PIN"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="product-waitlist-form-copy">
          <h2 id="product-pin-title">Enter App</h2>
          <p>Enter the PIN to continue.</p>
        </div>
        <p
          id="product-pin-status"
          className={`product-pin-status${error ? " is-error" : ""}`}
          aria-live="polite"
        >
          {status}
        </p>
        <label className="product-pin-slots">
          <span className="product-pin-slots-label">PIN</span>
          <input
            ref={inputRef}
            className="product-pin-input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            pattern="[0-9]*"
            maxLength={PIN_LENGTH}
            value={digits}
            aria-describedby="product-pin-status"
            onChange={(event) => applyDigits(event.target.value)}
          />
          {Array.from({ length: PIN_LENGTH }, (_, index) => {
            const filled = Boolean(digits[index]);
            return (
              <span
                key={index}
                className={`product-pin-slot${filled ? " is-filled" : ""}${
                  !error && !filled && index === digits.length ? " is-active" : ""
                }`}
                aria-hidden="true"
              />
            );
          })}
        </label>
      </section>
    </div>
  );
}
