class Level1Scene extends Phaser.Scene {
  constructor() {
    super('Level1Scene');
  }

  create() {
    this.createBackground();
    this.animateBackground();
    this.player = new Player(this, this.sys.game.config.width / 2, 150, 'ship', 'ship_active');
    this.player.moveToStartPosition();
    this.player.initTouchControll();
    this.keyboard = this.input.keyboard.createCursorKeys();
    this.player.keyboardControll();
  }

  createBackground() {
    this.background = this.add.sprite(0, 0, 'background');
    this.background.setOrigin(0, 0);
  }

  update() {
    this.player.keyboardControll();
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