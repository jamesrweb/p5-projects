class Snake {
  constructor(scale) {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.scale = scale;
  }

  eat(food) {
    const distance = dist(this.x, this.y, food.position.x, food.position.y);

    if (distance > 1) return false;

    this.total++;
    return true;
  }

  direction(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  death() {
    for (const segment of this.tail) {
      const distance = dist(this.x, this.y, segment.x, segment.y);

      if (distance < 1) {
        noLoop();
        fill(255);
        textSize(64);
        textAlign(CENTER, CENTER);
        text(
          `Game over\nYou scored ${this.total} ${
            this.total === 1 ? "point" : "points"
          }`,
          width / 2,
          height / 2
        );
      }
    }
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * this.scale;
    this.y = this.y + this.yspeed * this.scale;

    this.x = constrain(this.x, 0, width - this.scale);
    this.y = constrain(this.y, 0, height - this.scale);
  }

  show() {
    fill(255);

    for (const segment of this.tail) {
      rect(segment.x, segment.y, this.scale, this.scale);
    }

    rect(this.x, this.y, this.scale, this.scale);
  }
}
