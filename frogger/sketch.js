class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  dimensions() {
    const left = this.x;
    const right = this.x + this.width;
    const top = this.y;
    const bottom = this.y + this.height;
    return { left, right, top, bottom };
  }

  intersects(rectangle) {
    const current = this.dimensions();
    const other = rectangle.dimensions();

    return !(
      current.left > other.right ||
      current.right < other.left ||
      current.top > other.bottom ||
      current.bottom < other.top
    );
  }
}

class Car extends Rectangle {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  update() { }
  show() { }
}

class Frog extends Rectangle {
  constructor(x, y, dimension) {
    super(x, y, dimension, dimension);
  }

  move(xDirection, yDirection) {
    this.x += xDirection * grid;
    this.y += yDirection * grid;
  }

  update() { }
  show() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}

const grid = 50;
let frog;

function setup() {
  createCanvas(
    windowWidth - windowWidth % grid,
    windowHeight - windowWidth % grid
  );
  frog = new Frog(
    (width / 2) - (grid / 2),
    height - grid,
    grid
  );
}

function draw() {
  background(0);
  frog.update();
  frog.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW) frog.move(0, -1);
  if (keyCode === DOWN_ARROW) frog.move(0, 1);
  if (keyCode === LEFT_ARROW) frog.move(-1, 0);
  if (keyCode === RIGHT_ARROW) frog.move(1, 0);
}