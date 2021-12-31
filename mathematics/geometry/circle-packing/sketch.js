let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

async function draw() {
  background(0);
  const updated = await generateCircles(10, 100);
  updated.forEach(circle => {
    circle.show();
    circle.grow();
    const edg = circle.edges();
    const ovr = overlapping(circle, circles);
    circle.shouldGrow = !(edg || ovr);
  });
}

function inside(circle, circles) {
  for (const other of circles) {
    const distance = dist(circle.x, circle.y, other.x, other.y);

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

function makeCircle(circles) {
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
    const c = makeCircle(circles);
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
