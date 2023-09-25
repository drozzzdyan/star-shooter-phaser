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
    this.setScale(0.15);
    // console.log(this)
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

  initTouchControll() {
    const indent = 40;
    let isTouching;

    this.scene.input.on('pointerdown', () => {
      isTouching = true;
    });

    this.scene.input.on('pointerup', () => {
      isTouching = false;
    });

    this.scene.input.on('pointermove', pointer => {
      if (isTouching && pointer.y > 0 + indent && pointer.y < this.scene.sys.game.config.height - indent) {
        this.scene.tweens.add({
          targets: this,
          y: pointer.y,
          duration: 100,
          repeat: 0,
        });
      }
    });
  }

  keyboardControll() {
    const indent = 40;

    if (this.scene.keyboard.up.isDown && this.y > 0 + indent) {
      this.body.setVelocityY(-200);
    } else if (this.scene.keyboard.down.isDown && this.y < this.scene.sys.game.config.height - indent) {
      this.body.setVelocityY(200);
    } else {
      this.body.setVelocityY(0);
    }
  }
}