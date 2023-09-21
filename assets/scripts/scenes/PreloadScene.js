class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('btn-start', 'assets/sprites/btn_start.jpg');
  }

  create() {

    this.scene.start('Start');
  }
}