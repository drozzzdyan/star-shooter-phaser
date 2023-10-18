import ProgressBar from "../classes/progressBar.js";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.createBackground();
    this.progressBar = new ProgressBar(this);
    this.preloadAssets();
  }

  preloadAssets() {
    this.load.image('ally', 'assets/sprites/ally.png', 'assets/sprites/ally.json');
    this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/player.json');
    this.load.atlas('enemy', 'assets/sprites/enemy.png', 'assets/sprites/enemy.json');
    this.load.atlas('btn', 'assets/sprites/btn.png', 'assets/sprites/btn.json');
    this.load.atlas('shot', 'assets/sprites/shot.png', 'assets/sprites/shot.json');
    this.load.atlas('enemyShot', 'assets/sprites/enemyShot.png', 'assets/sprites/enemyShot.json');
    this.load.atlas('multiplyBonus', 'assets/sprites/multiplyBonus.png', 'assets/sprites/multiplyBonus.json');
  }

  create() {
    this.scene.start('Start');
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
    this.background.setOrigin(0, 0);
  }
}