import BootScene from "./scenes/BootScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import StartScene from "./scenes/StartScene.js";
import Level1Scene from "./scenes/Level1Scene.js";
import CutScene1 from "./scenes/CutScene1.js";
import EndScene from "./scenes/EndScene.js";

const config = {
  type: Phaser.AUTO,
  scene: [BootScene, PreloadScene, StartScene, CutScene1, Level1Scene, EndScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

let game;
launchGame();

window.addEventListener("resize", () => {
  if (game) {
    game.destroy(true);
  }
  launchGame();
});

function launchGame() {
  const modal = document.createElement('div');
  modal.classList.add('modal-rotate');
  modal.textContent = 'Rotate your device'

  if (!Boolean(document.querySelector('.modal-rotate'))) {
    document.body.append(modal);
  }

  if (window.innerHeight > window.innerWidth) {
    if (!Boolean(document.querySelector('.modal-rotate'))) {
      document.body.append(modal);
    }
  } else {
    document.querySelector('.modal-rotate').remove();
    if (window.innerWidth <= 1366) {
      config.width = window.innerWidth;
      config.height = window.innerHeight;
    } else {
      config.width = 1366;
      config.height = 768;
    }
    game = new Phaser.Game(config);
  }
}