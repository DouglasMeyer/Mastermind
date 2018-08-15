function firstOccurance(item, index, array) {
  return array.indexOf(item) === index;
}
function randInt(max) {
  return Math.floor(Math.random() * max);
}

const colors = ['red', 'green', 'blue', 'yellow', 'black', 'white'];

class MastermindGame {
  static overlap(key=[], colors=[]) {
    const matches = key.filter((k, i) => colors[i] === k).length;
    const misses = colors.filter(firstOccurance).reduce(
      (count, color) =>
        count + Math.min(
          key.filter(k => k === color).length,
          colors.filter(c => c === color).length
        ),
      0
    ) - matches;

    return { matches, misses };
  }

  constructor(colors=colors, repeats=true) {
    this.colors = colors;
    this.repeats = repeats;
    const pool = colors.slice();

    this.key = repeats
      ? new Array(4).fill().map(() => pool[randInt(pool.length)])
      : new Array(4).fill().map(() => pool.splice(randInt(pool.length), 1)[0]);
    this.turns = [];
  }

  guess(colors=[]) {
    const { matches, misses } = this.constructor.overlap(this.key, colors);

    const turn = { guess: colors, matches, misses };
    this.turns.push(turn);
    return turn;
  }
}
