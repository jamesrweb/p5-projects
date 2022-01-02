let random_walker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  const scale_factor = 100;
  const grid = new Grid(scale_factor);
  random_walker = new RandomWalker(grid);
}

function draw() {
  random_walker.move();
}
