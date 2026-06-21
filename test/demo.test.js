import { test } from "node:test";
import assert from "node:assert/strict";
import { runDemo, agents } from "../src/index.js";

test("ships the expected four agents", () => {
  assert.deepEqual(
    agents.map((a) => a.name),
    ["Planner", "Researcher", "Writer", "Reviewer"],
  );
});

test("runDemo completes and returns an approved, populated context", async () => {
  const context = await runDemo({
    goal: "Test the orchestrator",
    speed: 1000,
    silent: true,
  });
  assert.equal(context.goal, "Test the orchestrator");
  assert.ok(Array.isArray(context.plan) && context.plan.length > 0);
  assert.ok(Array.isArray(context.findings) && context.findings.length > 0);
  assert.match(context.draft, /Test the orchestrator/);
  assert.equal(context.approved, true);
});
