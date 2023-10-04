export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/player.json');
    this.load.atlas('enemy', 'assets/sprites/enemy.png', 'assets/sprites/enemy.json');
    this.load.atlas('btn', 'assets/sprites/btn.png', 'assets/sprites/btn.json');
    this.load.atlas('shot', 'assets/sprites/shot.png', 'assets/sprites/shot.json');
    this.load.atlas('enemyShot', 'assets/sprites/enemyShot.png', 'assets/sprites/enemyShot.json');
  }

  create() {
    this.scene.start('Start');
  }
}