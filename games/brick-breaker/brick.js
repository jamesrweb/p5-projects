class Brick {
  constructor(r, vs) {
    this.r = r;
    this.vs = vs;
    this.pos = createVector(
      random(100 + this.r, width - 100 - this.r),
      random(100 + this.r, height - 100 - this.r)
    );
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (let index = 0; index < this.vs; index++) {
      const angle = map(index, 0, this.vs, 0, TWO_PI);
      const x = this.r * cos(angle);
      const y = this.r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
