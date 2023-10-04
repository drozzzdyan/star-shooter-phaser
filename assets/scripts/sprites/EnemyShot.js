export default class EnemyShot extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, enemyShotType = 1) {
    super(scene, x, y, texture, `enemyShot${enemyShotType}`);
    this.scene = scene;
    this.enemyShotType = enemyShotType;
    this.init();
  }

  static generate(scene, x, y, enemyShotType) {
    return new EnemyShot(scene, x, y, 'enemyShot', enemyShotType);
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.scene.events.on('update', this.update, this);
  }

  update() {
    this.checkWorldBounds();
  }

  reset(x, y, enemyShotType) {
    this.x = x;
    this.y = y;
    this.setFrame(`enemyShot${enemyShotType}`);
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