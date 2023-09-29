import Enemy from "./Enemy.js";

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.timer = this.scene.time.addEvent({
      delay: 2400,
      loop: true,
      callback: this.tick,
      callbackScope: this,
    })
  }

  tick() {
    this.createEnemy();
  }

  createEnemy() {
    let enemy = this.getFirstDead();

    console.log(this.getLength())

    if (!enemy) {
      enemy = Enemy.generate(this.scene);
      this.add(enemy);
    } else {
      enemy.reset();
    }

    enemy.move();
  }
}