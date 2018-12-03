const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("data.txt"),
  crlfDelay: Infinity
});

const lines = [];

rl.on("line", line => {
  const lineCounts = line.split("").reduce((prev, c) => {
    prev.push(line.split(c).length - 1);
    return prev;
  }, []);
  lines.push(lineCounts);
});

rl.on("close", () => {
  const { twos, threes } = lines.reduce(
    ({ twos, threes }, line) => {
      twos += line.includes(2) ? 1 : 0;
      threes += line.includes(3) ? 1 : 0;
      return { twos, threes };
    },
    { twos: 0, threes: 0 }
  );
  console.log(`twos: ${twos}, threes: ${threes}`);
  console.log(twos * threes);
});
