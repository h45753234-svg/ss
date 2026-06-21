// The cast of agents the orchestrator coordinates. Each agent is a small,
// pure-ish object: given a shared `context`, it produces a result that the
// next agent can build on. The "work" here is simulated (no network calls) so
// the demo runs anywhere, instantly, and offline.

import { color } from "./ui.js";

export const agents = [
  {
    name: "Planner",
    badge: color.magenta("◆ Planner"),
    role: "Breaks the goal into concrete steps.",
    run(context) {
      const steps = [
        `Clarify the goal: "${context.goal}"`,
        "Identify the audience and the single key message",
        "Draft an outline",
        "Review for clarity and tone",
      ];
      context.plan = steps;
      return steps.map((s, i) => `${i + 1}. ${s}`).join("\n");
    },
  },
  {
    name: "Researcher",
    badge: color.blue("◆ Researcher"),
    role: "Gathers supporting facts and angles.",
    run(context) {
      const findings = [
        "Audience responds best to a concrete, single takeaway",
        "Short sentences outperform long ones for recall",
        "Leading with the benefit beats leading with the feature",
      ];
      context.findings = findings;
      return findings.map((f) => `• ${f}`).join("\n");
    },
  },
  {
    name: "Writer",
    badge: color.yellow("◆ Writer"),
    role: "Turns the plan and research into a draft.",
    run(context) {
      const draft = `${context.goal} — in one line: ` +
        "lead with the benefit, keep it short, end with a clear next step.";
      context.draft = draft;
      return draft;
    },
  },
  {
    name: "Reviewer",
    badge: color.green("◆ Reviewer"),
    role: "Checks the draft and signs off.",
    run(context) {
      const checks = [
        ["Matches the goal", true],
        ["Backed by research", Boolean(context.findings?.length)],
        ["One clear takeaway", true],
      ];
      context.review = checks;
      const allPass = checks.every(([, ok]) => ok);
      context.approved = allPass;
      return checks
        .map(([label, ok]) => `${ok ? color.green("\u2714") : color.red("\u2718")} ${label}`)
        .join("\n");
    },
  },
];
