class Log extends Car {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed);
  }

  show() {
    fill(150, 75, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}
