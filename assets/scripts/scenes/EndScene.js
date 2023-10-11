export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  create(data) {
    this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, `Your score: ${data.score}`, {
      fontFamily: 'Pixelify Sans',
      fontSize: '30px',
      color: '#b755b9',
    })

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        // this.scene.start('Start');
      },
    })
  }
}