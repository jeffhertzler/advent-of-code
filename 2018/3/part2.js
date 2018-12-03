const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("data.txt"),
  crlfDelay: Infinity
});

const range = (size, startAt = 0) => {
  return [...Array(size).keys()].map(i => i + startAt);
};

let squares = [];

rl.on("line", line => {
  const [match, id, l, t, w, h] = line.match(/^#(.+) @ (.+),(.+): (.+)x(.+)$/);
  squares.push({ id, l, t, w, h });
});

rl.on("close", () => {
  const map = squares.reduce((prev, { id, l, t, w, h }) => {
    const xs = range(parseInt(w, 10), parseInt(l, 10));
    const ys = range(parseInt(h, 10), parseInt(t, 10));
    const coords = xs
      .map(x => {
        return ys.map(y => `${x},${y}`);
      })
      .reduce((prev, arr) => prev.concat(arr));
    prev[id] = coords;
    return prev;
  }, {});

  const { vals, repeats, none } = Object.entries(map).reduce(
    ({ vals, repeats, none }, [id, coords]) => {
      let match = 0;
      coords.forEach(coord => {
        if (vals.has(coord)) {
          match++;
          repeats.add(coord);
        }
        vals.add(coord);
      });
      none = !match ? [...none, id] : none;
      return { vals, repeats, none };
    },
    {
      vals: new Set(),
      repeats: new Set(),
      none: []
    }
  );

  const id = none.find(id => map[id].every(coord => !repeats.has(coord)));

  console.log(id);
});
