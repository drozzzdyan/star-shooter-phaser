import Enemies from "../sprites/Enemies.js";
import Enemy from "../sprites/Enemy.js";
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
    this.player = new Player(this, data.startPlayerX, data.startPlayerY, 'player', `player${data.shipType}`);
    this.player.moveToStartPosition();
    this.player.initTouchControll();
    this.player.keyboardControll();

    this.enemies = new Enemies(this);
    this.enemies.createEnemy(1);
    this.enemies.createEnemy(2);
    this.enemies.createEnemy(4);

    this.time.addEvent({
      delay: 4000,
      callback: this.clear,
      callbackScope: this,
    })
  }

  clear() {
    this.enemies.destroy(true, true)
    console.log(this.enemies)
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