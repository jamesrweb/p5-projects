let p;
let number = 1; // starting point
const limit = 100; // max iterations

function setup() {
  // run at 10 frames per second if possible
  frameRate(10);
  // create a canvas that is 500px by 500px in size and append to the page
  createCanvas(500, 500);
  //create a P tag to show the current estimation while the iterations are underway
  p = createP();
}

function draw() {
  // give the canvas a blue background
  background(24, 131, 211);
  //set the coordinate system to have the origin at the bottom left
  translate(0, height);
  // draw a yellow circle at 0 0 (bottom left) with no outline around it and give it a diameter equal to double the canvas width
  noStroke();
  fill(255, 211, 35);
  circle(0, 0, width * 2);

  // guess pi and count up for the next animation cycle
  const guess = guessPI(number++);

  // output the new guess
  p.elt.textContent = guess;

  // our bail out condition to end the animation loop
  if (number === limit) {
    // stop the animation loop
    noLoop();
    // hide the P element with the last guess since the table of guesses will now show
    p.hide();
    // output the guesses table
    outputGuesses();
  }
}