import EnemyConfigs from "../constants/EnemyConfigs.js";

export default class EnemyShot extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, shotType = 1) {
    super(scene, x, y, texture, `enemyShot${shotType}`);
    this.scene = scene;
    this.shotType = shotType;
    this.init();
  }

  static generate(scene, x, y, shotType) {
    return new EnemyShot(scene, x, y, 'enemyShot', shotType);
  }

  init() {
    this.scene.events.on('update', this.update, this);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;

    this.damage = EnemyConfigs.find(el => el.type === this.shotType).damage;
  }

  update() {
    this.checkWorldBounds();
  }

  reset(x, y, shotType) {
    this.x = x;
    this.y = y;
    this.setFrame(`enemyShot${shotType}`);
    this.setAllive(true);
  }

  checkWorldBounds() {
    if (this.x < 0) {
      this.setAllive(false);
    }
  }

  setAllive(alliveCondition) {
    this.body.enable = alliveCondition; // Whether this Body is updated by the physics simulation
    this.setActive(alliveCondition);
    this.setVisible(alliveCondition);
  }

  move(enemyShotSpeed) {
    this.body.setVelocityX(-enemyShotSpeed);
  }
}