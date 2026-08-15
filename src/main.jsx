import React from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { applyPageSeo, setupSeoTracking } from "./v2/seo.js";

const route = window.location.pathname.replace(/\/+$/, "") || "/";

setupSeoTracking();
applyPageSeo(route);

function renderWithAnalytics(root, page) {
  root.render(
    <React.StrictMode>
      {page}
      <Analytics />
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

  try {
    if (route === "/academy") {
      const { default: AcademyPage } = await import("./v2/AcademyPage.jsx");
      renderWithAnalytics(root, <AcademyPage />);
      return;
    }

    if (route === "/case-studies") {
      const { default: CaseStudiesPage } = await import("./v2/CaseStudiesPage.jsx");
      renderWithAnalytics(root, <CaseStudiesPage />);
      return;
    }

    if (route === "/websites") {
      const { default: WebsitesPage } = await import("./v2/WebsitesPage.jsx");
      renderWithAnalytics(root, <WebsitesPage />);
      return;
    }

    if (route === "/design-systems") {
      const { default: DesignSystemsPage } = await import("./v2/DesignSystemsPage.jsx");
      renderWithAnalytics(root, <DesignSystemsPage />);
      return;
    }

    if (route === "/florence" || route === "/offerings/agent-ready-design-system") {
      const { default: FlorenceOfferPage } = await import("./v2/FlorenceOfferPage.jsx");
      renderWithAnalytics(root, <FlorenceOfferPage />);
      return;
    }

    if (route === "/blog" || route.startsWith("/blog/")) {
      const { default: BlogPage } = await import("./v2/BlogPage.jsx");
      renderWithAnalytics(root, <BlogPage />);
      return;
    }

    const { default: V2App } = await import("./v2/App.jsx");
    root.render(
      <React.StrictMode>
        <V2App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to boot app", error);
    rootEl.innerHTML =
      "<main style='min-height:100vh;display:grid;place-items:center;background:#050506;color:#fff;font-family:system-ui,sans-serif'><p>Something went wrong loading this page.</p></main>";
  }
}

boot();
