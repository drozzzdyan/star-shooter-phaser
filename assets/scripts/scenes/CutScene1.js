import Player from "../sprites/Player.js";

export default class CutScene1 extends Phaser.Scene {
  constructor() {
    super('CutScene1');
  }

  create(data) {
    this.createBackground();
    this.data = data;
    this.player = new Player(this, -100, 200, 'player', data.shipType);
    this.ally = this.add.sprite(-400, this.sys.game.config.height, 'ally').setScale(0.5);

    this.showAllianse();
  }

  showAllianse() {
    this.tweens.add({
      targets: this.player,
      x: this.data.startPlayerX,
      y: this.data.startPlayerY,
      duration: 1500,
      repeat: 0,
    });

    this.tweens.add({
      targets: this.ally,
      x: 200,
      y: 300,
      duration: 1500,
      repeat: 0,
      onComplete: () => {
        this.renderText();
      }
    });
  }

  renderText() {
    this.input.on('pointerdown', () => {
      this.scene.start('Level1Scene', this.data);
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Level1Scene', this.data);
    });

    this.add.text(this.sys.game.config.width * 0.7, this.sys.game.config.height / 2, 'Protect your ally', {
      fontFamily: 'Kanit',
      fontSize: '24px',
      color: '#b755b9',
    })
    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        this.tweens.add({
          targets: this.ally,
          x: -400,
          y: this.sys.game.config.height / 2,
          duration: 3000,
          repeat: 0,
          onComplete: () => {
            this.scene.start('Level1Scene', this.data);
          }
        });
      },
    })
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
    this.background.setOrigin(0, 0);
  }
}