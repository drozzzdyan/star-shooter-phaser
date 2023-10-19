export default class HealthBonus extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, scene.sys.game.config.width + 50, 0, 'healthBonus', 'hurt1');
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
      delay: this.generateDelay,
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
      this.timerCreate.delay = this.generateDelay;
      this.timerMoving.paused = true;
    }
  }

  generateParams() {
    this.generateDelay = Phaser.Math.Between(15000, 40000);
    this.hurtType = Phaser.Math.Between(1, 2);
    this.setFrame(`hurt${this.hurtType}`);

    this.ySpread = Phaser.Math.Between(80, 130);
    this.xSpread = Phaser.Math.Between(60, 200);
    this.yOffset = Phaser.Math.Between(-80, 80) + this.scene.sys.game.config.height / 2;
    this.xMoveDelay = Phaser.Math.Between(7, 13);
  }

  setAllive(alliveCondition) {
    this.body.enable = alliveCondition;
    this.setActive(alliveCondition);
    this.setVisible(alliveCondition);
  }
}