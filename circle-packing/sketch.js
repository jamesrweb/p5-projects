let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  generateCircles(10, 100).then(
    circles => circles.forEach(circle => {
      circle.show();
      circle.grow();
      const edg = circle.edges();
      const ovr = overlapping(circle, circles);
      circle.shouldGrow = !(edg || ovr);
    })
  );
}

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.shouldGrow = true;
  }

  edges() {
    const top = this.y - this.radius <= 0;
    const bottom = this.y + this.radius >= height;
    const left = this.x - this.radius <= 0;
    const right = this.x + this.radius >= width;
    return top || bottom || left || right;
  }

  grow() {
    if (this.shouldGrow) this.radius++;
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    ellipse(
      this.x,
      this.y,
      this.radius * 2,
      this.radius * 2
    );
  }
}

function inside(circle, circles) {
  for (const other of circles) {
    const distance = dist(
      circle.x, circle.y,
      other.x, other.y
    );

    if (distance < other.radius) return true;
  }

  return false;
}

function overlapping(circle, circles) {
  for (const other of circles) {
    if (circle !== other) {
      const distance = dist(circle.x, circle.y, other.x, other.y);
      const overlapping = distance < circle.radius + other.radius;
      if (overlapping) return true;
    }
  }

  return false;
}

function makeCircle() {
  const x = random(width);
  const y = random(height);
  const circle = new Circle(x, y, 1);

  if (inside(circle, circles) === true) {
    return null;
  }

  return circle;
}

async function generateCircles(desiredCount, iterationLimit) {
  let count = 0;
  let iterations = 0;

  while (count < desiredCount) {
    const c = makeCircle();
    if (c !== null) {
      circles.push(c);
      count++;
    }

    if (++iterations > iterationLimit) {
      noLoop();
      break;
    }
  }

  return circles;
}