let snake = null;
let food = null;
const scale = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  snake = new Snake(scale);
  food = new Food(scale);
}

function draw() {
  background(51);

  if (snake.eat(food)) food.relocate();

  food.show();
  snake.death();
  snake.update();
  snake.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  }
}