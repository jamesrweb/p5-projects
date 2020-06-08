// @see https://en.wikipedia.org/wiki/mandelbrot_set
const range = 2.5;
const infinity = 16;
const max_iterations = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const brightness = mandelbrot(x, y);
      const pixel = (x + y * width) * 4;
      pixels[pixel] = brightness;
      pixels[pixel + 1] = brightness;
      pixels[pixel + 2] = brightness;
      pixels[pixel + 3] = 255;
    }
  }
  updatePixels();
}

function mandelbrot(x, y) {
  let n = 0;
  const state = {
    a: map(x, 0, width, -range, range),
    b: map(y, 0, height, -range, range),
    ca: map(x, 0, width, -range, range),
    cb: map(y, 0, height, -range, range)
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