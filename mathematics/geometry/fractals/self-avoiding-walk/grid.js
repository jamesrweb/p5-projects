class Grid {
  constructor(scale_factor) {
    const column_padding = floor(width / scale_factor);
    const row_padding = floor(height / scale_factor);
    const column_count = floor(width / column_padding);
    const row_count = floor(height / row_padding);

    this.positions = this.generatePositions(row_count, column_count);
    this.row_padding = row_padding;
    this.column_padding = column_padding;
    this.scale_factor = scale_factor;
  }

  generatePositions(row_count, column_count) {
    const columns = Array.from({ length: column_count }).fill(false);

    return Array.from({ length: row_count }, () => [...columns]);
  }

  isMarked(x, y) {
    return this.positions[y][x] === true;
  }

  mark(x, y) {
    stroke(255);
    strokeWeight(2);
    noFill();

    point(
      x * this.column_padding + this.column_padding / 2,
      y * this.row_padding + this.row_padding / 2
    );

    this.positions[y][x] = true;
  }
}
