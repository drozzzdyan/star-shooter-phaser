import BootScene from "./scenes/BootScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import StartScene from "./scenes/StartScene.js";
import Level1Scene from "./scenes/Level1Scene.js";
import CutScene1 from "./scenes/CutScene1.js";

let gameFlag = true;
let game;

const config = {
  type: Phaser.AUTO,
  scene: [BootScene, PreloadScene, StartScene, CutScene1, Level1Scene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

checkWindow();

window.addEventListener("resize", () => {
  checkWindow();
});

function checkWindow() {
  if (window.innerWidth > window.innerHeight && gameFlag) {
    document.querySelector('.modal-rotate').remove();
    config.width = window.innerWidth;
    config.height = window.innerHeight;
    game = new Phaser.Game(config);
    gameFlag = false;
  }
}