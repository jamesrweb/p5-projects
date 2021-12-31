const character_size = 60;
const streams = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(character_size);

  for (let x = 0; x <= width - character_size; x += character_size) {
    const stream = new Stream(character_size);
    stream.generateCharacters(x + character_size / 4, random(-height / 2, 0));
    streams.push(stream);
  }
}

function draw() {
  background(0, 150);
  streams.forEach(stream => stream.show());
}
