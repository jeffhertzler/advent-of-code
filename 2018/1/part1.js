const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('data.txt'),
  crlfDelay: Infinity,
});

let sum = 0;

const add = (i, j) => i + j;
const sub = (i, j) => i - j;

rl.on('line', line => {
  const [match, sign, num] = line.match(/([+-])(.*)/);
  const op = sign === '+' ? add : sub;
  sum = op(sum, parseInt(num, 10));
});

rl.on('close', () => {
  console.log(sum);
});
