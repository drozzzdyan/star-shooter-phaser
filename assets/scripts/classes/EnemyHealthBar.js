export default class EnemyHealthBar {
  constructor(scene) {
    this.scene = scene;
    this.bar = this.scene.add.graphics();
  }

  renderBarTexture(x, y, currentHealth, fullHealth, enemyWidth) {
    const scale = 0.7;
    const barWidth = currentHealth / fullHealth * enemyWidth * scale;

    this.bar.clear();
    this.bar.fillStyle(0x800b0b, 1);
    this.bar.fillRect(x - barWidth / 2, y + 40, barWidth, 2);
  }

  clear() {
    this.bar.clear();
  }
}