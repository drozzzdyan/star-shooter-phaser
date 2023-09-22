class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  create() {
    this.createBackground();
    this.createBtns();
    new Player(this, this.sys.game.config.width / 2, 150, 'ship');
  }

  createBackground() {
    this.background = this.add.sprite(0, 0, 'background');
    this.background.setOrigin(0, 0);
  }

  createBtns() {
    const midX = this.sys.game.config.width / 2;
    const midY = this.sys.game.config.height / 2;

    this.btnStart = new MenuBtn(this, midX, midY, 'start-btn', 'Start');
    this.btnInstruction = new MenuBtn(this, midX, midY + 50, 'start-btn', 'Instruction');
    this.btnInstruction = new MenuBtn(this, midX, midY + 100, 'start-btn', 'Settings');

    this.btnStart.on('pointerdown', () => {
      this.scene.start('Level1Scene');
    })    
  }
}