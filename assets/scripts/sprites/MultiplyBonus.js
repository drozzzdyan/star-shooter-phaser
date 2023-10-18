export default class multiplyBonus extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, scene.sys.game.config.width + 50, 0, 'multiplyBonus', 'bonusX2');
    this.scene = scene;
    this.init();
  }

  init() {
    this.setScale(0.2);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setAllive(true);
    this.generateParams();

    this.timerCreate = this.scene.time.addEvent({
      delay: 15000,
      loop: true,
      callback: () => {
        this.setAllive(true);
        this.move();
      }
    })
  }

  move() {
    this.x = this.scene.sys.game.config.width + 50;

    if (this.timerMoving) {
      this.timerMoving.paused = false;
    } else {
      this.timerMoving = this.scene.time.addEvent({
        delay: this.xMoveDelay,
        loop: true,
        callback: this.tick,
        callbackScope: this,
      })
    }
  }

  tick() {
    this.x--;
    this.y = Math.sin(this.x / this.xSpread) * this.ySpread + this.yOffset;

    if (this.x < -50) {
      this.x = this.scene.sys.game.config.width + 50;
      this.generateParams();
      this.timerMoving.paused = true;
    }
  }

  generateParams() {
    this.multiplyBonus = this.generateRandomMultiply();
    this.setFrame(`bonusX${this.multiplyBonus}`);

    this.ySpread = Phaser.Math.Between(80, 130);
    this.xSpread = Phaser.Math.Between(60, 200);
    this.yOffset = Phaser.Math.Between(-80, 80) + this.scene.sys.game.config.height / 2;
    this.xMoveDelay = Phaser.Math.Between(7, 13);
  }

  generateRandomMultiply() {
    const multiplyBonuses = [2, 3, 5, 7, 9];
    const i = Phaser.Math.Between(0, 4);

    return multiplyBonuses[i];
  }

  setAllive(alliveCondition) {
    this.body.enable = alliveCondition;
    this.setActive(alliveCondition);
    this.setVisible(alliveCondition);
  }
}