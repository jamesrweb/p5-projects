function Board(rows, columns) {
  const board = [];
  for (let outer = 0; outer < columns; outer++) {
    const row = [];
    for (let inner = 0; inner < columns; inner++) {
      row.push({
        value: "",
        x: null,
        y: null,
        w: null,
        h: null
      });
    }
    board.push(row);
  }
  return board;
}

let currentPlayer = null;
const rows = 3;
const columns = 3;
const board = Board(rows, columns);
const players = ["X", "O"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentPlayer = random(players);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);

  const w = width / 3;
  const h = height / 3;

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (const [outer, row] of board.entries()) {
    for (const [inner, column] of row.entries()) {
      const x = w * inner + w / 2;
      const y = h * outer + h / 2;

      column.x = x;
      column.y = y;
      column.w = w;
      column.h = h;

      if (column.value === players[0]) {
        const xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      } else if (column.value === players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      }
    }
  }
}

function mousePressed(event) {
  const { x, y } = event;
  insertChoice(x, y);
}

function insertChoice(x, y) {
  for (const [_, row] of board.entries()) {
    for (const [_, column] of row.entries()) {
      if (column.value) continue;

      const withinX = x < column.x + column.w / 2 && x > column.x - column.w / 2;
      const withinY = y < column.y + column.h / 2 && y > column.y - column.h / 2;
      if (withinX && withinY) {
        column.value = currentPlayer;
        currentPlayer = players.filter(p => p !== currentPlayer)[0];
        break;
      }
    }
  }
}