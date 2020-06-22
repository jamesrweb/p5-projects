class Food {
  constructor(scale) {
    this.scale = scale;
    this.relocate();
  }

  relocate() {
    const columns = floor(width / this.scale);
    const rows = floor(height / this.scale);
    this.position = createVector(
      floor(random(columns)),
      floor(random(rows))
    );
    this.position.mult(this.scale);
  }

  show() {
    fill(255, 0, 100);
    rect(
      this.position.x,
      this.position.y,
      this.scale,
      this.scale
    );
  }
}