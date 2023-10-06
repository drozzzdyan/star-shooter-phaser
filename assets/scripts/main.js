import BootScene from "./scenes/BootScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import StartScene from "./scenes/StartScene.js";
import Level1Scene from "./scenes/Level1Scene.js";
import CutScene1 from "./scenes/CutScene1.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  scene: [BootScene, PreloadScene, StartScene, CutScene1, Level1Scene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  }
};

let game = new Phaser.Game(config);
