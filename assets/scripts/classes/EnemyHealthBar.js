export default class EnemyHealthBar {
  constructor(scene) {
    this.scene = scene;
    this.bar = this.scene.add.graphics();
  }

  renderBarTexture(enemy) {
    const scale = 0.7;
    const barWidth = enemy.currentHealth / enemy.enemyConfig.health * enemy.width * scale;

    this.bar.clear();
    this.bar.fillStyle(0x800b0b, 1);
    this.bar.fillRect(enemy.x - barWidth / 2, enemy.y + enemy.height / 2 + 3, barWidth, 2);
  }

  clear() {
    this.bar.clear();
  }
}