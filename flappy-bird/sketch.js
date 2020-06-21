let points = 0;
let bird = null;
let background_image = null;
const fontSize = 32;
const pipes = [];
const passed = new Set();

function preload() {
  background_image = loadImage('sky.jpg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  bird = new Bird(100, height / 2, fontSize);
  pipes.push(new Pipe());
}

function draw() {
  background(background_image);
  textSize(fontSize);
  bird.update();
  bird.show();

  if (frameCount % 60 === 0) {
    pipes.push(new Pipe());
  }

  for (let index = pipes.length - 1; index > 0; index--) {
    const pipe = pipes[index];
    pipe.update();
    pipe.show();

    if (pipe.hasPassed(bird) && !passed.has(pipe)) {
      passed.add(pipe);
      setTimeout(() => points++, 100)
    }

    if (pipe.isOffscreen()) {
      pipes.splice(index, 1);
    }

    if (pipe.isColliding(bird)) {
      pipe.show();
      noLoop();
      displayStats();
    }
  }

  fill(255);
  text(points.toString(), 50, 50);
}

function keyPressed() {
  if (key === " ") {
    bird.up();
  }
}

function displayStats() {
  const message = `Game over!\n\nYou scored ${points} points!`;
  fill(255);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(width / 2, height / 2, fontSize * message.length / 2, fontSize * 6);

  fill(0);
  noStroke();
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
}