import BootScene from "./scenes/BootScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import StartScene from "./scenes/StartScene.js";
import Level1Scene from "./scenes/Level1Scene.js";
import StatisticsScene from "./scenes/StatisticsScene.js";
import InstructionScene from "./scenes/InstructionScene.js";
import CutScene1 from "./scenes/CutScene1.js";
import EndScene from "./scenes/EndScene.js";

const config = {
  type: Phaser.AUTO,
  scene: [BootScene, PreloadScene, StartScene, StatisticsScene, InstructionScene, CutScene1, Level1Scene, EndScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

const gameWidth = 1024;
const gameHeight = 576;
let game;
launchGame();

if (window.innerHeight > window.innerWidth) {
  createOrientationModal();
  window.addEventListener("resize", firstCreate);
} else {
  removeOrientationModal();
  firstCreate();
}

function firstCreate() {
  if (game) {
    game.destroy(true);
  }
  launchGame();
  window.removeEventListener("resize", firstCreate);
}

function launchGame() {
  createOrientationModal()
  if (window.innerHeight > window.innerWidth) {
    createOrientationModal();
  } else {
    removeOrientationModal();
    if (window.innerWidth <= gameWidth) {
      config.width = window.innerWidth;
      config.height = window.innerHeight;
    } else {
      config.width = gameWidth;
      config.height = gameHeight;
    }
    game = new Phaser.Game(config);
  }
}

function createOrientationModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal-rotate');
  modal.textContent = 'Rotate your device'

  if (!Boolean(document.querySelector('.modal-rotate'))) {
    document.body.append(modal);
  }
}

function removeOrientationModal() {
  if (Boolean(document.querySelector('.modal-rotate'))) {
    document.querySelector('.modal-rotate').remove();
  }
}