import shipsConfigs from "../constants/PlayerConfigs.js";
import PlayerHealthBar from "../classes/PlayerHealthBar.js";
import Shots from "./Shots.js";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, shipType = 1) {
    super(scene, x, y, texture, `player${shipType}`);
    this.scene = scene;
    this.shipType = shipType;
    this.init();
  }

  init() {
    this.setInteractive();
    this.setScale(0.5);
    this.scene.events.on('update', this.update, this);
    this.scene.add.existing(this); //add the sprite to the stage
    this.scene.physics.add.existing(this); //add the sprite to the physics
    this.scene.input.addPointer(3);
    this.body.enable = true;
    this.touchControllInit = false;
    this.quantitySkins = shipsConfigs.length;
    this.currentSkinNumber = 1;
    this.worldOffset = 40;
    this.worldOffsetTop = 30;

    this.shipConfig = shipsConfigs.find(el => el.type === this.shipType);
    this.currentHealth = this.shipConfig.health;
    const speedCoefficient = 5;
    const speed = this.shipConfig.speed * speedCoefficient;
    this.speed = speed;
    const cursorFollowSpeedCoefficient = 80000;
    this.cursorFollowSpeed = 1 / this.speed * cursorFollowSpeedCoefficient;

    this.shots = new Shots(this.scene, this);
    this.attackFlag = true;
    this.attackFlagTouch = true;
    this.timeShotFlag = true;
    this.timeShotFlagTouch = true;
    this.playerIsTouch = false;
  }

  update() {
    this.touchControll();
  }

  changeSkin() {
    const textureNumber = this.currentSkinNumber % this.quantitySkins + 1;
    this.setTexture('player', `player${textureNumber}`);
    this.body.setSize(this.width, this.height);
    this.currentSkinNumber += 1;
    return textureNumber;
  }

  setAllive(alliveCondition) {
    this.body.enable = alliveCondition;
    this.setActive(alliveCondition);
    this.setVisible(alliveCondition);
  }

  moveToStartPosition() {
    this.scene.tweens.add({
      targets: this,
      x: 90,
      y: this.scene.sys.game.config.height / 2,
      duration: 800,
      repeat: 0,
      onComplete: () => {
        this.touchControllInit = true;
        this.keyboardControll();
        this.healthBar = new PlayerHealthBar(this.scene, this.currentHealth);
      },
    });
  }

  keyboardControll() {
    if (this.scene.keyboard.up.isDown && this.y > this.worldOffset + this.worldOffsetTop) {
      this.body.setVelocityY(-this.speed);
    } else if (this.scene.keyboard.down.isDown && this.y < this.scene.sys.game.config.height - this.worldOffset) {
      this.body.setVelocityY(this.speed);
    } else {
      this.body.setVelocityY(0);
    }

    if (this.scene.keyboard.left.isDown && this.x > this.worldOffset) {
      this.body.setVelocityX(-this.speed);
    } else if (this.scene.keyboard.right.isDown && this.x < this.scene.sys.game.config.width - this.worldOffset) {
      this.body.setVelocityX(this.speed);
    } else {
      this.body.setVelocityX(0);
    }

    if (this.scene.keyboard.space.isDown && this.attackFlag && this.timeShotFlag) {
      this.shots.shot(this.speed);
      this.attackFlag = false;
      this.timeShotFlag = false;
    }
    if (this.scene.keyboard.space.isUp && !this.attackFlag) {
      this.attackFlag = true;
      this.scene.time.addEvent({
        delay: this.shipConfig.shotDelay,
        callback: () => {
          this.timeShotFlag = true;
        },
      })
    }
  }

  touchControll() {
    const fingerOffsetZone = 80;
    const fingerIndent = 60;
    const fingerConditionX = Math.abs((this.x - fingerIndent) - this.scene.input.pointer1.x) < fingerOffsetZone;
    const fingerConditionY = Math.abs(this.y - this.scene.input.pointer1.y) < fingerOffsetZone;

    if (this.scene.input.pointer1.isDown && this.touchControllInit && !this.playerIsTouch && fingerConditionX && fingerConditionY) {
      this.playerIsTouch = true;
    }

    if (!this.scene.input.pointer1.isDown && this.touchControllInit && this.playerIsTouch) {
      this.playerIsTouch = false;
    }

    const worldOffsetConditionTop = this.scene.input.pointer1.y > this.worldOffset + this.worldOffsetTop;
    const worldOffsetConditionBottom = this.scene.input.pointer1.y < this.scene.sys.game.config.height - this.worldOffset;
    const worldOffsetConditionX = Math.abs(this.scene.input.pointer1.x + fingerIndent) < this.scene.sys.game.config.width - this.worldOffset;

    if (this.scene.input.pointer1.isDown && this.touchControllInit && this.playerIsTouch && worldOffsetConditionX && worldOffsetConditionTop && worldOffsetConditionBottom) {
      this.scene.tweens.add({
        targets: this,
        y: this.scene.input.pointer1.y,
        x: this.scene.input.pointer1.x + fingerIndent,
        duration: this.cursorFollowSpeed,
        repeat: 0,
      });
    }

    if (this.scene.input.pointer2.isDown && this.touchControllInit && this.attackFlagTouch && this.timeShotFlagTouch) {
      this.shots.shot(this.speed);
      this.attackFlagTouch = false;
      this.timeShotFlagTouch = false;
    }
    if (!this.scene.input.pointer2.isDown && !this.attackFlagTouch) {
      this.attackFlagTouch = true;
      this.scene.time.addEvent({
        delay: this.shipConfig.shotDelay,
        callback: () => {
          this.timeShotFlagTouch = true;
        },
      })
    }
  }

  checkOverlaps() {
    this.scene.physics.add.overlap(this.shots, this.scene.enemies, this.playerDamageEnemy, undefined, this)
    this.scene.physics.add.overlap(this, this.scene.enemies, this.playerBumpEnemy, undefined, this)
  }

  playerDamageEnemy(source, target) {
    target.damaged(source.damage);
    source.setAllive(false);
  }

  playerBumpEnemy(source, target) {
    this.crush(target.currentHealth);
    target.setAllive(false);
    target.healthBar.clear();
  }

  crush(damage) {
    this.currentHealth -= damage;
    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      this.setAllive(false);
      this.touchControllInit = false;
    }
    this.healthBar.showHealthBar(this.currentHealth); 
  }
}