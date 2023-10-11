import EnemyShot from "./EnemyShot.js";

export default class EnemyShots extends Phaser.Physics.Arcade.Group {
  constructor(scene, enemy) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.enemy = enemy;
  }

  shot(enemyShotSpeed) {
    const x = this.enemy.x - this.enemy.width / 2;
    const y = this.enemy.y;
    const type = this.enemy.enemyType;

    if (this.enemy.x < this.scene.sys.game.config.width) {
      this.createShot(x, y, type, enemyShotSpeed);
    }
  }

  createShot(x, y, shotType, enemyShotSpeed) {
    let shot = this.getFirstDead();

    if (!shot) {
      shot = EnemyShot.generate(this.scene, x, y, shotType);
      this.add(shot);
      shot.move(enemyShotSpeed);
    } else {
      shot.reset(x, y, shotType);
    }
    shot.move(enemyShotSpeed);
  }
}