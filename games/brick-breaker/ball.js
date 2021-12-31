class Ball {
  constructor(r) {
    this.r = r;
    this.reset();
  }

  reset() {
    this.direction = createVector(1, 1);
    this.velocity = createVector(8, 8);
    this.pos = createVector(width / 2, height / 2);
  }

  checkEdges() {
    const top = this.pos.y < this.r;
    const bottom = this.pos.y > height - this.r;
    const left = this.pos.x < this.r;
    const right = this.pos.x > width - this.r;
    if (top || bottom) this.direction.y *= -1;
    if (left || right) this.direction.x *= -1;
  }

  intersects(paddle) {
    const isVerticallyAligned = this.pos.y < paddle.pos.y;
    const isHorizontallyAligned = this.pos.x > paddle.pos.x - this.r;
    const isTouchingY = this.pos.y > paddle.pos.y - this.r;
    const isTouchingX = this.pos.x < paddle.pos.x + paddle.w + this.r;
    return (
      isVerticallyAligned && isHorizontallyAligned && isTouchingY && isTouchingX
    );
  }

  hits(brick) {
    const distance = dist(this.pos.x, this.pos.y, brick.pos.x, brick.pos.y);
    return distance < this.r + brick.r;
  }

  update() {
    this.pos.x += this.velocity.x * this.direction.x;
    this.pos.y += this.velocity.y * this.direction.y;
  }

  show() {
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}
