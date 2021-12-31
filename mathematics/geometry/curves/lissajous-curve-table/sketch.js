let angle = 0;
let columns = 0;
let rows = 0;
let marker_radius = 0;
let curves = [];
const buffer = 10;
const column_width = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = floor(width / column_width - 1);
  rows = floor(height / column_width - 1);
  marker_radius = column_width / 2 - buffer;
  for (let row = 0; row < rows; row++) {
    curves[row] = [];
    for (let column = 0; column < columns; column++) {
      curves[row][column] = new Curve();
    }
  }
}

function draw() {
  background(51);

  noFill();
  stroke(255);
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const base = { column, row, marker_radius };
      const columnX = (column * column_width) + column_width / 2;
      const columnY = (row * column_width) + column_width / 2;

      addColumn({ ...base, cx: column_width + columnX, cy: column_width / 2 });
      addRow({ ...base, cx: column_width / 2, cy: column_width + columnY });
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      curves[row][column].addPoint();
      curves[row][column].show();
    }
  }

  angle -= 0.01;

  if (angle < -TWO_PI) {
    angle = 0;
    resetCurves();
    noLoop();
  }
}

function addColumn({ column, row, cx, cy, marker_radius }) {
  // column circle
  strokeWeight(1);
  stroke(255);
  ellipse(cx, cy, marker_radius * 2, marker_radius * 2);

  // column line anchor
  let x = marker_radius * cos(angle * (column + 1) - HALF_PI);
  let y = marker_radius * sin(angle * (column + 1) - HALF_PI);
  strokeWeight(8);
  stroke(255);
  point(cx + x, cy + y);

  // column -> row line
  stroke(255, 150);
  strokeWeight(1);
  line(cx + x, 0, cx + x, height);
  curves[row][column].setX(cx + x);
}

function addRow({ column, row, cx, cy, marker_radius }) {
  // row circle
  strokeWeight(1);
  stroke(255);
  ellipse(cx, cy, marker_radius * 2, marker_radius * 2);
  let x = marker_radius * cos(angle * (row + 1) - HALF_PI);
  let y = marker_radius * sin(angle * (row + 1) - HALF_PI);

  // row line anchor
  strokeWeight(8);
  stroke(255);
  point(cx + x, cy + y);

  // row -> column line
  stroke(255, 150);
  strokeWeight(1);
  line(0, cy + y, width, cy + y);
  curves[row][column].setY(cy + y);
}

function resetCurves() {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      curves[row][column].reset();
    }
  }
}