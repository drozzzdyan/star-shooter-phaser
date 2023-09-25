import BootScene from "./scenes/BootScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import StartScene from "./scenes/StartScene.js";
import Level1Scene from "./scenes/Level1Scene.js";

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
