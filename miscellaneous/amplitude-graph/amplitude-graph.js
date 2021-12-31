class AmplitudeGraph {
  constructor(song) {
    this.history = [];
    this.amplitude = new p5.Amplitude();
    this.amplitude.setInput(song);
    song.loop();
  }

  update() {
    this.history.push(this.amplitude.getLevel());
  }

  show() {
    beginShape();
    for (const [index, volume] of this.history.entries()) {
      vertex(index, map(volume, 0, 1, height / 2, 0));
    }
    endShape();

    if (this.history.length > width - width * 0.05) {
      this.history.shift();
    }

    stroke(255, 0, 0);
    line(this.history.length, 0, this.history.length, height);
    strokeWeight(15);
    point(
      this.history.length,
      map(this.history[this.history.length - 1], 0, 1, height / 2, 0)
    );
  }
}
