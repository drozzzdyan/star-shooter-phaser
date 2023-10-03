import shipsConfigs from "../constants/ShipConfigs.js";
import healthBar from "../classes/healthBar.js";
import Enemies from "../sprites/Enemies.js";
import Player from "../sprites/Player.js";
import btnShot from "../classes/btnShot.js";
import Shots from "../sprites/Shots.js";

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
    const btnPositionX = this.sys.game.config.width - 50;
    const btnPositionY = this.sys.game.config.height - 50;
    this.btnShot = new btnShot(this, btnPositionX, btnPositionY, 'btn', 'btn_shot', 'btn_shot_active', 'piu');

    this.player = new Player(this, data.startPlayerX, data.startPlayerY, 'player', `player${data.shipType}`, data.shipType);
    this.player.moveToStartPosition();
    this.player.initTouchControll();
    this.player.keyboardControll();

    const health = shipsConfigs.find(el => el.type === data.shipType).health;
    this.healthBar = new healthBar(this, health);
    this.enemies = new Enemies(this);
    this.enemies.createEnemiesGroup();

    this.shots = new Shots(this, this.player);
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