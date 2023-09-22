class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('btn-menu', 'assets/sprites/btn_menu.jpg');
    this.load.image('btn-menu-active', 'assets/sprites/btn_menu_active.jpg');
  }

  create() {

    this.scene.start('Start');
  }
}