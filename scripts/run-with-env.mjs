/**
 * Loads PORT (and other vars) from `.env`, then runs Next.js.
 * `next dev` does not reliably bind to PORT from `.env` alone — we pass `-p` from the file.
 */
import { spawn } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const envPath = resolve(root, ".env");

function loadDotEnv(filePath) {
  if (!existsSync(filePath)) {
    console.error(`Missing ${filePath}. Create it from .env.example.`);
    process.exit(1);
  }

  const text = readFileSync(filePath, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    // `.env` is the source of truth for local run scripts
    process.env[key] = value;
  }
}

loadDotEnv(envPath);

const port = process.env.PORT?.trim();
if (!port) {
  console.error("PORT is missing in .env. Set PORT=your_port and try again.");
  process.exit(1);
}

const mode = process.argv[2] || "dev";
if (mode !== "dev" && mode !== "start") {
  console.error(`Unknown mode "${mode}". Use: node scripts/run-with-env.mjs dev|start`);
  process.exit(1);
}

const nextBin = resolve(root, "node_modules", "next", "dist", "bin", "next");
const args = [nextBin, mode, "-p", port];

const child = spawn(process.execPath, args, {
  stdio: "inherit",
  env: process.env,
  cwd: root,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
