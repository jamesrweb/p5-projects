let grid = null;
let rows = null;
let columns = null;
let resolution = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = floor(width / resolution);
  rows = floor(height / resolution);
  grid = constructGrid(columns, rows);
  initialiseGame(grid);
}

function draw() {
  background(0);
  drawCells(grid);
  grid = computeNextGeneration(grid);
}

function constructGrid(columns, rows) {
  const grid = new Array(columns);

  for (let index = 0; index < grid.length; index++) {
    grid[index] = new Array(rows);
  }

  return grid;
}

function initialiseGame(grid) {
  for (let outer = 0; outer < columns; outer++) {
    for (let inner = 0; inner < rows; inner++) {
      grid[outer][inner] = floor(random(2));
    }
  }
}

function drawCells(grid) {
  for (let outer = 0; outer < columns; outer++) {
    for (let inner = 0; inner < rows; inner++) {
      const x = outer * resolution;
      const y = inner * resolution;

      if (grid[outer][inner] === 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution, resolution);
      }
    }
  }
}

function computeNextGeneration(grid) {
  const next_generation = constructGrid(columns, rows);

  for (let outer = 0; outer < columns; outer++) {
    for (let inner = 0; inner < rows; inner++) {
      const state = grid[outer][inner];
      const neighbours = countCellNeighbours(grid, createVector(outer, inner));

      if (state === 0 && neighbours === 3) {
        next_generation[outer][inner] = 1;
      } else if (state === 1 && (neighbours < 2 || neighbours > 3)) {
        next_generation[outer][inner] = 0;
      } else {
        next_generation[outer][inner] = state;
      }
    }
  }

  return next_generation;
}

function countCellNeighbours(grid, { x, y }) {
  let sum = 0;

  for (let outer = -1; outer < 2; outer++) {
    for (let inner = -1; inner < 2; inner++) {
      const column = (x + outer + columns) % columns;
      const row = (y + inner + rows) % rows;
      sum += grid[column][row];
    }
  }

  sum -= grid[x][y];

  return sum;
}
