class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  preload() {
    this.load.image('background', 'assets/sprites/background.jpg');
  }

  create() {
    this.createBackground();
  }

  createBackground() {
    this.background = this.add.sprite(0, 0, 'background');
    this.background.setOrigin(0, 0);

    this.tweens.add({
      targets: this.background,
      x: -this.sys.game.config.width,
      duration: 5000,
      repeat: -1,
    });
  }
}