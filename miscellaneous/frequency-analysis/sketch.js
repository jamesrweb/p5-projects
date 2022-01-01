let song;
let frequencyGraph;

function preload() {
  song = loadSound("this-dot.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frequencyGraph = new FrequencyGraph(song);
}

function draw() {
  background(0);

  frequencyGraph.show();
}
