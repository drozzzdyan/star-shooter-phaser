export default class healthBar {
  constructor(scene, value, position = 'left') {
    this.scene = scene;
    this.value = value;
    this.position = position;
    this.init()
  }

  init() {
    const barWidth = this.value;
    const indent = 10;

    this.bar = this.scene.add.graphics();
    this.bar.fillStyle(0xff0000, 0.8);
    if (this.position === 'left') {
      this.bar.fillRect(indent, indent + 10, barWidth, 5);
    } else if (this.position === 'right') {
      this.bar.fillRect(this.scene.sys.game.config.width - barWidth - indent, indent + 10, barWidth, 5);
    }
  }
}