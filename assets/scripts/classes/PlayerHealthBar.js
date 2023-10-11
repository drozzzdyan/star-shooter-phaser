export default class PlayerHealthBar {
  constructor(scene, x, y, value) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.value = value;
    this.bar = this.scene.add.graphics();
    this.showHealthBar();
    this.renderText();
  }

  showHealthBar(value = this.value) {
    const barWidth = value * this.scene.sys.game.config.width / 3 / 100;

    this.bar.clear();
    this.bar.fillStyle(0xff0000, 0.8);
    this.bar.fillRect(this.x, this.y, barWidth, 5);
  }

  renderText() {
    this.scene.add.text(this.x - 30, this.y - 8, 'HP', {
      fontFamily: 'Pixelify Sans',
      fontSize: '18px',
      color: '#ff0000',
    })
  }
}