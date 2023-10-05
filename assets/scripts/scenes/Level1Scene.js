import shipsConfigs from "../constants/PlayerConfigs.js";
import Enemies from "../sprites/Enemies.js";
import Player from "../sprites/Player.js";
import PlayerHealthBar from "../classes/PlayerHealthBar.js";

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

    const health = shipsConfigs.find(el => el.type === data.shipType).health;
    this.healthBar = new PlayerHealthBar(this, health);
    this.enemies = new Enemies(this);
    this.enemies.createEnemiesGroup();
    
    this.player.checkOverlaps();
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