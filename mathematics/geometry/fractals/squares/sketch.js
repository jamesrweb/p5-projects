const initial_side_length = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  noFill();
  drawSquareFractal(0, 0, initial_side_length);
}

function getRandomInt(min, max) {
  const s = Math.ceil(min);
  const l = Math.floor(max);
  return Math.floor(Math.random() * (l - s + 1)) + s;
}

function drawSquareFractal(x, y, sideLength) {
  if (sideLength < 1) return;
  rectMode(CENTER);
  stroke(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));
  rect(x, y, sideLength, sideLength);
  const newSize = sideLength / 2;
  drawSquareFractal(x, y - newSize, newSize);
  drawSquareFractal(x + newSize, y + newSize, newSize);
  drawSquareFractal(x - newSize, y + newSize, newSize);
}
