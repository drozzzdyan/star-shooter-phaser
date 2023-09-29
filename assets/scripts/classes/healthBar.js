export default class healthBar {
  constructor(scene, value, positionX = 'left') {
    this.scene = scene;
    this.value = value;
    this.init()
  }

  init() {
    const barWidth = this.value;
    const indent = 10;

    this.bar = this.scene.add.graphics();
    this.bar.fillStyle(0xff0000, 0.8);
    this.bar.fillRect(indent, indent + 10, barWidth, 5);
  }
}