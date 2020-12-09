import { raw } from "./input";

const input = raw.split("\n");

const trees = (right: number, down: number) => {
  const width = input[0].length;
  const height = input.length;
  let x = 0;
  let y = 0;
  let count = 0;
  while (y < height) {
    if (input[y][x] == "#") count++;
    x = (x + right) % width;
    y += down;
  }
  return count;
};

console.log("part 1:", trees(3, 1));
console.log(
  "part 2:",
  trees(1, 1) * trees(3, 1) * trees(5, 1) * trees(7, 1) * trees(1, 2)
);
