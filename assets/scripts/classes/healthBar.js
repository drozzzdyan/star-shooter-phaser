export default class healthBar {
  constructor(scene, value, position = 'left') {
    this.scene = scene;
    this.value = value;
    this.position = position;
    this.showHealthBar();
    this.renderText();
  }

  showHealthBar() {
    const barWidth = this.value * this.scene.sys.game.config.width / 3 / 100;
    const indentX = 40;
    const indentY = 28;

    this.bar = this.scene.add.graphics();
    this.bar.clear();
    this.bar.fillStyle(0xff0000, 0.8);
    if (this.position === 'left') {
      this.bar.fillRect(indentX, indentY, barWidth, 5);
    } else if (this.position === 'right') {
      this.bar.fillRect(this.scene.sys.game.config.width - barWidth - indentX, indentY, barWidth, 5);
    }
  }

  renderText() {
    if (this.position === 'left') {
      this.scene.add.text(10, 20, 'HP', {
        fontFamily: 'Pixelify Sans',
        fontSize: '18px',
        color: '#ff0000',
      })
    } else if (this.position === 'right') {
      this.scene.add.text(this.scene.sys.game.config.width - 30, 20, 'HP', {
        fontFamily: 'Pixelify Sans',
        fontSize: '18px',
        color: '#ff0000',
      })
    }
  }
}