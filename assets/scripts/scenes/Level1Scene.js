import shipsConfigs from "../constants/ShipConfigs.js";
import healthBar from "../classes/healthBar.js";
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
    this.player = new Player(this, data.startPlayerX, data.startPlayerY, 'player', `player${data.shipType}`, data.shipType);
    this.player.moveToStartPosition();
    this.player.initTouchControll();
    this.player.keyboardControll();

    const health = shipsConfigs.find(el => el.type === data.shipType).health;
    this.healthBar = new healthBar(this, health);
    // console.log(this.time.now)
    this.enemies = new Enemies(this);
    this.enemies.createEnemiesGroup();
  }

  update() {
    this.player.keyboardControll();
    this.background.tilePositionX += this.backgroundVelocity;
    // console.log(this.time.now)

  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
    this.background.setOrigin(0, 0);
  }
}