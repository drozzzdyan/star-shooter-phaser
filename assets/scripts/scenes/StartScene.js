import MenuBtn from "../sprites/MenuBtn.js";
import Player from "../sprites/Player.js";
import SpecificationsWindow from "../classes/specificationsWindow.js";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  init() {
    this.shipType = 1;
  }

  create() {
    this.createBackground();
    this.createBtns();
    this.startPlayerX = 320;
    this.startPlayerY = 105;

    this.player = new Player(this, this.startPlayerX, this.startPlayerY, 'player');
    this.specificationsWindow = new SpecificationsWindow(this);
    this.specificationsWindow.renderText();
    this.specificationsWindow.showSpecificationsWindow(1);
    
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
      this.scene.start('Level1Scene', { 
        shipType: this.shipType,
        startPlayerX: this.startPlayerX,
        startPlayerY: this.startPlayerY,
      });
    })
  }

  onPlayerTap(pointer, object) {
    if (object !== this.player) return;
    this.shipType = object.changeSkin();
    this.specificationsWindow.clear();
    this.specificationsWindow.showSpecificationsWindow(this.shipType);
  }
}