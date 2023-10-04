import Shot from "./Shot.js";

export default class Shots extends Phaser.Physics.Arcade.Group {
  constructor(scene, player) {
    super();
    this.scene = scene;
    this.player = player;
  }

  shot() {
    this.createShot(this.player.x, this.player.y, this.player.shipType);
  }

  createShot(x, y, shotType) {
    let shot = this.getFirstDead();
    // console.log(this.getLength());

    if (!shot) {
      shot = Shot.generate(this.scene, x, y, shotType);
      this.add(shot);
      shot.move();
    } else {
      shot.reset(x, y, shotType);
    }
    shot.move();
  }
}