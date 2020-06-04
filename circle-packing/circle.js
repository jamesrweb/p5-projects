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