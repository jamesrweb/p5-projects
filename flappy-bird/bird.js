class Bird {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.gravity = 0.5;
    this.lift = 15;
    this.velocity = 0;
  }

  up() {
    this.velocity -= this.lift;
  }

  show() {
    textSize(this.size);
    text("✈️", this.x, this.y);
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y + this.size > height) {
      this.y = height - this.size;
      this.velocity = 0;
    }

    if (this.y - this.size < 0) {
      this.y = 0 + this.size;
      this.velocity = 0;
    }
  }
}