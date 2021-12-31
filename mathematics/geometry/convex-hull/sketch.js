let index = null;
let start = null;
let currentVertex = null;
let nextVertex = null;
let points = [];
let hull = [];
const buffer = 30;
const total = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Add vectors to the points array until `total` vectors exist
  for (let i = 0; i < total; i++) {
    const x = random(buffer, width - buffer);
    const y = random(buffer, height - buffer);
    const vector = createVector(x, y);
    points.push(vector);
  }

  // sort points to be arranged left -> right
  points = points.sort((a, b) => a.x - b.x);
  // identify the starting (left-most) point
  start = points[0];

  //first vertex point begins with `start`
  currentVertex = start;

  // add the initial vertex point to the hull
  hull.push(currentVertex);

  // guess that the next vertex will be start + 1
  nextVertex = points[1];

  // index will be one index after out guess to compare with all other points that our guess was right or not
  index = 2;
}

function draw() {
  background(0);

  // draw all points
  stroke(255);
  strokeWeight(8);
  points.forEach(p => point(p.x, p.y));

  // draw the convex hull
  stroke(0, 0, 255);
  fill(0, 0, 255, 50);
  beginShape();
  hull.forEach(p => {
    vertex(p.x, p.y);
  });
  endShape(CLOSE);

  // display the left-most (starting) point
  stroke(0, 255, 0);
  strokeWeight(24);
  point(start.x, start.y);

  // display the current vertex point
  stroke(255, 0, 255);
  strokeWeight(24);
  point(currentVertex.x, currentVertex.y);

  // draw a line between the current vertex and the guessed next vertex
  stroke(0, 255, 0);
  strokeWeight(2);
  line(
    currentVertex.x,
    currentVertex.y,
    nextVertex.x,
    nextVertex.y
  );

  // draw a line between the current vertex and the item we are currently checking to validate our guessed next vertex against
  let checking = points[index];
  stroke(255);
  strokeWeight(2);
  line(
    currentVertex.x,
    currentVertex.y,
    checking.x,
    checking.y
  );

  // @see: https://en.wikipedia.org/wiki/Cross_product
  const a = p5.Vector.sub(
    nextVertex,
    currentVertex
  );
  const b = p5.Vector.sub(
    checking,
    currentVertex
  );
  const cross = a.cross(b);

  if (cross.z < 0) {
    nextVertex = checking;
  }

  // If we have looped all the points for the current check run
  if (++index === points.length) {
    // Add the next vertex to the hull and set the current vertex to the next vertex value. We also reset the index to check the points against the new current vertex.
    hull.push(nextVertex);
    currentVertex = nextVertex;
    index = 0;

    // If the next vertex is the first vertex, the hull is complete and we can stop the animation cycle
    if (nextVertex === start) {
      noLoop();
    }

    // Otherwise begin the next vertex from the begining
    nextVertex = start;
  }
}
