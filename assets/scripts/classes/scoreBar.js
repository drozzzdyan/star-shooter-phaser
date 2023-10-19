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
      fontSize: '30px',
      color: '#b755b9',
    })

    this.multiplyBonus = this.scene.add.text(this.x - 100, this.y + 3, `${this.multiplyBonus}x`, {
      fontFamily: 'Kanit',
      fontSize: '24px',
      color: '#d974db',
    })
  }

  update(score, multiplyBonus) {
    this.scoreText.text = `${score}`;
    this.multiplyBonus.text = `${multiplyBonus}x`;
  }
}