let linear_bezier;
let quadratic_bezier;
let cubic_bezier;
let quartic_bezier;
let linear_colour;
let quadratic_colour;
let cubic_colour;
let quartic_colour;

function setup() {
  createCanvas(600, 600);

  const p0 = new Particle(0, height / 2);
  const p1 = new Particle(width / 2, height - (height * 0.25));
  const p2 = new Particle(width - (width * 0.15), 0);
  const p3 = new Particle(width / 3, height / 4);
  const p4 = new Particle(width, height / 2);


  linear_colour = random(0, 360) % 360;
  linear_bezier = LinearBezier.createFromPoints([p0, p4]);

  quadratic_colour = random(0, 360) % 360;
  quadratic_bezier = QuadraticBezier.createFromPoints([p0, p1, p4]);

  cubic_colour = random(0, 360) % 360;
  cubic_bezier = CubicBezier.createFromPoints([p0, p1, p2, p4]);

  quartic_colour = random(0, 360) % 360;
  quartic_bezier = QuarticBezier.createFromPoints([p0, p1, p2, p3, p4]);
}

function draw() {
  background(0);

  linear_bezier.show(linear_colour);
  quadratic_bezier.show(quadratic_colour);
  cubic_bezier.show(cubic_colour);
  quartic_bezier.show(quartic_colour);
}