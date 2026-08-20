import React from "react";
import { useReducedMotion } from "framer-motion";
import { StudioProcessIsoScene } from "./StudioProcessIsoScene.jsx";

export function StudioProcessLoop({ steps }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const stepDuration = 3.2;

  React.useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % steps.length);
    }, stepDuration * 1000);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, steps.length]);

  return (
    <div className="studio-process-iso">
      <StudioProcessIsoScene
        steps={steps}
        activeIndex={activeIndex}
        reducedMotion={shouldReduceMotion}
      />

      <ol className="studio-process-a11y">
        {steps.map((step) => (
          <li key={step.name}>
            <span>{step.name}</span>
            <span>{step.body}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
