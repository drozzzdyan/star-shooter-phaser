class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name, frame = 'ship') {
    super(scene, x, y, name, frame);
    this.scene = scene;
    this.init();
  }

  init() {
    this.scene.add.existing(this); //add the sprite to the stage
    this.scene.physics.add.existing(this); //add the sprite to the physics
    this.body.enable = true;
    this.setInteractive();
    this.setScale(0.16);
  }

  moveToStartPosition() {
    this.scene.tweens.add({
      targets: this,
      x: 80,
      y: this.scene.sys.game.config.height / 2,
      duration: 1200,
      repeat: 0,
    });
  }

  initControll() {
    let isTouching;
    this.scene.input.on('pointerdown', () => {
      isTouching = true;
    });

    this.scene.input.on('pointerup', () => {
      isTouching = false;
    });

    this.scene.input.on('pointermove', pointer => {
      if (isTouching) {
        // this.y = pointer.y;
        this.scene.tweens.add({
          targets: this,
          y: pointer.y,
          duration: 100,
          repeat: 0,
        });
      }
    });
  }
}