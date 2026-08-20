import { spawn } from "node:child_process";
import { createConnection } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "127.0.0.1";
const PORT = 5173;
const CHECK_MS = 8000;
const STARTUP_GRACE_MS = 25000;

let child = null;
let stopping = false;
let startingAt = 0;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isListening() {
  return new Promise((resolve) => {
    const socket = createConnection({ host: HOST, port: PORT });
    socket.setTimeout(800);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function startDev() {
  if (stopping) return;
  if (child && !child.killed) return;

  startingAt = Date.now();
  console.log(`[keep-alive] Starting Vite on ${HOST}:${PORT}`);
  child = spawn("npm", ["run", "dev"], {
    cwd: root,
    stdio: "inherit",
    env: process.env
  });

  child.on("exit", (code, signal) => {
    console.error(`[keep-alive] Dev process exited (${signal || code})`);
    child = null;
  });
}

function stopChild() {
  if (!child) return;
  const current = child;
  child = null;
  current.kill("SIGTERM");
  setTimeout(() => {
    if (!current.killed) current.kill("SIGKILL");
  }, 1500);
}

process.on("SIGINT", () => {
  stopping = true;
  stopChild();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stopping = true;
  stopChild();
  process.exit(0);
});

async function loop() {
  if (!(await isListening())) startDev();

  while (!stopping) {
    await wait(CHECK_MS);
    if (stopping) break;
    if (await isListening()) continue;

    const withinStartup = child && Date.now() - startingAt < STARTUP_GRACE_MS;
    if (withinStartup) {
      console.log("[keep-alive] Waiting for Vite to bind 5173…");
      continue;
    }

    console.error("[keep-alive] Port 5173 is down. Restarting…");
    stopChild();
    await wait(2000);
    startDev();
  }
}

loop();
