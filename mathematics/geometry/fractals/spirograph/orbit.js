class Orbit {
  constructor(x, y, radius, nth_child, parent) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.nth_child = nth_child;
    this.parent = parent;
    this.child = null;
    this.angle = -HALF_PI;
    this.speed = radians(
      pow(kinetic_force, nth_child - 1)
    ) / resolution;
  }

  addChild() {
    const newr = this.radius / 3.0;
    this.child = new Orbit(
      this.x + this.radius + newr,
      this.y,
      newr,
      this.nth_child + 1,
      this
    );
    return this.child;
  }

  update() {
    const parent = this.parent;
    if (parent != null) {
      const rsum = this.radius + parent.radius;
      this.angle += this.speed;
      this.x = parent.x + rsum * cos(this.angle);
      this.y = parent.y + rsum * sin(this.angle);
    }
  }

  show() {
    stroke(255, 100);
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}

function setOrbitalChildren(origin, child_count) {
  let last = origin;

  for (let i = 0; i < child_count; i++) {
    last = last.addChild();
  }

  return last;
}

function buildOrbitalPath(origin) {
  let path = [];

  for (let i = 0; i < resolution; i++) {
    let next = origin;

    while (next !== null) {
      next.update();
      next = next.child;
    }

    path.push(createVector(end.x, end.y));
  }

  return path;
}

function drawOrbitalPath(origin) {
  let next = origin;
  while (next !== null) {
    next.show();
    next = next.child;
  }
}