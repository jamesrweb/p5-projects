class Pipe {
  constructor() {
    this.top = random(height / 2 - fontSize / 2);
    this.bottom = random(height / 2 - fontSize / 2);
    this.x = width;
    this.w = 50;
    this.speed = 5;
    this.passed = false;
  }

  show() {
    noStroke();
    if (this.collided) {
      fill(229, 37, 33);
    } else if (this.passed) {
      fill(67, 176, 71);
    } else {
      fill(0, 0, 50)
    }
    rect(this.x, 0, this.w, this.top, 0, 0, 25, 25);
    rect(this.x, height - this.bottom, this.w, this.bottom, 25, 25, 0, 0);
  }

  update() {
    this.x -= this.speed;
  }

  hasPassed(bird) {
    this.passed = this.x - this.w / 2 < bird.x;
    return this.passed;
  }

  isColliding(bird) {
    const collidingY = bird.y < this.top || bird.y > height - this.bottom;
    const collidingX = bird.x > this.x - this.w / 2 && bird.x < this.x + this.w / 2;
    this.collided = collidingY && collidingX;
    return this.collided;
  }

  isOffscreen() {
    return this.x + this.w < 0;
  }
}