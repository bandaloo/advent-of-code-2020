import { raw } from "./input";

const input = raw;

const arrFromStr = (str: string) => str.split("\n").map((s) => s.split(""));

const { rows, cols } = (() => {
  const temp = arrFromStr(input);
  return { rows: temp.length, cols: temp[0].length };
})();

const dirs = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

const outside = (i: number, j: number) =>
  i < 0 || i >= rows || j < 0 || j >= cols;

const occupied = (i: number, j: number, board: string[][]) => {
  if (outside(i, j)) return false;
  return board[i][j] === "#";
};

const neighbors = (i: number, j: number, board: string[][]) => {
  let count = 0;
  for (let k = 0; k < 8; k++) {
    if (occupied(i + dirs[k][0], j + dirs[k][1], board)) count++;
  }
  return count;
};

const sight = (i: number, j: number, board: string[][]) => {
  let count = 0;
  for (let k = 0; k < 8; k++) {
    let dist = 1;
    let x: number, y: number;
    while (
      ((x = i + dirs[k][0] * dist), (y = j + dirs[k][1] * dist), !outside(x, y))
    ) {
      if (board[x][y] !== ".") {
        if (board[x][y] === "#") count++;
        break;
      }
      dist++;
    }
  }
  return count;
};

const compare = (board1: string[][], board2: string[][]) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board1[i][j] !== board2[i][j]) return false;
    }
  }
  return true;
};

const filled = (board1: string[][]) => {
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board1[i][j] === "#") count++;
    }
  }
  return count;
};

const alg = (
  strategy: (i: number, j: number, board: string[][]) => number,
  limit: number
) => {
  let boards = [arrFromStr(input), arrFromStr(input)];
  let count = 0;
  while (true) {
    const curr = boards[count % 2];
    const next = boards[(count + 1) % 2];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        next[i][j] = curr[i][j];
        if (curr[i][j] !== ".") {
          const count = strategy(i, j, curr);
          if (curr[i][j] === "L") {
            if (count === 0) next[i][j] = "#";
          } else if (curr[i][j] === "#") {
            if (count >= limit) next[i][j] = "L";
          }
        }
      }
    }
    count++;
    if (compare(next, curr)) return filled(next);
  }
};

console.log("part 1:", alg(neighbors, 4));
console.log("part 2:", alg(sight, 5));
