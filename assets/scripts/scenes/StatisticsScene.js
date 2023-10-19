import Btn from "../classes/btn.js";

export default class StatisticsScene extends Phaser.Scene {
  constructor() {
    super('StatisticsScene');
  }

  create() {
    this.renderStatistics();
  }

  renderStatistics() {
    const midX = this.sys.game.config.width / 2;
    const midY = this.sys.game.config.height / 2;

    this.btnMenu = new Btn(this, midX, this.sys.game.config.height - 50, 'btn', 'btn_menu', 'btn_menu_active', 'Menu');
    this.btnMenu.on('pointerdown', () => {
      this.scene.start('Start');
    })

    const records = JSON.parse(localStorage.getItem('records')) || [];
    const marginBottomText = 70;
    const topOffset = midY - 140;

    if (records.length > 0) {
      for (let i = 0; i < records.length; i++) {
        const el = records[i];
        
        this.add.sprite(midX - 50, topOffset + i * marginBottomText + 15, 'player', `player${records[i].shipType}`).setScale(0.35);
        this.add.text(midX, topOffset + i * marginBottomText, `${records[i].record}`, {
          fontFamily: 'Kanit',
          fontSize: '30px',
          color: '#b755b9',
        });
      }
    } else {
      this.add.text(midX, midY, 'You don\'t have any records yet :(', {
        fontFamily: 'Kanit',
        fontSize: '20px',
        color: '#b755b9',
      }).setOrigin(0.5);
    }
  }
}