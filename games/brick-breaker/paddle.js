class Paddle {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.direction = 0;
    this.pos = createVector(width / 2 - this.w / 2, height - this.h * 2);
  }

  checkEdges() {
    if (this.pos.x < 0) this.pos.x = 0;
    else if (this.pos.x > width - this.w) this.pos.x = width - this.w;
  }

  update() {
    this.pos.x += this.direction * 20;
  }

  show() {
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}
