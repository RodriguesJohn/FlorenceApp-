import { createServer } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const server = await createServer({
  configFile: path.join(root, "vite.config.js"),
  root,
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
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
