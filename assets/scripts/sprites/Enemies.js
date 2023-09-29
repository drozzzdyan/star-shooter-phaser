import Enemy from "./Enemy.js";

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
  }

  createEnemy(type = 1) {
    let enemy = Enemy.generate(this.scene, type);
    this.add(enemy);
    enemy.move();
  }
}