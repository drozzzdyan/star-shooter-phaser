export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  create(data) {
    this.saveStatistics(data);
    this.renderStatistics(data);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.createSkipEvents();
      }
    })
  }

  saveStatistics(data) {
    let records = JSON.parse(localStorage.getItem('records')) || [];
    records.push({
      shipType: data.shipType,
      record: data.score,
    })
    records.sort((a, b) => b.record - a.record);
    localStorage.setItem('records', JSON.stringify(records.slice(0, 4)));
  }

  renderStatistics(data) {
    const midX = this.sys.game.config.width / 2;
    const midY = this.sys.game.config.height / 2;

    this.add.sprite(midX, midY - 80, 'player', `player${data.shipType}`).setScale(0.4);
    this.add.text(midX, midY, `Your score: ${data.score}`, {
      fontFamily: 'Kanit',
      fontSize: '30px',
      color: '#b755b9',
    }).setOrigin(0.5);

    const record = JSON.parse(localStorage.getItem('records'))[0].record;
    this.add.text(midX, midY + 40, `Your best record: ${record}`, {
      fontFamily: 'Kanit',
      fontSize: '30px',
      color: '#b755b9',
    }).setOrigin(0.5);

    this.add.text(midX, this.sys.game.config.height - 20, `Press SPACE or tap on screen for skip`, {
      fontFamily: 'Kanit',
      fontSize: '20px',
      color: '#b755b9',
    }).setOrigin(0.5);
  }

  createSkipEvents() {
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        this.scene.start('Start');
      },
    })

    this.input.on('pointerdown', () => {
      this.scene.start('Start');
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Start');
    });
  }
}