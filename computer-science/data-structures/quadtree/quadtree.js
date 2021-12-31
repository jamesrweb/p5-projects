class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Area {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

class Circle extends Area {
  constructor(x, y, r) {
    super(x, y, null, null);
    this.r = r;
  }
}

class Rectangle extends Area {
  constructor(x, y, w, h) {
    super(x, y, w, h);
  }

  contains(entity) {
    const inLeft = entity.x >= this.x - this.w;
    const inRight = entity.x < this.x + this.w;
    const inTop = entity.y >= this.y - this.h;
    const inBottom = entity.y < this.y + this.h;
    return inLeft && inRight && inTop && inBottom;
  }

  intersects(area) {
    const inLeft = area.x - area.w > this.x + this.w;
    const inRight = area.x + area.w < this.x - this.w;
    const inTop = area.y - area.h > this.y + this.h;
    const inBottom = area.y + area.h < this.y - this.h;
    return !(inLeft || inRight || inTop || inBottom);
  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.entities = [];
    this.divided = false;
  }

  subdivide() {
    const { x, y, w, h } = this.boundary;
    const left = x - w / 2;
    const right = x + w / 2;
    const top = y - h / 2;
    const bottom = y + h / 2;
    this.northeast = new QuadTree(
      new this.boundary.constructor(right, top, w / 2, h / 2),
      this.capacity
    );
    this.northwest = new QuadTree(
      new this.boundary.constructor(left, top, w / 2, h / 2),
      this.capacity
    );
    this.southeast = new QuadTree(
      new this.boundary.constructor(right, bottom, w / 2, h / 2),
      this.capacity
    );
    this.southwest = new QuadTree(
      new this.boundary.constructor(left, bottom, w / 2, h / 2),
      this.capacity
    );
    this.divided = true;
  }

  insert(entity) {
    if (!this.boundary.contains(entity)) {
      return false;
    }

    if (this.entities.length < this.capacity) {
      this.entities.push(entity);
      return true;
    }

    if (!this.divided) this.subdivide();

    return (
      this.northeast.insert(entity) ||
      this.northwest.insert(entity) ||
      this.southeast.insert(entity) ||
      this.southwest.insert(entity)
    );
  }

  query(area, found = []) {
    if (!this.boundary.intersects(area)) {
      return;
    }

    for (let entity of this.entities) {
      if (area.contains(entity)) {
        found.push(entity);
      }
    }

    if (this.divided) {
      this.northwest.query(area, found);
      this.northeast.query(area, found);
      this.southwest.query(area, found);
      this.southeast.query(area, found);
    }

    return found;
  }

  all() {
    return this.query(this.boundary);
  }

  show() {
    stroke(255);
    noFill();
    strokeWeight(1);
    rectMode(CENTER);
    rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );

    for (let entity of this.entities) {
      strokeWeight(2);
      point(entity.x, entity.y);
    }

    if (this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
  }
}
