import Btn from "../classes/btn.js";
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
    this.renderTextHint();
  }

  createBackground() {
    this.background = this.add.sprite(0, 0, 'background');
    this.background.setOrigin(0, 0);
  }

  createBtns() {
    const midX = this.sys.game.config.width / 2;
    const midY = this.sys.game.config.height / 2;

    this.btnStart = new Btn(this, midX, midY, 'btn', 'btn_menu', 'btn_menu_active', 'Start');
    // this.btnInstruction = new Btn(this, midX, midY + 50, 'btn', 'btn_menu', 'btn_menu_active', 'Instruction');
    // this.btnSettings = new Btn(this, midX, midY + 100, 'btn', 'btn_menu', 'btn_menu_active', 'Settings');

    this.btnStart.on('pointerdown', () => {
      this.scene.start('CutScene1', {
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

  renderTextHint() {
    this.add.text(this.startPlayerX, this.startPlayerY - 70, 'Tap to switch', {
      fontFamily: 'Pixelify Sans',
      fontSize: '16px',
      color: '#b755b9',
    }).setOrigin(0.5)
  }
}