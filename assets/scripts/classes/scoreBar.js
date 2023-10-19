export default class scoreBar {
  constructor(scene, x, y, score, multiplyBonus) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.score = score;
    this.multiplyBonus = multiplyBonus;
    this.render();
  }

  render() {
    this.scoreText = this.scene.add.text(this.x, this.y, `${this.score}`, {
      fontFamily: 'Kanit',
      fontSize: '32px',
      color: '#b755b9',
    }).setOrigin(0.5);

    this.multiplyBonus = this.scene.add.text(this.x, this.y + 30, `${this.multiplyBonus}x`, {
      fontFamily: 'Kanit',
      fontSize: '20px',
      fontWeight: '700',
      color: '#f4b3f5',
    }).setOrigin(0.5);
  }

  update(score, multiplyBonus) {
    this.scoreText.text = `${score}`;
    this.multiplyBonus.text = `${multiplyBonus}x`;
  }
}