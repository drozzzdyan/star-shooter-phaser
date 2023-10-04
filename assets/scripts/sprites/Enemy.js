import EnemyConfigs from "../constants/EnemyConfigs.js";
import EnemyShots from "./EnemyShots.js";

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, enemyType) {
    super(scene, x, y, texture, `enemy${enemyType}`);
    this.scene = scene;
    this.enemyType = enemyType;
    this.init();
  }

  static generate(scene, x, y, enemyType = 11) {
    return new Enemy(scene, x, y, 'enemy', enemyType);
  }

  init() {
    this.enemyConfig = EnemyConfigs.find(el => el.type === this.enemyType);
    this.scene.add.existing(this); //add the sprite to the stage
    this.scene.physics.add.existing(this); //add the sprite to the physics
    this.body.enable = true;
    this.velocity = 70;
    this.setScale(0.8);
    this.scene.events.on('update', this.update, this);
    this.enemyShots = new EnemyShots(this.scene, this);

    this.shotsTimer = this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.enemyShots.shot(300)
      }
    })
  }

  update() {
    this.checkWorldBounds();
  }

  reset(x, y, enemyType) {
    this.enemyType = enemyType;
    this.x = x;
    this.y = y;
    this.setFrame(`enemy${enemyType}`);
    this.setAllive(true);
  }

  checkWorldBounds() {
    if (this.x < -this.width) {
      this.setAllive(false);
    }
  }

  setAllive(alliveCondition) {
    this.body.enable = alliveCondition; // Whether this Body is updated by the physics simulation
    this.setActive(alliveCondition);
    this.setVisible(alliveCondition);
  }

  move() {
    this.body.setVelocityX(-this.velocity);
  }
}