import React from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { applyPageSeo, setupSeoTracking } from "./v2/seo.js";
import { ThemeProvider } from "./v2/theme.jsx";
import "./v2/styles.css";

let route = window.location.pathname.replace(/\/+$/, "") || "/";
if (route === "/workshop/playbook") {
  route = "/app";
  window.history.replaceState(null, "", `${route}${window.location.search}${window.location.hash}`);
}

setupSeoTracking();
applyPageSeo(route);

function renderWithAnalytics(root, page) {
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        {page}
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
    if (route === "/academy") {
      const { default: AcademyPage } = await import("./v2/AcademyPage.jsx");
      renderWithAnalytics(root, <AcademyPage />);
      return;
    }

    if (route === "/case-studies/florence") {
      const { default: FlorenceCaseStudyPage } = await import("./v2/FlorenceCaseStudyPage.jsx");
      renderWithAnalytics(root, <FlorenceCaseStudyPage />);
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

    if (route === "/tools") {
      const { default: ToolsPage } = await import("./v2/ToolsPage.jsx");
      renderWithAnalytics(root, <ToolsPage />);
      return;
    }

    if (route === "/playbook") {
      const { default: PlaybookMembersPage } = await import("./v2/PlaybookMembersPage.jsx");
      renderWithAnalytics(root, <PlaybookMembersPage />);
      return;
    }

    if (route === "/app" || route === "/workshop/playbook") {
      const { default: PlaybookPage } = await import("./v2/PlaybookPage.jsx");
      renderWithAnalytics(root, <PlaybookPage />);
      return;
    }

    if (route === "/workshop/complete") {
      const { default: WorkshopCompletePage } = await import("./v2/WorkshopCompletePage.jsx");
      renderWithAnalytics(root, <WorkshopCompletePage />);
      return;
    }

    if (route === "/workshop" || route === "/design-systems") {
      const { default: DesignSystemsPage } = await import("./v2/DesignSystemsPage.jsx");
      renderWithAnalytics(root, <DesignSystemsPage />);
      return;
    }

    if (route === "/course") {
      const { default: CoursePage } = await import("./v2/CoursePage.jsx");
      renderWithAnalytics(root, <CoursePage />);
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
        <ThemeProvider>
          <V2App />
        </ThemeProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to boot app", error);
    rootEl.innerHTML =
      "<main class='boot-screen'><p>Something went wrong loading this page.</p></main>";
  }
}

boot();
