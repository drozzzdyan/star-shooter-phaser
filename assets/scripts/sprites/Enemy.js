import EnemyConfigs from "../constants/EnemyConfigs.js";
import EnemyShots from "./EnemyShots.js";
import EnemyHealthBar from "../classes/EnemyHealthBar.js";

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
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.events.on('update', this.update, this);

    this.enemyConfig = EnemyConfigs.find(el => el.type === this.enemyType);
    this.enemyCurrentHealth = this.enemyConfig.health;

    this.body.enable = true;
    this.speed = 100;
    this.setScale(0.8);

    this.enemyShots = new EnemyShots(this.scene, this);
    this.startAttack();
    this.checkOverlaps();

    this.healthBar = new EnemyHealthBar(this.scene, this);
  }

  update() {
    this.checkWorldBounds();
    if (this.active) {
      this.healthBar.renderBarTexture(this.x, this.y, this.enemyCurrentHealth, this.enemyConfig.health, this.width);
    }
  }

  reset(x, y, enemyType) {
    this.enemyType = enemyType;
    this.enemyConfig = EnemyConfigs.find(el => el.type === this.enemyType);
    this.enemyCurrentHealth = this.enemyConfig.health;

    this.x = x;
    this.y = y;
    this.setFrame(`enemy${enemyType}`);
    this.setAllive(true);
    this.startAttack();
    // this.checkOverlaps();
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
    if (this.shotsTimer && !alliveCondition) {
      this.shotsTimer.remove();
    }
  }

  move() {
    this.body.setVelocityX(-this.speed);
  }

  startAttack() {
    let randomDelay = Phaser.Math.Between(this.enemyConfig.minAttackDelay, this.enemyConfig.maxAttackDelay);
    this.shotsTimer = this.scene.time.addEvent({
      delay: randomDelay,
      loop: true,
      callback: () => {
        this.enemyShots.shot(200);
      }
    })
  }

  checkOverlaps() {
    this.scene.physics.add.overlap(this.scene.player, this.enemyShots, () => {
      console.log('enemy damage player')
    })
  }
}