import Btn from "../classes/btn.js";

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super('InstructionScene');
  }

  create() {
    this.btnMenu = new Btn(this, this.sys.game.config.width - 100, 50, 'btn', 'btn_menu', 'btn_menu_active', 'Menu');
    this.btnMenu.on('pointerdown', () => {
      this.scene.start('Start');
    })
  }
}