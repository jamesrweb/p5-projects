let paddle = null;
let ball = null;
let bricks = null;
let playing = false;
let win = false;
let winText = null;
let tryText = null;
let startText = null;

function generateBricks(count) {
  bricks = new Array(count);
  for (let index = 0; index < bricks.length; index++) {
    bricks[index] = new Brick(random(20, 80), 8);
  }
}

function createText(text) {
  const p = createP(text);
  p.position(width / 2 - 150, 50);
  p.style("display", "none");
  return p;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle(160, 20);
  winText = createText("You win! Press 's' to play again.");
  tryText = createText("Try again! Press 's' to continue.");
  ball = new Ball(30);
  startText = createText("Press 's' to begin!");
  generateBricks(floor(random(20, 50)));
}

function draw() {
  background(255);

  if (!playing && !win && tryText.style("display") !== "block") {
    startText.style("display", "block");
  } else if (playing || win) {
    startText.style("display", "none");
  }

  paddle.show();
  playing && paddle.update();
  playing && paddle.checkEdges();

  ball.show();
  playing && ball.update();
  playing && ball.checkEdges();

  if (ball.intersects(paddle) && ball.direction.y > 0) {
    ball.direction.y *= -1;
  }

  for (let index = 0; index < bricks.length; index++) {
    const brick = bricks[index];

    if (ball.hits(brick)) {
      if (brick.r > 40) brick.r /= 2;
      else bricks.splice(index, 1);
      ball.direction.y *= -1;
    }

    brick.show();
  }

  if (ball.pos.y > height - ball.r) {
    playing = false;
    win = false;
    ball.reset();
    tryText.style("display", "block");
  }

  if (bricks.length === 0) {
    win = true;
    playing = false;
    winText.style("display", "block");
  }
}

function keyPressed() {
  if (key.toLowerCase() === "a") {
    paddle.direction = -1;
  } else if (key.toLowerCase() === "d") {
    paddle.direction = 1;
  } else if (key.toLowerCase() === "s") {
    playing = true;
    win = false;

    winText.style("display", "none");
    tryText.style("display", "none");

    if (bricks.length === 0) generateBricks(floor(random(20, 50)));
  }
}

function keyReleased() {
  paddle.direction = 0;
}