export const clerkPublishableKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim() ?? "";

export const clerkConfigured = Boolean(clerkPublishableKey);

export const APP_HOME =
  import.meta.env.VITE_APP_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5175/"
    : "https://florence-app-seven.vercel.app/");

export const APP_START = `${APP_HOME.replace(/\/?$/, "/")}start`;

export const clerkOverlayOptions = {
  appearance: {
    elements: {
      modalBackdrop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--spacing-24)",
        backgroundColor: "var(--product-scrim)",
      },
      modalContent: {
        margin: 0,
        maxHeight: "100dvh",
        overflow: "auto",
      },
    },
  },
};
