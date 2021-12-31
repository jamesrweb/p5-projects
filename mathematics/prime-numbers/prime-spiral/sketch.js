function isPrime(number) {
  if (Number.isInteger(number) === false) return false;
  if (number <= 1) return false;
  if (number % 2 === 0 && number > 2) return false;

  const square = Math.sqrt(number);
  for (let divisor = 3; divisor <= square; divisor += 2) {
    if (number % divisor === 0) return false;
  }

  return true;
}

let n = 0;
let angle = 0;
let scalar = 2;
const offset = 5;
const speed = 0.25;
const limit = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(5);
}

function draw() {
  translate(width / 2, height / 2);
  if (isPrime(n)) {
    const x = offset * cos(angle) * scalar;
    const y = offset * sin(angle) * scalar;
    point(x, y);
    angle += speed;
    scalar += speed;
  }

  if (++n > limit) noLoop();
}