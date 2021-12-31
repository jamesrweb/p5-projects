// @see https://en.wikipedia.org/wiki/Julia_set
const range = 2.5;
const infinity = 16;
const max_iterations = 50;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const brightness = julia(x, y, angle);
      const pixel = (x + y * width) * 4;
      pixels[pixel] = brightness;
      pixels[pixel + 1] = brightness;
      pixels[pixel + 2] = brightness;
      pixels[pixel + 3] = 255;
    }
  }
  updatePixels();
  angle += Math.PI;
}

function julia(x, y, angle) {
  let n = 0;
  const state = {
    a: map(x, 0, width, -range, range),
    b: map(y, 0, height, -range, range),
    ca: cos(angle),
    cb: sin(angle)
  };

  while (n < max_iterations) {
    const real = pow(state.a, 2) - pow(state.b, 2);
    const complex = 2 * state.a * state.b;

    state.a = real + state.ca;
    state.b = complex + state.cb;
    if (abs(real + complex) > infinity) break;
    n++;
  }

  return n < max_iterations ? map(n, 0, max_iterations, 0, 255) : 0;
}