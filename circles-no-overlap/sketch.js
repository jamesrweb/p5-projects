class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

let circuitRuns = 0;
let circles = [];
const circleCount = 1000;
const breakOutAt = circleCount * 10;

function colliding(circle, circles) {
  for (const other of circles) {
    const distance = dist(circle.x, circle.y, other.x, other.y);
    const colliding = distance < circle.radius + other.radius;
    if (colliding) return true;
  }

  return false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  while (circles.length < circleCount) {
    const circle = new Circle(
      random(width),
      random(height),
      random(6, 36)
    );

    if (colliding(circle, circles) === false) {
      circles = [...circles, circle];
    }

    if (++circuitRuns > breakOutAt) {
      break;
    }
  }
}

function draw() {
  for (let circle of circles) {
    fill(255, 218, 0);
    noStroke();
    ellipse(circle.x, circle.y, circle.radius * 2, circle.radius * 2);
  }

  const fontSize = 72;
  const message = `Drew ${circles.length} circles`;

  fill(255);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(width / 2, height / 2, fontSize * message.length / 2, fontSize * 2);

  fill(0);
  noStroke();
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
}