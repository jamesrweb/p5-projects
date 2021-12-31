const FONT_SIZE = 24;
const HOURS_COLOUR = "#EF6461";
const MINUTES_COLOUR = "#7FEFBD";
const SECONDS_COLOUR = "#E0DFD5";

function normalise(part) {
  if (Number.isInteger(part) === false) {
    return part;
  }

  if (part < 10) return `0${part}`;
  return part.toString();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  background(0);

  const HOUR = hour();
  const MINUTE = minute();
  const SECOND = second();
  const TIME_TEXT = `${normalise(HOUR)}:${normalise(MINUTE)}:${normalise(SECOND)}`;
  const CENTERX = width / 2;
  const CENTERY = height / 2;

  fill(255);
  noStroke();
  textSize(FONT_SIZE);
  textAlign(CENTER, CENTER);
  text(TIME_TEXT, CENTERX, CENTERY);

  strokeWeight(4);
  noFill();

  let hd = map(HOUR % 12, 0, 12, 0, TWO_PI);
  stroke(HOURS_COLOUR);
  arc(CENTERX, CENTERY, 300, 300, 0, hd);

  let md = map(MINUTE, 0, 60, 0, TWO_PI);
  stroke(MINUTES_COLOUR);
  arc(CENTERX, CENTERY, 275, 275, 0, md);

  let sd = map(SECOND, 0, 60, 0, TWO_PI);
  stroke(SECONDS_COLOUR);
  arc(CENTERX, CENTERY, 250, 250, 0, sd);
}