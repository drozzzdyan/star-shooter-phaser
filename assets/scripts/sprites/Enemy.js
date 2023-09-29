export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, enemyType = 1) {
    super(scene, x, y, texture, `enemy${enemyType}`);
    this.scene = scene;
    this.enemyType = enemyType;
    this.init();
  }

  static generateAttributes(scene) {
    const x = scene.sys.game.config.width + 30;
    const y = Phaser.Math.Between(30, scene.sys.game.config.height - 30);
    const enemyType = Phaser.Math.Between(1, 11);
    return { x, y, enemyType }
  }

  static generate(scene) {
    const data = Enemy.generateAttributes(scene);
    return new Enemy(scene, data.x, data.y, 'enemy', data.enemyType);
  }

  init() {
    this.scene.add.existing(this); //add the sprite to the stage
    this.scene.physics.add.existing(this); //add the sprite to the physics
    this.body.enable = true;
    this.currentSkinNumber = 1;
    this.quantitySkins = 11;
    this.velocity = 70;
    this.setScale(0.8);
    this.scene.events.on('update', this.update, this);
  }

  update() {
    this.checkWorldBounds();
  }

  reset() {
    const data = Enemy.generateAttributes(this.scene);

    this.x = data.x;
    this.y = data.y;
    this.setFrame(`enemy${data.enemyType}`);

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