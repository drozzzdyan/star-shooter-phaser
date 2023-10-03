import shipsConfigs from "../constants/ShipConfigs.js";
import Shots from "./Shots.js";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame = 'player1', shipType = 1) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.shipType = shipType;
    this.init();
  }

  init() {
    this.scene.events.on('update', this.update, this);
    this.scene.add.existing(this); //add the sprite to the stage
    this.scene.physics.add.existing(this); //add the sprite to the physics
    this.draggingPlayer = false;
    this.body.enable = true;
    this.quantitySkins = shipsConfigs.length;
    this.currentSkinNumber = 1;
    this.worldOffset = 40;
    this.worldOffsetTop = 30;


    const speedCoefficient = 5;
    const speed = shipsConfigs.find(el => el.type === this.shipType).speed * speedCoefficient;
    this.speed = speed;
    this.cursorFollowSpeed = 1 / this.speed * 80000;
    this.coursorInit = false;
    this.fingerIndent = 80;
    this.scene.input.addPointer(3);

    this.shots = new Shots(this.scene, this);

    this.setInteractive();
    this.setScale(0.8);
  }

  update() {
    this.touchControll();
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

  keyboardControll() {
    const indent = this.worldOffset;
    const indentTop = this.worldOffsetTop;

    if (this.scene.keyboard.up.isDown && this.y > indent + indentTop) {
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

  touchControll() {
    if (this.scene.input.pointer1.isDown && this.coursorInit) {
      this.scene.tweens.add({
        targets: this,
        y: this.scene.input.pointer1.y,
        x: this.scene.input.pointer1.x + this.fingerIndent,
        duration: this.cursorFollowSpeed,
        repeat: 0,
      });
    }
    if (this.scene.input.pointer2.isDown && this.coursorInit) {
      this.shots.shot();
    }
  }

  changeSkin() {
    this.currentSkinNumber += 1;
    const textureNumber = this.currentSkinNumber % this.quantitySkins + 1;
    this.setTexture('player', `player${textureNumber}`);
    return textureNumber;
  }
}