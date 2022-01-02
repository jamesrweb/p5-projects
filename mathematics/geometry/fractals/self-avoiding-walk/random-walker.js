class RandomWalker {
  constructor(grid) {
    this.grid = grid;
    this.x = floor(this.grid.positions[0].length / 2);
    this.y = floor(this.grid.positions.length / 2);
  }

  move() {
    const direction = floor(random(4));

    if (direction === 0) {
      const next_x = this.limitXPosition(this.x + 1);

      this.updateX(next_x);
    }

    if (direction === 1) {
      const next_x = this.limitXPosition(this.x - 1);

      this.updateX(next_x);
    }

    if (direction === 2) {
      const next_y = this.limitYPosition(this.y + 1);

      this.updateY(next_y);
    }

    if (direction === 3) {
      const next_y = this.limitYPosition(this.y - 1);

      this.updateY(next_y);
    }

    this.grid.mark(this.x, this.y);
  }

  updateX(next_x) {
    if (this.grid.isMarked(next_x, this.y)) {
      return;
    }

    this.x = next_x;
  }

  updateY(next_y) {
    if (this.grid.isMarked(this.x, next_y)) {
      return;
    }

    this.y = next_y;
  }

  limitXPosition(next_x) {
    if (next_x < 0) {
      return 0;
    }

    if (next_x > this.grid.positions[0].length - 1) {
      return this.grid.positions[0].length - 1;
    }

    return next_x;
  }

  limitYPosition(next_y) {
    if (next_y < 0) {
      return 0;
    }

    if (next_y > this.grid.positions.length - 1) {
      return this.grid.positions.length - 1;
    }

    return next_y;
  }
}
