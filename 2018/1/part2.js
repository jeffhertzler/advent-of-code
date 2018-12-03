const fs = require("fs");
const readline = require("readline");

let sum = 0;
let freq = [];
let found = false;

const add = (i, j) => i + j;
const sub = (i, j) => i - j;

const read = () => {
  const input = fs.createReadStream("data.txt");
  const rl = readline.createInterface({
    input,
    crlfDelay: Infinity
  });

  rl.on("line", line => {
    const [match, sign, num] = line.match(/([+-])(.*)/);
    const op = sign === "+" ? add : sub;
    sum = op(sum, parseInt(num, 10));
    if (freq.includes(sum)) {
      input.destroy();
      console.log(sum);
      process.exit();
    } else {
      freq.push(sum);
    }
  });

  rl.on("close", () => {
    read();
  });
};

read();
