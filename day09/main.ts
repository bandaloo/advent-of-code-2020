import { raw } from "./input";

const input = raw.split("\n").map((n) => parseInt(n));

const part1 = () => {
  const prev25 = [];
  for (const num of input) {
    if (prev25.length < 25) {
      prev25.push(num);
      continue;
    }

    let foundSum = false;
    for (let i = 0; i < prev25.length; i++) {
      for (let j = i + 1; j < prev25.length; j++) {
        if (prev25[i] + prev25[j] === num) {
          foundSum = true;
        }
      }
    }

    if (!foundSum) return num;
    prev25.push(num);
    prev25.shift();
  }
};

const part2 = () => {
  const invalid = part1();
  for (let i = 0; i < input.length; i++) {
    let sum = 0;
    for (let j = i; j < input.length; j++) {
      sum += input[j];
      if (sum == invalid) {
        const res = input.slice(i, j + 1).sort();
        return res[0] + res[res.length - 1];
      }
      if (sum > invalid) continue;
    }
  }
};

console.log("part1:", part1());
console.log("part2:", part2());
