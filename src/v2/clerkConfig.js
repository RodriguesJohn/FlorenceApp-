export const clerkPublishableKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim() ?? "";

export const clerkConfigured = Boolean(clerkPublishableKey);

export const APP_HOME =
  import.meta.env.VITE_APP_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5175/"
    : "https://florence-app-seven.vercel.app/");

export const APP_START = `${APP_HOME.replace(/\/?$/, "/")}start`;

export const clerkAllowedRedirectOrigins = [
  "http://localhost:5175",
  "http://127.0.0.1:5175",
  "https://florence-app-seven.vercel.app",
  "https://florence-app-johns-projects-29581f2f.vercel.app",
];

export function appOrigin() {
  if (import.meta.env.DEV && typeof window !== "undefined") {
    const host =
      window.location.hostname === "127.0.0.1" ? "127.0.0.1" : "localhost";
    return `http://${host}:5175`;
  }
  return APP_HOME.replace(/\/?$/, "");
}

export function appPath(path = "/start") {
  const origin = appOrigin();
  if (!path || path === "/") return `${origin}/`;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

const clerkModalBackdrop = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "var(--spacing-24)",
  backgroundColor: "var(--product-scrim)",
  backdropFilter: "blur(12px) saturate(1.15)",
  WebkitBackdropFilter: "blur(12px) saturate(1.15)",
};

export const clerkOverlayOptions = {
  appearance: {
    elements: {
      modalBackdrop: clerkModalBackdrop,
      modalContent: {
        margin: 0,
        maxHeight: "100dvh",
        overflow: "auto",
      },
    },
  },
};
