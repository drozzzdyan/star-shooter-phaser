import Shot from "./Shot.js";

export default class Shots extends Phaser.Physics.Arcade.Group {
  constructor(scene, player) {
    super();
    this.scene = scene;
    this.player = player;
    // this.delayEnemyCreate = 1000;
    // this.timer = this.scene.time.addEvent({
    //   delay: this.delayEnemyCreate,
    //   loop: true,
    //   callback: this.tick,
    //   callbackScope: this,
    // })
  }

  shot() {
    this.createShot(this.player.x, this.player.y, this.player.shipType);
  }

  createShot(x, y, shotType) {
    let shot = this.getFirstDead();
    console.log(this.getLength());

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