import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme.jsx";

const spring = { type: "spring", duration: 0.3, bounce: 0 };

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : spring;

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "sun" : "moon"}
            className="theme-toggle-glyph"
            initial={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
            transition={transition}
          >
            {isDark ? <Sun strokeWidth={1.5} /> : <Moon strokeWidth={1.5} />}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
