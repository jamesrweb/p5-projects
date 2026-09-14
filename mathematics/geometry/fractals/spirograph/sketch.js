let sun = null;
let _end = null;
let path = [];
const _kinetic_force = -7;
const child_count = 4;
const _resolution = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sun = new Orbit(width / 2, height / 2, width / 4, 0);
  _end = setOrbitalChildren(sun, child_count);
}

function draw() {
  path = [...path, ...buildOrbitalPath(sun)];

  background(0);
  drawOrbitalPath(sun);
  drawFramePath(path);
}

function drawFramePath(path) {
  noFill();
  stroke(255, 0, 0);
  beginShape();
  for (const vector of path) {
    vertex(vector.x, vector.y);
  }
  endShape();
}
