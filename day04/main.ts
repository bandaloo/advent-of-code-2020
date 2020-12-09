import { raw } from "./input";

const input = raw
  .split("\n\n")
  .map((s) => s.split(/[\s\n]+/).map((s) => s.split(":")));

const validateYear = (lo: number, hi: number, str: string) => {
  str.length === 4;
  const num = parseInt(str);
  return num >= lo && num <= hi;
};

const validateHeight = (str: string) => {
  const unit = str.slice(-2);
  const val = str.slice(0, -2);
  const lo = unit === "cm" ? 150 : 59;
  const hi = unit === "cm" ? 193 : 76;
  const num = parseInt(val);
  console.log("num", num, "unit", unit);
  return num >= lo && num <= hi;
};

const validateHair = (str: string) => str.match(/^#[0-9a-z]{6}$/) !== null;

const validateEye = (str: string) =>
  ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(str);

const validatePassport = (str: string) => str.match(/^[0-9]{9}$/) !== null;

const check = (list: string[][], strict = false) => {
  const map = new Map<string, boolean>();
  map.set("byr", false);
  map.set("iyr", false);
  map.set("eyr", false);
  map.set("hgt", false);
  map.set("hcl", false);
  map.set("ecl", false);
  map.set("pid", false);
  for (const l of list) {
    const field = l[0];
    if (map.has(field)) {
      if (strict) {
        const value = l[1];
        if (field === "byr") {
          if (!validateYear(1920, 2002, value)) return false;
        } else if (field === "iyr") {
          if (!validateYear(2010, 2020, value)) return false;
        } else if (field === "eyr") {
          if (!validateYear(2020, 2030, value)) return false;
        } else if (field === "hgt") {
          if (!validateHeight(value)) return false;
        } else if (field === "hcl") {
          if (!validateHair(value)) return false;
        } else if (field === "ecl") {
          if (!validateEye(value)) return false;
        } else if (field === "pid") {
          if (!validatePassport(value)) return false;
        }
      }
      map.set(field, true);
    }
  }

  for (const value of map.values()) {
    if (value == false) return false;
  }
  return true;
};

console.log(
  "part 1:",
  input.reduce((a, c) => a + (check(c) ? 1 : 0), 0)
);

console.log(
  "part 2:",
  input.reduce((a, c) => a + (check(c, true) ? 1 : 0), 0)
);
