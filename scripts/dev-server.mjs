import { createServer } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hostArgIndex = process.argv.indexOf("--host");
const portArgIndex = process.argv.indexOf("--port");
const host = hostArgIndex === -1 ? "127.0.0.1" : process.argv[hostArgIndex + 1] || "0.0.0.0";
const port = portArgIndex === -1 ? 5173 : Number(process.argv[portArgIndex + 1]) || 5173;

const server = await createServer({
  configFile: path.join(root, "vite.config.js"),
  root,
  server: {
    host,
    port,
    strictPort: true,
    allowedHosts: "all",
    watch: {
      ignored: [
        "**/MyPortfolio/**",
        "**/backups/**",
        "**/versions/**",
        "**/acquisition-agent/**",
        "**/tmp/**",
        "**/.claude/**",
        "**/* 2.html",
        "**/* 2.jsx",
        "**/* 2.js",
        "**/* 2.css",
        "**/* 2.json",
        "**/.git/**"
      ]
    }
  }
});

await server.listen();
server.printUrls();
