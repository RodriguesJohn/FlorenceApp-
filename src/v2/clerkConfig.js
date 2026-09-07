export const clerkPublishableKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim() ?? "";

export const clerkConfigured = Boolean(clerkPublishableKey);

const DEFAULT_ADMIN_EMAILS = [
  "john@humaaistudio.io",
  "john@humanaistudio.io",
];

export function adminEmails() {
  const extra = (import.meta.env.VITE_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  return [...new Set([...DEFAULT_ADMIN_EMAILS, ...extra])];
}

export function isAdminEmail(email) {
  if (!email) return false;
  return adminEmails().includes(email.trim().toLowerCase());
}

export function clerkUserEmails(user) {
  if (!user) return [];
  return [
    user.primaryEmailAddress?.emailAddress,
    ...(user.emailAddresses ?? []).map((item) => item.emailAddress),
  ].filter(Boolean);
}

export function isClerkAdmin(user) {
  return clerkUserEmails(user).some(isAdminEmail);
}

export const APP_BASE = "/app";

export const clerkAllowedRedirectOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "https://www.florenceai.io",
  "https://florenceai.io",
  "https://florenceai-drab.vercel.app",
];

export function appPath(path = "/start") {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const suffix =
    !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${origin}${APP_BASE}${suffix}`;
}

const SEND_TO_APP_KEY = "florence.sendToApp";

export function markSendToApp() {
  try {
    sessionStorage.setItem(SEND_TO_APP_KEY, "1");
  } catch {
    // Ignore private-mode storage failures; the click path still navigates.
  }
}

export function shouldSendToApp() {
  try {
    return sessionStorage.getItem(SEND_TO_APP_KEY) === "1";
  } catch {
    return false;
  }
}

export function clearSendToApp() {
  try {
    sessionStorage.removeItem(SEND_TO_APP_KEY);
  } catch {
    // Ignore.
  }
}

export function goToApp(clerk) {
  const dest = appPath("/start");
  clearSendToApp();
  const url = clerk?.buildUrlWithAuth?.(dest) || dest;
  window.location.assign(url);
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
