export default class Shot extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, shotType = 1) {
    super(scene, x, y, texture, `shot${shotType}`);
    this.scene = scene;
    this.shotType = shotType;
    this.init();
  }

  static generate(scene, x, y, shotType) {
    return new Shot(scene, x, y, 'shot', shotType);
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = 150;
    this.scene.events.on('update', this.update, this);
  }

  update() {
    this.checkWorldBounds();
  }

  reset(x, y, shotType) {
    this.x = x;
    this.y = y;
    this.setFrame(`shot${shotType}`);
    this.setAllive(true);
  }

  checkWorldBounds() {
    if (this.x > this.scene.sys.game.config.width) {
      this.setAllive(false);
    }
  }

  setAllive(alliveCondition) {
    this.body.enable = alliveCondition; // Whether this Body is updated by the physics simulation
    this.setActive(alliveCondition);
    this.setVisible(alliveCondition);
  }

  move(shotSpeed) {
    this.body.setVelocityX(shotSpeed);
  }
}