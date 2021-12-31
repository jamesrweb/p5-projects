let radius = null;
let cx = null;
let cy = null;
let runs = 0;
const nCirclePoints = 360;
const circlePoints = new Array(nCirclePoints);

function setup() {
  createCanvas(windowWidth, windowHeight);
  radius = width / 6;
  cx = width / 2;
  cy = height / 2;

  for (var index = 0; index < nCirclePoints; index++) {
    const angle = map(index, 0, nCirclePoints, 0, TWO_PI) - HALF_PI;
    const x = cx + radius * cos(angle);
    const y = cy + radius * sin(angle);
    circlePoints[index] = createVector(x, y);
  }
}

function draw() {
  background(255);
  fill(127, 192, 36);
  stroke(0);
  strokeWeight(2);

  while (runs < 45) {
    beginShape();
    for (let c = 0; c < nCirclePoints; c++) {
      const { x: cx, y: cy } = circlePoints[c];

      if (c % (nCirclePoints / 3) !== 0) {
        const h = (c - 1 + nCirclePoints) % nCirclePoints;
        const n = (c + 1 + nCirclePoints) % nCirclePoints;
        const { x: hx, y: hy } = circlePoints[h];
        const { x: nx, y: ny } = circlePoints[n];
        const nextState = createVector((hx + cx + nx) / 3, (hy + cy + ny) / 3);
        p5.Vector.lerp(circlePoints[c], nextState, 1, circlePoints[c]);
      }

      vertex(cx, cy);
    }
    endShape(CLOSE);
    runs++;
  }

  runs = 0;
}