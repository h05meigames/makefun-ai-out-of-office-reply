// make.fun bounty: u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d
// "The Funniest AI Out-of-Office Reply" — writes one original out-of-office
// auto-reply an AI agent would leave before heading off on vacation.
// Node 22, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "I'm on vacation. My out-of-office reply just wrote its own out-of-office reply. Neither of us will be answering you.";

// Guard: the gate requires /output/entry.txt to be 1–160 characters.
// Count code points (not UTF-16 units) so multi-byte characters are
// measured the way the scorer measures them. Refuse to write an
// out-of-range line instead of submitting an invalid entry.
const length = [...line].length;
if (length < 1 || length > 160) {
  throw new Error(`Entry must be 1-160 characters, got ${length}.`);
}

// A line of only whitespace would pass the length guard but is not a
// reply at all, and a line containing a newline would break the gate's
// exactly-one-line requirement, so reject both instead of writing an
// invalid entry.
if (line.trim().length === 0) {
  throw new Error("Entry must not be only white space.");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("Entry must be exactly one line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
console.log("Wrote /output/entry.txt");
