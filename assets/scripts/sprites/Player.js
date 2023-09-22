class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name, frame = 'ship') {
    super(scene, x, y, name, frame);
    this.scene = scene;
    this.setInteractive();
    this.scene.add.existing(this); //add the sprite to the stage
    this.setScale(0.16);
  }

  moveToStartPosition() {
    console.log(this)
    this.scene.tweens.add({
      targets: this,
      x: 80,
      y: this.scene.sys.game.config.height / 2,
      duration: 1200,
      repeat: 0,
    });
  }
}