let frog;
const grid = 50;
const cars = [];
const logs = [];

function createFrog() {
  return new Frog(width / 2 - grid / 2, height - grid, grid);
}

function reset() {
  frog = createFrog();
  frog.attach(null);
  console.log(frog);
}

function buildRows() {
  let index = 0;

  // ROW 1
  for (let i = 0; i < 2; i++) {
    let x = i * 300;
    cars[index] = new Car(x, height - grid * 2, grid * 2, grid, 2);
    index++;
  }

  // ROW 2
  for (i = 0; i < 2; i++) {
    let x = i * 200 + 150;
    cars[index] = new Car(x, height - grid * 3, grid, grid, -3.5);
    index++;
  }

  // ROW 3
  for (i = 0; i < 4; i++) {
    let x = i * 150 + 25;
    cars[index] = new Car(x, height - grid * 4, grid, grid, 1.2);
    index++;
  }

  // ROW 5
  index = 0;
  for (i = 0; i < 2; i++) {
    let x = i * 250 + 100;
    logs[index] = new Log(x, height - grid * 6, grid * 3, grid, 2.3);
    index++;
  }

  // ROW 6
  for (i = 0; i < 3; i++) {
    let x = i * 200 + 30;
    logs[index] = new Log(x, height - grid * 7, grid * 2, grid, -1.3);
    index++;
  }

  // ROW 7
  for (i = 0; i < 2; i++) {
    let x = i * 400 + 10;
    logs[index] = new Log(x, height - grid * 8, grid * 4, grid, 0.5);
    index++;
  }
}

function setup() {
  createCanvas(500, 500);
  reset();
  buildRows();
}

function draw() {
  background(0);
  fill(215, 100);
  rect(0, 0, width, grid * 2);
  fill("green");
  rect(0, height - grid * 5, width, grid);
  fill("red");
  rect(0, height - grid, width, grid);

  for (const car of cars) {
    car.update(grid);
    car.show();
    if (frog.intersects(car)) reset();
  }

  for (const log of logs) {
    log.update(grid);
    log.show();
  }

  if (frog.y < height - grid * 5 && frog.y >= grid * 2) {
    let ok = false;

    for (const log of logs) {
      if (frog.intersects(log)) {
        ok = true;
        frog.attach(log);
      }
    }
    if (!ok) reset();
  } else {
    frog.attach(null);
  }

  frog.update();
  frog.show();

  if (frog.y < grid * 2) {
    console.log("Game completed!");
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) frog.move(0, -1, grid);
  if (keyCode === DOWN_ARROW) frog.move(0, 1, grid);
  if (keyCode === LEFT_ARROW) frog.move(-1, 0, grid);
  if (keyCode === RIGHT_ARROW) frog.move(1, 0, grid);
}
