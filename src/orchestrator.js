// The orchestrator runs each agent in sequence over a shared context,
// streaming progress to the terminal. Keeping it a plain async loop makes the
// flow easy to read and easy to extend with new agents.

import { agents } from "./agents.js";
import { color, rule, spinner, sleep } from "./ui.js";

export async function runDemo({ goal = "Announce our new product", speed = 1, silent = false } = {}) {
  const context = { goal };
  // `silent` lets callers (e.g. tests) drive the loop without printing.
  const log = silent ? () => {} : (...args) => console.log(...args);

  log();
  log(color.bold("  Agency Orchestrator") + color.gray("  ·  demo"));
  log(color.gray(`  Goal: ${goal}`));
  log();
  log(rule("the team"));
  for (const agent of agents) {
    log(`  ${agent.badge}  ${color.gray("— " + agent.role)}`);
  }
  log();
  log(rule("working"));

  for (const agent of agents) {
    const spin = silent ? { succeed() {} } : spinner(`${agent.name} is working…`);
    await sleep(450 / speed);
    const output = agent.run(context);
    spin.succeed(`${agent.badge}`);
    log(`     ${String(output).replace(/\n/g, "\n     ")}`);
    log();
  }

  log(rule("result"));
  log(`  ${color.bold("Draft:")} ${context.draft}`);
  log(
    "  " +
      (context.approved
        ? color.green("✔ Approved by the Reviewer.")
        : color.yellow("● Needs another pass.")),
  );
  log();
  log(
    color.gray(
      "  That's the whole loop: plan → research → write → review.\n" +
        "  Swap in your own agents in src/agents.js to make it yours.",
    ),
  );
  log();

  return context;
}
