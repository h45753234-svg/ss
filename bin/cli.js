#!/usr/bin/env node
// Command-line entry point. Designed to be friendly to non-technical users:
// `npx agency-orchestrator demo` should just work, with no setup.

import { runDemo } from "../src/orchestrator.js";
import { color } from "../src/ui.js";

const HELP = `
${color.bold("agency-orchestrator")} — a tiny multi-agent orchestrator

${color.bold("Usage")}
  npx agency-orchestrator <command> [options]

${color.bold("Commands")}
  demo            Run a guided demo of a team of agents collaborating
  help            Show this help
  version         Show the version

${color.bold("Options (for demo)")}
  --goal "..."    Set the goal the agents work on
  --fast          Run with no delays
  --slow          Run with longer pauses (easier to follow)

${color.bold("Examples")}
  npx agency-orchestrator demo
  npx agency-orchestrator demo --goal "Plan a launch party"
`;

function parseArgs(argv) {
  const args = { _: [], goal: undefined, speed: 1 };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--goal") {
      args.goal = argv[i + 1];
      i += 1;
    } else if (a === "--fast") {
      args.speed = 1000;
    } else if (a === "--slow") {
      args.speed = 0.4;
    } else if (a === "-h" || a === "--help") {
      args._.push("help");
    } else if (a === "-v" || a === "--version") {
      args._.push("version");
    } else {
      args._.push(a);
    }
  }
  return args;
}

async function readVersion() {
  const { readFileSync } = await import("node:fs");
  const { fileURLToPath } = await import("node:url");
  const path = fileURLToPath(new URL("../package.json", import.meta.url));
  return JSON.parse(readFileSync(path, "utf8")).version;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || "demo";

  switch (command) {
    case "demo":
      await runDemo({ goal: args.goal, speed: args.speed });
      break;
    case "help":
      console.log(HELP);
      break;
    case "version":
      console.log(await readVersion());
      break;
    default:
      console.error(color.red(`Unknown command: ${command}`));
      console.log(HELP);
      process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(color.red("Something went wrong:"), err.message);
  process.exitCode = 1;
});
