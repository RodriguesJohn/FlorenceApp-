import React from "react";
import { getWorkshopCountdown } from "./workshop-timing.js";

export function WorkshopCountdown({ className = "", label = "Starts in" }) {
  const [countdown, setCountdown] = React.useState(() => getWorkshopCountdown());

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getWorkshopCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (countdown.status) {
    return (
      <span className={`workshop-countdown is-status ${className}`.trim()} aria-live="polite">
        {countdown.status}
      </span>
    );
  }

  const units = [
    [countdown.days, "d"],
    [countdown.hours, "h"],
    [countdown.minutes, "m"],
    [countdown.seconds, "s"]
  ];

  return (
    <span className={`workshop-countdown ${className}`.trim()} aria-live="polite">
      <span className="workshop-countdown-label">{label}</span>
      {units.map(([value, unitLabel]) => (
        <span className="workshop-countdown-unit" key={unitLabel}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <small>{unitLabel}</small>
        </span>
      ))}
    </span>
  );
}
