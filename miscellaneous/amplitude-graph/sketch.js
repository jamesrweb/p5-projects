let song;
let amplitudeGraph;

function preload() {
  song = loadSound("this-dot.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amplitudeGraph = new AmplitudeGraph(song);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(2);
  noFill();

  amplitudeGraph.update();
  amplitudeGraph.show();
}
