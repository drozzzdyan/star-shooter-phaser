export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, enemyType = 1) {
    super(scene, x, y, texture, `enemy${enemyType}`);
    this.scene = scene;
    this.enemyType = enemyType;
    this.init();
  }

  // static generateAttributes(scene) {
  //   const x = scene.sys.game.config.width + 30;
  //   const y = Phaser.Math.Between(60, scene.sys.game.config.height - 30);
  //   return { x, y }
  // }

  static generate(scene, x, y, enemyType = 11) {
    // const data = Enemy.generateAttributes(scene);
    return new Enemy(scene, x, y, 'enemy', enemyType);
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

  reset(x, y, enemyType) {
    // const data = Enemy.generateAttributes(this.scene);
    // this.x = data.x;
    // this.y = data.y;
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