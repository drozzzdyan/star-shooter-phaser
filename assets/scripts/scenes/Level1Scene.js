import Player from "../sprites/Player.js";

export default class Level1Scene extends Phaser.Scene {
  constructor() {
    super('Level1Scene');
  }

  init(data) {
    this.keyboard = this.input.keyboard.createCursorKeys();
    this.backgroundVelocity = 1;
    this.skin = data.skin;
  }

  create() {
    this.createBackground();
    this.player = new Player(this, this.sys.game.config.width / 2, 150, 'player', this.skin);
    this.player.moveToStartPosition();
    this.player.initTouchControll();
    this.player.keyboardControll();
  }

  update() {
    this.player.keyboardControll();
    this.background.tilePositionX += this.backgroundVelocity;
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
    this.background.setOrigin(0, 0);

  }
}