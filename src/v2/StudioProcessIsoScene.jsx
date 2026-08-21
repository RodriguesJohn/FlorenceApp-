import React from "react";

export function StudioProcessIsoScene({ steps, activeIndex, reducedMotion }) {
  return (
    <div
      className={`studio-process-diagram${reducedMotion ? " is-static" : ""}`}
      aria-label="Studio process: Audit, Design, Build, Ship"
    >
      <ol className="studio-process-nodes">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              className={`studio-process-node studio-process-node--${index + 1}${isActive ? " is-active" : ""}`}
              key={step.name}
              aria-current={isActive ? "step" : undefined}
            >
              <div className="studio-process-node-topline">
                <span className="studio-process-node-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <strong>{step.name}</strong>
              <p>{step.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
