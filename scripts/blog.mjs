import { readdirSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { marked } from "marked";

export const SITE = "https://www.humanaistudio.io";
export const ROOT = resolve(import.meta.dirname, "..");
export const CONTENT_DIR = join(ROOT, "content/blog");

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC"
});

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// The blog only needs a small, predictable subset of YAML frontmatter. Keeping
// that parser here avoids loading gray-matter's legacy js-yaml dependency while
// Vite is starting (which can stall before the dev server binds to its port).
const parseFrontmatterValue = (raw) => {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);

  if (value.startsWith('"') && value.endsWith('"')) {
    return JSON.parse(value);
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      return JSON.parse(value);
    } catch {
      return value
        .slice(1, -1)
        .split(",")
        .map((item) => parseFrontmatterValue(item));
    }
  }

  return value;
};

const parseFrontmatter = (source, filename) => {
  const normalized = source.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) return { data: {}, content: normalized };

  const closing = normalized.indexOf("\n---\n", 4);
  if (closing === -1) throw new Error(`${filename}: unclosed frontmatter`);

  const data = {};
  for (const line of normalized.slice(4, closing).split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = line.indexOf(":");
    if (separator === -1) throw new Error(`${filename}: invalid frontmatter line "${line}"`);

    const key = line.slice(0, separator).trim();
    data[key] = parseFrontmatterValue(line.slice(separator + 1));
  }

  return { data, content: normalized.slice(closing + 5) };
};

/**
 * Reads every non-draft post, newest first. Each post carries the rendered body
 * plus the headings we need for the article's anchor navigation.
 */
export function loadPosts() {
  return readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.replace(/\.md$/, "");
      const { data, content } = parseFrontmatter(
        readFileSync(join(CONTENT_DIR, name), "utf8"),
        name
      );

      if (!data.title) throw new Error(`${name}: missing "title" in frontmatter`);
      if (!data.date) throw new Error(`${name}: missing "date" in frontmatter`);

      const headings = [];
      const renderer = new marked.Renderer();
      renderer.heading = ({ tokens, depth }) => {
        const text = tokens.map((t) => t.raw).join("");
        const id = slugify(text);
        if (depth === 2) headings.push({ id, text });
        return `<h${depth} id="${id}">${escapeHtml(text)}</h${depth}>\n`;
      };

      return {
        slug,
        url: `/blog/${slug}`,
        title: data.title,
        description: data.description ?? "",
        date: data.date,
        dateLabel: DATE_FMT.format(new Date(`${data.date}T00:00:00Z`)),
        author: data.author ?? "John Rodrigues",
        tags: data.tags ?? [],
        draft: Boolean(data.draft),
        headings,
        body: marked.parse(content, { renderer })
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

const head = ({ title, description, canonical, type }) => `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="Human AI Studio" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${SITE}/og.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Human AI Studio" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${SITE}/og.jpg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&display=swap" />
    <link rel="stylesheet" href="/blog.css?v=20260821-home-blur" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TYCCEQBP58"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "G-TYCCEQBP58");
    </script>
    <script type="text/javascript">
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
            else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "15min", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;
      Cal.ns["15min"]("ui", { hideEventTypeDetails: false, layout: "month_view" });
    </script>`;

const chrome = (inner) => `<!doctype html>
<html lang="en">
  <head>${inner.head}
    ${inner.schema}
  </head>
  <body class="blog-body">
    <nav class="nav nav-dark" aria-label="Primary">
      <a class="brand" href="/" aria-label="Human AI Studio home">
        <span class="brand-mark" aria-hidden="true"></span>
        Human AI Studio
      </a>
      <div class="nav-actions">
        <nav class="nav-direct" aria-label="Site navigation">
          <a class="nav-direct-link" href="/">Studio</a>
          <a class="nav-direct-link" href="/academy">Academy</a>
          <div class="nav-menu" data-nav-menu>
            <button
              type="button"
              class="nav-direct-link nav-menu-trigger nav-menu-trigger--icon"
              aria-expanded="false"
              aria-haspopup="menu"
              aria-controls="primary-nav-menu"
              aria-label="Open menu"
              data-nav-trigger
            >
              <svg class="nav-menu-icon" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 3.75h9M2.5 7h9M2.5 10.25h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
            <div class="nav-menu-panel" id="primary-nav-menu" role="menu" hidden data-nav-panel>
              <a class="nav-menu-item" href="/" role="menuitem">Studio</a>
              <a class="nav-menu-item" href="/academy" role="menuitem">Academy</a>
              <a class="nav-menu-item" href="/workshop" role="menuitem">Workshop</a>
              <div class="nav-menu-divider" role="separator" aria-hidden="true"></div>
              <a class="nav-menu-item nav-menu-item--nested" href="/case-studies" role="menuitem">All work</a>
              <a class="nav-menu-item nav-menu-item--nested" href="/florence" role="menuitem">Florence</a>
              <a class="nav-menu-item nav-menu-item--nested" href="/tools" role="menuitem">Tools</a>
              <a class="nav-menu-item nav-menu-item--nested is-active" href="/blog" role="menuitem" aria-current="page">Blog</a>
              <div class="nav-menu-divider" role="separator" aria-hidden="true"></div>
              <a
                class="nav-menu-item"
                href="https://cal.com/john-rodrigues-rqt2lg/15min"
                role="menuitem"
                data-cal-link="john-rodrigues-rqt2lg/15min"
                data-cal-namespace="15min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              >Book a call</a>
            </div>
          </div>
        </nav>
      </div>
    </nav>
${inner.body}
    <div class="page-bottom-blur" aria-hidden="true"></div>
    <footer class="blog-footer">
      <p>&copy; ${new Date().getUTCFullYear()} Human AI Studio</p>
      <a href="/">Back to the studio</a>
    </footer>
    <script>
      // Mirrors NavMenu.jsx: the panel is fixed-positioned against the trigger,
      // so it has to be measured on open, resize and scroll.
      (function () {
        var root = document.querySelector("[data-nav-menu]");
        if (!root) return;
        var trigger = root.querySelector("[data-nav-trigger]");
        var panel = root.querySelector("[data-nav-panel]");

        function place() {
          var rect = trigger.getBoundingClientRect();
          panel.style.top = Math.round(rect.bottom + 10) + "px";
          panel.style.right = Math.round(window.innerWidth - rect.right) + "px";
        }

        function setOpen(open) {
          root.classList.toggle("is-open", open);
          trigger.setAttribute("aria-expanded", String(open));
          panel.hidden = !open;
          if (open) place();
        }

        trigger.addEventListener("click", function () {
          setOpen(panel.hidden);
        });
        document.addEventListener("pointerdown", function (event) {
          if (!root.contains(event.target)) setOpen(false);
        });
        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") setOpen(false);
        });
        window.addEventListener("resize", function () {
          if (!panel.hidden) place();
        });
        window.addEventListener("scroll", function () {
          if (!panel.hidden) place();
        }, true);
      })();
    </script>
  </body>
</html>
`;

/** Article page — the OpenAI-style editorial layout. */
export function renderPost(post) {
  const canonical = `${SITE}${post.url}`;

  return chrome({
    head: head({
      title: `${post.title} | Human AI Studio`,
      description: post.description,
      canonical,
      type: "article"
    }),
    schema: `<script type="application/ld+json">
${JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Human AI Studio" },
    mainEntityOfPage: canonical
  },
  null,
  2
)}
    </script>`,
    body: `    <main class="article">
      <header class="article__head">
        <p class="article__meta">
          <time datetime="${post.date}">${post.dateLabel}</time>
          <span aria-hidden="true">·</span>
          <span>By ${escapeHtml(post.author)}</span>
        </p>
        <h1>${escapeHtml(post.title)}</h1>
        ${post.description ? `<p class="article__standfirst">${escapeHtml(post.description)}</p>` : ""}
      </header>
      <div class="article__body">
${post.body}
      </div>
      <aside class="article__cta">
        <p>I run design systems and AI product work through Human AI Studio.</p>
        <a href="/design-systems">See how we work &rarr;</a>
      </aside>
    </main>`
  });
}

/** Index page — a quiet, dense list rather than a card grid. */
export function renderIndex(posts) {
  return chrome({
    head: head({
      title: "Blog | Human AI Studio",
      description:
        "Notes on design systems, AI-native product work, and building software with agents, from Human AI Studio.",
      canonical: `${SITE}/blog`,
      type: "website"
    }),
    schema: "",
    body: `    <main class="index">
      <header class="index__head">
        <h1>Blog</h1>
        <p>Notes on design systems, AI-native product work, and building software with agents.</p>
      </header>
      <ol class="index__list">
${posts
  .map(
    (post) => `        <li class="index__item">
          <a href="${post.url}">
            <time datetime="${post.date}">${post.dateLabel}</time>
            <h2>${escapeHtml(post.title)}</h2>
            <p>${escapeHtml(post.description)}</p>
          </a>
        </li>`
  )
  .join("\n")}
      </ol>
    </main>`
  });
}
