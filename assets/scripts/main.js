const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  scene: [BootScene, PreloadScene, StartScene, Level1Scene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  }
};

let game = new Phaser.Game(config);
