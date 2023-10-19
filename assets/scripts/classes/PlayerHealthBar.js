export default class PlayerHealthBar {
  constructor(scene, x, y, value, color = 0xff0000) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.value = value;
    this.color = color;
    this.bar = this.scene.add.graphics();
    this.showHealthBar();
    this.renderText();
  }

  showHealthBar(value = this.value) {
    const barWidth = value * this.scene.sys.game.config.width / 3 / 100;

    this.bar.clear();
    this.bar.fillStyle(this.color, 0.8);
    this.bar.fillRect(this.x, this.y, barWidth, 5);
  }

  toColorHex(code) {
    let alph16 = '0123456789abcdef';
    let returnHex = '';
    while (code > 0) {
      returnHex = alph16[code % 16] + returnHex;
      code = Math.floor(code / 16);
    }
    let zeros = '';
    for (let i = 0; i < 6 - returnHex.length; i++) {
      zeros += '0';
    }
    return `#${zeros}${returnHex}`
  }

  renderText() {
    this.scene.add.text(this.x - 30, this.y - 8, 'HP', {
      fontFamily: 'Kanit',
      fontSize: '18px',
      color: this.toColorHex(this.color),
    })
  }
}