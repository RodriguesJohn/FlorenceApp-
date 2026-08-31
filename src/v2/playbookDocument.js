import { marked } from "marked";
import source from "./playbookDocument.md?raw";

function slug(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

marked.use({
  gfm: true,
  renderer: {
    heading({ tokens, depth, text }) {
      const html = this.parser.parseInline(tokens);
      return `<h${depth} id="${slug(text)}">${html}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const html = this.parser.parseInline(tokens);
      const safe = href || "";
      const titleAttr = title ? ` title="${title}"` : "";
      const external = /^https?:\/\//.test(safe);
      const extra = external ? ' target="_blank" rel="noreferrer"' : "";
      const plain = html.replace(/<[^>]*>/g, "");
      const label =
        external && (plain === safe || plain === `<${safe}>`)
          ? (() => {
              try {
                const url = new URL(safe);
                const host = url.hostname.replace(/^www\./, "");
                const path = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
                return `${host}${path}`;
              } catch {
                return html;
              }
            })()
          : html;
      return `<a class="playbook-doc-link" href="${safe}"${titleAttr}${extra}>${label}</a>`;
    }
  }
});

const body = source.replace(/^---[\s\S]*?\n---\n/, "");
const chunks = body.split(/(?=^## \d{2})/m);
const coverMarkdown = chunks[0].trim();

export const playbookCoverHtml = marked.parse(coverMarkdown);

export const playbookParts = chunks.slice(1).map((chunk) => {
  const text = chunk.trim();
  const heading = text.match(/^## (.+)$/m)?.[1] || "";
  const rest = text.replace(/^## .+\n/, "");
  const id = slug(heading);
  return {
    id,
    href: `#${id}`,
    title: heading,
    html: marked.parse(rest)
  };
});

export const playbookToc = playbookParts.map(({ title, href }) => ({ title, href }));
