export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame = 'enemy1') {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.init();
  }

  static generate(scene, type = 1) {
    const x = scene.sys.game.config.width + 100;
    const y = Phaser.Math.Between(100, scene.sys.game.config.height - 100);
    const texture = 'enemy';
    const frame = `enemy${type}`;

    return new Enemy(scene, x, y, texture, frame);
  }

  init() {
    this.scene.add.existing(this); //add the sprite to the stage
    this.scene.physics.add.existing(this); //add the sprite to the physics
    this.body.enable = true;
    this.currentSkinNumber = 1;
    this.quantitySkins = 11;
    this.velocity = 200;
    // this.setInteractive();
    this.setScale(0.8);
  }
 
  move() {
    this.body.setVelocityX(-this.velocity);
  }
}