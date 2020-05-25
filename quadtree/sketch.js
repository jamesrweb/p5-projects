let quadtree;
const showTree = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  quadtree = new QuadTree(
    new Rectangle(width / 2, height / 2, width / 2, height / 2),
    4
  );

  for (let i = 0; i < 1000; i++) {
    const point = { x: random(width), y: random(height) };
    quadtree.insert(point);
  }
}

function draw() {
  background(0);

  if (showTree) {
    quadtree.show();
  } else {
    for (const p of quadtree.all()) {
      strokeWeight(2);
      stroke(255);
      point(p.x, p.y);
    }
  }

  noFill();
  strokeWeight(4);
  stroke(0, 255, 0);
  rectMode(CENTER);
  const range = new Rectangle(
    mouseX,
    mouseY,
    width / 10,
    height / 10
  );
  if (mouseX < width && mouseY < height) {
    rect(range.x, range.y, range.w * 2, range.h * 2);
    let points = quadtree.query(range);
    for (let p of points) {
      point(p.x, p.y);
    }
  }
}
