import React from "react";

const LOOP_PATH =
  "M 90 230 C 90 110 280 90 450 230 C 620 370 810 350 810 230 C 810 110 620 90 450 230 C 280 370 90 350 90 230";

export function StudioProcessIsoScene({ steps, activeIndex, reducedMotion }) {
  return (
    <div
      className={`studio-process-diagram${reducedMotion ? " is-static" : ""}`}
      aria-label="Continuous studio process: Audit, Design, Build, Ship, then repeat"
    >
      <div className="studio-process-grid" aria-hidden="true" />

      <svg
        className="studio-process-infinity"
        viewBox="0 0 900 460"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="studio-process-infinity-rail" d={LOOP_PATH} />
        <path className="studio-process-infinity-flow" d={LOOP_PATH} />

        <path
          className="studio-process-runner"
          d="M -0.01 0 H 0.01"
          transform={reducedMotion ? "translate(206 133)" : undefined}
        >
          {!reducedMotion ? (
            <animateMotion
              begin="-1.6s"
              dur="12.8s"
              repeatCount="indefinite"
              path={LOOP_PATH}
            />
          ) : null}
        </path>
      </svg>

      <div className="studio-process-loop-label" aria-hidden="true">
        <strong>Human judgment + agentic workflows</strong>
      </div>

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
            </li>
          );
        })}
      </ol>
    </div>
  );
}
