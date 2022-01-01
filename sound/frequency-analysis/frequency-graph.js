class FrequencyGraph {
  constructor(song) {
    const smoothing = 0.75;
    const bins = 64;

    this.fastFourierTransformer = new p5.FFT(smoothing, bins);
    this.fastFourierTransformer.setInput(song);
    song.loop();
  }

  show() {
    colorMode(HSB);
    noStroke();

    const spectrum = this.fastFourierTransformer.analyze();
    const min_amplitude = Math.min(...spectrum);
    const max_amplitude = Math.max(...spectrum);
    const band_width = width / this.fastFourierTransformer.bins;
    const padding = width * 0.003;
    const border_radius = height * 0.003;

    for (const [index, amplitude] of spectrum.entries()) {
      const x = index * band_width + padding;
      const y =
        map(amplitude, min_amplitude, max_amplitude, 0, height) + padding;
      const w = band_width - padding * 2;
      const h = height - y - padding;

      fill(index, 255, 255);
      rect(
        x,
        y,
        w,
        h,
        border_radius,
        border_radius,
        border_radius,
        border_radius
      );
    }
  }
}
