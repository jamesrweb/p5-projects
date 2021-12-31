/**
 * Variables: F, +, -, [, ]
 * Axiom: F
 * Rules: F -> FF+[+F-F-F]-[-F+F+F]
 */

let button = null;
let angle = null;
let axiom = "F";
let sentence = axiom;
let line_length = 75;
const TEXT_SIZE = 32;
const RULES = { F: "FF+[+F-F-F]-[-F+F+F]" };
const FLOAT_REGEX = /[-+]?[0-9]*\.?[0-9]+/;

function setup() {
  createCanvas(windowWidth, windowHeight);

  angle = radians(25);
  turtle(sentence);

  button = createButton("Generate");
  applyButtonStyles(button);
  repositionButton(button);
  button.mousePressed(() => {
    sentence = generate(sentence);
    turtle(sentence);
    line_length *= 0.75;
  });
}

function turtle(sentence) {
  background(127);
  stroke(255);
  resetMatrix();
  translate(width / 2.5, height);

  for (const [index, value] of [...sentence].entries()) {
    if (value === "F") {
      line(0, 0, 0, -line_length);
      translate(0, -line_length);
    } else if (value === "+") {
      rotate(angle);
    } else if (value === "-") {
      rotate(angle * -1);
    } else if (value === "[") {
      push();
    } else if (value === "]") {
      pop();
    }
  }
}

function generate(sentence) {
  let output = "";

  for (const [index, value] of [...sentence].entries()) {
    if (RULES[value]) {
      output += RULES[value];
    } else {
      output += value;
    }
  }

  return output;
}

function applyButtonStyles(button) {
  button.style("padding", "12px");
  button.style("font-size", `${TEXT_SIZE}px`);
  button.style("border", "0");
  button.style("border-radius", "10px");
  button.style("background-color", "black");
  button.style("color", "white");
}

function repositionButton(button) {
  const BUTTON_WIDTH = button.style("width").match(FLOAT_REGEX);
  const BUTTON_HEIGHT = button.style("height").match(FLOAT_REGEX);

  if (BUTTON_WIDTH && BUTTON_HEIGHT) {
    button.position(
      parseInt(BUTTON_WIDTH[0]) / 4,
      height - parseInt(BUTTON_HEIGHT[0]) * 1.5
    );
  }
}
