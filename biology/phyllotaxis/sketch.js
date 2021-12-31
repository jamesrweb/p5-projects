let limit = 0;
let n = 0;
const c = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB);
  angleMode(DEGREES);

  limit = width > height ? width : height;
}

function draw() {
  translate(width / 2, height / 2);

  const angle = n * 137.5;
  const radius = c * Math.sqrt(n);
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  fill((angle - radius) % 256, 255, 255);
  noStroke();
  ellipse(x, y, c, c);

  if (++n > limit / 2) {
    noLoop();
  }
}
