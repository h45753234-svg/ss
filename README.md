# agency-orchestrator

A tiny, **zero-dependency** multi-agent orchestrator you can run straight from
your terminal. Type one command and watch a team of agents — Planner,
Researcher, Writer, Reviewer — collaborate on a task and hand off their work to
each other.

It runs **offline** and needs no API keys, so it's perfect for a first look at
how agent orchestration feels.

---

## 給完全新手的三步驟（繁體中文）

> 照著做就好，每一步都很短。

1. **裝 Node.js**：打開 [nodejs.org](https://nodejs.org)，下載 **LTS** 那個版本，
   一路按「下一步／同意」裝完就好。（這是工具運作的底座，裝一次以後就不用再碰。）

2. **打開「終端機」：**
   - **Mac**：按 `Cmd + 空白鍵`，打 `Terminal`，按 `Enter`
   - **Windows**：點開始，打 `PowerShell`，按 `Enter`

3. **把這行貼進去，按 `Enter`：**

   ```bash
   npx agency-orchestrator demo
   ```

   （第一次它可能問你要不要安裝，打 `y` 或直接按 `Enter`。）

完成！你會看到四個代理人（agent）一個接一個完成自己的工作，最後產出結果。

---

## Quick start (English)

1. Install **Node.js** (LTS) from <https://nodejs.org>.
2. Open your terminal (macOS: **Terminal**, Windows: **PowerShell**).
3. Run:

   ```bash
   npx agency-orchestrator demo
   ```

   (The first time, `npx` may ask to install it — type `y` or press `Enter`.)

## Commands

```bash
npx agency-orchestrator demo                 # run the demo
npx agency-orchestrator demo --goal "..."    # set your own goal
npx agency-orchestrator demo --slow          # slower, easier to follow
npx agency-orchestrator demo --fast          # no delays
npx agency-orchestrator help
npx agency-orchestrator version
```

## Use it in your own code

```js
import { runDemo, agents } from "agency-orchestrator";

await runDemo({ goal: "Plan a launch party" });
```

## How it works

The orchestrator runs each agent in turn over a shared `context` object. Each
agent reads what previous agents produced and adds its own contribution:

```
Planner → Researcher → Writer → Reviewer
```

Want to make it your own? Edit [`src/agents.js`](src/agents.js) — add, remove,
or reorder agents, and the orchestrator picks up the change automatically.

## Develop locally

```bash
git clone <this repo>
cd ss
node bin/cli.js demo
npm test
```

## License

MIT — see [LICENSE](LICENSE).
