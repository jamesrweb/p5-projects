class Frog extends Rectangle {
  constructor(x, y, dimension) {
    super(x, y, dimension, dimension);
    this.attached = null;
  }

  move(xDirection, yDirection, grid) {
    this.x += xDirection * grid;
    this.y += yDirection * grid;
  }

  attach(log) {
    this.attached = log;
  }

  update() {
    if (this.attached != null) {
      this.x += this.attached.speed;
    }

    this.x = constrain(this.x, 0, width - this.width);
  }

  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}
