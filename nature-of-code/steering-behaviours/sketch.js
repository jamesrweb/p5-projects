let font = null;
const TEXT = "Hover Me";
const TEXT_SIZE = 128;
const vehicles = [];

function preload() {
  font = loadFont("Oswald-ExtraLight.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(TEXT_SIZE);

  const points = font.textToPoints(TEXT, TEXT_SIZE, height / 2);
  for (const point of points) {
    const vehicle = Vehicle(point.x, point.y, 4);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(0);

  for (const vehicle of vehicles) {
    vehicle.behaviours();
    vehicle.update();
    vehicle.show();
  }
}

function Vehicle(x, y, r) {
  const position = createVector(random(width), random(height));
  const target = createVector(x, y);
  const velocity = p5.Vector.random2D();
  const acceleration = createVector();
  const max_speed = 10;
  const max_force = 1;

  return {
    flee(target) {
      const desired = p5.Vector.sub(target, position);
      const distance = desired.mag();

      if (distance < 50) {
        desired.setMag(max_speed);
        desired.mult(-1);
        const heading = p5.Vector.sub(desired, velocity);
        heading.limit(max_force);
        heading.mult(5);
        return heading;
      }

      return createVector(0, 0);
    },
    seek(target) {
      const desired = p5.Vector.sub(target, position);
      const distance = desired.mag();
      const speed =
        distance < 100 ? map(distance, 0, 100, 0, max_speed) : max_speed;
      desired.setMag(speed);
      const heading = p5.Vector.sub(desired, velocity);
      heading.limit(max_force);
      return heading;
    },
    behaviours() {
      const heading = this.seek(target);
      const flee = this.flee(createVector(mouseX, mouseY));
      this.applyForce(heading);
      this.applyForce(flee);
    },
    applyForce(force) {
      acceleration.add(force);
    },
    update() {
      position.add(velocity);
      velocity.add(acceleration);
      acceleration.mult(0);
    },
    show() {
      stroke(255);
      strokeWeight(r);
      point(position.x, position.y);
    }
  };
}
