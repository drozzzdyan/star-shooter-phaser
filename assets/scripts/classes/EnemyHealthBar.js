export default class EnemyHealthBar extends Phaser.GameObjects.Sprite {
  constructor(scene, enemy) {
    super(scene, enemy.x, enemy.y);
    this.enemy = enemy;
    this.init()
    this.renderBarTexture(enemy.enemyConfig.health, enemy.enemyConfig.health, enemy.width)
  }

  init() {
    this.setOrigin(0.5)
    this.scene.add.existing(this);
  }

  renderBarTexture(currentHealth, fullHealth, enemyWidth) {
    const scale = 0.7;
    const barWidth = currentHealth / fullHealth * enemyWidth * scale;

    this.bar = this.scene.add.graphics();
    this.bar.fillStyle(0x800b0b, 0.5);
    this.bar.fillRect(0, 0, barWidth, 2);
    this.bar.generateTexture(`enemyHealthBar${this.enemy.enemyType}health${currentHealth}`, barWidth, 2);
    this.bar.clear();
    this.setTexture(`enemyHealthBar${this.enemy.enemyType}health${currentHealth}`);
  }

  follow() {
    this.x = this.enemy.x;
    this.y = this.enemy.y + this.enemy.height / 2 + 2;
  }

  setAllive(alliveCondition) {
    this.setVisible(alliveCondition);
  }
}