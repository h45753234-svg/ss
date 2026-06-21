// Tiny terminal UI helpers. Zero dependencies so `npx` works offline.

// Honor NO_COLOR and non-TTY output so logs stay clean when piped or redirected.
const colorEnabled =
  process.env.NO_COLOR === undefined &&
  process.env.TERM !== "dumb" &&
  Boolean(process.stdout.isTTY);

const codes = {
  reset: 0,
  bold: 1,
  dim: 2,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  gray: 90,
};

function wrap(name, text) {
  if (!colorEnabled) return String(text);
  return `[${codes[name]}m${text}[${codes.reset}m`;
}

export const color = Object.fromEntries(
  Object.keys(codes)
    .filter((k) => k !== "reset")
    .map((name) => [name, (text) => wrap(name, text)]),
);

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

// A spinner that degrades gracefully when there is no interactive terminal.
export function spinner(label) {
  if (!process.stdout.isTTY) {
    process.stdout.write(`  ${label}\n`);
    return {
      succeed(message) {
        process.stdout.write(`  ${color.green("✔")} ${message ?? label}\n`);
      },
    };
  }

  let i = 0;
  const render = () => {
    const frame = spinnerFrames[i % spinnerFrames.length];
    process.stdout.write(`\r  ${color.cyan(frame)} ${label}   `);
    i += 1;
  };
  render();
  const timer = setInterval(render, 80);

  return {
    succeed(message) {
      clearInterval(timer);
      process.stdout.write(`\r  ${color.green("✔")} ${message ?? label}   \n`);
    },
  };
}

export function rule(label = "") {
  const width = Math.min(process.stdout.columns || 60, 60);
  const text = label ? ` ${label} ` : "";
  const dashes = Math.max(0, width - text.length);
  const left = Math.floor(dashes / 2);
  const right = dashes - left;
  return color.gray("─".repeat(left) + text + "─".repeat(right));
}
