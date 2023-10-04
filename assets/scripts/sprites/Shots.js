import Shot from "./Shot.js";

export default class Shots extends Phaser.Physics.Arcade.Group {
  constructor(scene, player) {
    super();
    this.scene = scene;
    this.player = player;
  }

  shot(shotSpeed) {
    const x = this.player.x + this.player.width / 2;
    const y = this.player.y;
    const type = this.player.shipType;

    this.createShot(x, y, type, shotSpeed);
  }

  createShot(x, y, shotType, shotSpeed) {
    let shot = this.getFirstDead();

    if (!shot) {
      shot = Shot.generate(this.scene, x, y, shotType);
      this.add(shot);
      shot.move(shotSpeed);
    } else {
      shot.reset(x, y, shotType);
    }
    shot.move(shotSpeed);
  }
}