class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  create() {
    this.createBtnStart();
  }

  createBtnStart() {
    const midX = this.sys.game.config.width / 2;
    const midY = this.sys.game.config.height / 2;

    this.btnStart = this.add.sprite(midX, midY, 'btn-start');
    this.btnStart.setInteractive();
    this.btnStart.on('pointerdown', () => {
      this.scene.start('Level1Scene');
    })
  }
}