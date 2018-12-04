const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('data.txt'),
  crlfDelay: Infinity,
});

const range = (size, startAt = 0) => {
  return [...Array(size).keys()].map(i => i + startAt);
};

let squares = [];

rl.on('line', line => {
  const [match, id, l, t, w, h] = line.match(/^#(.+) @ (.+),(.+): (.+)x(.+)$/);
  squares.push({ id, l, t, w, h });
});

rl.on('close', () => {
  const coords = squares.reduce(
    ({ vals, repeats }, { l, t, w, h }) => {
      const xs = range(parseInt(w, 10), parseInt(l, 10));
      const ys = range(parseInt(h, 10), parseInt(t, 10));
      const coords = xs
        .map(x => {
          return ys.map(y => `${x},${y}`);
        })
        .reduce((prev, arr) => prev.concat(arr));

      coords.forEach(coord => {
        if (vals.has(coord)) {
          repeats.add(coord);
        }
        vals.add(coord);
      });
      return { vals, repeats };
    },
    { vals: new Set(), repeats: new Set() }
  );
  console.log(coords.repeats.size);
});
