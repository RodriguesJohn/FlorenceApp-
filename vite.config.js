import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { loadPosts, renderIndex, renderPost, CONTENT_DIR } from "./scripts/blog.mjs";

/**
 * Generates the blog as real HTML — one file per post, each with its own title,
 * description and canonical. Dev serves it from middleware; build emits static
 * files so crawlers get the content without running JavaScript.
 */
function blogPlugin() {
  const pageFor = (pathname) => {
    const route = pathname.replace(/\/+$/, "") || "/";
    if (route !== "/blog" && !route.startsWith("/blog/")) return null;

    const posts = loadPosts();
    if (route === "/blog") return renderIndex(posts);

    const post = posts.find((p) => p.url === route);
    return post ? renderPost(post) : null;
  };

  return {
    name: "human-ai-studio-blog",

    configureServer(server) {
      server.watcher.add(CONTENT_DIR);
      // Full reload on content edits — the HTML is generated, so HMR can't patch it.
      server.watcher.on("all", (_event, file) => {
        if (file.startsWith(CONTENT_DIR)) server.ws.send({ type: "full-reload" });
      });

      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url, "http://localhost").pathname;
        let html;
        try {
          html = pageFor(pathname);
        } catch (error) {
          return next(error);
        }
        if (!html) return next();

        res.setHeader("Content-Type", "text/html");
        res.end(await server.transformIndexHtml(pathname, html));
      });
    },

    generateBundle() {
      const posts = loadPosts();
      this.emitFile({ type: "asset", fileName: "blog.html", source: renderIndex(posts) });
      for (const post of posts) {
        this.emitFile({
          type: "asset",
          fileName: `blog/${post.slug}.html`,
          source: renderPost(post)
        });
      }
    }
  };
}

function htmlAliases() {
  const aliases = {
    "/app": "/index.html",
    "/workshop/playbook": "/index.html",
    "/playbook": "/index.html",
    "/workshop/complete": "/index.html",
    "/workshop": "/design-systems.html",
    "/florence": "/florence.html",
    "/florence/system": "/florence-system.html"
  };

  return {
    name: "html-aliases",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, "http://localhost");
        const pathname = url.pathname.replace(/\/+$/, "") || "/";
        const target = aliases[pathname];
        if (target) {
          req.url = target + url.search;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), htmlAliases(), blogPlugin()],
  optimizeDeps: {
    entries: ["index.html", "academy.html", "florence.html", "florence-system.html"]
  },
  build: {
    rollupOptions: {
      // Every route with its own HTML entry must be listed here, or the file
      // never reaches dist/ and the rewrite in vercel.json resolves to nothing.
      input: Object.fromEntries(
        [
          ["main", "index.html"],
          ["academy", "academy.html"],
          ["websites", "websites.html"],
          ["caseStudies", "case-studies.html"],
          ["tools", "tools.html"],
          ["designSystems", "design-systems.html"],
          ["product", "product.html"],
          ["offeringDesignEngineering", "offering-design-engineering.html"],
          ["offeringAiNativeProducts", "offering-ai-native-products.html"],
          ["offeringAiConsulting", "offering-ai-consulting.html"],
          ["offeringAiTrainingEnablement", "offering-ai-training-enablement.html"],
          ["offeringAgentReadyDesignSystem", "offering-agent-ready-design-system.html"],
          ["florence", "florence.html"],
          ["florenceSystem", "florence-system.html"]
        ].map(([name, file]) => [name, resolve(import.meta.dirname, file)])
      )
    }
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    allowedHosts: "all",
    watch: {
      ignored: [
        "**/MyPortfolio/**",
        "**/versions/**",
        "**/backups/**",
        "**/acquisition-agent/**",
        "**/tmp/**",
        "**/.claude/**",
        "**/* 2.html",
        "**/* 2.jsx",
        "**/* 2.js",
        "**/* 2.css",
        "**/* 2.json",
        "**/src/assets/academy-refs/**"
      ]
    }
  }
});
