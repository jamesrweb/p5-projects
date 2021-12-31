class Stream {
  constructor(characterSize) {
    this.characters = [];
    this.characterSize = characterSize;
    this.totalCharacters = random(5, height / characterSize);
    this.speed = random(5, 10);
  }

  generateCharacters(x, y) {
    for (let i = 0; i < this.totalCharacters; i++) {
      const special = i === 0 && round(random(0, 4)) === 1;
      const character = new Character(x, y, this.speed, special);
      character.setRandomCharacter();
      this.characters.push(character);
      y -= this.characterSize;
    }
  }

  show() {
    this.characters.forEach(character => {
      character.update();
      character.show();
    });
  }
}