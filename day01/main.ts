import { input } from "./input";

const part1 = () => {
  for (let i = 0; i < input.length; i++) {
    const num1 = input[i];
    for (let j = i; j < input.length; j++) {
      const num2 = input[j];
      if (num1 + num2 === 2020) {
        return num1 * num2;
      }
    }
  }
};

const part2 = () => {
  for (let i = 0; i < input.length; i++) {
    const num1 = input[i];
    for (let j = i; j < input.length; j++) {
      const num2 = input[j];
      for (let k = j; k < input.length; k++) {
        const num3 = input[k];
        if (num1 + num2 + num3 === 2020) {
          return num1 * num2 * num3;
        }
      }
    }
  }
};

console.log("part 1:", part1());
console.log("part 2:", part2());
