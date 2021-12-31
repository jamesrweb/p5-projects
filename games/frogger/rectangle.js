class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  dimensions() {
    const left = this.x;
    const right = this.x + this.width;
    const top = this.y;
    const bottom = this.y + this.height;
    return { left, right, top, bottom };
  }

  intersects(rectangle) {
    const current = this.dimensions();
    const other = rectangle.dimensions();

    return !(
      current.left >= other.right ||
      current.right <= other.left ||
      current.top >= other.bottom ||
      current.bottom <= other.top
    );
  }
}
