class Character {
  constructor(x, y, speed, special) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.special = special;
    this.value = null;
    this.switchInterval = round(random(2, 20));
  }

  setRandomCharacter() {
    if (frameCount % this.switchInterval === 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
    }
  }

  update() {
    this.setRandomCharacter();
    if (this.y >= height) {
      this.y = -this.speed;
    } else {
      this.y += this.speed;
    }
  }

  show() {
    this.special ? fill(180, 255, 180) : fill(0, 255, 70);
    text(this.value, this.x, this.y);
  }
}