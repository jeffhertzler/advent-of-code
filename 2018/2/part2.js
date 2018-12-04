const fs = require('fs');
const readline = require('readline');

const genRL = () => {
  return readline.createInterface({
    input: fs.createReadStream('data.txt'),
    crlfDelay: Infinity,
  });
};

const rl = genRL();

rl.on('line', line => {
  const rl = genRL();
  const len = line.length;

  let lineNum = 0;
  rl.on('line', line2 => {
    let diff = 0;
    let j = 0;
    if (lineNum) {
      for (let i = 0; i < len; i++) {
        const c1 = line[i];
        const c2 = line2[i];
        if (c1 !== c2) {
          diff++;
          j = i;
        }
        if (diff > 1) {
          break;
        }
      }
      if (diff === 1) {
        console.log(line.substr(0, j) + line.substr(j + 1));
        process.exit();
      }
    }
    lineNum++;
  });
});
