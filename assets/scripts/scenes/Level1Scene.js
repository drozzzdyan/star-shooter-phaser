import Enemies from "../sprites/Enemies.js";
import Player from "../sprites/Player.js";

export default class Level1Scene extends Phaser.Scene {
  constructor() {
    super('Level1Scene');
  }

  init() {
    this.keyboard = this.input.keyboard.createCursorKeys();
    this.backgroundVelocity = 1;
  }

  create(data) {
    this.createBackground();
    this.player = new Player(this, data.startPlayerX, data.startPlayerY, 'player', data.shipType);
    this.player.moveToStartPosition();

    this.enemies = new Enemies(this);
    this.enemies.createEnemiesGroup();
    
    this.player.checkOverlaps();
  }

  update() {
    this.player.keyboardControll();
    this.checkPlayerLose();
    this.background.tilePositionX += this.backgroundVelocity;
  }

  checkPlayerLose() {
    if (this.player.currentAllyHealth <= 0 || this.player.currentHealth <= 0) {
      this.player.setAllive(false);
      this.events.emit('lose');
      this.enemies.clear(true, true);
      this.scene.start('EndScene', { score: this.player.scorePoints });
    }
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
    this.background.setOrigin(0, 0);
  }
}