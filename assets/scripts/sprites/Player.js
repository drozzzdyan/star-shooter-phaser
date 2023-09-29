import shipsConfigs from "../constants/ShipConfigs.js";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame = 'player1', shipType = 1) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.shipType = shipType;
    this.init();
  }

  init() {
    this.scene.add.existing(this); //add the sprite to the stage
    this.scene.physics.add.existing(this); //add the sprite to the physics
    this.body.enable = true;
    this.quantitySkins = shipsConfigs.length;
    this.currentSkinNumber = 1;
    this.worldOffset = 35;

    const speedCoefficient = 5;
    const speed = shipsConfigs.find(el => el.type === this.shipType).speed * speedCoefficient;
    this.speed = speed;

    this.setInteractive();
    this.setScale(0.8);
  }

  moveToStartPosition() {
    this.scene.tweens.add({
      targets: this,
      x: 100,
      y: this.scene.sys.game.config.height / 2,
      duration: 500,
      repeat: 0,
    });
  }

  initTouchControll() {
    const indent = this.worldOffset;
    const fingerIndent = 80;
    const correctionFactor = 80000;
    const cursorFollowSpeed = 1 / this.speed * correctionFactor;
    let isTouching;

    this.scene.input.on('pointerdown', () => {
      isTouching = true;
    });

    this.scene.input.on('pointerup', () => {
      isTouching = false;
    });

    this.scene.input.on('pointermove', pointer => {
      const conditionAsixX = pointer.x > 0 + indent - fingerIndent && pointer.x < this.scene.sys.game.config.width - indent - fingerIndent;
      const conditionAsixY = pointer.y > 0 + indent && pointer.y < this.scene.sys.game.config.height - indent;

      if (isTouching && conditionAsixX && conditionAsixY) {
        this.scene.tweens.add({
          targets: this,
          y: pointer.y,
          x: pointer.x + fingerIndent,
          duration: cursorFollowSpeed,
          repeat: 0,
        });
      }
    });
  }

  keyboardControll() {
    const indent = this.worldOffset;

    if (this.scene.keyboard.up.isDown && this.y > indent) {
      this.body.setVelocityY(-this.speed);
    } else if (this.scene.keyboard.down.isDown && this.y < this.scene.sys.game.config.height - indent) {
      this.body.setVelocityY(this.speed);
    } else {
      this.body.setVelocityY(0);
    }

    if (this.scene.keyboard.left.isDown && this.x > indent) {
      this.body.setVelocityX(-this.speed);
    } else if (this.scene.keyboard.right.isDown && this.x < this.scene.sys.game.config.width - indent) {
      this.body.setVelocityX(this.speed);
    } else {
      this.body.setVelocityX(0);
    }
  }

  changeSkin() {
    this.currentSkinNumber += 1;
    const textureNumber = this.currentSkinNumber % this.quantitySkins + 1;
    this.setTexture('player', `player${textureNumber}`);
    return textureNumber;
  }
}