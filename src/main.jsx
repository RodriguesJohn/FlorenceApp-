import React from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/react";
import { applyPageSeo, setupSeoTracking } from "./v2/seo.js";
import { ThemeProvider } from "./v2/theme.jsx";
import { appPath, clerkAllowedRedirectOrigins, clerkConfigured, clerkPublishableKey } from "./v2/clerkConfig.js";
import "./v2/styles.css";

const FLORENCE_HOME = new Set([
  "/",
  "/florence",
  "/product",
  "/offerings/agent-ready-design-system"
]);

const STUDIO_PATHS = [
  "/workshop",
  "/workshop/complete",
  "/workshop/playbook",
  "/design-systems",
  "/course",
  "/academy",
  "/history",
  "/app",
  "/playbook",
  "/case-studies",
  "/case-studies/florence",
  "/tools",
  "/websites",
  "/blog",
  "/beta"
];

let route = window.location.pathname.replace(/\/+$/, "") || "/";
const shouldRedirectHome =
  route !== "/" &&
  (FLORENCE_HOME.has(route) ||
    STUDIO_PATHS.includes(route) ||
    route.startsWith("/blog/") ||
    route.startsWith("/offerings/"));

if (shouldRedirectHome) {
  route = "/";
  window.history.replaceState(
    null,
    "",
    `/${window.location.search}${window.location.hash}`
  );
}

setupSeoTracking();
applyPageSeo(route);

function clerkGo(to) {
  const dest = String(to || "");
  if (!dest) return;
  const path = dest.startsWith("http") ? new URL(dest).pathname : dest.split("?")[0];
  const leavesOrigin =
    (/^https?:\/\//.test(dest) && !dest.startsWith(window.location.origin)) ||
    path === "/start" ||
    path.startsWith("/start");
  if (!leavesOrigin) return;
  const appStart = appPath("/start");
  const url = window.Clerk?.buildUrlWithAuth?.(appStart) || appStart;
  window.location.assign(url);
}

function renderWithAnalytics(root, page) {
  const tree = clerkConfigured ? (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      routerPush={clerkGo}
      routerReplace={clerkGo}
      afterSignOutUrl="/"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      allowedRedirectOrigins={clerkAllowedRedirectOrigins}
    >
      {page}
    </ClerkProvider>
  ) : (
    page
  );

  root.render(
    <React.StrictMode>
      <ThemeProvider>
        {tree}
        <Analytics />
      </ThemeProvider>
    </React.StrictMode>
  );
}

async function boot() {
  const rootEl = document.getElementById("root");
  if (!rootEl) {
    console.error("Missing #root");
    return;
  }

  const root = createRoot(rootEl);

  root.render(
    <main className="boot-screen" aria-live="polite" aria-busy="true">
      Loading
    </main>
  );

  try {
    const { default: ProductPage } = await import("./v2/ProductPage.jsx");
    renderWithAnalytics(root, <ProductPage />);
  } catch (error) {
    console.error("Failed to boot app", error);
    rootEl.innerHTML =
      "<main class='boot-screen'><p>Something went wrong loading this page.</p></main>";
  }
}

boot();
