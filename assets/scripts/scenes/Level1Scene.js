class Level1Scene extends Phaser.Scene {
  constructor() {
    super('Level1Scene');
  }
  
  create() {
    this.createBackground();
    this.animateBackground();
    console.log(this)
  }

  createBackground() {
    this.background = this.add.sprite(0, 0, 'background');
    this.background.setOrigin(0, 0);
  }

  animateBackground() {
    this.tweens.add({
      targets: this.background,
      x: -this.sys.game.config.width,
      duration: 5000,
      repeat: -1,
    });
  }
}