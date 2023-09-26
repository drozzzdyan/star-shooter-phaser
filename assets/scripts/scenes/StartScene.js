import MenuBtn from "../sprites/MenuBtn.js";
import Player from "../sprites/Player.js";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  init() {
    this.currentSkin = 'player1';
  }

  create() {
    this.createBackground();
    this.createBtns();
    this.player = new Player(this, this.sys.game.config.width / 2, 150, 'player');

    this.input.on('gameobjectdown', this.onPlayerTap, this);
  }

  createBackground() {
    this.background = this.add.sprite(0, 0, 'background');
    this.background.setOrigin(0, 0);
  }

  createBtns() {
    const midX = this.sys.game.config.width / 2;
    const midY = this.sys.game.config.height / 2;

    this.btnStart = new MenuBtn(this, midX, midY, 'btn', 'Start');
    this.btnInstruction = new MenuBtn(this, midX, midY + 50, 'btn', 'Instruction');
    this.btnInstruction = new MenuBtn(this, midX, midY + 100, 'btn', 'Settings');

    this.btnStart.on('pointerdown', () => {
      this.scene.start('Level1Scene', { skin: this.currentSkin });
    })    
  }

  onPlayerTap(pointer, object) {
    if (object !== this.player) return;
    this.currentSkin = object.changeSkin();
  }
}