const initial_diameter = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  noFill();
  drawCircleFractal(0, 0, initial_diameter);
}

function getRandomInt(min, max) {
  const s = Math.ceil(min);
  const l = Math.floor(max);
  return Math.floor(Math.random() * (l - s + 1)) + s;
}

function drawCircleFractal(x, y, diameter) {
  if (diameter < 1) return;
  stroke(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));
  circle(x, y, diameter);
  const newSize = diameter / 2;
  drawCircleFractal(x - newSize, y, newSize);
  drawCircleFractal(x + newSize, y, newSize);
  drawCircleFractal(x, y + newSize, newSize);
}
