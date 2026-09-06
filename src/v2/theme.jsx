import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "florence-appearance";
const ThemeContext = createContext(null);

function isTheme(value) {
  return value === "light" || value === "dark";
}

function readTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    /* private mode */
  }

  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

function persistTheme(theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode */
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme: (next) => {
        const resolved = isTheme(next) ? next : "light";
        setThemeState(resolved);
        persistTheme(resolved);
      },
      toggleTheme: () => {
        setThemeState((current) => {
          const next = current === "dark" ? "light" : "dark";
          persistTheme(next);
          return next;
        });
      }
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
