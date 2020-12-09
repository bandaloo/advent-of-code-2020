import { input } from "./input";

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

  let count = 0;
  for (const c of password) {
    if (c === char) count++;
  }

  return count >= lo && count <= hi;
};

const check2 = (str: string) => {
  const { lo, hi, char, password } = parse(str);
  let count = 0;
  if (password[lo - 1] === char) count++;
  if (password[hi - 1] === char) count++;
  return count === 1;
};

const countValid = (func: (str: string) => boolean) => {
  const lines = input.split("\n");
  let count = 0;
  for (const line of lines) {
    if (func(line)) count++;
  }

  return count;
};

console.log("part 1:", countValid(check1));
console.log("part 2:", countValid(check2));
