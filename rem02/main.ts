import { raw } from "./input";

const input = raw.split("\n");

const parse = (str: string) => {
  const chunks = str.split(" ");
  const nums = chunks[0].split("-").map((n) => parseInt(n));
  const [lo, hi] = nums;
  const char = chunks[1].split(":")[0];
  const password = chunks[2];
  return { lo, hi, char, password };
};

const check1 = (str: string) => {
  const { lo, hi, char, password } = parse(str);
  const count = password
    .split("")
    .reduce((a, c) => a + (c === char ? 1 : 0), 0);
  return count >= lo && count <= hi;
};

const check2 = (str: string) => {
  const { lo, hi, char, password } = parse(str);
  const first = password[lo - 1] === char;
  const second = password[hi - 1] === char;
  return (first && !second) || (!first && second);
};

const countValid = (func: (str: string) => boolean) =>
  input.reduce((a, c) => a + (func(c) ? 1 : 0), 0);

console.log("part 1:", countValid(check1));
console.log("part 2:", countValid(check2));
